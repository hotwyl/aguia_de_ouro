# Deploy — Clube de Desbravadores Águia de Ouro

Site 100% estático (HTML/CSS/JS + CDNs). Não há etapa de build. Basta publicar a raiz do projeto.

## Vercel

1. Importe o repositório em https://vercel.com/new
2. Em **Framework Preset**, selecione **Other**.
3. Deixe **Build Command** vazio e **Output Directory** como `.` (raiz).
4. A configuração de headers e URLs já está em `vercel.json`.

Alternativa por CLI:

```bash
npm i -g vercel
vercel        # deploy de pré-visualização
vercel --prod # deploy de produção
```

## Netlify

1. Importe o repositório em https://app.netlify.com/start
2. **Build command**: deixe vazio.
3. **Publish directory**: `.` (raiz).
4. Headers, cache e página 404 já estão em `netlify.toml`.

Alternativa por CLI:

```bash
npm i -g netlify-cli
netlify deploy          # pré-visualização
netlify deploy --prod   # produção
```

## Páginas de erro

- `404.html` — servida automaticamente pelo Netlify em rotas inexistentes. Na Vercel, é usada como página 404 padrão para arquivos estáticos ausentes.
- `500.html` — página de erro interno (uso manual/servidor).

## Ajustes obrigatórios pós-deploy

O código usa o domínio **placeholder** `https://aguiadeouro.com.br`. Após definir o domínio real, substitua-o em:

- `sitemap.xml`
- `robots.txt` (linha `Sitemap:`)
- Tags `canonical`, `og:url`, `og:image`, `twitter:image` em:
  `index.html`, `sobre.html`, `quiz.html`, `guia.html`,
  `jogos/index.html`, `jogos/Kahoot-Desbravadores-Trivia-Game.html`,
  `evangelismo/index.html`, `evangelismo/canal-esperanca.html`,
  `banco/index.html`, `recordes/index.html`, `materiais/astronomia/index.html`
- Blocos JSON-LD (`url`/`logo`) das páginas indexáveis

Substituição rápida (na raiz do projeto):

```bash
# PowerShell
Get-ChildItem -Recurse -Include *.html,*.xml,*.txt | ForEach-Object {
  (Get-Content $_.FullName -Raw) -replace 'https://aguiadeouro\.com\.br','https://SEU-DOMINIO' | Set-Content $_.FullName
}
```

## Imagem social (Open Graph)

As tags `og:image`/`twitter:image` apontam para `/og-image.jpg`, que **ainda não existe**.
Crie uma imagem **1200×630 px** com a identidade do clube e salve como `og-image.jpg` na raiz.

## Após publicar

1. Cadastre o domínio no **Google Search Console** e envie o `sitemap.xml`.
2. Confirme no GTM (`GTM-WVMJV7G6`) e GA4 (`G-J06THXX0MW`) que os eventos estão chegando.
3. Rode o Lighthouse para validar Performance/SEO/Acessibilidade (meta > 90).
