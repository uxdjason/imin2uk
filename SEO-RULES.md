# Imin2UK SEO Rules & Checklist
> **이 문서는 신규 페이지 작업 시 반드시 참조해야 합니다.**
> AI 코딩 툴(Antigravity, Cursor 등)이 페이지를 생성·수정할 때 이 규칙을 따라야 합니다.
> Last updated: 2026-04-27

---

## 사이트 구조 개요

| URL | 언어 | 설명 |
|---|---|---|
| `https://imin2uk.com/` | 한국어 (ko) | 한국어 홈 — x-default |
| `https://imin2uk.com/en/` | 영어 (en) | 영문 홈 |
| `https://imin2uk.com/[slug]/` | 한국어 | 한국어 하위 페이지 |
| `https://imin2uk.com/[slug]-en/` | 영어 | 영문 하위 페이지 |

---

## ✅ 신규 페이지 체크리스트

### 1. `hreflang` — 언어 타겟팅 (가장 중요)

**규칙:**
- 반드시 `ko`, `en` (단순 코드) 사용. `ko-KR`, `en-GB` 사용 금지.
- **`en` hreflang의 href는 반드시 자기 자신을 가리켜야 함** (가장 흔한 실수!)
- 한국어·영어 양쪽 페이지에 동일한 hreflang 쌍이 모두 있어야 함 (대칭 필수)

**영문 페이지 템플릿:**
```html
<link rel="canonical" href="https://imin2uk.com/[slug]-en/">
<link rel="alternate" hreflang="ko" href="https://imin2uk.com/[slug]/">
<link rel="alternate" hreflang="en" href="https://imin2uk.com/[slug]-en/">
<link rel="alternate" hreflang="x-default" href="https://imin2uk.com/[slug]/">
```

**한국어 페이지 템플릿:**
```html
<link rel="canonical" href="https://imin2uk.com/[slug]/">
<link rel="alternate" hreflang="ko" href="https://imin2uk.com/[slug]/">
<link rel="alternate" hreflang="en" href="https://imin2uk.com/[slug]-en/">
<link rel="alternate" hreflang="x-default" href="https://imin2uk.com/[slug]/">
```

**홈페이지 (특수 케이스):**
```html
<!-- 영문 홈 (home-en.njk) -->
<link rel="canonical" href="https://imin2uk.com/en/">
<link rel="alternate" hreflang="ko" href="https://imin2uk.com/">
<link rel="alternate" hreflang="en" href="https://imin2uk.com/en/">
<link rel="alternate" hreflang="x-default" href="https://imin2uk.com/">

<!-- 한국어 홈 (index.njk) -->
<link rel="canonical" href="https://imin2uk.com/">
<link rel="alternate" hreflang="ko" href="https://imin2uk.com/">
<link rel="alternate" hreflang="en" href="https://imin2uk.com/en/">
<link rel="alternate" hreflang="x-default" href="https://imin2uk.com/">
```

> ⚠️ **가장 흔한 실수**: `hreflang="en"` href를 `/en/`(홈)으로 설정하는 것.
> 각 영문 페이지의 `en` href는 반드시 **그 페이지 자신의 URL**이어야 합니다.

---

### 2. `og:` Open Graph 메타태그

**영문 페이지:**
```html
<meta property="og:url" content="https://imin2uk.com/[slug]-en/">
<meta property="og:locale" content="en_GB">
<meta property="og:locale:alternate" content="ko_KR">
<meta property="og:type" content="website">   <!-- 일반 페이지 -->
<!-- 블로그 포스트의 경우: og:type = "article" -->
```

**한국어 페이지:**
```html
<meta property="og:url" content="https://imin2uk.com/[slug]/">
<meta property="og:locale" content="ko_KR">
<meta property="og:locale:alternate" content="en_GB">
<meta property="og:type" content="website">
```

---

### 3. `canonical` 태그

- 반드시 trailing slash 포함: `/slug/` (슬래시로 끝나야 함)
- canonical은 반드시 **자기 자신**을 가리켜야 함
- 절대 URL 사용 (`https://imin2uk.com/...`)

---

### 4. JSON-LD 구조화 데이터

- `"url"` 값에 trailing slash 반드시 포함: `"https://imin2uk.com/[slug]/"`
- 영문 페이지: `"inLanguage": "en-GB"`
- 한국어 페이지: `"inLanguage": "ko-KR"`

**영문 일반 페이지 (WebPage 타입):**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "url": "https://imin2uk.com/[slug]-en/",
  "inLanguage": "en-GB"
}
```

**블로그 포스트 (BlogPosting 타입) — blog-posts.njk 레이아웃이 자동 처리:**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ h1 }}",
  "url": "https://imin2uk.com/{{ slug }}/",
  "inLanguage": "en-GB" 또는 "ko-KR"
}
```

---

### 5. `<html lang="">` 속성

- 영문 페이지: `<html lang="en-GB">`
- 한국어 페이지: `<html lang="ko-KR">`

---

### 6. 헤더 내 한국어 텍스트 (header-en.njk)

- 로고 `alt` 속성은 반드시 영문으로: `alt="Imin2UK Logo"`
- 언어 전환 버튼(`한국어`)은 UI 요소이므로 한국어 텍스트 유지 가능하나,
  반드시 `aria-label="Switch to Korean"` 추가

---

## 📋 블로그 포스트 front matter 규칙

`blog-posts/` 디렉토리의 `.md` 파일은 `blog-posts.njk` 레이아웃을 통해 렌더링됩니다.
front matter에 다음 필드가 필수입니다:

