export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">개인정보처리방침</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">1. 개인정보의 수집 항목</h2>
          <p>
            AI Tube는 별도의 회원가입 절차가 없으며, 사용자로부터 개인정보를
            수집하지 않습니다. 관리자 기능은 비밀번호 기반 인증만을 사용하며,
            별도의 개인정보를 저장하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">2. 쿠키 및 자동 수집 정보</h2>
          <p>
            서비스 이용 과정에서 다음 정보가 자동으로 수집될 수 있습니다:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>접속 IP 주소</li>
            <li>브라우저 종류 및 OS</li>
            <li>방문 일시 및 서비스 이용 기록</li>
          </ul>
          <p className="mt-2">
            이 정보는 서비스 안정성 확보 및 통계 분석 목적으로만 사용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">3. 외부 서비스 연동</h2>
          <p>
            서비스는 YouTube 영상 임베드 기능을 사용합니다.
            YouTube 영상 재생 시 Google의 개인정보처리방침이 적용될 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              YouTube (Google):&nbsp;
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google 개인정보처리방침
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">4. 개인정보의 보유 및 파기</h2>
          <p>
            서비스는 사용자 개인정보를 수집하지 않으므로, 별도의 보유 및 파기 절차가 없습니다.
            서버 로그는 30일 후 자동 삭제됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">5. 문의처</h2>
          <p>
            개인정보 관련 문의사항이 있으시면 아래로 연락해주세요.
          </p>
          <p className="mt-2">이메일: wlsuiny@gmail.com</p>
        </section>

        <p className="text-xs text-slate-400 pt-6 border-t border-slate-200">
          시행일: 2026년 4월 27일
        </p>
      </div>
    </div>
  );
}
