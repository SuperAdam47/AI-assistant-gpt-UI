import type { NextPage } from "next";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import CountdownTimer from "../components/CountdownTimer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const BIRTHDAY_MESSAGE = {
  title: "Happy Birthday, my love!",
  paragraphs: [
    "Even though miles separate us today, my heart is right there with you, celebrating every beautiful second of your special day. Distance can never dim the light you bring into my life — you make every ordinary moment magical, even from afar.",
    "Today, I'm sending you all my love wrapped in a thousand virtual hugs, endless kisses, and wishes that this new chapter brings you everything your heart desires. I can't wait for the day I can hold you close and celebrate you in person. Until then, know that I'm smiling because you exist, and I'm the luckiest person alive to call you mine.",
    "You deserve the world, my darling. Go shine bright — I'll be cheering you on from here with the biggest smile.",
    "I love you more than the distance between us, today and every day.",
  ],
  closing: "Happy Birthday, [Her Name]!",
};

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
        <title>Happy Birthday</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <section className="max-w-2xl w-full mb-12 rounded-2xl border border-rose-200 bg-rose-50/80 px-6 py-8 text-left shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-900 text-center">
            {BIRTHDAY_MESSAGE.title}
          </h1>
          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
            {BIRTHDAY_MESSAGE.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-semibold text-rose-800">
            {BIRTHDAY_MESSAGE.closing}
          </p>
          <CountdownTimer />
        </section>

        <h2 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Write a message.
        </h2>
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
