const OpenAI = require('openai');
const { ExtendedError } = require('../errors');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('Environment variable "OPENAI_API_KEY" is not defined');
}

const openai = new OpenAI();

async function generateChatCompletion(content, options) {
  const { role = 'user', model } = options || {};

  if (!model) {
    throw new Error('The "model" is required');
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role, content }],
      model
    });

    return completion;
  } catch (err) {
    throw new ExtendedError('Error while creating a chat completion', err);
  }
}

module.exports = generateChatCompletion;
