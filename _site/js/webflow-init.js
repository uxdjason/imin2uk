/* Webflow 기능: 브라우저의 Javascript 지원 및 터치 디바이스 여부 감지하여 html 태그에 클래스 추가 */
!function (o, c) {
  var n = c.documentElement, t = " w-mod-";
  n.className += t + "js";
  if ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) {
    n.className += t + "touch";
  }
}(window, document);