```yaml
---
slug: "post-name-en"          # URL slug — 영문은 반드시 -en으로 끝남
title: "Post Title"
seo_title: "Full SEO Title - Imin2UK"
seo_description: "Meta description (150자 이내)"
h1: "Page H1 Heading"
date: 2026-01-01T09:00:00Z
tags:
  - "Tag1"
  - "Tag2"
language: en                  # 영문: en / 한국어: ko
# 아래는 한국어 대응 포스트가 없는 경우에만 추가
# no_ko_page: true
---
```

**영문 slug 규칙:**
- 반드시 `-en`으로 끝남: `graduate-visa-en`, `student-visa-en` 등
- 한국어 대응 slug: `-en` 제거 → `graduate-visa`, `student-visa`

**한국어 대응 포스트가 없는 경우:**
```yaml
language: en
no_ko_page: true   # 이 플래그가 있으면 ko hreflang 생략됨
```

**한국어 포스트인데 영어 대응 포스트가 없는 경우:**
```yaml
language: ko
no_en_page: true   # 이 플래그가 있으면 en hreflang 생략됨
```

> ⚠️ **중요**: `no_en_page` 또는 `no_ko_page` 없이 대응 페이지가 존재하지 않는 경우,
> Google은 `hreflang` 대상 URL을 크롤하다가 404를 만나 "Alternative page with proper canonical tag"
> 오류를 발생시킵니다. 반드시 플래그를 사용하거나 대응 포스트를 작성하세요.

---

## 📄 신규 `.njk` / `.html` 페이지 전체 헤드 템플릿

새 영문 페이지를 만들 때 아래 `<head>` 블록을 복사해서 사용하세요:

```html
<!DOCTYPE html>
<html lang="en-GB">

<head>
  <meta charset="utf-8">
  <title>PAGE TITLE | Imin2UK</title>
  <meta content="META DESCRIPTION (150자 이내)" name="description">
  <meta content="PAGE TITLE | Imin2UK" property="og:title">
  <meta content="META DESCRIPTION" property="og:description">
  <meta content="PAGE TITLE | Imin2UK" property="twitter:title">
  <meta content="META DESCRIPTION" property="twitter:description">
  <meta property="og:type" content="website">
  <meta content="summary_large_image" name="twitter:card">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link rel="canonical" href="https://imin2uk.com/[slug]-en/">
  <link rel="alternate" hreflang="ko" href="https://imin2uk.com/[slug]/">
  <link rel="alternate" hreflang="en" href="https://imin2uk.com/[slug]-en/">
  <link rel="alternate" hreflang="x-default" href="https://imin2uk.com/[slug]/">
  <meta property="og:url" content="https://imin2uk.com/[slug]-en/">
  <meta property="og:locale" content="en_GB">
  <meta property="og:locale:alternate" content="ko_KR">
  <meta property="og:image" content="https://imin2uk.com/images/Imin2UK-home-intro2.webp">
  <meta property="twitter:image" content="https://imin2uk.com/images/Imin2UK-home-intro2.webp">
  <link href="/css/normalize.css" rel="stylesheet" type="text/css">
  <link href="/css/webflow.css" rel="stylesheet" type="text/css">
  <link href="/css/wordpress-clone-imin2uk.webflow.css" rel="stylesheet" type="text/css">
  <script src="/js/webflow-init.js" type="text/javascript"></script>
  <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon">
  <link href="/images/webclip.png" rel="apple-touch-icon">
  <link href="/css/common.css" rel="stylesheet" type="text/css">
</head>
```

---

## 🗺️ sitemap.xml 규칙

파일: `sitemap.xml.njk`

- 홈페이지 두 버전(`/`, `/en/`)은 **반드시 `<xhtml:link>` alternate 포함**
- `/blog/`, `/blog-en/`, `/contact/`, `/contact-en/`, `/privacy-policy/`, `/privacy-policy-en/`는 **명시적으로 선언** (Eleventy 컬렉션 루프에 포함 안 될 수 있음)
- 블로그 포스트는 `page.data.slug`가 있는 경우에만 루프에 포함
- `xmlns:xhtml="http://www.w3.org/1999/xhtml"` 네임스페이스 필수

배포 후 Google Search Console에서 사이트맵 재제출 필요:
`https://imin2uk.com/sitemap.xml`

---

## 🔍 배포 후 Google Search Console 체크리스트

1. **사이트맵 재제출**: `Sitemaps` 메뉴 → 기존 삭제 → `imin2uk.com/sitemap.xml` 제출
2. **신규/수정 페이지 인덱싱 요청**: 상단 검색창에 URL 입력 → `Request indexing`
3. **인덱싱 확인**: 1~2주 후 `Pages` 리포트에서 상태 확인

---

## ❌ 절대 하지 말아야 할 것들

| 잘못된 예 | 올바른 예 |
|---|---|
| `hreflang="ko-KR"` | `hreflang="ko"` |
| `hreflang="en-GB"` | `hreflang="en"` |
| 영문 페이지의 `en` href → `/en/` (홈) | 자기 자신의 URL |
| `"url": "https://imin2uk.com/page-en"` | `"url": "https://imin2uk.com/page-en/"` |
| `alt="Imin2UK 로고"` (영문 헤더에서) | `alt="Imin2UK Logo"` |
| hreflang 한쪽 페이지에만 선언 | 양쪽 페이지에 동일하게 선언 |
