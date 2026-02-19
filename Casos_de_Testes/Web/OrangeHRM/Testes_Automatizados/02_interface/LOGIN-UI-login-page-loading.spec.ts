import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('CT-LOGIN-UI-001 - Validação de Carregamento da Página', () => {

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('@smoke @ui CT-LOGIN-UI-001 - Deve carregar a página de login corretamente', async ({ page }) => {

    const startedAt = new Date().toISOString();
    const loginPage = new LoginPage(page);

    console.log('\n================================================================');
    console.log('RELATÓRIO DE EXECUÇÃO DE TESTE');
    console.log('ID do Caso de Teste : CT-LOGIN-UI-001');
    console.log('Título              : Validação de Carregamento da Página de Login');
    console.log(`Data/Hora de Início : ${startedAt}`);
    console.log('Escopo              : Verificar renderização e disponibilidade dos elementos principais');
    console.log('================================================================\n');

    // ==========================================================
    // ETAPA 1 – Validar renderização da página
    // ==========================================================

    await test.step('Validar renderização completa da página de login', async () => {
      await loginPage.expectPageLoaded();
      await expect(loginPage.loginButton).toBeEnabled();
    });

    // ==========================================================
    // ETAPA 2 – Validar identidade visual
    // ==========================================================

    await test.step('Validar presença do logotipo institucional', async () => {
      await expect(loginPage.logo).toBeVisible();
    });

    // ==========================================================
    // ETAPA 3 – Validar ausência de erros críticos no console
    // ==========================================================

    await test.step('Validar ausência de erros críticos no console', async () => {

      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.waitForLoadState('networkidle');

      await expect(consoleErrors).toHaveLength(0);
    });

    console.log('\nRESULTADO CONSOLIDADO: APROVADO');
    console.log('A página de login foi carregada corretamente e encontra-se operacional.');
  });

});
