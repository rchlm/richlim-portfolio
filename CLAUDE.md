# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A single-file static portfolio site for Rich Lim, Senior Product Designer. The entire site lives in `index.html` — all CSS is inline in `<style>`, and JavaScript is a small inline `<script>` at the bottom of `<body>`.

There is no build step, no package manager, and no framework. To preview, open `index.html` directly in a browser or serve it with any static file server (e.g. `python3 -m http.server`).

## Architecture

**Single file:** `index.html` contains everything — markup, styles, and behavior.

**Design tokens** are CSS custom properties defined on `:root` at the top of the stylesheet:
- Colors: `--bg`, `--border`, `--text`, `--text-dim`, `--text-muted`, `--accent` (`#c9983c` gold)
- Fonts: `--serif` (Instrument Serif), `--sans` (Inter), `--mono` (Space Mono)
- Layout: `--max-w` (1280px), `--px` (fluid horizontal padding)

**Layout pattern:** Every section uses a `.wrap` div (`max-width: var(--max-w)`) for centering. Sections are separated by `border-bottom: 1px solid var(--border)`.

**Scroll animation:** Elements with class `fade` are observed by an `IntersectionObserver`; the `visible` class triggers a CSS opacity/translateY transition. Animation is gated by `@media (prefers-reduced-motion: no-preference)`.

**Sections (in order):** nav/header → hero → `#work` (selected work) → `#info` (principles) → client roster → contact CTA → footer.

## Conventions

- Typography hierarchy uses `--serif` for display/editorial text and `--sans` for labels/UI; font sizes use `clamp()` for fluid scaling.
- Italic `<em>` elements within headings are consistently styled with `color: var(--accent)`.
- Work items use a CSS Grid with a narrow number column (`3.5rem`) and a content column.
- All uppercase labels share the pattern: `font-size: 0.5–0.625rem; letter-spacing: 0.1em; text-transform: uppercase`.
