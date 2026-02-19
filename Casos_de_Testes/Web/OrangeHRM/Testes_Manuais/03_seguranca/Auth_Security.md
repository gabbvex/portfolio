# 🔒 CT-LOGIN-SEC-001 – Proteção contra SQL Injection

**Título:** Bloqueio de tentativa de autenticação maliciosa
**Seção:** Auth_Security  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Autenticação
**Prioridade:** Alta  
**Status:** Aprovado  
**Automação:** Implementado  
**Responsável:** Gabrielle de Oliveira Bezerra

---

## 📌 Pré-condições
- Aplicação acessível (OrangeHRM Demo)
- Usuário não autenticado (cookies limpos)

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido | Observações |
|------:|------|--------------------|------------------|-------------|
| 1 | Inserir payload malicioso nos campos | Dados inseridos | ✅ PASSOU | |
| 2 | Submeter formulário | Processo de autenticação executado | ✅ PASSOU | |
| 3 | Validar mensagem de erro | Mensagem “Invalid credentials” exibida | ✅ PASSOU | |
| 4 | Validar permanência na tela | URL permanece em "/auth/login" | ✅ PASSOU | |

---

## 📎 Pós-condições
- Sessão não autenticada
- Nenhum acesso indevido concedido

---

## 🔎 Evidência Automatizada
Validações implementadas via Playwright:
- page.context().clearCookies() (garante sessão limpa antes do teste)
- loginPage.goto() (navegação para login)
- loginPage.loginWithValidCredentials() (ação de login)
- expect(page).toHaveURL(/.*dashboard/) (confirma redirecionamento)
- dashboardPage.isLoggedIn() (confirma estado autenticado)

---

## ✅ Resultado Esperado Geral
Tentativas de autenticação com payload malicioso devem ser bloqueadas, exibindo mensagem de erro e impedindo acesso ao sistema.

---

# ⚠ CT-LOGIN-FUNC-002 – Login com Campos em Branco

**Título:** Validação de obrigatoriedade de campos
**Seção:** Auth_Login  
**Template:** Passos + Resultados  
**Tipo:** Validação / Interface
**Prioridade:** Alta  
**Status:** Aprovado  
**Automação:** Implementado  
**Responsável:** Gabrielle de Oliveira Bezerra

---

## 📌 Pré-condições
- Aplicação acessível (OrangeHRM Demo)
- Usuário não autenticado (cookies limpos)

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido | Observações |
|------:|------|--------------------|------------------|-------------|
| 1 | Inserir payload malicioso nos campos | Dados inseridos | ✅ PASSOU | |
| 2 | Submeter formulário | Processo de autenticação executado | ✅ PASSOU | |
| 3 | Validar mensagem de erro | Mensagem “Invalid credentials” exibida | ✅ PASSOU | |
| 4 | Validar permanência na tela | URL permanece em "/auth/login" | ✅ PASSOU | |

---

## 📎 Pós-condições
- Sessão não autenticada
- Nenhum acesso indevido concedido

---

## 🔎 Evidência Automatizada
Validações implementadas via Playwright:
- page.context().clearCookies() (garante sessão limpa antes do teste)
- loginPage.goto() (navegação para login)
- loginPage.loginWithValidCredentials() (ação de login)
- expect(page).toHaveURL(/.*dashboard/) (confirma redirecionamento)
- dashboardPage.isLoggedIn() (confirma estado autenticado)

---

## ✅ Resultado Esperado Geral
Tentativas de autenticação com payload malicioso devem ser bloqueadas, exibindo mensagem de erro e impedindo acesso ao sistema.