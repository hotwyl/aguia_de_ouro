# Design System — Águia de Ouro · Clube de Desbravadores

## 1. Fundação

### Paleta de Cores (CSS Custom Properties)

O projeto utiliza um sistema de cores com variáveis CSS no `:root`, com suporte a Dark Mode (padrão) e Light Mode (classe `.light` no `<body>`).

#### Cores Base

| Token | Hex | Uso |
|-------|-----|-----|
| `--gold` | `#C9A84C` | **Cor principal** — botões, CTAs, ícones, destaques, borders |
| `--gold-light` | `#F0C96B` | Gradientes, text highlights, hover |
| `--gold-dark` | `#8B6914` | Sombras, gradientes escuros, contraste |
| `--ink` | `#0D1117` | Fundo principal dark mode |
| `--ink-2` | `#161B22` | Superfícies secundárias (scrollbar track, cards) |
| `--ink-3` | `#21262D` | Superfícies terciárias (tooltips, overlays) |
| `--parchment` | `#F5F0E8` | Fundo principal light mode |
| `--parchment-2` | `#EDE6D6` | Superfícies secundárias light |
| `--text-dark` | `#1C1917` | Texto principal em light mode |
| `--text-light` | `#F5F0E8` | Texto principal em dark mode |
| `--text-muted-dark` | `#9CA3AF` | Texto secundário/muted em dark mode |
| `--text-muted-light` | `#6B5E45` | Texto secundário/muted em light mode |

#### Escalas de Cor Alternativas (data-theme)

Para expansão futura, o projeto suporta escalas 50–950 via `data-theme`:

```css
:root[data-theme="light"] {
  --text-50: #eef7ed; --text-500: #54b44b; --text-950: #081208;
  --background-50: #f2f2f2; --background-950: #0d0d0d;
  --primary-50: #fffde6; --primary-500: #fcec03; --primary-950: #191800;
  --secondary-50: #f3f3f2; --secondary-950: #0d0d0c;
  --accent-50: #fcfbe8; --accent-500: #e3d61c; --accent-950: #171503;
}

:root[data-theme="dark"] {
  /* Escalas invertidas — 50 = escuro, 950 = claro */
  --text-950: #eef7ed; --background-50: #0d0d0d;
  --primary-500: #fcec03; --accent-500: #e3d61c;
}
```

#### Cores Semânticas

| Token | Valor | Uso |
|-------|-------|-----|
| Success | `#10B981` | Confirmações (Beija-flor icon) |
| Warning | `#F59E0B` | Alertas, atenção (Falcão icon) |
| Danger | `#EF4444` / `#F43F5E` | Erros, ações destrutivas (Gavião/Arara) |
| Info | `#3B82F6` / `#0EA5E9` | Informações (Gralha Azul/Andorinha) |

#### Cores das Aves (ícones por unidade)

| Ave | Cor | Hex |
|-----|-----|-----|
| Falcão | Amber | `#F59E0B` |
| Grou | Slate | `#94A3B8` |
| Gavião | Red | `#EF4444` |
| Bentivi | Yellow | `#EAB308` |
| Gralha Azul | Blue | `#3B82F6` |
| Andorinha | Sky | `#0EA5E9` |
| Arara | Rose | `#F43F5E` |
| Beija-flor | Emerald | `#10B981` |

#### Implementação CSS

```css
:root {
  --gold: #C9A84C;
  --gold-light: #F0C96B;
  --gold-dark: #8B6914;
  --ink: #0D1117;
  --ink-2: #161B22;
  --ink-3: #21262D;
  --parchment: #F5F0E8;
  --parchment-2: #EDE6D6;
  --text-dark: #1C1917;
  --text-light: #F5F0E8;
  --text-muted-dark: #9CA3AF;
  --text-muted-light: #6B5E45;
}

/* Dark Mode (padrão) */
body {
  background: var(--ink);
  color: var(--text-light);
}

/* Light Mode */
body.light {
  background: var(--parchment);
  color: var(--text-dark);
}
```

### Tipografia

