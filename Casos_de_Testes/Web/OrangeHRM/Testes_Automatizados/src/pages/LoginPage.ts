import { Page, Locator } from '@playwright/test';
import { testData } from '../data/test-data';

export class LoginPage {

  // ==========================================================
  // 1. PROPRIEDADES BÁSICAS
  // ==========================================================

  readonly page: Page;

  private readonly URL =
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  // ==========================================================
  // 2. LOCATORS
  // ==========================================================

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;

  readonly credentialErrorMessage: Locator;
  readonly requiredUsernameMessage: Locator;
  readonly requiredPasswordMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.logo = page.locator('img[alt="company-branding"]');

    this.credentialErrorMessage = page.locator('.oxd-alert-content-text');
    this.requiredUsernameMessage = page.getByText('Required').first();
    this.requiredPasswordMessage = page.getByText('Required').nth(1);
  }

  // ==========================================================
  // 3. NAVEGAÇÃO
  // ==========================================================

  async goto(options?: {
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
    waitForUI?: boolean;
  }) {

    await this.page.goto(this.URL, {
      waitUntil: options?.waitUntil ?? 'load'
    });

    if (options?.waitForUI) {
      await this.expectCoreUIVisible();
    }
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes('/auth/login');
  }

  // ==========================================================
  // 4. AÇÕES
  // ==========================================================

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitLogin();
  }

  async loginWithValidCredentials() {
    await this.login(
      testData.validCredentials.username,
      testData.validCredentials.password
    );
  }

  async loginWithInvalidCredentials() {
    await this.login(
      testData.invalidCredentials.username,
      testData.invalidCredentials.password
    );
  }

  async loginWithEmptyFields() {
    await this.login('', '');
  }

  // ==========================================================
  // 5. ASSERTIONS / EXPECT HELPERS
  // ==========================================================

  async expectCoreUIVisible(timeout = 10000) {
    await this.usernameInput.waitFor({ state: 'visible', timeout });
    await this.passwordInput.waitFor({ state: 'visible', timeout });
    await this.loginButton.waitFor({ state: 'visible', timeout });
  }

  async expectPageLoaded(timeout = 10000) {
    await this.expectCoreUIVisible(timeout);
    await this.logo.waitFor({ state: 'visible', timeout });
  }

  async expectLogoVisible(timeout = 10000) {
    await this.logo.waitFor({ state: 'visible', timeout });
  }

  async expectPasswordMasked(): Promise<boolean> {
    const type = await this.passwordInput.getAttribute('type');
    return type === 'password';
  }

  async waitForErrorMessage(timeout = 10000) {
    await this.credentialErrorMessage.waitFor({
      state: 'visible',
      timeout
    });
  }

  async hasRequiredFieldErrors(timeout = 10000): Promise<boolean> {
    try {
      await this.requiredUsernameMessage.waitFor({ state: 'visible', timeout });
      await this.requiredPasswordMessage.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  // ==========================================================
  // 6. I18N / UI TEXT VALIDATIONS
  // ==========================================================

  async getUITexts() {
    const username =
      (await this.usernameInput.getAttribute('placeholder'))?.trim() ?? '';

    const password =
      (await this.passwordInput.getAttribute('placeholder'))?.trim() ?? '';

    const button =
      (await this.loginButton.textContent())?.trim() ?? '';

    return { username, password, button };
  }

  async isEnglishUI(): Promise<boolean> {
    const { username, password, button } = await this.getUITexts();

    return (
      username.toLowerCase().includes('username') &&
      password.toLowerCase().includes('password') &&
      button.toLowerCase().includes('login')
    );
  }

  async hasVisualTranslation(): Promise<boolean> {
    return !(await this.isEnglishUI());
  }

  // ==========================================================
  // 7. ESTRUTURA / JAVASCRIPT / HTML VALIDATION
  // ==========================================================

  async getHtml(): Promise<string> {
    return await this.page.content();
  }

  async hasBasicHtmlStructure(): Promise<boolean> {
    const html = await this.getHtml();
    return html.includes('<html') && html.includes('<body');
  }

  async hasNoScriptFallback(): Promise<boolean> {
    const html = await this.getHtml();
    return html.includes('<noscript');
  }

  async mentionsJavaScript(): Promise<boolean> {
    const html = await this.getHtml();
    return html.toLowerCase().includes('javascript');
  }

  async getStructuralValidation() {
    const html = await this.getHtml();

    return {
      hasHtml: html.includes('<html'),
      hasHead: html.includes('<head'),
      hasBody: html.includes('<body'),
      hasForm: html.includes('<form'),
      hasInput: html.includes('input'),
      hasNoScript: html.includes('<noscript')
    };
  }

  // ==========================================================
  // 8. UTILITÁRIOS
  // ==========================================================

  async getErrorMessageText(): Promise<string> {
    return (await this.credentialErrorMessage.textContent()) ?? '';
  }

  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  async hasConsoleErrors(): Promise<boolean> {
    const errors: string[] = [];

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await this.page.waitForLoadState('networkidle');

    return errors.length > 0;
  }
}
