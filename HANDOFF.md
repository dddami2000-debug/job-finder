git clone https://github.com/dddami2000-debug/job-finder.git && cd job-finder && python3 -m http.server 4174

## 이게 뭔지
충남대 학생에게 맞는 인턴·신입 공고를 Supabase에서 받아 추천하는 웹 화면이다.

## 지금 되는 것
사용자가 브라우저에서 직접 눌러 정상 동작을 확인한 항목은 아직 없다.

## 지금 안 되는 것
지원 자격과 주요 업무 원문은 데이터베이스에 없어 안내 문구로 표시된다.
공고를 담아 Supabase scraps 표에 저장하는 기능은 아직 없다.

## 시도했다가 실패한 방법
RECRUITMENT_API_KEY 없이 `python3 fetch_jobs.py`를 실행했으나 .env 오류로 공고를 갱신하지 못했다.

## 다음에 할 일
위 첫 줄을 다른 기기의 Codex에 붙여넣어 실행한 뒤 http://127.0.0.1:4174/ 를 연다.
지역 검색, 상세 펼침, 넘기기를 직접 누른 뒤 확인한 결과를 이 문서에 적는다.

## 주소 3개
GitHub: https://github.com/dddami2000-debug/job-finder
Vercel: https://job-finder-dun-xi.vercel.app/
Supabase: https://supabase.com/dashboard/project/lwlaytzghoujsnoespdp