| Elemento | Font | Weight | Tamanho | Line-height | Uso |
|----------|------|--------|---------|-------------|-----|
| Display/H1 | Cinzel | 700–900 | 3rem–3.75rem (md:text-5xl/6xl) | 1.1 tight | Hero, títulos principais |
| H2 Section | Cinzel | 700 (bold) | 1.875rem–2.25rem (text-3xl/4xl) | 1.2 | Títulos de seção |
| H3 Card | Cinzel | 700 (bold) | 1.25rem (text-xl) | 1.3 | Títulos de cards |
| H4 Bird | Cinzel | 700 (bold) | 1rem | 1.4 | Nomes de aves/items |
| Body | Crimson Pro | 400 | 1rem–1.125rem (text-base/lg) | 1.5–1.625 relaxed | Parágrafos, descrições |
| Body (UI) | DM Sans | 300–600 | 0.875rem–1rem (text-sm/base) | 1.5 | Nav, labels, badges |
| Small/Badge | DM Sans | 500–600 (medium/semibold) | 0.75rem (text-xs) | 1.4 | Tags, captions, stats labels |
| Stat Number | Cinzel | 700 (bold) | 1.5rem (text-2xl) | 1.2 | Números de estatísticas |

#### Google Fonts Importadas

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

#### Classes de Tipografia

```css
body { font-family: 'DM Sans', sans-serif; }
.font-display { font-family: 'Cinzel', serif; }
.font-body { font-family: 'Crimson Pro', serif; }
.stat-num { font-family: 'Cinzel', serif; }
```

### Espaçamento (8px Grid)

| Nome | Valor | Uso no Projeto |
|------|-------|----------------|
| xs | 4px | Gap ícone/texto em badges |
| sm | 8px | Gap entre nav links, padding badges |
| md | 16px | Padding header (px-4), gap grids |
| lg | 24px | Padding cards (p-6), seção gaps |
| xl | 32px | Padding cards grandes (p-8) |
| 2xl | 48px | Gap entre colunas grid (gap-12) |
| 3xl | 64px | Padding vertical hero (pt-20 pb-16) |
| 4xl | 80px | Padding vertical seções (py-20) |

- **Max-width conteúdo**: `max-w-6xl` (1152px)
- **Max-width texto**: `max-w-5xl` (1024px) ou `max-w-3xl` (768px) para CTAs
- **Padding lateral padrão**: `px-4` (16px)

### Border Radius

| Nome | Valor | Uso |
|------|-------|-----|
| sm | 6px | Tooltips |
| md/lg | 8px–12px (rounded-lg) | Buttons inline, nav links, badges |
| xl | 16px (rounded-xl) | Botões CTA, ícones containers, menu items |
| 2xl | 24px (rounded-2xl) | Cards de aves, cards glass, ideais |
| 3xl | 32px (rounded-3xl) | Cards grandes (recursos) |
| full | 9999px (rounded-full) | Badges, hero circles, pills |

### Sombras

| Nome | Valor | Uso |
|------|-------|-----|
| card-lift | `0 20px 40px -10px rgba(201,168,76,0.25)` | Cards em hover |
| btn-gold | `0 8px 25px -5px rgba(201,168,76,0.5)` | Botão primário hover |
| bird-card | `0 15px 35px -10px rgba(201,168,76,0.2)` | Bird cards hover |
| nav | nenhuma (usa backdrop-filter) | Navbar glass |

### Transições

| Nome | Valor | Uso |
|------|-------|-----|
| fast | 200ms ease | Hover tooltips |
| normal | 300ms ease | Links, theme toggle |
| card | 350ms cubic-bezier(0.4,0,0.2,1) | Cards (card-lift) |
| btn | 400ms ease | Botão gold (background-position) |
| menu | 350ms ease | Mobile menu slide |
| cookie | 500ms ease | Banner LGPD dismiss |

## 2. Responsividade

| Breakpoint | Largura | Alvo |
|------------|---------|------|
| mobile | < 640px | Celulares (padrão) |
| sm | ≥ 640px | Flex-row no cookie banner |
| md | ≥ 768px | Grid 2 colunas, botão CTA visível, footer grid |
| lg | ≥ 1024px | Nav desktop visível, hero grid 2 cols, grid 4 cols aves |
| xl | ≥ 1280px | Espaçamento extra |

### Princípios Mobile-First Implementados
- Grid 1 coluna em mobile → 2 colunas (md) → 4 colunas (md para aves)
- Nav desktop: `hidden lg:flex`
- Botão CTA header: `hidden md:flex`
- Menu hamburguer: `md:hidden`
- Hero: stack vertical em mobile → grid 2 cols em lg
- Font sizes responsivos: `text-5xl md:text-6xl`
- Badges wrap: `flex-wrap gap-3`

## 3. Componentes

### Navbar (Header)

