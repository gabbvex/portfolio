import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import { testData } from "../src/data/test-data";

// ----------------------------------------------------------------
// Suite de Testes
// ----------------------------------------------------------------

test.describe("CT-LOGIN-FUNC - Validacoes de Autenticacao", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();
  });

  // ----------------------------------------------------------------
  // CT-LOGIN-FUNC-001 - Login com credenciais validas
  // ----------------------------------------------------------------

  test("@smoke @functional CT-LOGIN-FUNC-001 - Login com credenciais validas", async ({ page }) => {

    await test.step("Realizar autenticacao com credenciais validas", async () => {
      await loginPage.loginWithValidCredentials();
    });

    await test.step("Validar redirecionamento e estado autenticado", async () => {
      await dashboardPage.assertIsOnDashboard();
    });
  });

  // ----------------------------------------------------------------
  // CT-LOGIN-FUNC-002 - Login com campos obrigatorios em branco
  // ----------------------------------------------------------------

  test("@validation CT-LOGIN-FUNC-002 - Login com campos obrigatorios em branco", async ({ page }) => {

    await test.step("Submeter formulario sem preencher campos", async () => {
      await loginPage.loginWithEmptyFields();
    });

    await test.step("Validar mensagens de obrigatoriedade", async () => {
      await loginPage.assertRequiredFieldErrors(2);

      const errorTexts = await loginPage.getRequiredFieldErrorMessages();
      expect(errorTexts).toEqual([
        testData.messages.requiredField,
        testData.messages.requiredField,
      ]);
    });

    await test.step("Validar que permaneceu na tela de login", async () => {
      await loginPage.assertIsOnLoginPage();
    });
  });

  // ----------------------------------------------------------------
  // CT-LOGIN-FUNC-003 - Login com credenciais invalidas
  // ----------------------------------------------------------------

  test("@validation CT-LOGIN-FUNC-003 - Login com credenciais invalidas", async ({ page }) => {

    await test.step("Submeter formulario com credenciais incorretas", async () => {
      await loginPage.loginWithInvalidCredentials();
    });

    await test.step("Validar mensagem de erro de autenticacao", async () => {
      await loginPage.assertInvalidCredentialsVisible();
    });

    await test.step("Validar que permaneceu na tela de login", async () => {
      await loginPage.assertIsOnLoginPage();
    });
  });

  // ----------------------------------------------------------------
  // CT-LOGIN-FUNC-004 - Rota protegida redireciona para login
  // ----------------------------------------------------------------

  test("@functional CT-LOGIN-FUNC-004 - Rota protegida redireciona para login", async ({ page }) => {

    await test.step("Acessar rota protegida sem autenticacao", async () => {
      await page.goto(testData.paths.dashboard);
    });

    await test.step("Validar redirecionamento para a tela de login", async () => {
      await loginPage.assertIsOnLoginPage();
      await loginPage.assertFormIsVisible();
    });
  });

  // ----------------------------------------------------------------
  // CT-LOGIN-FUNC-005 - Redirecionamento pos-login para rota protegida
  // ----------------------------------------------------------------

  test("@functional CT-LOGIN-FUNC-005 - Redirecionamento pos-login para rota desejada", async ({ page }) => {

    await test.step("Acessar rota protegida (sera redirecionado ao login)", async () => {
      await page.goto(testData.paths.dashboard);
      await loginPage.assertIsOnLoginPage();
    });

    await test.step("Realizar login com credenciais validas", async () => {
      await loginPage.loginWithValidCredentials();
    });

    await test.step("Validar redirecionamento para o dashboard", async () => {
      await dashboardPage.assertIsOnDashboard();
    });
  });
});