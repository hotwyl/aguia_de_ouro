/**
 * Adivinhe a Palavra - Core Game Logic
 */
const JogoAdivinhe = (() => {
    const palavrasDB = [
        { word: 'JESUS', hint: 'O Filho de Deus, Salvador da humanidade.' },
        { word: 'A BIBLIA', hint: 'O livro sagrado do cristianismo.' },
        { word: 'MOISES', hint: 'Liderou o povo de Israel pelo Mar Vermelho.' },
        { word: 'NOE', hint: 'Construiu a arca para se salvar do dilúvio.' },
        { word: 'DAVI', hint: 'O rei pastor, derrotou Golias.' },
        { word: 'PEDRO', hint: 'Apóstolo que andou sobre as águas.' },
        { word: 'PAULO', hint: 'Apóstolo dos gentios, escreveu muitas epístolas.' },
        { word: 'ESPIRITO SANTO', hint: 'O Consolador prometido por Jesus.' }
    ];

    const MAX_LIVES = 6;
    let state = {
        currentWord: '',
        normalizedWord: '',
        hint: '',
        guessedLetters: new Set(),
        wrongGuesses: 0,
        score: 0,
        gameOver: false
    };

    const elHint = document.getElementById('game-hint');
    const elScore = document.getElementById('game-score');
    const elLives = document.getElementById('game-lives');
    const elWordDisplay = document.getElementById('word-display');
    const elKeyboard = document.getElementById('virtual-keyboard');
    const btnRestart = document.getElementById('btn-restart');
    const btnHint = document.getElementById('btn-hint');

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function init() {
        if (!elWordDisplay || !elKeyboard) return;
        loadSavedScore();
        setupKeyboard();
        bindEvents();
        startNewRound();
    }

    function startNewRound() {
        state.guessedLetters.clear();
        state.wrongGuesses = 0;
        state.gameOver = false;
        
        const randomItem = palavrasDB[Math.floor(Math.random() * palavrasDB.length)];
        state.currentWord = randomItem.word.toUpperCase();
        state.normalizedWord = removeAccents(state.currentWord);
        state.hint = randomItem.hint;

        // Auto-guess spaces or hyphens so they are already revealed
        state.normalizedWord.split('').forEach(char => {
            if (!/[A-Z]/.test(char)) {
                state.guessedLetters.add(char);
            }
        });

        if (elHint) elHint.textContent = state.hint;
        updateUI();
    }

    function loadSavedScore() {
        const savedScore = sessionStorage.getItem('adivinhe_score');
        if (savedScore) {
            state.score = parseInt(savedScore, 10) || 0;
            if (elScore) elScore.textContent = state.score;
        }
    }

    function saveScore() {
        sessionStorage.setItem('adivinhe_score', state.score);
        if (elScore) elScore.textContent = state.score;
    }

    function bindEvents() {
        if (btnRestart) {
            btnRestart.onclick = () => {
                state.score = 0;
                saveScore();
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
            btn.className = 'w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-bold text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
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
        renderLives();
        if (elScore) elScore.textContent = state.score;
        checkWinCondition();
    }

    function renderWord() {
        elWordDisplay.innerHTML = '';
        const wordArray = state.currentWord.split('');
        const normArray = state.normalizedWord.split('');
        
        wordArray.forEach((originalLetter, index) => {
            const normLetter = normArray[index];
            const isGuessed = state.guessedLetters.has(normLetter);
            const isAlpha = /[A-Z]/.test(normLetter);
            
            const box = document.createElement('div');
            
            if (isAlpha) {
                box.className = `w-10 h-12 sm:w-14 sm:h-16 flex items-center justify-center text-xl sm:text-3xl font-bold uppercase rounded-xl border-2 shadow-sm ${isGuessed ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 bg-gray-100 text-transparent'}`;
                box.textContent = isGuessed ? originalLetter : '_';
            } else {
                box.className = `w-4 sm:w-6 h-12 sm:h-16 flex items-center justify-center text-xl sm:text-3xl font-bold uppercase text-gray-400`;
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
                btn.className = 'w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-bold text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
            }
        });
    }

    function renderLives() {
        elLives.innerHTML = '';
        const livesLeft = MAX_LIVES - state.wrongGuesses;
        
        for (let i = 0; i < MAX_LIVES; i++) {
            const heart = document.createElement('i');
            heart.className = i < livesLeft ? 'fa-solid fa-heart text-red-500 text-lg sm:text-xl transform scale-110' : 'fa-regular fa-heart text-gray-300 text-lg sm:text-xl';
            elLives.appendChild(heart);
        }
    }

    function handleGuess(letter) {
        if (state.guessedLetters.has(letter)) return;
        state.guessedLetters.add(letter);
        
        if (!state.normalizedWord.includes(letter)) {
            state.wrongGuesses++;
        }
        
        updateUI();
    }

    function checkWinCondition() {
        if (state.gameOver) return;

        const normArray = state.normalizedWord.split('');
        const isWin = normArray.every(l => state.guessedLetters.has(l));
        const isLoss = state.wrongGuesses >= MAX_LIVES;

        if (isWin) {
            state.gameOver = true;
            state.score += 50 + (MAX_LIVES - state.wrongGuesses) * 10;
            saveScore();
            showResultDialog(true, 'Parabéns!', `Você acertou: <strong>${state.currentWord}</strong>`);
        } else if (isLoss) {
            state.gameOver = true;
            showResultDialog(false, 'Fim de Jogo', `A palavra era: <strong>${state.currentWord}</strong>`);
        }
    }

    function showResultDialog(won, title, text) {
        if (globalThis.Swal) {
            Swal.fire({
                title: title,
                html: text,
                icon: won ? 'success' : 'error',
                confirmButtonText: 'Próxima Palavra',
                confirmButtonColor: '#3b82f6', 
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

document.addEventListener('DOMContentLoaded', () => JogoAdivinhe.init());