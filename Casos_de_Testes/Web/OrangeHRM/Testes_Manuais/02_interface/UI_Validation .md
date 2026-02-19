# 🔐 CT-LOGIN-FUNC – Validações de Autenticação

# 🔐 CT-LOGIN-FUNC-001 – Login com Credenciais Válidas

**Título:** Validar carregamento da página de login  
**Seção:** UI_Validation  
**Template:** Passos + Resultados  
**Tipo:** Interface / UI  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado  
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação disponível
- Navegador acessível

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Acessar a URL `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` | Página de login carregada | ✅ Passou |
| 2 | Verificar campo **Username** | Campo visível e editável | ✅ Passou |
| 3 | Verificar campo **Password** | Campo visível e editável | ✅ Passou |
| 4 | Verificar botão **Login** | Botão visível e habilitado | ✅ Passou |
| 5 | Verificar logo OrangeHRM | Logo carregada corretamente | ✅ Passou |
| 6 | Abrir console do navegador | Nenhum erro presente | ✅ Passou |

---

## 📎 Pós-condições
- Página de login validada
- Elementos principais confirmados

---

## ✅ Resultado Esperado Geral
Todos os elementos essenciais da página de login devem estar visíveis e funcionais, sem erros no console do navegador.

---

# 📱 CT-LOGIN-UI-002 – Validar máscara de senha

**Título:** Máscara de senha no campo de entrada  
**Seção:** UI_Password_Masking  
**Template:** Passos + Resultados  
**Tipo:** Interface / Segurança  
**Prioridade:** Baixa  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação disponível
- Usuário não autenticado
- Campo de senha visível

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Clicar no campo de senha | Campo pronto para digitação | ✅ Correto |
| 2 | Digitar caracteres no campo de senha | Caracteres mascarados (•••••) | ✅ Correto |
| 3 | Verificar tipo do campo | type="password" no HTML | ✅ Correto |
| 4 | Tentar colar senha do clipboard | Senha colada mas mascarada | ✅ Correto |
| 5 | Verificar opção de mostrar senha | Ícone de visibilidade presente | ✅ Correto |
| 6 | Clicar ícone de mostrar senha | Senha temporariamente visível | ✅ Correto |

---

## 📎 Pós-condições
- Máscara de senha funcionando corretamente
- Segurança visual confirmada
- Opção de visualização disponível

---

# ❌ CT-LOGIN-UI-003 – Validar mensagens de erro na autenticação

**Título:** Validação de mensagem de erro para credenciais inválidas  
**Seção:** UI_Error_Messages  
**Template:** Passos + Resultados  
**Tipo:** Interface / Autenticação 
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Implementado
**Responsável:** Gabrielle de Oliveira Bezerra

---

## 📌 Pré-condições
- Aplicação acessível (OrangeHRM Demo)
- Usuário não autenticado
- Tela de login carregada

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido | Observações |
|------:|------|--------------------|------------------|-------------|
| 1 | Informar usuário inválido | Campo preenchido sem erro estrutural | ✅ PASSOU | |
| 2 | Informar senha inválida | Campo preenchido com máscara ativa | ✅ PASSOU | |
| 3 | Acionar o botão **Login** | Processo de autenticação iniciado | ✅ PASSOU | |
| 4 | Validar mensagem exibida | Mensagem "Invalid credentials" visível | ✅ PASSOU | |
| 5 | Validar estado da página | Permanência na URL /auth/login | ✅ PASSOU | |
| 6 | Validar estado do botão | Botão de login visível e habilitado | ✅ PASSOU | |

---

## 📎 Pós-condições
- Mensagem de erro exibida corretamente
- Sessão não autenticada
- Interface permanece funcional para nova tentativa

---

## Evidência Automatizada
Validações implementadas via Playwright:
- Método loginWithCredentials()
- waitForErrorMessage()
- Verificação de texto exato da mensagem de erro
- Confirmação de permanência na tela de login

---

## ✅ Resultado Esperado Geral
O sistema deve:
- Bloquear tentativas de autenticação com credenciais inválidas
- Exibir mensagem clara de erro
- Permanecer na tela de login
- Permitir nova tentativa de autenticação

---

# 📱 CT-LOGIN-UI-004 – Validar redimensionamento dinâmico da janela

**Título:** Comportamento responsivo durante redimensionamento da janela  
**Seção:** UI_Dynamic_Resize  
**Template:** Passos + Resultados  
**Tipo:** Interface / Responsividade  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação disponível
- Navegador em modo desktop
- Ferramenta de inspeção (DevTools) opcional

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Acessar página de login em janela grande | Layout desktop exibido | ✅ Correto |
| 2 | Reduzir gradualmente largura da janela | Layout adapta-se continuamente | ✅ Correto |
| 3 | Verificar breakpoints de responsividade | Transições suaves entre layouts | ✅ Correto |
| 4 | Chegar a tamanho mobile | Layout mobile ativado | ✅ Correto |
| 5 | Expandir novamente a janela | Retorno ao layout desktop | ✅ Correto |
| 6 | Verificar elementos durante transição | Nenhum elemento quebrado ou oculto | ✅ Correto |

---

## 📎 Pós-condições
- Responsividade dinâmica validada
- Layouts transitam suavemente
- Elementos mantêm visibilidade

