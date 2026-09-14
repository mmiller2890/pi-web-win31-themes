// Windows 3.1 themes for PI WEB — Classic and OLED.
//
// Two theme contributions carry the full --pi-* token palettes, plus a pair
// so "Auto" follows the system: light → Classic, dark → OLED. The 3.1
// chrome (bevels, navy title bars, pixel font, flag wordmark, square
// scrollbars) cannot be expressed in tokens: PI WEB renders inside nested
// open shadow roots, so while one of our themes is active this plugin keeps
// a <style> clone inside every discovered shadow root — themed by the
// active contribution — and removes them all when switched away.

const THEME_OLED = "win31-oled";
const THEME_CLASSIC = "win31-classic";
const PAIR_ID = "win31-auto";

const FONT_URL = new URL("./fonts/win95fa-latin-400.woff2", import.meta.url)
  .href;

const FONT_STACK = `"W95FA", Tahoma, "MS Sans Serif", "DejaVu Sans", sans-serif`;
const MONO_STACK = `"Cascadia Mono", "DejaVu Sans Mono", "Liberation Mono", monospace`;

// Win 3.1 law: light edge top/left, dark edge bottom/right. Raised for
// buttons and frames, swapped (sunken) for inputs and lists.
const tokens = {
  [THEME_OLED]: {
    "--pi-bg": "#000000",
    "--pi-surface": "#101010",
    "--pi-surface-hover": "#1a1a1a",
    "--pi-terminal-bg": "#000000",
    "--pi-terminal-text": "#c0c0c0",
    "--pi-border": "#3a3a3a",
    "--pi-border-muted": "#262626",
    "--pi-text": "#c0c0c0",
    "--pi-text-secondary": "#9a9a9a",
    "--pi-text-bright": "#f5f5f5",
    "--pi-muted": "#8f8f8f",
    "--pi-dim": "#6e6e6e",
    "--pi-accent": "#000080",
    "--pi-accent-border": "#000080",
    "--pi-selection-bg": "#000080",
    "--pi-success": "#00a8a8",
    "--pi-success-border": "#00a8a8",
    "--pi-success-bg": "#00201e",
    "--pi-success-surface": "#002825",
    "--pi-success-ring": "#00a8a880",
    "--pi-warning": "#b4a800",
    "--pi-warning-border": "#b4a800",
    "--pi-warning-surface": "#1a1800",
    "--pi-danger": "#c46a6a",
    "--pi-purple": "#9a9ad0",
    "--pi-purple-border": "#4a4a7a",
    "--pi-purple-surface": "#12121c",
    "--pi-overlay": "rgba(0,0,0,0.55)",
    "--pi-shadow-soft": "rgba(0,0,0,0.4)",
    "--pi-shadow": "rgba(0,0,0,0.55)",
    "--pi-shadow-strong": "rgba(0,0,0,0.75)",
    "--pi-bg-overlay-soft": "rgba(0,0,0,0.87)",
    "--pi-bg-overlay": "rgba(0,0,0,0.92)",
    "--pi-success-bg-overlay": "rgba(0,32,30,0.95)",
    "--pi-terminal-selection": "#000080",
  },
  // The authentic 3.1 system palette: teal desktop (COLOR_BACKGROUND),
  // silver chrome (COLOR_BTNFACE), navy title bars (COLOR_ACTIVECAPTION),
  // black window text, and an MS-DOS Prompt for the terminal.
  [THEME_CLASSIC]: {
    "--pi-bg": "#008080",
    "--pi-surface": "#c0c0c0",
    "--pi-surface-hover": "#dfdfdf",
    "--pi-terminal-bg": "#000000",
    "--pi-terminal-text": "#c0c0c0",
    "--pi-border": "#808080",
    "--pi-border-muted": "#a0a0a0",
    "--pi-text": "#000000",
    "--pi-text-secondary": "#404040",
    "--pi-text-bright": "#000000",
    "--pi-muted": "#606060",
    "--pi-dim": "#808080",
    "--pi-accent": "#000080",
    "--pi-accent-border": "#000080",
    "--pi-selection-bg": "#000080",
    "--pi-success": "#008040",
    "--pi-success-border": "#008040",
    "--pi-success-bg": "#dff0e8",
    "--pi-success-surface": "#c8e8d8",
    "--pi-success-ring": "#00804080",
    "--pi-warning": "#808000",
    "--pi-warning-border": "#808000",
    "--pi-warning-surface": "#f0e8c0",
    "--pi-danger": "#a80000",
    "--pi-purple": "#404080",
    "--pi-purple-border": "#404080",
    "--pi-purple-surface": "#e0e0f0",
    "--pi-overlay": "rgba(0,0,0,0.3)",
    "--pi-shadow-soft": "rgba(0,0,0,0.2)",
    "--pi-shadow": "rgba(0,0,0,0.3)",
    "--pi-shadow-strong": "rgba(0,0,0,0.45)",
    "--pi-bg-overlay-soft": "rgba(255,255,255,0.75)",
    "--pi-bg-overlay": "rgba(255,255,255,0.85)",
    "--pi-success-bg-overlay": "rgba(223,240,232,0.95)",
    "--pi-terminal-selection": "#808080",
  },
};

