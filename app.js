const STORAGE_KEY = 'simple-korean-note';
const STICKY_STORAGE_KEY = 'simple-korean-sticky-notes';

const note = document.querySelector('#note');
const keyboard = document.querySelector('#keyboard');
const stickyNotesElement = document.querySelector('#sticky-notes');
const addStickyButton = document.querySelector('#add-sticky-button');
const newStoryButton = document.querySelector('#new-story-button');
const mainNoteButton = document.querySelector('#main-note-button');
const saveStatus = document.querySelector('#save-status');
const characterCount = document.querySelector('#character-count');
const toast = document.querySelector('#toast');

const L = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const V = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
const syllableVowels = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const T = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const physicalKeys = {
  KeyR: { normal: ['L', 'ㄱ'], shifted: ['L', 'ㄲ'] },
  KeyS: { normal: ['L', 'ㄴ'] },
  KeyE: { normal: ['L', 'ㄷ'], shifted: ['L', 'ㄸ'] },
  KeyF: { normal: ['L', 'ㄹ'] },
  KeyA: { normal: ['L', 'ㅁ'] },
  KeyQ: { normal: ['L', 'ㅂ'], shifted: ['L', 'ㅃ'] },
  KeyT: { normal: ['L', 'ㅅ'], shifted: ['L', 'ㅆ'] },
  KeyD: { normal: ['L', 'ㅇ'] },
  KeyW: { normal: ['L', 'ㅈ'], shifted: ['L', 'ㅉ'] },
  KeyC: { normal: ['L', 'ㅊ'] },
  KeyZ: { normal: ['L', 'ㅋ'] },
  KeyX: { normal: ['L', 'ㅌ'] },
  KeyV: { normal: ['L', 'ㅍ'] },
  KeyG: { normal: ['L', 'ㅎ'] },
  KeyK: { normal: ['V', 'ㅏ'] },
  KeyO: { normal: ['V', 'ㅐ'], shifted: ['V', 'ㅒ'] },
  KeyI: { normal: ['V', 'ㅑ'] },
  KeyJ: { normal: ['V', 'ㅓ'] },
  KeyP: { normal: ['V', 'ㅔ'], shifted: ['V', 'ㅖ'] },
  KeyU: { normal: ['V', 'ㅕ'] },
  KeyH: { normal: ['V', 'ㅗ'] },
  KeyY: { normal: ['V', 'ㅛ'] },
  KeyN: { normal: ['V', 'ㅜ'] },
  KeyB: { normal: ['V', 'ㅠ'] },
  KeyM: { normal: ['V', 'ㅡ'] },
  KeyL: { normal: ['V', 'ㅣ'] },
};

const vowelCombinations = {
  'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ',
};

const finalCombinations = {
  'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ',
  'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ', 'ㅂㅅ': 'ㅄ',
};

const keyboardRows = [
  [{ jamo: 'ㅂ', key: 'q', shift: 'ㅃ' }, { jamo: 'ㅈ', key: 'w', shift: 'ㅉ' }, { jamo: 'ㄷ', key: 'e', shift: 'ㄸ' }, { jamo: 'ㄱ', key: 'r', shift: 'ㄲ' }, { jamo: 'ㅅ', key: 't', shift: 'ㅆ' }, { jamo: 'ㅛ', key: 'y' }, { jamo: 'ㅕ', key: 'u' }, { jamo: 'ㅑ', key: 'i' }, { jamo: 'ㅐ', key: 'o', shift: 'ㅒ' }, { jamo: 'ㅔ', key: 'p', shift: 'ㅖ' }],
  [{ jamo: 'ㅁ', key: 'a' }, { jamo: 'ㄴ', key: 's' }, { jamo: 'ㅇ', key: 'd' }, { jamo: 'ㄹ', key: 'f' }, { jamo: 'ㅎ', key: 'g' }, { jamo: 'ㅗ', key: 'h' }, { jamo: 'ㅓ', key: 'j' }, { jamo: 'ㅏ', key: 'k' }, { jamo: 'ㅣ', key: 'l' }],
  [{ jamo: 'ㅋ', key: 'z' }, { jamo: 'ㅌ', key: 'x' }, { jamo: 'ㅊ', key: 'c' }, { jamo: 'ㅍ', key: 'v' }, { jamo: 'ㅠ', key: 'b' }, { jamo: 'ㅜ', key: 'n' }, { jamo: 'ㅡ', key: 'm' }],
];

let composition = null;
let saveTimer;
let keyboardShifted = false;
let activeStickyId = null;
let stickyNotes = readStickyNotes();
let stickyColorIndex = stickyNotes.length;
let shouldAutoCreateStory = false;

