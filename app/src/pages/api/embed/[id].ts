import type { NextApiRequest, NextApiResponse } from "next";
import { getChatbot } from "@/lib/chatbotStore";

const BASE_STYLES = [
  ".chatboss-widget { position: fixed; bottom: 24px; right: 24px; font-family: 'Inter', sans-serif; z-index: 999999; }",
  ".chatboss-bubble { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 18px 48px rgba(15, 23, 42, 0.21); font-weight: 600; color: #fff; transition: transform 0.2s ease, box-shadow 0.2s ease; }",
  ".chatboss-bubble:hover { transform: translateY(-2px); box-shadow: 0 20px 54px rgba(15, 23, 42, 0.24); }",
  ".chatboss-window { width: min(360px, calc(100vw - 32px)); height: 480px; max-height: calc(100vh - 120px); border-radius: 20px; overflow: hidden; box-shadow: 0 30px 80px rgba(15, 23, 42, 0.28); background: #fff; display: flex; flex-direction: column; }",
  ".chatboss-header { padding: 16px 20px; display: flex; flex-direction: column; gap: 4px; color: #fff; }",
  ".chatboss-title { font-size: 18px; font-weight: 700; }",
  ".chatboss-tag { font-size: 13px; opacity: 0.9; }",
  ".chatboss-body { flex: 1; background: #f8fafc; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }",
  ".chatboss-message { max-width: 80%; padding: 12px 14px; border-radius: 16px; line-height: 1.4; font-size: 14px; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12); }",
  ".chatboss-message.agent { align-self: flex-start; }",
  ".chatboss-message.user { align-self: flex-end; }",
  ".chatboss-input { padding: 16px; border-top: 1px solid rgba(15, 23, 42, 0.06); background: #fff; display: flex; flex-direction: column; gap: 8px; }",
  ".chatboss-input textarea { width: 100%; resize: none; border: 1px solid rgba(15, 23, 42, 0.08); border-radius: 12px; padding: 12px; min-height: 52px; font-size: 14px; font-family: inherit; }",
  ".chatboss-input textarea:focus { outline: 2px solid rgba(15, 23, 42, 0.15); }",
  ".chatboss-send { border: none; border-radius: 12px; padding: 12px; font-weight: 600; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; gap: 6px; transition: filter 0.15s ease; }",
  ".chatboss-send:disabled { opacity: 0.6; cursor: not-allowed; }",
  ".chatboss-send:not(:disabled):hover { filter: brightness(1.05); }",
  ".chatboss-quick-replies { display: flex; flex-wrap: wrap; gap: 8px; }",
  ".chatboss-quick-replies button { border: 1px solid rgba(15, 23, 42, 0.08); border-radius: 999px; padding: 8px 12px; font-size: 13px; cursor: pointer; background: rgba(15, 23, 42, 0.02); transition: background 0.15s ease; }",
  ".chatboss-quick-replies button:hover { background: rgba(15, 23, 42, 0.06); }",
].join("\n");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).send("// Invalid chatbot id\n");
    return;
  }

  const chatbot = await getChatbot(id);

  if (!chatbot) {
    res.status(404).send("// Chatbot not found\n");
    return;
  }

  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const payload = JSON.stringify(chatbot);
  const styles = JSON.stringify(BASE_STYLES);

  const script = `(() => {
    const BOT_DATA = ${payload};
    const STYLES = ${styles};

    function createStyles() {
      if (document.getElementById("chatboss-styles")) return;
      const style = document.createElement("style");
      style.id = "chatboss-styles";
      style.textContent = STYLES;
      document.head.appendChild(style);
    }

    function createElement(tag, className, text) {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (text) el.textContent = text;
      return el;
    }

    function renderMessage(container, kind, message) {
      const bubble = createElement("div", "chatboss-message " + kind);
      bubble.textContent = message;
      if (kind === "user") {
        bubble.style.background = BOT_DATA.primaryColor;
        bubble.style.color = "#ffffff";
      } else {
        bubble.style.background = "#e2e8f0";
        bubble.style.color = "#0f172a";
      }
      container.appendChild(bubble);
      container.scrollTop = container.scrollHeight;
    }

    function findAnswer(message) {
      const lower = message.toLowerCase();
      for (const faq of BOT_DATA.faqs || []) {
        const tokens = faq.question
          .toLowerCase()
          .split(/[^a-z0-9]+/)
          .filter(Boolean);
        let score = 0;
        for (const token of tokens) {
          if (token && lower.indexOf(token) !== -1) {
            score += 1;
          }
        }
        if (score >= Math.max(1, faq.question.length < 40 ? 2 : 3)) {
          return faq.answer;
        }
      }
      if (BOT_DATA.steps && BOT_DATA.steps.length) {
        const nextStep = BOT_DATA.steps.shift();
        if (nextStep) {
          BOT_DATA.steps.push(nextStep);
          return nextStep.message;
        }
      }
      return BOT_DATA.fallbackResponse;
    }

    function init() {
      createStyles();
      const widgetRoot = createElement("div", "chatboss-widget");
      const bubble = createElement("button", "chatboss-bubble", "AI");
      bubble.style.background = BOT_DATA.primaryColor;

      const windowEl = createElement("div", "chatboss-window");
      windowEl.style.display = "none";

      const header = createElement("div", "chatboss-header");
      header.style.background = "linear-gradient(135deg, " +
        BOT_DATA.primaryColor +
        ", " +
        BOT_DATA.secondaryColor +
        ")";
      const title = createElement("div", "chatboss-title", BOT_DATA.name);
      const tag = createElement(
        "div",
        "chatboss-tag",
        BOT_DATA.industry + " assistant - " + BOT_DATA.tone + " tone"
      );
      header.appendChild(title);
      header.appendChild(tag);

      const body = createElement("div", "chatboss-body");
      renderMessage(body, "agent", BOT_DATA.greeting);

      const input = createElement("div", "chatboss-input");
      const textarea = createElement("textarea");
      textarea.placeholder = "Ask a question...";
      const send = createElement("button", "chatboss-send", "Send");
      send.style.background = BOT_DATA.primaryColor;
      const quickReplies = createElement("div", "chatboss-quick-replies");

      for (const reply of BOT_DATA.quickReplies || []) {
        const button = createElement("button", "", reply.label);
        button.addEventListener("click", function () {
          textarea.value = reply.message;
          send.click();
        });
        quickReplies.appendChild(button);
      }

      input.appendChild(textarea);
      input.appendChild(quickReplies);
      input.appendChild(send);

      windowEl.appendChild(header);
      windowEl.appendChild(body);
      windowEl.appendChild(input);

      widgetRoot.appendChild(windowEl);
      widgetRoot.appendChild(bubble);
      document.body.appendChild(widgetRoot);

      let isOpen = false;
      function toggleWindow() {
        isOpen = !isOpen;
        windowEl.style.display = isOpen ? "flex" : "none";
      }

      bubble.addEventListener("click", function () {
        toggleWindow();
        if (isOpen) {
          textarea.focus();
        }
      });

      function sendMessage() {
        const value = textarea.value.trim();
        if (!value) return;
        renderMessage(body, "user", value);
        textarea.value = "";
        send.disabled = true;
        window.setTimeout(function () {
          const answer = findAnswer(value);
          renderMessage(body, "agent", answer);
          send.disabled = false;
        }, 350);
      }

      send.addEventListener("click", sendMessage);
      textarea.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
        }
      });
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  })();`;

  res.status(200).send(script);
}
