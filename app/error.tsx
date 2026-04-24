"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        문제가 발생했습니다
      </h1>
      <p className="text-slate-500 mb-8 max-w-md">
        일시적인 오류가 발생했습니다. 다시 시도해 주세요.
      </p>
      <Button
        onClick={reset}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        다시 시도
      </Button>
    </div>
  );
}
