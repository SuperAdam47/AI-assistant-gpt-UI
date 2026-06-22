import { useEffect, useState } from "react";

/** June 6, 2026 at local midnight */
const TARGET = new Date(2026, 5, 6, 0, 0, 0, 0);

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getTimeLeft(now: number): TimeLeft {
  const diff = TARGET.getTime() - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const UNITS = [
  { key: "days" as const, label: "Days" },
  { key: "hours" as const, label: "Hours" },
  { key: "minutes" as const, label: "Minutes" },
  { key: "seconds" as const, label: "Seconds" },
];

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(Date.now())
  );

  useEffect(() => {
    setMounted(true);
    const tick = () => setTimeLeft(getTimeLeft(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div
        className="mt-8 grid grid-cols-4 gap-2 sm:gap-4"
        aria-hidden="true"
      >
        {UNITS.map(({ label }) => (
          <div
            key={label}
            className="rounded-xl bg-white/90 border border-rose-100 px-2 py-4 sm:py-5"
          >
            <span className="block text-2xl sm:text-4xl font-bold text-rose-900 tabular-nums">
              --
            </span>
            <span className="mt-1 block text-xs sm:text-sm font-medium text-rose-600 uppercase tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.done) {
    return (
      <p className="mt-8 text-center text-xl sm:text-2xl font-bold text-rose-900">
        June 6, 2026 is here — happy day!
      </p>
    );
  }

  return (
    <div className="mt-8">
      <p className="text-center text-sm font-medium text-rose-700 mb-3">
        Countdown to June 6, 2026
      </p>
      <div
        className="grid grid-cols-4 gap-2 sm:gap-4"
        role="timer"
        aria-live="polite"
        aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds remaining`}
      >
        {UNITS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-xl bg-white/90 border border-rose-100 px-2 py-4 sm:py-5 shadow-sm"
          >
            <span className="block text-2xl sm:text-4xl font-bold text-rose-900 tabular-nums">
              {pad(timeLeft[key])}
            </span>
            <span className="mt-1 block text-xs sm:text-sm font-medium text-rose-600 uppercase tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
