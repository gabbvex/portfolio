# 🚀 CT-LOGIN-PERF-001 – Validar desempenho sob carga

**Título:** Desempenho da página de login sob carga simultânea  
**Seção:** Performance_Load_Test  
**Template:** Passos + Resultados  
**Tipo:** Performance / Carga  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível em ambiente de teste
- Ferramenta de teste de carga configurada (JMeter/k6)
- 100 usuários virtuais preparados para simulação

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Configurar teste de carga para 100 usuários simultâneos | Configuração concluída | ✅ Correto |
| 2 | Executar teste de acesso à página de login | Teste em execução | ✅ Correto |
| 3 | Monitorar tempo de resposta médio | Tempo abaixo de 5 segundos | ✅ 3.2 segundos |
| 4 | Monitorar taxa de sucesso | Taxa acima de 98% | ✅ 99.5% |
| 5 | Verificar erros de servidor | Nenhum erro registrado | ✅ Correto |
| 6 | Registrar métricas finais | Dados completos coletados | ✅ Registrado |

---

## 📎 Pós-condições

- Sistema permanece estável após término do teste de carga  
- Nenhum erro crítico (5xx) registrado durante execução  
- Taxa de sucesso mantida acima do limite definido (> 98%)  
- Tempo médio de resposta dentro do SLA (< 5s)  
- P95 e P99 dentro dos limites aceitáveis (se monitorados)  
- Nenhum vazamento de memória identificado  
- CPU, memória e I/O dentro de limites seguros  
- Conexões ao banco não saturadas  
- Logs de performance armazenados para análise  
- Ambiente restaurado ao estado normal após execução  

---

## ✅ Resultado Esperado Geral

A aplicação deve suportar 100 usuários simultâneos realizando login sem degradação significativa de performance, mantendo alta taxa de sucesso, tempo de resposta dentro do SLA e estabilidade da infraestrutura durante e após o teste.

---

# 🔥 CT-LOGIN-PERF-002 – Validar comportamento em pico de acessos (stress test)

**Título:** Stress test da página de login  
**Seção:** Performance_Stress_Test  
**Template:** Passos + Resultados  
**Tipo:** Performance / Stress  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Ambiente de teste disponível
- Ferramenta de stress configurada
- Capacidade de simular pico acima do esperado (ex.: 500 usuários)

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Configurar 500 usuários simultâneos | Configuração concluída | ✅ Correto |
| 2 | Executar stress test | Sistema sob carga extrema | ✅ Correto |
| 3 | Monitorar tempo de resposta | Degradação gradual aceitável | ✅ Controlada |
| 4 | Monitorar erros 5xx | Erros controlados ou inexistentes | ✅ Nenhum |
| 5 | Reduzir carga gradualmente | Sistema se recupera | ✅ Correto |

---

## 📎 Pós-condições

- Sistema permanece operacional durante o pico de carga  
- Nenhum crash ou indisponibilidade total do serviço  
- Degradação de performance ocorre de forma controlada e previsível  
- Taxa de erro permanece dentro de limites aceitáveis  
- Nenhuma corrupção de dados ou inconsistência de sessão  
- Recursos do servidor (CPU, memória, conexões) monitorados e registrados  
- Sistema se recupera automaticamente após redução da carga  
- Nenhuma necessidade de reinicialização manual  
- Logs de erro e métricas armazenados para análise posterior  
- Ambiente restaurado ao estado estável após término do teste  

---

## ✅ Resultado Esperado Geral

Durante o pico extremo de acessos (stress), o sistema deve degradar de forma controlada, manter estabilidade e se recuperar automaticamente após a normalização da carga, sem falhas críticas, perda de dados ou indisponibilidade prolongada.

---

# 📈 CT-LOGIN-PERF-003 – Validar comportamento em teste de pico (spike test)

**Título:** Spike test da funcionalidade de login  
**Seção:** Performance_Spike_Test  
**Template:** Passos + Resultados  
**Tipo:** Performance / Pico  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Ambiente de teste isolado e estável  
- Ferramenta de teste de carga configurada (k6, JMeter ou similar)  
- Capacidade de simular aumento abrupto de usuários  
- Métricas de monitoramento ativas (CPU, memória, latência, taxa de erro)  
- Endpoint de login funcional e validado previamente  
- Limites de SLA definidos (tempo máximo aceitável de resposta)  
- Logs habilitados para captura de erros e gargalos  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Iniciar com 10 usuários | Sistema estável | ✅ Correto |
| 2 | Aumentar para 300 usuários instantaneamente | Sistema responde | ✅ Correto |
| 3 | Monitorar tempo de resposta | Picos aceitáveis | ✅ 4.8s |
| 4 | Monitorar erros | Nenhum erro crítico | ✅ Nenhum |

