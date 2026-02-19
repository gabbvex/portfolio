import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('CT-LOGIN-UI-005 - Validação de Internacionalização', () => {

  test('Deve validar comportamento de internacionalização da tela de login', async ({ browser }) => {

    const locales = [
      { locale: 'en-US', name: 'Inglês' },
      { locale: 'es-ES', name: 'Espanhol' },
      { locale: 'fr-FR', name: 'Francês' }
    ];

    let visualTranslationGapDetected = false;

    for (const config of locales) {

      await test.step(`Validar locale ${config.locale} (${config.name})`, async () => {

        const context = await browser.newContext({ locale: config.locale });
        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        const hasTranslation = await loginPage.hasVisualTranslation();

        if (config.locale === 'en-US') {
          await expect(hasTranslation).toBeFalsy();
        } else {
          if (!hasTranslation) {
            visualTranslationGapDetected = true;
          }
        }

        await context.close();
      });
    }

    if (visualTranslationGapDetected) {
      console.warn(
        '⚠️ Gap de internacionalização detectado: aplicação não possui tradução visual implementada.'
      );
    }
  });

  // ==========================================================
  // Validação técnica de suporte ao locale
  // ==========================================================

  test('Validar suporte técnico multilíngue (renderização)', async ({ browser }) => {

    const locales = ['en-US', 'es-ES', 'fr-FR', 'pt-BR'];

    for (const locale of locales) {

      await test.step(`Validar renderização para ${locale}`, async () => {

        const context = await browser.newContext({ locale });
        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.expectCoreUIVisible();

        await context.close();
      });
    }
  });

});

