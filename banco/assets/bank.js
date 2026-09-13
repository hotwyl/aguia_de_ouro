/* ===========================================================================
   Desbrava Bank — lógica de simulação local (localStorage)
   Moedas: Desbravito (DBV, comum) e Águia Power (AGP, premium)
   Sem backend. Tudo roda no navegador. Fins educativos/gamificados.
   =========================================================================== */
(function () {
  'use strict';

  const STORE_KEY = 'desbravaBank_v1';
  const DIRETORIA_PIN = '2025'; // PIN client-side (apenas gamificação, não é segurança real)
  const FEE = 0.02;             // taxa de 2% no câmbio

  // ---- Estado padrão --------------------------------------------------------
  function defaultState() {
    return {
      activeAccount: 'Desbravador',
      accounts: {
        'Desbravador': { dbv: 1000, agp: 5 }
      },
      tx: [],           // extrato: {t, kind, desc, dbv, agp}
      auctions: seedAuctions(),
      seededMarket: true
    };
  }

  function seedAuctions() {
    // Leilões fictícios com lances iniciais simulados
    const now = Date.now();
    return [
      { id: 'a1', title: 'Lenço de Campori 2024', icon: 'fa-ribbon', cur: 'dbv', bid: 320, minInc: 20, bidder: 'Unidade Falcão', ends: now + 3*864e5 },
      { id: 'a2', title: 'Kit de Especialidades (10)', icon: 'fa-award', cur: 'dbv', bid: 540, minInc: 30, bidder: 'Unidade Grou', ends: now + 5*864e5 },
      { id: 'a3', title: 'Barraca 4 pessoas', icon: 'fa-campground', cur: 'agp', bid: 8, minInc: 1, bidder: 'Unidade Gavião', ends: now + 2*864e5 },
      { id: 'a4', title: 'Bordado exclusivo Águia', icon: 'fa-feather', cur: 'agp', bid: 12, minInc: 1, bidder: 'Unidade Arara', ends: now + 6*864e5 },
      { id: 'a5', title: 'Vale-lanche do acampamento', icon: 'fa-burger', cur: 'dbv', bid: 90, minInc: 10, bidder: 'Unidade Bentivi', ends: now + 1*864e5 },
      { id: 'a6', title: 'Insígnia dourada rara', icon: 'fa-medal', cur: 'agp', bid: 20, minInc: 2, bidder: 'Unidade Beija-flor', ends: now + 7*864e5 }
    ];
  }

  // Itens de mercado (preço fixo, negociação direta)
  const MARKET = [
    { id: 'm1', title: 'Caderno do Desbravador', icon: 'fa-book', cur: 'dbv', price: 120 },
    { id: 'm2', title: 'Caneca do Clube', icon: 'fa-mug-hot', cur: 'dbv', price: 200 },
    { id: 'm3', title: 'Boné Águia de Ouro', icon: 'fa-hat-cowboy', cur: 'dbv', price: 350 },
    { id: 'm4', title: 'Camiseta oficial', icon: 'fa-shirt', cur: 'dbv', price: 480 },
    { id: 'm5', title: 'Patch colecionável premium', icon: 'fa-star', cur: 'agp', price: 3 },
    { id: 'm6', title: 'Troféu miniatura Águia', icon: 'fa-trophy', cur: 'agp', price: 6 }
  ];

  // ---- Persistência ---------------------------------------------------------
  let state;
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      state = raw ? JSON.parse(raw) : defaultState();
    } catch (e) { state = defaultState(); }
    if (!state.accounts) state = defaultState();
    if (!state.auctions || !state.auctions.length) state.auctions = seedAuctions();
    save();
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  function acc() { return state.accounts[state.activeAccount]; }

  // ---- Cotação semanal determinística --------------------------------------
  // A cotação (Desbravitos por 1 Águia Power) é a mesma para todos na mesma semana.
  function isoWeekKey(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - dayNum + 3);
    const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
    const week = 1 + Math.round(((d - firstThursday) / 864e5 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
    return { year: d.getUTCFullYear(), week };
  }
  // PRNG determinístico (mulberry32) a partir de uma seed inteira
  function seededRand(seed) {
    let t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      let x = t;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }
  // Cotação da Águia Power para um dado {year, week}: entre 180 e 260 DBV
  function rateFor(year, week) {
    const seed = year * 100 + week;
    const r = seededRand(seed)();
    return Math.round(180 + r * 80); // 180..260
  }
  function currentWeek() { return isoWeekKey(new Date()); }
  function currentRate() { const w = currentWeek(); return rateFor(w.year, w.week); }
  function prevWeekRef(n) {
    // retorna {year, week, rate} de n semanas atrás (aproximação por deslocamento de dias)
    const d = new Date(Date.now() - n * 7 * 864e5);
    const w = isoWeekKey(d);
    return { ...w, rate: rateFor(w.year, w.week) };
  }

  // ---- Utilitários ----------------------------------------------------------
  const fmt = (n) => Number(n).toLocaleString('pt-BR');
  const curName = (c) => c === 'agp' ? 'Águia Power' : 'Desbravito';
  const curSym = (c) => c === 'agp' ? 'AGP' : 'DBV';

  function addTx(kind, desc, ddbv, dagp) {
    state.tx.unshift({ t: Date.now(), kind, desc, dbv: ddbv || 0, agp: dagp || 0 });
    if (state.tx.length > 100) state.tx.length = 100;
  }

  function toast(title, icon) {
    Swal.fire({ toast: true, position: 'top-end', timer: 2200, showConfirmButton: false, icon: icon || 'success', title, background: document.body.classList.contains('light') ? '#fff' : '#161B22', color: document.body.classList.contains('light') ? '#1C1917' : '#F5F0E8' });
  }

  // ---- Render ---------------------------------------------------------------
  function renderBalances() {
    document.getElementById('accountName').textContent = state.activeAccount;
    document.getElementById('balDbv').textContent = fmt(acc().dbv);
    document.getElementById('balAguia').textContent = fmt(acc().agp);
  }

  function renderCotacoes() {
    const w = currentWeek();
    const rate = currentRate();
    document.getElementById('weekBadge').textContent = `Semana ${w.week}/${w.year}`;
    document.getElementById('rateAguia').textContent = fmt(rate) + ' DBV';
    const prev = prevWeekRef(1).rate;
    const diff = rate - prev;
    const chEl = document.getElementById('rateAguiaChange');
    const pct = prev ? ((diff / prev) * 100).toFixed(1) : '0.0';
    chEl.textContent = (diff >= 0 ? '▲ +' : '▼ ') + fmt(diff) + ` DBV (${pct}%)`;
    chEl.style.color = diff >= 0 ? 'var(--up)' : 'var(--down)';

    // sparkline das últimas 12 semanas
    const spark = document.getElementById('sparkAguia');
    spark.innerHTML = '';
    const rates = [];
    for (let i = 11; i >= 0; i--) rates.push(prevWeekRef(i).rate);
    const min = Math.min(...rates), max = Math.max(...rates);
    rates.forEach(rt => {
      const h = max === min ? 50 : 15 + ((rt - min) / (max - min)) * 85;
      const s = document.createElement('span');
      s.style.height = h + '%';
      spark.appendChild(s);
    });

    // histórico (últimas 6 semanas)
    const body = document.getElementById('histBody');
    body.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const cur = prevWeekRef(i);
      const before = prevWeekRef(i + 1).rate;
      const d = cur.rate - before;
      const tr = document.createElement('tr');
      tr.style.borderTop = '1px solid rgba(201,168,76,0.1)';
      tr.innerHTML = `<td class="py-2">${i === 0 ? '<strong>Atual</strong>' : 'Sem. ' + cur.week}</td>
        <td class="py-2">${fmt(cur.rate)} DBV</td>
        <td class="py-2" style="color:${d >= 0 ? 'var(--up)' : 'var(--down)'}">${d >= 0 ? '+' : ''}${fmt(d)}</td>`;
      body.appendChild(tr);
    }

    // atualiza câmbio
    document.getElementById('cambioRate').textContent = `1 Águia Power = ${fmt(rate)} Desbravitos`;
    updateCambioPreview();
  }

  function renderAuctions() {
    const grid = document.getElementById('auctionsGrid');
    grid.innerHTML = '';
    state.auctions.forEach(a => {
      const days = Math.max(0, Math.ceil((a.ends - Date.now()) / 864e5));
      const el = document.createElement('div');
      el.className = 'glass rounded-2xl p-6 card-lift';
      el.style.border = '1px solid rgba(201,168,76,0.15)';
      el.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.25)"><i class="fas ${a.icon}" style="color:var(--gold)"></i></div>
          <div><div class="font-display font-bold">${a.title}</div><div class="text-xs" style="color:var(--text-muted-dark)">Encerra em ${days} dia(s)</div></div>
        </div>
        <div class="flex justify-between items-end mb-4">
          <div><div class="text-xs" style="color:var(--text-muted-dark)">Lance atual</div><div class="stat-num text-xl font-bold" style="color:${a.cur === 'agp' ? 'var(--aguia)' : 'var(--dbv)'}">${fmt(a.bid)} ${curSym(a.cur)}</div></div>
          <div class="text-right text-xs" style="color:var(--text-muted-dark)">Maior lance:<br><strong style="color:var(--text-light)">${a.bidder}</strong></div>
        </div>
        <button onclick="Bank.bid('${a.id}')" class="btn-gold w-full py-2.5 rounded-xl text-sm font-semibold"><i class="fas fa-gavel mr-2"></i>Dar lance (+${a.minInc} ${curSym(a.cur)})</button>`;
      grid.appendChild(el);
    });
  }

  function renderMarket() {
    const grid = document.getElementById('marketGrid');
    grid.innerHTML = '';
    MARKET.forEach(m => {
      const el = document.createElement('div');
      el.className = 'glass rounded-2xl p-6 card-lift';
      el.style.border = '1px solid rgba(201,168,76,0.15)';
      el.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.25)"><i class="fas ${m.icon}" style="color:var(--gold)"></i></div>
          <div class="font-display font-bold">${m.title}</div>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="text-xs" style="color:var(--text-muted-dark)">Preço</span>
          <span class="stat-num text-lg font-bold" style="color:${m.cur === 'agp' ? 'var(--aguia)' : 'var(--dbv)'}">${fmt(m.price)} ${curSym(m.cur)}</span>
        </div>
        <button onclick="Bank.buy('${m.id}')" class="btn-outline-gold w-full py-2.5 rounded-xl text-sm font-semibold"><i class="fas fa-cart-shopping mr-2"></i>Comprar</button>`;
      grid.appendChild(el);
    });
  }

  function renderExtrato() {
    const list = document.getElementById('txList');
    if (!state.tx.length) { list.innerHTML = '<p class="text-sm text-center py-6" style="color:var(--text-muted-dark)">Nenhuma transação ainda.</p>'; return; }
    list.innerHTML = '';
    state.tx.forEach(t => {
      const dt = new Date(t.t);
      const parts = [];
      if (t.dbv) parts.push(`<span style="color:${t.dbv > 0 ? 'var(--up)' : 'var(--down)'}">${t.dbv > 0 ? '+' : ''}${fmt(t.dbv)} DBV</span>`);
      if (t.agp) parts.push(`<span style="color:${t.agp > 0 ? 'var(--up)' : 'var(--down)'}">${t.agp > 0 ? '+' : ''}${fmt(t.agp)} AGP</span>`);
      const el = document.createElement('div');
      el.className = 'flex items-center justify-between p-3 rounded-xl';
      el.style.background = 'rgba(255,255,255,0.03)';
      el.innerHTML = `<div><div class="text-sm font-medium">${t.desc}</div><div class="text-xs" style="color:var(--text-muted-dark)">${dt.toLocaleString('pt-BR')} · ${t.kind}</div></div><div class="text-sm font-semibold text-right">${parts.join('<br>') || '—'}</div>`;
      list.appendChild(el);
    });
  }

  function renderAll() { renderBalances(); renderCotacoes(); renderAuctions(); renderMarket(); renderExtrato(); }

  // ---- Ações ----------------------------------------------------------------
  function bid(id) {
    const a = state.auctions.find(x => x.id === id);
    if (!a) return;
    const cost = a.bid + a.minInc;
    if (acc()[a.cur] < cost) { toast(`Saldo insuficiente de ${curName(a.cur)}`, 'error'); return; }
    acc()[a.cur] -= cost;
    a.bid = cost;
    a.bidder = state.activeAccount;
    addTx('Leilão', `Lance em "${a.title}"`, a.cur === 'dbv' ? -cost : 0, a.cur === 'agp' ? -cost : 0);
    save(); renderAll();
    toast(`Lance dado em "${a.title}"!`);
  }

  function buy(id) {
    const m = MARKET.find(x => x.id === id);
    if (!m) return;
    if (acc()[m.cur] < m.price) { toast(`Saldo insuficiente de ${curName(m.cur)}`, 'error'); return; }
    Swal.fire({
      title: 'Confirmar compra',
      html: `Comprar <strong>${m.title}</strong> por <strong>${fmt(m.price)} ${curSym(m.cur)}</strong>?`,
      icon: 'question', showCancelButton: true, confirmButtonColor: '#C9A84C',
      confirmButtonText: 'Comprar', cancelButtonText: 'Cancelar'
    }).then(res => {
      if (!res.isConfirmed) return;
      acc()[m.cur] -= m.price;
      addTx('Compra', `Compra de "${m.title}"`, m.cur === 'dbv' ? -m.price : 0, m.cur === 'agp' ? -m.price : 0);
      save(); renderAll();
      toast('Compra realizada!');
    });
  }

  // Câmbio Desbravito <-> Águia Power
  function cambioNumbers() {
    const rate = currentRate();
    const op = document.getElementById('cambioOp').value;
    const qty = Math.max(0, Math.floor(Number(document.getElementById('cambioQty').value) || 0));
    const gross = qty * rate;
    const fee = Math.round(gross * FEE);
    return { rate, op, qty, gross, fee };
  }
  function updateCambioPreview() {
    const { op, qty, gross, fee } = cambioNumbers();
    const prev = document.getElementById('cambioPreview');
    const feeEl = document.getElementById('cambioFee');
    if (op === 'buy') {
      prev.textContent = `− ${fmt(gross + fee)} DBV  →  + ${fmt(qty)} AGP`;
    } else {
      prev.textContent = `+ ${fmt(gross - fee)} DBV  →  − ${fmt(qty)} AGP`;
    }
    feeEl.textContent = fmt(fee) + ' DBV';
  }
  function doCambio() {
    const { op, qty, gross, fee } = cambioNumbers();
    if (qty <= 0) { toast('Informe uma quantidade válida', 'warning'); return; }
    if (op === 'buy') {
      const total = gross + fee;
      if (acc().dbv < total) { toast('Desbravitos insuficientes', 'error'); return; }
      acc().dbv -= total; acc().agp += qty;
      addTx('Câmbio', `Compra de ${fmt(qty)} Águia Power`, -total, qty);
    } else {
      if (acc().agp < qty) { toast('Águias Powers insuficientes', 'error'); return; }
      const net = gross - fee;
      acc().agp -= qty; acc().dbv += net;
      addTx('Câmbio', `Venda de ${fmt(qty)} Águia Power`, net, -qty);
    }
    save(); renderAll();
    toast('Câmbio concluído!');
  }

  // Trocar/criar conta
  function switchAccount() {
    const names = Object.keys(state.accounts);
    Swal.fire({
      title: 'Contas do Desbrava Bank',
      input: 'text',
      inputLabel: 'Digite o nome da conta (existente ou nova)',
      inputValue: state.activeAccount,
      inputAttributes: { autocomplete: 'off' },
      html: `<p class="text-xs" style="color:#9CA3AF">Contas existentes: ${names.join(', ')}</p>`,
      showCancelButton: true, confirmButtonColor: '#C9A84C', confirmButtonText: 'Entrar', cancelButtonText: 'Fechar'
    }).then(res => {
      if (!res.isConfirmed || !res.value) return;
      const name = res.value.trim().slice(0, 30);
      if (!name) return;
      if (!state.accounts[name]) { state.accounts[name] = { dbv: 100, agp: 0 }; addTx('Sistema', `Conta "${name}" criada (bônus de boas-vindas)`, 100, 0); }
      state.activeAccount = name;
      save(); renderAll();
      toast(`Conta ativa: ${name}`);
    });
  }

  // ---- Painel da Diretoria (PIN client-side) --------------------------------
  function openDiretoria() {
    Swal.fire({
      title: 'Painel da Diretoria',
      input: 'password',
      inputLabel: 'PIN de acesso',
      inputPlaceholder: 'Digite o PIN',
      inputAttributes: { autocomplete: 'off', maxlength: 8 },
      showCancelButton: true, confirmButtonColor: '#C9A84C', confirmButtonText: 'Entrar', cancelButtonText: 'Cancelar',
      footer: '<span style="font-size:11px;color:#9CA3AF">PIN padrão de demonstração: 2025 (altere no código)</span>'
    }).then(res => {
      if (!res.isConfirmed) return;
      if (res.value !== DIRETORIA_PIN) { toast('PIN incorreto', 'error'); return; }
      diretoriaPanel();
    });
  }

  function diretoriaPanel() {
    const names = Object.keys(state.accounts);
    const opts = names.map(n => `<option value="${n}">${n} (DBV ${fmt(state.accounts[n].dbv)} · AGP ${fmt(state.accounts[n].agp)})</option>`).join('');
    Swal.fire({
      title: 'Creditar / Debitar moedas',
      html: `
        <div style="text-align:left;font-size:14px">
          <label style="font-size:12px;color:#9CA3AF">Conta</label>
          <select id="dgAcc" class="swal2-input" style="margin-top:4px">${opts}</select>
          <label style="font-size:12px;color:#9CA3AF">Desbravitos (use valor negativo para debitar)</label>
          <input id="dgDbv" type="number" value="0" step="1" class="swal2-input" autocomplete="off">
          <label style="font-size:12px;color:#9CA3AF">Águias Powers (use valor negativo para debitar)</label>
          <input id="dgAgp" type="number" value="0" step="1" class="swal2-input" autocomplete="off">
          <label style="font-size:12px;color:#9CA3AF">Motivo</label>
          <input id="dgReason" type="text" placeholder="Ex.: Prêmio por participação" class="swal2-input" autocomplete="off">
        </div>`,
      showCancelButton: true, confirmButtonColor: '#C9A84C', confirmButtonText: 'Aplicar', cancelButtonText: 'Fechar',
      preConfirm: () => ({
        acc: document.getElementById('dgAcc').value,
        dbv: Math.round(Number(document.getElementById('dgDbv').value) || 0),
        agp: Math.round(Number(document.getElementById('dgAgp').value) || 0),
        reason: (document.getElementById('dgReason').value || 'Ajuste da diretoria').slice(0, 60)
      })
    }).then(res => {
      if (!res.isConfirmed) return;
      const { acc: accName, dbv, agp, reason } = res.value;
      if (!state.accounts[accName]) return;
      if (dbv === 0 && agp === 0) { toast('Nenhum valor informado', 'warning'); return; }
      state.accounts[accName].dbv = Math.max(0, state.accounts[accName].dbv + dbv);
      state.accounts[accName].agp = Math.max(0, state.accounts[accName].agp + agp);
      // registra no extrato apenas se afetar a conta ativa
      if (accName === state.activeAccount) addTx('Diretoria', reason, dbv, agp);
      save(); renderAll();
      toast(`Aplicado em ${accName}`);
    });
  }

  function clearHistory() {
    Swal.fire({ title: 'Limpar extrato?', text: 'Isso remove apenas o histórico de transações.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#C9A84C', confirmButtonText: 'Limpar', cancelButtonText: 'Cancelar' })
      .then(r => { if (r.isConfirmed) { state.tx = []; save(); renderExtrato(); toast('Extrato limpo'); } });
  }

  // ---- Tabs / UI genérica ---------------------------------------------------
  function showTab(name) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const panel = document.getElementById('panel-' + name);
    const btn = document.getElementById('tab-' + name);
    if (panel) panel.classList.remove('hidden');
    if (btn) btn.classList.add('active');
  }

  // Tema / menu / cookie / modais (padrão do site)
  let isLight = localStorage.getItem('theme') === 'light';
  function applyTheme() { document.body.classList.toggle('light', isLight); document.getElementById('themeIcon').className = isLight ? 'fas fa-sun' : 'fas fa-moon'; }
  function toggleTheme() { isLight = !isLight; localStorage.setItem('theme', isLight ? 'light' : 'dark'); applyTheme(); }

  let menuOpen = false;
  function toggleMenu() { menuOpen = !menuOpen; document.getElementById('mobileMenu').classList.toggle('open', menuOpen); document.getElementById('menuIcon').className = menuOpen ? 'fas fa-times' : 'fas fa-bars'; document.getElementById('mobileMenu').setAttribute('aria-hidden', String(!menuOpen)); }
  function closeMenu() { menuOpen = false; document.getElementById('mobileMenu').classList.remove('open'); document.getElementById('menuIcon').className = 'fas fa-bars'; document.getElementById('mobileMenu').setAttribute('aria-hidden', 'true'); }

  function acceptCookies() { localStorage.setItem('lgpd_accepted', '1'); const b = document.getElementById('cookieBanner'); if (!b) return; b.style.transform = 'translateY(100%)'; setTimeout(() => b.style.display = 'none', 500); }
  function showLGPD() { Swal.fire({ title: 'Conformidade LGPD', html: '<div class="text-left text-sm space-y-3"><p>O Desbrava Bank é uma <strong>simulação educativa</strong>. As moedas não têm valor real.</p><p>Saldos, contas e transações são salvos apenas no <strong>localStorage</strong> do seu navegador. Nada é enviado a servidores.</p><p>Limpar os dados do navegador zera o banco.</p></div>', icon: 'info', confirmButtonColor: '#C9A84C' }); }
  function showTerms() { Swal.fire({ title: 'Termos de Uso', text: 'Ferramenta gamificada de caráter educacional. As moedas Desbravito e Águia Power são fictícias e sem valor monetário real.', icon: 'info', confirmButtonColor: '#C9A84C' }); }
  function showPrivacy() { Swal.fire({ title: 'Política de Privacidade', text: 'Nenhum dado pessoal é coletado ou transmitido. Todos os dados do banco ficam no seu dispositivo.', icon: 'info', confirmButtonColor: '#C9A84C' }); }

  // Expor no escopo global (os onclick do HTML usam estes nomes)
  window.Bank = { bid, buy };
  window.showTab = showTab;
  window.updateCambioPreview = updateCambioPreview;
  window.doCambio = doCambio;
  window.switchAccount = switchAccount;
  window.openDiretoria = openDiretoria;
  window.clearHistory = clearHistory;
  window.toggleTheme = toggleTheme;
  window.toggleMenu = toggleMenu;
  window.closeMenu = closeMenu;
  window.acceptCookies = acceptCookies;
  window.showLGPD = showLGPD;
  window.showTerms = showTerms;
  window.showPrivacy = showPrivacy;

  // ---- Init -----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    load();
    applyTheme();
    if (localStorage.getItem('lgpd_accepted')) { const b = document.getElementById('cookieBanner'); if (b) b.style.display = 'none'; }
    showTab('cotacoes');
    renderAll();
  });
})();
