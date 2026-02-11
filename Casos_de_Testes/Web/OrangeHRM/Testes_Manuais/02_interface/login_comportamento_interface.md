# 🖥️ CT-LOGIN-UI-001 – Validação de Carregamento da Página

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

**Título:** Validar mensagens de erro para credenciais inválidas  
**Seção:** UI_Error_Messages  
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
- Usuário não autenticado

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Preencher "Username" com valor inválido | Campo preenchido | ✅ Correto |
| 2 | Preencher "Password" com valor inválido | Campo preenchido | ✅ Correto |
| 3 | Clicar no botão "Login" | Processo de autenticação executado | ✅ Correto |
| 4 | Verificar mensagem de erro | Mensagem "Invalid credentials" visível | ✅ Correto |
| 5 | Verificar destaque visual | Campos incorretos destacados | ✅ Correto |
| 6 | Verificar botão Login | Botão permanece habilitado | ✅ Correto |

---

## 📎 Pós-condições
- Mensagem de erro exibida corretamente
- Sistema pronto para nova tentativa

---

## ✅ Resultado Esperado Geral
O sistema deve exibir mensagens de erro apropriadas quando credenciais inválidas forem fornecidas, mantendo a interface funcional para novas tentativas.

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

**Título:** Suporte a múltiplos idiomas na página de login  
**Seção:** UI_Internationalization  
**Template:** Passos + Resultados  
**Tipo:** Interface / Internacionalização  
**Prioridade:** Baixa  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação com suporte a múltiplos idiomas
- Navegador configurado com diferentes preferências de idioma
- Sistema operacional multilíngue

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Alterar idioma do navegador para inglês | Textos em inglês exibidos | ✅ Correto |
| 2 | Verificar elementos da página | Labels, botões e mensagens traduzidos | ✅ Correto |
| 3 | Alterar idioma para espanhol | Textos em espanhol exibidos | ✅ Correto |
| 4 | Verificar consistência textual | Traduções precisas e contextuais | ✅ Correto |
| 5 | Alterar idioma para francês | Textos em francês exibidos | ✅ Correto |
| 6 | Testar funcionalidade em cada idioma | Operação normal em todos os idiomas | ✅ Correto |

---

## 📎 Pós-condições
- Suporte multilíngue validado
- Traduções precisas confirmadas
- Experiência global garantida

---

## ✅ Resultado Esperado Geral
A página de login deve exibir textos e mensagens apropriadas em diferentes idiomas de acordo com as configurações do usuário, mantendo a funcionalidade consistente independentemente do idioma selecionado.

---

# 🔍 CT-LOGIN-UI-006 – Validar comportamento com JavaScript desabilitado

**Título:** Funcionamento da página de login com JavaScript desabilitado  
**Seção:** UI_JavaScript_Disabled  
**Template:** Passos + Resultados  
**Tipo:** Interface / Compatibilidade  
**Prioridade:** Baixa  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação disponível
- Navegador com JavaScript desabilitado
- Configurações de fallback conhecidas

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Desabilitar JavaScript no navegador | Configuração aplicada | ✅ Correto |
| 2 | Acessar página de login | Página carregada (mesmo que parcialmente) | ✅ Correto |
| 3 | Verificar elementos visíveis | Campos e botões básicos presentes | ✅ Correto |
| 4 | Tentar realizar login | Mensagem informativa sobre necessidade de JS | ✅ Correto |
| 5 | Verificar mensagem de fallback | Instruções claras para habilitar JS | ✅ Correto |
| 6 | Habilitar JavaScript e recarregar | Funcionalidade completa restaurada | ✅ Correto |

---

## 📎 Pós-condições
- Compatibilidade básica validada
- Mensagens de fallback funcionais
- Experiência degradada mas informativa

---

## ✅ Resultado Esperado Geral
Mesmo com JavaScript desabilitado, a página deve fornecer informações úteis e instruções claras para o usuário habilitar a funcionalidade necessária para operação completa.
