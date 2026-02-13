import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { testData, expectedMessages } from '../src/data/test-data';

test.describe('Login Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await page.waitForLoadState('networkidle');
  });

  test('@smoke @ui Validar carregamento da página de login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
    await expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
    await expect(await loginPage.isLogoVisible()).toBeTruthy();

    const errorLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errorLogs.push(msg.text());
      }
    });

    await page.waitForLoadState('networkidle');
    
    expect(errorLogs).toHaveLength(0);
  });

  test('@functional Validar login com credenciais válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.loginWithValidCredentials();
    
    await expect(page).toHaveURL(/.*dashboard/);
    expect(await dashboardPage.isLoggedIn()).toBeTruthy();
  });

  test('@functional Validar login com credenciais inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginWithInvalidCredentials();
    await loginPage.waitForCredentialErrorMessageErrorMessage();

    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage.trim()).toEqual(expectedMessages.invalidCredentials);
    
    await expect(page).toHaveURL(/.*auth\/login/);
  });


  test('@validation Validar login com credenciais em branco', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('', '');
    
    const bothErrorsVisible = await loginPage.expectRequiredErrors(15000);
    expect(bothErrorsVisible).toBe(true);
  });

  test('@security Validar proteção contra SQL Injection', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(testData.sqlInjection.username, testData.sqlInjection.password);
    await loginPage.waitForCredentialErrorMessageErrorMessage();

    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage.trim()).toEqual(expectedMessages.invalidCredentials);
    
    await expect(page).toHaveURL(/.*auth\/login/);
  });
});
