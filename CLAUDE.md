# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static portfolio site for Rich Lim, Senior Product Designer. No build step, no package manager, no framework. To preview, open any HTML file in a browser or serve with `python3 -m http.server`.

## File structure

- `index.html` — home/work listing page
- `info.html` — about/bio, process, experience
- `tennis.html`, `cobs-bread.html` — case study pages
- `shared.css` — design-system primitives shared across all pages (import in `<head>`)
- `nav.js`, `footer.js`, `prefooter.js` — components injected into slot elements via JS

## Shared components (nav / footer / prefooter)

Each page includes three JS-injected components. The HTML slots they target:

```html
<header class="site-header" id="site-header"></header>  <!-- nav.js -->
<div id="prefooter"></div>                               <!-- prefooter.js -->
<footer class="site-footer" id="site-footer"></footer>   <!-- footer.js -->
```

`nav.js` auto-sets `aria-current="page"` by comparing `window.location.pathname` to the link `href`. When adding a new page, no changes to `nav.js` are needed unless a new nav item is required.

`footer.js` drives the live Arizona time display (`#hero-time`, `#footer-time`) — any element with one of those IDs on the page will be updated automatically.

## Design tokens

CSS custom properties defined on `:root` in each page's `<style>` block:

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#000000` | page background |
| `--surface` | `#111111` | card/elevated surfaces |
| `--border` | `#1f1f1f` | dividers |
| `--border-dim` | `rgba(255,255,255,0.05)` | subtle borders |
| `--text` | `#F4F4F0` | body copy |
| `--text-dim` | `#a09c97` | secondary text |
| `--text-sub` | `#6b6763` | decorative / `aria-hidden` only |
| `--accent` | `#B6DAC7` | sage green — 14.2:1 on `--bg` (WCAG AAA) |
| `--sans` | Inter | UI / body font |
| `--mono` | Space Mono | labels, nav links, metadata |
| `--max-w` | `1600px` | max content width |
| `--px` | `clamp(1rem, 2.5vw, 2.5rem)` | horizontal page padding |

There is no `--serif` token; Inter (`--sans`) is used for all display/headline text.

## Layout conventions

- `.wrap` centers content: `max-width: var(--max-w); margin: 0 auto; padding: 0 40px`.
- Sections are separated by `border-bottom: 1px solid var(--border)`.
- Font sizes use `clamp()` for fluid scaling.
- `<em>` inside headings is styled `font-style: normal` with `color: var(--accent)`.
- Uppercase labels: `font-family: var(--mono); font-size: 0.5–0.6875rem; letter-spacing: 0.08–0.12em; text-transform: uppercase`.

## Shared CSS components (`shared.css`)

These classes are available sitewide without redeclaring:

- `.nav-cta`, `.book-call`, `.email-btn` — primary CTA button (hover fills sage green)
- `.card` + `.card-meta` + `.card-meta-item` — dark card shell with metadata grid
- `.body-text` — prose paragraph style
- `.contact-section` / `.contact-inner` / `.contact-hl` — cream-bg contact CTA section (rendered by `prefooter.js`)
- `.cs-outcomes` / `.cs-outcome` — outcomes stat grid for case studies
- `.page-hero-inner` — vertically centered hero for inner pages
- `.site-footer` and all `.footer-*` classes — footer layout (rendered by `footer.js`)
- `.kicker-dot` — pulsing availability dot (used in hero and bio sections)

## Scroll animation

Every page defines `.fade` / `.fade.visible` in its inline `<style>`, observed by an `IntersectionObserver` in an inline `<script>` at the bottom of `<body>`. Add class `fade` to any element to opt it into the entrance animation.

## Custom cursor

`index.html` implements a two-element custom cursor (`.cursor-dot`, `.cursor-ring`). Hidden on touch/coarse-pointer devices via `@media (hover: none), (pointer: coarse)`. The cursor inverts to dark when hovering the cream prefooter section (handled in `prefooter.js`).

## Case study page layout

`tennis.html` and `cobs-bread.html` use a two-column sticky sidebar layout:

```
[cs-sidebar]  [cs-body]
sticky left   scrolling content sections
```

Content sections use `.cs-section`, images use `.cs-image`, and outcomes use `.cs-outcomes` / `.cs-outcome`.
