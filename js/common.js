const CONFIG = {
  koreanHomeSlug: '/',
  englishHomeSlug: '/en',
  koreanBlogSlug: '/blog',
  englishBlogSlug: '/blog-en',

  // 영어 버전만 존재하는 블로그 글 slug 목록 (앞뒤 슬래시 없이 기재)
  // 예: 'hk-bno-visa-en' 처럼 기재하면 /hk-bno-visa-en/ 도 자동 처리됨
  orphanedEnglishPosts: [
    'hk-bno-visa-en'
  ],

  // 한국어 버전만 존재하는 블로그 글 slug 목록 (앞뒤 슬래시 없이 기재)
  orphanedKoreanPosts: [
    // 예시: 'settlement' 만 있고 'settlement-en' 이 없을 경우
  ]
};

/* [Helper] slug 기반 orphaned 체크
   currentPath가 배열 내 slug와 일치하는지 확인 (/slug, /slug/ 모두 처리)
*/
function isOrphanedPost(currentPath, slugList) {
  return slugList.some(function(slug) {
    return currentPath === '/' + slug || currentPath === '/' + slug + '/';
  });
}

/* [Helper] Hash 보존형 리디렉션 함수
   새로운 경로(newPath) 뒤에 원래 있던 해시(#)를 붙여서 이동시킵니다.
*/
const redirectWithHash = (newPath, replace = false) => {
  const currentHash = window.location.hash; // 예: "#section_1" or ""
  const finalUrl = newPath + currentHash;
  if (replace) {
    window.location.replace(finalUrl);
  } else {
    window.location.href = finalUrl;
  }
};
/* [Part 1] 전역 함수 정의 
*/
window.langSwitchEn = function () {
  localStorage.setItem('user_lang_pref', 'en');
  const currentPath = window.location.pathname;
  // 이미 영어 페이지거나 영어 홈이면 중단
  if (currentPath.endsWith('-en') || currentPath.endsWith('-en/') || (currentPath === CONFIG.englishHomeSlug)) return;
  // 한국어만 존재하는 orphaned 글 -> 영어 블로그 목록으로
  if (isOrphanedPost(currentPath, CONFIG.orphanedKoreanPosts)) {
    redirectWithHash(CONFIG.englishBlogSlug);
    return;
  }
  if (currentPath === '/' || currentPath === '') {
    redirectWithHash(CONFIG.englishHomeSlug);
  } else {
    let newPath = currentPath;
    if (newPath.endsWith('/')) {
      newPath = newPath.slice(0, -1) + '-en/';
    } else {
      newPath = newPath + '-en';
    }
    redirectWithHash(newPath);
  }
};
window.langSwitchKo = function () {
  localStorage.setItem('user_lang_pref', 'ko');
  const currentPath = window.location.pathname;
  // 영어만 존재하는 orphaned 블로그 글 -> 한국어 블로그 목록으로
  if (isOrphanedPost(currentPath, CONFIG.orphanedEnglishPosts)) {
    redirectWithHash(CONFIG.koreanBlogSlug);
    return;
  }
  // 홈 화면 체크
  if (currentPath === '/') return;
  // 영어 홈 체크
  if (currentPath === CONFIG.englishHomeSlug || currentPath === CONFIG.englishHomeSlug + '/') {
    redirectWithHash(CONFIG.koreanHomeSlug);
    return;
  }
  // 일반 영어 페이지 체크 (-en 또는 -en/ 제거)
  if (currentPath.endsWith('-en')) {
    const newPath = currentPath.substring(0, currentPath.length - 3);
    redirectWithHash(newPath);
  } else if (currentPath.endsWith('-en/')) {
    const newPath = currentPath.substring(0, currentPath.length - 4) + '/';
    redirectWithHash(newPath);
  }
};
/* [Part 2] DOM 로드 후 실행 
*/
document.addEventListener("DOMContentLoaded", function () {
  // 1. 버튼 이벤트 바인딩
  const enBtn = document.getElementById('btn-lang-en');
  if (enBtn) {
    enBtn.addEventListener('click', function (e) {
      e.preventDefault();
      langSwitchEn();
    });
  }
  const koBtn = document.getElementById('btn-lang-ko');
  if (koBtn) {
    koBtn.addEventListener('click', function (e) {
      e.preventDefault();
      langSwitchKo();
    });
  }
  // 2. 자동 리디렉션 로직
  const userPref = localStorage.getItem('user_lang_pref');
  if (userPref) return;
  const browserLang = navigator.language || navigator.userLanguage;
  const isKorean = browserLang.toLowerCase().includes('ko');
  const currentPath = window.location.pathname;
  // Case A: 한국인이 아닌데 한국어 페이지인 경우 -> 영어로
  // 단, 한국어만 있는 orphaned 글은 영어 블로그 목록으로
  if (!isKorean && !currentPath.endsWith('-en') && !currentPath.endsWith('-en/') && (currentPath !== CONFIG.englishHomeSlug) && (currentPath !== CONFIG.englishHomeSlug + '/')) {
    if (currentPath === '/' || currentPath === '') {
      redirectWithHash(CONFIG.englishHomeSlug, true);
    } else if (isOrphanedPost(currentPath, CONFIG.orphanedKoreanPosts)) {
      redirectWithHash(CONFIG.englishBlogSlug, true);
    } else {
      let newPath = currentPath;
      if (newPath.endsWith('/')) {
        newPath = newPath.slice(0, -1) + '-en/';
      } else {
        newPath = newPath + '-en';
      }
      redirectWithHash(newPath, true);
    }
    return;
  }
  // --- 한국인 방문자 처리 로직 (Case B & C) ---
  if (isKorean) {
    // Case B: 영어만 존재하는 orphaned 글 -> 한국어 블로그 목록으로
    if (isOrphanedPost(currentPath, CONFIG.orphanedEnglishPosts)) {
      redirectWithHash(CONFIG.koreanBlogSlug, true);
      return;
    }
    // Case C: 그 외 일반 영어 페이지인 경우 -> 한국어 페이지로 리디렉션
    if ((currentPath.endsWith('-en') || currentPath.endsWith('-en/')) && currentPath !== CONFIG.englishHomeSlug && currentPath !== CONFIG.englishHomeSlug + '/') {
      let newPath;
      if (currentPath.endsWith('-en/')) {
        newPath = currentPath.substring(0, currentPath.length - 4) + '/';
      } else {
        newPath = currentPath.substring(0, currentPath.length - 3);
      }
      redirectWithHash(newPath, true);
      return;
    }
    // 영어 홈(/en)에 들어왔다면 -> 한국어 홈(/)으로
    if (currentPath === CONFIG.englishHomeSlug || currentPath === CONFIG.englishHomeSlug + '/') {
      redirectWithHash(CONFIG.koreanHomeSlug, true);
      return;
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // [1] 입장 애니메이션 (Fade In)
  // 페이지 로드 시 50ms 뒤에 화면을 밝힙니다.
  setTimeout(function () {
    document.body.classList.add('fade-in');
  }, 50);
  // [2] 퇴장 애니메이션 (Fade Out) 로직
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      // 1. 필요한 값 추출
      const targetUrl = new URL(this.href); // 클릭한 링크의 전체 URL 객체화
      const currentUrl = window.location;   // 현재 페이지 URL
      const targetAttr = this.getAttribute('target');
      const hrefAttr = this.getAttribute('href');
      // [예외 처리 1] 기본 제외 대상
      // - href가 없거나
      // - 새 탭(_blank)으로 열거나
      // - 메일(mailto), 전화(tel) 링크인 경우
      if (!hrefAttr || targetAttr === '_blank' || hrefAttr.startsWith('mailto:') || hrefAttr.startsWith('tel:')) {
        return;
      }
      // [예외 처리 2] ★ 핵심 수정 ★: "같은 페이지 내 섹션 이동" 감지
      // 도메인(Origin)이 같고 + 경로(Pathname)가 같고 + 해시(#)가 있는 경우
      // -> 페이드 아웃 없이 부드러운 스크롤 이동만 처리함.
      let targetPath = targetUrl.pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '') || '/';
      let currentPath = currentUrl.pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '') || '/';

      if (targetUrl.origin === currentUrl.origin &&
        targetPath === currentPath &&
        targetUrl.hash !== '') {
        
        e.preventDefault(); // 브라우저 이동(새로고침) 막음
        
        try {
          const targetElement = document.querySelector(targetUrl.hash);
          if (targetElement) {
            const header = document.querySelector('.nav_fixed') || document.querySelector('.nav_component');
            const headerOffset = header ? header.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
            
            history.pushState(null, null, targetUrl.hash);
          }
        } catch(err) {
          console.warn("Invalid hash selector:", targetUrl.hash);
        }
        return; // 여기서 함수 종료! (애니메이션 실행 안 함)
      }
      // [예외 처리 3] 완전히 동일한 페이지를 다시 클릭한 경우 (새로고침 방지용 선택사항)
      // 해시 없이 그냥 현재 페이지 링크를 누른 경우
      if (this.href === window.location.href) {
        return;
      }
      // --- 여기까지 통과했다면 진짜 "다른 페이지"로 이동하는 것임 ---
      // [실행] 기본 이동 막고 애니메이션 시작
      e.preventDefault();
      // 화면을 다시 투명하게 (Fade Out)
      document.body.classList.remove('fade-in');
      // 0.4초 뒤에 진짜 이동
      setTimeout(function () {
        window.location.href = this.href;
      }.bind(this), 400);
    });
  });
});
// [3] 뒤로가기 캐시(bfcache) 대응
// 뒤로가기로 돌아왔을 때 화면이 하얗게 멈춰있는 현상 방지
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    document.body.classList.add('fade-in');
  }
});
