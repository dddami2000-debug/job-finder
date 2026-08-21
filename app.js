const JOBS = [
  { id: 1, company: "네이버클라우드", logo: "NAVER", color: "#19b56b", title: "클라우드 서비스 기획 체험형 인턴", type: "인턴", category: "기획", location: "경기", remote: true, deadline: 3, posted: 8, match: 98, tags: ["서비스 기획", "리서치"], summary: "사용자와 시장을 이해하고 클라우드 서비스의 새로운 기회를 함께 찾는 포지션입니다.", requirements: ["4년제 대학 재학 또는 휴학 중인 분", "IT 서비스와 사용자 경험에 관심이 있는 분", "문제를 구조화하고 글로 정리하는 데 익숙한 분"] },
  { id: 2, company: "당근", logo: "당근", color: "#ff6f0f", title: "지역 커뮤니티 마케팅 어시스턴트", type: "인턴", category: "마케팅", location: "서울", remote: false, deadline: 5, posted: 7, match: 95, tags: ["콘텐츠", "SNS"], summary: "지역의 이야기를 발견하고 사람들이 공감하는 콘텐츠로 만드는 마케팅 인턴십입니다.", requirements: ["콘텐츠 제작 경험이 있는 분", "새로운 트렌드를 빠르게 발견하는 분", "3개월 이상 근무 가능한 분"] },
  { id: 3, company: "토스", logo: "toss", color: "#3569ed", title: "Data Analyst Assistant", type: "인턴", category: "데이터", location: "서울", remote: false, deadline: 1, posted: 6, match: 94, tags: ["SQL", "데이터 분석"], summary: "데이터를 통해 고객 행동을 이해하고 제품 팀의 의사결정을 돕습니다.", requirements: ["SQL 기초 문법을 활용할 수 있는 분", "수치에서 의미를 찾는 과정을 좋아하는 분", "분석 결과를 명확하게 설명할 수 있는 분"] },
  { id: 4, company: "카카오페이", logo: "pay", color: "#c69b00", title: "UX/UI 디자인 인턴", type: "인턴", category: "디자인", location: "경기", remote: true, deadline: 8, posted: 5, match: 91, tags: ["Figma", "프로토타입"], summary: "금융을 더 쉽고 편안하게 만드는 화면과 사용자 경험을 설계합니다.", requirements: ["Figma를 활용한 포트폴리오가 있는 분", "사용자 관점에서 문제를 발견하는 분", "디자인 피드백을 열린 태도로 주고받는 분"] },
  { id: 5, company: "무신사", logo: "MUS", color: "#191919", title: "패션 플랫폼 콘텐츠 마케터 신입", type: "신입", category: "마케팅", location: "서울", remote: false, deadline: 12, posted: 4, match: 89, tags: ["브랜드", "콘텐츠"], summary: "패션과 문화를 연결하는 콘텐츠를 기획하고 브랜드의 목소리를 만들어갑니다.", requirements: ["패션·라이프스타일 콘텐츠에 관심이 있는 분", "개인 또는 팀 프로젝트 경험이 있는 분", "2027년 2월 이전 졸업 가능한 분"] },
  { id: 6, company: "오늘의집", logo: "OH", color: "#229ab8", title: "프론트엔드 엔지니어 신입", type: "신입", category: "개발", location: "서울", remote: true, deadline: 15, posted: 3, match: 87, tags: ["React", "TypeScript"], summary: "누구나 자신의 공간을 쉽게 바꿀 수 있도록 빠르고 편리한 웹 경험을 만듭니다.", requirements: ["웹 개발 프로젝트 경험이 있는 분", "JavaScript의 기본 원리를 이해하는 분", "사용자 경험과 코드 품질을 함께 고민하는 분"] },
  { id: 7, company: "우아한형제들", logo: "배민", color: "#188e8a", title: "프로덕트 매니저 신입 공채", type: "신입", category: "기획", location: "서울", remote: false, deadline: 7, posted: 2, match: 84, tags: ["PM", "서비스"], summary: "배달 경험의 문제를 발견하고 여러 팀과 함께 더 나은 해결책을 만듭니다.", requirements: ["고객 문제를 해결한 프로젝트 경험이 있는 분", "논리적으로 생각하고 소통하는 분", "2027년 2월 졸업 예정자 지원 가능"] },
  { id: 8, company: "멋쟁이사자처럼", logo: "LIKE", color: "#df5420", title: "대학생 IT 창업 동아리 15기", type: "대외활동", category: "개발", location: "원격", remote: true, deadline: 20, posted: 1, match: 82, tags: ["사이드 프로젝트", "교육"], summary: "전국 대학생과 함께 아이디어를 실제 서비스로 만드는 IT 창업 동아리입니다.", requirements: ["대학생 또는 휴학생", "개발과 창업에 관심이 있는 분", "팀 활동에 성실하게 참여할 수 있는 분"] }
];