// Bevel and surface values the chrome CSS interpolates per theme.
const palettes = {
  [THEME_OLED]: {
    bevelLight: "#cfcfcf",
    bevelDark: "#262626",
    surface: "#101010",
    surfaceHover: "#1a1a1a",
    fieldBg: "#000000",
    msgBg: "#101010",
    userMsgBg: "#000060",
    focusDot: "#cfcfcf",
    scrollbarTrack: "#000000",
    scrollbarThumb: "#101010",
    desktop: `
  .shell,
  .chat-view {
    background-color: #000000 !important;
    background-image: repeating-conic-gradient(#0b0b0b 0% 25%, transparent 0% 50%);
    background-size: 4px 4px;
  }`,
  },
  [THEME_CLASSIC]: {
    bevelLight: "#ffffff",
    bevelDark: "#808080",
    surface: "#c0c0c0",
    surfaceHover: "#dfdfdf",
    fieldBg: "#ffffff",
    msgBg: "#c0c0c0",
    userMsgBg: "#000080",
    focusDot: "#808080",
    scrollbarTrack: "#c0c0c0",
    scrollbarThumb: "#c0c0c0",
    desktop: `
  /* the 3.1 desktop was solid teal — COLOR_BACKGROUND, no dither */
  .shell,
  .chat-view {
    background-color: #008080 !important;
    background-image: none !important;
  }`,
  },
};

