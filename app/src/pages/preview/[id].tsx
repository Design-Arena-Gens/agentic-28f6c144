import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PreviewPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id || typeof id !== "string") {
      return;
    }

    const existing = document.querySelectorAll(".chatboss-widget");
    existing.forEach((node) => node.remove());

    const script = document.createElement("script");
    script.src = `/api/embed/${id}`;
    script.async = true;
    script.dataset.preview = "true";
    document.body.appendChild(script);

    return () => {
      script.remove();
      const widgets = document.querySelectorAll(".chatboss-widget");
      widgets.forEach((node) => node.remove());
    };
  }, [id]);

  return (
    <>
      <Head>
        <title>Preview Chatbot</title>
      </Head>
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-white/10 bg-slate-950/90">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Agentic</p>
              <h1 className="mt-1 text-2xl font-semibold">Embed preview</h1>
            </div>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 hover:border-emerald-300/60 hover:text-white"
            >
              Back to dashboard
            </Link>
          </div>
        </header>
        <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
            <h2 className="text-lg font-semibold text-white">Live widget</h2>
            <p className="mt-2 text-xs text-slate-400">
              Interact with the chatbot below. Copy the embed snippet from the dashboard to add it to your site.
            </p>
          </div>
          <div className="relative min-h-[520px] rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6">
            {!id ? (
              <p className="text-sm text-slate-400">Loading chatbot...</p>
            ) : (
              <p className="text-sm text-slate-400">
                The chatbot widget loads in the bottom-right corner. Trigger it to test the conversation flow.
              </p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
