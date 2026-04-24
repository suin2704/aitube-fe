"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

function Counter({ end, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1500;

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-blue-600">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
      <Counter end={150} label="큐레이션 영상" suffix="+" />
      <Counter end={5} label="카테고리" />
      <Counter end={3} label="난이도 분류" />
      <Counter end={50} label="AI 요약 제공" suffix="+" />
    </div>
  );
}
