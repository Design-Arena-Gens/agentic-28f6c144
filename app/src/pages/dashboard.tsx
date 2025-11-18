import { FormEvent, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ChatStep,
  Chatbot,
  ChatbotInput,
  FAQItem,
  QuickReply,
} from "@/types/chatbot";

interface FormState
  extends Omit<
    ChatbotInput,
    "faqs" | "quickReplies" | "steps" | "variants"
  > {
  faqs: FAQItem[];
  quickReplies: QuickReply[];
  steps: ChatStep[];
}

const toneOptions: ChatbotInput["tone"][] = [
  "friendly",
  "professional",
  "playful",
  "direct",
];

const initialState: FormState = {
  name: "",
  industry: "",
  primaryColor: "#0ea5e9",
  secondaryColor: "#14b8a6",
  tone: "friendly",
  greeting: "Hi there! I can help you explore our services and choose the right fit.",
  fallbackResponse:
    "Thanks for your question! A teammate will follow up shortly with the right answer.",
  faqs: [],
  quickReplies: [],
  steps: [],
};

function uuid() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);
}

export default function DashboardPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  async function fetchChatbots() {
    try {
      const response = await fetch("/api/chatbots");
      const data = await response.json();
      setChatbots(data.chatbots ?? []);
    } catch (error) {
      console.error("Failed to load chatbots", error);
      setMessage({ type: "error", text: "Unable to load chatbots" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchChatbots();
  }, []);

  const totalMonthlyCost = useMemo(() => {
    const base = chatbots.length ? 49 : 0;
    const usage = chatbots.length * 15;
    return base + usage;
  }, [chatbots.length]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreating(true);
    setMessage(null);

    try {
      const payload: ChatbotInput = {
        ...form,
        faqs: form.faqs,
        quickReplies: form.quickReplies,
        steps: form.steps,
        variants: [],
      };

      const response = await fetch("/api/chatbots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Failed to create chatbot");
      }

      const data = await response.json();
      setChatbots((prev) => [data.chatbot as Chatbot, ...prev]);
      setForm(initialState);
      setMessage({ type: "success", text: "Chatbot created successfully" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setCreating(false);
    }
  };

  const updateForm = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const upsertFaq = (faq: FAQItem) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.some((item) => item.id === faq.id)
        ? prev.faqs.map((item) => (item.id === faq.id ? faq : item))
        : [...prev.faqs, faq],
    }));
  };

  const removeFaq = (id: string) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((item) => item.id !== id),
    }));
  };

  const upsertReply = (reply: QuickReply) => {
    setForm((prev) => ({
      ...prev,
      quickReplies: prev.quickReplies.some((item) => item.id === reply.id)
        ? prev.quickReplies.map((item) => (item.id === reply.id ? reply : item))
        : [...prev.quickReplies, reply],
    }));
  };

  const removeReply = (id: string) => {
    setForm((prev) => ({
      ...prev,
      quickReplies: prev.quickReplies.filter((item) => item.id !== id),
    }));
  };

  const upsertStep = (step: ChatStep) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.some((item) => item.id === step.id)
        ? prev.steps.map((item) => (item.id === step.id ? step : item))
        : [...prev.steps, step],
    }));
  };

  const removeStep = (id: string) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((item) => item.id !== id),
    }));
  };

  const embedUrl = (id: string) =>
    `https://agentic-28f6c144.vercel.app/api/embed/${id}`;

  const embedSnippet = (id: string) =>
    `<script src="${embedUrl(id)}" async></script>`;

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setMessage({ type: "success", text: "Copied to clipboard" });
    } catch (error) {
      console.error("Clipboard copy failed", error);
      setMessage({ type: "error", text: "Unable to copy. Copy manually." });
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard - Agentic</title>
      </Head>
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-white/5 bg-slate-950/90">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Agentic</p>
              <h1 className="mt-1 text-2xl font-semibold">Chatbot dashboard</h1>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:border-emerald-300/60 hover:text-white"
            >
              Back to site
            </Link>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 lg:flex-row">
          <section className="w-full flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-emerald-400/5">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Create a chatbot</h2>
              <p className="mt-2 text-sm text-slate-300">
                Configure tone, FAQs, and quick replies. We generate the embed snippet automatically.
              </p>
            </div>

            {message ? (
              <div
                className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                    : "border-rose-500/40 bg-rose-500/10 text-rose-100"
                }`}
              >
                {message.text}
              </div>
            ) : null}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Agent name
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                    placeholder="Acme Support Concierge"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Industry focus
                  <input
                    required
                    value={form.industry}
                    onChange={(event) => updateForm("industry", event.target.value)}
                    className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                    placeholder="SaaS Customer Success"
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Primary color
                  <div className="flex items-center gap-3">
                    <input
                      required
                      type="color"
                      value={form.primaryColor}
                      onChange={(event) => updateForm("primaryColor", event.target.value)}
                      className="h-11 w-11 rounded-full border border-white/10 bg-transparent"
                    />
                    <input
                      required
                      value={form.primaryColor}
                      onChange={(event) => updateForm("primaryColor", event.target.value)}
                      className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Secondary color
                  <div className="flex items-center gap-3">
                    <input
                      required
                      type="color"
                      value={form.secondaryColor}
                      onChange={(event) => updateForm("secondaryColor", event.target.value)}
                      className="h-11 w-11 rounded-full border border-white/10 bg-transparent"
                    />
                    <input
                      required
                      value={form.secondaryColor}
                      onChange={(event) => updateForm("secondaryColor", event.target.value)}
                      className="flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Tone of voice
                  <select
                    value={form.tone}
                    onChange={(event) =>
                      updateForm("tone", event.target.value as ChatbotInput["tone"])
                    }
                    className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                  >
                    {toneOptions.map((tone) => (
                      <option key={tone} value={tone} className="bg-slate-900 text-white">
                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-200">
                  Greeting
                  <textarea
                    required
                    value={form.greeting}
                    onChange={(event) => updateForm("greeting", event.target.value)}
                    className="min-h-[96px] rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                    placeholder="Welcome message for new visitors"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                Fallback response
                <textarea
                  required
                  value={form.fallbackResponse}
                  onChange={(event) => updateForm("fallbackResponse", event.target.value)}
                  className="min-h-[80px] rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                  placeholder="If we can't find an answer we will send this message"
                />
              </label>

              <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <header className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Quick replies</h3>
                    <p className="text-xs text-slate-400">
                      Pre-fill buttons to keep conversations moving quickly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      upsertReply({ id: uuid(), label: "", message: "" })
                    }
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-200 hover:border-emerald-300/60 hover:text-white"
                  >
                    Add reply
                  </button>
                </header>
                <div className="space-y-4">
                  {form.quickReplies.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-xs text-slate-400">
                      No quick replies yet. Create one to give visitors a jump start.
                    </p>
                  ) : null}
                  {form.quickReplies.map((reply) => (
                    <div
                      key={reply.id}
                      className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr,1fr,auto]"
                    >
                      <input
                        value={reply.label}
                        onChange={(event) =>
                          upsertReply({ ...reply, label: event.target.value })
                        }
                        placeholder="Button label"
                        className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                      <input
                        value={reply.message}
                        onChange={(event) =>
                          upsertReply({ ...reply, message: event.target.value })
                        }
                        placeholder="Prefilled message"
                        className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeReply(reply.id)}
                        className="rounded-full px-3 py-2 text-xs text-rose-200 hover:bg-rose-500/20"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <header className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">FAQ library</h3>
                    <p className="text-xs text-slate-400">
                      Add answers the agent can reference during conversations.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      upsertFaq({ id: uuid(), question: "", answer: "" })
                    }
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-200 hover:border-emerald-300/60 hover:text-white"
                  >
                    Add FAQ
                  </button>
                </header>
                <div className="space-y-4">
                  {form.faqs.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-xs text-slate-400">
                      Seed the chatbot with at least three core questions.
                    </p>
                  ) : null}
                  {form.faqs.map((faq, index) => (
                    <div
                      key={faq.id}
                      className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>FAQ #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeFaq(faq.id)}
                          className="text-rose-200 hover:text-rose-100"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        value={faq.question}
                        onChange={(event) =>
                          upsertFaq({ ...faq, question: event.target.value })
                        }
                        placeholder="How do I upgrade my plan?"
                        className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(event) =>
                          upsertFaq({ ...faq, answer: event.target.value })
                        }
                        placeholder="Describe how the chatbot should respond"
                        className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <header className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Guided steps (optional)</h3>
                    <p className="text-xs text-slate-400">
                      Structure onboarding journeys or lead qualification flows.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      upsertStep({ id: uuid(), label: "", message: "" })
                    }
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-200 hover:border-emerald-300/60 hover:text-white"
                  >
                    Add step
                  </button>
                </header>
                <div className="space-y-4">
                  {form.steps.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center text-xs text-slate-400">
                      Guided steps help the agent lead conversations toward conversion goals.
                    </p>
                  ) : null}
                  {form.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr,2fr,auto]"
                    >
                      <input
                        value={step.label}
                        onChange={(event) =>
                          upsertStep({ ...step, label: event.target.value })
                        }
                        placeholder={`Step ${index + 1} label`}
                        className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                      <textarea
                        value={step.message}
                        onChange={(event) =>
                          upsertStep({ ...step, message: event.target.value })
                        }
                        placeholder="Bot response"
                        className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeStep(step.id)}
                        className="rounded-full px-3 py-2 text-xs text-rose-200 hover:bg-rose-500/20"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <div>
                  <p className="font-medium text-white">Estimated monthly bill</p>
                  <p className="text-xs text-slate-400">Includes platform fee and projected usage.</p>
                </div>
                <span className="text-lg font-semibold text-white">${totalMonthlyCost}</span>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/20 transition hover:shadow-xl hover:shadow-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {creating ? "Creating agent..." : "Publish chatbot"}
              </button>
            </form>
          </section>

          <section className="w-full max-w-xl space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold text-white">Deployed chatbots</h2>
              <p className="mt-1 text-xs text-slate-400">
                Copy the embed snippet and drop it into any page right before the closing body tag.
              </p>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                Loading chatbots...
              </div>
            ) : null}

            {!loading && chatbots.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-sm text-slate-400">
                No chatbots yet. Create your first agent to see it listed here.
              </div>
            ) : null}

            {chatbots.map((chatbot) => (
              <article
                key={chatbot.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 shadow-lg shadow-slate-900/30"
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{chatbot.name}</h3>
                    <p className="text-xs text-slate-400">
                      {chatbot.industry} - {chatbot.tone} tone
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
                      style={{ background: chatbot.primaryColor }}
                    />
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
                      style={{ background: chatbot.secondaryColor }}
                    />
                  </div>
                </header>

                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                      Embed snippet
                    </p>
                    <pre className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/60 p-3 text-[11px] text-emerald-100">
{embedSnippet(chatbot.id)}
                    </pre>
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(embedSnippet(chatbot.id))}
                        className="rounded-full border border-white/10 px-3 py-1 font-medium text-slate-200 hover:border-emerald-300/60 hover:text-white"
                      >
                        Copy snippet
                      </button>
                      <Link
                        href={`/preview/${chatbot.id}`}
                        className="rounded-full border border-white/10 px-3 py-1 font-medium text-slate-200 hover:border-emerald-300/60 hover:text-white"
                      >
                        Preview widget
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                      Suggested quick replies
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {chatbot.quickReplies.length ? (
                        chatbot.quickReplies.map((reply) => (
                          <span
                            key={reply.id}
                            className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100"
                          >
                            {reply.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">None configured</span>
                      )}
                    </div>
                  </div>
                </div>

                <footer className="mt-5 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Created {new Date(chatbot.createdAt).toLocaleDateString()}
                  </span>
                  <a
                    href={embedUrl(chatbot.id)}
                    className="font-medium text-emerald-200 hover:text-emerald-100"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open embed endpoint
                  </a>
                </footer>
              </article>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