/** Chrome rules that run inside each shadow root, themed by `themeId`. */
function chromeCss(themeId) {
  const p = palettes[themeId];
  return `
/* nothing is round in 1992 */
*,
*::before,
*::after {
  border-radius: 0 !important;
}

* {
  scrollbar-color: ${p.bevelDark} ${p.scrollbarTrack};
}

/* ---- raised bevel: buttons, frames ---- */
button,
[role="button"],
select,
.action-row,
.machine-switcher-button,
.section-title,
.empty-state,
.workspace-panel,
.msg-action,
.notification-control,
dialog {
  border-style: solid !important;
  border-width: 2px !important;
  border-top-color: ${p.bevelLight} !important;
  border-left-color: ${p.bevelLight} !important;
  border-bottom-color: ${p.bevelDark} !important;
  border-right-color: ${p.bevelDark} !important;
}

/* ---- sunken bevel: inputs, text areas, lists ---- */
input,
textarea,
[role="textbox"],
.list-body,
.list,
pre,
code {
  border-style: solid !important;
  border-width: 2px !important;
  border-top-color: ${p.bevelDark} !important;
  border-left-color: ${p.bevelDark} !important;
  border-bottom-color: ${p.bevelLight} !important;
  border-right-color: ${p.bevelLight} !important;
}

/* pressed = sunken, like the real thing */
button:active,
[role="button"]:active,
.action-row:active {
  border-top-color: ${p.bevelDark} !important;
  border-left-color: ${p.bevelDark} !important;
  border-bottom-color: ${p.bevelLight} !important;
  border-right-color: ${p.bevelLight} !important;
  transform: translate(1px, 1px);
}

/* ---- navy title bars: active/selected surfaces ---- */
.selected,
[aria-selected="true"],
.action-row.selected,
.navigation-tab.selected {
  background: #000080 !important;
  color: #ffffff !important;
}
.selected *,
[aria-selected="true"] * {
  color: #ffffff !important;
}
.action-row:hover:not(.selected) {
  background: ${p.surfaceHover} !important;
}

/* 3.1 focus: dotted marquee inside the control */
:focus-visible {
  outline: 1px dotted ${p.focusDot} !important;
  outline-offset: -3px;
}

/* chat transcript is the client area: no bevel, the desktop shows through */
.chat,
.chat-wrap,
.chat-view {
  background-color: transparent !important;
}

/* ---- pixel font: controls, chat bodies, the prompt ---- */
button,
[role="button"],
input,
select,
textarea,
.section-title,
.section-name,
.machine-switcher,
.action-row,
.navigation-tab,
.msg,
.formatted,
.cm-content,
.notification-message {
  font-family: ${FONT_STACK} !important;
}

/* code and terminals stay mono, whatever inherits around them */
pre,
code {
  font-family: ${MONO_STACK} !important;
}

/* ---- chunky square scrollbars ---- */
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}
::-webkit-scrollbar-track {
  background: ${p.scrollbarTrack};
}
::-webkit-scrollbar-thumb {
  background: ${p.scrollbarThumb};
  border-top: 2px solid ${p.bevelLight};
  border-left: 2px solid ${p.bevelLight};
  border-bottom: 2px solid ${p.bevelDark};
  border-right: 2px solid ${p.bevelDark};
}
::-webkit-scrollbar-corner {
  background: ${p.scrollbarTrack};
}
::-webkit-scrollbar-button:single-button {
  background: ${p.scrollbarThumb};
  border-top: 2px solid ${p.bevelLight};
  border-left: 2px solid ${p.bevelLight};
  border-bottom: 2px solid ${p.bevelDark};
  border-right: 2px solid ${p.bevelDark};
  display: block;
  height: 16px;
  width: 16px;
}

/* ---- message cards read as little 3.1 windows ---- */
.msg {
  border-style: solid !important;
  border-width: 2px !important;
  border-top-color: ${p.bevelLight} !important;
  border-left-color: ${p.bevelLight} !important;
  border-bottom-color: ${p.bevelDark} !important;
  border-right-color: ${p.bevelDark} !important;
  background: ${p.msgBg} !important;
}
.msg.user {
  background: ${p.userMsgBg} !important;
}
.msg.user,
.msg.user * {
  color: #ffffff !important;
}
/* every message gets a navy title bar */
.msg-header {
  background: #000080 !important;
  border-bottom: 2px solid ${p.bevelDark};
}
.msg-header,
.msg-header *,
.msg-meta {
  color: #ffffff !important;
}

/* ---- prompt editor: sunken input field, chunky buttons ---- */
.editor-wrap,
.markdown-editor {
  border-style: solid !important;
  border-width: 2px !important;
  border-top-color: ${p.bevelDark} !important;
  border-left-color: ${p.bevelDark} !important;
  border-bottom-color: ${p.bevelLight} !important;
  border-right-color: ${p.bevelLight} !important;
  background: ${p.fieldBg} !important;
}

/* ---- status bar, tabs, panels ---- */
.bar,
.workspace-header-strip,
.toolbar,
.tabs {
  border-style: solid !important;
  border-width: 2px !important;
  border-top-color: ${p.bevelLight} !important;
  border-left-color: ${p.bevelLight} !important;
  border-bottom-color: ${p.bevelDark} !important;
  border-right-color: ${p.bevelDark} !important;
  background: ${p.surface} !important;
}
.panel-content,
.files-panel {
  border-style: solid !important;
  border-width: 2px !important;
  border-top-color: ${p.bevelDark} !important;
  border-left-color: ${p.bevelDark} !important;
  border-bottom-color: ${p.bevelLight} !important;
  border-right-color: ${p.bevelLight} !important;
}
.conversation-meter .track {
  border-style: solid !important;
  border-width: 2px !important;
  border-top-color: ${p.bevelDark} !important;
  border-left-color: ${p.bevelDark} !important;
  border-bottom-color: ${p.bevelLight} !important;
  border-right-color: ${p.bevelLight} !important;
}

/* ---- corner brand: PI WEB wordmark with the 3.1 flag ----
   The bare <strong>PI WEB</strong> is the first child of the nav header;
   classed strongs elsewhere (notification headings) stay untouched. */
header > strong:first-child:not([class]) {
  display: inline-flex;
  align-items: center;
  font-family: ${FONT_STACK} !important;
  font-size: 13px;
  letter-spacing: 1px;
  color: #f5f5f5 !important;
}
header > strong:first-child:not([class])::before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 16px;
  margin-right: 7px;
  /* four panes of the waving flag: red/green over blue/yellow, the right
     column dropped 3px and sheared to suggest the wave */
  background:
    linear-gradient(#00c800 0 50%, #ffd800 50% 100%) 10px 3px / 8px 14px no-repeat,
    linear-gradient(#ff2b2b 0 50%, #2b6bff 50% 100%) 0 0 / 8px 14px no-repeat;
  transform: skewY(-6deg);
}

/* ---- the desktop ---- */
${p.desktop}

/* ---- selection ---- */
::selection {
  background: #000080;
  color: #ffffff;
}
`;
}

