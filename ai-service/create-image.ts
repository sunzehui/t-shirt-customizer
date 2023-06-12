'use server'
import { Configuration, OpenAIApi } from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent'
const isProd = process.env.NODE_ENV === 'production';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(prompt: string) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    }, isProd ? {} : {
      proxy: false,
      httpAgent: new HttpsProxyAgent('http://localhost:7890'),
      httpsAgent: new HttpsProxyAgent('http://localhost:7890')
    });
    const image = response.data.data[0].b64_json;
    return image;
  } catch (error:any) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
