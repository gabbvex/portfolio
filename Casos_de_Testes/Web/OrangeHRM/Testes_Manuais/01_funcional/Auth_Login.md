# 🔐 CT-LOGIN-FUNC-001 - Validar login com credenciais válidas

**Título:** Autenticação bem-sucedida de administrador com redirecionamento ao Dashboard
**Seção:** Auth_Login  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Autenticação
**Prioridade:** Alta  
**Status:** Aprovado  
**Automação:** Implementado  
**Responsável:** Gabrielle de Oliveira Bezerra

---

## 📌 Pré-condições
- Aplicação acessível (OrangeHRM Demo)
- Usuário não autenticado (cookies limpos)
- Credenciais válidas disponíveis:
- Usuário: Admin
- Senha: admin123

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido | Observações |
|------:|------|--------------------|------------------|-------------|
| 1 | Acessar a página de login | Tela de login carregada com campos visíveis | ✅ PASSOU | |
| 2 | Informar usuário válido | Campo preenchido sem erro de validação | ✅ PASSOU | |
| 3 | Informar senha válida | Campo preenchido com máscara ativa | ✅ PASSOU | |
| 4 | Acionar o botão **Login** | Processo de autenticação iniciado | ✅ PASSOU | |
| 5 | Validar redirecionamento | URL contém /dashboard | ✅ PASSOU | |
| 6 | Validar sessão autenticada | Interface do dashboard visível | ✅ PASSOU | |

---

## 📎 Pós-condições
- Sessão ativa para usuário administrador
- Dashboard carregado
- Acesso às funcionalidades administrativas disponível

---

## 🔎 Evidência Automatizada
Validações implementadas via Playwright:
- Verificação de redirecionamento para /dashboard
- Confirmação de estado autenticado (isLoggedIn())
- Execução com limpeza prévia de sessão (clearCookies())

---

## ✅ Resultado Esperado Geral
O sistema deve permitir que um usuário administrador autenticado com credenciais válidas:
- Seja autenticado com sucesso
- Seja redirecionado automaticamente para o dashboard
- Tenha acesso às funcionalidades administrativas disponíveis

---

# ⚠ CT-LOGIN-FUNC-002 – Login com Campos Obrigatórios em Branco

**Título:** Validação de obrigatoriedade de campos
**Seção:** Auth_Login
**Template:** Passos + Resultados  
**Tipo:** Funcional / Validação
**Prioridade:** Média
**Status:** Aprovado   
**Automação:** Implementado  
**Responsável:** Gabrielle de Oliveira Bezerra  

---

## 📌 Pré-condições
- Aplicação acessível
- Usuário não autenticado (cookies limpos)
- Tela de login carregada

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido | Observações |
|------:|------|--------------------|------------------|-------------|
| 1 | Submeter formulário sem preencher campos | Validação acionada | ✅ PASSOU | |
| 2 | Validar mensagens obrigatórias | Mensagens de erro exibidas | ✅ PASSOU | |

---

## 📎 Pós-condições
- Usuário permanece na tela de login
- Sistema pronto para nova tentativa

---

## 🔎 Evidência Automatizada
Validações implementadas via Playwright:
- "page.context().clearCookies()" (garante sessão limpa)
- "loginPage.goto()"
- "loginPage.login('', '')" (submissão sem preencher)
- "loginPage.hasRequiredFieldErrors()" (confirma mensagens “Required”)
- "expect(requiredErrorsVisible).toBeTruthy()" (assert da validação)

---

## ✅ Resultado Esperado Geral
O sistema deve impedir autenticação quando campos obrigatórios estiverem vazios e exibir mensagens de validação.

---

# 🔁 CT-LOGIN-FUNC-003 – Validar redirecionamento após login

**Título:** Redirecionamento correto após autenticação  
**Seção:** Auth_Post_Login_Redirect  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Navegação  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado  
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Acessar rota protegida sem login | Redirecionado para login | ✅ Correto |
| 2 | Realizar login válido | Autenticação realizada | ✅ Correto |
| 3 | Verificar redirecionamento | Retorna à rota original | ✅ Correto |

