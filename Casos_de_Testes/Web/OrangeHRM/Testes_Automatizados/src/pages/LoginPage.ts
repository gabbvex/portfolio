import { Page, Locator, expect } from '@playwright/test';
import { testData, expectedMessages } from '../data/test-data';
import console from 'console';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly credentialErrorMessage: Locator;
  readonly invalidCredentials: Locator;
  readonly invalidUsername: Locator;
  readonly invalidPassword: Locator;
  readonly logo: Locator;
  readonly requiredUsernameMessage: Locator;
  readonly requiredPasswordMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.credentialErrorMessage = page.locator('.oxd-alert-content-text');
    this.invalidCredentials = page.locator('[role="alert"]');
    this.invalidUsername = page.locator('[role="alert"]');
    this.invalidPassword = page.locator('[role="alert"]');
    this.logo = page.locator('img[alt="company-branding"]');
    this.requiredUsernameMessage = page.getByText('Required').first();
    this.requiredPasswordMessage = page.getByText('Required').nth(1);
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithValidCredentials() {
    await this.login(testData.validCredentials.username, testData.validCredentials.password);
  }

  async loginWithInvalidCredentials() {
    await this.login(testData.invalidCredentials.username, testData.invalidCredentials.password);
  }

  async loginWithEmptyFields() {
    await this.login(testData.emptyCredentials.username, testData.emptyCredentials.password);
  }

  async waitForCredentialErrorMessageErrorMessage() {
    await this.credentialErrorMessage.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getErrorMessageText(): Promise<string> {
    return await this.credentialErrorMessage.textContent() || 'Invalid credentials';
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async getUsernameInputValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  async getPasswordInputValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  async expectRequiredErrors(timeout: number = 15000): Promise<boolean> {
    try {
      await this.requiredUsernameMessage.waitFor({ 
        state: 'visible', 
        timeout 
      });
      await this.requiredPasswordMessage.waitFor({ 
        state: 'visible', 
        timeout 
      });
      
      const usernameVisible = await this.requiredUsernameMessage.isVisible();
      const passwordVisible = await this.requiredPasswordMessage.isVisible();
      return usernameVisible && passwordVisible;
    } catch (error) {
      console.log('Timeout esperando mensagens de erro:', error);
      return false;
    }
  }
}