require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key_for_build' });

// Load product data
const productsPath = path.join(__dirname, 'data', 'products.json');
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// System instruction with product context
const systemInstruction = `
You are a warm, supportive, and highly knowledgeable AI Smart Store Assistant for a premium lifestyle and home goods store.
Your goal is to help customers find the perfect items for their space, acting like a friendly interior design consultant or supportive friend, NOT a robotic assistant.

Here is the current catalog of products available in the store (in JSON format):
${JSON.stringify(productsData, null, 2)}

Guidelines:
1. Provide personalized recommendations based on the customer's needs, budget, and preferences.
2. If you recommend a specific product, ALWAYS use the 'highlight_product' tool to visually highlight it on the user's screen.
3. Keep responses relatively concise but conversational and empathetic.
4. If asked about things outside the catalog, politely steer them back to our offerings or offer general design advice.
5. Emphasize the aesthetic and emotional value of the products (e.g., "This vase will add a beautiful soft touch to your workspace").
6. **IMPORTANT**: Use markdown formatting for readability. Use bolding for product names and bullet points for lists of features or options. Ensure proper line breaks.
`;

// Define the tool for UI interaction
const highlightTool = {
  functionDeclarations: [
    {
      name: 'highlight_product',
      description: 'Call this function to visually highlight a specific product in the UI when recommending it to the user.',
      parameters: {
        type: 'OBJECT',
        properties: {
          productId: {
            type: 'STRING',
            description: 'The ID of the product to highlight (e.g., "p1", "p2")'
          }
        },
        required: ['productId']
      }
    }
  ]
};

app.get('/api/products', (req, res) => {
  res.json(productsData);
});

app.post('/api/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    
    // Format history for Gemini
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        tools: [highlightTool],
        temperature: 0.7,
      }
    });

    // Check if the model called a function
    let highlightId = null;
    let replyText = '';

    const functionCall = response.functionCalls?.[0];
    if (functionCall && functionCall.name === 'highlight_product') {
      highlightId = functionCall.args.productId;
      
      // If the model called a function, we should ideally send the function response back
      // and get the text response. However, for a simple recommendation, it might have 
      // provided text alongside the function call, or we can just acknowledge it.
      // Let's get the text part if available.
      const textPart = response.candidates?.[0]?.content?.parts?.find(p => p.text);
      if (textPart) {
        replyText = textPart.text;
      } else {
         // Ask model to generate text acknowledging the highlight
         const followUpContents = [...contents, {
            role: 'model',
            parts: [{ functionCall: functionCall }]
         }, {
            role: 'user',
            parts: [{ functionResponse: { name: 'highlight_product', response: { success: true } } }]
         }];
         
         const followUpResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: followUpContents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            }
         });
         replyText = followUpResponse.text;
      }
    } else {
      replyText = response.text;
    }

    res.json({
      reply: replyText,
      action: highlightId ? { type: 'highlight', payload: highlightId } : null
    });
    
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.post('/api/checkout', (req, res) => {
  const { cart, shipping, payment } = req.body;
  // Mock secure checkout processing
  setTimeout(() => {
    res.json({ success: true, orderId: 'ORD-' + Math.floor(Math.random() * 1000000) });
  }, 1500);
});

// Serve frontend in production (for Cloud Run)
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
