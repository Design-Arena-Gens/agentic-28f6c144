import type { NextApiRequest, NextApiResponse } from "next";
import { deleteChatbot, getChatbot, updateChatbot } from "@/lib/chatbotStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).json({ error: "Invalid chatbot id" });
    return;
  }

  if (req.method === "GET") {
    const chatbot = await getChatbot(id);
    if (!chatbot) {
      res.status(404).json({ error: "Chatbot not found" });
      return;
    }
    res.status(200).json({ chatbot });
    return;
  }

  if (req.method === "PUT") {
    try {
      const chatbot = await updateChatbot(id, req.body ?? {});
      if (!chatbot) {
        res.status(404).json({ error: "Chatbot not found" });
        return;
      }
      res.status(200).json({ chatbot });
    } catch (error) {
      console.error("Failed to update chatbot", error);
      res.status(500).json({ error: "Failed to update chatbot" });
    }
    return;
  }

  if (req.method === "DELETE") {
    const deleted = await deleteChatbot(id);
    if (!deleted) {
      res.status(404).json({ error: "Chatbot not found" });
      return;
    }
    res.status(204).end();
    return;
  }

  res.setHeader("Allow", "GET,PUT,DELETE");
  res.status(405).end("Method Not Allowed");
}