```css
.nav-glass {
  background: rgba(13,17,23,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(201,168,76,0.15);
}
body.light .nav-glass {
  background: rgba(245,240,232,0.85);
  border-bottom: 1px solid rgba(201,168,76,0.3);
}
```

- **Posição**: `fixed top-0 left-0 right-0 z-40`
- **Conteúdo**: Logo (gradient gold icon + texto) | Nav links | Theme toggle + Menu btn + CTA
- **Links desktop**: `px-2 py-2 rounded-lg text-sm font-medium hover:text-gold`
- **Cor links**: `var(--text-muted-dark)` → hover `var(--gold)`
- **CTA header**: classe `.btn-gold`, ícone + texto

### Botões

#### Primário (`.btn-gold`)

```css
.btn-gold {
  background: linear-gradient(135deg, #C9A84C, #F0C96B, #C9A84C);
  background-size: 200% auto;
  color: #0D1117;
  font-weight: 700;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}
.btn-gold:hover {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(201,168,76,0.5);
}
```

- **Tamanhos usados**: `px-5 py-2` (sm), `px-6 py-3` (md), `px-7 py-3` (lg), `px-8 py-4` (xl)
- **Border-radius**: `rounded-lg` (sm) ou `rounded-xl` (md/lg/xl)
- **Font**: `font-semibold` (sm/md) ou `font-bold` (lg/xl)
- **Ícone**: Font Awesome à esquerda com `gap-2`

#### Outline (`.btn-outline-gold`)

```css
.btn-outline-gold {
  border: 2px solid var(--gold);
  color: var(--gold);
  transition: all 0.3s ease;
}
.btn-outline-gold:hover {
  background: rgba(201,168,76,0.1);
  transform: translateY(-2px);
}
```

- Mesmo padrão de tamanhos e radius do primário
- Sem fundo, borda dourada

#### Variações de Contexto

| Contexto | Classe | Padding | Radius | Font |
|----------|--------|---------|--------|------|
| Nav CTA | `.btn-gold` | `px-4 py-2` | `rounded-lg` | `text-sm` |
| Hero principal | `.btn-gold` | `px-6 py-3` | `rounded-xl` | `text-base font-semibold` |
| Hero secundário | `.btn-outline-gold` | `px-6 py-3` | `rounded-xl` | `text-base font-semibold` |
| Card CTA | `.btn-gold` | `px-5 py-3` | `rounded-xl` | `font-semibold` |
| Section CTA | `.btn-gold` | `px-7 py-3` / `px-8 py-4` | `rounded-xl` | `font-semibold`/`font-bold text-lg` |
| Mobile menu | `.btn-gold` | `w-full py-3` | `rounded-xl` | `font-semibold` |
| Cookie accept | `.btn-gold` | `px-5 py-2` | `rounded-lg` | `text-sm font-semibold` |

### Cards

#### Glass Card

```css
.glass {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(201,168,76,0.15);
}
body.light .glass {
  background: rgba(255,255,255,0.7);
  border: 1px solid rgba(201,168,76,0.3);
}
```

- **Radius**: `rounded-2xl` (24px) ou `rounded-3xl` (32px) para cards grandes
- **Padding**: `p-5` (stats), `p-6` (ideais), `p-8` (recursos)
- **Hover**: `.card-lift` (translateY + shadow)

#### Card Lift (hover)

```css
.card-lift {
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
}
.card-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -10px rgba(201,168,76,0.25);
  border-color: rgba(201,168,76,0.5) !important;
}
```

#### Bird Card

```css
.bird-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(201,168,76,0.12);
  transition: all 0.4s ease;
}
body.light .bird-card {
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(201,168,76,0.25);
}
.bird-card:hover {
  background: rgba(201,168,76,0.06);
  border-color: rgba(201,168,76,0.4);
  transform: translateY(-4px);
  box-shadow: 0 15px 35px -10px rgba(201,168,76,0.2);
}
```

- **Layout**: `rounded-2xl p-5 text-center`
- **Conteúdo**: Ícone (text-3xl, cor da ave) → H4 (font-display font-bold) → P (text-xs, muted)

#### Card de Recurso (grande)

- Classe: `.glass rounded-3xl p-8 card-lift border`
- Border-color: `rgba(201,168,76,0.15)`
- **Conteúdo**: Ícone container (w-16 h-16 rounded-2xl, gradient gold) → H3 → P (font-body) → Lista de features → Botão CTA

#### Card de Ideais

- Classe: `.glass rounded-2xl p-6 card-lift`
- **Layout**: flex row (ícone + título) → P itálico
- Ícone: `w-10 h-10 rounded-xl` com background `rgba(201,168,76,0.15)`

