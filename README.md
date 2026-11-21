# Grampel – Acompanhamento de Serviços (app PWA)

Sistema de acompanhamento de serviços da Grampel Soluções Gráficas.
Funciona no navegador e pode ser **instalado como aplicativo** no celular (Android e iPhone) e no computador.

- **Site/app:** hospedado de graça no **GitHub Pages**
- **Banco de dados e login:** **Supabase** (plano gratuito)

---

## O que tem nesta pasta

| Arquivo | Para que serve |
|---|---|
| `index.html` | O sistema inteiro (telas, regras, visual) |
| `config.js` | **Onde você cola o endereço e a chave do Supabase** |
| `manifest.webmanifest` | Nome, cores e ícones do app instalado |
| `sw.js` | Faz o app ser instalável e abrir rápido |
| `icons/` | Logotipo e ícones do app |
| `supabase/schema.sql` | Script que cria o banco de dados (rodar uma vez) |

---

## Passo 1 — Criar o projeto no Supabase

1. Acesse **https://supabase.com** e crie uma conta (pode entrar com a conta do GitHub).
2. Clique em **New project**.
3. Preencha:
   - **Name:** `grampel`
   - **Database Password:** crie uma senha forte e **guarde** (não é a senha do app)
   - **Region:** escolha **South America (São Paulo)**
4. Clique em **Create new project** e espere 1 a 2 minutos.

## Passo 2 — Criar o banco de dados

1. No menu da esquerda, abra **SQL Editor**.
2. Clique em **New query**.
3. Abra o arquivo `supabase/schema.sql` desta pasta, copie **todo** o conteúdo e cole no editor.
4. Clique em **Run**. Deve aparecer *"Success. No rows returned"*.

> Rode esse script **uma vez só**. Se rodar de novo, vai dar erro dizendo que as tabelas já existem — isso é normal e não estraga nada.

## Passo 3 — Configurar o login

O sistema usa **nome de usuário e senha** (sem e-mail). Para isso:

1. Menu da esquerda → **Authentication** → **Sign In / Providers** (em algumas versões: *Providers*).
2. Abra **Email** e deixe assim:
   - **Enable Email provider:** ✅ ligado
   - **Confirm email:** ❌ **desligado** (importante!)
3. Em **Authentication → Sign In / Providers** (ou *Settings*), confira se **Allow new users to sign up** está ✅ **ligado** — é assim que o administrador cadastra novos usuários pelo app.
4. Clique em **Save**.

> **É seguro?** Sim. Mesmo que alguém crie um login por fora, ele **não vê nada**: só enxerga dados quem foi cadastrado por um administrador na aba **Usuários**. Essa regra está no próprio banco de dados.

## Passo 4 — Copiar o endereço e a chave para o `config.js`

1. No Supabase, clique em **Connect** (no topo do projeto) **ou** vá em **Project Settings → API Keys**.
2. Copie:
   - **Project URL** — algo como `https://abcdefghijk.supabase.co`
   - **Publishable key** (começa com `sb_publishable_...`) **ou** a **anon public key** (começa com `eyJ...`)
3. Abra o arquivo `config.js` e substitua:

```js
SUPABASE_URL: 'https://abcdefghijk.supabase.co',
SUPABASE_KEY: 'sb_publishable_xxxxxxxxxxxxxxxx',
```

> ⚠️ **Nunca** use a chave **secret** / **service_role**. A chave *publishable/anon* pode ficar pública — quem protege os dados são as regras do banco.

## Passo 5 — Colocar no GitHub

1. Acesse **https://github.com** e crie uma conta (se ainda não tiver).
2. Clique em **+** (canto superior direito) → **New repository**.
   - **Repository name:** `grampel` (ou outro nome)
   - Marque **Public**
   - Clique em **Create repository**
3. Na página do repositório, clique em **uploading an existing file** (ou **Add file → Upload files**).
4. **Arraste todo o conteúdo desta pasta** (os arquivos e as pastas `icons` e `supabase`) — o `index.html` precisa ficar na **raiz**, não dentro de outra pasta.
5. Clique em **Commit changes**.

> No plano gratuito do GitHub, o GitHub Pages funciona com repositório **público**. O código ficar público não expõe os dados: eles estão no Supabase, protegidos por login.

## Passo 6 — Publicar com o GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Em **Branch**, escolha **main** e a pasta **/ (root)** → **Save**.
4. Espere 1 a 2 minutos e recarregue a página. Vai aparecer o endereço do app:
   `https://SEU-USUARIO.github.io/grampel/`

