import { Page, Locator } from '@playwright/test';
import { testData } from '../data/test-data';

export class LoginPage {
  readonly page: Page;

  // Elementos principais
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;

  // Mensagens
  readonly credentialErrorMessage: Locator;
  readonly requiredUsernameMessage: Locator;
  readonly requiredPasswordMessage: Locator;

  private readonly url =
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

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

  // =========================
  // Navegação
  // =========================

  async goto() {
    await this.page.goto(this.url);
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  // =========================
  // Ações
  // =========================

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
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

// =========================
// Ações reutilizáveis
// =========================

async fillUsername(username: string) {
  await this.usernameInput.fill(username);
}

async fillPassword(password: string) {
  await this.passwordInput.fill(password);
}

async submitLogin() {
  await this.loginButton.click();
}

async loginWithCredentials(username: string, password: string) {
  await this.fillUsername(username);
  await this.fillPassword(password);
  await this.submitLogin();
}

async isOnLoginPage(): Promise<boolean> {
  return this.page.url().includes('/auth/login');
}


  // =========================
  // Validações reutilizáveis
  // =========================

  async isCoreElementsVisible(): Promise<boolean> {
    const usernameVisible = await this.usernameInput.isVisible();
    const passwordVisible = await this.passwordInput.isVisible();
    const buttonVisible = await this.loginButton.isVisible();

    return usernameVisible && passwordVisible && buttonVisible;
  }

  async getUITexts() {
    const usernamePlaceholder =
      (await this.usernameInput.getAttribute('placeholder')) ?? '';

    const passwordPlaceholder =
      (await this.passwordInput.getAttribute('placeholder')) ?? '';

    const loginButtonText =
      (await this.loginButton.textContent())?.trim() ?? '';

    return {
      usernamePlaceholder: usernamePlaceholder.trim(),
      passwordPlaceholder: passwordPlaceholder.trim(),
      loginButtonText: loginButtonText.trim(),
    };
  }

  async isEnglishUI(): Promise<boolean> {
    const { usernamePlaceholder, passwordPlaceholder, loginButtonText } =
      await this.getUITexts();

    const U = usernamePlaceholder.toLowerCase();
    const P = passwordPlaceholder.toLowerCase();
    const B = loginButtonText.toLowerCase();

    return (
      U.includes('username') &&
      P.includes('password') &&
      B.includes('login')
    );
  }

  async getHtmlContent(): Promise<string> {
    return await this.page.content();
  }

  async hasNoScriptTag(): Promise<boolean> {
    const html = await this.getHtmlContent();
    return html.includes('<noscript');
  }

  async getPasswordInputType(): Promise<string | null> {
    return await this.passwordInput.getAttribute('type');
  }

  async waitForErrorMessage(timeout: number = 10000) {
    await this.credentialErrorMessage.waitFor({
      state: 'visible',
      timeout
    });
  }

  async getErrorMessageText(): Promise<string> {
    return (await this.credentialErrorMessage.textContent()) ?? '';
  }

  async hasRequiredFieldErrors(timeout: number = 10000): Promise<boolean> {
    try {
      await this.requiredUsernameMessage.waitFor({ state: 'visible', timeout });
      await this.requiredPasswordMessage.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}
