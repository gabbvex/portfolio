import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('CT-LOGIN-UI-002 – Validar máscara de senha', () => {

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('@ui CT-LOGIN-UI-002 - Campo de senha deve manter máscara ativa', async ({ page }) => {

    const startedAt = new Date().toISOString();
    const loginPage = new LoginPage(page);

    console.log('\n================================================================');
    console.log('RELATÓRIO DE EXECUÇÃO DE TESTE');
    console.log('ID do Caso de Teste : CT-LOGIN-UI-002');
    console.log('Título              : Validação de Máscara de Senha');
    console.log(`Data/Hora de Início : ${startedAt}`);
    console.log('Escopo              : Garantir que o campo de senha mantenha o tipo "password"');
    console.log('================================================================\n');

    // ==========================================================
    // ETAPA 1 – Validar foco e preenchimento
    // ==========================================================

    await test.step('Preencher campo de senha', async () => {
      await loginPage.passwordInput.click();
      await expect(loginPage.passwordInput).toBeFocused();

      await loginPage.fillPassword('testpassword123');

      const value = await loginPage.getPasswordValue();
      await expect(value).toBe('testpassword123');
    });

    // ==========================================================
    // ETAPA 2 – Validar tipo do input (máscara ativa)
    // ==========================================================

    await test.step('Validar que o tipo do input permanece como password', async () => {
      const isMasked = await loginPage.expectPasswordMasked();
      await expect(isMasked).toBeTruthy();
    });

    // ==========================================================
    // ETAPA 3 – Validar comportamento após novo preenchimento
    // ==========================================================

    await test.step('Validar que a máscara permanece ativa após novo valor', async () => {
      await loginPage.fillPassword('pastedpassword');

      const value = await loginPage.getPasswordValue();
      await expect(value).toBe('pastedpassword');

      const isMasked = await loginPage.expectPasswordMasked();
      await expect(isMasked).toBeTruthy();
    });

    console.log('\nRESULTADO CONSOLIDADO: APROVADO');
    console.log('O campo de senha manteve a máscara ativa durante todo o fluxo.');
  });
});
