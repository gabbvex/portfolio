# 🔒 CT-LOGIN-FUNC-002 – Validar login com senha incorreta

**Título:** Login com senha inválida  
**Seção:** Auth_Invalid_Password  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Validação  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação disponível
- Usuário válido existente
- Usuário não autenticado

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Informar Username válido | Campo preenchido corretamente | ✅ Correto |
| 2 | Informar Password inválida | Campo preenchido | ✅ Correto |
| 3 | Clicar em Login | Autenticação processada | ✅ Correto |
| 4 | Verificar mensagem de erro | "Invalid credentials" exibida | ✅ Correto |
| 5 | Verificar redirecionamento | Usuário permanece no login | ✅ Correto |

---

## ✅ Resultado Esperado Geral
O sistema deve impedir o acesso quando a senha estiver incorreta, exibindo mensagem de erro clara e sem conceder acesso indevido.

---

# 🔄 CT-LOGIN-FUNC-003 – Validar múltiplas tentativas consecutivas de login

**Título:** Múltiplas tentativas de login consecutivas  
**Seção:** Auth_Multiple_Attempts  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Robustez  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min  

---

## 📌 Pré-condições

- Aplicação disponível e acessível  
- Usuário com credenciais válidas cadastradas  
- Usuário não autenticado no momento do teste  
- Mecanismo de bloqueio por tentativas (se existir) desativado ou contador zerado  
- Ambiente de teste estável (sem falhas de rede ou timeout)

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Executar login inválido 3 vezes | Erros exibidos corretamente | ✅ Correto |
| 2 | Executar login válido | Login permitido | ✅ Correto |
| 3 | Verificar mensagens acumuladas | Apenas mensagem atual visível | ✅ Correto |

---

## 📎 Pós-condições

- Nenhuma mensagem de erro anterior permanece exibida após tentativa válida  
- Estado da interface é atualizado corretamente após login bem-sucedido  
- Sessão ativa iniciada apenas após credenciais válidas  
- Nenhum bloqueio indevido aplicado ao usuário  
- Sistema permanece estável após múltiplas tentativas consecutivas

---

## ✅ Resultado Esperado Geral
O sistema deve tratar tentativas consecutivas de login sem apresentar erros acumulados ou inconsistências de estado.

---

# 🔧 CT-LOGIN-FUNC-004 – Validar manipulação de caracteres especiais

**Título:** Tratamento de caracteres especiais em campos de login  
**Seção:** Auth_Special_Characters  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Validação  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições
- Aplicação disponível
- Usuário não autenticado
- Lista de caracteres especiais preparada

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Preencher Username com acentos (áéíóú) | Campo aceita caracteres | ✅ Correto |
| 2 | Preencher Password com símbolos (!@#$%) | Campo aceita caracteres | ✅ Correto |
| 3 | Preencher campos com espaços | Espaços tratados corretamente | ✅ Removidos/início/fim |
| 4 | Preencher com caracteres Unicode | Sistema lida adequadamente | ✅ Correto |
| 5 | Preencher com aspas e apóstrofos | Não causa erro de parsing | ✅ Correto |
| 6 | Preencher com caracteres de controle | Rejeitados ou sanitizados | ✅ Sanitizados |

---

## 📎 Pós-condições
- Manipulação de caracteres validada
- Sistema robusto contra entrada variada
- Segurança mantida

---

## ✅ Resultado Esperado Geral
O sistema deve lidar adequadamente com uma ampla variedade de caracteres especiais, acentos e símbolos tanto no nome de usuário quanto na senha, sanitizando entradas perigosas enquanto permite caracteres legítimos.

---

# 🔤 CT-LOGIN-CHAR-005 – Validar limite mínimo e máximo de caracteres

**Título:** Limite de caracteres nos campos de login  
**Seção:** Auth_Character_Length  
**Template:** Passos + Resultados  
**Tipo:** Funcional / Validação  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min  

---

## 📌 Pré-condições

- Aplicação disponível e acessível  
- Página de login carregada  
- Usuário não autenticado  
- Limites mínimo e máximo de caracteres definidos para Username e Password  
- Nenhuma tentativa anterior ativa que impacte validações (ex: bloqueio por tentativas)

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Informar Username com 1 caractere | Validação aplicada corretamente | ✅ Correto |
| 2 | Informar Username com limite máximo permitido | Aceito | ✅ Correto |
| 3 | Informar Username acima do limite | Erro exibido | ✅ Correto |
| 4 | Repetir para Password | Mesmo comportamento | ✅ Correto |

---

## 📎 Pós-condições

- Nenhuma sessão iniciada caso os limites não sejam respeitados  
- Mensagens de validação exibidas apenas quando necessário  
- Nenhum erro técnico (ex: erro 500) ocorre durante entradas fora do limite  
- Campos permanecem editáveis após erro de validação  
- Sistema retorna ao estado inicial após correção dos valores 

---

## ✅ Resultado Esperado Geral
O sistema deve respeitar limites mínimos e máximos de caracteres definidos para cada campo.