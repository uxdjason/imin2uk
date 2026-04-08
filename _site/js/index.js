  document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
      // --- [레이아웃 설정] ---
      slidesPerView: 1,
      spaceBetween: 20,
      // --- [핵심 로직 변경] ---
      slidesPerGroup: 1,    // 1개씩 이동
      loop: false,          // ★ 중요: 무한 반복 끄기 (False) ★
      // loop가 false여야 처음/끝에서 멈추고 버튼이 비활성화됩니다.
      // --- [반응형] ---
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 30 },
        992: { slidesPerView: 3, spaceBetween: 40 }
      },
      // --- [네비게이션] ---
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      pagination: {
        el: '.swiper-pagination', // 아까 만든 Div 클래스명
        clickable: true,          // 클릭해서 이동 가능 여부
        type: 'bullets',          // 점/사각형 형태 (기본값)
      },
      speed: 800,
    });
  });
