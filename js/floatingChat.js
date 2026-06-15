/* ──────────────────────────────────────────────────────────────
   floatingChat.js  —  Persistent floating AI Assistant widget
   Visible on every scroll position. Independent of page section.
   ────────────────────────────────────────────────────────────── */

const MONITOR_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`;
const SEND_SVG    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
const USER_SVG    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

export async function initFloatingChat() {
  let aiData = {};
  try {
    aiData = await fetch('data/ai-assistant.json').then(r => r.json());
  } catch (_) {}

  const BACKEND = window.AI_BACKEND_URL || 'http://localhost:8000';
  let history       = [];
  let offTopicCount = 0;
  let isOpen        = false;

  /* ── BUILD DOM ─────────────────────────────────────────────── */

  // Floating trigger button
  const btn = document.createElement('button');
  btn.id        = 'fcBtn';
  btn.className = 'fc-btn';
  btn.setAttribute('aria-label', 'Open AI Assistant');
  btn.innerHTML = `${MONITOR_SVG}<span class="fc-dot"></span>`;
  document.body.appendChild(btn);

  // Chat panel
  const panel = document.createElement('div');
  panel.id        = 'fcPanel';
  panel.className = 'fc-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'AI Assistant Chat');
  panel.innerHTML = `
    <div class="fc-header">
      <div class="fc-avatar">${MONITOR_SVG}</div>
      <div class="fc-info">
        <div class="fc-name">Shuaib's AI Assistant</div>
        <div class="fc-status">Online — RAG powered</div>
      </div>
      <button class="fc-close" id="fcClose" type="button" aria-label="Close">✕</button>
    </div>
    <div class="fc-messages" id="fcMessages">
      <div class="fc-msg fc-msg-bot">
        <div class="fc-msg-avatar">${MONITOR_SVG}</div>
        <div class="fc-bubble">${aiData.welcomeMessage || "Hi! Ask me anything about Shuaib's skills, experience, or projects."}</div>
      </div>
    </div>
    <div class="fc-footer">
      <input type="text" id="fcInput" class="fc-input"
             placeholder="${aiData.inputPlaceholder || 'Ask about Shuaib...'}"
             autocomplete="off" maxlength="300">
      <button type="button" id="fcSend" class="fc-send" aria-label="Send">${SEND_SVG}</button>
    </div>`;
  document.body.appendChild(panel);

  /* ── HELPERS ───────────────────────────────────────────────── */

  const msgs   = () => document.getElementById('fcMessages');
  const input  = () => document.getElementById('fcInput');
  const sendBtn= () => document.getElementById('fcSend');

  function scrollBottom() { const m = msgs(); if (m) m.scrollTop = m.scrollHeight; }

  function addMsg(role, html, isError = false) {
    const wrap = document.createElement('div');
    wrap.className = `fc-msg fc-msg-${role}${isError ? ' fc-msg-error' : ''}`;
    const avatarSvg = role === 'bot' ? MONITOR_SVG : USER_SVG;
    // DOM always [avatar, bubble] — CSS row-reverse flips user messages visually
    wrap.innerHTML = `<div class="fc-msg-avatar">${avatarSvg}</div><div class="fc-bubble">${html}</div>`;
    msgs().appendChild(wrap);
    scrollBottom();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.id = 'fcTyping';
    el.className = 'fc-msg fc-msg-bot';
    el.innerHTML = `<div class="fc-msg-avatar">${MONITOR_SVG}</div><div class="fc-bubble"><div class="fc-typing"><span></span><span></span><span></span></div></div>`;
    msgs().appendChild(el);
    scrollBottom();
  }
  function removeTyping() { document.getElementById('fcTyping')?.remove(); }

  function setLoading(on) {
    const i = input(); const s = sendBtn();
    if (i) i.disabled = on;
    if (s) { s.disabled = on; s.style.opacity = on ? '0.4' : ''; }
  }

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function fmt(t) {
    let s = esc(t);
    // Bold **text**
    s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Inline `code`
    s = s.replace(/`([^`]+)`/g, '<code class="fc-code">$1</code>');
    // Process line by line to handle bullet lists
    const lines = s.split('\n');
    let inList  = false;
    const out   = [];
    for (const line of lines) {
      const isBullet = /^[\-\*•] /.test(line);
      if (isBullet) {
        if (!inList) { out.push('<ul class="fc-list">'); inList = true; }
        out.push(`<li>${line.replace(/^[\-\*•] /, '')}</li>`);
      } else {
        if (inList) { out.push('</ul>'); inList = false; }
        out.push(line || '&nbsp;');
      }
    }
    if (inList) out.push('</ul>');
    return out.join('<br>').replace(/<br>(<ul|<\/ul>)/g, '$1').replace(/(<\/li>)<br>/g, '$1');
  }

  /* ── SEND ──────────────────────────────────────────────────── */

  async function send(question) {
    question = (question || '').trim();
    if (!question) return;

    const inp = input();
    if (inp) inp.value = '';
    addMsg('user', esc(question));
    history.push({ role: 'user', content: question });
    setLoading(true);
    showTyping();

    try {
      const res = await fetch(`${BACKEND}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history: history.slice(-10), off_topic_count: offTopicCount }),
      });
      removeTyping();

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        addMsg('bot', err.detail || 'Something went wrong. Please try again.', true);
        return;
      }

      const data       = await res.json();
      const answer     = data.answer || 'I could not find a relevant answer.';
      offTopicCount    = data.off_topic_count ?? offTopicCount;
      history.push({ role: 'assistant', content: answer });
      addMsg('bot', fmt(answer));
    } catch (_) {
      removeTyping();
      addMsg('bot', 'Could not reach the AI backend. Please try again later.', true);
    } finally {
      setLoading(false);
    }
  }

  /* ── OPEN / CLOSE PANEL ────────────────────────────────────── */

  function openPanel() {
    panel.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    isOpen = true;
    setTimeout(() => input()?.focus(), 200);
  }

  function closePanel() {
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    isOpen = false;
  }

  /* ── EVENT LISTENERS ───────────────────────────────────────── */

  btn.addEventListener('click', () => isOpen ? closePanel() : openPanel());

  document.getElementById('fcClose').addEventListener('click', closePanel);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closePanel();
  });

  document.addEventListener('click', e => {
    if (isOpen && !panel.contains(e.target) && !btn.contains(e.target)) closePanel();
  });

  sendBtn().addEventListener('click', () => send(input()?.value));

  document.getElementById('fcInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input()?.value); }
  });
}