---

## ✅ Resultado Esperado Geral
Após autenticação, o usuário deve ser redirecionado corretamente para a página originalmente solicitada.

---

# 🕒 CT-LOGIN-UI-003 – Validar persistência de sessão

**Título:** Persistência de sessão após login  
**Seção:** UI_Session_Persistence  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Navegação  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado   
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 3 min  

---

## 📌 Pré-condições
- Aplicação disponível
- Credenciais válidas disponíveis
- Navegador com cookies habilitados

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Realizar login com credenciais válidas | Usuário autenticado | ✅ Correto |
| 2 | Fechar aba do navegador | Sessão mantida em background | ✅ Correto |
| 3 | Reabrir aplicação em nova aba | Usuário permanece logado | ✅ Correto |
| 4 | Aguardar tempo limite de sessão | Sessão expira automaticamente | ✅ Correto |
| 5 | Tentar acessar área restrita após expiração | Redirecionamento para login | ✅ Correto |
| 6 | Verificar cookie de sessão | Cookie configurado corretamente | ✅ Correto |

---

## 📎 Pós-condições
- Mecanismo de sessão validado
- Segurança de expiração confirmada
- Experiência do usuário otimizada

---

## ✅ Resultado Esperado Geral
O sistema deve manter a sessão do usuário ativa durante a navegação e expirar automaticamente após período de inatividade, garantindo segurança e conveniência adequadas.

---

# 🚪 CT-LOGIN-FUNC-004 – Validar logout funcional

**Título:** Logout encerra sessão corretamente  
**Seção:** Auth_Logout  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Navegação   
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado  
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado |
|------:|------|--------------------|
| 1 | Acessar a página de login | Página carregada corretamente |
| 2 | Clicar no link "Forgot your password?" | Página/formulário de recuperação exibido |
| 3 | Informar username ou email válido | Campo aceita valor corretamente |
| 4 | Clicar no botão de envio | Solicitação processada com sucesso |
| 5 | Verificar mensagem exibida | Mensagem informando que instruções foram enviadas |
| 6 | Acessar a caixa de email | Email de recuperação recebido |
| 7 | Verificar conteúdo do email | Contém link seguro para redefinição |
| 8 | Clicar no link de redefinição | Página de criação de nova senha carregada |
| 9 | Informar nova senha válida | Senha atende critérios de segurança |
| 10 | Confirmar nova senha | Senhas coincidem |
| 11 | Submeter redefinição | Senha alterada com sucesso |
| 12 | Realizar login com nova senha | Acesso concedido |

---

## 📎 Pós-condições
- Senha do usuário atualizada  
- Token de redefinição invalidado após uso  
- Login funcional com nova senha  

---

## ✅ Resultado Esperado Geral
O logout deve encerrar completamente a sessão, impedindo qualquer acesso posterior sem nova autenticação.

---

# 🔄 CT-LOGIN-FUNC-005 – Validar recuperação de senha

**Título:** Recuperação de senha esquecida  
**Seção:** Auth_Password_Recovery  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Recuperação  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Usuário com conta válida registrada
- Acesso ao email de recuperação

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Clicar em "Esqueceu sua senha?" | Formulário de recuperação exibido | ✅ Correto |
| 2 | Informar email de recuperação válido | Email enviado com sucesso | ✅ Correto |
| 3 | Verificar caixa de entrada | Email de recuperação recebido | ✅ Correto |
| 4 | Clicar link de redefinição | Página de nova senha carregada | ✅ Correto |
| 5 | Definir nova senha | Senha alterada com sucesso | ✅ Correto |
| 6 | Realizar login com nova senha | Acesso concedido | ✅ Correto |

---

## 📎 Pós-condições
- Processo de recuperação validado
- Nova senha funcional
- Sistema seguro contra acessos não autorizados

---

## ✅ Resultado Esperado Geral
O sistema deve permitir que usuários recuperem suas senhas através de um processo seguro por email, garantindo acesso restaurado e manutenção da segurança da conta.