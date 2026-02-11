# 📱 CT-LOGIN-CB-001 – Validar comportamento em diferentes resoluções

**Título:** Compatibilidade em diferentes resoluções de tela  
**Seção:** Cross_Resolution_Compatibility  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Responsividade  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação disponível
- Ferramenta de simulação de viewport

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Simular resolução 1920×1080 | Layout correto | ✅ Correto |
| 2 | Simular resolução 1366×768 | Layout correto | ✅ Correto |
| 3 | Simular resolução 375×667 | Layout mobile adequado | ✅ Correto |
| 4 | Verificar sobreposição | Nenhum elemento sobreposto | ✅ Correto |

---

## ✅ Resultado Esperado Geral
A interface deve manter integridade visual e funcional em diferentes resoluções de tela.

---

# 📱 CT-LOGIN-CB-002 – Validar comportamento com zoom do navegador

**Título:** Compatibilidade com zoom do navegador  
**Seção:** Cross_Browser_Zoom  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Acessibilidade  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível e acessível  
- Página de login carregada  
- Navegador atualizado (Chrome, Firefox, Edge ou Safari)  
- Zoom padrão configurado em 100% no início do teste  
- Nenhuma extensão interferindo no layout  
- Usuário não autenticado  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Aplicar zoom 125% | Layout ajustado | ✅ Correto |
| 2 | Aplicar zoom 150% | Sem quebra visual | ✅ Correto |
| 3 | Aplicar zoom 200% | Conteúdo acessível | ✅ Correto |

---

## 📎 Pós-condições

- Layout permanece funcional em todos os níveis de zoom testados  
- Nenhum elemento crítico (botões, campos, links) fica oculto ou sobreposto  
- Scroll horizontal excessivo não é necessário (quando não esperado)  
- Texto permanece legível e sem truncamento  
- Campos continuam interativos após zoom  
- Nenhuma funcionalidade é perdida  
- Foco de teclado permanece visível  
- Página pode retornar ao zoom padrão sem distorções

---

## ✅ Resultado Esperado Geral
O layout da página de login deve permanecer utilizável e legível em diferentes níveis de zoom do navegador.

---

# 📱 CT-LOGIN-CB-003 – Validar comportamento com conexão lenta

**Título:** Compatibilidade com rede lenta  
**Seção:** Cross_Network_Low_Bandwidth  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Rede  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Simulação de rede lenta (3G ou throttling)
- Aplicação disponível

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Ativar throttling de rede | Rede limitada aplicada | ✅ Correto |
| 2 | Acessar página de login | Indicador de carregamento exibido | ✅ Correto |
| 3 | Executar login | Login concluído sem erro | ✅ Correto |

---

## 📎 Pós-condições

- Página de login carregada completamente, mesmo sob rede lenta  
- Indicadores de carregamento (loading/spinner) exibidos corretamente  
- Nenhum erro inesperado (ex: 500, timeout não tratado)  
- Mensagens de erro claras caso ocorra falha de rede  
- Requisições não duplicadas indevidamente  
- Botão de login não dispara múltiplas requisições simultâneas  
- Sessão iniciada corretamente após login bem-sucedido  
- Sistema permanece estável após simulação de rede lenta  
- Logs de erro ou timeout registrados corretamente (se aplicável)

---

## ✅ Resultado Esperado Geral
A aplicação deve lidar adequadamente com conexões lentas, fornecendo feedback visual e evitando falhas silenciosas.

---

# 📱 CT-LOGIN-CB-004 – Validar comportamento em perda de conexão

**Título:** Comportamento da página de login sem conexão  
**Seção:** Cross_Network_Offline  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Rede  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível inicialmente com conexão ativa  
- Página de login acessível  
- Ferramenta de simulação de rede disponível (ex: DevTools – modo Offline)  
- Usuário não autenticado  
- Nenhuma requisição pendente no momento da desconexão  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Desconectar a internet | Navegador offline | ✅ Correto |
| 2 | Tentar acessar login | Mensagem de erro exibida | ✅ Correto |
| 3 | Reconectar internet | Página funcional novamente | ✅ Correto |

---

## 📎 Pós-condições

- Mensagem clara informando ausência de conexão exibida ao usuário  
- Nenhum erro técnico exposto (ex: stack trace, erro 500)  
- Nenhuma requisição duplicada gerada automaticamente  
- Botão de login não permanece em estado de carregamento indefinidamente  
- Aplicação se recupera automaticamente após reconexão  
- Página pode ser recarregada com sucesso após restabelecimento da rede  
- Sistema permanece estável após alternância entre offline/online  
- Logs de erro de rede registrados corretamente (se aplicável)

---

## ✅ Resultado Esperado Geral
A aplicação deve apresentar mensagens claras quando não houver conexão e se recuperar corretamente após o restabelecimento da rede.

---

# 📱 CT-LOGIN-CB-005 – Validar comportamento ao alternar abas

**Título:** Estabilidade ao alternar abas durante login  
**Seção:** Cross_Browser_Tab_Switch  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Navegador  
**Prioridade:** Baixa  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível e acessível  
- Página de login carregada  
- Navegador atualizado  
- Usuário não autenticado  
- Nenhum bloqueio de sessão ativo  
- Cache e armazenamento local funcionando normalmente  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Iniciar preenchimento do login | Dados mantidos | ✅ Correto |
| 2 | Alternar abas do navegador | Estado preservado | ✅ Correto |
| 3 | Retornar e concluir login | Login executado normalmente | ✅ Correto |

---

## 📎 Pós-condições

- Dados digitados permanecem nos campos após alternância de abas  
- Estado visual do formulário não é reiniciado inesperadamente  
- Nenhum refresh automático ocorre ao retornar para a aba  
- Nenhuma requisição duplicada é disparada ao alternar abas  
- Login pode ser concluído normalmente após retorno  
- Sessão iniciada corretamente após autenticação  
- Nenhum erro técnico exibido durante alternância  
- Sistema permanece estável após múltiplas alternâncias

---

## ✅ Resultado Esperado Geral
O estado do formulário deve ser preservado ao alternar abas, evitando perda de dados.

---

# 📱 CT-LOGIN-CB-006 – Validar comportamento ao recarregar a página

**Título:** Recarregamento da página durante login  
**Seção:** Cross_Browser_Refresh  
**Template:** Passos + Resultados  
**Tipo:** Compatibilidade / Navegador  
**Prioridade:** Média   
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível e acessível  
- Página de login carregada  
- Usuário não autenticado  
- Nenhuma sessão ativa no navegador  
- Campos de login habilitados para edição  
- Navegador funcionando sem extensões que alterem comportamento de cache  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Preencher campos de login | Campos preenchidos | ✅ Correto |
| 2 | Atualizar a página (F5) | Estado limpo ou controlado | ✅ Correto |
| 3 | Submeter login novamente | Login executado | ✅ Correto |

---

## 📎 Pós-condições

- Estado da página redefinido de forma controlada após refresh  
- Nenhuma sessão iniciada indevidamente  
- Nenhuma requisição duplicada enviada automaticamente  
- Campos de formulário retornam ao estado esperado (limpos ou preservados conforme regra definida)  
- Nenhum erro técnico (ex: erro 500 ou falha de script) ocorre  
- Token CSRF (se aplicável) regenerado corretamente após refresh  
- Login pode ser realizado normalmente após recarregamento  
- Sistema permanece estável após múltiplos refresh consecutivos

---

## ✅ Resultado Esperado Geral
O recarregamento da página não deve causar comportamentos inconsistentes ou falhas de autenticação.

---