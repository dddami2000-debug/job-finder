# 인계 문서

## 이게 뭔지
충남대 학생을 위한 채용공고 데이터를 지역으로 찾고 추천 순서로 보여주는 화면이다.

## 지금 되는 것
브라우저에서 공고 카드 목록이 표시되는 것을 확인했다.
브라우저에서 지역을 입력하고 검색하면 해당 지역 공고만 남는 것을 확인했다.

## 지금 안 되는 것
마지막 수정사항은 아직 Vercel에 배포하지 않았다.
현재 jobs.json에는 지원 자격과 주요 업무 원문이 없어 안내 문구가 표시된다.
Supabase 테이블을 화면에서 실시간으로 읽는 연결은 아직 없다.

## 시도했다가 실패한 방법
RECRUITMENT_API_KEY 없이 `python3 fetch_jobs.py`를 실행해 공고를 갱신하려 했으나 .env 오류로 실패했다.

## 다음에 할 일
python3 -m http.server 4174
API 키를 .env에 설정하고 공고를 갱신한 뒤 브라우저에서 상세 펼침과 넘기기를 확인한다.

## 주소 3개
GitHub: https://github.com/dddami2000-debug/job-finder
Vercel: https://job-finder-dun-xi.vercel.app/
로컬 확인: http://127.0.0.1:4174/
