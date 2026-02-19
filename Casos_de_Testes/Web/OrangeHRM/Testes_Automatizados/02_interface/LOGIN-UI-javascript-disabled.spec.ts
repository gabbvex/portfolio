import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('CT-LOGIN-UI-006 - Validação com JavaScript desabilitado', () => {

  test('Validar comportamento da tela de login sem JavaScript', async ({ browser }) => {

    // ==========================================================
    // CENÁRIO 1 – JS Desabilitado
    // ==========================================================

    await test.step('Validar estrutura HTML básica sem JavaScript', async () => {

      const context = await browser.newContext({
        javaScriptEnabled: false
      });

      const page = await context.newPage();
      const loginPage = new LoginPage(page);

      await loginPage.goto(); // ✅ agora usa o método público

      const hasStructure = await loginPage.hasBasicHtmlStructure();
      await expect(hasStructure).toBeTruthy();

      await context.close();
    });

    // ==========================================================
    // CENÁRIO 2 – Fallback
    // ==========================================================

    await test.step('Validar fallback sem JavaScript', async () => {

      const context = await browser.newContext({
        javaScriptEnabled: false
      });

      const page = await context.newPage();
      const loginPage = new LoginPage(page);

      await loginPage.goto({
        waitUntil: 'domcontentloaded',
        waitForUI: false
      });


      const hasNoScript = await loginPage.hasNoScriptFallback();
      await expect(hasNoScript).toBeTruthy();

      await context.close();
    });

    // ==========================================================
    // CENÁRIO 3 – JS Habilitado
    // ==========================================================

    await test.step('Validar funcionamento normal com JavaScript habilitado', async () => {

      const context = await browser.newContext({
        javaScriptEnabled: true
      });

      const page = await context.newPage();
      const loginPage = new LoginPage(page);

      await loginPage.goto();

      await loginPage.expectCoreUIVisible();

      await context.close();
    });
  });
});