const STORAGE_KEY = "campus-job-saved-v1";
const state = { query: "", types: [], categories: [], location: "전체", sort: "recommend", savedOnly: false, saved: loadSaved() };
const elements = {
  grid: document.querySelector("#job-grid"), resultCount: document.querySelector("#result-count"), summary: document.querySelector("#result-summary"), empty: document.querySelector("#empty-results"),
  searchForm: document.querySelector("#search-form"), searchInput: document.querySelector("#search-input"), sort: document.querySelector("#sort-select"), filters: document.querySelector("#filter-panel"),
  reset: document.querySelector("#reset-filters"), emptyReset: document.querySelector("#empty-reset"), savedToggle: document.querySelector("#show-saved"), savedCount: document.querySelector("#saved-count"),
  mobileFilter: document.querySelector("#mobile-filter-toggle"), dialog: document.querySelector("#job-dialog"), dialogCompany: document.querySelector("#dialog-company"), dialogContent: document.querySelector("#dialog-content"), closeDialog: document.querySelector("#close-dialog"), toast: document.querySelector("#toast")
};

function loadSaved() { try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(data) ? data : []; } catch { return []; } }
function saveSaved() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.saved)); }
function escapeHtml(value) { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
function deadlineLabel(days) { return days === 1 ? "내일 마감" : `D-${days}`; }

function getVisibleJobs() {
  const query = state.query.toLowerCase();
  const filtered = JOBS.filter(job => {
    const searchable = [job.company, job.title, job.category, ...job.tags].join(" ").toLowerCase();
    return (!query || searchable.includes(query)) && (!state.types.length || state.types.includes(job.type)) && (!state.categories.length || state.categories.includes(job.category)) && (state.location === "전체" || job.location === state.location || (state.location === "원격" && job.remote)) && (!state.savedOnly || state.saved.includes(job.id));
  });
  return filtered.sort((a, b) => state.sort === "deadline" ? a.deadline - b.deadline : state.sort === "newest" ? b.posted - a.posted : b.match - a.match);
}

function renderCard(job) {
  const saved = state.saved.includes(job.id);
  return `<article class="job-card"><div class="job-card-top"><span class="company-logo" style="--logo:${job.color}">${escapeHtml(job.logo)}</span><div class="company-info"><strong>${escapeHtml(job.company)}</strong><span>추천도 ${job.match}%</span></div><button class="save-button${saved ? " is-saved" : ""}" type="button" data-save="${job.id}" aria-label="${escapeHtml(job.title)} ${saved ? "저장 취소" : "저장"}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button></div><h3>${escapeHtml(job.title)}</h3><div class="job-tags"><span class="type">${job.type}</span><span>${job.location}</span>${job.remote ? '<span class="remote">원격 가능</span>' : ""}${job.tags.slice(0, 1).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}</div><div class="job-card-footer"><div class="deadline${job.deadline <= 3 ? " urgent" : ""}"><strong>${deadlineLabel(job.deadline)}</strong><span>${job.deadline}일 후 마감</span></div><button class="detail-button" type="button" data-detail="${job.id}">상세 보기</button></div></article>`;
}

function render() {
  const jobs = getVisibleJobs();
  elements.grid.innerHTML = jobs.map(renderCard).join("");
  elements.grid.hidden = jobs.length === 0; elements.empty.hidden = jobs.length !== 0;
  elements.resultCount.textContent = `${state.savedOnly ? "저장한 공고" : "검색 결과"} ${jobs.length}개`;
  elements.summary.textContent = state.savedOnly ? "관심 있게 저장한 공고를 모아봤어요." : state.query ? `‘${state.query}’ 검색 결과를 추천 순으로 보여드려요.` : "대학생에게 잘 맞는 기회를 추천 순으로 보여드려요.";
  elements.savedCount.textContent = state.saved.length; elements.savedToggle.setAttribute("aria-pressed", String(state.savedOnly));
}

function updateFilters() {
  state.types = [...document.querySelectorAll('input[name="type"]:checked')].map(input => input.value);
  state.categories = [...document.querySelectorAll('input[name="category"]:checked')].map(input => input.value);
  state.location = document.querySelector('input[name="location"]:checked').value; render();
}
function resetAll() {
  state.query = ""; state.types = []; state.categories = []; state.location = "전체"; state.savedOnly = false; state.sort = "recommend";
  elements.searchInput.value = ""; elements.sort.value = "recommend"; elements.filters.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false); elements.filters.querySelector('input[value="전체"]').checked = true; render();
}
function showToast(message) { elements.toast.textContent = message; elements.toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), 1800); }
function toggleSave(id) {
  const job = JOBS.find(item => item.id === id); const index = state.saved.indexOf(id);
  if (index >= 0) { state.saved.splice(index, 1); showToast(`${job.company} 공고 저장을 취소했어요.`); } else { state.saved.push(id); showToast(`${job.company} 공고를 저장했어요.`); }
  saveSaved(); render();
}
function openDetail(id) {
  const job = JOBS.find(item => item.id === id); if (!job) return;
  elements.dialogCompany.textContent = job.company;
  elements.dialogContent.innerHTML = `<div class="dialog-body"><div class="job-tags"><span class="type">${job.type}</span><span>${job.category}</span>${job.remote ? '<span class="remote">원격 가능</span>' : ""}</div><h2>${escapeHtml(job.title)}</h2><p>${escapeHtml(job.summary)}</p><div class="dialog-meta"><div><span>근무 지역</span><strong>${job.location}</strong></div><div><span>접수 마감</span><strong>${deadlineLabel(job.deadline)}</strong></div><div><span>추천도</span><strong>${job.match}%</strong></div></div><div class="dialog-section"><h3>이런 분을 찾고 있어요</h3><ul>${job.requirements.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div><button class="dialog-apply" type="button" data-apply="${job.id}">기업 채용 페이지 확인</button></div>`;
  elements.dialog.showModal();
}

