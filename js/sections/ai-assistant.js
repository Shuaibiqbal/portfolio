import { ICONS } from '../utils/icons.js';

export async function renderAiAssistant() {
  const container = document.getElementById('section-ai-assistant');
  if (!container) return;
  const d = await fetch('data/ai-assistant.json').then(r => r.json());

  const pillsHtml = d.suggestions.map(s =>
    `<button class="pill" data-q="${s.q}">${s.label}</button>`
  ).join('');

  container.innerHTML = `
    <section class="section dark ai-assistant-section" id="ai-assistant">
      <div class="container">
        <div class="ai-header">
          <div class="ai-header-badge">
            ${ICONS.monitor}
            ${d.badge}
          </div>
          <h2 class="section-title">${d.title} <span class="accent">${d.titleAccent}</span></h2>
          <p class="section-desc">${d.subtitle}</p>
        </div>
        <div class="ai-chat-container">
          <div class="ai-suggestions">
            <span class="suggestions-label">Quick Questions:</span>
            <div class="suggestions-pills">${pillsHtml}</div>
          </div>
          <div class="ai-messages" id="aiMessages">
            <div class="message message-bot">
              <div class="message-avatar">${ICONS.monitor}</div>
              <div class="message-bubble"><p>${d.welcomeMessage}</p></div>
            </div>
          </div>
          <div class="ai-input-row">
            <div class="ai-input-wrapper">
              <input type="text" id="aiInput" class="ai-input"
                     placeholder="${d.inputPlaceholder}"
                     autocomplete="off" maxlength="300">
              <button class="ai-send-btn" id="aiSendBtn" aria-label="Send">
                ${ICONS.send}
              </button>
            </div>
            <p class="ai-disclaimer">${d.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>`;
}

export function initAiAssistant() {
  const input    = document.getElementById('aiInput');
  const sendBtn  = document.getElementById('aiSendBtn');
  const messages = document.getElementById('aiMessages');
  const pills    = document.querySelectorAll('.pill');

  if (!input || !sendBtn || !messages) return;

  const BACKEND_URL = window.AI_BACKEND_URL || 'http://localhost:8000';

  let chatHistory   = [];
  let offTopicCount = 0;

  function botAvatarSvg()  { return ICONS.monitor; }
  function userAvatarSvg() { return ICONS.user; }

  function scrollToBottom() { messages.scrollTop = messages.scrollHeight; }

  function createAvatar(role) {
    const el = document.createElement('div');
    el.className = 'message-avatar';
    el.innerHTML = role === 'user' ? userAvatarSvg() : botAvatarSvg();
    return el;
  }

  function appendMessage(role, html, isError = false) {
    const wrap = document.createElement('div');
    wrap.className = `message message-${role}${isError ? ' message-error' : ''}`;
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = `<p>${html}</p>`;
    wrap.appendChild(createAvatar(role));
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    scrollToBottom();
    return wrap;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'message message-bot';
    wrap.id = 'typingMsg';
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = `<div class="typing-indicator">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>`;
    wrap.appendChild(createAvatar('bot'));
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    scrollToBottom();
  }

  function removeTyping() { document.getElementById('typingMsg')?.remove(); }

  function setLoading(on) {
    input.disabled = sendBtn.disabled = on;
    sendBtn.style.opacity = on ? '0.5' : '';
    if (!on) input.focus();
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function formatAnswer(text) {
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  async function sendMessage(question) {
    question = question.trim();
    if (!question) return;

    input.value = '';
    appendMessage('user', escapeHtml(question));
    chatHistory.push({ role: 'user', content: question });
    setLoading(true);
    showTyping();

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history: chatHistory.slice(-10), off_topic_count: offTopicCount }),
      });
      removeTyping();
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        appendMessage('bot', err.detail || 'Sorry, something went wrong.', true);
        return;
      }
      const data     = await res.json();
      const answer   = data.answer || 'I could not find a relevant answer.';
      offTopicCount  = data.off_topic_count ?? offTopicCount;
      chatHistory.push({ role: 'assistant', content: answer });
      appendMessage('bot', formatAnswer(answer));
    } catch (err) {
      removeTyping();
      appendMessage('bot', 'Could not reach the AI backend. Make sure the server is running.', true);
      console.error('[AI Assistant]', err);
    } finally {
      setLoading(false);
    }
  }

  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
  });
  pills.forEach(pill => pill.addEventListener('click', () => sendMessage(pill.dataset.q)));
}
