# Code review: 노선 강의 2일차 완료 점검

## Review constraints

| Axis | Selection |
|---|---|
| Target | `AGENTS.md`, `index.html`, Supabase 스키마·정책, 배포 상태, `HANDOFF.md` |
| Baseline | 노선 2일차 과제와 `AGENTS.md` 기반 |
| Scope | 저장소와 연결된 Supabase·Vercel 범위 |
| Invocation | 수정 작업에 포함된 리뷰 |
| Output | 이 보고서와 수정 커밋 |
| Dimensions | 요구사항, 동작, 접근성, 보안, 인계 가능성 |
| Validation/tools | 로컬 브라우저, Supabase 카탈로그·정책 확인, Git 정적 검사 |
| Writes/artifacts | 코드·마이그레이션·문서 수정 |

## Summary

2일차 핵심 실습인 요구사항 문서화, 실제 공고 표시, Supabase 공용 담기, 코드 리뷰와 인계 문서 갱신까지 수행했다. 저장·검색·정렬·펼침·넘기기는 로컬 브라우저에서 확인했다. 다만 원천 데이터에 지원 자격과 주요 업무가 없어 `관련 경력 1년 이상 필수` 공고를 원문 수준으로 판별하는 일은 아직 완료할 수 없다.

## Related decomplex review

- **Report:** 별도 decomplex 보고서 없음
- **Owner disposition summary:** 해당 없음

## Coverage

### Inspected

- `AGENTS.md`의 미정 항목, 추천 규칙, 제외 범위와 보안 규칙
- 공고 조회·지역 필터·정렬·펼침·넘기기·공용 담기 코드
- Supabase `jobs`·`scraps`의 RLS, 권한, 정책과 중복 방지 키
- 로컬 새로고침 지속성, 키보드 포커스, 브라우저 콘솔 오류

### Skipped or partial

- 실제 휴대폰의 화면 잘림 여부와 Padlet 제출은 사용자 기기·계정이 필요해 직접 완료하지 못함
- 166개 원문 공고의 지원 자격·주요 업무 수집은 현재 DB에 원문 필드가 없어 부분 검토

### Required boundaries

- 비밀번호·비밀키·service_role 키·개인정보를 공개 코드나 테이블에 추가하지 않음
- 로그인 없는 2일차 범위이므로 담기 목록은 개인 목록이 아닌 공용 실습 목록으로 명시함

## Validation

- **Run:** `git diff --check`; 로컬 브라우저에서 공고 15건 로드, 대전 필터 후 1건을 넘기고 3건 표시, 펼침/접기, 정렬, 담기 후 새로고침 시 1건 유지, 콘솔 오류 0건
- **Skipped/unavailable:** 물리 휴대폰과 Padlet 계정 검증, 지원 자격 원문 전수 확인

## Plan-backed verdicts

1. **Plan/baseline quality and omissions:** 7개 `(모름)`과 비밀정보·개인정보 규칙 누락을 해소했다.
2. **Implementation compliance:** 확인 가능한 UI·DB 요구사항은 구현했으며 원천 데이터 부재는 정직한 안내로 축소했다.
3. **Implementation quality beyond the baseline:** 최소 권한 RLS 마이그레이션과 공용 목록 표기를 추가했다.
4. **Test and validation quality:** 주요 동작과 저장 지속성을 브라우저로 검증했지만 실제 휴대폰 검증은 남았다.

## Plan compliance matrix