**Recomendado:** volte ao Supabase em **Authentication → URL Configuration** e coloque esse endereço em **Site URL**.

## Passo 7 — Primeiro acesso

1. Abra o endereço do app.
2. Vai aparecer **Primeiro acesso**: crie o **primeiro administrador** (nome de usuário + senha de no mínimo 6 caracteres).
3. Pronto! Agora:
   - Em **Processos de Produção**, confira as impressoras e os processos.
   - Em **Usuários**, cadastre os outros administradores e os vendedores (*Apenas acompanhar status*).

## Passo 8 — Instalar como aplicativo

**Android (Chrome):** abra o endereço → menu **⋮** → **Instalar app** (ou *Adicionar à tela inicial*).

**iPhone/iPad (Safari):** abra o endereço → botão **Compartilhar** (quadrado com seta) → **Adicionar à Tela de Início**.

**Computador (Chrome ou Edge):** abra o endereço → clique no ícone de **instalar** na barra de endereço (monitor com seta) → **Instalar**.

O app abre em tela cheia, com o ícone da Grampel, e cada pessoa entra com seu usuário e senha. O login fica salvo no aparelho até clicar em **Sair**.

---

## Como atualizar o app depois

1. No GitHub, abra o arquivo que quer mudar → ícone de **lápis** (Edit) → faça a mudança → **Commit changes**.
2. Abra também o `sw.js` e troque `grampel-v1` por `grampel-v2` (depois `v3`, `v4`...). Isso avisa os aparelhos que há versão nova.
3. Em 1 a 2 minutos o site atualiza. No app instalado, feche e abra de novo (às vezes precisa fazer isso duas vezes).

---

## Dúvidas e problemas comuns

| O que aparece | O que fazer |
|---|---|
| **Configuração pendente** | Preencha `SUPABASE_URL` e `SUPABASE_KEY` no `config.js` (passo 4) |
| **O banco ainda não foi preparado** | Rode o `schema.sql` no SQL Editor (passo 2) |
| **O Supabase está exigindo confirmação de e-mail** | Desligue **Confirm email** (passo 3) |
| **A criação de logins está desativada** | Ligue **Allow new users to sign up** (passo 3) |
| **O Supabase recusou o endereço interno de login** | No `config.js`, troque `EMAIL_DOMINIO` por outro domínio, ex.: `grampel.com.br` (ninguém recebe e-mail). Faça isso **antes** de cadastrar usuários |
| **Este login não tem acesso ao sistema** | A pessoa não está cadastrada na aba **Usuários** |
| **A página do GitHub dá erro 404** | Confira se o `index.html` está na raiz do repositório e se o Pages está em *main / (root)* |
| **O app não mostra a mudança que fiz** | Troque a versão no `sw.js` (veja "Como atualizar") e feche/abra o app |

### O projeto do Supabase foi pausado
No **plano gratuito**, o Supabase **pausa projetos sem uso por cerca de 1 semana** (você recebe um e-mail antes). Com o uso diário da gráfica isso não deve acontecer. Se acontecer, entre no painel do Supabase, abra o projeto e clique em **Resume project** — os dados voltam como estavam.

### Esqueci a senha do único administrador
Outro administrador pode redefinir pela aba **Usuários → Editar**. Se não houver outro, no Supabase abra o **SQL Editor** e rode (trocando o usuário e a nova senha):

```sql
update auth.users
   set encrypted_password = extensions.crypt('NOVA_SENHA_AQUI', extensions.gen_salt('bf'))
 where id = (select id from public.perfis where login = 'paulo');
```

> O `login` é o nome de usuário em minúsculas, sem acentos, com espaços trocados por ponto (ex.: "Carla Vendas" → `carla.vendas`).

### Cópia de segurança dos dados
No Supabase, em **Table Editor**, abra a tabela `servicos` (e `historico`, se quiser) e use **Export → CSV**. Faça isso de tempos em tempos.

---

## Como funciona a segurança (resumo)

- Cada pessoa tem login próprio (Supabase Auth); a senha é guardada criptografada pelo Supabase.
- **Administradores** cadastram, alteram e excluem trabalhos, processos e usuários.
- **Apenas acompanhar status** só consegue **ver** os trabalhos — o banco recusa qualquer alteração.
- O **histórico** grava automaticamente o nome de quem fez cada alteração (preenchido pelo banco, não dá para falsificar) e ninguém consegue apagá-lo pelo app.
