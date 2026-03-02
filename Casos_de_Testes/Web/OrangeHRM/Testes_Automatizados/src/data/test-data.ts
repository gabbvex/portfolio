/**
 * Dados de teste centralizados.
 *
 * Tudo que os testes precisam fica aqui: credenciais, mensagens, paths, timeouts.
 * Se um valor mudar (ex: senha do ambiente), voce altera num lugar so.
 *
 * Organizado por contexto:
 *  - credentials: dados de login (valido, invalido, caracteres especiais)
 *  - security: payloads para testes de seguranca (SQL injection, XSS, etc.)
 *  - messages: textos esperados na interface
 *  - paths: caminhos relativos (o dominio vem do baseURL no playwright.config)
 *  - urlPatterns: regex para validacao de URL
 *  - timeouts: tempos de espera em milissegundos
 */
export const testData = {

  // --- Credenciais para testes funcionais ---

  validCredentials: {
    username: "Admin",
    password: "admin123",
  },

  invalidCredentials: {
    username: "InvalidUser",
    password: "InvalidPass",
  },

  specialCharacters: {
    username: "user'name@test.com",
    password: "p@ssw0rd!#$%",
  },

  // --- Payloads para testes de seguranca ---

  security: {
    sqlInjection: {
      username: "' OR '1'='1",
      password: "' OR '1'='1",
    },
  },

  // --- Mensagens esperadas na interface ---

  messages: {
    invalidCredentials: "Invalid credentials",
    requiredField: "Required",
  },

  // --- Caminhos relativos (sem dominio) ---

  paths: {
    login: "/web/index.php/auth/login",
    dashboard: "/web/index.php/dashboard/index",
  },

  // --- Padroes regex para validacao de URL ---

  urlPatterns: {
    login: /auth\/login/,
    dashboard: /dashboard/,
  },

  // --- Timeouts em milissegundos ---

  timeouts: {
    navigation: 10_000,
  },

} as const;