---

## 📎 Pós-condições

- Sistema permanece operacional após o pico abrupto  
- Nenhum crash ou indisponibilidade total registrada  
- Picos de latência registrados e documentados  
- Taxa de erro dentro do limite aceitável  
- Recursos do servidor não entram em estado crítico irreversível  
- Sistema estabiliza automaticamente após redução da carga  
- Nenhuma perda de sessão ou inconsistência de autenticação  
- Métricas coletadas e armazenadas para análise  
- Ambiente retorna ao estado normal sem intervenção manual

---

## ✅ Resultado Esperado Geral
O sistema deve suportar aumentos repentinos de tráfego sem falhas críticas ou indisponibilidade.

---

# 🕒 CT-LOGIN-PERF-004 – Validar estabilidade ao longo do tempo (endurance test)

**Título:** Teste de resistência da página de login  
**Seção:** Performance_Endurance  
**Template:** Passos + Resultados  
**Tipo:** Performance / Estabilidade  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Ambiente de teste dedicado e estável  
- Ferramenta de carga configurada para execução prolongada (k6, JMeter ou similar)  
- Capacidade de manter carga constante (ex.: 50 usuários simultâneos)  
- Monitoramento ativo de CPU, memória, threads e conexões  
- Monitoramento de banco de dados habilitado  
- Logs de aplicação ativados  
- SLA de tempo de resposta previamente definido  
- Endpoint de login previamente validado em testes de carga básicos  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Executar carga constante (50 usuários) por 1h | Teste iniciado | ✅ Correto |
| 2 | Monitorar tempo de resposta | Estável ao longo do tempo | ✅ Estável |
| 3 | Monitorar uso de memória | Sem crescimento progressivo | ✅ Correto |
| 4 | Monitorar erros | Nenhum erro acumulado | ✅ Nenhum |

---

## 📎 Pós-condições

- Sistema permanece estável durante toda a execução prolongada  
- Tempo de resposta não apresenta degradação progressiva  
- Nenhum vazamento de memória identificado  
- Uso de CPU e conexões permanece dentro de limites seguros  
- Nenhum acúmulo anormal de threads ou conexões pendentes  
- Nenhuma falha acumulativa registrada ao longo do tempo  
- Logs analisados e arquivados  
- Métricas comparadas entre início e fim do teste  
- Ambiente retorna ao estado normal após encerramento da execução 

---

## ✅ Resultado Esperado Geral
O sistema deve manter desempenho estável em execuções prolongadas, sem vazamento de memória ou degradação progressiva.

---

# 🧩 CT-LOGIN-PERF-005 – Validar impacto de falhas parciais

**Título:** Resiliência do login a falhas parciais  
**Seção:** Performance_Fault_Tolerance  
**Template:** Passos + Resultados  
**Tipo:** Performance / Resiliência  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Ambiente de teste isolado  
- Capacidade de simular falhas parciais (latência artificial, falha de serviço, timeout)  
- Monitoramento ativo de backend, banco de dados e integrações  
- Logs habilitados para captura de exceções  
- Timeout configurado no frontend e backend  
- SLA de resposta definido  
- Endpoint de login previamente validado  

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Simular lentidão no backend | Backend degradado | ✅ Correto |
| 2 | Executar login | Mensagem de espera exibida | ✅ Correto |
| 3 | Verificar timeout | Timeout controlado | ✅ Correto |

---

## 📎 Pós-condições

- Sistema permanece operacional mesmo sob degradação parcial  
- Timeout tratado de forma controlada (sem travamento da interface)  
- Mensagens de erro amigáveis exibidas ao usuário  
- Nenhuma exposição de stack trace ou detalhes internos  
- Nenhuma inconsistência de sessão criada  
- Conexões pendentes corretamente encerradas  
- Logs registram a falha simulada  
- Sistema retorna ao comportamento normal após restauração do backend  
- Nenhuma necessidade de reinicialização manual do serviço  

---

## ✅ Resultado Esperado Geral
O sistema deve lidar corretamente com falhas parciais, exibindo feedback adequado ao usuário e evitando travamentos.

---