### Hero Section

```css
.hero-bg {
  background: radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%),
              linear-gradient(180deg, #0D1117 0%, #0D1117 100%);
}
body.light .hero-bg {
  background: radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.15) 0%, transparent 50%),
              linear-gradient(180deg, #F5F0E8 0%, #EDE6D6 100%);
}
```

- **Pattern overlay**: SVG cross pattern em `::before` com gold fill-opacity 0.03
- **Layout**: `min-h-screen flex items-center pt-20 pb-16`
- **Grid**: `grid lg:grid-cols-2 gap-12 items-center`
- **Left**: Badge → H1 → P → Buttons → Stats
- **Right**: Círculos decorativos concêntricos com ícone central + órbitas

### Gold Gradient Text

```css
.text-gold { color: var(--gold); }
.text-gold-gradient {
  background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Divider

```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.4;
}
```

### Badges/Pills

- **Estilo**: `inline-flex items-center gap-2 px-4 py-2 rounded-full`
- **Background**: `rgba(201,168,76,0.1)`
- **Border**: `1px solid rgba(201,168,76,0.25)`
- **Texto**: `text-xs font-medium` cor `var(--gold)`
- **Ícone**: Font Awesome, `text-xs`, cor gold

### Tags/Chips (Sobre)

- `px-3 py-1 rounded-full text-xs`
- Background: `rgba(201,168,76,0.1)`, border: `1px solid rgba(201,168,76,0.3)`
- Cor texto: `var(--gold)`
- Ícone Font Awesome à esquerda (`mr-1`)

### Tooltips

```css
.has-tooltip { position: relative; }
.tooltip-text {
  visibility: hidden; opacity: 0;
  position: absolute;
  bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: var(--ink-3);
  color: var(--text-light);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  border: 1px solid rgba(201,168,76,0.3);
  transition: all 0.2s ease;
  z-index: 100;
  pointer-events: none;
}
body.light .tooltip-text { background: #21262D; }
.has-tooltip:hover .tooltip-text { visibility: visible; opacity: 1; }
```

### Mobile Menu

```css
#mobileMenu {
  transform: translateX(-100%);
  transition: transform 0.35s ease;
}
#mobileMenu.open { transform: translateX(0); }
```

- **Posição**: `fixed inset-0 z-30 pt-16`
- **Background**: `.nav-glass`
- **Links**: `flex items-center gap-3 p-4 rounded-xl`
- **Link ativo**: `background:rgba(201,168,76,0.1); color:var(--gold)`
- **Links normais**: hover `bg-gold/10`, ícone com cor gold
- **CTA inferior**: Separador + `.btn-gold w-full py-3 rounded-xl`

### Cookie/LGPD Banner

- **Posição**: `fixed bottom-0 left-0 right-0 z-50`
- **Background**: `rgba(13,17,23,0.97)`, border-top gold/0.3
- **Layout**: `flex flex-col sm:flex-row items-center gap-4`
- **Texto**: `text-sm`, cor `#9CA3AF`, strong cor `var(--text-light)`
- **Link "Saiba mais"**: underline, cor `var(--gold)`
- **Botão**: `.btn-gold px-5 py-2 rounded-lg text-sm font-semibold`
- **Dismiss**: translateY(100%) + display none

### Footer

- **Background**: `rgba(13,17,23,0.98)`, border-top `rgba(201,168,76,0.2)`
- **Grid**: `grid md:grid-cols-3 gap-8`
- **Coluna 1**: Logo + endereço
- **Coluna 2**: Navegação com ícones (links hover:text-gold)
- **Coluna 3**: Legal & Privacidade (buttons com onclick SweetAlert)
- **Links rápidos**: pills inline com border gold/0.3, bg gold/0.08, hover gold/0.2
- **Rodapé**: Separador + copyright + créditos "HOTWYL | WILLFROMBRASIL"

### Stats (Hero)

- **Layout**: `flex gap-8 mt-12`
- **Número**: `.stat-num text-2xl font-bold` cor `var(--gold)`
- **Label**: `text-xs` cor `var(--text-muted-dark)`

### Seção Padrão

- **Padding**: `py-20 px-4`
- **Container**: `max-w-6xl mx-auto`
- **Header seção**: `text-center mb-14`
  - Eyebrow: `text-xs font-semibold tracking-widest uppercase` cor gold
  - H2: `font-display text-3xl md:text-4xl font-bold mt-2`
  - Subtitle: `mt-3 font-body text-lg` cor `rgba(245,240,232,0.65)`
