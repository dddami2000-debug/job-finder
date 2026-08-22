"""공공기관 채용정보 API에서 진행 중인 신입·청년인턴 공고를 저장한다."""

import json
import os
import urllib.parse
import urllib.request
from pathlib import Path


API_URL = "https://apis.data.go.kr/1051000/recruitment/list"
MAX_JOBS = 300
PAGE_SIZE = 100
NEWCOMER_CODE = "R2010"
YOUTH_INTERN_CODES = {"R1050", "R1060", "R1070"}


def load_api_key() -> str:
    configured_key = os.environ.get("RECRUITMENT_API_KEY", "").strip()
    if configured_key:
        return configured_key

    env_path = Path(os.environ.get("RECRUITMENT_ENV_FILE", ".env"))
    if not env_path.exists():
        raise FileNotFoundError(f"환경변수 파일을 찾을 수 없습니다: {env_path}")

    for line in env_path.read_text(encoding="utf-8").splitlines():
        if line.startswith("RECRUITMENT_API_KEY="):
            key = line.split("=", 1)[1].strip().strip('"\'')
            if key:
                return key
    raise RuntimeError(".env에 RECRUITMENT_API_KEY가 없습니다.")


def fetch_page(api_key: str, page_no: int) -> dict:
    params = {
        "serviceKey": api_key,
        "numOfRows": PAGE_SIZE,
        "pageNo": page_no,
        "ongoingYn": "Y",
        "resultType": "json",
    }
    url = f"{API_URL}?{urllib.parse.urlencode(params)}"
    request = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(request, timeout=30) as response:
        payload = json.loads(response.read().decode("utf-8"))

    if str(payload.get("resultCode")) != "200":
        raise RuntimeError(f"API 오류 {payload.get('resultCode')}: {payload.get('resultMsg')}")
    return payload


def is_target_job(item: dict) -> bool:
    recruitment_type = item.get("recrutSe", "")
    employment_types = set(filter(None, item.get("hireTypeLst", "").split(",")))
    return recruitment_type == NEWCOMER_CODE or bool(employment_types & YOUTH_INTERN_CODES)


def date_value(value: str) -> str:
    if len(value) == 8 and value.isdigit():
        return f"{value[:4]}-{value[4:6]}-{value[6:]}"
    return value


def normalize_url(value: str) -> str:
    value = (value or "").strip()
    if value and not value.lower().startswith(("http://", "https://")):
        return f"https://{value}"
    return value


def safe_job(item: dict) -> dict:
    """연락처·담당자 정보가 포함되지 않은 공개 공고 필드만 남긴다."""
    return {
        "id": item.get("recrutPblntSn"),
        "institution": item.get("instNm", ""),
        "title": item.get("recrutPbancTtl", ""),
        "ncs": item.get("ncsCdNmLst", ""),
        "employment_type": item.get("hireTypeNmLst", ""),
        "recruitment_type": item.get("recrutSeNm", ""),
        "region": item.get("workRgnNmLst", ""),
        "start_date": date_value(item.get("pbancBgngYmd", "")),
        "deadline": date_value(item.get("pbancEndYmd", "")),
        "headcount": item.get("recrutNope"),
        "url": normalize_url(item.get("srcUrl", "")),
        "duties": item.get("jobCont", ""),
        "qualification": item.get("aplyQlfcCn", ""),
    }


def collect_jobs() -> list[dict]:
    api_key = load_api_key()
    jobs: list[dict] = []
    page_no = 1
    total_count = None

    while len(jobs) < MAX_JOBS and (total_count is None or (page_no - 1) * PAGE_SIZE < total_count):
        payload = fetch_page(api_key, page_no)
        total_count = int(payload.get("totalCount", 0))
        jobs.extend(safe_job(item) for item in payload.get("result", []) if is_target_job(item))
        if not payload.get("result"):
            break
        page_no += 1

    return jobs[:MAX_JOBS]


if __name__ == "__main__":
    output_path = Path(__file__).with_name("jobs.json")
    try:
        jobs = collect_jobs()
    except FileNotFoundError as error:
        raise SystemExit(f"{error}\n프로젝트 폴더에 .env를 만들고 RECRUITMENT_API_KEY를 설정하거나 RECRUITMENT_ENV_FILE 경로를 지정하세요.") from error
    output_path.write_text(
        json.dumps(jobs, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"저장 완료: {len(jobs)}건 -> {output_path}")
