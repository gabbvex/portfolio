# 📱 CT-LOGIN-CB-001 – Validar funcionamento em diferentes navegadores

**Título:** Compatibilidade cross-browser da página de login  
**Seção:** Cross_Browser_Compatibility  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Multi-browser  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Navegadores instalados e atualizados:
  - Chrome (última versão)
  - Firefox (última versão)
  - Safari (última versão)
  - Edge (última versão)
- Credenciais de teste disponíveis

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Acessar página de login no Chrome | Página carregada corretamente | ✅ Correto |
| 2 | Executar login básico no Chrome | Login realizado com sucesso | ✅ Correto |
| 3 | Acessar página de login no Firefox | Página carregada corretamente | ✅ Correto |
| 4 | Executar login básico no Firefox | Login realizado com sucesso | ✅ Correto |
| 5 | Acessar página de login no Safari | Página carregada corretamente | ✅ Correto |
| 6 | Executar login básico no Safari | Login realizado com sucesso | ✅ Correto |
| 7 | Acessar página de login no Edge | Página carregada corretamente | ✅ Correto |
| 8 | Executar login básico no Edge | Login realizado com sucesso | ✅ Correto |
| 9 | Comparar comportamento entre browsers | Comportamento consistente | ✅ Correto |
| 10 | Verificar renderização de elementos | Elementos renderizados corretamente | ✅ Correto |

---

## 📎 Pós-condições
- Compatibilidade cross-browser validada
- Nenhum problema crítico identificado
- Aplicação funcional em todos os navegadores suportados

---

## ✅ Resultado Esperado Geral
A página de login deve funcionar de forma consistente em todos os principais navegadores (Chrome, Firefox, Safari, Edge), com elementos renderizados corretamente e funcionalidades operacionais em todos os ambientes testados.

---

# 📱 CT-LOGIN-CB-002 – Validar funcionamento em modo anônimo / privado

**Título:** Compatibilidade em modo anônimo dos navegadores  
**Seção:** Cross_Browser_Private_Mode  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Sessão  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Navegadores com modo anônimo habilitado
- Credenciais de teste válidas

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Abrir navegador em modo anônimo | Sessão limpa iniciada | ✅ Correto |
| 2 | Acessar página de login | Página carregada corretamente | ✅ Correto |
| 3 | Executar login válido | Login realizado com sucesso | ✅ Correto |
| 4 | Navegar até dashboard | Acesso permitido | ✅ Correto |
| 5 | Fechar aba anônima | Sessão encerrada | ✅ Correto |

---

## 📎 Pós-condições

- Sessão iniciada corretamente apenas durante a aba anônima ativa  
- Nenhum dado persistido após fechamento da janela anônima  
- Cookies de sessão removidos automaticamente ao encerrar o modo privado  
- Nenhum dado armazenado em localStorage ou sessionStorage permanece após fechamento  
- Login não depende de cache ou dados previamente armazenados  
- Nova janela anônima inicia sessão limpa  
- Nenhum erro relacionado a bloqueio de cookies de terceiros (se aplicável)  
- Sistema permanece funcional mesmo com restrições típicas do modo privado  
- Nenhuma informação sensível permanece acessível após encerramento

---

## ✅ Resultado Esperado Geral
A funcionalidade de login deve operar corretamente em modo anônimo, sem dependência de cache, cookies persistentes ou dados locais prévios.

---

# 📱 CT-LOGIN-CB-003 – Validar compatibilidade com autofill do navegador

**Título:** Compatibilidade com preenchimento automático  
**Seção:** Cross_Browser_Autofill  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Usabilidade  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível e acessível  
- Página de login carregada  
- Navegador com autofill habilitado  
- Credenciais previamente salvas no navegador  
- Usuário não autenticado  
- Campos configurados corretamente com atributos name/id adequados  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Usar autofill para Username | Campo preenchido corretamente | ✅ Correto |
| 2 | Usar autofill para Password | Campo preenchido corretamente | ✅ Correto |
| 3 | Submeter login | Login realizado com sucesso | ✅ Correto |

---

## 📎 Pós-condições

- Campos preenchidos corretamente via autofill  
- Nenhuma validação indevida disparada automaticamente  
- Nenhum erro visual (ex: label sobreposto ao valor autofill)  
- Login executado normalmente com dados preenchidos automaticamente  
- Nenhuma requisição duplicada disparada  
- Senhas não exibidas em texto plano  
- Nenhuma exposição indevida de credenciais no DOM  
- Sistema permanece funcional após múltiplas tentativas com autofill

---

## ✅ Resultado Esperado Geral
O preenchimento automático do navegador deve funcionar corretamente sem quebrar validações ou fluxos de login.

---