- **Background alternado**: `rgba(201,168,76,0.03)` em seções pares

### Ícone Container (Feature Cards)

- `w-16 h-16 rounded-2xl flex items-center justify-center mb-6`
- Background: `linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))`
- Border: `1px solid rgba(201,168,76,0.3)`
- Ícone: `text-2xl` cor gold

### Feature List

- `space-y-2 mb-6 text-sm` cor `rgba(245,240,232,0.75)`
- Cada item: `<i class="fas fa-check-circle mr-2" style="color:var(--gold)"></i>` + texto

### Modais (SweetAlert2)

- `confirmButtonColor: '#C9A84C'`
- Conteúdo: HTML com `.text-left .text-sm .space-y-3`
- Ícone: `'info'`
- Títulos: LGPD, Termos de Uso, Política de Privacidade

## 4. Animações

| Nome | Keyframes | Duração | Uso |
|------|-----------|---------|-----|
| `fadeUp` | opacity 0→1, translateY 30px→0 | 700ms ease | Entrada de elementos |
| `float` | translateY 0→-12px→0 + rotate 0→2deg→0 | 5s ease-in-out infinite | Emblema hero, ícone CTA |
| `shimmer` | translateX -100%→100% | CSS only | Loading skeleton |
| `wingFlap` | scaleX 1→0.85→1 | CSS only | Decorativo aves |

#### Classes de Animação

```css
.anim-fade-up { animation: fadeUp 0.7s ease forwards; }
.anim-float { animation: float 5s ease-in-out infinite; }
.opacity-0 { opacity: 0; } /* Estado inicial antes da animação */
.delay-1 { animation-delay: 0.15s; }
.delay-2 { animation-delay: 0.3s; }
.delay-3 { animation-delay: 0.45s; }
.delay-4 { animation-delay: 0.6s; }
.delay-5 { animation-delay: 0.75s; }
```

#### Scroll Reveal (IntersectionObserver)

```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

#### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}
```

## 5. Tema Claro/Escuro

- **Dark mode**: padrão (body sem classe)
- **Light mode**: classe `.light` no `<body>`
- **Persistência**: `localStorage.getItem('theme')` / `localStorage.setItem('theme', ...)`
- **Toggle**: botão no header com ícone lua/sol (`fa-moon` / `fa-sun`)
- **Detecção inicial**: localStorage, depois aplica

```javascript
let isLight = localStorage.getItem('theme') === 'light';
function applyTheme() {
  document.body.classList.toggle('light', isLight);
  document.getElementById('themeIcon').className = isLight ? 'fas fa-sun' : 'fas fa-moon';
}
function toggleTheme() {
  isLight = !isLight;
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  applyTheme();
}
```

## 6. Ícones (Font Awesome 6)

- **CDN**: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`
- **Prefixos**: `fas` (solid), `far` (regular), `fab` (brands)

### Ícones Usados no Projeto

| Ícone | Classe | Contexto |
|-------|--------|----------|
| Pena (logo) | `fas fa-feather-alt` | Logo, hero, CTA |
| Home | `fas fa-home` | Nav início |
| Info | `fas fa-info-circle` | Nav sobre |
| Livro | `fas fa-book-open` | Nav guia, cards |
| Pomba | `fas fa-dove` | Nav quiz, cards |
| Troféu | `fas fa-trophy` | Nav guines, stats |
| Estrela | `fas fa-star` | Nav astronomia, badge |
| Usuários | `fas fa-users` | Nav ordem unida |
| Pasta | `fas fa-folder-open` | Nav materiais |
| Lua | `fas fa-moon` | Theme toggle (dark) |
| Sol | `fas fa-sun` | Theme toggle (light) |
| Barras | `fas fa-bars` | Menu hamburguer (open) |
| X | `fas fa-times` | Menu hamburguer (close) |
| Check | `fas fa-check` | Cookie banner |
| Check-circle | `fas fa-check-circle` | Feature lists |
| Escudo | `fas fa-shield-alt` | LGPD, segurança |
| Seta | `fas fa-arrow-right` | Links, CTAs |
| Mapa | `fas fa-map-marker-alt` | Localização |
| Igreja | `fas fa-church` | Associação |
| Música | `fas fa-music` | Fanfarra |
| Camping | `fas fa-campground` | Camporis |
| Microfone | `fas fa-microphone` | Oratória |
| Vento | `fas fa-wind` | Falcão |
| Coroa | `fas fa-crown` | Grou |
| Olho | `fas fa-eye` | Gavião |
| Gema | `fas fa-gem` | Gralha Azul |
| Pena simples | `fas fa-feather` | Andorinha, CTA |
| Paleta | `fas fa-palette` | Arara |
| Coração | `fas fa-heart` | Beija-flor, Lema |
| Praying | `fas fa-praying-hands` | Voto |
| Alvo | `fas fa-bullseye` | Alvo |
| Cruz | `fas fa-cross` | Objetivo |
| PDF | `fas fa-file-pdf` | Planejamento |
| Contrato | `fas fa-file-contract` | Termos |
| Detetive | `fas fa-user-secret` | Privacidade |

## 7. Focus & Acessibilidade

```css
*:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}
```

- Todas as interações com `focus-visible` em gold
- aria-label em botões só com ícone (theme toggle, menu)
- `aria-label="Navegação principal"` no nav
- `aria-hidden="true"` no menu mobile fechado
- Contraste: texto light (#F5F0E8) sobre ink (#0D1117) = ~13:1 ✓
- Muted (#9CA3AF) sobre ink (#0D1117) = ~5.5:1 ✓

## 8. Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ink-2); }
::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 3px; }
body.light ::-webkit-scrollbar-track { background: var(--parchment-2); }
```

