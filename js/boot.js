/* 지금 공부하는 과목의 자료(data/<id>.js)를 싣는다 — 화면마다 store.js 앞에 둔다.
   catalog.js · data/ready.js 가 먼저 실려 있어야 한다.
   ★ 지금 과목은 반드시 학생이 고른 시험의 과목 안에서 고른다 (2026-10-09).
     시험을 바꾼 뒤 옛 과목(예: 9급 → 소방 공채로 바꿨는데 국어)이 남거나, ?s= 로 남의 과목이 열리던 것을 막는다.
   고른 과목이 아직 준비 중이면, 그 학생 과목 중 준비된 첫 과목 → 그것도 없으면 준비된 아무 과목. */
(function () {
  "use strict";
  var P = {};
  try { P = JSON.parse(localStorage.getItem("jg.pref.v1") || "{}"); } catch (e) {}
  var R = window.READY || {}, C = window.CATALOG;
  /* 학생 과목 — 설정 전이면 store.js 와 같이 첫 시험(소방 공채)의 과목 */
  var mine = (P.subs && P.subs.length) ? P.subs
           : (C ? C.subsOf(P.exam || (C.EXAMS[0] || {}).id, P.series) : []);
  function ok(s) { return !!(s && R[s] && (!mine.length || mine.indexOf(s) >= 0)); }
  var want = new URLSearchParams(location.search).get("s");
  var cur = ok(want) ? want : P.cur;
  if (!ok(cur)) cur = mine.filter(function (s) { return R[s]; })[0] || Object.keys(R)[0];
  if (cur && P.cur !== cur) {
    P.cur = cur;
    try { localStorage.setItem("jg.pref.v1", JSON.stringify(P)); } catch (e) {}
  }
  window.JG_CUR = cur;
  if (cur) document.write('<script src="data/' + cur + '.js?v=' + (R[cur].v || "") + '"><\/script>');
})();
