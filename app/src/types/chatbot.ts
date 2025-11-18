export interface ChatbotVariant {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface QuickReply {
  id: string;
  label: string;
  message: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChatStep {
  id: string;
  label: string;
  message: string;
}

export interface Chatbot {
  id: string;
  name: string;
  industry: string;
  primaryColor: string;
  secondaryColor: string;
  tone: "friendly" | "professional" | "playful" | "direct";
  greeting: string;
  fallbackResponse: string;
  faqs: FAQItem[];
  quickReplies: QuickReply[];
  steps: ChatStep[];
  variants: ChatbotVariant[];
  createdAt: string;
  updatedAt: string;
}

export type ChatbotInput = Omit<
  Chatbot,
  "id" | "createdAt" | "updatedAt" | "quickReplies" | "faqs" | "steps" | "variants"
> & {
  quickReplies?: QuickReply[];
  faqs?: FAQItem[];
  steps?: ChatStep[];
  variants?: ChatbotVariant[];
};
