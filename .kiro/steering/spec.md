# Spec Geral — Águia de Ouro · Clube de Desbravadores

## Visão

Web app do Clube de Desbravadores Águia de Ouro (Curitiba–PR). Plataforma educacional e institucional para jovens desbravadores. Eficiente, seguro, estável, otimizado e performático. Mobile-first, SEO/AEO/SEM/GEO completo. Abordagem moderna com foco em experiência de uso e identidade visual forte.

## Objetivos

1. **Engajar jovens desbravadores** — Conteúdo interativo, quizzes, guias e jogos educativos
2. **Facilitar a liderança** — Ferramentas para diretoria e conselheiros do clube
3. **Demonstrar profissionalismo** — Design moderno, código limpo, performance alta
4. **Ranquear no Google** — SEO técnico completo (meta, schema, sitemap, performance)
5. **Ser encontrado por IAs** — AEO com FAQPage, HowTo, dados estruturados
6. **Segurança** — Proteção contra vulnerabilidades, LGPD
7. **Educar** — Classes agrupadas, especialidades, materiais didáticos

## Stack Tecnológica

### Frontend Core
- **HTML5** semântico (landmarks, aria, roles)
- **CSS3** (custom properties, animations, grid, flexbox, clamp)
- **Tailwind CSS** via CDN (`cdn.tailwindcss.com`)
- **JavaScript Vanilla** (ES6+, módulos, DOM API, Fetch API)

### UI/UX Libraries (CDN)
- **Font Awesome 6** (ícones — fas, far, fab)
- **SweetAlert2** (alertas, modais, confirmações)
- **Google Fonts** (Inter, Cinzel, Crimson Pro, DM Sans)
- **Tooltips** (custom CSS, sem dependência)

### SEO/AEO/SEM/GEO
- Meta tags completas (`description`, `keywords`, `author`, `robots`)
- Open Graph (`og:title`, `og:description`, `og:type`, `og:image`)
- Twitter Cards
- JSON-LD schemas (WebSite, Organization, FAQPage, HowTo, BreadcrumbList, Event, EducationalOrganization)
- `sitemap.xml` + `robots.txt`
- Geo meta tags (Curitiba, PR, Brasil — -25.4284, -49.2733)
- Canonical URLs

### Analytics & Geomarketing
- **Google Tag Manager**: `GTM-WVMJV7G6`
- **Google Analytics 4**: `G-J06THXX0MW`
- **Google Search Console** integrado
- Eventos GTM para tracking de interações

```html
<!-- Google Tag Manager -->
<script>
;(function (w, d, s, l, i) {
  w[l] = w[l] || []
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : ''
  j.async = true
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
  f.parentNode.insertBefore(j, f)
})(window, document, 'script', 'dataLayer', 'GTM-WVMJV7G6')
</script>

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J06THXX0MW"></script>
<script>
window.dataLayer = window.dataLayer || []
function gtag() { dataLayer.push(arguments) }
gtag('js', new Date())
gtag('config', 'G-J06THXX0MW')
</script>
```

### Segurança (Client-Side)
- Bloqueio de DevTools (F12, Ctrl+Shift+I)
- Bloqueio de seleção de texto e cópia
- Bloqueio de clique direito (contextmenu)
- Bloqueio de impressão (print)
- Proteção básica de conteúdo
- CSP via meta tags quando possível
- `autocomplete="off"` em todos os inputs
- Sanitização de inputs (XSS prevention)
- localStorage apenas para preferências (tema, LGPD)

## Requisitos Funcionais

### Institucional
- Landing page com proposta de valor clara
- Seção "Sobre o Clube" com história, stats e conquistas
- Dark/Light mode persistido (localStorage)
- Responsivo (mobile-first, mín 320px)
- Conformidade LGPD (banner de cookies)
- Header e Footer em todas as páginas
- Rodapé: créditos "HOTWYL | WILLFROMBRASIL"
- Páginas de erro (404, 500) com navegação
- Navegação intuitiva com breadcrumbs
- Tooltips e botões de ajuda
- Loading com fundo ofuscado durante processamento

