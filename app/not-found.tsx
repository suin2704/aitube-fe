import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-slate-500 mb-8 max-w-md">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link href="/">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Home className="w-4 h-4 mr-2" />
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
