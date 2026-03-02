import { Page, Locator, expect } from "@playwright/test";
import { testData } from "../data/test-data";

/**
 * Page Object para o Dashboard (pagina pos-login).
 *
 * Responsabilidades:
 *  - Assertions de estado autenticado
 *  - Navegacao pelo menu lateral
 *  - Logout
 */
export class DashboardPage {

  // --- Propriedades ---
  readonly page: Page;

  /**
   * Largura minima (em pixels) para considerar a tela como "desktop".
   * Abaixo disso, o sidebar fica escondido por padrao (layout responsivo).
   */
  private readonly DESKTOP_MIN_WIDTH = 992;

  // --- Locators ---

  /** Nome do usuario no canto superior direito. Indica que esta logado. */
  readonly userDropdown: Locator;

  /** Menu lateral de navegacao. */
  readonly sidebarMenu: Locator;

  /** Dropdown que aparece ao clicar no nome do usuario. */
  readonly dropdownMenu: Locator;

  /** Link de logout dentro do dropdown. */
  readonly logoutLink: Locator;

  // --- Constructor ---

  constructor(page: Page) {
    this.page = page;

    this.userDropdown = page.locator(".oxd-userdropdown-tab");
    this.sidebarMenu  = page.locator(".oxd-sidepanel-body");
    this.dropdownMenu = page.locator(".oxd-dropdown-menu");
    this.logoutLink   = page.locator(".oxd-dropdown-menu a", { hasText: "Logout" });
  }

  // --- Helpers privados ---

  /** Retorna true se a viewport atual tem largura de desktop. */
  private isDesktopViewport(): boolean {
    const viewport = this.page.viewportSize();
    return !!viewport && viewport.width >= this.DESKTOP_MIN_WIDTH;
  }

  // --- Assertions ---
  // Usam expect() do Playwright = retry automatico + mensagens claras.

  /**
   * Verifica que o usuario esta autenticado e no dashboard.
   *
   * Checa: URL contem /dashboard, nome do usuario visivel.
   * O sidebar so eh verificado em telas desktop (>= 992px),
   * porque em telas mobile ele fica escondido por padrao.
   */
  async assertIsOnDashboard() {
    await expect(this.page).toHaveURL(
      testData.urlPatterns.dashboard,
      { timeout: testData.timeouts.navigation },
    );
    await expect(this.userDropdown).toBeVisible();

    if (this.isDesktopViewport()) {
      await expect(this.sidebarMenu).toBeVisible();
    }
  }

  /** Verifica que o nome do usuario esta visivel. */
  async assertUserDropdownVisible() {
    await expect(this.userDropdown).toBeVisible();
  }

  /** Verifica que o menu lateral esta visivel. */
  async assertSidebarVisible() {
    await expect(this.sidebarMenu).toBeVisible();
  }

  // --- Acoes ---

  /**
   * Realiza logout pelo dropdown do usuario.
   * Clica no nome do usuario > espera dropdown abrir > clica em Logout.
   */
  async logout() {
    await this.userDropdown.click();
    await expect(this.dropdownMenu).toBeVisible();
    await this.logoutLink.click();
  }

  /**
   * Navega para uma secao pelo menu lateral.
   * Busca o texto DENTRO do sidebar, nao na pagina inteira.
   *
   * @param section - Texto exato do item do menu (ex: "Admin", "PIM", "Leave")
   */
  async navigateToSection(section: string) {
    const menuItem = this.sidebarMenu.locator("a", { hasText: section });
    await expect(menuItem).toBeVisible();
    await menuItem.click();
  }

  // --- Getters ---

  /** Retorna o nome do usuario exibido no dropdown. */
  async getUserName(): Promise<string> {
    return (await this.userDropdown.textContent())?.trim() ?? "";
  }
}