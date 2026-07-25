/**
 * Caça-Palavras - Core Game Logic
 */
const JogoCacaPalavras = (() => {
    const palavrasDB = [
        "JESUS", "BÍBLIA", "FÉ", "AMOR", "PAZ", 
        "ORAÇÃO", "CÉU", "ANJO", "CRUZ", "SALVAÇÃO"
    ];

    const GRID_SIZE = 12;
    let state = {
        grid: [],
        palavrasParaEncontrar: [],
        palavrasEncontradas: new Set(),
        isDragging: false,
        startCell: null,
        currentCells: [],
        gameOver: false,
        score: 0
    };

    const elGrid = document.getElementById('grid');
    const elWordList = document.getElementById('word-list');
    const btnRestart = document.getElementById('btn-restart');

    function removeAccents(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function init() {
        if (!elGrid || !elWordList) return;
        bindEvents();
        startNewRound();
    }

    function startNewRound() {
        state.palavrasParaEncontrar = [...palavrasDB].sort(() => 0.5 - Math.random()).slice(0, 6);
        state.palavrasEncontradas.clear();
        state.gameOver = false;
        
        generateGrid();
        renderWordList();
    }

    function generateGrid() {
        state.grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
        
        state.palavrasParaEncontrar.forEach(palavra => {
            const word = removeAccents(palavra).toUpperCase();
            placeWord(word);
        });

        const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (state.grid[r][c] === '') {
                    state.grid[r][c] = letras[Math.floor(Math.random() * letras.length)];
                }
            }
        }
        
        renderGridUI();
    }

    function placeWord(word) {
        const directions = [[0, 1], [1, 0], [1, 1], [-1, 1]];
        let placed = false;

        while (!placed) {
            const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
            const r = Math.floor(Math.random() * GRID_SIZE);
            const c = Math.floor(Math.random() * GRID_SIZE);
            
            if (canPlaceWord(word, r, c, dr, dc)) {
                for (let i = 0; i < word.length; i++) {
                    state.grid[r + i * dr][c + i * dc] = word[i];
                }
                placed = true;
            }
        }
    }

    function canPlaceWord(word, r, c, dr, dc) {
        if (r + word.length * dr < -1 || r + word.length * dr > GRID_SIZE) return false;
        if (c + word.length * dc < -1 || c + word.length * dc > GRID_SIZE) return false;
        
        for (let i = 0; i < word.length; i++) {
            const nr = r + i * dr;
            const nc = c + i * dc;
            if (nr < 0 || nc < 0 || nr >= GRID_SIZE || nc >= GRID_SIZE) return false;
            const current = state.grid[nr][nc];
            if (current !== '' && current !== word[i]) return false;
        }
        return true;
    }

    function renderGridUI() {
        elGrid.innerHTML = '';
        elGrid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, minmax(0, 1fr))`;
        elGrid.style.userSelect = 'none';

        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-lg sm:text-xl font-bold bg-white border border-gray-200 rounded cursor-pointer select-none';
                cell.textContent = state.grid[r][c];
                cell.dataset.r = r;
                cell.dataset.c = c;
                elGrid.appendChild(cell);
            }
        }
    }

    function renderWordList() {
        elWordList.innerHTML = '';
        state.palavrasParaEncontrar.forEach(palavra => {
            const isFound = state.palavrasEncontradas.has(palavra);
            const li = document.createElement('li');
            li.className = `px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                isFound ? 'bg-green-100 text-green-800 line-through' : 'bg-gray-100 text-gray-700'
            }`;
            li.textContent = palavra;
            elWordList.appendChild(li);
        });
    }

    function bindEvents() {
        if (btnRestart) btnRestart.onclick = startNewRound;

        const handleDown = (e) => {
            if (state.gameOver) return;
            e.preventDefault();
            const cell = getTargetCell(e);
            if (!cell) return;
            
            state.isDragging = true;
            state.startCell = cell;
            state.currentCells = [cell];
            updateSelectionUI();
        };

        const handleMove = (e) => {
            if (!state.isDragging || state.gameOver) return;
            e.preventDefault();
            const cell = getTargetCell(e);
            if (!cell || (cell.r === state.startCell.r && cell.c === state.startCell.c)) return;

            calculatePath(state.startCell, cell);
            updateSelectionUI();
        };

        const handleUp = () => {
            if (!state.isDragging || state.gameOver) return;
            state.isDragging = false;
            checkSelection();
            state.currentCells = [];
            updateSelectionUI(true);
        };

        // Pointer Events for Mouse and Touch unified
        elGrid.addEventListener('pointerdown', handleDown, { passive: false });
        elGrid.addEventListener('pointermove', handleMove, { passive: false });
        document.addEventListener('pointerup', handleUp);
        document.addEventListener('pointercancel', handleUp);
    }

    function getTargetCell(e) {
        // Obter o elemento sob o ponteiro (dedo ou mouse)
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target && target.classList.contains('grid-cell')) {
            return {
                r: parseInt(target.dataset.r),
                c: parseInt(target.dataset.c)
            };
        }
        return null;
    }

    function calculatePath(start, end) {
        const dr = end.r - start.r;
        const dc = end.c - start.c;
        
        let stepR = dr === 0 ? 0 : dr / Math.abs(dr);
        let stepC = dc === 0 ? 0 : dc / Math.abs(dc);
        
        // Verifica se é uma linha reta (horizontal, vertical ou diagonal)
        if (Math.abs(dr) !== Math.abs(dc) && dr !== 0 && dc !== 0) {
            // Força a ser reta pegando o maior delta
            if (Math.abs(dr) > Math.abs(dc)) {
                stepC = 0; 
            } else {
                stepR = 0; 
            }
        }

        const distance = Math.max(Math.abs(dr), Math.abs(dc));
        state.currentCells = [];
        
        for (let i = 0; i <= distance; i++) {
            state.currentCells.push({
                r: start.r + (i * stepR),
                c: start.c + (i * stepC)
            });
        }
    }

    function updateSelectionUI(clearTemporary = false) {
        const cells = elGrid.querySelectorAll('.grid-cell');
        cells.forEach(el => {
            if (!el.classList.contains('found')) {
                el.classList.remove('bg-purple-200', 'text-purple-800', 'border-purple-400');
                el.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            }
        });

        if (!clearTemporary) {
            state.currentCells.forEach(({r, c}) => {
                const el = elGrid.querySelector(`.grid-cell[data-r="${r}"][data-c="${c}"]`);
                if (el && !el.classList.contains('found')) {
                    el.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
                    el.classList.add('bg-purple-200', 'text-purple-800', 'border-purple-400');
                }
            });
        }
    }

    function checkSelection() {
        if (state.currentCells.length < 2) return;

        const selectedStr = state.currentCells.map(pos => state.grid[pos.r][pos.c]).join('');
        const reversedStr = selectedStr.split('').reverse().join('');

        const foundWord = state.palavrasParaEncontrar.find(p => {
            const normP = removeAccents(p).toUpperCase();
            return !state.palavrasEncontradas.has(p) && (normP === selectedStr || normP === reversedStr);
        });

        if (foundWord) {
            state.palavrasEncontradas.add(foundWord);
            
            // Fixa as células como encontradas
            state.currentCells.forEach(({r, c}) => {
                const el = elGrid.querySelector(`.grid-cell[data-r="${r}"][data-c="${c}"]`);
                if (el) {
                    el.classList.add('found', 'bg-purple-500', 'text-white', 'border-purple-600');
                    el.classList.remove('bg-purple-200', 'text-purple-800', 'bg-white', 'border-gray-200', 'border-purple-400', 'text-gray-700');
                }
            });
            
            renderWordList();
            
            if (state.palavrasEncontradas.size === state.palavrasParaEncontrar.length) {
                state.gameOver = true;
                if(globalThis.Swal) {
                    Swal.fire({
                        title: 'Você Venceu!',
                        text: 'Encontrou todas as palavras!',
                        icon: 'success',
                        confirmButtonText: 'Jogar Novamente'
                    }).then(startNewRound);
                } else {
                    alert('Ganhou!');
                    startNewRound();
                }
            }
        }
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => JogoCacaPalavras.init());