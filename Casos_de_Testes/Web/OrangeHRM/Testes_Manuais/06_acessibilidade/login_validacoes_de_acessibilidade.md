# ♿ CT-LOGIN-ACC-001 – Validar navegação por teclado

**Título:** Navegação por teclado na página de login  
**Seção:** Accessibility_Keyboard_Navigation  
**Template:** Passos + Resultados  
**Tipo:** Acessibilidade / Usabilidade  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Teclado físico conectado
- Mouse desconectado ou não utilizado

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Pressionar Tab ao carregar a página | Foco no campo Username | ✅ Correto |
| 2 | Pressionar Tab novamente | Foco no campo Password | ✅ Correto |
| 3 | Pressionar Tab novamente | Foco no botão Login | ✅ Correto |
| 4 | Verificar ordem de tabulação | Ordem lógica: Username → Password → Login | ✅ Correto |
| 5 | Verificar indicador visual de foco | Elemento em foco visivelmente destacado | ✅ Correto |
| 6 | Testar Enter no botão Login | Ação de login executada | ✅ Correto |

---

## 📎 Pós-condições
- Navegação por teclado validada
- Todos os elementos acessíveis
- Experiência inclusiva confirmada

---

## ✅ Resultado Esperado Geral
Todos os elementos da página de login devem ser totalmente navegáveis via teclado, seguindo ordem lógica e apresentando indicadores visuais claros de foco para garantir acessibilidade.

---

# ♿ CT-LOGIN-ACC-002 – Validar compatibilidade com leitores de tela

**Título:** Compatibilidade com leitores de tela  
**Seção:** Accessibility_Screen_Reader  
**Template:** Passos + Resultados  
**Tipo:** Acessibilidade / Tecnologia Assistiva  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Leitor de tela instalado (NVDA/JAWS/JAWS)
- Usuário treinado em navegação por leitor de tela

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Ativar leitor de tela e acessar página de login | Conteúdo lido automaticamente | ✅ Correto |
| 2 | Navegar pelos campos com leitor de tela | Rótulos "Username" e "Password" lidos | ✅ Correto |
| 3 | Verificar leitura do botão Login | Texto "Login" lido corretamente | ✅ Correto |
| 4 | Verificar estrutura semântica | Headings e landmarks identificados | ✅ Correto |
| 5 | Verificar instruções de interação | Orientações claras fornecidas | ✅ Correto |
| 6 | Testar feedback de erro (se aplicável) | Mensagens de erro lidas adequadamente | ✅ Correto |

---

## 📎 Pós-condições
- Compatibilidade com leitores de tela validada
- Estrutura semântica adequada confirmada
- Acessibilidade para deficientes visuais garantida

---

## ✅ Resultado Esperado Geral
A página de login deve ser completamente compatível com leitores de tela, apresentando rótulos descritivos, estrutura semântica adequada e instruções claras para interação, garantindo experiência acessível para usuários com deficiência visual.

---

# ♿ CT-LOGIN-ACC-003 – Validar contraste de cores

**Título:** Contraste adequado entre texto e fundo  
**Seção:** Accessibility_Color_Contrast  
**Template:** Passos + Resultados  
**Tipo:** Acessibilidade / Visual  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível em ambiente acessível  
- Ferramenta de análise de contraste disponível (ex.: Lighthouse, Axe, Color Contrast Analyzer)  
- Critério WCAG definido (mínimo AA: 4.5:1 para texto normal, 3:1 para texto grande)  
- Página de login carregada completamente  
- Estados de interação disponíveis (hover, focus, disabled, erro)  
- Zoom padrão do navegador (100%)  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Verificar contraste do campo Username | Contraste ≥ 4.5:1 | ✅ Correto |
| 2 | Verificar contraste do campo Password | Contraste ≥ 4.5:1 | ✅ Correto |
| 3 | Verificar contraste do botão Login | Texto legível em todos os estados | ✅ Correto |
| 4 | Verificar contraste das mensagens de erro | Texto claramente visível | ✅ Correto |

---

## 📎 Pós-condições

- Todos os textos atendem ao contraste mínimo exigido pela WCAG  
- Botões e elementos interativos permanecem legíveis em todos os estados (normal, hover, focus, disabled)  
- Mensagens de erro possuem contraste suficiente e não dependem apenas de cor  
- Placeholders não são a única forma de identificação do campo  
- Nenhum elemento crítico apresenta contraste insuficiente  
- Relatório de acessibilidade documentado  
- Eventuais falhas registradas para correção  

---

## ✅ Resultado Esperado Geral
Todos os textos e elementos interativos devem atender aos requisitos mínimos de contraste definidos pela WCAG.

---

# ♿ CT-LOGIN-ACC-004 – Validar independência de cor

**Título:** Informação não transmitida apenas por cor  
**Seção:** Accessibility_Color_Independence  
**Template:** Passos + Resultados  
**Tipo:** Acessibilidade / Visual  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível  
- Página de login carregada  
- Ferramenta de inspeção visual disponível (DevTools ou extensão de acessibilidade)  
- Simulador de daltonismo disponível (opcional)  
- Estados de erro e validação configurados  
- Zoom padrão do navegador (100%)  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Gerar erro de login | Erro não indicado apenas por cor | ✅ Correto |
| 2 | Verificar texto auxiliar | Texto explicativo presente | ✅ Correto |

---

## 📎 Pós-condições

