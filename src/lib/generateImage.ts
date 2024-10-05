"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-33Zg7MbY4ION1Emx89iluRp0",
  project: "proj_QKtnnRnF9OosRuZUSruWqLdW",
  apiKey: "sk-proj-m5F97TxvGplJe3a2yfloT3BlbkFJG1TEpMpZ3ms6QfONLsMT",
});
export const generateImage = async (
  number: number,
  prompt: string,
  size: string
) => {
  let accountHistory;
  try {
    const imageParameters: any = {
      prompt: prompt,
      n: number,
      size: "256x256",
      response_format: "b64_json",
    };
    const imageResponse = await openai.images.generate(imageParameters);
    const imageUrl = imageResponse.data[0].b64_json;
    return imageUrl;
  } catch (error: any) {
    if (error.response)
      accountHistory = { creationTime: Date.now(), action: "Render failed" };
  }
};