| Authority item / implied requirement | Expected evidence | Implementation evidence | Validation / test evidence | Status |
|---|---|---|---|---|
| AGENTS 미정 항목 해소 | `(모름)` 없음 | 구체 규칙과 제외 범위 | `rg` 확인 | 완료 |
| 지원 자격 우선 표시 | 카드 첫 화면의 한 줄 | `qualificationSummary` | 브라우저 카드 문구 확인 | 부분 완료: 원문 데이터 필요 |
| 펼침·접기와 넘기기 | 같은 자리 상호작용 | native `details`, 넘긴 목록 | 브라우저 클릭 확인 | 완료 |
| 마감·인턴·안테나 정렬 | 선택 가능한 정렬 | 비교 함수와 구체 키워드 | 브라우저 정렬 변경 확인 | 완료 |
| Supabase 담기 | 새로고침 후 유지 | `scraps` INSERT/SELECT | 담기 후 새로고침 1건 | 완료 |
| 최소 권한 보안 | RLS와 필요한 권한만 | 마이그레이션 SQL | 라이브 카탈로그·advisor 확인 | 완료 |
| 코드 리뷰 후 수정 | 별도 수정 커밋 | 포커스 표시와 중복 안내 개선 | 포커스 스타일·콘솔 확인 | 완료 |
| 최신 HANDOFF | 실행 명령·3주소·제약 | `HANDOFF.md` | 내용 점검 | 완료 |

### Approvals and conflicts

- **Approved deviation:** 개인별 스크랩 대신 로그인 없는 수업용 공용 스크랩을 사용함
- **Authority conflict:** 카드에서 경력 필수 여부를 확정하라는 기준과, 지원 자격이 없는 원천 데이터가 충돌함

## Follow-up closure

- **Round and material delta:** 최초 점검 뒤 미정 규칙, 공용 저장, 오탐 키워드, 접근성, 마이그레이션과 인계 문서를 수정함
- **Closure state:** Human decision required
- **Resolved or withdrawn:** 무동작 입력, 과장된 자격 문구, `통신` 오탐, 죽은 scraps 실시간 구독, 카드 탭 접근성, 재현 불가능한 DB 설정
- **Still material:** 원문 지원 자격·주요 업무 수집과 실제 휴대폰 검증
- **New fix-caused or fix-exposed findings:** 없음

## Findings

### S2 — 지원 자격 원문 부재로 경력 필수 제외를 확정할 수 없음

- **Dimension / authority:** 추천 정확성 / `AGENTS.md` 추천 규칙
- **Location:** Supabase `public.jobs`, `index.html`의 `isTargetJob`
- **Impact:** 제목상 신입인 공고도 원문에 필수 경력이 있으면 후보에 남을 수 있음
- **Evidence:** 라이브 `jobs`와 `jobs.json`에 `qualification`, `duties` 값이 없음
- **Confidence:** 높음
- **Condition:** 원천 공고 상세를 별도 수집하지 않는 동안 계속됨
- **Validation state:** DB 스키마와 166개 로컬 데이터 확인
- **Smallest safe fix / validation:** 원문 자격·업무 수집 후 1년 이상 필수 문구 필터 테스트를 추가함

## Context-dependent concerns

- **Concern:** 공용 스크랩은 모든 방문자가 같은 목록을 보며 개인 목록이 아님
- **Disposition:** 2일차 로그인 제외 범위에 맞춰 UI와 문서에 `실습용 공용`이라고 명시함

## Confirmed-good areas

- `jobs`와 `scraps`에 RLS가 활성화되고 anon/authenticated에는 필요한 SELECT·INSERT만 허용됨
- `scraps.job_id` 기본키가 중복 저장을 막고 `jobs.id` 외래키로 잘못된 공고 ID를 막음
- 정렬·검색·펼침·넘기기·저장 새로고침과 포커스 표시에서 콘솔 오류가 없음

## Limitations and caveats

- 실제 휴대폰 화면과 Padlet 제출은 사용자 계정·기기에서 최종 확인해야 함
- public/publishable 키는 브라우저용이며 비밀 service_role 키는 저장소에 포함하지 않음

## Next steps

1. 원문 지원 자격과 주요 업무를 `jobs`에 적재한다.
2. 필수 경력 1년 이상 제외 규칙을 대표 문구별로 검증한다.
3. 실제 휴대폰에서 Vercel 페이지를 확인하고 Padlet에 증빙을 제출한다.
