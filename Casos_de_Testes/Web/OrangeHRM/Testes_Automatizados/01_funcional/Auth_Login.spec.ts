import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';

test.describe('CT-LOGIN-FUNC - Validações de Autenticação', () => {

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ==========================================================
  // CT-LOGIN-FUNC-001 – Login com credenciais válidas
  // ==========================================================

  test('@functional CT-LOGIN-FUNC-001 - Login com credenciais válidas', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Realizar autenticação com credenciais válidas', async () => {
      await loginPage.loginWithValidCredentials();
      await page.waitForURL(/dashboard/, { timeout: 10000 });
    });

    await test.step('Validar redirecionamento e estado autenticado', async () => {
      await expect(page).toHaveURL(/dashboard/);
      await expect(dashboardPage.welcomeMessage).toBeVisible();
      await expect(dashboardPage.sidebarMenu).toBeVisible();
    });
  });

  // ==========================================================
  // CT-LOGIN-FUNC-002 – Login com campos obrigatórios em branco
  // ==========================================================

  test('@validation CT-LOGIN-FUNC-002 - Login com campos obrigatórios em branco', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Submeter formulário sem preencher campos', async () => {
      await loginPage.loginWithEmptyFields();
    });

    await test.step('Validar mensagens de obrigatoriedade', async () => {
      const requiredErrorsVisible = await loginPage.hasRequiredFieldErrors();
      await expect(requiredErrorsVisible).toBeTruthy();
    });
  });

  // ==========================================================
  // CT-LOGIN-FUNC-003 – Redirecionamento correto após autenticação
  // ==========================================================

  test('CT-LOGIN-FUNC-003 - Redirecionamento correto após autenticação', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    const protectedUrl =
      'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

    await test.step('Acessar rota protegida sem autenticação', async () => {
      await page.goto(protectedUrl);
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(await loginPage.isOnLoginPage()).toBeTruthy();
    });

    await test.step('Realizar login válido', async () => {
      await loginPage.loginWithValidCredentials();
      await page.waitForURL(/dashboard/, { timeout: 10000 });
    });

    await test.step('Validar redirecionamento final', async () => {
      await expect(page).toHaveURL(/dashboard/);
      await expect(dashboardPage.welcomeMessage).toBeVisible();
      await expect(dashboardPage.sidebarMenu).toBeVisible();
    });
  });
});
