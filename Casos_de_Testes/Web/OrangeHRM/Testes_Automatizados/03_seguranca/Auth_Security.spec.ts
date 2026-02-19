import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { testData, expectedMessages } from '../src/data/test-data';

test.describe('CT-LOGIN-SEC-001 – Proteção contra SQL Injection', () => {

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await page.waitForLoadState('networkidle');
  });

  test('@security CT-LOGIN-SEC-001 – Bloquear tentativa de SQL Injection', async ({ page }) => {

    const startedAt = new Date().toISOString();
    const loginPage = new LoginPage(page);

    console.log('\n================================================================');
    console.log('RELATÓRIO DE EXECUÇÃO DE TESTE');
    console.log('ID do Caso de Teste : CT-LOGIN-SEC-001');
    console.log('Título              : Proteção contra SQL Injection');
    console.log(`Data/Hora de Início : ${startedAt}`);
    console.log('Escopo              : Validação de bloqueio de payload malicioso');
    console.log('================================================================\n');

    await test.step('Submeter payload malicioso nos campos de autenticação', async () => {
      await loginPage.login(
        testData.sqlInjection.username,
        testData.sqlInjection.password
      );
    });

    await test.step('Validar exibição de mensagem de erro', async () => {
      await loginPage.waitForErrorMessage();
      const errorMessage = await loginPage.getErrorMessageText();

      console.log(`Mensagem exibida: "${errorMessage}"`);

      await expect(errorMessage.trim()).toEqual(
        expectedMessages.invalidCredentials
      );
    });

    await test.step('Validar que não houve redirecionamento', async () => {
      await expect(page).toHaveURL(/.*auth\/login/);
    });

    console.log('\nRESULTADO CONSOLIDADO: APROVADO');
  });

});