elements.searchForm.addEventListener("submit", event => { event.preventDefault(); state.query = elements.searchInput.value.trim(); state.savedOnly = false; render(); document.querySelector("#jobs").scrollIntoView(); });
document.querySelectorAll("[data-keyword]").forEach(button => button.addEventListener("click", () => { elements.searchInput.value = button.dataset.keyword; state.query = button.dataset.keyword; state.savedOnly = false; render(); document.querySelector("#jobs").scrollIntoView(); }));
elements.filters.addEventListener("change", updateFilters); elements.sort.addEventListener("change", () => { state.sort = elements.sort.value; render(); });
elements.reset.addEventListener("click", resetAll); elements.emptyReset.addEventListener("click", resetAll);
elements.savedToggle.addEventListener("click", () => { state.savedOnly = !state.savedOnly; render(); document.querySelector("#jobs").scrollIntoView(); });
elements.mobileFilter.addEventListener("click", () => { const open = elements.filters.classList.toggle("is-open"); elements.mobileFilter.setAttribute("aria-expanded", String(open)); elements.mobileFilter.querySelector("span").textContent = open ? "−" : "＋"; });
elements.grid.addEventListener("click", event => { const save = event.target.closest("[data-save]"); const detail = event.target.closest("[data-detail]"); if (save) toggleSave(Number(save.dataset.save)); if (detail) openDetail(Number(detail.dataset.detail)); });
elements.closeDialog.addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", event => { if (event.target === elements.dialog) elements.dialog.close(); const apply = event.target.closest("[data-apply]"); if (apply) showToast("예시 공고라 외부 채용 페이지는 연결되지 않아요."); });
render();
