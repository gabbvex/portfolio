# 🔐 OrangeHRM – Login Test Suite

Este diretório contém a **suíte de testes da funcionalidade de login** da aplicação **OrangeHRM Demo**, cobrindo aspectos de **interface, regras de autenticação, controle de acesso, segurança, gerenciamento de sessão e desempenho**.

🔗 **Aplicação alvo:**  
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

---

## 🎯 Objetivo

Garantir que o processo de login:
- Funcione corretamente para usuários válidos
- Trate erros e entradas inválidas de forma adequada
- Proteja o sistema contra acessos indevidos
- Ofereça uma experiência consistente em diferentes contextos
- Seja escalável e preparado para automação

---

## 🔑 Credenciais de Teste (Demo)

> Credenciais públicas fornecidas pela aplicação de demonstração.

- **Usuário:** `Admin`  
- **Senha:** `admin123`

---

## 🧪 Escopo de Testes

Os seguintes aspectos são validados nesta suíte:

🔐 **Autenticação**
- Login com credenciais válidas
- Bloqueio de credenciais inválidas
- Sensibilidade a maiúsculas/minúsculas
- Validação de campos obrigatórios

👥 **Controle de Acesso**
- Acesso ao dashboard apenas após autenticação
- Disponibilidade de funcionalidades administrativas

🧪 **Casos de Borda**
- Espaços em branco nos campos
- Entradas incomuns ou limites inesperados

🛡️ **Segurança**
- Tentativas de SQL Injection
- Testes básicos de XSS
- Proteção contra navegação não autenticada

🔐 **Gerenciamento de Sessão**
- Logout invalida sessão
- Bloqueio de acesso via botão “voltar”
- Redirecionamento ao tentar acessar rotas protegidas

⚙️ **Desempenho**
- Tempo de resposta do login
- Comportamento sob múltiplas tentativas consecutivas

---

## 🧪 Estratégia de Execução

- Os casos de teste são escritos inicialmente para **execução manual**
- Todos seguem um **template padronizado de metadados**
- A escrita prioriza:
  - Clareza
  - Reprodutibilidade
  - Prontidão para automação

> A automação é aplicada de forma progressiva, priorizando cenários críticos e estáveis.

---

## 🌐 Ambiente de Testes

### Navegadores
- Chrome
- Firefox
- Edge
- Safari

### Resoluções
- Desktop: 1920×1080, 1366×768
- Mobile: 375×667 (iOS), 412×915 (Android)

---

## 🧠 Princípios de Qualidade

- Testes orientados a **risco e impacto**
- Um caso de teste = um objetivo claro
- Foco em experiência do usuário e segurança
- Estrutura pensada para escalar sem gerar dívida técnica

---

## 📌 Observações

- Trata-se de uma aplicação **demo**, utilizada apenas para fins de teste e aprendizado
- Dados podem ser resetados ou alterados sem aviso
- Nenhuma automação deve assumir persistência de dados

---

## 🚀 Próximos Passos

- Expandir cobertura para outros módulos (Usuários, PIM, Admin)
- Converter casos críticos para automação (Playwright / Cypress)
- Adicionar testes de API correlacionados ao login
- Integrar com pipeline de CI/CD

