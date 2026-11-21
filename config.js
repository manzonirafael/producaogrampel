// =====================================================================
//  Configuração do Supabase
//  Copie os valores em: Supabase → Project Settings → API (ou "API Keys")
// =====================================================================
window.GRAMPEL_CONFIG = {
  // "Project URL", algo como https://abcdefghijk.supabase.co
  SUPABASE_URL: 'COLE_AQUI_A_URL_DO_PROJETO',

  // Chave pública: "anon public" ou "publishable" (NUNCA use a "service_role" / "secret")
  SUPABASE_KEY: 'COLE_AQUI_A_CHAVE_PUBLICA',

  // Domínio usado só internamente para transformar o nome de usuário em login.
  // Ninguém recebe e-mail. Só mude se o Supabase reclamar do endereço.
  EMAIL_DOMINIO: 'grampel.app',
};