## 9. Tom de Voz & Conteúdo

| Princípio | Descrição |
|-----------|-----------|
| Institucional | Linguagem que representa o clube com respeito |
| Jovem | Acessível para desbravadores de 10–25 anos |
| Inspirador | Motivacional sem ser piegas |
| Informativo | Dados reais (28 anos, 45 membros, 5★) |
| 100% pt-BR | Sem termos em inglês para o público |

### Padrão de Copy

- **Eyebrow (badge)**: Texto curto em uppercase, tracking-widest (`"Fundado em 1998 · 28 anos de história"`)
- **H1**: Frase impactante com palavra-chave em gold-gradient
- **Descrição hero**: 2 linhas, forte no gold-light, tom informativo
- **CTA primário**: Verbo + complemento (`"Acessar o Guia"`, `"Fazer o Teste das Aves"`)
- **CTA secundário**: Ação alternativa (`"Ver o Guia de Classes"`)
- **Feature list**: Check-circle + frase curta descritiva
- **Stats**: Número bold + label 1–2 palavras

### Brado do Clube

> "Visão, Orientação, Dedicação, Habilidade... Águia de Ouro!"

## 10. Segurança (Client-Side)

```javascript
// Bloqueio de DevTools e conteúdo
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) ||
      (e.ctrlKey && (e.key === 'U' || e.key === 'S' || e.key === 'C' || e.key === 'P'))) {
    e.preventDefault(); return false;
  }
});
```

## 11. Checklist de Implementação

Ao criar novo componente ou página:

- [ ] Usar custom properties (nunca hex hardcoded fora do :root)
- [ ] Botões: `.btn-gold` ou `.btn-outline-gold`, rounded-xl, font-semibold/bold
- [ ] Cards: `.glass` + `.card-lift`, rounded-2xl/3xl, border gold/0.15
- [ ] Ícones: Font Awesome 6 (fas), cor `var(--gold)` ou cor da ave
- [ ] Tipografia: `.font-display` (Cinzel) para títulos, `.font-body` (Crimson Pro) para textos
- [ ] Layout de seção: `py-20 px-4 > max-w-6xl mx-auto`
- [ ] Eyebrow: `text-xs font-semibold tracking-widest uppercase` cor gold
- [ ] Divider entre seções (`.divider`)
- [ ] `.reveal` em todos os blocos de conteúdo (scroll reveal)
- [ ] Responsivo mobile-first (testar 320px)
- [ ] Dark/Light mode: verificar `.light` nos componentes
- [ ] Acessível: `focus-visible`, `aria-label`, contraste
- [ ] Conteúdo em pt-BR
- [ ] Header `.nav-glass` fixed + Footer com créditos
- [ ] Banner LGPD funcional
- [ ] SweetAlert2 com `confirmButtonColor: '#C9A84C'`
- [ ] Tooltips com `.has-tooltip` + `.tooltip-text`
- [ ] Transições suaves (300–400ms)
- [ ] Touch targets ≥ 44x44px
- [ ] `prefers-reduced-motion` respeitado
- [ ] Bloqueios de segurança ativos (script no topo do body)
