# Como rodar localmente com URLs amigáveis

## Usando o live-server (recomendado)

1. Instale o live-server globalmente (caso não tenha):
   npm install -g live-server

2. No terminal, navegue até a pasta do seu projeto:
   cd d:/projetos/hub-dev-cria/src/testes

3. Rode o comando:
   live-server --entry-file=index.html

- Isso fará com que qualquer URL amigável (ex: /guia, /sobre) seja redirecionada para o arquivo correto.

## Alternativa: http-server

1. Instale o http-server:
   npm install -g http-server

2. Rode o comando:
   http-server -c-1 --fallback index.html

---

Se precisar de ajuda para instalar o Node.js ou rodar os comandos, me avise!