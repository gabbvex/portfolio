import { Page, Locator, expect } from "@playwright/test";
import { testData } from "../data/test-data";

/**
 * Page Object para a tela de Login.
 *
 * Responsabilidades:
 *  - Navegar para a pagina de login
 *  - Preencher e submeter o formulario
 *  - Verificar mensagens de erro
 *  - Assertions de estado da pagina
 */
export class LoginPage {

  // --- Propriedades ---
  readonly page: Page;
  private readonly PATH = testData.paths.login;

  // --- Locators: Formulario ---
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;

  // --- Locators: Mensagens de Erro ---

  /** Alerta de credenciais invalidas (ex: "Invalid credentials") */
  readonly invalidCredentialsAlert: Locator;

  /**
   * Mensagens de campo obrigatorio.
   * Usa a classe CSS do componente de erro, nao depende de posicao.
   */
  readonly requiredFieldErrors: Locator;

  // --- Monitoramento de Console ---
  private readonly consoleErrors: string[] = [];

  // --- Constructor ---

  constructor(page: Page) {
    this.page = page;

    // Formulario
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton   = page.locator('button[type="submit"]');
    this.logo          = page.locator('img[alt="company-branding"]');

    // Mensagens de erro
    this.invalidCredentialsAlert = page.locator(".oxd-alert-content-text");
    this.requiredFieldErrors     = page.locator(".oxd-input-field-error-message");

    // Captura erros do console DESDE O INICIO
    this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        this.consoleErrors.push(msg.text());
      }
    });
  }

  // --- Navegacao ---

  /** Navega para a pagina de login. Usa baseURL do Playwright config. */
  async goto() {
    await this.page.goto(this.PATH);
    await this.usernameInput.waitFor({ state: "visible" });
  }

  // --- Acoes ---

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  /** Preenche e submete o formulario de login. */
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitLogin();
  }

  async loginWithValidCredentials() {
    await this.login(
      testData.validCredentials.username,
      testData.validCredentials.password,
    );
  }

  async loginWithInvalidCredentials() {
    await this.login(
      testData.invalidCredentials.username,
      testData.invalidCredentials.password,
    );
  }

  /** Submete o formulario sem preencher nada. */
  async loginWithEmptyFields() {
    await this.submitLogin();
  }

  // --- Assertions ---
  // Usam expect() do Playwright = retry automatico + mensagens claras.

  /** Verifica que a URL atual eh a de login. */
  async assertIsOnLoginPage() {
    await expect(this.page).toHaveURL(testData.urlPatterns.login);
  }

  /** Verifica que os elementos principais do formulario estao visiveis. */
  async assertFormIsVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /** Verifica que o campo de senha tem type="password" (mascarado). */
  async assertPasswordIsMasked() {
    await expect(this.passwordInput).toHaveAttribute("type", "password");
  }

  /** Verifica que o alerta de credenciais invalidas esta visivel. */
  async assertInvalidCredentialsVisible() {
    await expect(this.invalidCredentialsAlert).toBeVisible();
  }

  /**
   * Verifica as mensagens de campo obrigatorio.
   * @param expectedCount - Quantos erros esperar (padrao: 2, username + password)
   */
  async assertRequiredFieldErrors(expectedCount = 2) {
    await expect(this.requiredFieldErrors).toHaveCount(expectedCount);
  }

  /** Verifica que o logo esta visivel. */
  async assertLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  // --- Getters (para quando o teste precisa do valor) ---

  /** Retorna o texto da mensagem de erro de credenciais. */
  async getErrorMessageText(): Promise<string> {
    return (await this.invalidCredentialsAlert.textContent()) ?? "";
  }

  /** Retorna todos os textos das mensagens de campo obrigatorio. */
  async getRequiredFieldErrorMessages(): Promise<string[]> {
    return this.requiredFieldErrors.allTextContents();
  }

  /** Retorna os erros de console capturados desde a criacao da pagina. */
  getConsoleErrors(): string[] {
    return [...this.consoleErrors];
  }

  /** Retorna o valor atual do campo de senha. */
  async getPasswordValue(): Promise<string> {
    return this.passwordInput.inputValue();
  }
}