function readSavedValue(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function readStickyNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STICKY_STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.map((sticky, index) => ({
      ...sticky,
      side: sticky.side || (index % 2 === 0 ? 'left' : 'right'),
      top: Number.isFinite(sticky.top) ? sticky.top : 105 + index * 128,
    })) : [];
  } catch {
    return [];
  }
}

function saveStickyNotes() {
  try {
    localStorage.setItem(STICKY_STORAGE_KEY, JSON.stringify(stickyNotes));
  } catch {
    saveStatus.textContent = '저장할 수 없음';
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function updateStickyPreview(id, value) {
  const preview = stickyNotesElement.querySelector(`[data-preview-id="${id}"]`);
  if (preview) preview.textContent = value.trim() || '빈 메모';
}

function renderStickyNotes() {
  mainNoteButton.classList.toggle('active', activeStickyId === null);
  stickyNotesElement.innerHTML = stickyNotes.map((sticky) => `
    <article class="sticky-card sticky-${sticky.color} ${activeStickyId === sticky.id ? 'active' : ''}" data-card-id="${sticky.id}">
      <button class="sticky-open" type="button" data-open-id="${sticky.id}">
        <span class="sticky-preview" data-preview-id="${sticky.id}">${escapeHtml(sticky.text.trim() || '빈 메모')}</span>
        <small>메모</small>
      </button>
      <button class="sticky-delete" type="button" data-delete-id="${sticky.id}" aria-label="메모 삭제">×</button>
    </article>
  `).join('');

  stickyNotes.forEach((sticky) => {
    const card = stickyNotesElement.querySelector(`[data-card-id="${sticky.id}"]`);
    if (card) applyStickyPosition(card, sticky);
  });
}

function applyStickyPosition(card, sticky) {
  card.style.top = `${sticky.top}px`;
  card.style.left = sticky.side === 'left' ? '0' : 'auto';
  card.style.right = sticky.side === 'right' ? '0' : 'auto';
}

function saveCurrentNote(targetId = activeStickyId, value = note.value) {
  if (targetId === null) {
    localStorage.setItem(STORAGE_KEY, value);
    return;
  }

  const sticky = stickyNotes.find((item) => item.id === targetId);
  if (!sticky) return;
  sticky.text = value;
  saveStickyNotes();
  updateStickyPreview(targetId, value);
}

function createStickyRecord() {
  const sticky = {
    id: `sticky-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    text: '',
    color: ['yellow', 'pink', 'blue', 'green'][stickyColorIndex % 4],
    side: Math.random() < 0.5 ? 'left' : 'right',
    top: 105 + Math.floor(Math.random() * 220),
  };
  stickyColorIndex += 1;
  return sticky;
}

function ensureStoryForMainNote() {
  if (activeStickyId !== null || !shouldAutoCreateStory || !note.value.trim()) return;

  const sticky = createStickyRecord();
  stickyNotes.push(sticky);
  activeStickyId = sticky.id;
  shouldAutoCreateStory = false;
  saveStickyNotes();
  renderStickyNotes();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('visible'), 1800);
}

function updateCounts() {
  characterCount.textContent = `${note.value.replace(/\s/g, '').length.toLocaleString('ko-KR')}자`;
}

function save() {
  ensureStoryForMainNote();
  saveStatus.textContent = '저장 중...';
  const targetId = activeStickyId;
  const value = note.value;
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      saveCurrentNote(targetId, value);
      saveStatus.textContent = '저장됨';
    } catch {
      saveStatus.textContent = '저장할 수 없음';
    }
  }, 300);
}

function setText(value, caret = value.length) {
  note.value = value;
  note.setSelectionRange(caret, caret);
  updateCounts();
  save();
}

function composeSyllable(initial, vowel, final = '') {
  const initialIndex = L.indexOf(initial);
  const vowelIndex = syllableVowels.indexOf(vowel);
  const finalIndex = T.indexOf(final);
  if (initialIndex < 0 || vowelIndex < 0 || finalIndex < 0) return '';
  return String.fromCharCode(0xac00 + ((initialIndex * 21 + vowelIndex) * 28) + finalIndex);
}

function replaceComposition(value, start, end) {
  const before = note.value.slice(0, start);
  const after = note.value.slice(end);
  setText(before + value + after, start + value.length);
}

function beginComposition(type, value) {
  const start = note.selectionStart;
  const end = note.selectionEnd;
  composition = { start, value, initial: type === 'L' ? value : '', vowel: type === 'V' ? value : '', final: '' };
  replaceComposition(value, start, end);
}

function commitComposition() {
  composition = null;
}

function updateComposition(next) {
  const end = composition.start + composition.value.length;
  composition = { ...composition, ...next };
  composition.value = composition.initial && composition.vowel
    ? composeSyllable(composition.initial, composition.vowel, composition.final)
    : composition.initial || composition.vowel;
  replaceComposition(composition.value, composition.start, end);
}

function insertPlain(value) {
  commitComposition();
  const start = note.selectionStart;
  const end = note.selectionEnd;
  replaceComposition(value, start, end);
}

function processJamo(type, value) {
  if (!composition) {
    beginComposition(type, value);
    return;
  }

  if (type === 'V') {
    if (!composition.vowel) {
      if (composition.initial) {
        updateComposition({ vowel: value });
      } else {
        updateComposition({ vowel: value });
      }
      return;
    }

    const combinedVowel = vowelCombinations[composition.vowel + value];
    if (combinedVowel && !composition.final) {
      updateComposition({ vowel: combinedVowel });
      return;
    }

    if (composition.final) {
      const final = composition.final;
      const movableFinal = final.length === 1 ? final : final[0];
      const remainingFinal = final.length === 1 ? '' : final.slice(1);
      updateComposition({ final: remainingFinal });
      const insertionPoint = composition.start + composition.value.length;
      commitComposition();
      note.setSelectionRange(insertionPoint, insertionPoint);
      beginComposition('L', movableFinal);
      processJamo('V', value);
      return;
    }

    commitComposition();
    note.setSelectionRange(note.selectionStart, note.selectionStart);
    beginComposition('V', value);
    return;
  }

  if (!composition.initial) {
    if (composition.vowel) {
      commitComposition();
      beginComposition('L', value);
    } else {
      beginComposition('L', value);
    }
    return;
  }

  if (!composition.vowel) {
    commitComposition();
    beginComposition('L', value);
    return;
  }

  if (!composition.final) {
    updateComposition({ final: value });
    return;
  }

  const combinedFinal = finalCombinations[composition.final + value];
  if (combinedFinal) {
    updateComposition({ final: combinedFinal });
  } else {
    commitComposition();
    beginComposition('L', value);
  }
}

function handleBackspace(event) {
  if (!composition) return;
  event.preventDefault();
  if (composition.final) {
    updateComposition({ final: composition.final.length > 1 ? composition.final[0] : '' });
  } else if (composition.vowel) {
    updateComposition({ vowel: '', initial: composition.initial });
  } else {
    const start = composition.start;
    const end = start + composition.value.length;
    composition = null;
    replaceComposition('', start, end);
  }
}

function renderKeyboard() {
  keyboard.innerHTML = keyboardRows.map((row) => `
    <div class="key-row">
      ${row.map(({ jamo, key, shift }) => {
        const displayedJamo = keyboardShifted && shift ? shift : jamo;
        return `
        <button class="key" type="button" data-jamo="${displayedJamo}" data-key="${key}">
          <span>${displayedJamo}</span><small>${key}</small>
        </button>
      `; }).join('')}
    </div>
  `).join('') + `
    <div class="key-row bottom-row">
      <button class="key shift-key ${keyboardShifted ? 'pressed' : ''}" type="button" data-shift="true">Shift</button>
      <button class="key space-key" type="button" data-plain=" ">스페이스</button>
      <button class="key punctuation-key" type="button" data-plain=".">.</button>
      <button class="key punctuation-key" type="button" data-plain=",">,</button>
    </div>
  `;
}

function openSticky(id) {
  const sticky = stickyNotes.find((item) => item.id === id);
  if (!sticky) return;
  commitComposition();
  saveCurrentNote();
  activeStickyId = sticky.id;
  setText(sticky.text);
  renderStickyNotes();
  note.focus();
}

function openMainNote() {
  if (activeStickyId === null) return;
  commitComposition();
  saveCurrentNote();
  activeStickyId = null;
  shouldAutoCreateStory = false;
  setText(readSavedValue(STORAGE_KEY, ''));
  shouldAutoCreateStory = !note.value.trim();
  renderStickyNotes();
  note.focus();
}

function addStickyNote() {
  const sticky = createStickyRecord();
  stickyNotes.push(sticky);
  saveStickyNotes();
  shouldAutoCreateStory = false;
  openSticky(sticky.id);
  showToast('새 이야기를 만들었어요');
}

function copyNote() {
  const text = note.value.trim();
  const fallbackCopy = () => {
    note.focus();
    note.select();
    document.execCommand('copy');
    showToast('노트를 클립보드에 복사했어요');
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('노트를 클립보드에 복사했어요'))
      .catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}

note.value = readSavedValue(STORAGE_KEY, '');
shouldAutoCreateStory = !note.value.trim();
document.querySelector('#date-line').textContent = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}).format(new Date());
updateCounts();
renderKeyboard();
renderStickyNotes();

note.addEventListener('input', () => {
  composition = null;
  updateCounts();
  save();
});

note.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace' && composition) {
    handleBackspace(event);
    return;
  }
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
    commitComposition();
  }
  if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return;
  const mappedKey = physicalKeys[event.code];
  const mapped = mappedKey?.[event.shiftKey && mappedKey.shifted ? 'shifted' : 'normal'];
  if (!mapped) return;
  event.preventDefault();
  processJamo(mapped[0], mapped[1]);
});

note.addEventListener('blur', commitComposition);

keyboard.addEventListener('mousedown', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  event.preventDefault();
  if (button.dataset.shift) {
    keyboardShifted = !keyboardShifted;
    renderKeyboard();
    note.focus();
    return;
  }
  note.focus();
  if (button.dataset.plain) {
    insertPlain(button.dataset.plain);
    return;
  }
  processJamo(V.includes(button.dataset.jamo) ? 'V' : 'L', button.dataset.jamo);
});

document.querySelector('#copy-button').addEventListener('click', copyNote);
newStoryButton.addEventListener('click', addStickyNote);
document.querySelector('#clear-button').addEventListener('click', () => {
  if (!note.value) return;
  if (!window.confirm('이 노트를 모두 지울까요?')) return;
  composition = null;
  if (activeStickyId === null) shouldAutoCreateStory = false;
  setText('');
  if (activeStickyId === null) shouldAutoCreateStory = true;
  note.focus();
});

addStickyButton.addEventListener('click', addStickyNote);
mainNoteButton.addEventListener('click', openMainNote);

stickyNotesElement.addEventListener('click', (event) => {
  if (suppressStickyClick) {
    suppressStickyClick = false;
    return;
  }

  const openButton = event.target.closest('[data-open-id]');
  const deleteButton = event.target.closest('[data-delete-id]');

  if (openButton) {
    openSticky(openButton.dataset.openId);
    return;
  }

  if (deleteButton) {
    const id = deleteButton.dataset.deleteId;
    stickyNotes = stickyNotes.filter((sticky) => sticky.id !== id);
    saveStickyNotes();
    if (activeStickyId === id) openMainNote();
    renderStickyNotes();
  }
});

let dragState = null;
let suppressStickyClick = false;

stickyNotesElement.addEventListener('pointerdown', (event) => {
  const card = event.target.closest('.sticky-card');
  if (!card || event.target.closest('.sticky-delete')) return;

  const sticky = stickyNotes.find((item) => item.id === card.dataset.cardId);
  if (!sticky) return;

  const rect = card.getBoundingClientRect();
  dragState = {
    id: sticky.id,
    card,
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
  };
  card.classList.add('dragging');
});

document.addEventListener('pointermove', (event) => {
  if (!dragState || event.pointerId !== dragState.pointerId) return;

  const distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
  if (distance > 5) {
    dragState.moved = true;
    suppressStickyClick = true;
    dragState.card.classList.add('dragging');
  }
  if (!dragState.moved) return;

  const sticky = stickyNotes.find((item) => item.id === dragState.id);
  if (!sticky) return;

  const container = document.querySelector('.content-layout').getBoundingClientRect();
  const cardWidth = dragState.card.offsetWidth;
  const cardHeight = dragState.card.offsetHeight;
  const maxTop = Math.max(0, document.querySelector('.content-layout').scrollHeight - cardHeight);
  const nextTop = Math.max(0, Math.min(maxTop, event.clientY - container.top - dragState.offsetY));
  sticky.side = event.clientX < container.left + container.width / 2 ? 'left' : 'right';
  sticky.top = nextTop;
  applyStickyPosition(dragState.card, sticky);
});

document.addEventListener('pointerup', (event) => {
  if (!dragState || event.pointerId !== dragState.pointerId) return;

  const sticky = stickyNotes.find((item) => item.id === dragState.id);
  if (sticky && dragState.moved) saveStickyNotes();
  dragState.card.classList.remove('dragging');
  dragState = null;
});

document.querySelector('#keyboard-toggle').addEventListener('click', (event) => {
  const shouldShow = keyboard.hidden;
  keyboard.hidden = !shouldShow;
  event.currentTarget.textContent = shouldShow ? '자판 숨기기' : '자판 보이기';
  event.currentTarget.setAttribute('aria-expanded', String(shouldShow));
});
