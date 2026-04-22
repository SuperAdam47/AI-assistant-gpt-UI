import type { NextPage } from "next";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

async function submitAnalysisLog(message: string): Promise<boolean> {
  try {
    const res = await fetch("/api/save-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    return res.ok;
  } catch (e) {
    console.error("submitAnalysisLog:", e);
    return false;
  }
}

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const saveUserMessage = async (e: FormEvent) => {
    e.preventDefault();
    const text = prompt.trim();
    if (!text) return;

    setLoading(true);
    const ok = await submitAnalysisLog(text);
    setLoading(false);

    if (ok) {
      toast.success("Saved to database");
      setPrompt("");
    } else {
      toast.error("Could not save message");
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>simple AI assistant</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Write a message.
        </h1>
        <p className="text-slate-500 font-medium mt-4">
          Your text is stored in the database; an administrator will review it
          soon.
        </p>
        <form
          className="max-w-xl w-full"
          onSubmit={saveUserMessage}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder="Type something to save…"
            disabled={loading}
          />
          {!loading && (
            <button
              type="submit"
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-3 mt-5 hover:bg-black/80 w-full"
            >
              Send to Assistant &rarr;
            </button>
          )}
          {loading && (
            <button
              type="button"
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-3 mt-5 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </form>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
