export const dynamic = "force-dynamic";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">이용약관</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">제1조 (목적)</h2>
          <p>
            이 약관은 AI Tube (이하 &ldquo;서비스&rdquo;)가 제공하는 AI 영상 큐레이션 서비스의 이용과
            관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">제2조 (서비스의 내용)</h2>
          <p>서비스는 다음의 기능을 제공합니다:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>AI 관련 유튜브 영상 큐레이션 및 카테고리 분류</li>
            <li>AI 기반 영상 핵심 요약</li>
            <li>난이도별 영상 분류</li>
            <li>영상 검색 기능</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">제3조 (면책)</h2>
          <p>
            서비스에서 제공하는 영상 콘텐츠의 저작권은 각 유튜브 채널 운영자에게 있습니다.
            서비스는 유튜브 영상에 대한 링크와 메타정보만을 제공하며, 영상 콘텐츠 자체를
            호스팅하지 않습니다.
          </p>
          <p className="mt-2">
            AI 요약은 자동 생성된 것으로, 원본 영상의 내용과 차이가 있을 수 있습니다.
            정확한 정보는 원본 영상을 참고해주세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">제4조 (지적재산권)</h2>
          <p>
            서비스의 UI, 디자인, 소프트웨어 등에 대한 지적재산권은 서비스 운영자에게 있습니다.
            유튜브 영상의 썸네일, 제목 등 메타데이터는 YouTube Data API를 통해 제공되며,
            YouTube 이용약관을 준수합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">제5조 (서비스 변경 및 중단)</h2>
          <p>
            서비스는 운영상, 기술상의 필요에 따라 서비스의 전부 또는 일부를
            변경하거나 중단할 수 있습니다.
          </p>
        </section>

        <p className="text-xs text-slate-400 pt-6 border-t border-slate-200">
          시행일: 2026년 4월 27일
        </p>
      </div>
    </div>
  );
}