### Guia de Classes Agrupadas (`/guia.html`)
- Planejamento completo com 15 encontros temáticos
- Requisitos por área (Espiritual, Saúde, Liderança, etc.)
- Calendário de atividades e especialidades
- Temas para debates e leituras obrigatórias

### Teste de Personalidade das Aves (`/quiz.html`)
- 25 perguntas interativas
- 8 perfis de aves (Falcão, Grou, Gavião, Bentivi, etc.)
- Resultado personalizado com ave predominante + adjacente
- Exportação em PDF e compartilhamento

### Astronomia (`/astronomia/`)
- Material da especialidade de Astronomia
- Simulador interativo
- PDF de referência

### Jogos Educativos (`/jogos/`)
- Caça-palavras bíblico e temático
- Forca bíblica
- Adivinhe a Palavra
- Quiz "Desbravador Sabe"
- Passa ou Repassa
- Kahoot-style trivia
- Cruzada interativa

### Ordem Unida (`/ordem_unida/`)
- PDFs de referência de comandos
- Material didático de treinamento

### Materiais (`/materiais/`)
- PDFs de especialidades e classes
- Organização por categoria

### Desbrava Guines (`/desbrava_guines/`)
- Recordes e conquistas do clube

### Planejamento (`/planejamento.html`)
- Calendário e cronograma de atividades

## Requisitos Não-Funcionais

| Requisito | Meta |
|-----------|------|
| Performance | LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| Acessibilidade | WCAG 2.1 AA (contraste, nav teclado, aria) |
| SEO | Score Lighthouse > 90 |
| Compatibilidade | Chrome, Firefox, Safari, Edge (últimas 2 versões) |
| Mobile | Touch-friendly, mín 320px viewport |
| Segurança | Proteção conteúdo, LGPD, CSP |
| Idioma | 100% pt-BR |
| Tema | Dark/Light mode com persistência |

## Segurança

### Medidas implementadas:
- Bloqueio de ferramentas de desenvolvedor (DevTools)
- Bloqueio de copy/paste, seleção, clique direito
- Bloqueio de print/screenshot
- `autocomplete="off"` em formulários
- Sanitização de inputs no lado do cliente
- localStorage apenas para preferências não-sensíveis
- Sem segredos expostos no frontend
- LGPD banner com consentimento

