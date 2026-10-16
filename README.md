# 한글 노트

A small, frontend-only Korean writing notebook.

## Use

Open `index.html` in a browser. No server, backend, package install, or build step is required.

- Type Korean with a normal QWERTY keyboard using the 2-set layout. For example, `dkssud` becomes `안녕`.
- Hold `Shift` for double consonants: `R` → `ㄲ`, `E` → `ㄸ`, `Q` → `ㅃ`, `T` → `ㅆ`, `W` → `ㅉ`.
- Repeated unshifted consonants are not auto-converted into double letters; they stay available as final/next-syllable consonants.
- Use the on-screen keyboard if you do not remember a key.
- Click `전체 복사` to copy the title and note into another app.
- The note is saved automatically in the browser's `localStorage`.

The app is intentionally just three runtime files:

- `index.html`
- `app.js`
- `styles.css`
