const STORAGE_KEY = 'simple-korean-note';
const TITLE_KEY = 'simple-korean-note-title';

const note = document.querySelector('#note');
const title = document.querySelector('#title');
const keyboard = document.querySelector('#keyboard');
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

function readSavedValue(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
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
  saveStatus.textContent = '저장 중...';
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, note.value);
      localStorage.setItem(TITLE_KEY, title.value);
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

function copyNote() {
  const text = `${title.value.trim()}\n\n${note.value}`.trim();
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
title.value = readSavedValue(TITLE_KEY, '오늘의 기록');
document.querySelector('#date-line').textContent = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}).format(new Date());
updateCounts();
renderKeyboard();

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
title.addEventListener('input', save);

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
document.querySelector('#clear-button').addEventListener('click', () => {
  if (!note.value && title.value === '오늘의 기록') return;
  if (!window.confirm('이 노트를 모두 지울까요?')) return;
  composition = null;
  title.value = '오늘의 기록';
  setText('');
  note.focus();
});

document.querySelector('#keyboard-toggle').addEventListener('click', (event) => {
  const isOpen = keyboard.hidden;
  keyboard.hidden = isOpen;
  event.currentTarget.textContent = isOpen ? '자판 숨기기' : '자판 보이기';
  event.currentTarget.setAttribute('aria-expanded', String(isOpen));
});
