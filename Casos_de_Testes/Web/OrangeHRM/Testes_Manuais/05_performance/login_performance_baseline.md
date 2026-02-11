# 🚀 CT-LOGIN-PERF-001 – Validar tempo de carregamento da página de login

**Título:** Tempo de carregamento da página de login  
**Seção:** Performance_Load_Time  
**Template:** Passos + Resultados  
**Tipo:** Performance / Velocidade  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Conexão de internet estável
- Ferramenta de medição de tempo configurada

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Acessar a página de login | Página começa a carregar | ✅ Correto |
| 2 | Medir tempo de carregamento total | Tempo inferior a 3 segundos | ✅ 1.8 segundos |
| 3 | Repetir medição em diferentes horários | Consistência no tempo de resposta | ✅ Consistente |
| 4 | Verificar recursos carregados | Todos os elementos visuais carregados | ✅ Correto |
| 5 | Verificar timeout | Nenhum timeout ocorrido | ✅ Correto |
| 6 | Registrar métricas | Dados de performance registrados | ✅ Registrado |

---

## 📎 Pós-condições
- Métricas de performance documentadas
- Página de login operando dentro dos padrões
- Sistema pronto para uso

---

## ✅ Resultado Esperado Geral
A página de login deve carregar completamente em menos de 3 segundos, mantendo consistência em diferentes horários e condições de rede, sem timeouts ou falhas de carregamento.

---

# 🧠 CT-LOGIN-PERF-002 – Validar tempo de resposta do backend de autenticação

**Título:** Tempo de resposta do endpoint de login  
**Seção:** Performance_Backend_Response  
**Template:** Passos + Resultados  
**Tipo:** Performance / Backend  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação e API disponíveis  
- Endpoint de login ativo (POST /login)  
- Ambiente de teste estável (homologação ou staging)  
- Ferramenta de medição configurada (ex: Postman, k6, JMeter, DevTools)  
- Credenciais válidas disponíveis  
- Monitoramento básico habilitado (CPU, memória, logs)  
- Nenhum processo externo interferindo na performance  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Enviar requisição POST /login | Requisição processada | ✅ Correto |
| 2 | Medir tempo de resposta | < 500ms | ✅ 320ms |
| 3 | Repetir sob carga | Tempo consistente | ✅ Correto |

---

## 📎 Pós-condições

- Tempo médio de resposta dentro do SLA definido (< 500ms)  
- Tempo máximo aceitável não ultrapassado (ex: < 1s sob carga moderada)  
- Nenhum erro 5xx registrado durante execução  
- Taxa de sucesso próxima de 100%  
- Recursos do servidor permanecem dentro de limites aceitáveis  
- Nenhum vazamento de memória identificado  
- Logs de performance coletados para análise  
- Sistema permanece estável após múltiplas execuções  
- Nenhum bloqueio indevido aplicado por mecanismos de segurança (rate limit, firewall)

---

## ✅ Resultado Esperado Geral
O endpoint de autenticação deve responder rapidamente e de forma consistente, mesmo sob carga.

---

# ⚡ CT-LOGIN-PERF-003 – Validar cache e carregamento de assets

**Título:** Otimização de cache e carregamento de recursos  
**Seção:** Performance_Asset_Caching  
**Template:** Passos + Resultados  
**Tipo:** Performance / Otimização  
**Prioridade:** Baixa  
**Status:** Aprovado   
**Automação:** Planejado  
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Ferramenta de desenvolvedor aberta (Network tab)
- Primeiro acesso ao site

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Acessar página de login pela primeira vez | Todos os assets carregados | ✅ Correto |
| 2 | Verificar tamanho total de download | Tamanho razoável (< 2MB recomendado) | ✅ 1.2MB |
| 3 | Verificar uso de cache em segundo acesso | Assets servidos do cache | ✅ Correto |
| 4 | Verificar headers de cache | Headers apropriados configurados | ✅ Correto |
| 5 | Verificar compressão de assets | Assets comprimidos (gzip/brotli) | ✅ gzip |
| 6 | Medir tempo de carregamento repetido | Tempo significativamente reduzido | ✅ 0.8s vs 2.1s |

---

## 📎 Pós-condições

- Assets estáticos armazenados corretamente em cache no navegador  
- Headers de cache configurados adequadamente (Cache-Control, ETag ou Expires)  
- Compressão aplicada aos recursos (gzip ou brotli)  
- Redução perceptível no tempo de carregamento em acessos subsequentes  
- Nenhum asset crítico carregado repetidamente sem necessidade  
- Nenhum erro 304/200 inconsistente ou falha de cache  
- Nenhum conflito de versão de arquivos estáticos  
- Aplicação permanece funcional após múltiplos reloads  
- Métricas de performance registradas para comparação futura  

---

## ✅ Resultado Esperado Geral

Os recursos estáticos da página de login devem ser carregados de forma otimizada, utilizando mecanismos adequados de cache e compressão. Em acessos subsequentes, o tempo de carregamento deve ser significativamente reduzido, sem comprometer a integridade visual ou funcional da aplicação.

---

# 📊 CT-LOGIN-PERF-004 – Validar percentis de performance (P95/P99)

**Título:** Análise de percentis de resposta  
**Seção:** Performance_Percentiles  
**Template:** Passos + Resultados  
**Tipo:** Performance / Métricas  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação e endpoint de login disponíveis  
- Ambiente de teste estável (staging ou homologação)  
- Ferramenta de carga configurada (ex: k6, JMeter, Gatling)  
- Volume de usuários virtuais definido  
- SLA e limites aceitáveis para P95 e P99 documentados  
- Monitoramento de infraestrutura ativo (CPU, memória, I/O, banco)  
- Nenhuma outra carga concorrente interferindo nos resultados  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Executar teste de carga | Métricas coletadas | ✅ Correto |
| 2 | Analisar P95 | < 4s | ✅ 3.9s |
| 3 | Analisar P99 | < 6s | ✅ 5.5s |

---

## 📎 Pós-condições

- Métricas completas coletadas (latência média, P50, P95, P99)  
- P95 e P99 dentro dos limites definidos no SLA  
- Nenhum aumento crítico de erro 4xx ou 5xx durante o teste  
- Recursos do servidor permanecem dentro de limites aceitáveis  
- Nenhum gargalo evidente identificado em logs ou monitoramento  
- Relatório de performance gerado e armazenado  
- Sistema permanece estável após o término do teste  
- Ambiente restaurado ao estado normal após execução da carga  

---

## ✅ Resultado Esperado Geral
Os percentis de resposta devem permanecer dentro dos limites aceitáveis, garantindo boa experiência para a maioria dos usuários.

---