### Headers recomendados (se houver servidor):
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=()`

## UX Guidelines

- Tooltips em elementos complexos
- SweetAlert2 para confirmações e feedbacks
- Loading overlay ofuscado em operações assíncronas
- Breadcrumb em todas as páginas internas
- Feedback visual em hover/focus/active
- Transições suaves (150–300ms)
- Botões de ajuda contextual (?) onde necessário
- Inputs com placeholder descritivo e labels visíveis
- Touch targets mínimo 44x44px
- Scroll reveal para animações de entrada
- Menu mobile com overlay slide-in
- Glass effect em cards e nav

## Identidade Visual

- **Tema principal**: Tons de amarelo dourado + verde natureza + neutros
- **Dark mode padrão**: fundo escuro com destaques em amarelo/ouro
- **Light mode**: fundo claro pergaminho com destaques em amarelo/ouro
- **Fontes display**: Cinzel (heráldico), DM Sans (UI)
- **Fonte corpo**: Crimson Pro (leitura), sans-serif (UI)
- **Estilo**: moderno, elegante, institucional, jovem
- **Inspiração**: heráldica, natureza (águia/aves), aventura

## Clean Code & Boas Práticas

- Naming claro e consistente (camelCase JS, kebab-case CSS)
- Funções pequenas e reutilizáveis (< 30 linhas)
- HTML semântico (landmarks, headings hierárquicos)
- CSS organizado (custom properties → base → components → utilities)
- JS modular (separação por funcionalidade)
- Sem over-engineering: simplicidade > abstração prematura
- Comentários explicativos em lógica complexa
- DRY: componentes reutilizáveis (header, footer, nav)

## SEO Strategy

### Keywords Primárias
- "clube desbravadores curitiba"
- "águia de ouro desbravadores"
- "classes agrupadas desbravadores"
- "teste personalidade aves desbravadores"

### Keywords Long-tail
- "guia classes agrupadas 16 anos"
- "quiz personalidade desbravadores"
- "jogos bíblicos desbravadores"
- "ordem unida desbravadores pdf"
- "especialidade astronomia desbravadores"

### Schemas JSON-LD Implementados
- WebSite
- Organization (Clube)
- EducationalOrganization
- FAQPage
- HowTo
- BreadcrumbList
- Event (encontros, camporis)

## Geomarketing

- Google Tag Manager: `GTM-WVMJV7G6`
- Google Analytics 4: `G-J06THXX0MW`
- Google Search Console integrado
- **Geo meta tags**: Curitiba, PR, Brasil (-25.4284, -49.2733)
- Schema.org Organization com `areaServed`
- Eventos GTM para tracking de interações

```html
<!-- Geo Meta Tags -->
<meta name="geo.region" content="BR-PR">
<meta name="geo.placename" content="Curitiba">
<meta name="geo.position" content="-25.4284;-49.2733">
<meta name="ICBM" content="-25.4284, -49.2733">
```

## Estrutura de Páginas

```
/ (index.html)
├── /sobre.html
├── /guia.html
├── /quiz.html
├── /planejamento.html
├── /astronomia/
│   ├── index.html
│   └── simulador.html
├── /jogos/
│   ├── index.html
│   ├── adivinhe-a-palavra.html
│   ├── caca-palavras-biblica.html
│   ├── forca-biblica.html
│   ├── Desbravador-Sabe-Show-Do.html
│   ├── Passa-Ou-Repassa-Desbravadores.html
│   ├── Kahoot-Desbravadores-Trivia-Game.html
│   └── Cruzada-Dificil-Interativa-Ideais.html
├── /ordem_unida/
│   └── index.html
├── /materiais/
│   └── index.html
├── /desbrava_guines/
│   └── index.html
├── /canal-esperanca/
│   └── index.html
├── /404.html
└── /500.html
```

## Fluxo do Usuário

```
Home → [Sobre | Guia | Quiz | Jogos | Astronomia | Ordem Unida | Materiais | Guines]
         │       │      │      │         │              │              │          │
         │       │      │      │         │              │              │          └→ Recordes
         │       │      │      │         │              │              └→ PDFs
         │       │      │      │         │              └→ PDFs comandos
         │       │      │      │         └→ Simulador + PDF
         │       │      │      └→ Caça-palavras, Forca, Quiz, Trivia, Cruzada
         │       │      └→ 25 perguntas → Resultado + PDF
         │       └→ 15 encontros → Atividades por área
         └→ História, conquistas, unidades
```

## Métricas de Sucesso

- Pageviews e sessões (GA4)
- Completude do quiz (% que termina)
- Downloads de PDFs (materiais, resultados)
- Tempo na página (engajamento)
- Bounce rate < 40%
- Core Web Vitals no verde
- Posição orgânica para keywords alvo (Search Console)

## Checklist de Qualidade

- [ ] Todos os links funcionam corretamente
- [ ] Navegação testada em mobile e desktop
- [ ] Dark/Light mode funcional e persistido
- [ ] Loading overlay presente em operações async
- [ ] Breadcrumb em todas as páginas internas
- [ ] SEO meta tags em todas as páginas
- [ ] Schema JSON-LD em todas as páginas
- [ ] Inputs com `autocomplete="off"`
- [ ] LGPD banner funcional
- [ ] Header/Footer em todas as páginas
- [ ] Créditos HOTWYL | WILLFROMBRASIL no rodapé
- [ ] Performance Lighthouse > 90
- [ ] Acessibilidade WCAG 2.1 AA
- [ ] Conteúdo 100% pt-BR
- [ ] Tooltips nos elementos complexos
- [ ] SweetAlert2 configurado com tema
- [ ] Font Awesome carregado corretamente
- [ ] Google Fonts carregadas com preconnect
- [ ] GTM + GA4 implementados
- [ ] Geo meta tags presentes
- [ ] Scroll reveal funcionando
- [ ] Menu mobile funcional
- [ ] Proteção de conteúdo ativa
- [ ] Touch targets ≥ 44x44px
- [ ] `prefers-reduced-motion` respeitado
