/**
 * Jogo da Forca - Core Game Logic
 */
const JogoForca = (() => {
    const palavrasDB = [
        { word: 'BETÂNIA', hint: 'Cidade onde Lázaro foi ressuscitado.' },
        { word: 'GÓLGOTA', hint: 'Lugar onde Jesus foi crucificado (Lugar da Caveira).' },
        { word: 'APOCALIPSE', hint: 'Último livro da Bíblia, escrito por João.' },
        { word: 'SALOMÃO', hint: 'Rei conhecido por sua imensa sabedoria.' },
        { word: 'JERUSALÉM', hint: 'Cidade santa considerada o centro do povo de Israel.' },
        { word: 'ABRAÃO', hint: 'Pai de muitas nações e patriarca da fé.' },
        { word: 'JOÃO BATISTA', hint: 'Batizou Jesus no rio Jordão.' },
        { word: 'MAR VERMELHO', hint: 'O mar que foi aberto por Deus.' }
    ];

    const MAX_ERRORS = 6;
    let state = {
        currentWord: '',
        normalizedWord: '',
        hint: '',
        guessedLetters: new Set(),
        errors: 0,
        gameOver: false
    };

    const elHint = document.getElementById('game-hint');
    const elErrors = document.getElementById('game-errors');
    const elWordDisplay = document.getElementById('word-display');
    const elKeyboard = document.getElementById('virtual-keyboard');
    const btnRestart = document.getElementById('btn-restart');

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function init() {
        if (!elWordDisplay || !elKeyboard) return;
        setupKeyboard();
        bindEvents();
        startNewRound();
    }

    function startNewRound() {
        state.guessedLetters.clear();
        state.errors = 0;
        state.gameOver = false;
        
        const randomItem = palavrasDB[Math.floor(Math.random() * palavrasDB.length)];
        state.currentWord = randomItem.word.toUpperCase();
        state.normalizedWord = removeAccents(state.currentWord);
        state.hint = randomItem.hint;

        // Auto-guess spaces/hyphens
        state.normalizedWord.split('').forEach(char => {
            if (!/[A-Z]/.test(char)) {
                state.guessedLetters.add(char);
            }
        });

        if (elHint) elHint.textContent = state.hint;
        updateUI();
    }

    function bindEvents() {
        if (btnRestart) {
            btnRestart.onclick = () => {
                startNewRound();
            };
        }

        document.addEventListener('keydown', (e) => {
            if (state.gameOver) return;
            const key = removeAccents(e.key.toUpperCase());
            if (/^[A-Z]$/.test(key)) {
                handleGuess(key);
            }
        });
    }

    function setupKeyboard() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        elKeyboard.innerHTML = '';
        
        letters.forEach(letter => {
            const btn = document.createElement('button');
            btn.textContent = letter;
            btn.className = 'w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold text-sm text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
            btn.dataset.letter = letter;
            
            btn.addEventListener('click', () => {
                if (!state.gameOver) handleGuess(letter);
            });
            
            elKeyboard.appendChild(btn);
        });
    }

    function updateUI() {
        renderWord();
        renderKeyboardUI();
        renderHangman();
        if (elErrors) elErrors.textContent = state.errors;
        checkWinCondition();
    }

    function renderWord() {
        elWordDisplay.innerHTML = '';
        const wordArray = state.currentWord.split('');
        const normArray = state.normalizedWord.split('');
        
        wordArray.forEach((originalLetter, index) => {
            const normLetter = normArray[index];
            const isAlpha = /[A-Z]/.test(normLetter);
            const isGuessed = state.guessedLetters.has(normLetter) || state.gameOver;
            
            const box = document.createElement('div');
            
            if (isAlpha) {
                const borderClass = isGuessed ? (state.gameOver && !state.guessedLetters.has(normLetter) ? 'border-red-400 text-red-500' : 'border-gray-800 text-gray-900') : 'border-gray-300 text-transparent';
                box.className = `w-8 h-10 sm:w-12 sm:h-14 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase border-b-4 ${borderClass}`;
                box.textContent = isGuessed ? originalLetter : '_';
            } else {
                box.className = `w-4 h-10 sm:w-6 sm:h-14 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase text-gray-400 border-b-4 border-transparent`;
                box.textContent = originalLetter === ' ' ? '\u00A0' : originalLetter;
            }
            
            elWordDisplay.appendChild(box);
        });
    }

    function renderKeyboardUI() {
        const buttons = elKeyboard.querySelectorAll('button');
        buttons.forEach(btn => {
            const letter = btn.dataset.letter;
            if (state.guessedLetters.has(letter)) {
                btn.disabled = true;
                if (state.normalizedWord.includes(letter)) {
                    btn.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
                } else {
                    btn.classList.add('bg-gray-200', 'text-gray-400');
                }
            } else {
                btn.disabled = false;
                btn.className = 'w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold text-sm text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
            }
        });
    }

    function renderHangman() {
        for (let i = 0; i < MAX_ERRORS; i++) {
            const part = document.getElementById(`part-${i}`);
            if (part) {
                if (i < state.errors) {
                    part.classList.remove('hidden');
                } else {
                    part.classList.add('hidden');
                }
            }
        }
    }

    function handleGuess(letter) {
        if (state.guessedLetters.has(letter)) return;
        state.guessedLetters.add(letter);
        
        if (!state.normalizedWord.includes(letter)) {
            state.errors++;
        }
        
        updateUI();
    }

    function checkWinCondition() {
        if (state.gameOver) return;

        const normArray = state.normalizedWord.split('');
        const isWin = normArray.every(l => state.guessedLetters.has(l));
        const isLoss = state.errors >= MAX_ERRORS;

        if (isWin) {
            state.gameOver = true;
            showResultDialog(true, 'Excelente!', `A palavra era: <strong>${state.currentWord}</strong>`);
        } else if (isLoss) {
            state.gameOver = true;
            showResultDialog(false, 'Enforcado!', `A palavra correta era: <strong>${state.currentWord}</strong>`);
        }
    }

    function showResultDialog(won, title, text) {
        if (globalThis.Swal) {
            Swal.fire({
                title: title,
                html: text,
                icon: won ? 'success' : 'error',
                confirmButtonText: 'Jogar Novamente',
                confirmButtonColor: '#f97316', 
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) startNewRound();
            });
        } else {
            alert(`${title}\n${text.replace(/<[^>]*>?/gm, '')}`);
            startNewRound();
        }
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => JogoForca.init());