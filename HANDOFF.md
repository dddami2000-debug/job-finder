git clone https://github.com/dddami2000-debug/job-finder.git && cd job-finder && python3 -m http.server 4174

## 이게 뭔지
충남대 학생에게 맞는 인턴·신입 공고를 Supabase에서 받아 추천하는 웹 화면이다.

## 지금 되는 것
Supabase의 실제 공고를 불러와 마감일·인턴·안테나 키워드 기준으로 정렬한다.
지역 검색, 상세 펼침·접기, 넘기기와 넘긴 공고 보관이 동작한다.
`담기`는 로그인 없는 실습용 공용 목록에 저장되며 새로고침 뒤에도 유지된다.

## 지금 안 되는 것
현재 공고 데이터에 지원 자격과 주요 업무 원문이 없어 `원문 확인 필요`로 표시한다.
개인별 담기와 넘긴 공고 기기 간 동기화는 로그인 기능이 없어 지원하지 않는다.

## 시도했다가 실패한 방법
RECRUITMENT_API_KEY 없이 `python3 fetch_jobs.py`를 실행했으나 .env 오류로 공고를 갱신하지 못했다.
NCS의 넓은 `통신` 단어로 안테나 관련성을 판단했지만 오탐이 있어 구체 키워드로 바꿨다.

## 다음에 할 일
python3 -m http.server 4174
원문에서 지원 자격과 주요 업무를 수집해 jobs 데이터에 추가한 뒤 필수 경력 제외를 재검증한다.
실제 휴대폰에서 Vercel 주소를 열어 글자와 버튼이 잘리지 않는지 확인한다.

## 주소 3개
GitHub: https://github.com/dddami2000-debug/job-finder
Vercel: https://job-finder-dun-xi.vercel.app/
Supabase: https://supabase.com/dashboard/project/lwlaytzghoujsnoespdp
