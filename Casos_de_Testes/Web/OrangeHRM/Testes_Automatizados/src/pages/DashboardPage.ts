import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly sidebarMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('.oxd-userdropdown-tab');
    this.sidebarMenu = page.locator('.oxd-sidepanel-body');
    this.logoutButton = page.locator('text=Logout');
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      await this.welcomeMessage.waitFor({ state: 'visible', timeout: 10000 });
      return await this.welcomeMessage.isVisible();
    } catch {
      return false;
    }
  }

  async logout() {
    await this.welcomeMessage.click();
    await this.logoutButton.click();
  }

  async navigateTo(section: string) {
    await this.page.locator(`text=${section}`).click();
  }
}
