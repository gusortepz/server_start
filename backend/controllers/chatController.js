require('dotenv').config();
const OpenAI = require('openai');
const axios = require('axios');
const pdf = require('pdf-parse');



async function getResponseChat(req, res) {
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const { prompt, context, pdfUrl } = req.body;
  let fileContext = '';

  if (pdfUrl) {
    try {
      const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
      const data = await pdf(response.data);
      fileContext = data.text.slice(0, 1500);
    } catch (error) {
      console.error('Error al leer el PDF:', error);
      return res.status(500).send('Error al leer el PDF');
    }
  }

  const combinedContext = `${context}\n\n${fileContext}`.trim();

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'assistant', content: combinedContext },
        { role: 'user', content: prompt },
      ],
      stream: true,
    });

    let responseText = '';
    for await (const chunk of stream) {
      responseText += chunk.choices[0]?.delta?.content || '';
    }

    return res.json({ response: responseText });
  } catch (error) {
    console.error("Error en la comunicación con la API", error);
    res.status(500).send(error);
  }
}

module.exports = { getResponseChat };
