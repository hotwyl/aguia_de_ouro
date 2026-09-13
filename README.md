# 🦅 Clube de Desbravadores Águia de Ouro

Plataforma web institucional e educacional do **Clube de Desbravadores Águia de Ouro** (Tingui, Curitiba–PR). Reúne guia de classes, teste de personalidade das aves, jogos educativos, materiais didáticos, evangelismo, banco digital gamificado e o livro de recordes do clube.

Site **100% estático** (HTML5 + CSS3 + JavaScript Vanilla), mobile-first, com SEO/AEO, dark/light mode e conformidade LGPD.

---

## 🌐 Acesso em produção

| Ambiente | URL |
|----------|-----|
| Netlify | https://aguia-de-ouro.netlify.app/ |
| Vercel | https://aguia-de-ouro.vercel.app/ |
| GitHub Pages | https://hotwyl.github.io/aguia_de_ouro/ |

---

## 📚 Funcionalidades

- **Institucional** — landing page, história e conquistas do clube (`/`, `/sobre.html`).
- **Guia de Classes Agrupadas** — planejamento de reuniões, encontros e acampamento (`/materiais/guia.html`).
- **Teste de Personalidade das Aves** — 25 perguntas, 8 perfis de aves, exportação em PDF (`/materiais/quiz.html`).
- **Planejamento** — visualizador de PDF do cronograma (`/materiais/planejamento.html`).
- **Evangelismo + Canal Esperança** — projetos missionários, vídeo, rádios, redes sociais e estudos bíblicos Novo Tempo (`/evangelismo/`).
- **Desbrava Bank** — banco digital gamificado com moedas *Desbravito* e *Águia Power*, cotações semanais, câmbio, leilões, mercado e painel da diretoria (`/banco/`).
- **Desbrava Guines** — o livro dos recordes dos desbravadores, com painéis de gestão e moderação (`/recordes/`).
- **Jogos Educativos** — caça-palavras, forca bíblica, adivinhe a palavra, trivia e cruzadas (`/jogos/`).
- **Materiais** — PDFs de especialidades, classes, Astronomia e Ordem Unida (`/materiais/`).
- **Páginas de erro** — 404 e 500 personalizadas.

> ⚠️ **Nota:** O Desbrava Bank e os painéis do Desbrava Guines são **simulações educativas** que salvam dados apenas no `localStorage` do navegador (sem backend). As moedas são fictícias e os PINs de "diretoria" (`2025`) são apenas gamificação, não segurança real.

---

## 🗂️ Estrutura do projeto

```
/
├── index.html                     Landing page
├── sobre.html                     Sobre o clube
├── 404.html / 500.html            Páginas de erro
├── evangelismo/                   Hub de Evangelismo + Canal Esperança (mesclados)
│   ├── index.html
│   └── src/                       Assets (vídeo, logos Novo Tempo/Missão Calebe)
├── banco/                         Desbrava Bank (banco digital gamificado)
│   ├── index.html
│   └── assets/bank.js
├── recordes/                      Desbrava Guines (livro dos recordes)
│   └── index.html
├── jogos/                         Jogos educativos
│   ├── index.html
│   ├── adivinhe-a-palavra.html
│   ├── caca-palavras-biblica.html
│   ├── forca-biblica.html
│   ├── Kahoot-Desbravadores-Trivia-Game.html
│   ├── Caca-Palavras-Ideais-Dos.html
│   ├── Cruzada-Dificil-Interativa-Ideais.html
│   ├── Desbravador-Sabe-Show-Do.html
│   ├── Passa-Ou-Repassa-Desbravadores.html
│   └── assets/                    CSS/JS dos jogos
├── materiais/                     Central de materiais
│   ├── index.html                 Índice de PDFs
│   ├── guia.html                  Guia de Classes Agrupadas
│   ├── quiz.html                  Teste das Aves
│   ├── planejamento.html          Visualizador de planejamento
│   ├── astronomia/                Especialidade de Astronomia + simulador
│   ├── ordem_unida/               Material de Ordem Unida
│   └── gerais/                    PDFs diversos
├── robots.txt
├── sitemap.xml
├── vercel.json                    Config de deploy Vercel
├── netlify.toml                   Config de deploy Netlify
└── DEPLOY.md                      Instruções de deploy
```

---

## 🛠️ Stack técnica

- **HTML5** semântico + **CSS3** (custom properties, grid, flexbox, animações)
- **Tailwind CSS** (via CDN)
- **JavaScript Vanilla** (ES6+)
- **Font Awesome 6**, **SweetAlert2**, **Google Fonts** (Cinzel, Crimson Pro, DM Sans)
- **pdf.js** e **jsPDF** (visualização/geração de PDF)
- **Google Tag Manager** (`GTM-WVMJV7G6`) + **Google Analytics 4** (`G-J06THXX0MW`)
- Sem etapa de build — arquivos servidos diretamente.

---

## 🎨 Identidade visual

- **Cor principal:** dourado `#C9A84C` (com `--gold-light #F0C96B` e `--gold-dark #8B6914`)
- **Dark mode** padrão (fundo `#0D1117`) e **Light mode** pergaminho (`#F5F0E8`), com persistência via `localStorage`
- **Fontes:** Cinzel (títulos), Crimson Pro (corpo), DM Sans (UI)

---

## 🚀 Rodando localmente

Como é um site estático, basta um servidor HTTP simples na raiz do projeto.

```bash
# Opção 1 — Node (http-server)
npx http-server -p 5500 -c-1

# Opção 2 — Python
python -m http.server 5500

# Opção 3 — Laragon / VS Code Live Server
# Aponte o docroot para a pasta do projeto
```

Acesse `http://localhost:5500/`.

> Observação: alguns recursos (banco, jogos, vídeos) carregam scripts/mídia via `fetch`/`<script src>` e precisam de um **servidor HTTP** — abrir o HTML por duplo clique (`file://`) pode não funcionar totalmente.

---

## ☁️ Deploy

Consulte o **[DEPLOY.md](DEPLOY.md)** para o passo a passo em Vercel e Netlify. Resumo:

- **Vercel:** framework *Other*, build vazio, output `.` (config em `vercel.json`).
- **Netlify:** build vazio, publish `.` (config em `netlify.toml`).
- **GitHub Pages:** publicar a branch principal servindo a raiz.

Ambas as configs já incluem headers de segurança (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

### Após o deploy
1. Ajustar o domínio real nos `canonical`/`og:url` e no `sitemap.xml`/`robots.txt` (hoje usam o placeholder `https://aguiadeouro.com.br`).
2. Fornecer a imagem social `og-image.jpg` (1200×630) na raiz.
3. Enviar o `sitemap.xml` ao Google Search Console.

---

## 🔗 Links do clube

- **Instagram:** https://www.instagram.com/clubeaguiadeouro/
- **Encontre um clube (SGC):** https://clubes.adventistas.org/br/acp/1227/aguia-de-ouro/

---

## 📄 Licença e créditos

Uso educacional e recreativo, sem fins lucrativos.

Sistema desenvolvido por **HOTWYL | WILLFROMBRASIL**.

© 2025 Clube de Desbravadores Águia de Ouro — Curitiba/PR.