/** Document-level rules: font face and control-font vars for the active theme. */
function documentCss(themeId) {
  const attr = `html[data-pi-web-theme="${pluginId}:${themeId}"]`;
  return `
@font-face {
  font-family: "W95FA";
  src: url("${FONT_URL}") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
${attr} {
  --pi-control-font-family: ${FONT_STACK};
  --pi-control-font-size: 11px;
}
${attr} body {
  font-family: ${FONT_STACK};
}
`;
}

// ---------------------------------------------------------------------------
// Style plumbing: one <style> clone per shadow root while a theme is on.

const STYLE_MARK = "data-win31-themes";
let pluginId = "win31-themes";
let activeThemeId = null;
let debounceTimer = null;
let intervalTimer = null;
let themeObserver = null;
let domObserver = null;

const currentThemeId = () => {
  const attr = document.documentElement.dataset.piWebTheme;
  if (attr === `${pluginId}:${THEME_OLED}`) return THEME_OLED;
  if (attr === `${pluginId}:${THEME_CLASSIC}`) return THEME_CLASSIC;
  return null;
};

function styleElement(css) {
  const style = document.createElement("style");
  style.setAttribute(STYLE_MARK, "1");
  style.textContent = css;
  return style;
}

function allShadowRoots(root, out = []) {
  for (const el of root.querySelectorAll("*")) {
    if (el.shadowRoot) {
      out.push(el.shadowRoot);
      allShadowRoots(el.shadowRoot, out);
    }
  }
  return out;
}

function syncRoot(root, css, docCss) {
  const existing = root.querySelector(`style[${STYLE_MARK}]`);
  const content = root === document ? css + docCss : css;
  if (existing) {
    // Only touch the DOM when the sheet actually changed: rewriting
    // textContent unconditionally would re-fire our own observer forever.
    if (existing.textContent !== content) existing.textContent = content;
    return;
  }
  if (root === document) {
    document.head.appendChild(styleElement(content));
    return;
  }
  root.appendChild(styleElement(content));
}

function clearRoot(root) {
  for (const style of root.querySelectorAll(`style[${STYLE_MARK}]`)) {
    style.remove();
  }
}

function scan() {
  if (activeThemeId === null) return;
  const css = chromeCss(activeThemeId);
  const docCss = documentCss(activeThemeId);
  syncRoot(document, css, docCss);
  for (const shadow of allShadowRoots(document)) syncRoot(shadow, css, docCss);
}

function scheduleScan() {
  if (debounceTimer !== null || activeThemeId === null) return;
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    scan();
  }, 400);
}

function activate() {
  scan();
  // attachShadow is unobservable, so: DOM mutations rescan soon (debounced),
  // and a slow interval catches shadow roots that appear without any
  // light-DOM change.
  domObserver = new MutationObserver(scheduleScan);
  domObserver.observe(document, { childList: true, subtree: true });
  intervalTimer = setInterval(scan, 2500);
}

function deactivate() {
  clearTimeout(debounceTimer);
  debounceTimer = null;
  clearInterval(intervalTimer);
  intervalTimer = null;
  domObserver?.disconnect();
  domObserver = null;
  clearRoot(document);
  for (const shadow of allShadowRoots(document)) clearRoot(shadow);
}

function syncActivation() {
  const next = currentThemeId();
  const was = activeThemeId;
  if (next === was) return;
  activeThemeId = next;
  if (was === null && next !== null) activate();
  else if (was !== null && next === null) deactivate();
  else scan(); // switched between our two themes: retheme every root
}

const plugin = {
  apiVersion: 2,
  name: "Windows 3.1 Themes",
  activate: ({ pluginId: id }) => {
    if (typeof id === "string" && id !== "") pluginId = id;
    syncActivation();
    themeObserver = new MutationObserver(syncActivation);
    themeObserver.observe(document.documentElement, { attributes: true });
    return {
      contributions: {
        themes: [
          {
            id: THEME_OLED,
            name: "Windows 3.1 OLED",
            description:
              "Windows 3.1 beveled chrome on pure OLED black: navy title bars, silver text, dithered desktop, pixel font.",
            order: 15,
            colorScheme: "dark",
            tokens: tokens[THEME_OLED],
          },
          {
            id: THEME_CLASSIC,
            name: "Windows 3.1 Classic",
            description:
              "The authentic 3.1 system palette: teal desktop, silver chrome, navy title bars, MS-DOS terminal.",
            order: 16,
            colorScheme: "light",
            tokens: tokens[THEME_CLASSIC],
          },
        ],
        themePairs: [
          {
            id: PAIR_ID,
            name: "Windows 3.1 (auto light/dark)",
            description:
              "Follows the system: light uses the Classic palette, dark uses OLED.",
            order: 14,
            light: THEME_CLASSIC,
            dark: THEME_OLED,
          },
        ],
      },
    };
  },
};

export default plugin;