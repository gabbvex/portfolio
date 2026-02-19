import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('CT-LOGIN-UI-003 – Validação de mensagens de erro na autenticação', () => {

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await page.waitForLoadState('networkidle');
  });

  test('CT-LOGIN-UI-003 – Deve exibir mensagem de erro para credenciais inválidas', async ({ page }) => {

    const startedAt = new Date().toISOString();
    const loginPage = new LoginPage(page);

    console.log('\n================================================================');
    console.log('RELATÓRIO DE EXECUÇÃO DE TESTE');
    console.log('ID do Caso de Teste : CT-LOGIN-UI-003');
    console.log('Título              : Validação de mensagem para credenciais inválidas');
    console.log(`Data/Hora de Início : ${startedAt}`);
    console.log('Escopo              : Verificar exibição de erro e permanência na tela de login');
    console.log('================================================================\n');

    // =============================
    // Etapa 1 – Submeter credenciais inválidas
    // =============================

    await test.step('Submeter credenciais inválidas', async () => {

      await loginPage.loginWithCredentials(
        'usuario_invalido',
        'senha_invalida'
      );

      await loginPage.waitForErrorMessage(15000);
    });

    // =============================
    // Etapa 2 – Validar mensagem de erro
    // =============================

    await test.step('Validar mensagem de erro exibida', async () => {

      const errorMessage = await loginPage.getErrorMessageText();
      await expect(errorMessage.trim()).toBe('Invalid credentials');
    });

    // =============================
    // Etapa 3 – Validar estado da página após erro
    // =============================

    await test.step('Validar permanência na tela de login e estado dos elementos', async () => {

      await expect(await loginPage.isOnLoginPage()).toBeTruthy();
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.loginButton).toBeEnabled();
    });

    console.log('\nRESULTADO CONSOLIDADO: APROVADO');
    console.log('A aplicação bloqueou autenticação inválida e exibiu mensagem adequada.');
  });
});
