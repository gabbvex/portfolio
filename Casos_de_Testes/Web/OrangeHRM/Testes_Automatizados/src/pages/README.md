# 📁 Pages – Page Object Model (POM)

Esta pasta contém a implementação das páginas da aplicação seguindo o padrão **Page Object Model (POM)** utilizando **Playwright + TypeScript**.

O objetivo é encapsular elementos, ações e validações de cada página em classes reutilizáveis, garantindo:

- 🔹 **Organização** estruturada e consistente
- 🔹 **Reutilização de código** através de componentes modulares
- 🔹 **Baixo acoplamento** entre testes e implementação
- 🔹 **Alta legibilidade** com métodos semanticamente claros
- 🔹 **Manutenibilidade** com localização centralizada de elementos
- 🔹 **Escalabilidade** para suportar múltiplas páginas e fluxos

---

## 🧱 Arquitetura Aplicada

O projeto utiliza o padrão **Page Object Model**, onde:

- Cada página da aplicação é representada por uma classe
- Locators e seletores ficam centralizados nas respectivas classes
- Ações e validações são encapsuladas em métodos significativos
- Testes interagem apenas com a interface pública das páginas
- Componentes compartilhados podem ser extraídos para classes base ou utilitários

---

# 📄 Estrutura Atual

pages/
├── LoginPage.ts
├── DashboardPage.ts
└── README.md

---

# 🔐 LoginPage

Responsável por encapsular toda a lógica da tela de autenticação.

## 🔎 Responsabilidades

- Navegação e carregamento da página
- Preenchimento de credenciais
- Submissão do formulário
- Validação de mensagens de erro
- Validação de obrigatoriedade
- Validação de i18n (internacionalização)
- Validação de estrutura HTML (fallback sem JS)
- Verificações de UI (elementos principais)

## 📌 Principais Métodos

| Método | Responsabilidade |
|--------|------------------|
| `goto()` | Navega para a página de login |
| `login(username, password)` | Executa login com credenciais informadas |
| `loginWithValidCredentials()` | Login com dados válidos |
| `loginWithInvalidCredentials()` | Login com dados inválidos |
| `expectPageLoaded()` | Aguarda elementos principais |
| `hasRequiredFieldErrors()` | Verifica mensagens de obrigatoriedade |
| `hasVisualTranslation()` | Verifica tradução visual |
| `hasBasicHtmlStructure()` | Valida estrutura HTML sem JS |

---

# 📊 DashboardPage

Representa a página pós-autenticação.

## 🔎 Responsabilidades

- Validação de estado autenticado
- Navegação entre seções do sistema
- Execução de logout seguro
- Verificação de permissões e acesso

## 📌 Principais Métodos

| Método | Responsabilidade |
|--------|------------------|
| `isLoggedIn()` | Verifica se o usuário está autenticado |
| `logout()` | Executa logout |
| `navigateTo(section)` | Navega para uma seção do sistema |

---

# 🏗️ Padrões Aplicados

## ✅ Encapsulamento
Testes não acessam diretamente seletores ou elementos DOM. Todo acesso é feito através de métodos públicos das classes.

## ✅ Separação de responsabilidades
Cada classe representa uma única página ou componente, mantendo foco e coesão.

## ✅ Métodos reutilizáveis
Ações são compostas por pequenos métodos reutilizáveis (`fillUsername`, `submitLogin`, etc).

## ✅ Assertions centralizadas
Validações importantes ficam na própria página quando fazem sentido semântico.

## ✅ Tipagem Forte com TypeScript
Todos os métodos e propriedades utilizam tipagem explícita para maior segurança e autocomplete.

---

# 🚀 Benefícios para o Projeto

| Benefício | Impacto |
|-----------|---------|
| Manutenção Simplificada | Alterações em UIs impactam apenas uma classe |
| Redução de Duplicação | Lógica comum fica centralizada |
| Escalabilidade Horizontal | Fácil adicionar novas páginas e fluxos |
| Testes Declarativos | Código de teste foca em intenção, não em implementação |
| Colaboração Aprimorada | Equipe entende rapidamente a estrutura |
| Qualidade Garantida | Padrões consistentes reduzem bugs |

---

# 💡 Exemplo de Uso em Teste

```ts
const loginPage = new LoginPage(page);

await loginPage.goto({ waitForUI: true });
await loginPage.loginWithValidCredentials();
