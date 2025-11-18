import type { NextApiRequest, NextApiResponse } from "next";
import { createChatbot, listChatbots } from "@/lib/chatbotStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const chatbots = await listChatbots();
    res.status(200).json({ chatbots });
    return;
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        industry,
        primaryColor,
        secondaryColor,
        tone,
        greeting,
        fallbackResponse,
        faqs = [],
        quickReplies = [],
        steps = [],
        variants = [],
      } = req.body ?? {};

      if (
        !name ||
        !industry ||
        !primaryColor ||
        !secondaryColor ||
        !tone ||
        !greeting ||
        !fallbackResponse
      ) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const chatbot = await createChatbot({
        name,
        industry,
        primaryColor,
        secondaryColor,
        tone,
        greeting,
        fallbackResponse,
        faqs,
        quickReplies,
        steps,
        variants,
      });

      res.status(201).json({ chatbot });
    } catch (error) {
      console.error("Failed to create chatbot", error);
      res.status(500).json({ error: "Failed to create chatbot" });
    }
    return;
  }

  res.setHeader("Allow", "GET,POST");
  res.status(405).end("Method Not Allowed");
}