- Mensagens de erro não dependem exclusivamente da cor vermelha  
- Campos inválidos possuem indicação adicional (ícone, texto ou borda diferenciada)  
- Estados de sucesso/erro incluem texto explicativo claro  
- Nenhuma instrução utiliza apenas cor como indicador (ex.: “campos em vermelho”)  
- Elementos críticos permanecem compreensíveis em simulação de daltonismo  
- Documentação de evidências (prints ou relatório de análise) registrada  
- Eventuais não conformidades registradas para correção 

---

## ✅ Resultado Esperado Geral
Nenhuma informação crítica deve depender exclusivamente de cor para ser compreendida, garantindo acessibilidade para usuários com daltonismo ou baixa visão.

---

# ♿ CT-LOGIN-ACC-005 – Validar associação correta de rótulos

**Título:** Associação correta entre labels e campos  
**Seção:** Accessibility_Form_Labels  
**Template:** Passos + Resultados  
**Tipo:** Acessibilidade / Semântica  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível  
- Página de login carregada  
- Ferramenta de inspeção de DOM (DevTools) disponível  
- Leitor de tela disponível (opcional para validação adicional)  
- Navegação por teclado habilitada  
- Estrutura HTML acessível para inspeção  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Navegar até campo Username | Label corretamente associado | ✅ Correto |
| 2 | Navegar até campo Password | Label corretamente associado | ✅ Correto |
| 3 | Inspecionar HTML | Uso de `label for` ou `aria-label` | ✅ Correto |

---

## 📎 Pós-condições

- Todos os campos possuem `<label>` corretamente associado via atributo `for`  
- Alternativamente, uso adequado de `aria-label` ou `aria-labelledby` quando necessário  
- Clique no label posiciona corretamente o foco no campo correspondente  
- Leitores de tela anunciam corretamente o nome do campo  
- Campos obrigatórios identificados semanticamente (ex.: `required` ou `aria-required="true"`)  
- Placeholders não são utilizados como único identificador do campo  
- Nenhum campo interativo está sem rótulo acessível  
- Evidências documentadas (inspeção DOM ou teste com leitor de tela) 

---

## ✅ Resultado Esperado Geral
Todos os campos de formulário devem possuir rótulos semanticamente associados para garantir compatibilidade com tecnologias assistivas.

---

# ♿ CT-LOGIN-ACC-006 – Validar mensagens de erro acessíveis

**Título:** Mensagens de erro anunciadas corretamente  
**Seção:** Accessibility_Error_Feedback  
**Template:** Passos + Resultados  
**Tipo:** Acessibilidade / Feedback  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível  
- Página de login carregada  
- Leitor de tela instalado (NVDA, JAWS ou VoiceOver)  
- Navegação por teclado habilitada  
- Estrutura de formulário com validação implementada  
- Possibilidade de gerar erro de autenticação (credenciais inválidas)  
- DevTools disponível para inspeção de atributos ARIA  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Submeter login inválido | Mensagem de erro exibida | ✅ Correto |
| 2 | Verificar leitura automática | Erro anunciado pelo leitor | ✅ Correto |
| 3 | Verificar foco | Foco direcionado ao campo inválido | ✅ Correto |

---

## 📎 Pós-condições

- Mensagem de erro exibida de forma clara e textual (não apenas visual)  
- Erro anunciado automaticamente pelo leitor de tela  
- Uso adequado de `aria-live="assertive"` ou `aria-describedby`  
- Foco direcionado ao primeiro campo inválido após submissão  
- Campo inválido identificado semanticamente (`aria-invalid="true"`)  
- Mensagem de erro associada corretamente ao campo correspondente  
- Texto da mensagem fornece orientação clara para correção  
- Nenhuma dependência exclusiva de cor para indicar erro  
- Evidências documentadas (teste com leitor ou inspeção DOM)

---

## ✅ Resultado Esperado Geral
Mensagens de erro devem ser claras, acessíveis e anunciadas automaticamente por leitores de tela.

---

# ♿ CT-LOGIN-ACC-007 – Validar zoom do navegador

**Título:** Compatibilidade com zoom até 200%  
**Seção:** Accessibility_Zoom  
**Template:** Passos + Resultados  
**Tipo:** Acessibilidade / Responsividade  
**Prioridade:** Média
**Status:** Aprovado   
**Automação:** Planejado   
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível  
- Página de login carregada  
- Leitor de tela instalado (NVDA, JAWS ou VoiceOver)  
- Navegação por teclado habilitada  
- Estrutura de formulário com validação implementada  
- Possibilidade de gerar erro de autenticação (credenciais inválidas)  
- DevTools disponível para inspeção de atributos ARIA  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Aplicar zoom 150% | Layout ajustado corretamente | ✅ Correto |
| 2 | Aplicar zoom 200% | Sem sobreposição de elementos | ✅ Correto |
| 3 | Navegar pela página | Todos os elementos acessíveis | ✅ Correto |

---

## 📎 Pós-condições

- Mensagem de erro exibida de forma clara e textual (não apenas visual)  
- Erro anunciado automaticamente pelo leitor de tela  
- Uso adequado de `aria-live="assertive"` ou `aria-describedby`  
- Foco direcionado ao primeiro campo inválido após submissão  
- Campo inválido identificado semanticamente (`aria-invalid="true"`)  
- Mensagem de erro associada corretamente ao campo correspondente  
- Texto da mensagem fornece orientação clara para correção  
- Nenhuma dependência exclusiva de cor para indicar erro  
- Evidências documentadas (teste com leitor ou inspeção DOM) 

---

## ✅ Resultado Esperado Geral
A página deve permanecer funcional e legível com zoom de até 200%, sem perda de conteúdo ou navegação.

---