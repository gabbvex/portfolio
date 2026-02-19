import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('CT-LOGIN-UI-004 – Validação de Responsividade', () => {

  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('@ui CT-LOGIN-UI-004 - Layout deve permanecer funcional em múltiplos viewports', async ({ page }) => {

    const startedAt = new Date().toISOString();
    const loginPage = new LoginPage(page);

    console.log('\n================================================================');
    console.log('RELATÓRIO DE EXECUÇÃO DE TESTE');
    console.log('ID do Caso de Teste : CT-LOGIN-UI-004');
    console.log('Título              : Validação de Responsividade');
    console.log(`Data/Hora de Início : ${startedAt}`);
    console.log('Escopo              : Verificar renderização adequada em diferentes resoluções');
    console.log('================================================================\n');

    const viewports = [
      { width: 1920, height: 1080, label: 'Desktop Full HD' },
      { width: 1366, height: 768, label: 'Laptop' },
      { width: 1024, height: 768, label: 'Tablet Landscape' },
      { width: 768, height: 1024, label: 'Tablet Portrait' },
      { width: 480, height: 800, label: 'Mobile Large' },
      { width: 375, height: 667, label: 'Mobile Small' }
    ];

    for (const viewport of viewports) {

      await test.step(`Validar layout em ${viewport.label} (${viewport.width}x${viewport.height})`, async () => {

        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height
        });

        await loginPage.expectCoreUIVisible();

        if (viewport.width >= 1024) {
          await loginPage.expectLogoVisible();
        }
      });
    }

    console.log('\nRESULTADO CONSOLIDADO: APROVADO');
    console.log('A interface permaneceu funcional e visível em todos os breakpoints testados.');
  });
});
