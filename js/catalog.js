/* ═══════════════════════════════════════════════════════════
   진격의 공시 — 시험 · 직렬 · 과목 목록 (2026-09-24)

   첫 설정에서 「어떤 시험을 보세요?」 → (9급이면) 직렬 → 과목이 정해진다.
   과목 자료는 data/<file>.js 하나씩. 자료가 있는 과목만 풀 수 있고, 없는 과목은 「준비 중」.
   어떤 과목이 준비됐는지는 data/ready.js(파이프라인 산출물)가 알려 준다 — 여기서 숫자를 박지 않는다.

   ★ 2027년 시험일은 아직 공고 전이다 — 모두 「예상」 표시. 학생이 바꿀 수 있다.
   ★ 9급 한국사는 2027년부터 한국사능력검정시험으로 대체 → 과목에서 뺐다.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  /* 과목 — file 은 data/ 아래 파일 이름(영문). 표시 이름은 name */
  var SUBJECTS = {
    admin:  { name: "행정법총론" },
    const:  { name: "헌법" },
    fire1:  { name: "소방학개론" },
    fire2:  { name: "소방관계법규" },
    crim:   { name: "형사법" },
    police: { name: "경찰학" },
    pub:    { name: "행정학개론" },
    kor:    { name: "국어" },
    eng:    { name: "영어" },
    edu:    { name: "교육학개론" },
    welfare:{ name: "사회복지학개론" },
    acct:   { name: "회계학" },
    tax:    { name: "세법개론" },
    corr:   { name: "교정학개론" },
    cpro:   { name: "형사소송법개론" },
    crimlaw:{ name: "형법" },
    intl:   { name: "국제법개론" },
    customs:{ name: "관세법개론" }
  };

  /* 시험 — 직렬이 하나면 series 를 두지 않는다 */
  var EXAMS = [
    { id: "fire",   name: "소방 공채", sub: "소방사 · 공개경쟁", date: "2027-03-06",
      subs: ["fire1", "fire2", "admin"] },
    { id: "police", name: "경찰 공채", sub: "순경 · 일반", date: "2027-03-13",
      subs: ["const", "crim", "police"] },
    /* 9급 직렬 — 2025년 접수 1,000명 이상인 일반전형(수집\직렬별_응시인원_2025.md, 2차 출처라 원문 대조 전) */
    { id: "n9", name: "국가직 9급", sub: "인사혁신처", date: "2027-04-03", series: [
      { id: "gen",     name: "일반행정",   subs: ["kor", "eng", "admin", "pub"] },
      { id: "tax",     name: "세무",       subs: ["kor", "eng", "tax", "acct"] },
      { id: "corr",    name: "교정",       subs: ["kor", "eng", "corr", "cpro"] },
      { id: "pros",    name: "검찰",       subs: ["kor", "eng", "crimlaw", "cpro"] },
      { id: "npa",     name: "경찰청 일반", subs: ["kor", "eng", "admin", "pub"] },
      { id: "edu",     name: "교육행정",   subs: ["kor", "eng", "edu", "admin"] },
      { id: "imm",     name: "출입국관리", subs: ["kor", "eng", "intl", "admin"] },
      { id: "cus",     name: "관세",       subs: ["kor", "eng", "customs", "acct"] }
    ] },
    { id: "l9", name: "지방직 9급", sub: "시·도", date: "2027-06-19", series: [
      { id: "gen",     name: "일반행정",   subs: ["kor", "eng", "admin", "pub"] },
      { id: "edu",     name: "교육행정",   subs: ["kor", "eng", "edu", "admin"] },
      { id: "welfare", name: "사회복지",   subs: ["kor", "eng", "welfare", "admin"] },
      { id: "tax",     name: "세무",       subs: ["kor", "eng", "tax", "acct"] }
    ] }
  ];

  function exam(id) { return EXAMS.filter(function (e) { return e.id === id; })[0] || null; }
  function series(examId, sid) {
    var e = exam(examId); if (!e || !e.series) return null;
    return e.series.filter(function (s) { return s.id === sid; })[0] || null;
  }
  /* 이 학생이 보는 과목들 — 시험·직렬에서 정해진다 */
  function subsOf(examId, sid) {
    var e = exam(examId); if (!e) return [];
    if (!e.series) return e.subs.slice();
    var s = series(examId, sid); return s ? s.subs.slice() : [];
  }
  function ready(id) { return !!(window.READY && window.READY[id]); }
  function count(id) { return (window.READY && window.READY[id] && window.READY[id].n) || 0; }

  window.CATALOG = { SUBJECTS: SUBJECTS, EXAMS: EXAMS, exam: exam, series: series, subsOf: subsOf,
                     ready: ready, count: count,
                     name: function (id) { return (SUBJECTS[id] || { name: id }).name; } };
})();
