/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';

const BACKEND_URL = "https://thepickzone-backend-1.onrender.com";

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=DM+Sans:wght@400;500;600&display=swap');
  :root {
    --g: #1DB954; --gold: #F5C542; --dark: #0B0F0E; --d2: #0f1410; --d3: #111815;
    --d4: #161d1a; --border: #1e2d24; --text: #e8f0ec; --text-dim: #92a89f; --muted: #6B8078;
    --tpz-nav-height: 74px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--dark); color: var(--text); font-family: 'DM Sans', sans-serif; }
  .tpz-protected-content { position: relative; overflow: hidden; user-select: none; -webkit-user-select: none; }
  .tpz-protected-content img { -webkit-user-drag: none; user-select: none; }
  .tpz-page { min-height: 100vh; padding: clamp(80px,12vw,100px) 5% 60px; }
  .tpz-centered-page {
    min-height: 100vh;
    padding: clamp(80px,12vw,100px) 5% 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tpz-purchase-shell {
    min-height: 100vh;
    padding: clamp(80px,12vw,100px) 5% 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tpz-page,
  .tpz-centered-page,
  .tpz-purchase-shell { padding-top: calc(var(--tpz-nav-height, 74px) + 12px) !important; }
  .tpz-hero { padding-top: max(90px, calc(var(--tpz-nav-height, 74px) + 18px)) !important; }
  .tpz-nav { padding: calc(10px + env(safe-area-inset-top)) 5% 10px !important; }
  .tpz-watermark-layer {
    position: absolute; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(-22deg, rgba(29,185,84,0.08) 0px, rgba(29,185,84,0.08) 18px, transparent 18px, transparent 76px);
    color: rgba(255,255,255,0.22); font-size: 0.62rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; display: flex; align-items: flex-end; justify-content: center; padding: 10px;
  }
  .tpz-nav-actions::-webkit-scrollbar { display: none; }
  .tpz-landing-hero {
    min-height: calc(100vh - 40px) !important;
    background:
      radial-gradient(circle at 85% 18%, rgba(29,185,84,0.22) 0%, rgba(29,185,84,0.03) 38%, transparent 64%),
      radial-gradient(circle at 12% 80%, rgba(245,197,66,0.08) 0%, rgba(245,197,66,0.01) 42%, transparent 70%),
      linear-gradient(180deg, #08110d 0%, #050a08 100%);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    overflow: hidden;
  }
  .tpz-hero-glow {
    position: absolute;
    width: 440px;
    height: 440px;
    border-radius: 999px;
    right: -140px;
    top: 14%;
    background: radial-gradient(circle, rgba(29,185,84,0.26) 0%, rgba(29,185,84,0.04) 58%, transparent 76%);
    filter: blur(4px);
    pointer-events: none;
    animation: pulse 5.5s ease-in-out infinite;
  }
  .tpz-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(29,185,84,0.12);
    color: #8cf0ad;
    border: 1px solid rgba(29,185,84,0.38);
    padding: 7px 14px;
    border-radius: 999px;
    letter-spacing: 1px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .tpz-hero-title {
    font-family: 'Bebas Neue';
    font-size: clamp(3.15rem,7.2vw,5.8rem);
    line-height: .86;
    letter-spacing: 2px;
    margin-bottom: 18px;
  }
  .tpz-hero-title span { color: var(--g); }
  .tpz-hero-subtitle {
    font-size: 1.02rem;
    color: var(--text-dim);
    line-height: 1.8;
    max-width: 560px;
    margin-bottom: 30px;
  }
  .tpz-hero-cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
  .tpz-hero-secondary-btn {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(29,185,84,0.45);
    color: var(--g);
    padding: 14px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Barlow Condensed';
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 1.8px;
    text-transform: uppercase;
  }
  .tpz-proof-grid {
    display: grid;
    grid-template-columns: repeat(4,minmax(120px,1fr));
    gap: 10px;
    width: min(880px,100%);
  }
  .tpz-proof-card {
    background: rgba(15,24,19,0.78);
    border: 1px solid rgba(29,185,84,0.18);
    border-radius: 12px;
    padding: 14px 12px;
    text-align: center;
    backdrop-filter: blur(6px);
  }
  .tpz-proof-value {
    font-family: 'Bebas Neue';
    font-size: 2.05rem;
    color: var(--g);
    line-height: 1;
  }
  .tpz-proof-label {
    font-size: 0.66rem;
    color: var(--text-dim);
    letter-spacing: 1.8px;
    margin-top: 5px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .tpz-live-ticker {
    border-top: 1px solid rgba(255,255,255,0.07);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    background: rgba(8,14,11,0.92);
    overflow: hidden;
    padding: 10px 0;
  }
  .tpz-live-ticker-track {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 24px;
    animation: ticker 24s linear infinite;
    color: var(--text-dim);
    font-size: 0.74rem;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .tpz-live-ticker-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
  .tpz-trust-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 22px;
  }
  .tpz-trust-chip {
    background: rgba(17,24,21,0.9);
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--text-dim);
    font-size: 0.72rem;
    letter-spacing: 1px;
    font-weight: 700;
    padding: 7px 12px;
  }
  .tpz-how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(170px,1fr));
    gap: 12px;
  }
  .tpz-how-card {
    background: linear-gradient(180deg, rgba(18,24,21,0.98) 0%, rgba(13,18,16,0.98) 100%);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 14px;
  }
  .tpz-how-step {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bebas Neue';
    font-size: 1.1rem;
    color: #000;
    background: var(--g);
    margin-bottom: 9px;
  }
  .tpz-how-title {
    font-family: 'Barlow Condensed';
    font-size: 1.07rem;
    font-weight: 800;
    letter-spacing: .8px;
    margin-bottom: 5px;
  }
  .tpz-how-desc {
    color: var(--text-dim);
    font-size: 0.8rem;
    line-height: 1.6;
  }
  .tpz-highlight-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(215px,1fr));
    gap: 12px;
  }
  .tpz-highlight-card {
    background: var(--d3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 15px 14px;
  }
  .tpz-highlight-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 9px;
  }
  .tpz-highlight-name {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text);
  }
  .tpz-highlight-roi {
    color: var(--g);
    font-family: 'Bebas Neue';
    font-size: 1.35rem;
    letter-spacing: 1px;
  }
  .tpz-highlight-meta {
    color: var(--text-dim);
    font-size: 0.72rem;
    line-height: 1.55;
    margin-bottom: 10px;
  }
  .tpz-highlight-btn {
    width: 100%;
    border: 1px solid rgba(29,185,84,0.45);
    background: rgba(29,185,84,0.07);
    color: var(--g);
    border-radius: 8px;
    font-size: 0.73rem;
    font-weight: 800;
    letter-spacing: 1.4px;
    padding: 8px 10px;
    cursor: pointer;
    text-transform: uppercase;
  }
  .tpz-landing-cta {
    background: linear-gradient(120deg, rgba(29,185,84,0.17) 0%, rgba(15,22,18,0.95) 52%, rgba(245,197,66,0.14) 100%);
    border: 1px solid rgba(29,185,84,0.34);
    border-radius: 14px;
    padding: clamp(18px,3vw,30px);
  }
  .tpz-landing-cta-title {
    font-family: 'Bebas Neue';
    font-size: clamp(1.9rem,4vw,2.7rem);
    line-height: .94;
    margin-bottom: 10px;
    letter-spacing: 1.5px;
  }
  .tpz-landing-cta-subtitle {
    color: var(--text-dim);
    font-size: .92rem;
    line-height: 1.7;
    max-width: 640px;
    margin-bottom: 16px;
  }
  .tpz-landing-cta-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .tpz-market-shell {
    background:
      radial-gradient(circle at 82% 6%, rgba(29,185,84,0.12) 0%, rgba(29,185,84,0.02) 36%, transparent 58%),
      linear-gradient(180deg, rgba(11,15,14,0.98) 0%, rgba(9,13,11,1) 100%);
  }
  .tpz-market-hero {
    background: linear-gradient(135deg, rgba(16,24,20,0.98) 0%, rgba(12,18,15,0.98) 100%);
    border: 1px solid rgba(29,185,84,0.24);
    border-radius: 16px;
    padding: clamp(18px,3vw,30px);
    margin-bottom: 20px;
  }
  .tpz-market-badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .tpz-market-badge {
    background: rgba(29,185,84,0.12);
    border: 1px solid rgba(29,185,84,0.35);
    color: #89edaa;
    border-radius: 100px;
    padding: 5px 10px;
    font-size: 0.66rem;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    font-weight: 800;
  }
  .tpz-market-hero-title {
    font-family: 'Bebas Neue';
    font-size: clamp(2.2rem,5vw,3.8rem);
    line-height: .9;
    letter-spacing: 1.4px;
    margin-bottom: 8px;
  }
  .tpz-market-hero-subtitle {
    color: var(--text-dim);
    font-size: 0.9rem;
    line-height: 1.7;
    max-width: 720px;
  }
  .tpz-market-kpis {
    display: grid;
    grid-template-columns: repeat(4,minmax(120px,1fr));
    gap: 10px;
    margin-top: 14px;
  }
  .tpz-market-kpi {
    background: rgba(17,24,21,0.9);
    border: 1px solid var(--border);
    border-radius: 11px;
    padding: 11px 10px;
    text-align: center;
  }
  .tpz-market-kpi-value {
    font-family: 'Bebas Neue';
    font-size: 1.75rem;
    line-height: 1;
    color: var(--g);
  }
  .tpz-market-kpi-label {
    margin-top: 4px;
    font-size: 0.64rem;
    letter-spacing: 1.4px;
    color: var(--muted);
    text-transform: uppercase;
    font-weight: 700;
  }
  .tpz-market-highlight {
    margin-top: 14px;
    background: rgba(7,14,11,0.92);
    border: 1px solid rgba(245,197,66,0.3);
    border-radius: 12px;
    padding: 12px 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }
  .tpz-market-highlight-title {
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 2px;
  }
  .tpz-market-highlight-meta {
    font-size: 0.72rem;
    color: var(--text-dim);
  }
  .tpz-market-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }
  .tpz-market-title {
    font-family: 'Bebas Neue';
    font-size: clamp(1.7rem,3.6vw,2.35rem);
    letter-spacing: 1px;
  }
  .tpz-market-empty {
    border: 1px solid var(--border);
    background: var(--d3);
    border-radius: 14px;
    text-align: center;
    padding: 48px 16px;
    color: var(--text-dim);
    line-height: 1.7;
  }
  .tpz-market-empty strong {
    color: var(--text);
    font-family: 'Barlow Condensed';
    font-size: 1.05rem;
    letter-spacing: .8px;
    display: block;
    margin-bottom: 6px;
  }
  .tpz-rankings-shell {
    background:
      radial-gradient(circle at 8% 0%, rgba(245,197,66,0.09) 0%, rgba(245,197,66,0.02) 36%, transparent 56%),
      linear-gradient(180deg, rgba(11,15,14,0.98) 0%, rgba(10,13,12,1) 100%);
  }
  .tpz-rankings-hero {
    background: linear-gradient(145deg, rgba(16,23,19,0.98) 0%, rgba(12,17,15,0.98) 100%);
    border: 1px solid rgba(29,185,84,0.24);
    border-radius: 16px;
    padding: clamp(18px,3vw,30px);
    margin-bottom: 18px;
  }
  .tpz-rankings-title {
    font-family: 'Bebas Neue';
    font-size: clamp(2.2rem,5vw,3.8rem);
    line-height: .9;
    letter-spacing: 1.4px;
    margin-bottom: 9px;
  }
  .tpz-rankings-subtitle {
    color: var(--text-dim);
    font-size: 0.9rem;
    line-height: 1.7;
    max-width: 740px;
    margin-bottom: 14px;
  }
  .tpz-rankings-summary-grid {
    display: grid;
    grid-template-columns: repeat(4,minmax(120px,1fr));
    gap: 10px;
  }
  .tpz-rankings-summary-card {
    background: rgba(17,24,21,0.9);
    border: 1px solid var(--border);
    border-radius: 11px;
    padding: 11px 10px;
    text-align: center;
  }
  .tpz-rankings-summary-value {
    font-family: 'Bebas Neue';
    font-size: 1.7rem;
    line-height: 1;
    color: var(--g);
  }
  .tpz-rankings-summary-label {
    margin-top: 4px;
    font-size: 0.64rem;
    letter-spacing: 1.4px;
    color: var(--muted);
    text-transform: uppercase;
    font-weight: 700;
  }
  .tpz-ranking-filter-btn {
    background: var(--d3);
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 700;
  }
  .tpz-ranking-filter-btn.active {
    background: var(--g);
    color: #000;
    border-color: var(--g);
  }
  .tpz-ranking-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .tpz-ranking-card {
    background: var(--d3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
  }
  .tpz-ranking-card-top-1 {
    border-color: rgba(245,197,66,0.45);
    background: linear-gradient(135deg, rgba(245,197,66,0.12) 0%, rgba(17,24,21,0.95) 38%, rgba(17,24,21,0.95) 100%);
  }
  .tpz-ranking-card-top-2 {
    border-color: rgba(173,184,194,0.4);
    background: linear-gradient(135deg, rgba(173,184,194,0.1) 0%, rgba(17,24,21,0.95) 44%, rgba(17,24,21,0.95) 100%);
  }
  .tpz-ranking-card-top-3 {
    border-color: rgba(205,127,50,0.42);
    background: linear-gradient(135deg, rgba(205,127,50,0.13) 0%, rgba(17,24,21,0.95) 44%, rgba(17,24,21,0.95) 100%);
  }
  .tpz-ranking-main {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    flex: 1;
    min-width: 260px;
  }
  .tpz-ranking-position {
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: rgba(29,185,84,0.14);
    border: 1px solid rgba(29,185,84,0.34);
    color: var(--g);
    font-weight: 800;
    font-size: 0.86rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .tpz-ranking-tipster-name {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--text);
  }
  .tpz-ranking-meta {
    font-size: 0.69rem;
    color: var(--text-dim);
    margin-top: 2px;
  }
  .tpz-ranking-progress-track {
    margin-top: 9px;
    width: min(260px,100%);
    height: 6px;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    overflow: hidden;
  }
  .tpz-ranking-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(29,185,84,0.95) 0%, rgba(115,255,160,0.95) 100%);
  }
  .tpz-ranking-stats {
    min-width: 150px;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 3px;
  }
  .tpz-ranking-roi {
    font-family: 'Bebas Neue';
    font-size: 1.45rem;
    line-height: 1;
    letter-spacing: 1px;
  }
  .tpz-ranking-yield {
    font-size: 0.78rem;
    font-weight: 800;
  }
  .tpz-ranking-units {
    font-size: 0.69rem;
  }
  .tpz-ranking-profile-btn {
    margin-top: 8px;
    border: 1px solid rgba(29,185,84,0.45);
    background: rgba(29,185,84,0.06);
    color: var(--g);
    border-radius: 8px;
    padding: 7px 12px;
    cursor: pointer;
    font-size: 0.67rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }
  .tpz-pro-shell {
    background:
      radial-gradient(circle at 84% 5%, rgba(29,185,84,0.14) 0%, rgba(29,185,84,0.03) 38%, transparent 62%),
      radial-gradient(circle at 10% 0%, rgba(245,197,66,0.1) 0%, rgba(245,197,66,0.02) 34%, transparent 56%),
      linear-gradient(180deg, rgba(11,15,14,0.99) 0%, rgba(9,13,11,1) 100%);
  }
  .tpz-pro-shell-inner {
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .tpz-pro-hero {
    background: linear-gradient(145deg, rgba(16,24,20,0.98) 0%, rgba(12,17,15,0.98) 100%);
    border: 1px solid rgba(29,185,84,0.24);
    border-radius: 16px;
    padding: clamp(18px,3vw,30px);
  }
  .tpz-pro-hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  .tpz-pro-hero-badge {
    background: rgba(29,185,84,0.12);
    border: 1px solid rgba(29,185,84,0.36);
    color: #89edaa;
    border-radius: 100px;
    padding: 5px 10px;
    font-size: 0.66rem;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    font-weight: 800;
  }
  .tpz-pro-hero-title {
    font-family: 'Bebas Neue';
    font-size: clamp(2.2rem,5.4vw,3.9rem);
    line-height: .9;
    letter-spacing: 1.2px;
    margin-bottom: 8px;
  }
  .tpz-pro-hero-title span { color: var(--g); }
  .tpz-pro-hero-subtitle {
    color: var(--text-dim);
    font-size: 0.88rem;
    line-height: 1.7;
    max-width: 760px;
  }
  .tpz-pro-cta-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 16px;
  }
  .tpz-pro-primary-btn {
    background: var(--g);
    color: #000;
    border: none;
    border-radius: 8px;
    padding: 12px 22px;
    font-family: 'Barlow Condensed';
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 1.8px;
    cursor: pointer;
  }
  .tpz-pro-primary-btn:disabled {
    background: var(--d4);
    color: var(--muted);
    cursor: not-allowed;
  }
  .tpz-pro-secondary-btn {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(29,185,84,0.45);
    color: var(--g);
    border-radius: 8px;
    padding: 12px 18px;
    cursor: pointer;
    font-family: 'Barlow Condensed';
    font-size: 0.84rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .tpz-pro-kpi-grid {
    display: grid;
    grid-template-columns: repeat(6,minmax(120px,1fr));
    gap: 10px;
  }
  .tpz-pro-kpi-card {
    background: rgba(17,24,21,0.92);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 11px;
    text-align: center;
  }
  .tpz-pro-kpi-icon {
    font-size: 1rem;
    margin-bottom: 4px;
  }
  .tpz-pro-kpi-value {
    font-family: 'Bebas Neue';
    font-size: 1.65rem;
    line-height: 1;
    color: var(--g);
  }
  .tpz-pro-kpi-label {
    margin-top: 4px;
    font-size: 0.62rem;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--text-dim);
    font-weight: 800;
  }
  .tpz-pro-kpi-meta {
    margin-top: 4px;
    font-size: 0.65rem;
    color: var(--muted);
  }
  .tpz-pro-insights-grid {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 10px;
  }
  .tpz-pro-panel-card {
    background: var(--d3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 13px;
  }
  .tpz-pro-card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  .tpz-pro-card-head h3 {
    margin: 0;
    font-family: 'Barlow Condensed';
    font-size: 1.05rem;
    letter-spacing: .8px;
  }
  .tpz-pro-card-head span {
    font-size: 0.68rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
  }
  .tpz-pro-progress-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  .tpz-pro-progress-meta {
    font-size: 0.69rem;
    color: var(--text-dim);
  }
  .tpz-pro-progress-track {
    height: 7px;
    background: rgba(255,255,255,0.08);
    border-radius: 999px;
    overflow: hidden;
  }
  .tpz-pro-progress-track span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(29,185,84,0.95) 0%, rgba(115,255,160,0.95) 100%);
  }
  .tpz-pro-record-grid {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    gap: 8px;
    margin-bottom: 9px;
  }
  .tpz-pro-record-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 0.69rem;
    font-weight: 800;
    letter-spacing: 1px;
    padding: 7px 10px;
    border: 1px solid transparent;
  }
  .tpz-pro-record-pill.won {
    background: rgba(29,185,84,0.14);
    border-color: rgba(29,185,84,0.35);
    color: var(--g);
  }
  .tpz-pro-record-pill.lost {
    background: rgba(244,67,54,0.14);
    border-color: rgba(244,67,54,0.35);
    color: #f44336;
  }
  .tpz-pro-record-pill.push {
    background: rgba(245,197,66,0.14);
    border-color: rgba(245,197,66,0.35);
    color: var(--gold);
  }
  .tpz-pro-record-pill.pending {
    background: rgba(107,128,120,0.14);
    border-color: rgba(107,128,120,0.35);
    color: var(--muted);
  }
  .tpz-pro-muted {
    font-size: 0.71rem;
    color: var(--text-dim);
    line-height: 1.6;
  }
  .tpz-pro-mini-btn {
    border: 1px solid rgba(29,185,84,0.45);
    background: rgba(29,185,84,0.07);
    color: var(--g);
    border-radius: 7px;
    font-size: 0.64rem;
    letter-spacing: 1.2px;
    font-weight: 800;
    padding: 6px 10px;
    cursor: pointer;
    text-transform: uppercase;
  }
  .tpz-pro-empty-state {
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.7;
    text-align: center;
    padding: 20px 10px;
    border: 1px dashed rgba(255,255,255,0.12);
    border-radius: 10px;
    background: rgba(16,22,19,0.6);
  }
  .tpz-pro-recent-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .tpz-pro-recent-item {
    border: 1px solid var(--border);
    border-radius: 9px;
    background: var(--d4);
    padding: 9px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .tpz-pro-recent-title {
    font-size: 0.84rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 2px;
  }
  .tpz-pro-recent-meta {
    font-size: 0.67rem;
    color: var(--text-dim);
  }
  .tpz-pro-result-chip {
    border-radius: 100px;
    padding: 4px 10px;
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 1.1px;
    border: 1px solid transparent;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .tpz-pro-result-chip.won {
    background: rgba(29,185,84,0.14);
    color: var(--g);
    border-color: rgba(29,185,84,0.35);
  }
  .tpz-pro-result-chip.lost {
    background: rgba(244,67,54,0.14);
    color: #f44336;
    border-color: rgba(244,67,54,0.35);
  }
  .tpz-pro-result-chip.push {
    background: rgba(245,197,66,0.14);
    color: var(--gold);
    border-color: rgba(245,197,66,0.35);
  }
  .tpz-pro-result-chip.pending {
    background: rgba(107,128,120,0.14);
    color: var(--muted);
    border-color: rgba(107,128,120,0.35);
  }
  @media (max-width: 900px) {
    .tpz-proof-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .tpz-hero-glow { width: 330px; height: 330px; right: -110px; top: 8%; }
    .tpz-market-kpis,
    .tpz-rankings-summary-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .tpz-pro-kpi-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
    .tpz-pro-insights-grid { grid-template-columns: 1fr; }
    .tpz-nav {
      padding: calc(10px + env(safe-area-inset-top)) 12px 10px !important;
      flex-direction: column;
      align-items: stretch !important;
      gap: 8px;
    }
    .tpz-nav > button {
      text-align: left;
      width: 100%;
      font-size: 1.15rem !important;
    }
    .tpz-nav-actions {
      width: 100%;
      overflow-x: auto;
      padding-bottom: 3px;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .tpz-nav-actions button {
      min-height: 38px !important;
      padding: 7px 10px !important;
      font-size: 0.68rem !important;
    }
  }
  @media (max-width: 640px) {
    .tpz-share-modal-card { width: calc(100vw - 18px) !important; padding: 14px !important; }
    .tpz-share-preview-img { max-height: 56vh !important; }
    .tpz-two-col-grid { grid-template-columns: 1fr !important; }
    .tpz-ranking-filters { justify-content: flex-start !important; flex-wrap: wrap !important; }
    .tpz-auth-card { padding: 22px 16px !important; border-radius: 12px !important; }
    .tpz-purchase-card { max-width: 100% !important; }
    .tpz-footer {
      padding: 24px 12px !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 12px !important;
    }
    .tpz-footer-links {
      width: 100%;
      flex-wrap: wrap !important;
      gap: 10px !important;
    }
    .tpz-live-ticker-track { gap: 16px; font-size: 0.68rem; }
    .tpz-hero-cta-row button,
    .tpz-hero-secondary-btn { width: 100%; }
    .tpz-market-kpis,
    .tpz-rankings-summary-grid { grid-template-columns: 1fr; }
    .tpz-ranking-card { flex-direction: column; }
    .tpz-ranking-main { min-width: 100%; }
    .tpz-ranking-progress-track { width: 100%; }
    .tpz-ranking-stats { align-items: flex-start; text-align: left; width: 100%; }
    .tpz-ranking-profile-btn { width: 100%; }
    .tpz-market-highlight button { width: 100%; }
    .tpz-how-grid,
    .tpz-highlight-grid { grid-template-columns: 1fr; }
    .tpz-landing-cta-actions button { width: 100%; }
    .tpz-pro-kpi-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .tpz-pro-cta-row button { width: 100%; }
    .tpz-pro-card-head { flex-direction: column; align-items: flex-start; }
    .tpz-pro-recent-item { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 768px) {
    .tpz-page,
    .tpz-centered-page,
    .tpz-purchase-shell { padding: calc(var(--tpz-nav-height, 74px) + 10px) 12px 28px !important; }
    .tpz-centered-page,
    .tpz-purchase-shell { align-items: flex-start !important; }
    .tpz-hero { min-height: auto !important; padding: calc(var(--tpz-nav-height, 74px) + 14px) 12px 30px !important; }
    .tpz-hero-content { max-width: 100% !important; }
    .tpz-hero-content p { font-size: 0.92rem !important; line-height: 1.6 !important; margin-bottom: 24px !important; }
    .tpz-landing-hero { min-height: auto !important; }
    .tpz-hero-title { font-size: clamp(2.45rem,11vw,4rem); }
    .tpz-hero-subtitle { font-size: 0.9rem; line-height: 1.7; margin-bottom: 22px; }
    .tpz-stats-grid { margin-top: 26px !important; gap: 10px !important; }
    .tpz-stats-grid > div {
      min-width: calc(50% - 8px) !important;
      flex: 1 1 calc(50% - 8px) !important;
      padding: 12px 10px !important;
    }
    .tpz-section { padding: 34px 12px !important; }
    .tpz-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
    .tpz-card-content { padding: 14px !important; }
    .tpz-profile-row { align-items: flex-start !important; gap: 14px !important; }
    .tpz-profile-main { width: 100% !important; min-width: 0 !important; }
    .tpz-ranking-row,
    .tpz-tipster-row { flex-direction: column !important; align-items: flex-start !important; }
    .tpz-ranking-row > div:last-child { text-align: left !important; width: 100%; }
    .tpz-nav-user-actions { width: 100%; flex-wrap: wrap; gap: 6px !important; }
  }
  @media (max-width: 520px) {
    .tpz-proof-grid { grid-template-columns: 1fr; }
    .tpz-nav-user-actions button { min-height: 34px !important; padding: 6px 9px !important; font-size: 0.64rem !important; }
    .tpz-nav-user-actions button:last-child { flex: 1 1 100%; }
    .tpz-stats-grid > div { min-width: 100% !important; flex: 1 1 100% !important; }
    .tpz-pro-kpi-grid { grid-template-columns: 1fr; }
  }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  @keyframes popIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
  @keyframes ticker { from{transform:translateX(0)}to{transform:translateX(-50%)} }
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────
function isMatchStarted(timeStr) {
  if (!timeStr) return false;
  try {
    if (timeStr.includes('T') || timeStr.includes('Z')) {
      return new Date(timeStr) <= new Date();
    }
    const days = {'Dom':0,'Lun':1,'Mar':2,'Mie':3,'Jue':4,'Vie':5,'Sab':6};
    const months = {'Ene':0,'Feb':1,'Mar':2,'Abr':3,'May':4,'Jun':5,'Jul':6,'Ago':7,'Sep':8,'Oct':9,'Nov':10,'Dic':11};
    const parts = timeStr.match(/(\w+)\s+(\d+)\s+(\w+)\s*-\s*(\d+):(\d+)/);
    if (!parts) return false;
    const now = new Date();
    const d = new Date(now.getFullYear(), months[parts[3]], parseInt(parts[2]), parseInt(parts[4]), parseInt(parts[5]));
    return d <= now;
  } catch(e) { return false; }
}

function isoToLocal(iso) {
  try {
    const d = new Date(iso);
    const days = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
    const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} - ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  } catch(e) { return iso; }
}

function getCheckoutReturnUrls() {
  const base = `${window.location.origin}${window.location.pathname}`;
  return { successUrl: base, cancelUrl: base };
}

function clearCheckoutQueryParams() {
  if (window.location.search) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

function toSafeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
function formatMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "$0.00";
  return `$${amount.toFixed(2)}`;
}

function formatOddsValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed.toFixed(2) : "--";
}

function formatSignedPercent(value, fallback = "+0.0%") {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  const fixed = parsed.toFixed(1);
  return parsed >= 0 ? `+${fixed}%` : `${fixed}%`;
}

function formatSignedUnits(value, fallback = "+0.00u") {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  const fixed = parsed.toFixed(2);
  return parsed >= 0 ? `+${fixed}u` : `${fixed}u`;
}

const CLABE_WEIGHTS = [3, 7, 1];
function normalizeDigits(value) {
  return String(value || "").replace(/\D+/g, "");
}
function isValidClabe(value) {
  const digits = normalizeDigits(value);
  if (!/^\d{18}$/.test(digits)) return false;
  const accumulator = digits
    .slice(0, 17)
    .split("")
    .reduce((sum, digit, index) => sum + ((Number(digit) * CLABE_WEIGHTS[index % 3]) % 10), 0);
  const checkDigit = (10 - (accumulator % 10)) % 10;
  return checkDigit === Number(digits[17]);
}

function getPickShareUrl(pick) {
  const pickId = pick?._id || pick?.id;
  if (!pickId) return `${window.location.origin}${window.location.pathname}`;
  return `${BACKEND_URL}/share/pick/${encodeURIComponent(String(pickId))}`;
}

function getPickShareText(pick) {
  const matchText = pick?.match || "Pick deportivo";
  const tipsterText = pick?.tipster ? ` por ${pick.tipster}` : "";
  const oddsValue = Number(pick?.odds);
  const oddsText = Number.isFinite(oddsValue) && oddsValue > 0 ? ` · Momio ${oddsValue.toFixed(2)}` : "";
  const bankValue = Number(pick?.bank);
  const bankText = Number.isFinite(bankValue) && bankValue > 0 ? ` · Bank ${bankValue}%` : "";
  return `${matchText}${tipsterText}${oddsText}${bankText} en The Pick Zone`;
}

const SOCIAL_SHARE_NETWORKS = [
  {
    key: "x",
    label: "X",
    icon: "X",
    buildUrl: ({ url, text }) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: "FB",
    buildUrl: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: "WA",
    buildUrl: ({ url, text }) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: "TG",
    buildUrl: ({ url, text }) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  }
];

function openSocialShare(networkKey, pick) {
  const network = SOCIAL_SHARE_NETWORKS.find((item)=>item.key===networkKey);
  if (!network) return;
  const url = getPickShareUrl(pick);
  const text = getPickShareText(pick);
  const shareUrl = network.buildUrl({ url, text, pick });
  window.open(shareUrl, "_blank", "noopener,noreferrer,width=680,height=760");
}

async function sharePickNative(pick) {
  if (!navigator.share) return false;
  const url = getPickShareUrl(pick);
  const text = getPickShareText(pick);
  try {
    await navigator.share({ title: "The Pick Zone", text, url });
    return true;
  } catch {
    return false;
  }
}

async function copyPickLink(pick) {
  const url = getPickShareUrl(pick);
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return true;
  }
  try {
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(tempInput);
    return copied;
  } catch {
    return false;
  }
}
function sanitizeShareText(value, fallback = "--", maxLength = 64) {
  const raw = String(value ?? "").trim();
  if (!raw) return fallback;
  return raw.length > maxLength ? `${raw.slice(0, maxLength - 1)}…` : raw;
}

function getPickBetTypeLabel(pick) {
  const betType = String(pick?.betType || "").toLowerCase();
  if (betType === "parlay") return "Parlay";
  if (betType === "straight") return "Straight";
  const league = String(pick?.league || "").toLowerCase();
  return league.includes("parlay") ? "Parlay" : "Straight";
}

function getPickShareTime(pick) {
  if (!pick?.time) return "Hora por confirmar";
  if (pick.time.includes("T") || pick.time.includes("Z")) return isoToLocal(pick.time);
  return String(pick.time);
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const testLine = current ? `${current} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      current = testLine;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [""];
}

async function createPickSharePreviewImage(pick) {
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo generar preview");

  const typeLabel = getPickBetTypeLabel(pick).toUpperCase();
  const matchText = sanitizeShareText(pick?.match, "Pick deportivo", 74);
  const leagueText = sanitizeShareText(pick?.league, "Liga", 44);
  const tipsterText = sanitizeShareText(pick?.tipster, "Tipster TPZ", 36);
  const oddsText = formatOddsValue(pick?.odds);
  const bankValue = Math.max(0, Math.round(toSafeNumber(pick?.bank, 0)));
  const bankText = `${bankValue}%`;
  const priceValue = toSafeNumber(pick?.price, 0);
  const priceText = priceValue <= 0 ? "GRATIS" : `$${priceValue.toFixed(2)} USD`;
  const timeText = sanitizeShareText(getPickShareTime(pick), "Hora por confirmar", 48);
  const shareSportLabel = sanitizeShareText(getPickBetTypeLabel(pick), "Pick", 24);

  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, "#07110d");
  bgGradient.addColorStop(0.55, "#0f251c");
  bgGradient.addColorStop(1, "#051b13");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#1DB954";
  ctx.beginPath(); ctx.arc(960, 210, 180, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(140, 1170, 210, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 7);
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 56px DM Sans, sans-serif";
  const mark = `TPZ • ${typeLabel} • VISTA PREVIA`;
  for (let i = -4; i <= 4; i += 1) {
    ctx.fillText(mark, -540, i * 132);
  }
  ctx.restore();

  ctx.fillStyle = "rgba(17,24,21,0.9)";
  ctx.fillRect(54, 64, width - 108, height - 128);
  ctx.strokeStyle = "rgba(29,185,84,0.34)";
  ctx.lineWidth = 3;
  ctx.strokeRect(54, 64, width - 108, height - 128);

  ctx.fillStyle = "#1DB954";
  ctx.font = "900 44px DM Sans, sans-serif";
  ctx.fillText("THE PICK ZONE", 98, 140);
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.font = "700 24px DM Sans, sans-serif";
  ctx.fillText("VISTA PREVIA (NO INCLUYE PICK)", 98, 176);

  ctx.fillStyle = "rgba(29,185,84,0.14)";
  ctx.fillRect(98, 226, 220, 52);
  ctx.strokeStyle = "rgba(29,185,84,0.56)";
  ctx.lineWidth = 2;
  ctx.strokeRect(98, 226, 220, 52);
  ctx.fillStyle = "#1DB954";
  ctx.font = "800 28px DM Sans, sans-serif";
  ctx.fillText(typeLabel, 126, 260);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 60px DM Sans, sans-serif";
  const matchLines = wrapCanvasText(ctx, matchText, width - 208).slice(0, 3);
  let currentY = 360;
  matchLines.forEach((line) => {
    ctx.fillText(line, 98, currentY);
    currentY += 74;
  });

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = "700 30px DM Sans, sans-serif";
  ctx.fillText(`${shareSportLabel} · ${leagueText}`, 98, currentY + 34);
  ctx.fillText("Información previa del evento", 98, currentY + 84);
  ctx.fillText(timeText, 98, currentY + 134);

  const drawMetricCard = (label, value, x, y, w, h) => {
    ctx.fillStyle = "rgba(7,17,13,0.85)";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "700 22px DM Sans, sans-serif";
    ctx.fillText(label, x + 24, y + 36);
    ctx.fillStyle = "#1DB954";
    ctx.font = "900 52px DM Sans, sans-serif";
    ctx.fillText(value, x + 24, y + h - 24);
  };

  drawMetricCard("MOMIO", oddsText, 98, 760, 420, 190);
  drawMetricCard("BANK", bankText, 562, 760, 420, 190);
  drawMetricCard("COSTO", priceText, 98, 972, 884, 170);

  ctx.fillStyle = "rgba(7,17,13,0.85)";
  ctx.fillRect(98, 1162, width - 196, 108);
  ctx.strokeStyle = "rgba(245,197,66,0.44)";
  ctx.lineWidth = 2;
  ctx.strokeRect(98, 1162, width - 196, 108);
  ctx.fillStyle = "#F5C542";
  ctx.font = "800 24px DM Sans, sans-serif";
  ctx.fillText("PREVENTA / CONTENIDO BLOQUEADO", 124, 1202);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "700 21px DM Sans, sans-serif";
  ctx.fillText("La selección del pick se desbloquea solo tras compra autorizada.", 124, 1238);

  ctx.fillStyle = "rgba(255,255,255,0.54)";
  ctx.font = "700 20px DM Sans, sans-serif";
  ctx.fillText("tpz.mx", width - 170, height - 48);

  return canvas.toDataURL("image/png");
}

function downloadDataUrlFile(dataUrl, filename) {
  if (!dataUrl) return;
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function inferSportEmojiFromOdds(group, key, title) {
  const source = `${group || ""} ${key || ""} ${title || ""}`.toLowerCase();
  if (source.includes("soccer") || source.includes("futbol")) return "⚽";
  if (source.includes("basketball")) return "🏀";
  if (source.includes("americanfootball") || source.includes("nfl")) return "🏈";
  if (source.includes("baseball")) return "⚾";
  if (source.includes("icehockey") || source.includes("hockey")) return "🏒";
  if (source.includes("tennis")) return "🎾";
  if (source.includes("boxing") || source.includes("mma")) return "🥊";
  if (source.includes("golf")) return "⛳";
  if (source.includes("cricket")) return "🏏";
  if (source.includes("rugby")) return "🏉";
  if (source.includes("esports")) return "🎮";
  return "🏅";
}
const MAIN_LEAGUE_KEYS_ORDER = [
  "soccer_epl",
  "soccer_spain_la_liga",
  "soccer_italy_serie_a",
  "soccer_uefa_champs_league",
  "soccer_germany_bundesliga",
  "soccer_mexico_ligamx",
  "soccer_fifa_world_cup",
  "baseball_mlb",
  "americanfootball_nfl",
  "basketball_nba",
  "icehockey_nhl",
];

const MAIN_LEAGUE_META = {
  soccer_epl: {
    name: "Liga Premier",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Premier_League.svg",
    flag: "🦁",
    aliases: ["premier", "epl", "england"],
    country: "Inglaterra",
    group: "Soccer"
  },
  soccer_spain_la_liga: {
    name: "Liga de España",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/LaLiga_logo_2023.svg",
    flag: "🇪🇸",
    aliases: ["la liga", "españa", "spain"],
    country: "España",
    group: "Soccer"
  },
  soccer_italy_serie_a: {
    name: "Liga de Italia",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Serie_A.svg",
    flag: "🇮🇹",
    aliases: ["serie a", "italia", "italy"],
    country: "Italia",
    group: "Soccer"
  },
  soccer_uefa_champs_league: {
    name: "Champions League",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0a/UEFA_Champions_League_logo.svg",
    flag: "🏆",
    aliases: ["champions", "ucl", "uefa"],
    country: "Europa",
    group: "Soccer"
  },
  soccer_germany_bundesliga: {
    name: "Liga de Alemania",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Bundesliga_logo.svg",
    flag: "🇩🇪",
    aliases: ["bundesliga", "alemania", "germany"],
    country: "Alemania",
    group: "Soccer"
  },
  soccer_mexico_ligamx: {
    name: "Liga MX",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Liga_MX_logo.svg",
    flag: "🇲🇽",
    aliases: ["liga mx", "mexico", "ligamx"],
    country: "México",
    group: "Soccer"
  },
  soccer_fifa_world_cup: {
    name: "World Cup",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/FIFA_WorldCup_logo.svg",
    flag: "🌍🏆",
    aliases: ["world cup", "copa del mundo", "fifa"],
    country: "Mundial",
    group: "Soccer"
  },
  baseball_mlb: {
    name: "MLB",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Major_League_Baseball_logo.svg",
    flag: "⚾",
    aliases: ["mlb", "baseball"],
    country: "USA",
    group: "Baseball"
  },
  americanfootball_nfl: {
    name: "NFL",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg",
    flag: "🏈",
    aliases: ["nfl", "football americano"],
    country: "USA",
    group: "AmericanFootball"
  },
  basketball_nba: {
    name: "NBA",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg",
    flag: "🏀",
    aliases: ["nba", "basket"],
    country: "USA",
    group: "Basketball"
  },
  icehockey_nhl: {
    name: "NHL",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg",
    flag: "🏒",
    aliases: ["nhl", "hockey"],
    country: "USA/Canada",
    group: "IceHockey"
  },
};

const DEFAULT_ODDS_SPORTS_RAW = [
  { key:"soccer_epl", title:"Liga Premier", group:"Soccer" },
  { key:"soccer_spain_la_liga", title:"Liga de España", group:"Soccer" },
  { key:"soccer_italy_serie_a", title:"Liga de Italia", group:"Soccer" },
  { key:"soccer_uefa_champs_league", title:"Champions League", group:"Soccer" },
  { key:"soccer_germany_bundesliga", title:"Liga de Alemania", group:"Soccer" },
  { key:"soccer_mexico_ligamx", title:"Liga MX", group:"Soccer" },
  { key:"soccer_fifa_world_cup", title:"World Cup", group:"Soccer" },
  { key:"baseball_mlb", title:"MLB", group:"Baseball" },
  { key:"americanfootball_nfl", title:"NFL", group:"AmericanFootball" },
  { key:"basketball_nba", title:"NBA", group:"Basketball" },
  { key:"icehockey_nhl", title:"NHL", group:"IceHockey" },
];

function mapOddsSportsCatalog(sourceSports) {
  const dedup = new Map();
  (Array.isArray(sourceSports) ? sourceSports : []).forEach((sport, idx)=>{
    if(!sport?.key) return;
    if(dedup.has(sport.key)) return;
    const meta = MAIN_LEAGUE_META[sport.key] || null;
    const title = meta?.name || sport.title || sport.description || sport.key;
    dedup.set(sport.key, {
      id: `${sport.key}-${idx}`,
      key: sport.key,
      title,
      name: title,
      sport: inferSportEmojiFromOdds(sport.group, sport.key, title),
      group: meta?.group || sport.group || "otros",
      country: meta?.country || sport.group || "Global",
      flag: meta?.flag || "🌍",
      logoUrl: meta?.logoUrl || "",
      aliases: meta?.aliases || [],
      isMainLeague: !!meta,
      mainOrder: meta ? MAIN_LEAGUE_KEYS_ORDER.indexOf(sport.key) : Number.MAX_SAFE_INTEGER,
    });
  });
  return Array.from(dedup.values()).sort((a,b)=>{
    if (a.isMainLeague && b.isMainLeague) return a.mainOrder - b.mainOrder;
    if (a.isMainLeague && !b.isMainLeague) return -1;
    if (!a.isMainLeague && b.isMainLeague) return 1;
    return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
  });
}

const DEFAULT_ODDS_SPORTS = mapOddsSportsCatalog(DEFAULT_ODDS_SPORTS_RAW);

const PARLAY_SPORT_OPTIONS = [
  { key: "soccer", icon: "⚽", label: "Fútbol" },
  { key: "basketball", icon: "🏀", label: "Basketball" },
  { key: "americanfootball", icon: "🏈", label: "NFL" },
  { key: "baseball", icon: "⚾", label: "MLB" },
  { key: "icehockey", icon: "🏒", label: "NHL" },
  { key: "tennis", icon: "🎾", label: "Tenis" },
  { key: "mma", icon: "🥊", label: "MMA/Box" },
];
const DEFAULT_PROP_STAT_OPTIONS = [
  { value: "points", label: "Points", requiresPlayer: true },
  { value: "rebounds", label: "Rebounds", requiresPlayer: true },
  { value: "assists", label: "Assists", requiresPlayer: true },
  { value: "goals", label: "Goals", requiresPlayer: true },
  { value: "shots_on_target", label: "Shots on Target", requiresPlayer: true },
];
const PROP_STAT_OPTIONS_BY_SPORT = {
  basketball: [
    { value: "points", label: "Points", requiresPlayer: true },
    { value: "rebounds", label: "Rebounds", requiresPlayer: true },
    { value: "assists", label: "Assists", requiresPlayer: true },
    { value: "threes", label: "Triples", requiresPlayer: true },
  ],
  baseball: [
    { value: "hits", label: "Hits", requiresPlayer: true },
    { value: "runs", label: "Runs", requiresPlayer: true },
    { value: "rbi", label: "RBI", requiresPlayer: true },
    { value: "home_runs", label: "Home Runs", requiresPlayer: true },
    { value: "strikeouts", label: "Strikeouts", requiresPlayer: true },
  ],
  americanfootball: [
    { value: "passing_yards", label: "Passing Yards", requiresPlayer: true },
    { value: "rushing_yards", label: "Rushing Yards", requiresPlayer: true },
    { value: "receiving_yards", label: "Receiving Yards", requiresPlayer: true },
    { value: "touchdowns", label: "Touchdowns", requiresPlayer: true },
  ],
  soccer: [
    { value: "goals", label: "Goals (jugador)", requiresPlayer: true },
    { value: "shots", label: "Shots (jugador)", requiresPlayer: true },
    { value: "shots_on_target", label: "Shots on Target (jugador)", requiresPlayer: true },
    { value: "corners", label: "Corners (equipo/partido)", requiresPlayer: false },
    { value: "yellow_cards", label: "Tarjetas amarillas", requiresPlayer: false },
    { value: "red_cards", label: "Tarjetas rojas", requiresPlayer: false },
    { value: "cards_total", label: "Tarjetas totales", requiresPlayer: false },
    { value: "fouls", label: "Fouls", requiresPlayer: false },
    { value: "offsides", label: "Offsides", requiresPlayer: false },
  ],
};
function resolveSportCodeFromSportKey(sportKey) {
  const key = String(sportKey || "").toLowerCase();
  if (!key) return "";
  if (key.includes("soccer")) return "soccer";
  if (key.includes("basketball")) return "basketball";
  if (key.includes("americanfootball") || key.includes("nfl")) return "americanfootball";
  if (key.includes("baseball") || key.includes("mlb")) return "baseball";
  return "";
}
function getPropStatOptionsForSportKey(sportKey) {
  const sportCode = resolveSportCodeFromSportKey(sportKey);
  return PROP_STAT_OPTIONS_BY_SPORT[sportCode] || DEFAULT_PROP_STAT_OPTIONS;
}
function doesPropStatRequirePlayer(statType, sportKey) {
  const stat = String(statType || "").trim();
  if (!stat) return true;
  const options = getPropStatOptionsForSportKey(sportKey);
  const selected = options.find((item)=>item.value===stat);
  if (selected) return selected.requiresPlayer !== false;
  return true;
}

function LeagueLogo({ league, size = 24, inline = false }) {
  const [errored, setErrored] = useState(false);
  if (league?.logoUrl && !errored) {
    return (
      <img
        src={league.logoUrl}
        alt={league?.name || "Liga"}
        loading="lazy"
        onError={()=>setErrored(true)}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          display: inline ? "inline-block" : "block",
          verticalAlign: "middle",
        }}
      />
    );
  }
  return (
    <span style={{fontSize: Math.max(14, Math.round(size * 0.85)), lineHeight: 1, display: inline ? "inline-block" : "block"}}>
      {league?.flag || "🌍"}
    </span>
  );
}
function normalizeLogoUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return "";
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("http://")) return `https://${raw.slice(7)}`;
  return raw;
}
function TeamShield({ logoUrl, teamName, size = 22 }) {
  const [errored, setErrored] = useState(false);
  const safeName = String(teamName || "").trim();
  const safeLogoUrl = normalizeLogoUrl(logoUrl);
  if (safeLogoUrl && !errored) {
    return (
      <img
        src={safeLogoUrl}
        alt={safeName || "Equipo"}
        loading="lazy"
        onError={()=>setErrored(true)}
        style={{width:size,height:size,objectFit:"contain",borderRadius:"50%",background:"#fff",padding:1,border:"1px solid rgba(255,255,255,0.14)"}}
      />
    );
  }
  return (
    <span style={{width:size,height:size,borderRadius:"50%",display:"inline-flex",alignItems:"center",justifyContent:"center",background:"var(--d4)",border:"1px solid var(--border)",fontSize:"0.62rem",fontWeight:800,color:"var(--text-dim)"}}>
      {(safeName[0] || "?").toUpperCase()}
    </span>
  );
}
function resolvePickTeams(pick) {
  const homeFromBet = String(pick?.bet?.homeTeam || "").trim();
  const awayFromBet = String(pick?.bet?.awayTeam || "").trim();
  if (homeFromBet && awayFromBet) return { homeTeam: homeFromBet, awayTeam: awayFromBet };
  const rawMatch = String(pick?.match || "").trim();
  if (!rawMatch) return { homeTeam: "", awayTeam: "" };
  const splitters = [/\s+vs\.?\s+/i, /\s+v\s+/i, /\s+-\s+/];
  for (const splitter of splitters) {
    const parts = rawMatch.split(splitter).map((part)=>part.trim()).filter(Boolean);
    if (parts.length >= 2) return { homeTeam: parts[0], awayTeam: parts[1] };
  }
  return { homeTeam: "", awayTeam: "" };
}

function PickSharePreviewModal({ pick, open, onClose, onDownloadImage }) {
  const [previewDataUrl, setPreviewDataUrl] = useState("");
  const [renderingPreview, setRenderingPreview] = useState(false);
  const [downloadingPreview, setDownloadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState("");

  useEffect(()=>{
    if (!open || !pick) return;
    let cancelled = false;
    setPreviewError("");
    setRenderingPreview(true);
    createPickSharePreviewImage(pick)
      .then((dataUrl)=>{
        if (!cancelled) setPreviewDataUrl(dataUrl);
      })
      .catch((err)=>{
        if (!cancelled) setPreviewError(err?.message || "No se pudo generar la vista previa");
      })
      .finally(()=>{
        if (!cancelled) setRenderingPreview(false);
      });
    return ()=>{ cancelled = true; };
  },[
    open,
    pick?._id,
    pick?.match,
    pick?.league,
    pick?.sport,
    pick?.tipster,
    pick?.odds,
    pick?.bank,
    pick?.betType,
    pick?.time
  ]);

  async function handleDownloadPreview() {
    if (!pick || !previewDataUrl || downloadingPreview) return;
    setDownloadingPreview(true);
    setPreviewError("");
    try {
      if (typeof onDownloadImage === "function") {
        await onDownloadImage(pick);
      }
      downloadDataUrlFile(previewDataUrl, `tpz-preview-${pick?._id || Date.now()}.png`);
    } catch (err) {
      setPreviewError(err?.message || "No se pudo descargar la imagen");
    }
    setDownloadingPreview(false);
  }

  if (!open || !pick) return null;

  return (
    <div style={{position:"fixed",inset:0,zIndex:1200,background:"rgba(0,0,0,0.86)",display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
      <div className="tpz-share-modal-card" style={{width:"min(460px,95vw)",background:"var(--d2)",border:"1px solid var(--border)",borderRadius:12,padding:18}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
          <div style={{fontWeight:700,fontSize:"0.9rem"}}>Vista previa para compartir</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:"1.1rem"}}>✕</button>
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:10,marginBottom:10,textAlign:"center"}}>
          {renderingPreview ? (
            <div style={{padding:"38px 10px",color:"var(--muted)",fontSize:"0.85rem"}}>Generando preview...</div>
          ) : previewDataUrl ? (
            <img className="tpz-share-preview-img" src={previewDataUrl} alt="Preview pick" style={{width:"100%",maxHeight:"60vh",objectFit:"contain",borderRadius:8}} />
          ) : (
            <div style={{padding:"26px 10px",color:"var(--muted)",fontSize:"0.85rem"}}>No se pudo generar la imagen</div>
          )}
        </div>
        {previewError && <div style={{background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"8px 10px",borderRadius:8,fontSize:"0.75rem",marginBottom:10}}>{previewError}</div>}
        <div style={{display:"flex",gap:8,justifyContent:"space-between",flexWrap:"wrap"}}>
          <button onClick={onClose} style={{background:"var(--d3)",color:"var(--muted)",border:"1px solid var(--border)",padding:"9px 14px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:"0.8rem"}}>
            Cerrar
          </button>
          <button onClick={handleDownloadPreview} disabled={renderingPreview || !previewDataUrl || downloadingPreview} style={{background:"var(--g)",color:"#000",border:"none",padding:"10px 16px",borderRadius:8,cursor:"pointer",fontWeight:900,fontSize:"0.82rem"}}>
            {downloadingPreview ? "Descargando..." : "Descargar imagen TPZ"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PickShareButtons({ pick, compact = false, onDownloadImage }) {
  const [copied, setCopied] = useState(false);
  const [sharingNative, setSharingNative] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  async function handleNativeShare() {
    if (!pick) return;
    setSharingNative(true);
    const shared = await sharePickNative(pick);
    setSharingNative(false);
    if (!shared) {
      openSocialShare("whatsapp", pick);
    }
  }

  async function handleCopyLink() {
    if (!pick) return;
    const copiedOk = await copyPickLink(pick);
    if (!copiedOk) return;
    setCopied(true);
    setTimeout(()=>setCopied(false), 1800);
  }

  const baseButtonStyle = {
    background: "var(--d4)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .2s",
    gap: 4,
  };

  return (
    <>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
        <button onClick={()=>setPreviewOpen(true)} title="Vista previa descargable" style={{...baseButtonStyle,padding:compact?"5px 8px":"7px 10px",fontSize:compact?"0.68rem":"0.75rem"}}>
          {compact ? "IMG" : "Descargar"}
        </button>
        <button onClick={handleNativeShare} style={{...baseButtonStyle,padding:compact?"5px 8px":"7px 10px",fontSize:compact?"0.68rem":"0.75rem"}}>
          {sharingNative ? "..." : (compact ? "Comp" : "Compartir")}
        </button>
        {SOCIAL_SHARE_NETWORKS.map((network)=>(
          <button
            key={network.key}
            onClick={()=>openSocialShare(network.key, pick)}
            title={`Compartir en ${network.label}`}
            style={{...baseButtonStyle,padding:compact?"5px 8px":"7px 10px",fontSize:compact?"0.68rem":"0.75rem",minWidth:compact?30:36}}
          >
            <span>{network.icon}</span>
          </button>
        ))}
        <button onClick={handleCopyLink} style={{...baseButtonStyle,padding:compact?"5px 8px":"7px 10px",fontSize:compact?"0.68rem":"0.75rem"}}>
          {copied ? "OK" : (compact ? "Link" : "Copiar link")}
        </button>
      </div>
      <PickSharePreviewModal
        pick={pick}
        open={previewOpen}
        onClose={()=>setPreviewOpen(false)}
        onDownloadImage={onDownloadImage}
      />
    </>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function NavBar({ view, setView, user, setUser, notifications, setNotifications, onOpenOwnSummary }) {
  const navRef = useRef(null);

  useEffect(()=>{
    const navEl = navRef.current;
    if (!navEl) return;
    const updateNavHeight = ()=>{
      const nextHeight = navEl.offsetHeight;
      if (!nextHeight) return;
      document.documentElement.style.setProperty("--tpz-nav-height", `${Math.ceil(nextHeight)}px`);
    };
    updateNavHeight();
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateNavHeight) : null;
    if (resizeObserver) resizeObserver.observe(navEl);
    window.addEventListener("resize", updateNavHeight);
    return ()=>{
      window.removeEventListener("resize", updateNavHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  },[user]);
  return (
    <nav ref={navRef} className="tpz-nav" style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(11,15,14,0.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 5%"}}>
      <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",color:"var(--g)",fontFamily:"'Bebas Neue'",fontSize:"1.4rem",letterSpacing:2}}>
        THE PICK ZONE
      </button>
      <div className="tpz-nav-actions" style={{display:"flex",gap:6,alignItems:"center",flexWrap:"nowrap"}}>
        {[["home","Inicio"],["marketplace","Picks"],["rankings","Rankings"]].map(([v,l])=>(
          <button key={v} onClick={()=>setView(v)} style={{background:view===v?"rgba(29,185,84,0.15)":"none",border:view===v?"1px solid var(--g)":"1px solid transparent",color:view===v?"var(--g)":"rgba(255,255,255,0.85)",padding:"8px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700,letterSpacing:1,textTransform:"uppercase",minHeight:44}}>
            {l}
          </button>
        ))}
        {!user && (
          <button onClick={()=>setView("login")} style={{background:"var(--g)",color:"#000",border:"none",padding:"8px 16px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:900,letterSpacing:1,textTransform:"uppercase",minHeight:44,marginLeft:4}}>
            Ingresar
          </button>
        )}
        {user && (
          <div className="tpz-nav-user-actions" style={{display:"flex",alignItems:"center",gap:8}}>
            <button
              onClick={()=>onOpenOwnSummary ? onOpenOwnSummary() : setView("profile")}
              title="Resumen de tipster"
              style={{width:34,height:34,borderRadius:"50%",border:"1px solid var(--border)",background:"var(--d3)",display:"flex",alignItems:"center",justifyContent:"center",padding:0,overflow:"hidden",cursor:"pointer"}}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              ) : (
                <span style={{fontFamily:"'Bebas Neue'",fontSize:"1rem",color:"var(--g)"}}>{(user?.name||user?.username||"U")[0].toUpperCase()}</span>
              )}
            </button>
            <button onClick={()=>setView("profile")} style={{background:"var(--d3)",color:"var(--text)",border:"1px solid var(--border)",padding:"7px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>
              Mi Perfil
            </button>
            {(user.role === 'pro' || user.role === 'tipster' || user.role === 'admin') && (
              <>
                {user.role==="admin" && (
                  <button onClick={()=>setView("pro-panel")} style={{background:"var(--d3)",color:"var(--g)",border:"1px solid var(--g)",padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:900,letterSpacing:1,textTransform:"uppercase"}}>
                    Panel Pro
                  </button>
                )}
                <button onClick={()=>setView(user.role==="admin"?"admin-panel":"pro-panel")} style={{background:"var(--g)",color:"#000",border:"none",padding:"7px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:900,letterSpacing:1,textTransform:"uppercase"}}>
                  {user.role==="admin"?"Admin":"Panel Pro"}
                </button>
              </>
            )}
            <button onClick={()=>{setUser(null);localStorage.removeItem("tpz_token");setView("home");}} style={{background:"var(--d3)",color:"var(--muted)",border:"1px solid var(--border)",padding:"7px 10px",borderRadius:6,cursor:"pointer",fontSize:"0.72rem"}}>
              Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeView({ setView, setPurchaseTarget, picks, setSelectedTipster }) {
  const activePicks = picks.filter((pick)=>!isMatchStarted(pick.time));
  const resolvedPicks = picks.filter((pick)=>pick.result==="won"||pick.result==="lost");
  const wonCount = resolvedPicks.filter((pick)=>pick.result==="won").length;
  const lostCount = resolvedPicks.filter((pick)=>pick.result==="lost").length;
  const winRate = resolvedPicks.length > 0 ? Math.round((wonCount / resolvedPicks.length) * 100) : 0;
  const avgOdds = resolvedPicks.length > 0
    ? resolvedPicks.reduce((sum,pick)=>sum + toSafeNumber(pick?.odds,0),0) / resolvedPicks.length
    : 0;
  const totalSales = picks.reduce((sum,pick)=>sum + Math.max(0,toSafeNumber(pick?.salesCount,0)),0);
  const totalTipsters = new Set(picks.map((pick)=>String(pick?.tipster||"").trim()).filter(Boolean)).size;

  const tipsterMap = picks.reduce((acc,pick)=>{
    const name = String(pick?.tipster || "").trim();
    if (!name) return acc;
    if (!acc[name]) acc[name] = { name, won: 0, lost: 0, total: 0, sales: 0 };
    acc[name].total += 1;
    if (pick.result === "won") acc[name].won += 1;
    if (pick.result === "lost") acc[name].lost += 1;
    acc[name].sales += Math.max(0, toSafeNumber(pick?.salesCount,0));
    return acc;
  }, {});

  const topTipsters = Object.values(tipsterMap)
    .map((tipster)=>{
      const decisive = tipster.won + tipster.lost;
      const tipsterWinRate = decisive > 0 ? Math.round((tipster.won / decisive) * 100) : 0;
      return { ...tipster, decisive, winRate: tipsterWinRate };
    })
    .sort((a,b)=>{
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      if (b.sales !== a.sales) return b.sales - a.sales;
      return b.total - a.total;
    })
    .slice(0,3);

  const proofCards = [
    [winRate+"%","Win rate real"],
    [activePicks.length+"+","Picks premium"],
    [formatOddsValue(avgOdds),"Momio prom"],
    [totalSales+"+","Ventas"],
  ];

  const tickerItems = [
    `${activePicks.length}+ picks premium activos`,
    `${winRate}% de efectividad validada`,
    `${totalTipsters || 1} tipsters compitiendo en rankings`,
    `${totalSales}+ ventas registradas`,
    "Pagos semanales 90/10 transparentes",
  ];

  const trustBadges = [
    "✔ Resultados con dictamen IA + validación admin",
    "✔ Tickets reales con capa de protección",
    "✔ Compra segura y desbloqueo inmediato",
    "✔ Tipsters con historial público verificable",
  ];

  const howSteps = [
    { id: "01", title: "Explora picks top", desc: "Filtra por liga, momio y rendimiento para elegir oportunidades con ventaja." },
    { id: "02", title: "Compra y desbloquea", desc: "Paga en segundos y obtén acceso al ticket premium del tipster." },
    { id: "03", title: "Sigue resultados", desc: "Consulta dictamen final, historial y ranking actualizado en tiempo real." },
  ];

  return (
    <div>
      <section className="tpz-hero tpz-landing-hero" style={{display:"flex",alignItems:"center",padding:"clamp(90px,14vw,120px) 5% 72px",position:"relative"}}>
        <div className="tpz-hero-glow" />
        <div className="tpz-two-col-grid" style={{position:"relative",zIndex:2,width:"100%",display:"grid",gridTemplateColumns:"minmax(0,1.25fr) minmax(220px,.75fr)",gap:16,alignItems:"stretch"}}>
          <div className="tpz-hero-content" style={{animation:"fadeUp .7s ease both"}}>
            <span className="tpz-hero-badge">⚡ Picks premium verificados</span>
            <h1 className="tpz-hero-title">Domina el juego con <span>picks de élite</span></h1>
            <p className="tpz-hero-subtitle">
              Análisis de tipsters top, tickets reales y estadísticas transparentes para apostar con más confianza y control.
            </p>
            <div className="tpz-hero-cta-row">
              <button onClick={()=>setView("marketplace")} style={{background:"var(--g)",color:"#000",border:"none",padding:"14px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"0.95rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
                VER PICKS GRATIS
              </button>
              <button onClick={()=>setView("marketplace")} className="tpz-hero-secondary-btn">
                VER PICKS PREMIUM
              </button>
            </div>
            <div className="tpz-proof-grid">
              {proofCards.map(([value,label])=>(
                <div key={label} className="tpz-proof-card">
                  <div className="tpz-proof-value">{value}</div>
                  <div className="tpz-proof-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:"rgba(16,22,19,0.88)",border:"1px solid rgba(29,185,84,0.22)",borderRadius:12,padding:"14px 12px",alignSelf:"end"}}>
            <div style={{fontSize:"0.66rem",color:"var(--g)",letterSpacing:1.5,fontWeight:700,marginBottom:8,textTransform:"uppercase"}}>
              Radar en vivo
            </div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",lineHeight:1,marginBottom:8}}>
              {activePicks.length}+ picks abiertos
            </div>
            <div style={{fontSize:"0.73rem",lineHeight:1.5,color:"var(--text-dim)",marginBottom:10}}>
              W/L: {wonCount}-{lostCount} · promedio de momio {formatOddsValue(avgOdds)}
            </div>
            {topTipsters.length > 0 ? topTipsters.map((tipster)=>(
              <div key={tipster.name} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 9px",marginBottom:7}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:8,alignItems:"center"}}>
                  <button onClick={()=>{ setSelectedTipster&&setSelectedTipster(tipster.name); setView("tipster-profile"); }} style={{background:"none",border:"none",padding:0,color:"var(--text)",fontWeight:700,fontSize:"0.8rem",cursor:"pointer",textAlign:"left"}}>
                    {tipster.name}
                  </button>
                  <span style={{color:"var(--g)",fontFamily:"'Bebas Neue'",fontSize:"1.05rem",lineHeight:1}}>{tipster.winRate}%</span>
                </div>
                <div style={{fontSize:"0.66rem",color:"var(--muted)"}}>
                  {tipster.won}-{tipster.lost} W/L · {tipster.sales} ventas
                </div>
              </div>
            )) : (
              <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>Pronto verás aquí a los tipsters con mejor performance.</div>
            )}
          </div>
        </div>
      </section>

      <section className="tpz-live-ticker">
        <div className="tpz-live-ticker-track">
          {[...tickerItems, ...tickerItems].map((item,index)=>(
            <span key={`${item}-${index}`} className="tpz-live-ticker-item">● {item}</span>
          ))}
        </div>
      </section>

      <section className="tpz-section" style={{padding:"42px 5%",background:"var(--d2)"}}>
        <div className="tpz-trust-row">
          {trustBadges.map((badge)=><span key={badge} className="tpz-trust-chip">{badge}</span>)}
        </div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(1.8rem,3.8vw,2.6rem)",letterSpacing:1.2,marginBottom:16}}>
          ¿Cómo funciona <span style={{color:"var(--g)"}}>The Pick Zone</span>?
        </h2>
        <div className="tpz-how-grid">
          {howSteps.map((step)=>(
            <div key={step.id} className="tpz-how-card">
              <span className="tpz-how-step">{step.id}</span>
              <div className="tpz-how-title">{step.title}</div>
              <div className="tpz-how-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="tpz-section" style={{padding:"42px 5%",background:"var(--dark)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:16}}>
          <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(1.8rem,3.8vw,2.6rem)",letterSpacing:1.2}}>
            Tipsters <span style={{color:"var(--g)"}}>que están rompiendo</span>
          </h2>
          <button onClick={()=>setView("rankings")} className="tpz-hero-secondary-btn" style={{padding:"9px 14px",fontSize:"0.73rem"}}>
            VER TABLA COMPLETA
          </button>
        </div>
        {topTipsters.length > 0 ? (
          <div className="tpz-highlight-grid">
            {topTipsters.map((tipster)=>(
              <div key={tipster.name} className="tpz-highlight-card">
                <div className="tpz-highlight-head">
                  <span className="tpz-highlight-name">{tipster.name}</span>
                  <span className="tpz-highlight-roi">{tipster.winRate}%</span>
                </div>
                <div className="tpz-highlight-meta">
                  {tipster.total} picks · {tipster.won}-{tipster.lost} W/L<br/>
                  {tipster.sales} ventas acumuladas
                </div>
                <button
                  className="tpz-highlight-btn"
                  onClick={()=>{
                    setSelectedTipster&&setSelectedTipster(tipster.name);
                    setView("tipster-profile");
                  }}
                >
                  Ver perfil del tipster
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{fontSize:"0.82rem",color:"var(--muted)"}}>Estamos recopilando historial para mostrar el top completo de tipsters.</div>
        )}
      </section>

      {activePicks.length > 0 && (
        <section className="tpz-section" style={{padding:"42px 5%",background:"var(--d2)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:16}}>
            <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(1.8rem,3.8vw,2.6rem)",letterSpacing:1.2}}>
              Picks <span style={{color:"var(--g)"}}>calientes de hoy</span>
            </h2>
            <button onClick={()=>setView("marketplace")} className="tpz-hero-secondary-btn" style={{padding:"9px 14px",fontSize:"0.73rem"}}>
              VER MARKETPLACE
            </button>
          </div>
          <div className="tpz-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {activePicks.slice(0,6).map((pick,index)=>(
              <PickCard key={pick._id||index} pick={pick} setView={setView} setPurchaseTarget={setPurchaseTarget} setSelectedTipster={setSelectedTipster}/>
            ))}
          </div>
        </section>
      )}

      <section className="tpz-section" style={{padding:"24px 5% 56px",background:"var(--dark)"}}>
        <div className="tpz-landing-cta">
          <h3 className="tpz-landing-cta-title">¿Listo para pasar al siguiente nivel?</h3>
          <p className="tpz-landing-cta-subtitle">
            Sube tu propio rendimiento, sigue tipsters de alto impacto o conviértete en Pro para publicar picks y monetizar tu ventaja.
          </p>
          <div className="tpz-landing-cta-actions">
            <button onClick={()=>setView("become-pro")} style={{background:"var(--g)",color:"#000",border:"none",padding:"12px 24px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"0.9rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
              QUIERO SER PRO
            </button>
            <button onClick={()=>setView("marketplace")} className="tpz-hero-secondary-btn" style={{padding:"11px 18px",fontSize:"0.8rem"}}>
              EXPLORAR PICKS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PICK CARD ─────────────────────────────────────────────────────────────────
function PickCard({ pick, setView, setPurchaseTarget, setSelectedTipster }) {
  const started = isMatchStarted(pick.time);
  const timeDisplay = pick.time && (pick.time.includes('T') || pick.time.includes('Z')) ? isoToLocal(pick.time) : pick.time;
  const salesCount = Math.max(0, toSafeNumber(pick?.salesCount, 0));
  const teams = resolvePickTeams(pick);
  const hasTeamNames = teams.homeTeam && teams.awayTeam;
  const betTypeLabel = getPickBetTypeLabel(pick);
  const leagueLabel = String(pick?.league || "Liga");

  if (started) return null;

  return (
    <div className="tpz-card" style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,overflow:"hidden",transition:"all .25s"}}
      onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(29,185,84,0.5)"}
      onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
      <div style={{padding:"13px 18px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{background:"rgba(29,185,84,0.1)",border:"1px solid rgba(29,185,84,0.2)",color:"var(--g)",padding:"3px 10px",borderRadius:100,fontSize:"0.67rem",fontWeight:700}}>
          {betTypeLabel} · {leagueLabel}
        </span>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:2}}>
          <span style={{color:"var(--gold)",fontWeight:900,fontSize:"0.78rem"}}>MOMIO {pick.odds}</span>
          <span style={{color:"var(--text-dim)",fontWeight:700,fontSize:"0.66rem"}}>BANK {pick.bank}% recomendado</span>
        </div>
      </div>
      <div className="tpz-card-content" style={{padding:18}}>
        <div style={{fontSize:"0.72rem",color:"var(--text-dim)",marginBottom:5}}>{timeDisplay}</div>
        <div style={{fontFamily:"'Barlow Condensed'",fontSize:"1.2rem",fontWeight:700,marginBottom:12}}>
          {hasTeamNames ? (
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <TeamShield logoUrl={pick?.homeLogo} teamName={teams.homeTeam} size={22} />
              <span>{teams.homeTeam}</span>
              <span style={{color:"var(--muted)",fontSize:"0.9rem"}}>vs</span>
              <TeamShield logoUrl={pick?.awayLogo} teamName={teams.awayTeam} size={22} />
              <span>{teams.awayTeam}</span>
            </div>
          ) : (
            <span>{pick.match}</span>
          )}
        </div>
        <div style={{background:"var(--d4)",borderRadius:8,padding:"10px",textAlign:"center",border:"1px dashed rgba(29,185,84,0.2)",marginBottom:14}}>
          <span style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase"}}>Contenido exclusivo</span>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap",marginBottom:12}}>
          <span style={{fontSize:"0.68rem",color:"var(--muted)"}}>{salesCount} ventas</span>
          <PickShareButtons pick={pick} compact />
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div onClick={()=>{setSelectedTipster&&setSelectedTipster(pick.tipster);setView("tipster-profile");}} style={{fontSize:"0.82rem",fontWeight:700,cursor:"pointer",color:"var(--g)"}}>{pick.tipster}</div>
          <button onClick={()=>{setPurchaseTarget(pick);setView("purchase");}} style={{background:pick.price===0||pick.price==="0"?"#17a347":"var(--g)",color:"#000",border:"none",padding:"10px 20px",borderRadius:6,fontFamily:"'Barlow Condensed'",fontSize:"0.88rem",fontWeight:900,letterSpacing:1.5,cursor:"pointer"}}>
            {pick.price===0||pick.price==="0"?"GRATIS":`$${pick.price} USD`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── MARKETPLACE ───────────────────────────────────────────────────────────────
function MarketplaceView({ setView, setPurchaseTarget, picks, setSelectedTipster }) {
  const available = picks.filter(p => !isMatchStarted(p.time));
  const freePicks = available.filter((pick)=>toSafeNumber(pick?.price,0) <= 0).length;
  const avgOdds = available.length > 0
    ? available.reduce((sum,pick)=>sum + toSafeNumber(pick?.odds,0),0) / available.length
    : 0;
  const maxBank = available.reduce((max,pick)=>Math.max(max, toSafeNumber(pick?.bank,0)),0);
  const totalTipsters = new Set(available.map((pick)=>String(pick?.tipster||"").trim()).filter(Boolean)).size;
  const totalLeagues = new Set(available.map((pick)=>String(pick?.league||"").trim()).filter(Boolean)).size;
  const topSalesPick = [...available].sort((a,b)=>
    Math.max(0,toSafeNumber(b?.salesCount,0)) - Math.max(0,toSafeNumber(a?.salesCount,0))
  )[0] || null;
  const topSalesCount = Math.max(0, toSafeNumber(topSalesPick?.salesCount,0));
  return (
    <div className="tpz-page tpz-market-shell" style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>

      <div className="tpz-market-head">
        <h2 className="tpz-market-title">Picks disponibles ahora</h2>
        <button
          onClick={()=>setView("rankings")}
          className="tpz-hero-secondary-btn"
          style={{padding:"9px 14px",fontSize:"0.73rem"}}
        >
          Ver rankings
        </button>
      </div>
      {available.length === 0 ? (
        <div className="tpz-market-empty">
          <strong>No hay picks disponibles por ahora</strong>
          Vuelve en unos minutos para ver nuevas publicaciones premium de nuestros tipsters.
        </div>
      ) : (
        <div style={{fontSize:"0.74rem",color:"var(--muted)",marginBottom:12}}>
          {totalTipsters || 0} tipsters activos · {totalLeagues || 0} ligas disponibles
        </div>
      )}
      {available.length > 0 && (
        <div className="tpz-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
          {available.map((p,i)=><PickCard key={p._id||i} pick={p} setView={setView} setPurchaseTarget={setPurchaseTarget} setSelectedTipster={setSelectedTipster}/>)}
        </div>
      )}
      <section className="tpz-market-hero" style={{marginTop:available.length>0?22:0}}>
        <div className="tpz-market-badge-row">
          <span className="tpz-market-badge">Mercado en vivo</span>
          <span className="tpz-market-badge">Picks verificados</span>
          <span className="tpz-market-badge">Actualización continua</span>
        </div>
        <h1 className="tpz-market-hero-title">
          Marketplace de <span style={{color:"var(--g)"}}>Picks</span>
        </h1>
        <p className="tpz-market-hero-subtitle">
          Métricas clave y contexto premium para monitorear el mercado sin perder de vista los picks activos.
        </p>
        <div className="tpz-market-kpis">
          <div className="tpz-market-kpi">
            <div className="tpz-market-kpi-value">{available.length}</div>
            <div className="tpz-market-kpi-label">Picks activos</div>
          </div>
          <div className="tpz-market-kpi">
            <div className="tpz-market-kpi-value">{freePicks}</div>
            <div className="tpz-market-kpi-label">Picks gratis</div>
          </div>
          <div className="tpz-market-kpi">
            <div className="tpz-market-kpi-value">{formatOddsValue(avgOdds)}</div>
            <div className="tpz-market-kpi-label">Momio promedio</div>
          </div>
          <div className="tpz-market-kpi">
            <div className="tpz-market-kpi-value">{Math.round(maxBank)}%</div>
            <div className="tpz-market-kpi-label">Bank máximo</div>
          </div>
        </div>
        {topSalesPick && (
          <div className="tpz-market-highlight">
            <div>
              <div className="tpz-market-highlight-title">Pick más vendido: {topSalesPick.match}</div>
              <div className="tpz-market-highlight-meta">
                {topSalesPick.tipster} · {topSalesCount} ventas · Momio {formatOddsValue(topSalesPick.odds)} · Bank {Math.round(Math.max(0,toSafeNumber(topSalesPick.bank,0)))}%
              </div>
            </div>
            <button
              className="tpz-ranking-profile-btn"
              style={{marginTop:0}}
              onClick={()=>{ setPurchaseTarget(topSalesPick); setView("purchase"); }}
            >
              Ir al pick top
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// ── PURCHASE VIEW ─────────────────────────────────────────────────────────────
function PurchaseView({ pick, setView, user }) {
  const [step, setStep] = React.useState(1);
  const [paying, setPaying] = React.useState(false);
  const [error, setError] = React.useState("");
  const [unlockedPick, setUnlockedPick] = React.useState(null);
  const [resolvedPick, setResolvedPick] = React.useState(pick || null);
  const [resolvingPick, setResolvingPick] = React.useState(false);
  const [downloadingTicket, setDownloadingTicket] = React.useState(false);
  const [downloadCount, setDownloadCount] = React.useState(0);
  const handledSessionRef = React.useRef(null);

  React.useEffect(()=>{
    if (pick) setResolvedPick(pick);
  },[pick]);

  React.useEffect(()=>{
    setStep(1);
    setError("");
    setUnlockedPick(null);
    setDownloadingTicket(false);
    setDownloadCount(0);
    handledSessionRef.current = null;
  },[user?._id, pick?._id]);

  React.useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    const queryPickId = params.get("pickId");
    if (pick || flow !== "pick" || !queryPickId) return;
    setResolvingPick(true);
    fetch(BACKEND_URL+"/api/picks")
      .then(r=>r.json())
      .then(data=>{
        if(Array.isArray(data)){
          const found = data.find((p)=>String(p._id||p.id)===String(queryPickId));
          if(found) setResolvedPick(found);
        }
      })
      .catch(()=>{})
      .finally(()=>setResolvingPick(false));
  },[pick]);

  React.useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    const checkout = params.get("checkout");
    const sessionId = params.get("session_id");
    const queryPickId = params.get("pickId");
    if (flow !== "pick") return;
    if (checkout === "cancel") {
      setError("Pago cancelado.");
      clearCheckoutQueryParams();
      return;
    }
    if (checkout !== "success" || !sessionId || handledSessionRef.current === sessionId) return;
    if (!user) return;
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setError("Inicia sesión para confirmar la compra.");
      return;
    }
    handledSessionRef.current = sessionId;
    setPaying(true);
    setError("");
    fetch(BACKEND_URL+"/api/stripe/picks/confirm-checkout-session",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
      body:JSON.stringify({sessionId,pickId:queryPickId||resolvedPick?._id})
    })
      .then(async (r)=>{
        const data = await r.json();
        if(!r.ok||!data.success){
          const details = [data.status,data.checkoutStatus,data.paymentIntentStatus].filter(Boolean).join(" / ");
          throw new Error(details ? `${data.error||"No se pudo confirmar el pago"} (${details})` : (data.error||"No se pudo confirmar el pago"));
        }
        setUnlockedPick(data.pick);
        setStep(2);
        clearCheckoutQueryParams();
      })
      .catch((e)=>setError(e.message||"Error confirmando pago"))
      .finally(()=>setPaying(false));
  },[user,resolvedPick]);

  const activePick = resolvedPick || pick;
  React.useEffect(()=>{
    const initialCount = Math.max(0, toSafeNumber(unlockedPick?.downloadCount ?? activePick?.downloadCount, 0));
    setDownloadCount(initialCount);
  },[unlockedPick?._id, unlockedPick?.downloadCount, activePick?._id, activePick?.downloadCount]);

  if (!user) return (
    <div className="tpz-centered-page" style={{paddingTop:120,textAlign:"center",padding:"120px 5%"}}>
      <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",marginBottom:16}}>Inicia sesión para comprar</h2>
      <button onClick={()=>setView("login")} style={{background:"var(--g)",color:"#000",border:"none",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>INICIAR SESIÓN</button>
    </div>
  );

  if (!activePick) {
    if (resolvingPick || new URLSearchParams(window.location.search).get("flow")==="pick") {
      return <div style={{paddingTop:120,textAlign:"center",color:"var(--muted)"}}>Cargando compra...</div>;
    }
    setView("marketplace");
    return null;
  }

  const timeDisplay = activePick.time && (activePick.time.includes('T') || activePick.time.includes('Z')) ? isoToLocal(activePick.time) : activePick.time;
  const isFreePick = Number(activePick?.price) === 0;

  async function handleBuy() {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setView("login");
      return;
    }
    setPaying(true);
    setError("");
    try {
      if (isFreePick) {
        const fullRes = await fetch(BACKEND_URL+`/api/picks/${activePick._id}/full`,{
          headers:{"Authorization":"Bearer "+token}
        });
        const fullData = await fullRes.json();
        if(!fullRes.ok){
          setError(fullData.error||"No tienes acceso a este pick");
          setPaying(false);
          return;
        }
        setUnlockedPick(fullData||activePick);
        setStep(2);
        setPaying(false);
        clearCheckoutQueryParams();
        return;
      }
      const { successUrl, cancelUrl } = getCheckoutReturnUrls();
      const r = await fetch(BACKEND_URL+"/api/stripe/picks/create-checkout-session",{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body:JSON.stringify({pickId:activePick._id,successUrl,cancelUrl})
      });
      const data = await r.json();
      if(!r.ok){
        setError(data.error||"No se pudo iniciar el pago");
        setPaying(false);
        return;
      }
      if(data.free||data.alreadyUnlocked){
        const fullRes = await fetch(BACKEND_URL+`/api/picks/${activePick._id}/full`,{
          headers:{"Authorization":"Bearer "+token}
        });
        const fullData = await fullRes.json();
        if(!fullRes.ok){
          setError(fullData.error||"No tienes acceso a este pick");
          setPaying(false);
          return;
        }
        setUnlockedPick(fullData||data.pick||activePick);
        setStep(2);
        setPaying(false);
        clearCheckoutQueryParams();
        return;
      }
      if(data.checkoutUrl){
        window.location.href = data.checkoutUrl;
        return;
      }
      setError("No se recibió URL de checkout");
    } catch(e){
      setError("Error: "+e.message);
    }
    setPaying(false);
  }

  async function handleTrackShareDownload(targetPickOverride) {
    const targetPick = targetPickOverride || unlockedPick || activePick;
    if (!targetPick?._id) {
      setError("Pick no disponible");
      throw new Error("Pick no disponible");
    }
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setError("Inicia sesión para descargar la imagen");
      throw new Error("Sin sesión");
    }

    setDownloadingTicket(true);
    setError("");
    try {
      const r = await fetch(BACKEND_URL+`/api/picks/${targetPick._id}/download`, {
        method: "POST",
        headers: { "Authorization": "Bearer "+token }
      });
      const data = await r.json();
      if (!r.ok || !data.success) {
        throw new Error(data.error || "No se pudo registrar la descarga");
      }
      const updatedCount = Math.max(0, toSafeNumber(data.downloadCount, downloadCount + 1));
      setDownloadCount(updatedCount);
      setUnlockedPick((prev)=>prev ? ({ ...prev, downloadCount: updatedCount }) : prev);
      setResolvedPick((prev)=>{
        if (!prev) return prev;
        if (String(prev._id||prev.id)!==String(targetPick._id||targetPick.id)) return prev;
        return { ...prev, downloadCount: updatedCount };
      });
      return updatedCount;
    } catch(e) {
      setError(e.message || "No se pudo registrar la descarga");
      throw e;
    } finally {
      setDownloadingTicket(false);
    }
  }
  const downloadLegend = downloadingTicket
    ? "Registrando descarga..."
    : downloadCount > 0
      ? `Descargado ${downloadCount} ${downloadCount === 1 ? "vez" : "veces"} · archivo con marca de agua`
      : "Aún no lo has descargado · usa Descargar para bajar la imagen con marca de agua";

  if (step === 2) return (
    <div className="tpz-centered-page" style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-purchase-card" style={{maxWidth:440,width:"100%",animation:"popIn .4s ease",textAlign:"center"}}>
        <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(29,185,84,0.15)",border:"2px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:"1rem",fontWeight:900,color:"var(--g)",letterSpacing:1}}>OK</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",color:"var(--g)",marginBottom:8}}>¡Pick Desbloqueado!</h2>
        <p style={{color:"var(--muted)",marginBottom:24}}>{unlockedPick?.match||activePick.match}</p>
        <div className="tpz-protected-content" style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:20,marginBottom:20,textAlign:"left"}}>
          <div style={{fontSize:"0.7rem",color:"var(--g)",letterSpacing:2,fontWeight:700,marginBottom:12}}>CONTENIDO DESBLOQUEADO</div>
          {unlockedPick?.ticketImg ? (
            <img src={unlockedPick.ticketImg} alt="Ticket" style={{width:"100%",borderRadius:8}}/>
          ) : (
            <div style={{textAlign:"center",color:"var(--muted)",padding:20}}>Ticket no disponible</div>
          )}
          <div className="tpz-watermark-layer">TPZ PREMIUM • CONTENIDO PROTEGIDO</div>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:12}}>
          <PickShareButtons pick={unlockedPick||activePick} onDownloadImage={handleTrackShareDownload} />
        </div>
        <div style={{fontSize:"0.72rem",color:"var(--muted)",marginBottom:14}}>{downloadLegend}</div>
        <button onClick={()=>setView("marketplace")} style={{background:"var(--g)",color:"#000",border:"none",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
          VER MÁS PICKS
        </button>
      </div>
    </div>
  );

  return (
    <div className="tpz-centered-page" style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-purchase-card" style={{maxWidth:440,width:"100%",animation:"popIn .4s ease"}}>
        <div style={{background:"var(--d2)",border:"1px solid rgba(29,185,84,0.3)",borderRadius:20,overflow:"hidden"}}>
          <div style={{padding:"20px 24px",textAlign:"center",borderBottom:"1px solid var(--border)"}}>
            <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>PICK EXCLUSIVO</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.4rem"}}>{activePick.match}</div>
            <div style={{fontSize:"0.75rem",color:"var(--muted)",marginTop:4}}>{timeDisplay} · {activePick.league}</div>
          </div>
          <div style={{display:"flex",borderBottom:"1px solid var(--border)"}}>
            {[["$"+activePick.price+" USD","Precio","var(--gold)"],[""+activePick.odds,"Momio","var(--g)"],[activePick.bank+"%","Bank","var(--text)"]].map(([v,l,col],i)=>(
              <div key={l} style={{flex:1,padding:"14px 8px",textAlign:"center",borderRight:i<2?"1px solid var(--border)":"none"}}>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.4rem",color:col}}>{v}</div>
                <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"20px 24px",borderBottom:"1px solid var(--border)"}}>
            <div style={{background:"var(--d4)",borderRadius:8,padding:"20px",textAlign:"center",border:"1px dashed rgba(29,185,84,0.2)"}}>
              <span style={{fontSize:"1rem",fontWeight:900,color:"var(--g)",letterSpacing:1}}>TPZ</span>
              <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1.5,marginTop:6}}>CONTENIDO EXCLUSIVO</div>
            </div>
          </div>
          <div style={{padding:"14px 24px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid var(--border)"}}>
            <div style={{width:36,height:36,borderRadius:"50%",background:"var(--g)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue'",color:"#000",fontSize:"1rem"}}>{(activePick.tipster||"T")[0]}</div>
            <div>
              <div style={{fontWeight:700,fontSize:"0.9rem"}}>{activePick.tipster}</div>
              <div style={{fontSize:"0.72rem",color:"var(--g)"}}>ROI {activePick.roi||"+0%"}</div>
            </div>
          </div>
          <div style={{padding:20}}>
            {error && <div style={{background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"8px 12px",borderRadius:6,marginBottom:12,fontSize:"0.8rem"}}>{error}</div>}
            <button onClick={handleBuy} disabled={paying} style={{width:"100%",background:paying?"var(--d4)":"var(--g)",color:paying?"var(--muted)":"#000",border:"none",padding:15,borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
              {paying?"Procesando...":activePick.price===0||activePick.price==="0"?"OBTENER GRATIS":"PAGAR CON STRIPE - $"+activePick.price+" USD"}
            </button>
            <div style={{textAlign:"center",fontSize:"0.72rem",color:"var(--muted)",marginTop:10}}>Pago seguro · Acceso inmediato</div>
          </div>
        </div>
        <button onClick={()=>setView("marketplace")} style={{background:"none",border:"none",color:"var(--muted)",fontSize:"0.8rem",cursor:"pointer",marginTop:16,display:"block",textAlign:"center",width:"100%"}}>← Volver al marketplace</button>
      </div>
    </div>
  );
}

// ── RANKINGS ──────────────────────────────────────────────────────────────────
function RankingsView({ setView, picks, setSelectedTipster }) {
  const [tipsters, setTipsters] = useState([]);
  const [sortBy, setSortBy] = useState("roi");

  useEffect(()=>{
    fetch(BACKEND_URL+"/api/tipsters")
      .then(r=>r.json())
      .then(data=>{
        if(Array.isArray(data)){
          const t = data.map(u=>{
            const uPicks = picks.filter(p=>p.tipster===u.name);
            const localWon = uPicks.filter(p=>p.result==="won").length;
            const localLost = uPicks.filter(p=>p.result==="lost").length;
            const localPush = uPicks.filter(p=>p.result==="void").length;
            const localResolved = uPicks.filter(p=>["won","lost","void"].includes(p.result));
            const localAvgOdds = localResolved.length>0
              ? localResolved.reduce((sum,p)=>sum+toSafeNumber(p.odds,0),0) / localResolved.length
              : 0;

            const won = Math.max(0, toSafeNumber(u.wonPicks, localWon));
            const lost = Math.max(0, toSafeNumber(u.lostPicks, localLost));
            const push = Math.max(0, toSafeNumber(u.pushPicks, localPush));
            const fallbackTotalPicks = won + lost + push;
            const totalPicks = Math.max(0, toSafeNumber(u.totalPicks, fallbackTotalPicks || uPicks.length));
            const decisive = won + lost;
            const winRate = Math.max(0, toSafeNumber(u.winRate, decisive>0 ? Math.round((won/decisive)*100) : 0));
            const avgOdds = toSafeNumber(u.avgOdds, localAvgOdds);
            const roiNum = toSafeNumber(u.roiValue, parseFloat((u.roi||"0").replace("+","").replace("%",""))||0);
            const yieldNum = toSafeNumber(u.yieldValue, parseFloat((u.yield||"0").replace("+","").replace("%",""))||0);
            const netUnits = toSafeNumber(u.netUnits, 0);
            const roiText = typeof u.roi === "string" && u.roi ? u.roi : formatSignedPercent(roiNum);
            const yieldText = typeof u.yield === "string" && u.yield ? u.yield : formatSignedPercent(yieldNum);

            return {...u, picks:totalPicks, won, lost, push, winRate, avgOdds, roiNum, yieldNum, roiText, yieldText, netUnits};
          });
          setTipsters(t);
        }
      }).catch(()=>{});
  },[picks]);

  function openTipsterProfile(tipster) {
    const tipsterName = String(tipster?.name || "").trim();
    if (!tipsterName) return;
    if (typeof setSelectedTipster === "function") setSelectedTipster(tipsterName);
    setView("tipster-profile");
  }

  const sorted = [...tipsters].sort((a,b)=>{
    if(sortBy==="roi") return b.roiNum - a.roiNum;
    if(sortBy==="winrate") return b.winRate - a.winRate;
    if(sortBy==="picks") return b.picks - a.picks;
    return 0;
  });

  const avgWinRate = sorted.length > 0
    ? Math.round(sorted.reduce((sum,tipster)=>sum + toSafeNumber(tipster.winRate,0),0) / sorted.length)
    : 0;
  const totalTrackedPicks = sorted.reduce((sum,tipster)=>sum + Math.max(0,toSafeNumber(tipster.picks,0)),0);
  const bestRoi = sorted.length > 0 ? (sorted[0].roiText || formatSignedPercent(sorted[0].roiNum)) : "+0.0%";
  const bestYield = sorted.length > 0 ? (sorted[0].yieldText || formatSignedPercent(sorted[0].yieldNum)) : "+0.0%";

  return (
    <div className="tpz-page tpz-rankings-shell" style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <section className="tpz-rankings-hero">
          <h1 className="tpz-rankings-title">
            Ranking de <span style={{color:"var(--g)"}}>Tipsters</span>
          </h1>
          <p className="tpz-rankings-subtitle">
            Performance real, actualizado por resultados verificados. Detecta rápido quién viene más sólido y con mejor gestión. Actualmente se trackean {totalTrackedPicks} picks entre todos los tipsters.
          </p>
          <div className="tpz-rankings-summary-grid">
            <div className="tpz-rankings-summary-card">
              <div className="tpz-rankings-summary-value">{sorted.length}</div>
              <div className="tpz-rankings-summary-label">Tipsters activos</div>
            </div>
            <div className="tpz-rankings-summary-card">
              <div className="tpz-rankings-summary-value">{avgWinRate}%</div>
              <div className="tpz-rankings-summary-label">Win rate medio</div>
            </div>
            <div className="tpz-rankings-summary-card">
              <div className="tpz-rankings-summary-value">{bestRoi}</div>
              <div className="tpz-rankings-summary-label">Mejor ROI</div>
            </div>
            <div className="tpz-rankings-summary-card">
              <div className="tpz-rankings-summary-value">{bestYield}</div>
              <div className="tpz-rankings-summary-label">Mejor yield</div>
            </div>
          </div>
        </section>
        <div className="tpz-ranking-filters" style={{display:"flex",gap:8,justifyContent:"center",marginBottom:20}}>
          {[["roi","📊 ROI"],["winrate","🎯 Win Rate"],["picks","📈 Picks"]].map(([v,l])=>(
            <button
              key={v}
              onClick={()=>setSortBy(v)}
              className={`tpz-ranking-filter-btn${sortBy===v?" active":""}`}
            >
              {l}
            </button>
          ))}
        </div>
        {sorted.length === 0 ? (
          <div style={{textAlign:"center",padding:60,color:"var(--muted)",background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12}}>
            <div style={{fontSize:"3rem",marginBottom:16}}>🏆</div>
            <div>No hay tipsters registrados aún</div>
          </div>
        ) : (
          <div className="tpz-ranking-list">
            {sorted.map((t,i)=>{
              const positionLabel = i===0 ? "🥇" : i===1 ? "🥈" : i===2 ? "🥉" : `#${i+1}`;
              const topClass = i===0 ? "tpz-ranking-card-top-1" : i===1 ? "tpz-ranking-card-top-2" : i===2 ? "tpz-ranking-card-top-3" : "";
              const winRateWidth = Math.max(0, Math.min(100, toSafeNumber(t.winRate,0)));
              return (
                <div key={t._id||i} className={`tpz-ranking-card ${topClass}`.trim()}>
                  <div className="tpz-ranking-main">
                    <div className="tpz-ranking-position">{positionLabel}</div>
                    <button onClick={()=>openTipsterProfile(t)} style={{width:44,height:44,borderRadius:"50%",background:"var(--g)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue'",color:"#000",fontSize:"1.2rem",overflow:"hidden",flexShrink:0,padding:0,border:"none",cursor:"pointer"}}>
                      {t.avatar ? <img src={t.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : (t.name||"T")[0].toUpperCase()}
                    </button>
                    <div>
                      <button onClick={()=>openTipsterProfile(t)} className="tpz-ranking-tipster-name" style={{background:"none",border:"none",padding:0,cursor:"pointer"}}>
                        {t.name}
                      </button>
                      <div className="tpz-ranking-meta">{t.picks} picks · W/L/P {t.won}/{t.lost}/{t.push}</div>
                      <div className="tpz-ranking-meta">Momio prom {formatOddsValue(t.avgOdds)} · Win rate {t.winRate}%</div>
                      <div className="tpz-ranking-progress-track">
                        <div className="tpz-ranking-progress-fill" style={{width:`${winRateWidth}%`}} />
                      </div>
                    </div>
                  </div>
                  <div className="tpz-ranking-stats">
                    <div className="tpz-ranking-roi" style={{color:t.roiNum>=0?"var(--g)":"#f44336"}}>{t.roiText||"+0%"}</div>
                    <div className="tpz-ranking-yield" style={{color:t.yieldNum>=0?"var(--g)":"#f44336"}}>YIELD {t.yieldText||"+0%"}</div>
                    <div className="tpz-ranking-units" style={{color:t.netUnits>=0?"var(--g)":"#f44336"}}>{formatSignedUnits(t.netUnits)}</div>
                    <button className="tpz-ranking-profile-btn" onClick={()=>openTipsterProfile(t)}>Ver tipster</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── AUTH VIEW ─────────────────────────────────────────────────────────────────
function AuthView({ setView, setUser, mode, authSystemMessage, resetToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const requiresPassword = mode==="login"||mode==="register"||mode==="reset";
  const requiresConfirmPassword = mode==="register"||mode==="reset";
  const isStrongPassword = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}$/.test(String(value || ""));
  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const hasResetToken = String(resetToken || "").trim().length > 0;
  const hasStrongPassword = isStrongPassword(password);
  const passwordsMatch = String(password || "") === String(confirmPassword || "");
  const canSubmit = (() => {
    if (loading) return false;
    if (mode==="login") return Boolean(trimmedEmail && password);
    if (mode==="register") return Boolean(trimmedName && trimmedEmail && password && confirmPassword && hasStrongPassword && passwordsMatch);
    if (mode==="forgot") return Boolean(trimmedEmail);
    if (mode==="reset") return Boolean(hasResetToken && password && confirmPassword && hasStrongPassword && passwordsMatch);
    return false;
  })();

  useEffect(()=>{
    setError("");
    setNotice("");
  },[mode, resetToken]);

  async function handleSubmit() {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedName = String(name || "").trim();
    const normalizedPassword = String(password || "");
    const normalizedConfirmPassword = String(confirmPassword || "");
    setError("");
    setNotice("");
    if (mode==="forgot") {
      if (!normalizedEmail) {
        setError("Ingresa tu correo");
        return;
      }
      setLoading(true);
      try {
        const r = await fetch(BACKEND_URL+"/api/auth/forgot-password", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:normalizedEmail})});
        const data = await r.json().catch(()=>null);
        if (!r.ok) { setError(data?.error||"No se pudo enviar recuperación"); setLoading(false); return; }
        setNotice(data?.message || "Si el correo existe, enviaremos instrucciones para restablecer tu contraseña.");
      } catch(e) { setError("Error de conexión"); }
      setLoading(false);
      return;
    }
    if (mode==="reset") {
      if (!String(resetToken || "").trim()) {
        setError("Token de recuperación inválido o ausente");
        return;
      }
      if (!normalizedPassword) {
        setError("Ingresa tu nueva contraseña");
        return;
      }
      if (!isStrongPassword(normalizedPassword)) {
        setError("La contraseña debe tener mínimo 10 caracteres, mayúscula, minúscula, número y símbolo");
        return;
      }
      if (normalizedPassword !== normalizedConfirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      setLoading(true);
      try {
        const r = await fetch(BACKEND_URL+"/api/auth/reset-password", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:resetToken,password:normalizedPassword})});
        const data = await r.json().catch(()=>null);
        if (!r.ok) { setError(data?.error||"No se pudo restablecer contraseña"); setLoading(false); return; }
        setNotice(data?.message || "Contraseña actualizada correctamente. Ya puedes iniciar sesión.");
        window.history.replaceState({}, document.title, window.location.pathname);
        setTimeout(()=>setView("login"),1200);
      } catch(e) { setError("Error de conexión"); }
      setLoading(false);
      return;
    }
    if (mode==="register") {
      if (!normalizedName || !normalizedEmail || !normalizedPassword) {
        setError("Completa todos los campos");
        return;
      }
      if (!isStrongPassword(normalizedPassword)) {
        setError("La contraseña debe tener mínimo 10 caracteres, mayúscula, minúscula, número y símbolo");
        return;
      }
      if (normalizedPassword !== normalizedConfirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
    }
    setLoading(true); setError("");
    setNotice("");
    try {
      const endpoint = mode==="login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode==="login" ? {email:normalizedEmail,password:normalizedPassword} : {name:normalizedName,email:normalizedEmail,password:normalizedPassword};
      const r = await fetch(BACKEND_URL+endpoint, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      const data = await r.json();
      if (!r.ok) { setError(data.error||"Error"); setLoading(false); return; }
      if (mode === "register") {
        setNotice(data?.message || "Registro exitoso. Revisa tu correo para activar tu cuenta.");
        setLoading(false);
        return;
      }
      localStorage.setItem("tpz_token", data.token);
      setUser(data.user);
      setView("home");
    } catch(e) { setError("Error de conexión"); setLoading(false); }
  }

  const iStyle = {width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:8,padding:"12px 14px",color:"var(--text)",fontSize:"0.95rem",outline:"none",marginBottom:12,boxSizing:"border-box"};
  const passwordWrapperStyle = {position:"relative",marginBottom:12};
  const passwordInputStyle = {...iStyle,marginBottom:0,paddingRight:58};
  const passwordToggleStyle = {position:"absolute",top:0,right:0,height:"100%",background:"none",border:"none",color:"var(--g)",fontWeight:700,fontSize:"0.72rem",padding:"0 12px",cursor:"pointer"};

  return (
    <div className="tpz-centered-page" style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:420,width:"100%",animation:"popIn .4s ease"}}>
        <div className="tpz-auth-card" style={{background:"var(--d2)",border:"1px solid var(--border)",borderRadius:16,padding:32}}>
          <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",marginBottom:24,textAlign:"center"}}>
            {mode==="login"?"Iniciar Sesión":mode==="register"?"Crear Cuenta":mode==="forgot"?"Recuperar contraseña":"Restablecer contraseña"}
          </h2>
          {authSystemMessage && mode==="login" && <div style={{background:"rgba(29,185,84,0.1)",border:"1px solid rgba(29,185,84,0.35)",color:"var(--g)",padding:"8px 10px",borderRadius:8,fontSize:"0.8rem",marginBottom:12}}>{authSystemMessage}</div>}
          {mode==="register" && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre completo" style={iStyle}/>}
          {(mode==="login"||mode==="register"||mode==="forgot") && <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" style={iStyle}/>}
          {requiresPassword && (
            <div style={passwordWrapperStyle}>
              <input value={password} onChange={e=>setPassword(e.target.value)} placeholder={mode==="reset"?"Nueva contraseña":"Contraseña"} type={showPassword?"text":"password"} style={passwordInputStyle}/>
              <button type="button" onClick={()=>setShowPassword(v=>!v)} style={passwordToggleStyle}>{showPassword?"Ocultar":"Ver"}</button>
            </div>
          )}
          {requiresConfirmPassword && (
            <div style={passwordWrapperStyle}>
              <input value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" type={showConfirmPassword?"text":"password"} style={passwordInputStyle}/>
              <button type="button" onClick={()=>setShowConfirmPassword(v=>!v)} style={passwordToggleStyle}>{showConfirmPassword?"Ocultar":"Ver"}</button>
            </div>
          )}
          {(mode==="register"||mode==="reset") && <div style={{fontSize:"0.72rem",color:"var(--muted)",marginBottom:12}}>Mínimo 10 caracteres con mayúscula, minúscula, número y símbolo.</div>}
          {mode==="login" && (
            <div style={{textAlign:"center",fontSize:"0.76rem",marginBottom:10}}>
              <button type="button" onClick={()=>setView("forgot-password")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontWeight:700}}>
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
          {error && <div style={{color:"#f44336",fontSize:"0.82rem",marginBottom:12}}>{error}</div>}
          {notice && <div style={{color:"var(--g)",fontSize:"0.8rem",marginBottom:12}}>{notice}</div>}
          <button onClick={handleSubmit} disabled={!canSubmit} style={{width:"100%",background:"var(--g)",color:"#000",border:"none",padding:"13px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:canSubmit?"pointer":"not-allowed",opacity:canSubmit?1:0.6,marginBottom:16}}>
            {loading?"...":mode==="login"?"ENTRAR":mode==="register"?"CREAR CUENTA":mode==="forgot"?"ENVIAR EMAIL":"ACTUALIZAR CONTRASEÑA"}
          </button>
          <div style={{textAlign:"center",fontSize:"0.82rem",color:"var(--muted)"}}>
            {mode==="login" ? (
              <span>¿No tienes cuenta? <button onClick={()=>setView("register")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontWeight:700}}>Regístrate</button></span>
            ) : mode==="forgot" ? (
              <span>¿Recordaste tu contraseña? <button onClick={()=>setView("login")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontWeight:700}}>Inicia sesión</button></span>
            ) : mode==="reset" ? (
              <span>¿Volver al inicio de sesión? <button onClick={()=>setView("login")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontWeight:700}}>Entrar</button></span>
            ) : (
              <span>¿Ya tienes cuenta? <button onClick={()=>setView("login")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontWeight:700}}>Inicia sesión</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE VIEW ──────────────────────────────────────────────────────────────
function ProfileView({ setView, user, setUser, setSelectedTipster }) {
  const [name, setName] = useState(user?.name||"");
  const [username, setUsername] = useState(user?.username||"");
  const [bio, setBio] = useState(user?.bio||"");
  const [avatar, setAvatar] = useState(user?.avatar||"");
  const [clabe, setClabe] = useState("");
  const [bankAccountHolder, setBankAccountHolder] = useState(user?.bankAccountHolder||"");
  const [bankName, setBankName] = useState(user?.bankName||"");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saveWarning, setSaveWarning] = useState("");
  const [connectSyncing, setConnectSyncing] = useState(false);
  const [connectRedirecting, setConnectRedirecting] = useState(false);
  const isProProfile = ["pro","tipster","admin"].includes(String(user?.role||"").toLowerCase());
  const canConfigurePayout = isProProfile && Boolean(user?._id || user?.id);

  useEffect(()=>{
    if (editMode) return;
    setName(user?.name||"");
    setUsername(user?.username||"");
    setBio(user?.bio||"");
    setAvatar(user?.avatar||"");
    setClabe("");
    setBankAccountHolder(user?.bankAccountHolder||"");
    setBankName(user?.bankName||"");
  },[editMode, user?._id, user?.name, user?.username, user?.bio, user?.avatar, user?.bankAccountHolder, user?.bankName]);

  function openTipsterSummary() {
    const tipsterName = String(user?.name || name || "").trim();
    if (!tipsterName) return;
    if (typeof setSelectedTipster === "function") setSelectedTipster(tipsterName);
    setView("tipster-profile");
  }

  function payoutStatusMeta(statusValue, payoutReady) {
    if (payoutReady) return { label: "LISTO PARA PAGO", color: "var(--g)", bg: "rgba(29,185,84,0.15)" };
    const normalized = String(statusValue || "").toLowerCase();
    if (normalized === "onboarding_required") return { label: "ONBOARDING REQUERIDO", color: "var(--gold)", bg: "rgba(245,197,66,0.15)" };
    if (normalized === "pending_verification") return { label: "VERIFICACIÓN PENDIENTE", color: "var(--gold)", bg: "rgba(245,197,66,0.15)" };
    if (normalized === "connect_not_enabled") return { label: "CONNECT NO HABILITADO", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" };
    if (normalized === "stripe_setup_pending") return { label: "CONFIGURACIÓN PENDIENTE", color: "var(--gold)", bg: "rgba(245,197,66,0.15)" };
    return { label: "PENDIENTE CONFIGURACIÓN", color: "var(--gold)", bg: "rgba(245,197,66,0.15)" };
  }

  async function syncConnectStatus(showErrors = false) {
    if (!canConfigurePayout) return;
    const token = localStorage.getItem("tpz_token");
    if (!token) return;
    setConnectSyncing(true);
    try {
      const r = await fetch(BACKEND_URL+"/api/stripe/connect/status",{
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok) throw new Error(data?.error || "No se pudo consultar Stripe Connect");
      setUser(prev=>({...(prev||{}),...(data||{})}));
      if (showErrors) setError("");
    } catch(e) {
      if (showErrors) setError(e.message || "Error consultando Stripe Connect");
    }
    setConnectSyncing(false);
  }

  async function handleOpenConnectOnboarding(mode = "onboarding") {
    if (!canConfigurePayout) return;
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setError("Tu sesión expiró, vuelve a iniciar sesión");
      return;
    }
    setConnectRedirecting(true);
    setError("");
    try {
      const base = `${window.location.origin}${window.location.pathname}`;
      const r = await fetch(BACKEND_URL+"/api/stripe/connect/create-onboarding-link",{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body:JSON.stringify({
          mode,
          refreshUrl: `${base}?stripe=connect-refresh`,
          returnUrl: `${base}?stripe=connect-return`
        })
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || !data?.onboardingUrl) throw new Error(data?.error || "No se pudo crear enlace de onboarding");
      window.location.href = data.onboardingUrl;
      return;
    } catch(e) {
      setError(e.message || "Error iniciando onboarding");
    }
    setConnectRedirecting(false);
  }

  useEffect(()=>{
    if (!canConfigurePayout) return;
    syncConnectStatus(false);
  },[user?._id]);

  useEffect(()=>{
    if (!canConfigurePayout) return;
    const params = new URLSearchParams(window.location.search);
    const stripeFlow = params.get("stripe");
    if (!["connect-return","connect-refresh"].includes(String(stripeFlow||"").toLowerCase())) return;
    setSaveWarning(stripeFlow === "connect-return"
      ? "Regresaste de Stripe Connect. Verificando estado de onboarding..."
      : "Stripe solicitó refrescar onboarding. Verificando estado actual...");
    syncConnectStatus(true);
    params.delete("stripe");
    const nextQuery = params.toString();
    const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash || ""}`;
    window.history.replaceState({}, "", nextUrl);
  },[canConfigurePayout, user?._id]);

  async function handleSave() {
    const cleanName = String(name||"").trim();
    const cleanUsername = String(username||"").trim();
    if (!cleanName) {
      setError("El nombre no puede estar vacío");
      return;
    }
    if (!cleanUsername) {
      setError("El username no puede estar vacío");
      return;
    }
    const cleanClabe = normalizeDigits(clabe);
    if (canConfigurePayout && cleanClabe && !isValidClabe(cleanClabe)) {
      setError("CLABE inválida. Verifica los 18 dígitos.");
      return;
    }

    setSaving(true);
    setSaved(false);
    setError("");
    setSaveWarning("");
    try {
      const token = localStorage.getItem("tpz_token");
      if (!token) throw new Error("Tu sesión expiró, vuelve a iniciar sesión");
      const payload = {
        name: cleanName,
        username: cleanUsername,
        bio: String(bio||"").trim(),
        avatar: avatar||""
      };
      if (canConfigurePayout) {
        payload.bankAccountHolder = String(bankAccountHolder||"").trim();
        payload.bankName = String(bankName||"").trim();
        if (cleanClabe) payload.clabe = cleanClabe;
      }
      const r = await fetch(BACKEND_URL+"/api/auth/profile",{
        method:"PUT",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body:JSON.stringify(payload)
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok) throw new Error(data?.error || "No se pudo guardar el perfil");
      setUser(data);
      setName(data?.name||cleanName);
      setUsername(data?.username||cleanUsername);
      setBio(data?.bio||"");
      setAvatar(data?.avatar||"");
      setBankAccountHolder(data?.bankAccountHolder||"");
      setBankName(data?.bankName||"");
      setClabe("");
      setSaveWarning(data?.setupWarning || "");
      setSaved(true);
      setEditMode(false);
      setTimeout(()=>setSaved(false),2000);
    } catch(e) {
      setError(e.message || "Error guardando perfil");
    }
    setSaving(false);
  }

  return (
    <div className="tpz-page" style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:600,margin:"0 auto"}}>
        <div style={{background:"var(--d2)",border:"1px solid var(--border)",borderRadius:16,padding:24,marginBottom:20,position:"relative"}}>
          <button onClick={()=>{setEditMode(!editMode);setError("");}} style={{position:"absolute",top:16,right:16,background:"var(--d4)",border:"1px solid var(--border)",color:"var(--muted)",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem"}}>
            {editMode?"Cancelar":"✏️ Editar"}
          </button>
          <div className="tpz-profile-row" style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
            <div style={{position:"relative",flexShrink:0}}>
              {editMode ? (
                <label style={{cursor:"pointer"}}>
                  <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setAvatar(ev.target.result);r.readAsDataURL(f);}}/>
                  <div style={{width:80,height:80,borderRadius:"50%",background:"var(--d4)",border:"3px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",position:"relative"}}>
                    {avatar?<img src={avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",color:"var(--g)"}}>{(name||username||"U")[0].toUpperCase()}</span>}
                    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem"}}>📷</div>
                  </div>
                </label>
              ) : (
                <button onClick={openTipsterSummary} title="Ver resumen de tipster" style={{width:80,height:80,borderRadius:"50%",background:"var(--d4)",border:"3px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:0,cursor:"pointer"}}>
                  {avatar?<img src={avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",color:"var(--g)"}}>{(user?.name||user?.username||"U")[0].toUpperCase()}</span>}
                </button>
              )}
            </div>
            <div className="tpz-profile-main" style={{flex:1}}>
              {editMode?(
                <>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"1rem",fontWeight:700,outline:"none",marginBottom:6,boxSizing:"border-box"}}/>
                  <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.92rem",fontWeight:700,outline:"none",marginBottom:6,boxSizing:"border-box"}}/>
                  <textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Biografía breve" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"6px 10px",color:"var(--muted)",fontSize:"0.82rem",outline:"none",resize:"none",height:60,boxSizing:"border-box"}}/>
                  {canConfigurePayout && (
                    <div style={{marginTop:10,background:"var(--d3)",border:"1px solid var(--border)",borderRadius:8,padding:"10px"}}>
                      <div style={{fontSize:"0.66rem",color:"var(--g)",letterSpacing:1.2,marginBottom:8}}>PAGOS SEMANALES STRIPE</div>
                      <input value={bankAccountHolder} onChange={e=>setBankAccountHolder(e.target.value)} placeholder="Titular de cuenta" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.82rem",outline:"none",marginBottom:6,boxSizing:"border-box"}}/>
                      <input value={bankName} onChange={e=>setBankName(e.target.value)} placeholder="Banco (opcional)" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.82rem",outline:"none",marginBottom:6,boxSizing:"border-box"}}/>
                      <input value={clabe} onChange={e=>setClabe(e.target.value)} placeholder="Nueva CLABE (18 dígitos)" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.82rem",outline:"none",boxSizing:"border-box"}}/>
                      <div style={{fontSize:"0.66rem",color:"var(--muted)",marginTop:6}}>
                        CLABE actual: {user?.bankClabeMasked || "No configurada"} · deja CLABE vacía si no deseas cambiarla.
                      </div>
                      {!user?.stripePayoutReady && (
                        <button
                          type="button"
                          onClick={()=>handleOpenConnectOnboarding(user?.stripeConnectedAccountId ? "update" : "onboarding")}
                          disabled={connectRedirecting}
                          style={{marginTop:8,width:"100%",background:"none",border:"1px solid var(--g)",color:"var(--g)",padding:"7px 10px",borderRadius:6,cursor:connectRedirecting?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}
                        >
                          {connectRedirecting ? "Abriendo Stripe..." : (user?.stripeConnectedAccountId ? "Completar verificación en Stripe Connect" : "Configurar Stripe Connect")}
                        </button>
                      )}
                    </div>
                  )}
                </>
              ):(
                <>
                  <h2 style={{fontSize:"1.4rem",fontWeight:700,marginBottom:4}}>{user?.name}</h2>
                  <div style={{fontSize:"0.82rem",color:"var(--g)",marginBottom:4}}>@{user?.username||"usuario"}</div>
                  <div style={{fontSize:"0.82rem",color:"var(--muted)",marginBottom:4}}>{user?.email}</div>
                  {user?.bio&&<div style={{fontSize:"0.8rem",color:"var(--text)"}}>{user.bio}</div>}
                  <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:8}}>Toca tu foto para ver tu resumen con stats</div>
                </>
              )}
            </div>
          </div>
          {canConfigurePayout && !editMode && (
            <div style={{marginTop:14,background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:8}}>
                <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:1.2}}>PAGOS SEMANALES</div>
                <span style={{fontSize:"0.65rem",fontWeight:700,padding:"3px 10px",borderRadius:100,background:payoutStatusMeta(user?.stripePayoutStatus,user?.stripePayoutReady).bg,color:payoutStatusMeta(user?.stripePayoutStatus,user?.stripePayoutReady).color}}>
                  {payoutStatusMeta(user?.stripePayoutStatus,user?.stripePayoutReady).label}
                </span>
              </div>
              <div style={{fontSize:"0.74rem",color:"var(--text-dim)"}}>CLABE: {user?.bankClabeMasked || "No configurada"}</div>
              <div style={{fontSize:"0.74rem",color:"var(--text-dim)"}}>Titular: {user?.bankAccountHolder || "No configurado"}</div>
              <div style={{fontSize:"0.74rem",color:"var(--text-dim)"}}>Banco: {user?.bankName || "No configurado"}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
                <button onClick={()=>syncConnectStatus(true)} disabled={connectSyncing} style={{background:"none",border:"1px solid var(--border)",color:"var(--text)",padding:"6px 10px",borderRadius:6,cursor:connectSyncing?"not-allowed":"pointer",fontSize:"0.68rem",fontWeight:700}}>
                  {connectSyncing ? "Consultando..." : "Actualizar estado Connect"}
                </button>
                {!user?.stripePayoutReady && (
                  <button onClick={()=>handleOpenConnectOnboarding(user?.stripeConnectedAccountId ? "update" : "onboarding")} disabled={connectRedirecting} style={{background:"none",border:"1px solid var(--g)",color:"var(--g)",padding:"6px 10px",borderRadius:6,cursor:connectRedirecting?"not-allowed":"pointer",fontSize:"0.68rem",fontWeight:700}}>
                    {connectRedirecting ? "Abriendo Stripe..." : (user?.stripeConnectedAccountId ? "Completar onboarding" : "Configurar Stripe")}
                  </button>
                )}
              </div>
            </div>
          )}
          {error && <div style={{marginTop:12,background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"8px 10px",borderRadius:8,fontSize:"0.8rem"}}>{error}</div>}
          {saveWarning && <div style={{marginTop:12,background:"rgba(245,197,66,0.12)",border:"1px solid rgba(245,197,66,0.45)",color:"var(--gold)",padding:"8px 10px",borderRadius:8,fontSize:"0.8rem"}}>{saveWarning}</div>}
          {editMode&&(
            <button disabled={saving} onClick={handleSave} style={{marginTop:16,width:"100%",background:saving?"var(--d4)":"var(--g)",color:saving?"var(--muted)":"#000",border:"none",padding:"12px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
              {saving?"Guardando...":"GUARDAR CAMBIOS"}
            </button>
          )}
          {saved&&<div style={{marginTop:12,textAlign:"center",color:"var(--g)",fontSize:"0.82rem"}}>✅ Guardado</div>}
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:16,textAlign:"center"}}>
          <div style={{fontSize:"0.65rem",color:"var(--muted)",letterSpacing:1.5,marginBottom:8}}>MEMBRESÍA</div>
          <span style={{background:user?.role==="pro"||user?.role==="tipster"?"rgba(29,185,84,0.15)":user?.role==="admin"?"rgba(245,197,66,0.15)":"rgba(107,128,120,0.15)",color:user?.role==="pro"||user?.role==="tipster"?"var(--g)":user?.role==="admin"?"var(--gold)":"var(--muted)",padding:"4px 16px",borderRadius:100,fontSize:"0.75rem",fontWeight:900,letterSpacing:2}}>
            {user?.role==="pro"?"PRO ⭐":user?.role==="tipster"?"TIPSTER 🎯":user?.role==="admin"?"ADMIN 👑":"BÁSICO"}
          </span>
          {user?.role==="basic"&&(
            <div style={{marginTop:16}}>
              <button onClick={()=>setView("become-pro")} style={{background:"var(--g)",color:"#000",border:"none",padding:"10px 24px",borderRadius:6,fontFamily:"'Barlow Condensed'",fontSize:"0.9rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
                UPGRADE A PRO
              </button>
              <div style={{marginTop:8,fontSize:"0.72rem",color:"var(--muted)"}}>
                La configuración de Stripe Connect para cobros está disponible en perfiles Pro/Tipster.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── BECOME PRO ────────────────────────────────────────────────────────────────
function BecomeProView({ setView, user, setUser }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handledSessionRef = React.useRef(null);

  React.useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    const checkout = params.get("checkout");
    const sessionId = params.get("session_id");
    if (flow !== "pro") return;
    if (checkout === "cancel") {
      setError("Pago cancelado.");
      clearCheckoutQueryParams();
      return;
    }
    if (checkout !== "success" || !sessionId || handledSessionRef.current === sessionId) return;
    if (!user) return;
    confirmProCheckout(sessionId);
  },[user]);

  async function confirmProCheckout(sessionId) {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setError("Inicia sesión para confirmar la membresía Pro.");
      return;
    }
    handledSessionRef.current = sessionId;
    setLoading(true);
    setError("");
    try {
      const r = await fetch(BACKEND_URL+"/api/stripe/pro/confirm-checkout-session",{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body:JSON.stringify({sessionId})
      });
      const data = await r.json();
      if(!r.ok||!data.success){
        const details = [data.status,data.checkoutStatus,data.paymentIntentStatus].filter(Boolean).join(" / ");
        setError(details ? `${data.error||"Pago no completado"} (${details})` : (data.error||"Pago no completado"));
        setLoading(false);
        return;
      }
      const me = await fetch(BACKEND_URL+"/api/auth/me",{headers:{"Authorization":"Bearer "+token}});
      if(me.ok){const u = await me.json();setUser(u);}
      else{setUser(prev=>({...prev,role:"pro",proExpiry:data.proExpiry}));}
      clearCheckoutQueryParams();
      setLoading(false);
      setView("profile");
      return;
    } catch(e) {
      setError("Error: "+e.message);
    }
    setLoading(false);
  }

  async function startProCheckout() {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setView("login");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { successUrl, cancelUrl } = getCheckoutReturnUrls();
      const r = await fetch(BACKEND_URL+"/api/stripe/pro/create-checkout-session",{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body:JSON.stringify({successUrl,cancelUrl})
      });
      const data = await r.json();
      if(!r.ok||!data.checkoutUrl){
        setError(data.error||"No se pudo iniciar checkout");
        setLoading(false);
        return;
      }
      window.location.href = data.checkoutUrl;
      return;
    } catch(e) {
      setError("Error: "+e.message);
    }
    setLoading(false);
  }

  if (!user) return (
    <div className="tpz-centered-page" style={{paddingTop:120,textAlign:"center",padding:"120px 5%"}}>
      <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",marginBottom:16}}>Inicia sesión para activar Pro</h2>
      <button onClick={()=>setView("login")} style={{background:"var(--g)",color:"#000",border:"none",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>INICIAR SESIÓN</button>
    </div>
  );

  return (
    <div className="tpz-centered-page" style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:480,width:"100%",textAlign:"center",animation:"popIn .4s ease"}}>
        <div style={{fontFamily:"'Bebas Neue'",fontSize:"3rem",color:"var(--g)",marginBottom:8}}>Hazte PRO</div>
        <p style={{color:"var(--muted)",marginBottom:32,lineHeight:1.7}}>Accede a picks exclusivos y publica tus propios análisis</p>
        <div style={{background:"var(--d2)",border:"1px solid rgba(29,185,84,0.3)",borderRadius:16,padding:28,marginBottom:24}}>
          <div style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",color:"var(--g)"}}>$29.99<span style={{fontSize:"1rem",color:"var(--muted)"}}>/mes</span></div>
          {["✅ Publica hasta 3 picks/día","✅ Acceso a todos los picks","✅ Panel de estadísticas","✅ Soporte prioritario"].map(b=>(
            <div key={b} style={{fontSize:"0.85rem",color:"var(--text)",padding:"6px 0",borderBottom:"1px solid var(--border)",textAlign:"left"}}>{b}</div>
          ))}
        </div>
        {error&&<div style={{background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"8px 12px",borderRadius:6,marginBottom:12,fontSize:"0.8rem"}}>{error}</div>}
        <button onClick={startProCheckout} disabled={loading} style={{width:"100%",background:"var(--g)",color:"#000",border:"none",padding:"16px",borderRadius:10,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
          {loading?"Procesando...":"PAGAR CON STRIPE - $29.99"}
        </button>
        <button onClick={()=>setView("profile")} style={{background:"none",border:"none",color:"var(--muted)",fontSize:"0.8rem",cursor:"pointer",marginTop:16}}>← Volver</button>
      </div>
    </div>
  );
}

// ── PRO PANEL ─────────────────────────────────────────────────────────────────
function ProPanelView({ user, addPick, setView, picks }) {
  const [screen, setScreen] = useState("dashboard");
  const [betType, setBetType] = useState(null);
  const [league, setLeague] = useState(null);
  const [match, setMatch] = useState(null);
  const [odds, setOdds] = useState("2.50");
  const [bank, setBank] = useState("10");
  const [price, setPrice] = useState("10");
  const [imgSrc, setImgSrc] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [leagueSearch, setLeagueSearch] = useState("");
  const [liveMatches, setLiveMatches] = useState(null);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [oddsSports, setOddsSports] = useState(DEFAULT_ODDS_SPORTS);
  const [loadingSports, setLoadingSports] = useState(false);
  const [sportsError, setSportsError] = useState("");
  const [sportsHydratedFromApi, setSportsHydratedFromApi] = useState(false);
  const [publishedMeta, setPublishedMeta] = useState(null);
  const [matchesContext, setMatchesContext] = useState(null);
  const [parlayStartTime, setParlayStartTime] = useState("");
  const [parlaySports, setParlaySports] = useState([]);
  const [marketType, setMarketType] = useState("moneyline");
  const [selectionSide, setSelectionSide] = useState("home");
  const [lineValue, setLineValue] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [propStatType, setPropStatType] = useState("points");
  const [bookmaker, setBookmaker] = useState("");

  const myPicks = picks.filter((p)=>p.tipster===user?.name);
  const wonPicks = myPicks.filter((p)=>String(p?.result || "").toLowerCase()==="won");
  const lostPicks = myPicks.filter((p)=>String(p?.result || "").toLowerCase()==="lost");
  const pushPicks = myPicks.filter((p)=>String(p?.result || "").toLowerCase()==="void");
  const resolvedPicks = myPicks.filter((p)=>["won","lost","void"].includes(String(p?.result || "").toLowerCase()));
  const pendingResultPicks = myPicks.filter((p)=>!["won","lost","void"].includes(String(p?.result || "").toLowerCase()));
  const winRate = wonPicks.length+lostPicks.length > 0 ? Math.round((wonPicks.length/(wonPicks.length+lostPicks.length))*100) : 0;

  const PICK_COUNTER_VERSION = "20260511_reset_1";
  const todayKey = "tpz_picks_today_"+PICK_COUNTER_VERSION+"_"+new Date().toDateString();
  const todayCount = parseInt(localStorage.getItem(todayKey)||"0");
  const remaining = Math.max(0, 3-todayCount);
  const dailyUsagePercent = Math.max(0, Math.min(100, Math.round((todayCount/3)*100)));
  const averageOdds = resolvedPicks.length>0
    ? resolvedPicks.reduce((sum,p)=>sum + toSafeNumber(p?.odds,0),0) / resolvedPicks.length
    : 0;
  const averageBank = myPicks.length>0
    ? myPicks.reduce((sum,p)=>sum + Math.max(0,toSafeNumber(p?.bank,0)),0) / myPicks.length
    : 0;
  const paidPicks = myPicks.filter((p)=>toSafeNumber(p?.price,0)>0).length;
  const freePicks = Math.max(0, myPicks.length-paidPicks);
  const recentPicks = [...myPicks]
    .sort((a,b)=>{
      const timeA = new Date(a?.createdAt || a?.updatedAt || a?.timeRaw || a?.time || 0).getTime();
      const timeB = new Date(b?.createdAt || b?.updatedAt || b?.timeRaw || b?.time || 0).getTime();
      return timeB - timeA;
    })
    .slice(0,5);
  const trendResolved = [...resolvedPicks]
    .sort((a,b)=>new Date(b?.createdAt || b?.updatedAt || 0).getTime() - new Date(a?.createdAt || a?.updatedAt || 0).getTime())
    .slice(0,8);
  const trendWins = trendResolved.filter((pick)=>String(pick?.result || "").toLowerCase()==="won").length;
  const trendWinRate = trendResolved.length>0 ? Math.round((trendWins/trendResolved.length)*100) : 0;
  const roiDisplay = typeof user?.roi === "string" && String(user?.roi || "").trim()
    ? user.roi
    : formatSignedPercent(toSafeNumber(user?.roiValue,0));
  const currentSportKey = match?.sportKey || league?.key || "";
  const propStatOptions = getPropStatOptionsForSportKey(currentSportKey);
  const propStatRequiresPlayer = doesPropStatRequirePlayer(propStatType, currentSportKey);
  const kpiCards = [
    { icon:"📊", value: roiDisplay, label:"ROI Tipster", meta:`${resolvedPicks.length} picks resueltos` },
    { icon:"🎯", value:`${winRate}%`, label:"Win Rate", meta:`${wonPicks.length}W · ${lostPicks.length}L` },
    { icon:"📈", value:myPicks.length, label:"Picks Totales", meta:`${freePicks} free · ${paidPicks} premium` },
    { icon:"🧮", value:formatOddsValue(averageOdds), label:"Momio Prom.", meta:`Bank prom. ${Math.round(averageBank)}%` },
    { icon:"🏁", value:`${wonPicks.length}-${lostPicks.length}-${pushPicks.length}`, label:"Record W-L-P", meta:`Pendientes ${pendingResultPicks.length}` },
    { icon:"⚡", value:`${remaining}/3`, label:"Cupo Diario", meta:`${todayCount} publicados hoy` },
  ];

  function getResultChipClass(resultValue) {
    const normalized = String(resultValue || "pending").toLowerCase();
    if (normalized === "won") return "won";
    if (normalized === "lost") return "lost";
    if (normalized === "void") return "push";
    return "pending";
  }

  function getResultChipLabel(resultValue) {
    const normalized = String(resultValue || "pending").toLowerCase();
    if (normalized === "won") return "Ganado";
    if (normalized === "lost") return "Perdido";
    if (normalized === "void") return "Push";
    return "Pendiente";
  }

  const mainLeagues = MAIN_LEAGUE_KEYS_ORDER.map((key, idx)=>{
    const existing = oddsSports.find((leagueItem)=>leagueItem.key===key);
    if (existing) return existing;
    const meta = MAIN_LEAGUE_META[key];
    if (!meta) return null;
    return {
      id: `${key}-fallback-${idx}`,
      key,
      title: meta.name,
      name: meta.name,
      sport: inferSportEmojiFromOdds(meta.group, key, meta.name),
      group: meta.group || "otros",
      country: meta.country || "Global",
      flag: meta.flag || "🌍",
      logoUrl: meta.logoUrl || "",
      aliases: meta.aliases || [],
      isMainLeague: true,
      mainOrder: idx,
    };
  }).filter(Boolean);

  useEffect(()=>{
    if (screen !== "straight-league") return;
    if (loadingSports || sportsHydratedFromApi || sportsError) return;
    let mounted = true;
    async function loadSports() {
      setLoadingSports(true);
      setSportsError("");
      try {
        let data = null;
        const endpoints = ["/api/fixtures/sports?all=true", "/api/fixtures/sports"];
        for (const endpoint of endpoints) {
          try {
            const resp = await fetch(BACKEND_URL+endpoint);
            const json = await resp.json();
            if (resp.ok && Array.isArray(json) && json.length > 0) {
              data = json;
              break;
            }
          } catch(e) {}
        }
        const sourceSports = Array.isArray(data) && data.length > 0 ? data : DEFAULT_ODDS_SPORTS_RAW;
        const mapped = mapOddsSportsCatalog(sourceSports);
        if (mapped.length === 0) throw new Error("No se pudo cargar catálogo de ligas");
        if (mounted) {
          setOddsSports(mapped);
          setSportsHydratedFromApi(true);
        }
      } catch (e) {
        if (mounted) setSportsError(e.message || "Error cargando ligas");
      } finally {
        if (mounted) setLoadingSports(false);
      }
    }
    loadSports();
    return ()=>{ mounted = false; };
  },[screen,sportsHydratedFromApi,sportsError]);

  function mapOddsMatchesWithLeague(data, sourceLeagueObj) {
    if (!Array.isArray(data)) return [];
    const leagueName = sourceLeagueObj?.name || sourceLeagueObj?.title || sourceLeagueObj?.key || "Liga Odds";
    const leagueKey = sourceLeagueObj?.key || null;
    return data.map((m, idx)=>({
      id: m?.id || `${leagueKey||"odds"}-${m?.home||"home"}-${m?.away||"away"}-${m?.time||idx}`,
      home: m?.home || "Equipo local",
      away: m?.away || "Equipo visitante",
      homeLogo: m?.homeLogo || "",
      awayLogo: m?.awayLogo || "",
      timeRaw: m?.time || null,
      time: m?.time ? isoToLocal(m.time) : "Hora por confirmar",
      leagueName,
      sportKey: leagueKey,
      sport: sourceLeagueObj?.sport || inferSportEmojiFromOdds(sourceLeagueObj?.group, sourceLeagueObj?.key, leagueName),
      flag: sourceLeagueObj?.flag || "🌍",
      logoUrl: sourceLeagueObj?.logoUrl || "",
    }));
  }

  async function fetchMatchesFromSport(leagueObj) {
    if (!leagueObj?.key) return [];
    try {
      const r = await fetch(BACKEND_URL+"/api/fixtures/odds?sportKey="+encodeURIComponent(leagueObj.key));
      if(!r.ok) return [];
      const data = await r.json();
      if(!Array.isArray(data) || data.length===0) return [];
      const officialMatches = mapOddsMatchesWithLeague(data, leagueObj);
      const upcomingMatches = officialMatches.filter((m)=>!isMatchStarted(m.timeRaw||m.time));
      return upcomingMatches.length>0 ? upcomingMatches : officialMatches;
    } catch(e) {
      return [];
    }
  }

  async function fetchMatches(leagueObj) {
    if(!leagueObj?.key){
      setMatchesContext(null);
      setLiveMatches([]);
      return;
    }
    setLoadingMatches(true);
    setLiveMatches(null);
    setMatchesContext(null);

    const primaryMatches = await fetchMatchesFromSport(leagueObj);
    if (primaryMatches.length > 0) {
      setLiveMatches(primaryMatches);
      setMatchesContext({
        requestedLeagueName: leagueObj?.name || leagueObj?.title || leagueObj?.key,
        requestedLeagueKey: leagueObj?.key,
        resolvedLeagueName: leagueObj?.name || leagueObj?.title || leagueObj?.key,
        resolvedLeagueKey: leagueObj?.key,
        usedFallback: false,
      });
      setLoadingMatches(false);
      return;
    }

    const preferredFallbackKeys = [...MAIN_LEAGUE_KEYS_ORDER];
    const leaguesByKey = new Map(oddsSports.map((s)=>[s.key,s]));
    const fallbackKeys = Array.from(new Set([
      ...preferredFallbackKeys,
      ...oddsSports.map((s)=>s.key)
    ])).filter((k)=>k && k!==leagueObj.key).slice(0, 14);

    for (const key of fallbackKeys) {
      const fallbackLeague = leaguesByKey.get(key) || {
        key,
        name: key,
        title: key,
        group: "otros",
        sport: inferSportEmojiFromOdds("", key, key),
        flag: "🌍",
        logoUrl: "",
      };
      const fallbackMatches = await fetchMatchesFromSport(fallbackLeague);
      if (fallbackMatches.length > 0) {
        setLiveMatches(fallbackMatches);
        setMatchesContext({
          requestedLeagueName: leagueObj?.name || leagueObj?.title || leagueObj?.key,
          requestedLeagueKey: leagueObj?.key,
          resolvedLeagueName: fallbackLeague?.name || fallbackLeague?.title || fallbackLeague?.key,
          resolvedLeagueKey: fallbackLeague?.key,
          usedFallback: true,
        });
        setLoadingMatches(false);
        return;
      }
    }

    setLiveMatches([]);
    setMatchesContext({
      requestedLeagueName: leagueObj?.name || leagueObj?.title || leagueObj?.key,
      requestedLeagueKey: leagueObj?.key,
      resolvedLeagueName: null,
      resolvedLeagueKey: null,
      usedFallback: false,
    });
    setLoadingMatches(false);
  }

  useEffect(()=>{
    if(screen==="straight-match"&&league&&liveMatches===null&&!loadingMatches) fetchMatches(league);
  },[screen,league]);
  useEffect(()=>{
    if (marketType !== "player_prop") return;
    if (propStatOptions.some((item)=>item.value===propStatType)) return;
    const fallbackStat = propStatOptions[0]?.value || "points";
    if (fallbackStat !== propStatType) setPropStatType(fallbackStat);
  }, [marketType, propStatType, propStatOptions]);

  function resetFlowValues() {
    setBetType(null);
    setLeague(null);
    setMatch(null);
    setOdds("2.50");
    setBank("10");
    setPrice("10");
    setImgSrc(null);
    setLiveMatches(null);
    setMatchesContext(null);
    setLeagueSearch("");
    setParlayStartTime("");
    setParlaySports([]);
    setMarketType("moneyline");
    setSelectionSide("home");
    setLineValue("");
    setPlayerName("");
    setPropStatType("points");
    setBookmaker("");
    setSportsError("");
    setPublishedMeta(null);
  }

  function startFlow() {
    resetFlowValues();
    setScreen("bet-type");
  }

  function chooseBetType(type) {
    setBetType(type);
    setOdds("2.50");
    setBank("10");
    setPrice("10");
    setImgSrc(null);
    setLeague(null);
    setMatch(null);
    setLiveMatches(null);
    setMatchesContext(null);
    setLeagueSearch("");
    setParlayStartTime("");
    setParlaySports([]);
    setMarketType("moneyline");
    setSelectionSide("home");
    setLineValue("");
    setPlayerName("");
    setPropStatType("points");
    setBookmaker("");
    if (type === "straight") {
      setScreen("straight-league");
      return;
    }
    setScreen("parlay-config");
  }

  function toggleParlaySportSelection(sportKey) {
    setParlaySports((prev)=>
      prev.includes(sportKey)
        ? prev.filter((key)=>key!==sportKey)
        : [...prev, sportKey]
    );
  }

  function handleMarketTypeChange(nextMarketType) {
    setMarketType(nextMarketType);
    if (nextMarketType === "moneyline" || nextMarketType === "spread") {
      setSelectionSide("home");
    } else {
      setSelectionSide("over");
    }
    if (nextMarketType === "moneyline") {
      setLineValue("");
    }
    if (nextMarketType === "player_prop") {
      const nextOptions = getPropStatOptionsForSportKey(match?.sportKey || league?.key || "");
      if (nextOptions.length > 0 && !nextOptions.some((item)=>item.value===propStatType)) {
        setPropStatType(nextOptions[0].value);
      }
    } else {
      setPlayerName("");
      setPropStatType("points");
    }
  }

  function buildStraightSelectionLabel(currentMarketType, currentSide, currentLine, currentPlayerName, currentPropStatType, currentSportKey) {
    const lineNumber = Number.parseFloat(currentLine);
    const hasLine = Number.isFinite(lineNumber);
    const lineText = hasLine ? `${lineNumber > 0 ? "+" : ""}${lineNumber}` : String(currentLine || "").trim();
    const homeName = match?.home || "Home";
    const awayName = match?.away || "Away";

    if (currentMarketType === "moneyline") {
      return currentSide === "away" ? awayName : homeName;
    }
    if (currentMarketType === "spread") {
      return `${currentSide === "away" ? awayName : homeName} ${lineText}`;
    }
    if (currentMarketType === "total") {
      return `${currentSide === "under" ? "Under" : "Over"} ${lineText}`;
    }
    if (currentMarketType === "player_prop") {
      const statLabel = String(currentPropStatType || "stat").trim() || "stat";
      const statNeedsPlayer = doesPropStatRequirePlayer(statLabel, currentSportKey);
      if (statNeedsPlayer) {
        const cleanPlayer = String(currentPlayerName || "").trim() || "Jugador";
        return `${cleanPlayer} ${currentSide === "under" ? "Under" : "Over"} ${lineText} ${statLabel}`;
      }
      const scopeLabel = currentSide === "away"
        ? (awayName || "Away")
        : currentSide === "home"
          ? (homeName || "Home")
          : "Match";
      return `${scopeLabel} ${currentSide === "under" ? "Under" : "Over"} ${lineText} ${statLabel}`;
    }
    return `${homeName} vs ${awayName}`;
  }

  async function doPublish() {
    if(remaining<=0){alert("Has alcanzado el límite de 3 picks por día");return;}
    if(!betType){alert("Selecciona el tipo de apuesta");return;}

    const parsedOdds = parseFloat(odds);
    const parsedBank = parseInt(bank,10);
    const normalizedLineText = String(lineValue || "").trim();
    const parsedLine = normalizedLineText === "" ? Number.NaN : Number.parseFloat(normalizedLineText);
    const normalizedPlayerName = String(playerName || "").trim();
    const normalizedBookmaker = String(bookmaker || "").trim();
    const normalizedStatType = String(propStatType || "").trim();
    const sportKeyForProp = match?.sportKey || league?.key || "";
    const availablePropStats = getPropStatOptionsForSportKey(sportKeyForProp);
    const statTypeIsValidForSport = availablePropStats.some((item)=>item.value===normalizedStatType);
    const statRequiresPlayerForPublish = doesPropStatRequirePlayer(normalizedStatType, sportKeyForProp);
    const selectedParlaySportOptions = PARLAY_SPORT_OPTIONS.filter((option)=>parlaySports.includes(option.key));
    const parsedParlayDate = parlayStartTime ? new Date(parlayStartTime) : null;
    const hasValidParlayDate = parsedParlayDate && Number.isFinite(parsedParlayDate.getTime());
    if(!Number.isFinite(parsedOdds) || parsedOdds <= 1){alert("Ingresa un momio decimal válido");return;}
    if(!Number.isFinite(parsedBank) || parsedBank <= 0 || parsedBank > 100){alert("Ingresa un porcentaje de bank válido (1-100)");return;}
    if(!imgSrc){alert("Carga la imagen del ticket antes de publicar");return;}
    if(betType==="straight" && (!league || !match)){alert("Selecciona una liga y un partido oficial");return;}
    if(betType==="straight" && !["moneyline","spread","total","player_prop"].includes(marketType)){alert("Selecciona un mercado válido");return;}
    if(betType==="straight" && (marketType==="moneyline" || marketType==="spread") && !["home","away"].includes(selectionSide)){alert("Selecciona lado local o visitante");return;}
    if(betType==="straight" && (marketType==="total" || marketType==="player_prop") && !["over","under"].includes(selectionSide)){alert("Selecciona Over o Under");return;}
    if(betType==="straight" && (marketType==="spread" || marketType==="total" || marketType==="player_prop") && !Number.isFinite(parsedLine)){alert("Ingresa una línea válida");return;}
    if(betType==="straight" && marketType==="player_prop" && !statTypeIsValidForSport){alert("Selecciona un stat válido para este deporte");return;}
    if(betType==="straight" && marketType==="player_prop" && statRequiresPlayerForPublish && !normalizedPlayerName){alert("Ingresa el nombre del jugador para prop");return;}
    if(betType==="parlay" && !hasValidParlayDate){alert("Selecciona el horario de inicio del parlay");return;}
    if(betType==="parlay" && selectedParlaySportOptions.length===0){alert("Selecciona al menos un deporte para el parlay");return;}

    setPublishing(true);
    try {
      const token = localStorage.getItem("tpz_token");
      const parlaySportIcons = selectedParlaySportOptions.map((option)=>option.icon).join(" ");
      const parlaySportLabels = selectedParlaySportOptions.map((option)=>option.label).join(", ");
      const parlayStartIso = hasValidParlayDate ? parsedParlayDate.toISOString() : "";
      const parlayStartDisplay = parlayStartIso ? isoToLocal(parlayStartIso) : "Hora por confirmar";
      const straightSelectionLabel = buildStraightSelectionLabel(marketType, selectionSide, normalizedLineText, normalizedPlayerName, normalizedStatType, sportKeyForProp);
      const basePayload = {
        tipster: user?.name||"Tipster",
        tipsterId: user?._id||user?.id,
        roi: user?.roi||"+0%",
        verified: true,
        odds: parsedOdds,
        bank: parsedBank,
        price: price==="0"||price===0 ? 0 : (parseInt(price,10)||10),
        ticketImg: imgSrc||null,
        betType: betType,
      };
      const betPayload = betType==="parlay" ? {
        betType: "parlay",
        marketType: "parlay",
        selection: parlaySportLabels ? `Parlay (${parlaySportLabels})` : "Parlay",
        side: "combined",
        line: null,
        playerName: null,
        statType: null,
        bookmaker: normalizedBookmaker || null,
        homeTeam: null,
        awayTeam: null,
        eventDate: parlayStartIso || null,
        sportKey: selectedParlaySportOptions.map((option)=>option.key).join(",") || null,
        source: "manual",
        confidence: 65,
      } : {
        betType: "straight",
        marketType,
        selection: straightSelectionLabel,
        side: selectionSide,
        line: Number.isFinite(parsedLine) ? parsedLine : null,
        playerName: marketType==="player_prop" && statRequiresPlayerForPublish ? normalizedPlayerName : null,
        statType: marketType==="player_prop" ? normalizedStatType : null,
        bookmaker: normalizedBookmaker || null,
        homeTeam: match?.home || null,
        awayTeam: match?.away || null,
        eventDate: match?.timeRaw || match?.time || null,
        sportKey: match?.sportKey || league?.key || null,
        source: "manual",
        confidence: 65,
      };
      const flowPayload = betType==="parlay" ? {
        league: "Parlay",
        sportKey: selectedParlaySportOptions.map((option)=>option.key).join(","),
        sport: parlaySportIcons || "🎫",
        flag: parlaySportIcons || "🎫",
        match: parlaySportLabels ? `Parlay (${parlaySportLabels})` : "Parlay (Apuesta múltiple)",
        time: parlayStartIso || "Parlay",
        parlayStartTime: parlayStartIso || null,
        parlaySports: selectedParlaySportOptions.map((option)=>({
          key: option.key,
          icon: option.icon,
          label: option.label,
        })),
      } : {
        league: match?.leagueName||league?.name||"Liga",
        sportKey: match?.sportKey||league?.key||null,
        sport: match?.sport||league?.sport||"",
        flag: match?.flag||league?.flag||"🌍",
        match: match?(match.home+" vs "+match.away):"Partido",
        time: match?.timeRaw||match?.time||"Hoy",
        homeLogo: match?.homeLogo || "",
        awayLogo: match?.awayLogo || "",
      };
      const newPick = {...basePayload,...flowPayload,bet:betPayload};
      const r = await fetch(BACKEND_URL+"/api/picks",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify(newPick)});
      const saved = await r.json();
      if(!r.ok){alert(saved.error||"Error publicando pick");setPublishing(false);return;}
      if(addPick) addPick({...newPick,...saved,id:saved._id});
      localStorage.setItem(todayKey, String(todayCount+1));
      setPublishedMeta({
        title: betType==="parlay" ? "Parlay publicado!" : "Pick Straight publicado!",
        subtitle: betType==="parlay"
          ? `${parlaySportIcons || "🎫"} · ${parlayStartDisplay} · Momio ${parsedOdds.toFixed(2)} · Bank ${parsedBank}%`
          : `${match?.leagueName||league?.name} · ${straightSelectionLabel} · Momio ${parsedOdds.toFixed(2)}`,
      });
      setPublishing(false);
      setScreen("published");
    }catch(e){alert("Error de conexión al publicar");setPublishing(false);}
  }

  function selectLeagueAndContinue(l) {
    setLeague(l);
    setMatch(null);
    setLiveMatches(null);
    setMatchesContext(null);
    setScreen("straight-match");
  }

  const query = leagueSearch.trim().toLowerCase();
  const filteredLeagues = query.length>=2
    ? oddsSports.filter((l)=>{
        const haystack = [l.name,l.title,l.group,l.country,l.key,...(Array.isArray(l.aliases)?l.aliases:[])];
        return haystack.some((f)=>String(f||"").toLowerCase().includes(query));
      }).slice(0,40)
    : [];

  const imageUploader = (
    <div style={{marginBottom:16}}>
      {imgSrc?(
        <div style={{position:"relative",borderRadius:8,overflow:"hidden",border:"2px solid var(--g)"}}>
          <img src={imgSrc} alt="Ticket" style={{width:"100%",display:"block",maxHeight:200,objectFit:"cover"}}/>
          <button onClick={()=>setImgSrc(null)} style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.7)",border:"none",color:"#fff",borderRadius:"50%",width:28,height:28,cursor:"pointer"}}>✕</button>
          <div style={{background:"rgba(29,185,84,0.9)",padding:"5px 10px",textAlign:"center"}}>
            <span style={{fontSize:"0.7rem",color:"#000",fontWeight:700}}>✓ Imagen cargada</span>
          </div>
        </div>
      ):(
        <label style={{display:"block",cursor:"pointer"}}>
          <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setImgSrc(ev.target.result);r.readAsDataURL(f);}}/>
          <div style={{background:"var(--d3)",borderRadius:8,padding:"28px 16px",border:"2px dashed var(--border)",textAlign:"center",transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor="var(--g)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
            <div style={{fontSize:"2rem",marginBottom:8}}>📷</div>
            <div style={{fontSize:"0.82rem",color:"var(--text)",fontWeight:600}}>Sube foto de tu ticket</div>
            <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:4}}>Playdoit, DraftKings, FanDuel...</div>
          </div>
        </label>
      )}
    </div>
  );

  if(screen==="dashboard") return (
    <div className="tpz-page tpz-pro-shell" style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-pro-shell-inner">
        <section className="tpz-pro-hero">
          <div className="tpz-pro-hero-badges">
            <span className="tpz-pro-hero-badge">Panel Pro</span>
            <span className="tpz-pro-hero-badge">{remaining>0 ? `${remaining} picks disponibles hoy` : "Límite diario alcanzado"}</span>
            <span className="tpz-pro-hero-badge">{sportsHydratedFromApi ? "Odds en vivo conectadas" : "Odds base disponibles"}</span>
          </div>
          <h1 className="tpz-pro-hero-title">Bienvenido, <span>{user?.name||"Tipster"}</span></h1>
          <p className="tpz-pro-hero-subtitle">
            Gestiona tu operación premium desde una sola vista: publica más rápido, monitorea desempeño real y detecta en minutos qué mercados te están funcionando mejor.
          </p>
          <div className="tpz-pro-cta-row">
            <button className="tpz-pro-primary-btn" onClick={startFlow} disabled={remaining<=0}>
              {remaining<=0 ? "LÍMITE DIARIO COMPLETADO" : "+ CREAR APUESTA"}
            </button>
            <button className="tpz-pro-secondary-btn" onClick={()=>setView("marketplace")}>Ver marketplace</button>
          </div>
        </section>

        <section className="tpz-pro-kpi-grid">
          {kpiCards.map((item)=>(
            <div key={item.label} className="tpz-pro-kpi-card">
              <div className="tpz-pro-kpi-icon">{item.icon}</div>
              <div className="tpz-pro-kpi-value">{item.value}</div>
              <div className="tpz-pro-kpi-label">{item.label}</div>
              <div className="tpz-pro-kpi-meta">{item.meta}</div>
            </div>
          ))}
        </section>

        <section className="tpz-pro-insights-grid">
          <article className="tpz-pro-panel-card">
            <div className="tpz-pro-card-head">
              <h3>Ritmo diario de publicación</h3>
              <span>{todayCount}/3 usados</span>
            </div>
            <div className="tpz-pro-progress-row">
              <strong style={{fontSize:"0.88rem",color:remaining>0?"var(--text)":"var(--gold)"}}>
                {remaining>0 ? `${remaining} picks restantes hoy` : "Sin cupo disponible por hoy"}
              </strong>
              <span className="tpz-pro-progress-meta">{dailyUsagePercent}%</span>
            </div>
            <div className="tpz-pro-progress-track">
              <span style={{width:`${dailyUsagePercent}%`}} />
            </div>
            <div className="tpz-pro-muted" style={{marginTop:8}}>
              Publicar con consistencia mejora exposición en marketplace y acelera crecimiento en rankings.
            </div>
          </article>

          <article className="tpz-pro-panel-card">
            <div className="tpz-pro-card-head">
              <h3>Registro verificado</h3>
              <span>W/L/P</span>
            </div>
            <div className="tpz-pro-record-grid">
              <div className="tpz-pro-record-pill won">WON {wonPicks.length}</div>
              <div className="tpz-pro-record-pill lost">LOST {lostPicks.length}</div>
              <div className="tpz-pro-record-pill push">PUSH {pushPicks.length}</div>
              <div className="tpz-pro-record-pill pending">PEND {pendingResultPicks.length}</div>
            </div>
            <div className="tpz-pro-muted">
              Últimos {trendResolved.length} resueltos: <span style={{color:trendWinRate>=50?"var(--g)":"var(--gold)",fontWeight:700}}>{trendWinRate}% de acierto</span> · momio promedio {formatOddsValue(averageOdds)}.
            </div>
          </article>
        </section>

        <section className="tpz-pro-panel-card">
          <div className="tpz-pro-card-head">
            <h3>Actividad reciente</h3>
            <span>{recentPicks.length>0 ? `${recentPicks.length} picks` : "Sin actividad"}</span>
          </div>
          {recentPicks.length===0 ? (
            <div className="tpz-pro-empty-state">
              Publica tu primer pick premium para activar histórico visual y métricas de rendimiento.
            </div>
          ) : (
            <div className="tpz-pro-recent-list">
              {recentPicks.map((pick, idx)=>(
                <div key={pick?._id || pick?.id || `${pick?.match || "pick"}-${idx}`} className="tpz-pro-recent-item">
                  <div>
                    <div className="tpz-pro-recent-title">{pick?.match || pick?.bet?.selection || "Pick publicado"}</div>
                    <div className="tpz-pro-recent-meta">
                      {pick?.league || "Liga"} · {String(pick?.betType||"").toLowerCase()==="parlay" ? "Parlay" : "Straight"} · Momio {formatOddsValue(pick?.odds)} · Bank {Math.max(0, Math.round(toSafeNumber(pick?.bank,0)))}% · {getPickShareTime(pick)}
                    </div>
                  </div>
                  <span className={`tpz-pro-result-chip ${getResultChipClass(pick?.result)}`}>
                    {getResultChipLabel(pick?.result)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );

  if(screen==="bet-type") return (
    <div className="tpz-page tpz-pro-shell" style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-pro-shell-inner" style={{maxWidth:700}}>
        <button onClick={()=>setScreen("dashboard")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Volver</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Nueva apuesta</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:20}}>Selecciona tipo de pick</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
          <button onClick={()=>chooseBetType("straight")} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:"20px",cursor:"pointer",textAlign:"left",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--g)";e.currentTarget.style.background="rgba(29,185,84,0.06)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--d3)";}}>
            <div style={{fontSize:"1.8rem",marginBottom:8}}>🎯</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",color:"var(--g)",marginBottom:4}}>PICK STRAIGHT</div>
            <div style={{fontSize:"0.8rem",color:"var(--muted)",lineHeight:1.6}}>Ligas desde Odds API, selección de partido oficial, momio, bank y ticket.</div>
          </button>
          <button onClick={()=>chooseBetType("parlay")} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:"20px",cursor:"pointer",textAlign:"left",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--g)";e.currentTarget.style.background="rgba(29,185,84,0.06)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--d3)";}}>
            <div style={{fontSize:"1.8rem",marginBottom:8}}>🎫</div>
            <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",color:"var(--g)",marginBottom:4}}>PARLAY</div>
            <div style={{fontSize:"0.8rem",color:"var(--muted)",lineHeight:1.6}}>Flujo directo: momio decimal, porcentaje de bank y carga del ticket.</div>
          </button>
        </div>
      </div>
    </div>
  );

  if(screen==="straight-league") return (
    <div className="tpz-page tpz-pro-shell" style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-pro-shell-inner" style={{maxWidth:700}}>
        <button onClick={()=>setScreen("bet-type")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Tipo de apuesta</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Straight · Paso 1 de 3</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:16}}>Selecciona la liga</h2>
        <div style={{background:"var(--d3)",borderRadius:12,padding:"12px 16px",border:"2px solid var(--g)",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:"1.2rem"}}>🔍</span>
          <input type="text" value={leagueSearch} onChange={e=>setLeagueSearch(e.target.value)} placeholder="Buscar cualquier liga del mundo..." style={{flex:1,background:"none",border:"none",outline:"none",color:"var(--text)",fontSize:"1rem"}}/>
        </div>

        {loadingSports && (
          <div style={{textAlign:"center",color:"var(--muted)",padding:"4px 0 14px"}}>Actualizando catálogo global de ligas...</div>
        )}
        {sportsError && (
          <div style={{background:"rgba(245,197,66,0.08)",border:"1px solid rgba(245,197,66,0.3)",borderRadius:10,padding:"12px 14px",color:"var(--gold)",marginBottom:12}}>
            <div style={{fontSize:"0.8rem",marginBottom:10}}>No se pudo refrescar Odds ahora. Mostrando ligas principales disponibles.</div>
            <button onClick={()=>{setSportsError("");setSportsHydratedFromApi(false);}} style={{background:"none",border:"1px solid var(--gold)",color:"var(--gold)",borderRadius:6,padding:"6px 12px",fontSize:"0.75rem",fontWeight:700,cursor:"pointer"}}>
              Reintentar conexión Odds
            </button>
          </div>
        )}
        {query.length>=2 ? (
          filteredLeagues.length>0 ? (
            <div style={{background:"var(--d3)",borderRadius:12,overflow:"hidden",border:"1px solid var(--border)"}}>
              {filteredLeagues.map((l)=>(
                <button key={l.key} onClick={()=>selectLeagueAndContinue(l)} style={{width:"100%",background:"none",border:"none",borderBottom:"1px solid var(--border)",padding:"12px 16px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(29,185,84,0.06)"}
                  onMouseLeave={e=>e.currentTarget.style.background="none"}>
                  <div style={{color:"var(--text)",fontWeight:600,display:"flex",alignItems:"center",gap:8}}>
                    <LeagueLogo league={l} size={20} inline />
                    <span>{l.name}</span>
                  </div>
                  <div style={{fontSize:"0.68rem",color:"var(--muted)"}}>{l.sport} · {l.country}</div>
                </button>
              ))}
            </div>
          ) : (
            <div style={{textAlign:"center",color:"var(--muted)",padding:20}}>Sin resultados para "{leagueSearch}"</div>
          )
        ) : mainLeagues.length===0 ? (
          <div style={{textAlign:"center",color:"var(--muted)",padding:24,background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10}}>
            <div style={{fontSize:"1.8rem",marginBottom:10}}>📭</div>
            <div style={{marginBottom:12}}>No hay ligas disponibles en este momento</div>
            <button onClick={()=>{setSportsError("");setSportsHydratedFromApi(false);}} style={{background:"none",border:"1px solid var(--g)",color:"var(--g)",borderRadius:6,padding:"6px 12px",fontSize:"0.75rem",fontWeight:700,cursor:"pointer"}}>
              Reintentar cargar consola Odds
            </button>
          </div>
        ) : (
          <div>
            <div style={{fontSize:"0.76rem",color:"var(--g)",fontWeight:700,letterSpacing:1.5,marginBottom:10,textTransform:"uppercase"}}>
              Ligas principales
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:10}}>
              {mainLeagues.map((l)=>(
                <button key={l.key} onClick={()=>selectLeagueAndContinue(l)} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 10px",cursor:"pointer",textAlign:"center",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--g)";e.currentTarget.style.background="rgba(29,185,84,0.06)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--d3)";}}>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:6}}>
                    <LeagueLogo league={l} size={26} />
                  </div>
                  <div style={{fontSize:"0.75rem",color:"var(--text)",fontWeight:600}}>{l.name}</div>
                </button>
              ))}
            </div>
            <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:12,textAlign:"center"}}>
              Escribe en el buscador para ver el resto de ligas disponibles.
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if(screen==="straight-match") return (
    <div className="tpz-page tpz-pro-shell" style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-pro-shell-inner" style={{maxWidth:600}}>
        <button onClick={()=>{setMatch(null);setScreen("straight-league");}} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Cambiar liga</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Straight · Paso 2 de 3</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:8}}>Selecciona el partido</h2>
        <div style={{marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{background:"var(--d4)",borderRadius:6,padding:"4px 12px",fontSize:"0.78rem",color:"var(--text)",fontWeight:600,display:"inline-flex",alignItems:"center",gap:8}}>
            <LeagueLogo league={league} size={16} inline />
            <span>{league?.name}</span>
          </span>
          <button onClick={()=>fetchMatches(league)} disabled={loadingMatches} style={{background:"none",border:"1px solid var(--g)",color:"var(--g)",borderRadius:6,padding:"4px 12px",fontSize:"0.72rem",cursor:"pointer",fontWeight:700}}>
            {loadingMatches?"Cargando...":"🔄 Actualizar"}
          </button>
        </div>
        {matchesContext?.usedFallback && (
          <div style={{background:"rgba(245,197,66,0.08)",border:"1px solid rgba(245,197,66,0.3)",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:"0.78rem",color:"var(--gold)"}}>
            No hay partidos en {matchesContext.requestedLeagueName} ahora mismo. Mostrando partidos reales disponibles de {matchesContext.resolvedLeagueName}.
          </div>
        )}
        {loadingMatches ? (
          <div style={{textAlign:"center",padding:40,color:"var(--muted)"}}>Cargando partidos oficiales...</div>
        ) : liveMatches && liveMatches.length>0 ? (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {liveMatches.map((m,i)=>(
              <button key={m.id||i} onClick={()=>{setMatch(m);setScreen("straight-config");}} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"16px",cursor:"pointer",textAlign:"left",transition:"all .2s",display:"flex",justifyContent:"space-between",alignItems:"center"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--g)";e.currentTarget.style.background="rgba(29,185,84,0.06)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--d3)";}}>
                <div>
                  <div style={{fontWeight:700,fontSize:"1rem",color:"var(--text)",marginBottom:4,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    <TeamShield logoUrl={m.homeLogo} teamName={m.home} size={22} />
                    <span>{m.home}</span>
                    <span style={{color:"var(--muted)",fontSize:"0.9rem"}}>vs</span>
                    <TeamShield logoUrl={m.awayLogo} teamName={m.away} size={22} />
                    <span>{m.away}</span>
                  </div>
                  <div style={{fontSize:"0.72rem",color:"var(--g)",fontWeight:600}}>{m.leagueName} · {m.time}</div>
                </div>
                <span style={{color:"var(--muted)",fontSize:"1.2rem"}}>›</span>
              </button>
            ))}
          </div>
        ) : liveMatches !== null ? (
          <div style={{textAlign:"center",color:"var(--muted)",padding:40}}>
            <div style={{fontSize:"2rem",marginBottom:12}}>📭</div>
            <div>No hay partidos disponibles para esta liga</div>
          </div>
        ) : null}
      </div>
    </div>
  );

  if(screen==="straight-config") return (
    <div className="tpz-page tpz-pro-shell" style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-pro-shell-inner" style={{maxWidth:500}}>
        <button onClick={()=>setScreen("straight-match")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Cambiar partido</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Straight · Paso 3 de 3</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:24}}>Configura tu pick</h2>
        <div style={{background:"var(--d3)",border:"1px solid var(--g)",borderRadius:12,padding:16,marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:"1rem",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <TeamShield logoUrl={match?.homeLogo} teamName={match?.home} size={22} />
            <span>{match?.home}</span>
            <span style={{color:"var(--muted)",fontSize:"0.9rem"}}>vs</span>
            <TeamShield logoUrl={match?.awayLogo} teamName={match?.away} size={22} />
            <span>{match?.away}</span>
          </div>
          <div style={{fontSize:"0.72rem",color:"var(--g)",marginTop:4}}>{match?.leagueName||league?.name} · {match?.time}</div>
        </div>
        <div className="tpz-two-col-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[["Momio decimal",odds,setOdds,"decimal"],["Bank %",bank,setBank,"numeric"]].map(([label,val,setter,mode])=>(
            <div key={label} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px"}}>
              <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:6}}>{label}</div>
              <input type="text" inputMode={mode} value={val} onChange={e=>setter(e.target.value)} style={{background:"none",border:"none",outline:"none",color:"var(--g)",fontSize:"1.4rem",fontWeight:700,width:"100%"}}/>
            </div>
          ))}
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",marginBottom:16}}>
          <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:10}}>MERCADO / SELECCIÓN</div>
          <div className="tpz-two-col-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:6}}>Mercado</div>
              <select value={marketType} onChange={(e)=>handleMarketTypeChange(e.target.value)} style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:8,padding:"9px 10px",fontWeight:700}}>
                <option value="moneyline">Moneyline</option>
                <option value="spread">Spread</option>
                <option value="total">Total</option>
                <option value="player_prop">Prop</option>
              </select>
            </div>
            <div>
              <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:6}}>{marketType==="moneyline"||marketType==="spread"?"Lado":"Dirección"}</div>
              <select value={selectionSide} onChange={(e)=>setSelectionSide(e.target.value)} style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:8,padding:"9px 10px",fontWeight:700}}>
                {(marketType==="moneyline"||marketType==="spread") ? (
                  <>
                    <option value="home">{match?.home || "Local"}</option>
                    <option value="away">{match?.away || "Visitante"}</option>
                  </>
                ) : (
                  <>
                    <option value="over">Over</option>
                    <option value="under">Under</option>
                  </>
                )}
              </select>
            </div>
            {(marketType==="spread"||marketType==="total"||marketType==="player_prop") && (
              <div>
                <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:6}}>Línea</div>
                <input type="text" inputMode="decimal" value={lineValue} onChange={(e)=>setLineValue(e.target.value)} placeholder="Ej. 22.5" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",outline:"none",color:"var(--g)",borderRadius:8,padding:"9px 10px",fontWeight:700}}/>
              </div>
            )}
            {marketType==="player_prop" && (
              <>
                <div>
                  <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:6}}>Stat</div>
                  <select value={propStatType} onChange={(e)=>setPropStatType(e.target.value)} style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:8,padding:"9px 10px",fontWeight:700}}>
                    {propStatOptions.map((option)=>(
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                {propStatRequiresPlayer && (
                  <div>
                    <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:6}}>Jugador</div>
                    <input type="text" value={playerName} onChange={(e)=>setPlayerName(e.target.value)} placeholder="Nombre del jugador" style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",outline:"none",color:"var(--text)",borderRadius:8,padding:"9px 10px",fontWeight:600}}/>
                  </div>
                )}
              </>
            )}
            <div style={{gridColumn:"1 / -1"}}>
              <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:6}}>Bookmaker (opcional)</div>
              <input type="text" value={bookmaker} onChange={(e)=>setBookmaker(e.target.value)} placeholder="Playdoit, DK, FanDuel..." style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",outline:"none",color:"var(--text)",borderRadius:8,padding:"9px 10px",fontWeight:600}}/>
            </div>
          </div>
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",marginBottom:16}}>
          <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:10}}>PRECIO DEL PICK</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["FREE","0"],["$5","5"],["$10","10"],["$20","20"],["$50","50"],["$100","100"]].map(([label,val])=>(
              <button key={val} onClick={()=>setPrice(val)} style={{background:price===val?"var(--g)":"var(--d4)",color:price===val?"#000":"var(--text)",border:"1px solid",borderColor:price===val?"var(--g)":"var(--border)",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontWeight:700,fontSize:"0.85rem",transition:"all .2s"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {imageUploader}
        <div style={{background:"rgba(29,185,84,0.05)",border:"1px solid rgba(29,185,84,0.15)",borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:"0.78rem",color:"var(--muted)"}}>
          🤖 <span style={{color:"var(--g)",fontWeight:700}}>IA verificará tu ticket</span> — Claude analizará el resultado automáticamente al terminar el partido
        </div>
        <button onClick={doPublish} disabled={publishing} style={{width:"100%",background:publishing?"var(--d4)":"var(--g)",color:publishing?"var(--muted)":"#000",border:"none",padding:"16px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
          {publishing?"Publicando...":"✅ PUBLICAR PICK STRAIGHT"}
        </button>
      </div>
    </div>
  );

  if(screen==="parlay-config") return (
    <div className="tpz-page tpz-pro-shell" style={{paddingTop:80,padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-pro-shell-inner" style={{maxWidth:500}}>
        <button onClick={()=>setScreen("bet-type")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Tipo de apuesta</button>
        <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Parlay</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"2.5rem",marginBottom:24}}>Configura tu parlay</h2>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",marginBottom:16}}>
          <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:8}}>HORARIO DE INICIO</div>
          <input
            type="datetime-local"
            value={parlayStartTime}
            onChange={(e)=>setParlayStartTime(e.target.value)}
            style={{width:"100%",background:"var(--d4)",border:"1px solid var(--border)",outline:"none",color:"var(--text)",fontSize:"0.95rem",fontWeight:600,padding:"10px 12px",borderRadius:8}}
          />
          <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:8}}>
            {parlayStartTime ? (()=>{const parsedDate = new Date(parlayStartTime);return Number.isFinite(parsedDate.getTime()) ? `Inicio seleccionado: ${isoToLocal(parsedDate.toISOString())}` : "Selecciona cuándo inicia este parlay";})() : "Selecciona cuándo inicia este parlay"}
          </div>
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",marginBottom:16}}>
          <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:10}}>DEPORTES EN PARLAY</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {PARLAY_SPORT_OPTIONS.map((sportOption)=>{
              const isSelected = parlaySports.includes(sportOption.key);
              return (
                <button
                  key={sportOption.key}
                  onClick={()=>toggleParlaySportSelection(sportOption.key)}
                  style={{
                    background:isSelected?"var(--g)":"var(--d4)",
                    color:isSelected?"#000":"var(--text)",
                    border:"1px solid",
                    borderColor:isSelected?"var(--g)":"var(--border)",
                    borderRadius:8,
                    padding:"8px 12px",
                    cursor:"pointer",
                    fontWeight:700,
                    fontSize:"0.82rem",
                    display:"inline-flex",
                    alignItems:"center",
                    gap:6,
                    transition:"all .2s"
                  }}
                >
                  <span style={{fontSize:"1rem",lineHeight:1}}>{sportOption.icon}</span>
                  <span>{sportOption.label}</span>
                </button>
              );
            })}
          </div>
          <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:8}}>
            {parlaySports.length>0
              ? `Seleccionados: ${PARLAY_SPORT_OPTIONS.filter((sportOption)=>parlaySports.includes(sportOption.key)).map((sportOption)=>sportOption.icon).join(" ")}`
              : "Selecciona uno o más deportes"}
          </div>
        </div>
        <div className="tpz-two-col-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {[["Momio decimal",odds,setOdds,"decimal"],["Bank %",bank,setBank,"numeric"]].map(([label,val,setter,mode])=>(
            <div key={label} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px"}}>
              <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:6}}>{label}</div>
              <input type="text" inputMode={mode} value={val} onChange={e=>setter(e.target.value)} style={{background:"none",border:"none",outline:"none",color:"var(--g)",fontSize:"1.4rem",fontWeight:700,width:"100%"}}/>
            </div>
          ))}
        </div>
        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",marginBottom:16}}>
          <div style={{fontSize:"0.68rem",color:"var(--muted)",letterSpacing:1,marginBottom:10}}>PRECIO DEL PICK</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["FREE","0"],["$5","5"],["$10","10"],["$20","20"],["$50","50"],["$100","100"]].map(([label,val])=>(
              <button key={val} onClick={()=>setPrice(val)} style={{background:price===val?"var(--g)":"var(--d4)",color:price===val?"#000":"var(--text)",border:"1px solid",borderColor:price===val?"var(--g)":"var(--border)",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontWeight:700,fontSize:"0.85rem",transition:"all .2s"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {imageUploader}
        <button onClick={doPublish} disabled={publishing} style={{width:"100%",background:publishing?"var(--d4)":"var(--g)",color:publishing?"var(--muted)":"#000",border:"none",padding:"16px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1.1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
          {publishing?"Publicando...":"✅ PUBLICAR PARLAY"}
        </button>
      </div>
    </div>
  );

  if(screen==="published") return (
    <div className="tpz-centered-page tpz-pro-shell" style={{paddingTop:80,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(80px,12vw,100px) 5% 60px",textAlign:"center"}}>
      <div style={{maxWidth:500,margin:"0 auto",animation:"popIn .5s ease"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"rgba(29,185,84,0.15)",border:"2px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:"2rem"}}>✅</div>
        <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"3rem",color:"var(--g)",marginBottom:8}}>{publishedMeta?.title||"Pick Publicado!"}</h2>
        <p style={{color:"var(--muted)",marginBottom:32}}>{publishedMeta?.subtitle||""}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setView("marketplace")} style={{background:"var(--g)",color:"#000",border:"none",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:900,letterSpacing:2,cursor:"pointer"}}>VER EN MARKETPLACE</button>
          <button onClick={()=>{resetFlowValues();setScreen("dashboard");}} style={{background:"var(--d3)",color:"var(--text)",border:"1px solid var(--border)",padding:"13px 28px",borderRadius:8,fontFamily:"'Barlow Condensed'",fontSize:"1rem",fontWeight:700,letterSpacing:2,cursor:"pointer"}}>SUBIR OTRO</button>
        </div>
      </div>
    </div>
  );

  return null;
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ setView, user, picks }) {
  const [tab, setTab] = useState("results");
  const [adminUsers, setAdminUsers] = useState([]);
  const [pendingPicks, setPendingPicks] = useState([]);
  const [allPicks, setAllPicks] = useState([]);
  const [resetting, setResetting] = useState(false);
  const [payoutWeekOffset, setPayoutWeekOffset] = useState(0);
  const [payoutSummary, setPayoutSummary] = useState({ week: {}, totals: {}, payouts: [] });
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutError, setPayoutError] = useState("");
  const [approvingPayoutId, setApprovingPayoutId] = useState("");
  const [selectedPickIds, setSelectedPickIds] = useState([]);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sport: "all",
    minConfidence: "",
    sort: "newest"
  });
  const [monitorSnapshot, setMonitorSnapshot] = useState({
    thresholds: {},
    totals: {},
    statusCounts: [],
    stalePicks: []
  });
  const [alertsFeed, setAlertsFeed] = useState([]);
  const [monitorLoading, setMonitorLoading] = useState(false);
  const [monitorError, setMonitorError] = useState("");
  const [reanalyzingStale, setReanalyzingStale] = useState(false);

  const loadData = () => {
    const token = localStorage.getItem("tpz_token");
    const h = {"Authorization":"Bearer "+token};
    fetch(BACKEND_URL+"/api/admin/users",{headers:h}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setAdminUsers(d);}).catch(()=>{});
    fetch(BACKEND_URL+"/api/admin/picks-pending",{headers:h}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setPendingPicks(d);}).catch(()=>{});
    fetch(BACKEND_URL+"/api/admin/picks-all",{headers:h}).then(r=>r.json()).then(d=>{if(Array.isArray(d))setAllPicks(d);}).catch(()=>{});
  };

  useEffect(()=>{loadData();},[]);
  async function runAnalyzePendingPicks() {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }
    try {
      const r = await fetch(BACKEND_URL+"/api/admin/analyze-picks",{
        method:"POST",
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || data?.success===false) throw new Error(data?.error || "Error al analizar picks");
      const analyzedCount = Number(data?.analyzed ?? data?.analyzedCount ?? data?.total ?? 0);
      const autoClosedCount = Number(data?.autoClosed ?? 0);
      const failedCount = Number(data?.failed ?? 0);
      alert(`Análisis IA completado · Analizados: ${analyzedCount} · Auto-cerrados: ${autoClosedCount} · Fallidos: ${failedCount}`);
      loadData();
    } catch (e) {
      alert(e.message || "Error al analizar picks");
    }
  }

  async function approveResult(pickId, result) {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }
    const r = await fetch(BACKEND_URL+"/api/picks/"+pickId+"/result",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({result})});
    const data = await r.json().catch(()=>null);
    if(r.ok && data?.success!==false){
      const appliedResult = data?.pick?.result || data?.result || result;
      alert("Resultado actualizado: "+getHumanResultLabel(appliedResult));
      setPendingPicks(prev=>prev.filter(p=>p._id!==pickId));
      loadData();
    }
    else alert(data?.error || "Error al guardar resultado");
  }

  async function reanalyze(pickId) {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      alert("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }
    const r = await fetch(BACKEND_URL+"/api/picks/"+pickId+"/analyze",{method:"POST",headers:{"Authorization":"Bearer "+token}});
    const data = await r.json().catch(()=>null);
    if(r.ok){
      const verdict = data.verification?.preliminaryResult || data.verification?.preliminaryVerdict || data.analysis?.resultado || "SIN RESULTADO";
      const confidenceValue = data.verification?.confidence ?? data.verification?.preliminaryConfidence ?? data.analysis?.confianza;
      const confidenceLabel = Number.isFinite(Number(confidenceValue)) ? ` (${confidenceValue}%)` : "";
      alert("Dictamen: "+verdict+confidenceLabel);
      loadData();
    }
    else alert("Error: "+(data?.error || "No se pudo analizar pick"));
  }

  async function resetStats() {
    if(!window.confirm("¿Resetear todas las estadísticas?"))return;
    setResetting(true);
    const token = localStorage.getItem("tpz_token");
    await fetch(BACKEND_URL+"/api/admin/reset-stats",{method:"POST",headers:{"Authorization":"Bearer "+token}});
    setResetting(false); alert("Stats reseteados"); loadData();
  }
  async function removeUserFromPlatform(targetUser) {
    const targetUserId = String(targetUser?._id || "");
    if (!targetUserId) return;
    if (String(user?._id || "") === targetUserId) {
      alert("No puedes eliminar tu propio usuario admin.");
      return;
    }
    if (!window.confirm(`¿Eliminar definitivamente a ${targetUser?.name || "este usuario"}?\n\nEsta acción borra su cuenta y datos relacionados.`)) return;
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+`/api/admin/users/${targetUserId}`,{
        method:"DELETE",
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || !data?.success) throw new Error(data?.error || "No se pudo eliminar usuario");
      alert(`${targetUser?.name || "Usuario"} eliminado correctamente.`);
      loadData();
    } catch (e) {
      alert(e.message || "Error al eliminar usuario");
    }
  }

  async function loadWeeklyPayouts(targetWeekOffset = payoutWeekOffset, showLoader = false) {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setPayoutError("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }
    if (showLoader) setPayoutLoading(true);
    try {
      const r = await fetch(BACKEND_URL+`/api/admin/revenue/weekly-payouts?weekOffset=${targetWeekOffset}`,{
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok) throw new Error(data?.error || "No se pudo cargar el corte semanal");
      setPayoutSummary({
        week: data?.week || {},
        totals: data?.totals || {},
        payouts: Array.isArray(data?.payouts) ? data.payouts : []
      });
      setPayoutError("");
    } catch (e) {
      setPayoutError(e.message || "Error cargando payout semanal");
    }
    if (showLoader) setPayoutLoading(false);
  }

  useEffect(()=>{
    if (tab !== "payouts") return;
    loadWeeklyPayouts(payoutWeekOffset, true);
  },[tab,payoutWeekOffset]);

  async function approveWeeklyPayout(payoutRow) {
    if (!payoutRow?._id) return;
    if (!window.confirm(`¿Aprobar y enviar pago para ${payoutRow.tipsterName || "tipster"} por ${formatMoney(payoutRow.payoutAmount)}?`)) return;
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setPayoutError("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }
    setApprovingPayoutId(payoutRow._id);
    setPayoutError("");
    try {
      const r = await fetch(BACKEND_URL+`/api/admin/revenue/weekly-payouts/${payoutRow._id}/approve`,{
        method:"POST",
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || !data?.success) throw new Error(data?.error || "No se pudo aprobar el pago");
      await loadWeeklyPayouts(payoutWeekOffset, false);
    } catch (e) {
      setPayoutError(e.message || "Error aprobando pago");
    }
    setApprovingPayoutId("");
  }

  function getPayoutStatusChip(statusValue) {
    const status = String(statusValue || "pending").toLowerCase();
    if (status === "paid") return { label: "PAGADO", style: { background:"rgba(29,185,84,0.15)", color:"var(--g)", border:"1px solid rgba(29,185,84,0.35)" } };
    if (status === "processing") return { label: "PROCESANDO", style: { background:"rgba(100,100,255,0.15)", color:"#8b8bff", border:"1px solid rgba(100,100,255,0.45)" } };
    if (status === "failed") return { label: "FALLIDO", style: { background:"rgba(244,67,54,0.15)", color:"#f44336", border:"1px solid rgba(244,67,54,0.45)" } };
    return { label: "PENDIENTE", style: { background:"rgba(245,197,66,0.15)", color:"var(--gold)", border:"1px solid rgba(245,197,66,0.45)" } };
  }

  function getVerificationStatusLabel(statusValue) {
    const status = String(statusValue || "pending").toLowerCase();
    if (status === "closed_by_admin") return "CERRADO ADMIN";
    if (status === "closed_auto") return "CERRADO AUTO";
    if (status === "reopened") return "REABIERTO";
    if (status === "preliminary_ready") return "DICTAMEN LISTO";
    if (status === "needs_review") return "REQUIERE REVISIÓN";
    if (status === "pending_data") return "PENDIENTE DATOS";
    if (status === "error") return "ERROR IA";
    return "PENDIENTE";
  }

  function getVerificationStatusStyle(statusValue) {
    const status = String(statusValue || "pending").toLowerCase();
    if (status === "closed_by_admin") return {background:"rgba(29,185,84,0.15)",color:"var(--g)",border:"1px solid rgba(29,185,84,0.35)"};
    if (status === "closed_auto") return {background:"rgba(0,188,212,0.16)",color:"#00bcd4",border:"1px solid rgba(0,188,212,0.4)"};
    if (status === "reopened") return {background:"rgba(100,100,255,0.15)",color:"#8b8bff",border:"1px solid rgba(100,100,255,0.45)"};
    if (status === "preliminary_ready") return {background:"rgba(245,197,66,0.16)",color:"var(--gold)",border:"1px solid rgba(245,197,66,0.4)"};
    if (status === "needs_review") return {background:"rgba(255,152,0,0.15)",color:"#ff9800",border:"1px solid rgba(255,152,0,0.45)"};
    if (status === "error") return {background:"rgba(244,67,54,0.14)",color:"#f44336",border:"1px solid rgba(244,67,54,0.45)"};
    return {background:"rgba(107,128,120,0.15)",color:"var(--muted)",border:"1px solid rgba(107,128,120,0.35)"};
  }

  function getEvidenceText(item) {
    if (!item) return "";
    if (typeof item === "string") return item;
    const source = item.provider ? `[${item.provider}] ` : "";
    const type = item.type || item.metric || item.stat || item.market || "dato";
    const value = item.value!==undefined && item.value!==null && item.value!=="" ? `: ${item.value}` : "";
    const note = item.note || item.reason || item.label || item.description || "";
    return `${source}${type}${value}${note ? ` · ${note}` : ""}`;
  }

  function getHumanResultLabel(resultValue) {
    const result = String(resultValue || "pending").toLowerCase();
    if (result === "won") return "GANADO";
    if (result === "lost") return "PERDIDO";
    if (result === "void") return "PUSH";
    return "PENDIENTE";
  }

  function getPreliminaryVerdictLabel(verdictValue) {
    const verdict = String(verdictValue || "").toLowerCase();
    if (verdict === "won") return "GANADO";
    if (verdict === "lost") return "PERDIDO";
    if (verdict === "void") return "PUSH";
    if (verdict === "pending") return "PENDIENTE";
    if (verdict === "inconclusive") return "INCONCLUSO";
    if (verdict === "error") return "ERROR";
    return verdictValue ? String(verdictValue).toUpperCase() : "SIN VEREDICTO";
  }

  function getPickConfidence(pick) {
    const value = pick?.verification?.confidence ?? pick?.verification?.preliminaryConfidence ?? pick?.aiAnalysis?.confianza;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  function getPickAiArgument(pick) {
    return pick?.verification?.summary || pick?.verification?.closureReason || pick?.aiAnalysis?.detalle || "";
  }

  function getPickStatusForFilter(pick) {
    const verificationStatus = String(pick?.verification?.status || "").toLowerCase();
    if (verificationStatus) return verificationStatus;
    const resultStatus = String(pick?.result || "").toLowerCase();
    if (resultStatus && resultStatus !== "pending") return `result_${resultStatus}`;
    return "pending";
  }

  function getStatusFilterLabel(statusValue) {
    const status = String(statusValue || "").toLowerCase();
    if (!status) return "N/D";
    if (status.startsWith("result_")) {
      return `RESULTADO ${getHumanResultLabel(status.replace("result_", "") || "pending")}`;
    }
    return getVerificationStatusLabel(status);
  }

  const sportOptions = Array.from(new Set(
    allPicks
      .map((p)=>String(p?.sport || p?.league || "").trim())
      .filter(Boolean)
  )).sort((a,b)=>a.localeCompare(b, "es", { sensitivity: "base" }));
  const statusOptions = Array.from(new Set(
    allPicks
      .map((p)=>getPickStatusForFilter(p))
      .filter(Boolean)
  )).sort((a,b)=>a.localeCompare(b, "es", { sensitivity: "base" }));

  function filterAndSortPicks(list) {
    const searchText = String(filters.search || "").trim().toLowerCase();
    const statusFilter = String(filters.status || "all").toLowerCase();
    const sportFilter = String(filters.sport || "all").toLowerCase();
    const minConfidence = Number(filters.minConfidence);

    const filtered = (Array.isArray(list) ? list : []).filter((pick)=>{
      const pickStatus = getPickStatusForFilter(pick);
      const pickSport = String(pick?.sport || pick?.league || "").toLowerCase();
      const pickConfidence = getPickConfidence(pick);
      const haystack = `${pick?.match || ""} ${pick?.league || ""} ${pick?.sport || ""} ${pick?.tipster || ""} ${pick?.bet?.marketType || ""} ${pick?.bet?.selection || ""}`.toLowerCase();
      if (searchText && !haystack.includes(searchText)) return false;
      if (statusFilter !== "all" && pickStatus !== statusFilter) return false;
      if (sportFilter !== "all" && pickSport !== sportFilter) return false;
      if (Number.isFinite(minConfidence) && minConfidence > 0 && pickConfidence < minConfidence) return false;
      return true;
    });

    const sorted = [...filtered];
    sorted.sort((a, b)=>{
      const dateA = new Date(a?.createdAt || 0).getTime();
      const dateB = new Date(b?.createdAt || 0).getTime();
      const confidenceA = getPickConfidence(a);
      const confidenceB = getPickConfidence(b);
      const statusA = getPickStatusForFilter(a);
      const statusB = getPickStatusForFilter(b);
      if (filters.sort === "oldest") return dateA - dateB;
      if (filters.sort === "confidence_desc") return confidenceB - confidenceA;
      if (filters.sort === "confidence_asc") return confidenceA - confidenceB;
      if (filters.sort === "status") return statusA.localeCompare(statusB, "es");
      return dateB - dateA;
    });
    return sorted;
  }

  const historyItems = allPicks.filter((p)=>p.result!=="pending" || String(p.verification?.status||"").toLowerCase()==="reopened");
  const filteredPendingPicks = filterAndSortPicks(pendingPicks);
  const filteredHistoryPicks = filterAndSortPicks(historyItems);
  const selectedSet = new Set(selectedPickIds);

  function togglePickSelection(pickId) {
    const normalized = String(pickId || "");
    if (!normalized) return;
    setSelectedPickIds((prev)=>prev.includes(normalized) ? prev.filter((id)=>id!==normalized) : [...prev, normalized]);
  }

  function selectAllFromList(list) {
    const ids = (Array.isArray(list) ? list : []).map((item)=>String(item?._id || "")).filter(Boolean);
    if (!ids.length) return;
    setSelectedPickIds((prev)=>{
      const merged = new Set([...(Array.isArray(prev) ? prev : []), ...ids]);
      return Array.from(merged);
    });
  }

  function clearSelection() {
    setSelectedPickIds([]);
  }

  async function runBulkResult(result) {
    if (bulkBusy || selectedPickIds.length===0) return;
    if (!window.confirm(`Aplicar ${String(result).toUpperCase()} a ${selectedPickIds.length} picks seleccionados?`)) return;
    setBulkBusy(true);
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+"/api/admin/picks/bulk-result",{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body:JSON.stringify({ pickIds: selectedPickIds, result })
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || !data?.success) throw new Error(data?.error || "No se pudo aplicar acción masiva");
      alert(`Actualizados: ${Number(data?.summary?.updated||0)} · Fallidos: ${Number(data?.summary?.failed||0)}`);
      clearSelection();
      loadData();
      if (tab === "monitor") refreshVerificationMonitor(false);
    } catch (e) {
      alert(e.message || "Error en acción masiva");
    }
    setBulkBusy(false);
  }

  async function runBulkResetPending() {
    if (bulkBusy || selectedPickIds.length===0) return;
    if (!window.confirm(`Restablecer a PENDIENTE ${selectedPickIds.length} picks seleccionados?`)) return;
    setBulkBusy(true);
    try {
      const token = localStorage.getItem("tpz_token");
      const responses = await Promise.all(
        selectedPickIds.map((pickId)=>
          fetch(BACKEND_URL+"/api/picks/"+pickId+"/result",{
            method:"PUT",
            headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
            body:JSON.stringify({result:"pending"})
          }).then((res)=>res.ok).catch(()=>false)
        )
      );
      const updated = responses.filter(Boolean).length;
      const failed = responses.length - updated;
      alert(`Restablecidos: ${updated} · Fallidos: ${failed}`);
      clearSelection();
      loadData();
      if (tab === "monitor") refreshVerificationMonitor(false);
    } catch (e) {
      alert(e.message || "Error al restablecer selección");
    }
    setBulkBusy(false);
  }

  async function runBulkAnalyze() {
    if (bulkBusy || selectedPickIds.length===0) return;
    setBulkBusy(true);
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+"/api/admin/picks/bulk-analyze",{
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},
        body:JSON.stringify({ pickIds: selectedPickIds })
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || !data?.success) throw new Error(data?.error || "No se pudo re-analizar selección");
      alert(`Re-analizados: ${Number(data?.summary?.analyzed||0)} · Auto-cerrados: ${Number(data?.summary?.autoClosed||0)}`);
      clearSelection();
      loadData();
      if (tab === "monitor") refreshVerificationMonitor(false);
    } catch (e) {
      alert(e.message || "Error en re-análisis masivo");
    }
    setBulkBusy(false);
  }

  async function refreshVerificationMonitor(showLoader = true) {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setMonitorError("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }
    if (showLoader) setMonitorLoading(true);
    try {
      const monitorResponse = await fetch(BACKEND_URL+"/api/admin/picks-monitor",{
        headers:{"Authorization":"Bearer "+token}
      });
      const monitorData = await monitorResponse.json().catch(()=>null);
      if(!monitorResponse.ok) throw new Error(monitorData?.error || "No se pudo cargar monitor");
      setMonitorSnapshot({
        thresholds: monitorData?.thresholds || {},
        totals: monitorData?.totals || {},
        statusCounts: Array.isArray(monitorData?.statusCounts) ? monitorData.statusCounts : [],
        stalePicks: Array.isArray(monitorData?.stalePicks) ? monitorData.stalePicks : []
      });

      const alertsResponse = await fetch(BACKEND_URL+"/api/admin/verification-alerts",{
        headers:{"Authorization":"Bearer "+token}
      });
      const alertsData = await alertsResponse.json().catch(()=>null);
      if(alertsResponse.ok) {
        setAlertsFeed(Array.isArray(alertsData?.alerts) ? alertsData.alerts : []);
      }
      setMonitorError("");
    } catch (e) {
      setMonitorError(e.message || "Error cargando monitor operativo");
    }
    if (showLoader) setMonitorLoading(false);
  }

  useEffect(()=>{
    if (tab !== "monitor") return;
    refreshVerificationMonitor(true);
  },[tab]);

  useEffect(()=>{
    setSelectedPickIds([]);
  },[tab]);

  async function reanalyzeStalePicks() {
    if (reanalyzingStale) return;
    setReanalyzingStale(true);
    try {
      const token = localStorage.getItem("tpz_token");
      const r = await fetch(BACKEND_URL+"/api/admin/picks/reanalyze-stale",{
        method:"POST",
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || !data?.success) throw new Error(data?.error || "No se pudo reanalizar picks atascados");
      alert(`Stale re-analizados: ${Number(data?.summary?.analyzed||0)} · Auto-cerrados: ${Number(data?.summary?.autoClosed||0)}`);
      loadData();
      refreshVerificationMonitor(false);
    } catch (e) {
      alert(e.message || "Error al reanalizar picks atascados");
    }
    setReanalyzingStale(false);
  }

  const totalRevenue = allPicks.filter(p=>p.result!=="pending").reduce((s,p)=>s+(p.buyers?.length||0)*parseFloat(p.price||0),0);
  const tabStyle = t=>({background:tab===t?"var(--g)":"transparent",color:tab===t?"#000":"var(--muted)",border:"none",padding:"8px 18px",borderRadius:6,cursor:"pointer",fontSize:"0.78rem",fontWeight:700,letterSpacing:1,textTransform:"uppercase"});

  return (
    <div className="tpz-page" style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        <div style={{marginBottom:28,display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:"0.68rem",color:"var(--g)",letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:8}}>Panel Administrador</div>
            <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2rem,5vw,3rem)"}}>Bienvenido, <span style={{color:"var(--g)"}}>Admin</span></h1>
          </div>
          <button onClick={()=>setView("revenue-dashboard")} style={{background:"rgba(29,185,84,0.1)",border:"1px solid rgba(29,185,84,0.3)",color:"var(--g)",padding:"10px 20px",borderRadius:8,cursor:"pointer",fontSize:"0.9rem",fontWeight:700}}>Revenue Dashboard</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:24}}>
          {[["Usuarios",String(adminUsers.length||0)],["Picks totales",String(allPicks.length||0)],["Revenue","$"+totalRevenue.toFixed(0)],["Por aprobar",String(pendingPicks.length||0)]].map(([l,v])=>(
            <div key={l} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 12px",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",color:"var(--g)",lineHeight:1}}>{v}</div>
              <div style={{fontSize:"0.62rem",color:"var(--muted)",letterSpacing:1,marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
          {["results","history","monitor","payouts","users"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={tabStyle(t)}>
              {t==="results"?"Resultados":t==="history"?"Historial":t==="monitor"?"Monitor":t==="payouts"?"Pagos":"Usuarios"}
            </button>
          ))}
        </div>

        {tab==="results"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:16}}>
              <div style={{fontSize:"0.82rem",color:"var(--muted)"}}>{filteredPendingPicks.length} de {pendingPicks.length} picks pendientes</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={runAnalyzePendingPicks} style={{background:"rgba(29,185,84,0.15)",border:"1px solid var(--g)",color:"var(--g)",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>Analizar</button>
                <button onClick={resetStats} disabled={resetting} style={{background:"rgba(244,67,54,0.15)",border:"1px solid #f44336",color:"#f44336",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>{resetting?"...":"Reset Stats"}</button>
              </div>
            </div>
            <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:12,marginBottom:12}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
                <input value={filters.search} onChange={(e)=>setFilters((prev)=>({...prev,search:e.target.value}))} placeholder="Buscar match / tipster / mercado" style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}} />
                <select value={filters.status} onChange={(e)=>setFilters((prev)=>({...prev,status:e.target.value}))} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}}>
                  <option value="all">Todos los estatus</option>
                  {statusOptions.map((statusValue)=>(
                    <option key={statusValue} value={statusValue}>{getStatusFilterLabel(statusValue)}</option>
                  ))}
                </select>
                <select value={filters.sport} onChange={(e)=>setFilters((prev)=>({...prev,sport:e.target.value}))} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}}>
                  <option value="all">Todos los deportes</option>
                  {sportOptions.map((sportValue)=>(
                    <option key={sportValue} value={sportValue}>{sportValue}</option>
                  ))}
                </select>
                <input type="number" min="0" max="100" step="1" value={filters.minConfidence} onChange={(e)=>setFilters((prev)=>({...prev,minConfidence:e.target.value}))} placeholder="Confianza mínima %" style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}} />
                <select value={filters.sort} onChange={(e)=>setFilters((prev)=>({...prev,sort:e.target.value}))} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}}>
                  <option value="newest">Más nuevos</option>
                  <option value="oldest">Más antiguos</option>
                  <option value="confidence_desc">Confianza IA ↓</option>
                  <option value="confidence_asc">Confianza IA ↑</option>
                  <option value="status">Estatus</option>
                </select>
                <button onClick={()=>setFilters({search:"",status:"all",sport:"all",minConfidence:"",sort:"newest"})} style={{background:"none",border:"1px solid var(--g)",color:"var(--g)",padding:"8px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>Limpiar filtros</button>
              </div>
            </div>
            <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:12,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
              <div style={{fontSize:"0.74rem",color:"var(--muted)"}}>Seleccionados: {selectedPickIds.length}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={()=>selectAllFromList(filteredPendingPicks)} disabled={filteredPendingPicks.length===0} style={{background:"var(--d4)",border:"1px solid var(--border)",color:filteredPendingPicks.length===0?"var(--muted)":"var(--text)",padding:"6px 10px",borderRadius:6,cursor:filteredPendingPicks.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Seleccionar visibles</button>
                <button onClick={clearSelection} disabled={selectedPickIds.length===0} style={{background:"var(--d4)",border:"1px solid var(--border)",color:selectedPickIds.length===0?"var(--muted)":"var(--text)",padding:"6px 10px",borderRadius:6,cursor:selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Limpiar selección</button>
                <button onClick={()=>runBulkResult("won")} disabled={bulkBusy || selectedPickIds.length===0} style={{background:"rgba(29,185,84,0.15)",border:"1px solid var(--g)",color:"var(--g)",padding:"6px 10px",borderRadius:6,cursor:bulkBusy || selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Masivo GANADO</button>
                <button onClick={()=>runBulkResult("lost")} disabled={bulkBusy || selectedPickIds.length===0} style={{background:"rgba(244,67,54,0.15)",border:"1px solid #f44336",color:"#f44336",padding:"6px 10px",borderRadius:6,cursor:bulkBusy || selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Masivo PERDIDO</button>
                <button onClick={()=>runBulkResult("void")} disabled={bulkBusy || selectedPickIds.length===0} style={{background:"rgba(245,197,66,0.15)",border:"1px solid var(--gold)",color:"var(--gold)",padding:"6px 10px",borderRadius:6,cursor:bulkBusy || selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Masivo PUSH</button>
                <button onClick={runBulkAnalyze} disabled={bulkBusy || selectedPickIds.length===0} style={{background:"rgba(100,100,255,0.15)",border:"1px solid #6464ff",color:"#8b8bff",padding:"6px 10px",borderRadius:6,cursor:bulkBusy || selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Re-analizar selección</button>
              </div>
            </div>
            {filteredPendingPicks.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:40}}>No hay picks pendientes con los filtros actuales</div>}
            {filteredPendingPicks.map((p,i)=>{
              const verification = p.verification || {};
              const statusLabel = getVerificationStatusLabel(verification.status);
              const statusStyle = getVerificationStatusStyle(verification.status);
              const preliminaryVerdict = verification.preliminaryResult || verification.preliminaryVerdict || p.aiAnalysis?.resultado || "";
              const preliminaryConfidenceValue = verification.confidence ?? verification.preliminaryConfidence ?? p.aiAnalysis?.confianza;
              const preliminaryConfidence = Number(preliminaryConfidenceValue);
              const preliminaryConfidenceText = Number.isFinite(preliminaryConfidence) ? ` (${preliminaryConfidence}%)` : "";
              const evidenceItems = Array.isArray(verification.evidence) && verification.evidence.length>0
                ? verification.evidence
                : (Array.isArray(p.aiAnalysis?.evidence) ? p.aiAnalysis.evidence : []);
              const aiArgument = getPickAiArgument(p);
              const betSummary = [p.bet?.marketType, p.bet?.selection].filter(Boolean).join(" · ");
              const reopenedBy = verification.reopenedBy ? ` por ${verification.reopenedBy}` : "";
              const reopenedAt = verification.reopenedAt ? ` · ${new Date(verification.reopenedAt).toLocaleString("es-MX")}` : "";
              return (
                <div key={p._id||i} style={{background:"linear-gradient(180deg, var(--d3) 0%, rgba(17,24,21,0.98) 100%)",border:"1px solid var(--border)",borderRadius:12,padding:14,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap",marginBottom:10}}>
                    <div style={{display:"flex",gap:10,alignItems:"flex-start",flex:1,minWidth:220}}>
                      <label style={{display:"flex",alignItems:"center",gap:6,fontSize:"0.68rem",color:"var(--muted)",marginTop:2}}>
                        <input type="checkbox" checked={selectedSet.has(String(p._id || ""))} onChange={()=>togglePickSelection(p._id)} />
                        Sel
                      </label>
                      {p.ticketImg ? (
                        <img src={p.ticketImg} alt="ticket" style={{width:92,height:64,objectFit:"cover",borderRadius:7,cursor:"pointer",border:"1px solid var(--border)"}} onClick={()=>{const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer";d.onclick=()=>document.body.removeChild(d);const img=document.createElement("img");img.src=p.ticketImg;img.style.cssText="max-width:90vw;max-height:90vh;object-fit:contain";d.appendChild(img);document.body.appendChild(d);}}/>
                      ) : (
                        <div style={{width:92,height:64,borderRadius:7,border:"1px dashed var(--border)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",fontSize:"0.9rem"}}>📄</div>
                      )}
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:800,fontSize:"0.9rem",lineHeight:1.35,marginBottom:4}}>{p.match}</div>
                        <div style={{fontSize:"0.72rem",color:"var(--muted)",lineHeight:1.5}}>{p.league} · {p.tipster} · Momio {p.odds}</div>
                        {betSummary && <div style={{fontSize:"0.68rem",color:"var(--text-dim)",marginTop:4,overflowWrap:"anywhere"}}>Mercado: {betSummary}</div>}
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-start"}}>
                      <span style={{...statusStyle,padding:"3px 10px",borderRadius:100,fontSize:"0.66rem",fontWeight:700}}>{statusLabel}</span>
                      {preliminaryVerdict && (
                        <span style={{background:"rgba(245,197,66,0.16)",color:"var(--gold)",border:"1px solid rgba(245,197,66,0.35)",padding:"3px 10px",borderRadius:100,fontSize:"0.66rem",fontWeight:700}}>
                          PRELIMINAR: {getPreliminaryVerdictLabel(preliminaryVerdict)}{preliminaryConfidenceText}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:8,marginBottom:10}}>
                    {Number.isFinite(preliminaryConfidence) && (
                      <div style={{background:"rgba(245,197,66,0.08)",border:"1px solid rgba(245,197,66,0.28)",borderRadius:7,padding:"6px 8px",fontSize:"0.68rem",color:"var(--gold)"}}>
                        Confianza IA: {preliminaryConfidence}%
                      </div>
                    )}
                    {p.result!=="pending" && (
                      <div style={{background:p.result==="won"?"rgba(29,185,84,0.12)":p.result==="lost"?"rgba(244,67,54,0.12)":"rgba(245,197,66,0.12)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:7,padding:"6px 8px",fontSize:"0.68rem",color:p.result==="won"?"var(--g)":p.result==="lost"?"#f44336":"var(--gold)"}}>
                        OFICIAL: {getHumanResultLabel(p.result)}
                      </div>
                    )}
                    {String(verification.status||"").toLowerCase()==="reopened" && (
                      <div style={{gridColumn:"1 / -1",fontSize:"0.68rem",color:"#8b8bff",background:"rgba(100,100,255,0.08)",border:"1px solid rgba(100,100,255,0.28)",borderRadius:7,padding:"6px 8px"}}>
                        Inconformidad / reapertura{reopenedBy}{reopenedAt}
                      </div>
                    )}
                  </div>
                  {aiArgument && (
                    <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid var(--border)",borderLeft:"3px solid var(--g)",borderRadius:8,padding:"8px 10px",marginBottom:10}}>
                      <div style={{fontSize:"0.64rem",color:"var(--g)",fontWeight:700,letterSpacing:1,marginBottom:4}}>ARGUMENTO IA</div>
                      <div style={{fontSize:"0.72rem",color:"var(--text-dim)",lineHeight:1.55}}>{aiArgument}</div>
                    </div>
                  )}
                  <div style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:8,padding:"8px 10px"}}>
                    <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:4}}>Evidencia ({evidenceItems.length})</div>
                    {evidenceItems.length>0 ? (
                      <>
                        {evidenceItems.slice(0,3).map((item,idx)=>(
                          <div key={idx} style={{fontSize:"0.68rem",color:"var(--text-dim)",lineHeight:1.55}}>• {getEvidenceText(item)}</div>
                        ))}
                        {evidenceItems.length>3 && <div style={{fontSize:"0.68rem",color:"var(--muted)"}}>+{evidenceItems.length-3} evidencias más</div>}
                      </>
                    ) : (
                      <div style={{fontSize:"0.68rem",color:"var(--muted)"}}>Sin evidencia disponible</div>
                    )}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginTop:10}}>
                    <button onClick={()=>approveResult(p._id,"won")} style={{background:"rgba(29,185,84,0.15)",border:"1px solid var(--g)",color:"var(--g)",padding:"8px 10px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.75rem",width:"100%"}}>GANADO</button>
                    <button onClick={()=>approveResult(p._id,"lost")} style={{background:"rgba(244,67,54,0.15)",border:"1px solid #f44336",color:"#f44336",padding:"8px 10px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.75rem",width:"100%"}}>PERDIDO</button>
                    <button onClick={()=>approveResult(p._id,"void")} style={{background:"rgba(245,197,66,0.15)",border:"1px solid var(--gold)",color:"var(--gold)",padding:"8px 10px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.75rem",width:"100%"}}>PUSH</button>
                    <button onClick={()=>reanalyze(p._id)} style={{background:"rgba(100,100,255,0.15)",border:"1px solid #6464ff",color:"#8b8bff",padding:"8px 10px",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.75rem",width:"100%"}}>RE-ANALIZAR</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="history"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,marginBottom:16}}>
              <div style={{fontSize:"0.82rem",color:"var(--muted)"}}>{filteredHistoryPicks.length} de {historyItems.length} picks en historial</div>
              <button onClick={loadData} style={{background:"var(--d4)",border:"1px solid var(--border)",color:"var(--text)",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.74rem",fontWeight:700}}>↻ Refrescar</button>
            </div>
            <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:12,marginBottom:12}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
                <input value={filters.search} onChange={(e)=>setFilters((prev)=>({...prev,search:e.target.value}))} placeholder="Buscar match / tipster / mercado" style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}} />
                <select value={filters.status} onChange={(e)=>setFilters((prev)=>({...prev,status:e.target.value}))} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}}>
                  <option value="all">Todos los estatus</option>
                  {statusOptions.map((statusValue)=>(
                    <option key={statusValue} value={statusValue}>{getStatusFilterLabel(statusValue)}</option>
                  ))}
                </select>
                <select value={filters.sport} onChange={(e)=>setFilters((prev)=>({...prev,sport:e.target.value}))} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}}>
                  <option value="all">Todos los deportes</option>
                  {sportOptions.map((sportValue)=>(
                    <option key={sportValue} value={sportValue}>{sportValue}</option>
                  ))}
                </select>
                <input type="number" min="0" max="100" step="1" value={filters.minConfidence} onChange={(e)=>setFilters((prev)=>({...prev,minConfidence:e.target.value}))} placeholder="Confianza mínima %" style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}} />
                <select value={filters.sort} onChange={(e)=>setFilters((prev)=>({...prev,sort:e.target.value}))} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"8px 10px",color:"var(--text)",fontSize:"0.78rem",outline:"none"}}>
                  <option value="newest">Más nuevos</option>
                  <option value="oldest">Más antiguos</option>
                  <option value="confidence_desc">Confianza IA ↓</option>
                  <option value="confidence_asc">Confianza IA ↑</option>
                  <option value="status">Estatus</option>
                </select>
                <button onClick={()=>setFilters({search:"",status:"all",sport:"all",minConfidence:"",sort:"newest"})} style={{background:"none",border:"1px solid var(--g)",color:"var(--g)",padding:"8px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>Limpiar filtros</button>
              </div>
            </div>
            <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:12,marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
              <div style={{fontSize:"0.74rem",color:"var(--muted)"}}>Seleccionados: {selectedPickIds.length}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={()=>selectAllFromList(filteredHistoryPicks)} disabled={filteredHistoryPicks.length===0} style={{background:"var(--d4)",border:"1px solid var(--border)",color:filteredHistoryPicks.length===0?"var(--muted)":"var(--text)",padding:"6px 10px",borderRadius:6,cursor:filteredHistoryPicks.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Seleccionar visibles</button>
                <button onClick={clearSelection} disabled={selectedPickIds.length===0} style={{background:"var(--d4)",border:"1px solid var(--border)",color:selectedPickIds.length===0?"var(--muted)":"var(--text)",padding:"6px 10px",borderRadius:6,cursor:selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Limpiar selección</button>
                <button onClick={runBulkResetPending} disabled={bulkBusy || selectedPickIds.length===0} style={{background:"rgba(100,100,255,0.15)",border:"1px solid #6464ff",color:"#8b8bff",padding:"6px 10px",borderRadius:6,cursor:bulkBusy || selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Restablecer selección</button>
                <button onClick={runBulkAnalyze} disabled={bulkBusy || selectedPickIds.length===0} style={{background:"rgba(245,197,66,0.15)",border:"1px solid var(--gold)",color:"var(--gold)",padding:"6px 10px",borderRadius:6,cursor:bulkBusy || selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.72rem",fontWeight:700}}>Re-analizar selección</button>
              </div>
            </div>
            {filteredHistoryPicks.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:40}}>No hay picks en historial con los filtros actuales</div>}
            {filteredHistoryPicks.map((p,i)=>{
              const verification = p.verification || {};
              const statusLabel = getVerificationStatusLabel(verification.status);
              const statusStyle = getVerificationStatusStyle(verification.status);
              const resultLabel = getHumanResultLabel(p.result);
              const resultStyle = p.result==="won"
                ? {background:"rgba(29,185,84,0.15)",color:"var(--g)"}
                : p.result==="lost"
                  ? {background:"rgba(244,67,54,0.15)",color:"#f44336"}
                  : p.result==="void"
                    ? {background:"rgba(245,197,66,0.15)",color:"var(--gold)"}
                    : {background:"rgba(107,128,120,0.15)",color:"var(--muted)"};
              const preliminaryVerdict = verification.preliminaryResult || verification.preliminaryVerdict || p.aiAnalysis?.resultado || "";
              const preliminaryConfidenceValue = verification.confidence ?? verification.preliminaryConfidence ?? p.aiAnalysis?.confianza;
              const preliminaryConfidence = Number(preliminaryConfidenceValue);
              const preliminaryConfidenceText = Number.isFinite(preliminaryConfidence) ? ` (${preliminaryConfidence}%)` : "";
              const betSummary = [p.bet?.marketType, p.bet?.selection].filter(Boolean).join(" · ");
              const evidenceItems = Array.isArray(verification.evidence) && verification.evidence.length>0
                ? verification.evidence
                : (Array.isArray(p.aiAnalysis?.evidence) ? p.aiAnalysis.evidence : []);
              const aiArgument = getPickAiArgument(p);
              const reopenedBy = verification.reopenedBy ? ` por ${verification.reopenedBy}` : "";
              const reopenedAt = verification.reopenedAt ? ` · ${new Date(verification.reopenedAt).toLocaleString("es-MX")}` : "";
              return (
                <div key={p._id||i} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                      <label style={{display:"flex",alignItems:"center",gap:6,fontSize:"0.68rem",color:"var(--muted)"}}>
                        <input type="checkbox" checked={selectedSet.has(String(p._id || ""))} onChange={()=>togglePickSelection(p._id)} />
                        Sel
                      </label>
                      <div>
                        <div style={{fontWeight:700,fontSize:"0.9rem"}}>{p.match}</div>
                        <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:2}}>{p.league} · {p.tipster} · Momio {p.odds}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
                      <span style={{...resultStyle,padding:"4px 12px",borderRadius:6,fontSize:"0.75rem",fontWeight:700}}>{resultLabel}</span>
                      <span style={{...statusStyle,padding:"4px 10px",borderRadius:6,fontSize:"0.72rem",fontWeight:700}}>{statusLabel}</span>
                    </div>
                  </div>
                  {preliminaryVerdict && (
                    <div style={{fontSize:"0.7rem",color:"var(--gold)",marginBottom:4}}>
                      Preliminar IA: {getPreliminaryVerdictLabel(preliminaryVerdict)}{preliminaryConfidenceText}
                    </div>
                  )}
                  {betSummary && <div style={{fontSize:"0.68rem",color:"var(--text-dim)",marginBottom:4}}>Mercado: {betSummary}</div>}
                  {Number.isFinite(preliminaryConfidence) && (
                    <div style={{fontSize:"0.68rem",color:"var(--gold)",marginBottom:4}}>Confianza IA: {preliminaryConfidence}%</div>
                  )}
                  {aiArgument && <div style={{fontSize:"0.68rem",color:"var(--text-dim)",marginBottom:4}}>Argumento IA: {aiArgument}</div>}
                  {String(verification.status||"").toLowerCase()==="reopened" && (
                    <div style={{fontSize:"0.68rem",color:"#8b8bff",marginBottom:6}}>Inconformidad / reapertura{reopenedBy}{reopenedAt}</div>
                  )}
                  <div style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:6,padding:"6px 8px",marginTop:6}}>
                    <div style={{fontSize:"0.66rem",color:"var(--muted)",marginBottom:4}}>Evidencia ({evidenceItems.length})</div>
                    {evidenceItems.length>0 ? (
                      <>
                        {evidenceItems.slice(0,3).map((item,idx)=>(
                          <div key={idx} style={{fontSize:"0.68rem",color:"var(--text-dim)",lineHeight:1.5}}>• {getEvidenceText(item)}</div>
                        ))}
                        {evidenceItems.length>3 && <div style={{fontSize:"0.68rem",color:"var(--muted)"}}>+{evidenceItems.length-3} evidencias más</div>}
                      </>
                    ) : (
                      <div style={{fontSize:"0.68rem",color:"var(--muted)"}}>Sin evidencia disponible</div>
                    )}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginTop:6}}>
                    <button onClick={async()=>{if(!window.confirm("¿Restablecer a pendiente?"))return;const token=localStorage.getItem("tpz_token");const r=await fetch(BACKEND_URL+"/api/picks/"+p._id+"/result",{method:"PUT",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({result:"pending"})});if(r.ok){alert("Restablecido");loadData();if(tab==="monitor")refreshVerificationMonitor(false);}else{alert("No se pudo restablecer");}}} style={{background:"rgba(100,100,255,0.15)",border:"1px solid #6464ff",color:"#6464ff",padding:"4px 10px",borderRadius:6,cursor:"pointer",fontSize:"0.72rem",fontWeight:700}}>Restablecer</button>
                    <button onClick={()=>reanalyze(p._id)} style={{background:"rgba(245,197,66,0.15)",border:"1px solid var(--gold)",color:"var(--gold)",padding:"4px 10px",borderRadius:6,cursor:"pointer",fontSize:"0.72rem",fontWeight:700}}>Re-analizar</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="monitor"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:12}}>
              <div style={{fontSize:"0.82rem",color:"var(--muted)"}}>Monitor operativo y alertas de verificación</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button onClick={()=>refreshVerificationMonitor(true)} disabled={monitorLoading} style={{background:"var(--d4)",border:"1px solid var(--border)",color:monitorLoading?"var(--muted)":"var(--text)",padding:"6px 12px",borderRadius:6,cursor:monitorLoading?"not-allowed":"pointer",fontSize:"0.74rem",fontWeight:700}}>↻ Refrescar</button>
                <button onClick={reanalyzeStalePicks} disabled={reanalyzingStale} style={{background:"rgba(245,197,66,0.15)",border:"1px solid var(--gold)",color:"var(--gold)",padding:"6px 12px",borderRadius:6,cursor:reanalyzingStale?"not-allowed":"pointer",fontSize:"0.74rem",fontWeight:700}}>{reanalyzingStale?"Procesando...":"Reprocesar stale"}</button>
              </div>
            </div>
            {monitorError && <div style={{background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"9px 12px",borderRadius:8,marginBottom:12,fontSize:"0.8rem"}}>{monitorError}</div>}
            {monitorLoading && <div style={{textAlign:"center",color:"var(--muted)",padding:26}}>Cargando monitor...</div>}
            {!monitorLoading && (
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:12}}>
                  {[
                    ["Pending", Number(monitorSnapshot?.totals?.pending || 0)],
                    ["Preliminar listo", Number(monitorSnapshot?.totals?.preliminaryReady || 0)],
                    ["Needs review", Number(monitorSnapshot?.totals?.needsReview || 0)],
                    ["Stale", Number(monitorSnapshot?.totals?.staleCount || 0)]
                  ].map(([label,value])=>(
                    <div key={label} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 12px",textAlign:"center"}}>
                      <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.5rem",color:"var(--g)"}}>{value}</div>
                      <div style={{fontSize:"0.64rem",color:"var(--muted)",letterSpacing:1}}>{label}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:12,marginBottom:12}}>
                  <div style={{fontSize:"0.72rem",color:"var(--g)",fontWeight:700,letterSpacing:1.5,marginBottom:8}}>Distribución por estatus</div>
                  {!Array.isArray(monitorSnapshot?.statusCounts) || monitorSnapshot.statusCounts.length===0 ? (
                    <div style={{fontSize:"0.74rem",color:"var(--muted)"}}>Sin datos por estatus</div>
                  ) : (
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {monitorSnapshot.statusCounts.map((row,idx)=>(
                        <span key={idx} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:100,padding:"5px 10px",fontSize:"0.72rem",color:"var(--text)"}}>{getVerificationStatusLabel(row?.status)}: {Number(row?.count||0)}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:12,marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:8}}>
                    <div style={{fontSize:"0.72rem",color:"var(--gold)",fontWeight:700,letterSpacing:1.5}}>Picks atascados (stale)</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <button onClick={()=>selectAllFromList(monitorSnapshot?.stalePicks||[])} disabled={!Array.isArray(monitorSnapshot?.stalePicks) || monitorSnapshot.stalePicks.length===0} style={{background:"var(--d4)",border:"1px solid var(--border)",color:!Array.isArray(monitorSnapshot?.stalePicks) || monitorSnapshot.stalePicks.length===0?"var(--muted)":"var(--text)",padding:"5px 10px",borderRadius:6,cursor:!Array.isArray(monitorSnapshot?.stalePicks) || monitorSnapshot.stalePicks.length===0?"not-allowed":"pointer",fontSize:"0.7rem",fontWeight:700}}>Seleccionar stale</button>
                      <button onClick={runBulkAnalyze} disabled={bulkBusy || selectedPickIds.length===0} style={{background:"rgba(100,100,255,0.15)",border:"1px solid #6464ff",color:"#8b8bff",padding:"5px 10px",borderRadius:6,cursor:bulkBusy || selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.7rem",fontWeight:700}}>Re-analizar selección</button>
                      <button onClick={clearSelection} disabled={selectedPickIds.length===0} style={{background:"var(--d4)",border:"1px solid var(--border)",color:selectedPickIds.length===0?"var(--muted)":"var(--text)",padding:"5px 10px",borderRadius:6,cursor:selectedPickIds.length===0?"not-allowed":"pointer",fontSize:"0.7rem",fontWeight:700}}>Limpiar selección</button>
                    </div>
                  </div>
                  {!Array.isArray(monitorSnapshot?.stalePicks) || monitorSnapshot.stalePicks.length===0 ? (
                    <div style={{fontSize:"0.74rem",color:"var(--muted)",padding:"8px 0"}}>Sin picks stale.</div>
                  ) : monitorSnapshot.stalePicks.map((pick,idx)=>(
                    <div key={pick?._id||idx} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:8,padding:"10px",marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                          <label style={{display:"flex",alignItems:"center",gap:6,fontSize:"0.68rem",color:"var(--muted)"}}>
                            <input type="checkbox" checked={selectedSet.has(String(pick?._id || ""))} onChange={()=>togglePickSelection(pick?._id)} />
                            Sel
                          </label>
                          <div>
                            <div style={{fontSize:"0.82rem",fontWeight:700}}>{pick?.match || "Sin match"}</div>
                            <div style={{fontSize:"0.7rem",color:"var(--muted)"}}>{pick?.league || ""} · {pick?.tipster || ""}</div>
                          </div>
                        </div>
                        <div style={{fontSize:"0.7rem",color:"var(--gold)"}}>{Number(pick?.pendingMinutes||0)} min pending</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:12}}>
                  <div style={{fontSize:"0.72rem",color:"var(--g)",fontWeight:700,letterSpacing:1.5,marginBottom:8}}>Feed de alertas</div>
                  {!Array.isArray(alertsFeed) || alertsFeed.length===0 ? (
                    <div style={{fontSize:"0.74rem",color:"var(--muted)",padding:"8px 0"}}>Sin alertas recientes.</div>
                  ) : alertsFeed.map((alertItem,idx)=>(
                    <div key={alertItem?._id||idx} style={{background:"var(--d4)",border:"1px solid var(--border)",borderRadius:8,padding:"10px",marginBottom:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                        <span style={{fontSize:"0.7rem",fontWeight:700,color:"var(--gold)"}}>{String(alertItem?.eventType || "evento").toUpperCase()}</span>
                        <span style={{fontSize:"0.66rem",color:"var(--muted)"}}>{alertItem?.createdAt ? new Date(alertItem.createdAt).toLocaleString("es-MX") : ""}</span>
                      </div>
                      <div style={{fontSize:"0.78rem",color:"var(--text)",marginTop:4}}>{alertItem?.message || "Sin mensaje"}</div>
                      {alertItem?.match && <div style={{fontSize:"0.68rem",color:"var(--text-dim)",marginTop:3}}>{alertItem.match}</div>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {tab==="payouts"&&(
          <div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:12}}>
              <button onClick={()=>setPayoutWeekOffset(prev=>prev-1)} style={{background:"var(--d3)",border:"1px solid var(--border)",color:"var(--text)",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>← Semana anterior</button>
              <button onClick={()=>setPayoutWeekOffset(0)} style={{background:payoutWeekOffset===0?"var(--g)":"var(--d3)",border:"1px solid "+(payoutWeekOffset===0?"var(--g)":"var(--border)"),color:payoutWeekOffset===0?"#000":"var(--text)",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>Semana actual</button>
              <button disabled={payoutWeekOffset>=0} onClick={()=>setPayoutWeekOffset(prev=>prev+1)} style={{background:"var(--d3)",border:"1px solid var(--border)",color:payoutWeekOffset>=0?"var(--muted)":"var(--text)",padding:"6px 12px",borderRadius:6,cursor:payoutWeekOffset>=0?"not-allowed":"pointer",fontSize:"0.75rem",fontWeight:700}}>Semana siguiente →</button>
              <button onClick={()=>loadWeeklyPayouts(payoutWeekOffset, true)} style={{background:"none",border:"1px solid var(--g)",color:"var(--g)",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.72rem",fontWeight:700}}>↻ Refrescar</button>
            </div>
            <div style={{background:"rgba(245,197,66,0.08)",border:"1px solid rgba(245,197,66,0.2)",borderRadius:10,padding:"14px 16px",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <div>
                  <div style={{fontSize:"0.72rem",color:"var(--gold)",fontWeight:700,marginBottom:2}}>CORTE SEMANAL</div>
                  <div style={{fontSize:"0.82rem",color:"var(--text)"}}>{payoutSummary?.week?.label || "Semana"}</div>
                </div>
                <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"flex-end"}}>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.2rem",color:"var(--g)"}}>{formatMoney(payoutSummary?.totals?.grossAmount||0)}</div>
                    <div style={{fontSize:"0.64rem",color:"var(--muted)"}}>Ventas</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.2rem",color:"var(--gold)"}}>{formatMoney(payoutSummary?.totals?.payoutAmount||0)}</div>
                    <div style={{fontSize:"0.64rem",color:"var(--muted)"}}>Pago tipsters</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.2rem",color:"var(--text)"}}>{formatMoney(payoutSummary?.totals?.platformFeeAmount||0)}</div>
                    <div style={{fontSize:"0.64rem",color:"var(--muted)"}}>Fee plataforma</div>
                  </div>
                </div>
              </div>
            </div>
            {payoutError && <div style={{background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"9px 12px",borderRadius:8,marginBottom:12,fontSize:"0.8rem"}}>{payoutError}</div>}
            {payoutLoading && <div style={{textAlign:"center",color:"var(--muted)",padding:28}}>Cargando payout semanal...</div>}
            {!payoutLoading && (!Array.isArray(payoutSummary?.payouts) || payoutSummary.payouts.length===0) && (
              <div style={{textAlign:"center",color:"var(--muted)",padding:28}}>Sin payouts para esta semana.</div>
            )}
            {!payoutLoading && Array.isArray(payoutSummary?.payouts) && payoutSummary.payouts.map((row)=>{
              const chip = getPayoutStatusChip(row.status);
              const canApprove = ["pending","failed"].includes(String(row.status || "").toLowerCase()) && Number(row.payoutAmount||0) > 0;
              const approving = approvingPayoutId === row._id;
              return (
                <div key={row._id} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:14,marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:"0.9rem"}}>{row.tipsterName || "Tipster"}</div>
                      <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>{row.tipsterEmail || "Sin email"}</div>
                      <div style={{fontSize:"0.7rem",color:"var(--text-dim)",marginTop:3}}>CLABE: {row.bankClabeMasked || "No configurada"} · Titular: {row.bankAccountHolder || "No configurado"}</div>
                      <div style={{fontSize:"0.68rem",color:"var(--muted)",marginTop:2}}>Destino: Stripe Connect → cuenta bancaria (CLABE terminación {row.bankClabeLast4 || "----"})</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <span style={{...chip.style,padding:"3px 10px",borderRadius:100,fontSize:"0.66rem",fontWeight:700}}>{chip.label}</span>
                      <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.3rem",color:"var(--gold)",marginTop:6}}>{formatMoney(row.payoutAmount||0)}</div>
                      <div style={{fontSize:"0.65rem",color:"var(--muted)"}}>Ventas {formatMoney(row.grossAmount||0)} · Fee {formatMoney(row.platformFeeAmount||0)}</div>
                    </div>
                  </div>
                  {row.errorMessage && <div style={{marginTop:8,fontSize:"0.72rem",color:"#f44336"}}>Error Stripe: {row.errorMessage}</div>}
                  <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
                    <button disabled={!canApprove || approving} onClick={()=>approveWeeklyPayout(row)} style={{background:canApprove?"var(--g)":"var(--d3)",border:canApprove?"none":"1px solid var(--border)",color:canApprove?"#000":"var(--muted)",padding:"7px 14px",borderRadius:8,cursor:canApprove && !approving?"pointer":"not-allowed",fontSize:"0.75rem",fontWeight:900,letterSpacing:1}}>
                      {approving ? "Procesando..." : canApprove ? "APROBAR Y ENVIAR" : "NO DISPONIBLE"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab==="users"&&(
          <div>
            {adminUsers.length===0&&<div style={{textAlign:"center",color:"var(--muted)",padding:40}}>No hay usuarios</div>}
            {adminUsers.map((u,i)=>(
              <div key={i} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 16px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:"var(--d4)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue'",color:"var(--g)",fontSize:"1rem"}}>{(u.name||"?")[0]}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.9rem"}}>{u.name}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--text-dim)"}}>{u.email} · {u.createdAt?new Date(u.createdAt).toLocaleDateString("es-MX"):""}</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:"0.65rem",fontWeight:900,padding:"3px 10px",borderRadius:100,letterSpacing:1,background:u.role==="pro"?"rgba(29,185,84,0.15)":u.role==="admin"?"rgba(245,197,66,0.15)":"rgba(107,128,120,0.15)",color:u.role==="pro"?"var(--g)":u.role==="admin"?"var(--gold)":"var(--muted)"}}>
                    {u.role==="pro"?"PRO ⭐":u.role==="admin"?"ADMIN 👑":"BÁSICO"}
                  </span>
                  {u.role==="basic" && (
                    <button onClick={async()=>{
                      if(!window.confirm("¿Hacer Pro a "+u.name+"?")) return;
                      const token=localStorage.getItem("tpz_token");
                      const r=await fetch(BACKEND_URL+"/api/admin/set-role",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({secret:"tpz-setup-2026",email:u.email,role:"pro"})});
                      if(r.ok){alert(u.name+" ahora es PRO");loadData();}
                      else alert("Error al cambiar rol");
                    }} style={{fontSize:"0.65rem",fontWeight:700,padding:"3px 10px",borderRadius:100,background:"rgba(29,185,84,0.1)",border:"1px solid var(--g)",color:"var(--g)",cursor:"pointer"}}>
                      + Hacer Pro
                    </button>
                  )}
                  {u.role==="pro" && u.email!=="admin@thepickzone.com" && (
                    <button onClick={async()=>{
                      if(!window.confirm("¿Quitar Pro a "+u.name+"?")) return;
                      const token=localStorage.getItem("tpz_token");
                      const r=await fetch(BACKEND_URL+"/api/admin/set-role",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+token},body:JSON.stringify({secret:"tpz-setup-2026",email:u.email,role:"basic"})});
                      if(r.ok){alert(u.name+" ahora es BÁSICO");loadData();}
                      else alert("Error al cambiar rol");
                    }} style={{fontSize:"0.65rem",fontWeight:700,padding:"3px 10px",borderRadius:100,background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",cursor:"pointer"}}>
                      Quitar Pro
                    </button>
                  )}
                  {u.email!=="admin@thepickzone.com" && String(user?._id||"")!==String(u._id||"") && (
                    <button onClick={()=>removeUserFromPlatform(u)} style={{fontSize:"0.65rem",fontWeight:700,padding:"3px 10px",borderRadius:100,background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",cursor:"pointer"}}>
                      Eliminar usuario
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── REVENUE DASHBOARD ─────────────────────────────────────────────────────────
function RevenueDashboard({ setView }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [summary, setSummary] = useState({ week: {}, totals: {}, payouts: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [approvingId, setApprovingId] = useState("");
  const [error, setError] = useState("");

  async function loadSummary(targetWeekOffset, mode = "initial") {
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setError("Sesión expirada. Inicia sesión nuevamente.");
      setLoading(false);
      setRefreshing(false);
      return;
    }
    if (mode === "initial") setLoading(true);
    if (mode === "refresh") setRefreshing(true);
    try {
      const r = await fetch(BACKEND_URL+`/api/admin/revenue/weekly-payouts?weekOffset=${targetWeekOffset}`,{
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok) throw new Error(data?.error || "No se pudo cargar el corte semanal");
      setSummary({
        week: data?.week || {},
        totals: data?.totals || {},
        payouts: Array.isArray(data?.payouts) ? data.payouts : []
      });
      setError("");
    } catch (e) {
      setError(e.message || "Error cargando payout semanal");
    }
    if (mode === "initial") setLoading(false);
    if (mode === "refresh") setRefreshing(false);
  }

  useEffect(()=>{
    loadSummary(weekOffset, "initial");
  },[weekOffset]);

  async function approvePayout(payoutRow) {
    if (!payoutRow?._id) return;
    if (!window.confirm(`¿Aprobar y enviar pago para ${payoutRow.tipsterName || "tipster"} por ${formatMoney(payoutRow.payoutAmount)}?`)) return;
    const token = localStorage.getItem("tpz_token");
    if (!token) {
      setError("Sesión expirada. Inicia sesión nuevamente.");
      return;
    }
    setApprovingId(payoutRow._id);
    setError("");
    try {
      const r = await fetch(BACKEND_URL+`/api/admin/revenue/weekly-payouts/${payoutRow._id}/approve`,{
        method:"POST",
        headers:{"Authorization":"Bearer "+token}
      });
      const data = await r.json().catch(()=>null);
      if(!r.ok || !data?.success) throw new Error(data?.error || "No se pudo aprobar el pago");
      await loadSummary(weekOffset, "refresh");
    } catch (e) {
      setError(e.message || "Error aprobando pago");
    }
    setApprovingId("");
  }

  function payoutStatusChip(statusValue) {
    const status = String(statusValue || "pending").toLowerCase();
    if (status === "paid") return { label: "PAGADO", style: { background:"rgba(29,185,84,0.15)", color:"var(--g)", border:"1px solid rgba(29,185,84,0.35)" } };
    if (status === "processing") return { label: "PROCESANDO", style: { background:"rgba(100,100,255,0.15)", color:"#8b8bff", border:"1px solid rgba(100,100,255,0.45)" } };
    if (status === "failed") return { label: "FALLIDO", style: { background:"rgba(244,67,54,0.15)", color:"#f44336", border:"1px solid rgba(244,67,54,0.45)" } };
    return { label: "PENDIENTE", style: { background:"rgba(245,197,66,0.15)", color:"var(--gold)", border:"1px solid rgba(245,197,66,0.45)" } };
  }

  if(loading) return <div style={{paddingTop:120,textAlign:"center",color:"var(--muted)"}}>Cargando corte semanal...</div>;

  const totals = summary?.totals || {};
  const payouts = Array.isArray(summary?.payouts) ? summary.payouts : [];
  const weekLabel = summary?.week?.label || "Semana";

  return (
    <div className="tpz-page" style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div style={{maxWidth:760,margin:"0 auto"}}>
        <button onClick={()=>setView("admin-panel")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem",marginBottom:20}}>← Volver al Admin</button>
        <h1 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2rem,5vw,3rem)",marginBottom:10}}>Revenue & <span style={{color:"var(--g)"}}>Corte semanal</span></h1>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:18}}>
          <button onClick={()=>setWeekOffset(prev=>prev-1)} style={{background:"var(--d3)",border:"1px solid var(--border)",color:"var(--text)",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>← Semana anterior</button>
          <button onClick={()=>setWeekOffset(0)} style={{background:weekOffset===0?"var(--g)":"var(--d3)",border:"1px solid "+(weekOffset===0?"var(--g)":"var(--border)"),color:weekOffset===0?"#000":"var(--text)",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:"0.75rem",fontWeight:700}}>Semana actual</button>
          <button disabled={weekOffset>=0} onClick={()=>setWeekOffset(prev=>prev+1)} style={{background:"var(--d3)",border:"1px solid var(--border)",color:weekOffset>=0?"var(--muted)":"var(--text)",padding:"6px 12px",borderRadius:6,cursor:weekOffset>=0?"not-allowed":"pointer",fontSize:"0.75rem",fontWeight:700}}>Semana siguiente →</button>
          {refreshing && <span style={{fontSize:"0.72rem",color:"var(--muted)"}}>Actualizando...</span>}
        </div>

        <div style={{background:"rgba(245,197,66,0.08)",border:"1px solid rgba(245,197,66,0.2)",borderRadius:10,padding:"14px 16px",marginBottom:16}}>
          <div style={{fontSize:"0.72rem",color:"var(--gold)",fontWeight:700,marginBottom:4}}>CORTE: {weekLabel}</div>
          <div style={{fontSize:"0.78rem",color:"var(--muted)"}}>Un clic por usuario: aprobar y enviar desde balance Stripe a la CLABE vinculada en Connect.</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:20}}>
          {[["Ventas",formatMoney(totals.grossAmount||0)],["Pago tipsters",formatMoney(totals.payoutAmount||0)],["Comisión plataforma",formatMoney(totals.platformFeeAmount||0)],["Tipsters",String(totals.tipsters||0)]].map(([label,value])=>(
            <div key={label} style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 12px",textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.5rem",color:"var(--g)"}}>{value}</div>
              <div style={{fontSize:"0.62rem",color:"var(--muted)",letterSpacing:1}}>{label}</div>
            </div>
          ))}
        </div>

        {error && <div style={{background:"rgba(244,67,54,0.1)",border:"1px solid #f44336",color:"#f44336",padding:"9px 12px",borderRadius:8,marginBottom:12,fontSize:"0.8rem"}}>{error}</div>}

        <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:10,padding:16}}>
          <div style={{fontSize:"0.72rem",color:"var(--g)",fontWeight:700,letterSpacing:2,marginBottom:10}}>PAYOUTS POR TIPSTER</div>
          {payouts.length===0 && <div style={{textAlign:"center",color:"var(--muted)",padding:24}}>Sin payouts para esta semana.</div>}
          {payouts.map((row)=>{
            const chip = payoutStatusChip(row.status);
            const canApprove = ["pending","failed"].includes(String(row.status || "").toLowerCase()) && Number(row.payoutAmount||0) > 0;
            const approving = approvingId === row._id;
            return (
              <div key={row._id} style={{border:"1px solid var(--border)",borderRadius:10,padding:"12px 14px",marginBottom:10,background:"var(--d4)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.9rem"}}>{row.tipsterName || "Tipster"}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--muted)"}}>{row.tipsterEmail || "Sin email"}</div>
                    <div style={{fontSize:"0.7rem",color:"var(--text-dim)",marginTop:3}}>CLABE: {row.bankClabeMasked || "No configurada"} · Titular: {row.bankAccountHolder || "No configurado"}</div>
                    <div style={{fontSize:"0.68rem",color:"var(--muted)",marginTop:2}}>Destino: Stripe Connect → cuenta bancaria (CLABE terminación {row.bankClabeLast4 || "----"})</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <span style={{...chip.style,padding:"3px 10px",borderRadius:100,fontSize:"0.66rem",fontWeight:700}}>{chip.label}</span>
                    <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.35rem",color:"var(--gold)",marginTop:6}}>{formatMoney(row.payoutAmount||0)}</div>
                    <div style={{fontSize:"0.65rem",color:"var(--muted)"}}>Ventas {formatMoney(row.grossAmount||0)} · Fee {formatMoney(row.platformFeeAmount||0)}</div>
                  </div>
                </div>
                {row.errorMessage && <div style={{marginTop:8,fontSize:"0.72rem",color:"#f44336"}}>Error Stripe: {row.errorMessage}</div>}
                <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
                  <button disabled={!canApprove || approving} onClick={()=>approvePayout(row)} style={{background:canApprove?"var(--g)":"var(--d3)",border:canApprove?"none":"1px solid var(--border)",color:canApprove?"#000":"var(--muted)",padding:"7px 14px",borderRadius:8,cursor:canApprove && !approving?"pointer":"not-allowed",fontSize:"0.75rem",fontWeight:900,letterSpacing:1}}>
                    {approving ? "Procesando..." : canApprove ? "APROBAR Y ENVIAR" : "NO DISPONIBLE"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ── TIPSTER PROFILE ───────────────────────────────────────────────────────────
function TipsterProfileView({ setView, tipsterName, picks }) {
  const [tipster, setTipster] = useState(null);

  useEffect(()=>{
    fetch(BACKEND_URL+"/api/tipsters")
      .then(r=>r.json())
      .then(data=>{
        if(Array.isArray(data)){
          const t = data.find(u=>u.name===tipsterName);
          setTipster(t||null);
        }
      }).catch(()=>{});
  },[tipsterName]);

  const myPicks = picks.filter(p=>p.tipster===tipsterName);
  const recentPicks = [...myPicks]
    .sort((a,b)=>{
      const timeA = new Date(a?.createdAt || a?.updatedAt || a?.timeRaw || a?.time || 0).getTime();
      const timeB = new Date(b?.createdAt || b?.updatedAt || b?.timeRaw || b?.time || 0).getTime();
      return timeB - timeA;
    })
    .slice(0,12);
  const localWon = myPicks.filter(p=>p.result==="won").length;
  const localLost = myPicks.filter(p=>p.result==="lost").length;
  const localPush = myPicks.filter(p=>p.result==="void").length;
  const localResolved = myPicks.filter(p=>["won","lost","void"].includes(p.result));
  const localAvgOdds = localResolved.length>0
    ? localResolved.reduce((sum,p)=>sum+toSafeNumber(p.odds,0),0)/localResolved.length
    : 0;

  const won = Math.max(0, toSafeNumber(tipster?.wonPicks, localWon));
  const lost = Math.max(0, toSafeNumber(tipster?.lostPicks, localLost));
  const push = Math.max(0, toSafeNumber(tipster?.pushPicks, localPush));
  const decisive = won + lost;
  const winRate = Math.max(0, toSafeNumber(tipster?.winRate, decisive>0 ? Math.round((won/decisive)*100) : 0));
  const avgOdds = toSafeNumber(tipster?.avgOdds, localAvgOdds);
  const totalPicks = Math.max(0, toSafeNumber(tipster?.totalPicks, (won+lost+push)||myPicks.length));
  const roiValue = toSafeNumber(tipster?.roiValue, parseFloat(String(tipster?.roi || "0").replace("+","").replace("%","")) || 0);
  const yieldValue = toSafeNumber(tipster?.yieldValue, parseFloat(String(tipster?.yield || "0").replace("+","").replace("%","")) || 0);
  const netUnits = toSafeNumber(tipster?.netUnits, roiValue);
  const roiText = typeof tipster?.roi === "string" && tipster.roi ? tipster.roi : formatSignedPercent(roiValue);
  const yieldText = typeof tipster?.yield === "string" && tipster.yield ? tipster.yield : formatSignedPercent(yieldValue);
  const riskedUnits = toSafeNumber(tipster?.totalRiskedUnits, 0);
  const pendingPicks = Math.max(0, totalPicks - (won + lost + push));
  const recentResolvedWindow = recentPicks.filter((pick)=>["won","lost","void"].includes(String(pick?.result||"").toLowerCase())).slice(0,8);
  const recentWindowWins = recentResolvedWindow.filter((pick)=>String(pick?.result||"").toLowerCase()==="won").length;
  const recentWindowRate = recentResolvedWindow.length>0 ? Math.round((recentWindowWins/recentResolvedWindow.length)*100) : 0;
  const profileSubtitle = tipster?.bio || "Tipster verificado con historial y rendimiento en tiempo real.";
  const positiveRoi = !String(roiText||"").trim().startsWith("-");
  const positiveYield = !String(yieldText||"").trim().startsWith("-");
  const positiveNet = netUnits >= 0;
  const headlineCards = [
    {
      key: "roi",
      label: "ROI",
      value: roiText || "+0.0%",
      caption: "retorno acumulado",
      positive: positiveRoi
    },
    {
      key: "yield",
      label: "Yield",
      value: yieldText || "+0.0%",
      caption: "eficiencia por apuesta",
      positive: positiveYield
    },
    {
      key: "net",
      label: "Neto u",
      value: formatSignedUnits(netUnits),
      caption: "unidades netas",
      positive: positiveNet
    }
  ];
  const detailCards = [
    { key:"record", label:"Record", value:`${won}-${lost}-${push}`, caption:"W-L-P", icon:"🏁" },
    { key:"winrate", label:"Win Rate", value:`${winRate}%`, caption:`${decisive} decisiones`, icon:"🎯" },
    { key:"momio", label:"Momio prom", value:formatOddsValue(avgOdds), caption:"picks resueltos", icon:"📈" },
    { key:"push", label:"Push", value:String(push), caption:"void/push oficiales", icon:"🟨" },
    { key:"total", label:"Picks totales", value:String(totalPicks), caption:`${pendingPicks} pendientes`, icon:"📊" },
    { key:"risk", label:"Riesgo u", value:`${riskedUnits.toFixed(2)}u`, caption:"exposición acumulada", icon:"💼" }
  ];

  function getPickResultMeta(resultValue) {
    const normalized = String(resultValue || "").toLowerCase();
    if (normalized === "won") {
      return {
        label: "GANADO",
        color: "var(--g)",
        bg: "rgba(29,185,84,0.14)",
        border: "1px solid rgba(29,185,84,0.35)",
        accent: "var(--g)"
      };
    }
    if (normalized === "lost") {
      return {
        label: "PERDIDO",
        color: "#f44336",
        bg: "rgba(244,67,54,0.14)",
        border: "1px solid rgba(244,67,54,0.35)",
        accent: "#f44336"
      };
    }
    if (normalized === "void") {
      return {
        label: "PUSH",
        color: "var(--gold)",
        bg: "rgba(245,197,66,0.14)",
        border: "1px solid rgba(245,197,66,0.35)",
        accent: "var(--gold)"
      };
    }
    return {
      label: "PENDIENTE",
      color: "var(--muted)",
      bg: "rgba(107,128,120,0.14)",
      border: "1px solid rgba(107,128,120,0.35)",
      accent: "var(--muted)"
    };
  }

  return (
    <div className="tpz-page tpz-pro-shell" style={{paddingTop:80,minHeight:"100vh",padding:"clamp(80px,12vw,100px) 5% 60px"}}>
      <div className="tpz-pro-shell-inner" style={{maxWidth:920}}>
        <button onClick={()=>setView("rankings")} style={{background:"none",border:"none",color:"var(--g)",cursor:"pointer",fontSize:"0.85rem"}}>← Volver</button>

        <section className="tpz-pro-hero">
          <div className="tpz-two-col-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(230px,0.5fr)",gap:14,alignItems:"stretch"}}>
            <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
              <div style={{width:98,height:98,borderRadius:"50%",background:"var(--d4)",border:"4px solid var(--g)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0,boxShadow:"0 12px 30px rgba(29,185,84,0.2)"}}>
                {tipster?.avatar?<img src={tipster.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontFamily:"'Bebas Neue'",fontSize:"2.4rem",color:"var(--g)"}}>{(tipsterName||"T")[0].toUpperCase()}</span>}
              </div>
              <div style={{flex:1,minWidth:220}}>
                <h2 style={{fontFamily:"'Bebas Neue'",fontSize:"clamp(2rem,4.8vw,3rem)",lineHeight:0.9,letterSpacing:1.2,marginBottom:8}}>{tipsterName}</h2>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
                  <span style={{background:"rgba(29,185,84,0.15)",color:"var(--g)",padding:"4px 12px",borderRadius:100,fontSize:"0.69rem",fontWeight:800,letterSpacing:1.2}}>PRO ⭐ VERIFICADO</span>
                  <span style={{background:"rgba(245,197,66,0.14)",color:"var(--gold)",padding:"4px 12px",borderRadius:100,fontSize:"0.69rem",fontWeight:800,letterSpacing:1.2}}>MOMIO + PUSH TRACKING</span>
                </div>
                <div style={{fontSize:"0.86rem",color:"var(--text-dim)",lineHeight:1.7,maxWidth:620}}>{profileSubtitle}</div>
              </div>
            </div>
            <div style={{background:"rgba(7,17,13,0.85)",border:"1px solid rgba(29,185,84,0.28)",borderRadius:12,padding:"12px 14px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:"0.63rem",letterSpacing:1.3,textTransform:"uppercase",color:"var(--muted)",marginBottom:6}}>Pulso reciente</div>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",lineHeight:1,color:recentWindowRate>=50?"var(--g)":"var(--gold)"}}>
                  {recentResolvedWindow.length>0 ? `${recentWindowRate}%` : "--"}
                </div>
                <div style={{fontSize:"0.72rem",color:"var(--text-dim)",marginTop:4}}>
                  {recentResolvedWindow.length>0 ? `${recentWindowWins}/${recentResolvedWindow.length} aciertos en los últimos resueltos` : "Sin ventana de resultados aún"}
                </div>
              </div>
              <div style={{fontSize:"0.72rem",color:"var(--muted)",marginTop:10}}>
                Record general: <span style={{color:"var(--text)",fontWeight:700}}>{won}-{lost}-{push}</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
          {headlineCards.map((metric)=>(
            <article key={metric.key} style={{background:"linear-gradient(160deg, rgba(16,24,20,0.95) 0%, rgba(10,16,13,0.95) 100%)",border:"1px solid rgba(29,185,84,0.25)",borderRadius:12,padding:"14px 12px"}}>
              <div style={{fontSize:"0.64rem",letterSpacing:1.2,textTransform:"uppercase",color:"var(--muted)",marginBottom:6}}>{metric.label}</div>
              <div style={{fontFamily:"'Bebas Neue'",fontSize:"2rem",lineHeight:1,color:metric.positive?"var(--g)":"#f44336"}}>{metric.value}</div>
              <div style={{fontSize:"0.7rem",color:"var(--text-dim)",marginTop:5}}>{metric.caption}</div>
            </article>
          ))}
        </section>

        <section style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:"14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:10}}>
            <h3 style={{fontFamily:"'Bebas Neue'",fontSize:"1.55rem",letterSpacing:1,margin:0}}>Dashboard de <span style={{color:"var(--g)"}}>stats</span></h3>
            <span style={{fontSize:"0.7rem",color:"var(--muted)",letterSpacing:1.1,textTransform:"uppercase"}}>Momio + Push incluidos</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10}}>
            {detailCards.map((metric)=>(
              <article key={metric.key} style={{background:"rgba(12,19,16,0.9)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"12px 10px",textAlign:"center"}}>
                <div style={{fontSize:"0.95rem",marginBottom:4}}>{metric.icon}</div>
                <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.75rem",lineHeight:1,color:"var(--g)"}}>{metric.value}</div>
                <div style={{fontSize:"0.64rem",color:"var(--text)",letterSpacing:1,textTransform:"uppercase",marginTop:3,fontWeight:700}}>{metric.label}</div>
                <div style={{fontSize:"0.66rem",color:"var(--muted)",marginTop:4}}>{metric.caption}</div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:6}}>
            <h3 style={{fontFamily:"'Bebas Neue'",fontSize:"1.6rem",letterSpacing:1,margin:0}}>Picks <span style={{color:"var(--g)"}}>Recientes</span></h3>
            <span style={{fontSize:"0.72rem",color:"var(--muted)"}}>{recentPicks.length} mostrados</span>
          </div>
          {recentPicks.length===0 ? (
            <div style={{background:"var(--d3)",border:"1px solid var(--border)",borderRadius:12,padding:"34px 16px",textAlign:"center",color:"var(--muted)"}}>
              No hay picks disponibles aún para este tipster.
            </div>
          ) : recentPicks.map((pick, idx)=>{
            const resultMeta = getPickResultMeta(pick?.result);
            return (
              <article key={pick?._id || pick?.id || `${pick?.match || "pick"}-${idx}`} style={{background:"linear-gradient(160deg, rgba(16,24,20,0.95) 0%, rgba(10,16,13,0.95) 100%)",border:"1px solid var(--border)",borderLeft:`4px solid ${resultMeta.accent}`,borderRadius:10,padding:"12px 13px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",gap:10,alignItems:"flex-start",flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:220}}>
                    <div style={{fontWeight:700,fontSize:"0.92rem",marginBottom:4}}>{pick?.match || "Pick"}</div>
                    <div style={{fontSize:"0.72rem",color:"var(--text-dim)"}}>
                      {pick?.league || "Liga"} · Momio {formatOddsValue(pick?.odds)} · Bank {Math.max(0, Math.round(toSafeNumber(pick?.bank,0)))}%
                    </div>
                    <div style={{fontSize:"0.68rem",color:"var(--muted)",marginTop:4}}>
                      {String(pick?.betType||"").toLowerCase()==="parlay" ? "Parlay" : "Straight"} · {getPickShareTime(pick)}
                    </div>
                  </div>
                  <span style={{background:resultMeta.bg,color:resultMeta.color,border:resultMeta.border,padding:"4px 11px",borderRadius:100,fontSize:"0.68rem",fontWeight:800,letterSpacing:1}}>
                    {resultMeta.label}
                  </span>
                </div>
                {pick?.bet?.selection && (
                  <div style={{marginTop:7,fontSize:"0.68rem",color:"var(--text-dim)"}}>
                    Selección: {pick.bet.selection}
                  </div>
                )}
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [user, setUser] = useState(null);
  const [picks, setPicks] = useState([]);
  const [purchaseTarget, setPurchaseTarget] = useState(null);
  const [selectedTipster, setSelectedTipster] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [authSystemMessage, setAuthSystemMessage] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");

  // Restore session
  useEffect(()=>{
    const token = localStorage.getItem("tpz_token");
    if(token){
      fetch(BACKEND_URL+"/api/auth/me",{headers:{"Authorization":"Bearer "+token}})
        .then(r=>r.ok?r.json():null).then(d=>{if(d&&d._id)setUser(d);}).catch(()=>{});
    }
  },[]);

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    if (flow === "pick") {
      setView("purchase");
      return;
    }
    if (flow === "pro") {
      setView("become-pro");
      return;
    }
    if (flow === "verify-email") {
      const token = params.get("token");
      if (!token) {
        setAuthSystemMessage("Token de verificación no encontrado.");
        setView("login");
        clearCheckoutQueryParams();
        return;
      }
      fetch(BACKEND_URL+`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
        .then(async (r)=>({ ok: r.ok, data: await r.json() }))
        .then(({ ok, data })=>{
          setAuthSystemMessage(ok ? (data?.message || "Correo verificado. Ya puedes iniciar sesión.") : (data?.error || "No se pudo verificar el correo."));
          setView("login");
          clearCheckoutQueryParams();
        })
        .catch(()=>{
          setAuthSystemMessage("No se pudo verificar el correo.");
          setView("login");
          clearCheckoutQueryParams();
        });
    }
    if (flow === "reset-password") {
      const token = String(params.get("token") || "").trim();
      if (!token) {
        setAuthSystemMessage("Token de recuperación no encontrado.");
        setView("login");
        clearCheckoutQueryParams();
        return;
      }
      setResetPasswordToken(token);
      setView("reset-password");
    }
  },[]);

  useEffect(()=>{
    function hasProtectedContentOpen() {
      return !!document.querySelector(".tpz-protected-content");
    }
    function isInProtectedContent(target) {
      return target instanceof Element && !!target.closest(".tpz-protected-content");
    }
    function handleContextMenu(event) {
      if (!hasProtectedContentOpen()) return;
      if (isInProtectedContent(event.target)) event.preventDefault();
    }
    function handleDragStart(event) {
      if (!hasProtectedContentOpen()) return;
      if (isInProtectedContent(event.target)) event.preventDefault();
    }
    function isBlockedShortcut(event) {
      const key = String(event.key || "").toLowerCase();
      if (key === "printscreen" || key === "f12") return true;
      if (event.ctrlKey && event.shiftKey && ["i","j","c","s"].includes(key)) return true;
      if (event.ctrlKey && key === "p") return true;
      if (event.metaKey && event.shiftKey && ["3","4","5"].includes(key)) return true;
      return false;
    }
    function handleKeyDown(event) {
      if (!hasProtectedContentOpen() || !isBlockedShortcut(event)) return;
      event.preventDefault();
      const key = String(event.key || "").toLowerCase();
      if (key === "printscreen" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText("").catch(()=>{});
      }
    }
    function handleKeyUp(event) {
      if (!hasProtectedContentOpen()) return;
      const key = String(event.key || "").toLowerCase();
      if (key === "printscreen" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText("").catch(()=>{});
      }
    }
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return ()=>{
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  },[]);

  // Load picks from backend
  useEffect(()=>{
    fetch(BACKEND_URL+"/api/picks")
      .then(r=>r.json())
      .then(data=>{if(Array.isArray(data))setPicks(data.map(p=>({...p,id:p._id||p.id})));})
      .catch(()=>{});
    const interval = setInterval(()=>{
      fetch(BACKEND_URL+"/api/picks").then(r=>r.json()).then(data=>{if(Array.isArray(data))setPicks(data.map(p=>({...p,id:p._id||p.id})));}).catch(()=>{});
    }, 60000);
    return ()=>clearInterval(interval);
  },[]);

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    const pickId = params.get("pickId");
    if (flow !== "pick" || !pickId || !Array.isArray(picks) || picks.length === 0) return;
    const foundPick = picks.find((p)=>String(p._id||p.id)===String(pickId));
    if (foundPick) setPurchaseTarget(foundPick);
  },[picks]);

  useEffect(()=>{
    setPurchaseTarget(null);
  },[user?._id]);

  function addPick(p){ setPicks(prev=>[p,...prev]); }
  function gotoView(v){ setView(v); window.scrollTo({top:0,behavior:"smooth"}); }
  function openOwnTipsterSummary() {
    const tipsterName = String(user?.name || "").trim();
    if (!tipsterName) {
      gotoView("profile");
      return;
    }
    setSelectedTipster(tipsterName);
    gotoView("tipster-profile");
  }

  return (
    <>
      <style>{G}</style>
      <NavBar view={view} setView={gotoView} user={user} setUser={setUser} notifications={notifications} setNotifications={setNotifications} onOpenOwnSummary={openOwnTipsterSummary}/>
      {view==="home"             && <HomeView        setView={gotoView} setPurchaseTarget={setPurchaseTarget} picks={picks} setSelectedTipster={setSelectedTipster}/>}
      {view==="marketplace"      && <MarketplaceView setView={gotoView} setPurchaseTarget={setPurchaseTarget} picks={picks} setSelectedTipster={setSelectedTipster}/>}
      {view==="purchase"         && <PurchaseView    key={`${user?._id||'anon'}-${purchaseTarget?._id||'none'}`} pick={purchaseTarget} setView={gotoView} user={user}/>}
      {view==="rankings"         && <RankingsView    setView={gotoView} picks={picks} setSelectedTipster={setSelectedTipster}/>}
      {view==="login"            && <AuthView        setView={gotoView} setUser={setUser} mode="login" authSystemMessage={authSystemMessage}/>}
      {view==="register"         && <AuthView        setView={gotoView} setUser={setUser} mode="register" authSystemMessage={authSystemMessage}/>}
      {view==="forgot-password"  && <AuthView        setView={gotoView} setUser={setUser} mode="forgot" authSystemMessage={authSystemMessage}/>}
      {view==="reset-password"   && <AuthView        setView={gotoView} setUser={setUser} mode="reset" authSystemMessage={authSystemMessage} resetToken={resetPasswordToken}/>}
      {view==="profile"          && <ProfileView     setView={gotoView} user={user} setUser={setUser} setSelectedTipster={setSelectedTipster}/>}
      {view==="become-pro"       && <BecomeProView   setView={gotoView} user={user} setUser={setUser}/>}
      {view==="pro-panel"        && <ProPanelView    user={user} addPick={addPick} setView={gotoView} picks={picks}/>}
      {view==="admin-panel"      && <AdminPanel      setView={gotoView} user={user} picks={picks}/>}
      {view==="revenue-dashboard"&& <RevenueDashboard setView={gotoView} picks={picks}/>}
      {view==="tipster-profile"   && <TipsterProfileView setView={gotoView} tipsterName={selectedTipster} picks={picks}/>}
      <footer className="tpz-footer" style={{background:"var(--dark)",borderTop:"1px solid var(--border)",padding:"40px 5%",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20}}>
        <div style={{fontFamily:"'Bebas Neue'",fontSize:"1.2rem",letterSpacing:2,color:"var(--g)"}}>THE PICK ZONE</div>
        <div className="tpz-footer-links" style={{display:"flex",gap:20}}>{["Términos","Privacidad","Soporte"].map(l=><a key={l} href="#" style={{color:"var(--muted)",fontSize:"0.8rem",textDecoration:"none"}}>{l}</a>)}</div>
        <span style={{fontSize:"0.75rem",color:"var(--muted)"}}>© 2026 The Pick Zone</span>
      </footer>
    </>
  );
}