---

## ✅ Resultado Esperado Geral
A página de login deve adaptar-se continuamente às mudanças de tamanho da janela, mantendo todos os elementos funcionais e visíveis durante as transições entre diferentes layouts.

---

# 🌐 CT-LOGIN-UI-005 – Validar internacionalização

**Título:** Validação de suporte multilíngue na página de login
**Seção:** UI_Internationalization  
**Template:** Passos + Resultados  
**Tipo:** Interface / Internacionalização  
**Prioridade:** Baixa  
**Status:** Reprovado (Limitação identificada) 
**Automação:** Implementado 
**Responsável:** Gabrielle de Oliveira Bezerra  

---

## 📌 Pré-condições
- Aplicação acessível (OrangeHRM Demo)
- Navegador com possibilidade de alteração de locale
- Execução via Playwright utilizando newContext({ locale })

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido | Observações |
|------:|------|--------------------|------------------|-------------|
| 1 | Alterar idioma do navegador para inglês (en-US) | Interface exibida em inglês | ✅ PASSOU | |
| 2 | Validar placeholders e botão | Elementos traduzidos conforme locale | ✅ PASSOU | |
| 3 | Alterar idioma para espanhol (es-ES) | Interface exibida em espanhol | ❌ FALHOU | Interface permaneceu em inglês |
| 4 | Verificar consistência textual | Traduções adequadas ao idioma | ❌ FALHOU | Ausência de tradução |
| 5 | Alterar idioma para francês (fr-FR) | Interface exibida em francês | ❌ FALHOU | Interface permaneceu em inglês |
| 6 | Validar funcionamento da tela | Página funcional em todos os idiomas | ✅ PASSOU | Funcionamento mantido |

---

## 📎 Pós-condições
- Suporte técnico ao locale validado (contexto do navegador aplicado corretamente)
- Traduções visuais não implementadas na versão Demo
- Funcionalidade da tela de login mantida em todos os idiomas testados

---

## 🔎 Análise Técnica
A aplicação reconhece a configuração de idioma no contexto do navegador (locale), porém não aplica tradução visual dinâmica na interface da tela de login.
Isso caracteriza:

- ✔ Suporte técnico parcial ao locale

- ❌ Ausência de internacionalização visual (i18n)

---

## ⚠ Resultado Consolidado
**Conclusão:**
- A internacionalização visual da tela de login não está implementada na versão Demo do sistema.
- O comportamento identificado não compromete a funcionalidade, mas limita a experiência multilíngue da aplicação.

---

# 🔍 CT-LOGIN-UI-006 – Validar comportamento com JavaScript desabilitado

**Título:** Validação da renderização e comportamento da tela de login sem JavaScript
**Seção:** UI_JavaScript_Disabled  
**Template:** Passos + Resultados  
**Tipo:** Interface / Compatibilidade / Degradação Progressiva
**Prioridade:** Baixa  
**Status:** Aprovado com ressalvas
**Automação:** Implementado 
**Responsável:** Gabrielle de Oliveira Bezerra  

---

## 📌 Pré-condições
- Aplicação acessível (OrangeHRM Demo)
- Execução via Playwright com javaScriptEnabled: false
- Ambiente de teste com controle de contexto do navegador

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido | Observações |
|------:|------|--------------------|------------------|-------------|
| 1 | Desabilitar JavaScript no navegador | Contexto criado sem execução de scripts | ✅ PASSOU | |
| 2 | Acessar página de login | Estrutura HTML básica carregada | ✅ PASSOU |
| 3 | Validar estrutura do documento | Tags essenciais (html, head, body) presentes | ✅ PASSOU | |
| 4 | Verificar presença de formulário ou inputs no HTML | Elementos estruturais identificáveis | ✅ PASSOU | |
| 5 | Verificar fallback (<noscript> ou menção a JS) | Existência de mecanismo de orientação ao usuário | ⚠ Inconclusivo | Pode estar ausente ou limitado |
| 6 | Reabilitar JavaScript | Renderização dinâmica restaurada | ✅ PASSOU | |

---

## 📎 Pós-condições
- Estrutura HTML básica validada sem execução de JavaScript
- Aplicação depende de JavaScript para renderização completa
- Funcionalidade total restaurada quando scripts estão habilitados

---

## ✅ Resultado Esperado Geral
Mesmo com JavaScript desabilitado, a página deve fornecer informações úteis e instruções claras para o usuário habilitar a funcionalidade necessária para operação completa.

---

## 🔎 Análise Técnica
**A aplicação:**
- Carrega estrutura HTML básica mesmo com JavaScript desabilitado
- Pode não apresentar fallback explícito robusto
- Depende fortemente de JavaScript para renderização e interatividade
**Isso caracteriza:**
- ✔ Compatibilidade estrutural mínima
- ⚠ Ausência ou limitação de estratégia clara de degradação progressiva
- ✔ Funcionamento completo apenas com JavaScript habilitado

---

## ✅ Resultado Consolidado

**Conclusão:**
A aplicação mantém estrutura básica sem JavaScript, porém a experiência funcional depende majoritariamente da execução de scripts.
Não há evidência clara de fallback informativo robusto para o usuário final na versão Demo avaliada.