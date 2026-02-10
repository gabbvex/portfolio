# 📋 Plano de Testes – [Automação do Pipeline de Integração Frontend-Backend]
Sistema de Automação gaSIM-280

Revisão: 1

Data de Revisão: 10/02/2026

## 📑 Índice de Revisões  
**Documento:** TE-ISTAMBUL-2025-001-gaSIM-280-001

| REV. | DATA       | DESCRIÇÃO        | POR                          | VERIF. | APROV. |
|------|------------|------------------|-------------------------------|--------|--------|
| 1    | 07/10/2025 | Revisão inicial. | Gabrielle de Oliveira Bezerra |   X     |   X     |
| 1    | 10/02/2026 | Revisão  | Gabrielle de Oliveira Bezerra |   X     |   X     |

Arquivo: gaSIM-280

---

## 📚 Lista de Conteúdo

1. [Objetivos](#1-objetivos) ........................................................... 6
2. Estratégias de Testes ..................................... 6 
3. Escopo e Não Escopo ................................... 6  
4. Critérios de Entrada ....................................... 6  
5. Critérios de Saída (DoD) .............................. 6  
6. Sequência do Fluxo (referência) ............... 7   
7. Ambientes, Acessos e Variáveis ................ 7    
8. Dados de Teste (Massa) ............................... 7    
&nbsp;&nbsp;8.1 Fonte de Dados .................................... 10    
&nbsp;&nbsp;8.2 Variáveis a Armazenar ........................ 10    
&nbsp;&nbsp;8.3 Políticas de Uso de Dados ................ 10    
&nbsp;&nbsp;8.4 Template de Registro de Massa de Teste ............ 10   
9. Contratos Mínimos (Schema Validation) ........................ 8  
10. Casos de Teste – Formato Cypress (sem Gherkin) ....... 8  
&nbsp;&nbsp;10.1 Fluxo feliz (E2E) – Aquisição até status final ...... 10  
&nbsp;&nbsp;10.2 Negativo essencial – Documento inválido / parâmetros ausentes ........ 10  
&nbsp;&nbsp;10.3 Sanidade de ambiente ............................................... 11  
11. Matriz de Endpoints do Fluxo .................. 11   
12. Riscos e Mitigações ...................................... 13  
13. Métricas e Relatórios ................................... 13  
14. CI/CD .................................................................. 13  
15. Checklists Operacionais .............................. 14  
16. Cronograma (estimativo de referência) ... 14

---

## 1. Objetivos
Este plano de testes descreve a estratégia completa de **Automação do Pipeline de Integração Frontend-Backend**, um processo essencial do sistema de crédito responsável por validar a jornada do cliente desde a verificação de elegibilidade até a aprovação final da proposta. O objetivo é garantir que todas as integrações entre serviços funcionem de forma confiável, rápida e segura.
A automação será implementada com **Cypress + TypeScript**, adotando o **Zod** para validação de contratos mínimos entre os serviços envolvidos. O projeto prioriza a execução de ponta a ponta (E2E), validando respostas em cadeia. Cada etapa alimenta a seguinte, utilizando dados sintéticos controlados pelo time de QA.
O foco principal é assegurar qualidade funcional, integridade dos dados e consistência dos contratos de API. Além disso, busca-se fornecer relatórios visuais e métricas de confiabilidade que apoiem a equipe técnica e de produto na tomada de decisões, com rastreabilidade por `correlationId` e logs estruturados.
Em resumo, este plano visa estabelecer uma base sólida e escalável para testes automatizados do fluxo de aquisição, permitindo futuras expansões para outros fluxos e garantindo uma pipeline de qualidade contínua.

---

## 2. Estratégias de Testes
- Validar o fluxo completo de aquisição.
- Garantir estabilidade de execução (flake < 5%) e reprodutibilidade com massa de QA.
- Prover relatórios claros (HTML) e evidências (correlationId, payloads-chave) para triagem.
- Servir de padrão para expansão a outros fluxos (portabilidade, refinanciamento).
- **Orquestração por etapas** (funções puras): cada etapa recebe/retorna dados que alimentam a próxima.
- **Contrato mínimo (Zod)** por tipo de resposta (eligibility, simulate, proposal, status, erro).
- **Idempotency-Key** em endpoints de criação para evitar efeitos colaterais.
- **Retry** apenas em **5xx/timeout** (1 tentativa) para mitigar a instabilidade do QA.
- **Stop-on-first 4xx inesperado** para não propagar erro em cascata.

---

## 3. Escopo dos Testes
Escopo e Não Escopo
Em escopo
- 1 fluxo E2E principal de aquisição (prioritário) e testes por controller/endpoints que compõem o fluxo.
- Cenários: happy path e negativos essenciais (422/404/401) por etapa.
- Validação de contrato mínimo com Zod (campos-chave).

Fora de escopo inicial
- Performance/carga, segurança ofensiva, etc.
- Contrato completo campo-a-campo (apenas mínimo nesta fase).

---

## 4. Critérios de Entrada
- Acesso a QA (repositório, cURLs).
- Fluxo de autenticação definido e scopes.
- Headers obrigatórios confirmados.
- Massas disponíveis.
- Pelo menos 1 golden request por controller (Postman).

---

## 5. Critérios de Saída (DoD)
- Fluxo E2E executa sem intervenção manual, 3x seguidas, em < 10 min.
- Cada etapa possui happy 200 + 1 negativo com `ErrorSchema` válido.
- Zod aplicado aos campos essenciais de cada resposta.
- Relatório gerado automaticamente no CI/CD + planilha de status atualizada.
- Falhas registradas com `correlationId` e ticket aberto quando for bug.

---

## 6. Sequência do Fluxo (referência)
1. Massa de Dados: Coletar informações básicas do usuário → Obter `dados essenciais` para o processo.
2. Autenticação: Validar manualmente o login e autenticação do sistema.
3. Elegibilidade: Consulta inicial para verificar elegibilidade do usuário.
4. Lista de Opções: Obter lista de opções disponíveis para o usuário.
5. Processo de Integração: Iniciar etapa de integração do usuário ao sistema.
6. Relacionamentos: Consultar informações de relacionamentos cadastrais.
7. Carregamento: Etapa de processamento e carregamento de dados.
8. Oferta Preliminar: Obter oferta inicial do sistema.
9. Oferta Principal: Consultar oferta principal disponível.
10. Completar Cadastro: Finalizar etapas de cadastro para contas incompletas.
11. Finalização: Concluir processo de contratação principal.
12. Documentação: Upload ou simulação de documentos conforme procedimentos de qualidade.

---
## 7. Ambientes, Acessos e Variáveis
### Ambiente de Testes

| Recurso                     | Descrição Genérica                                                                 |
|-----------------------------|-------------------------------------------------------------------------------------|
| Sistema Operacional         | Linux (execução em CI/CD via containers) / macOS (execução local)                   |
| Ferramentas de Automação    | Framework de teste v13.0, linguagem tipada e validação de schemas                   |
| Ambiente de Execução        | Ambiente de QA – navegador em modo headless                                         |
| Servidor de Aplicação       | service-backend-mobile-tests                                                        |
| Controle de Código-Fonte    | Plataforma Git – repositório `service-backend-mobile-tests`                         |
| Flags e Configurações QA    | Etapas ativas: ELEGIBILITY, OPTIONS_LIST, INTEGRATION, RELATIONSHIPS, PROCESSING,   |
|                             | PRELIMINARY_OFFER, MAIN_OFFER, REGISTRATION, FINALIZATION                            |

---

## 8. Dados de Teste (Massa)

### 8.1 Fonte de Dados
- **Endpoint de origem:** `ELIGIBILITY_CHECK`
- **Tipo de dados:** Sintéticos (mockados)

### 8.2 Variáveis a Armazenar
- `document_number`
- `email_address`
- `user_id`

### 8.3 Políticas de Uso de Dados
- Não versionar dados sensíveis no repositório
- Dados de teste devem ser recriados automaticamente quando possível


### 8.4 Template de Registro de Massa de Teste

| Apelido     | Documento    | E-mail                          | User ID | Última Validação | Observação                     |
|-------------|--------------|----------------------------------|---------|------------------|--------------------------------|
| USER_HAPPY  | 00000000000  | test.user+happy@company.com      | xyz789  | 2025-10-06       | Base do fluxo principal         |

---

### 9. Contratos Mínimos (Schema Validation)
- Eligibility: `{ eligible: boolean, reason?: string }`

- Simulation: `{ value: number, period: number, percentage: number, payment: number, offerCode: string }`

- Proposal: `{ proposalCode: string, status: string }`

- Status: `{ proposalCode: string, status: 'APPROVED' | 'REJECTED' | 'PENDING' | string }`

- ErrorSchema: `{ errorCode: string, message: string, details?: { field?: string; message: string }[] }`

---

###  10. Casos de Teste – Formato Cypress (sem Gherkin)
Os casos de teste a seguir são descritos no formato **Cypress puro**, utilizando `describe`, `it` e `expect`, sem uso de Gherkin/BDD, priorizando clareza técnica, rastreabilidade e fácil manutenção.

### 10.1 Fluxo feliz (E2E) – Aquisição até status final
**Objetivo:**  
Validar o fluxo completo de aquisição, desde a elegibilidade até a finalização com status final bem-sucedido.

**Pré-condições:**
- Ambiente QA disponível
- Massa de teste válida (ex: `USER_HAPPY`)
- Flags de fluxo ativas

**Passos (alto nível):**
1. `GET /api/v1/steps/ELIGIBILITY_CHECK` → deve responder 200 e contrato mínimo válido.
2. `GET /api/v1/steps/OPTIONS_LIST` → 200 e contrato válido.
3. `GET /api/v1/steps/INTEGRATION` → 200 e contrato válido.
4. `GET /api/v1/steps/RELATIONSHIPS` → 200 e contrato válido.
5. `GET /api/v1/steps/PROCESSING` → 200 e contrato válido.
6. `GET /api/v1/steps/PRELIMINARY_OFFER` → 200 e contrato válido.
7. `GET /api/v1/steps/MAIN_OFFER` → 200, extrair offerCode se aplicável.
8. `GET /api/v1/steps/REGISTRATION` → 200 e contrato válido.
9. `GET /api/v1/steps/FINALIZATION` → 200 e contrato válido.
10. **Documentos:** executar **upload** ou **simulação** (conforme procedimentos de qualidade) e validar 200.
11. Validações: status 200 em cada etapa + validação de schema correspondente.

**Resultado Esperado:**
- Status final retornado conforme regra de negócio
- Nenhuma falha ou erro inesperado durante o fluxo

**Exemplo de teste (Cypress):**
```js
describe('Fluxo feliz - Aquisição E2E', () => {
  it('deve concluir o fluxo até o status final com sucesso', () => {
    cy.requestEligibility('USER_HAPPY')
    cy.advanceFlowUntil('FINALIZATION')
    cy.validateFinalStatus('APPROVED')
  })
})
```
### 10.2 Negativo essencial – Documento inválido / parâmetros ausentes
**Objetivo:** 
Garantir que o sistema trate corretamente entradas inválidas ou incompletas, retornando erros controlados.

**Cenários cobertos:** 
- Documento inválido

- Documento ausente

- Parâmetros obrigatórios não enviados

**Passos (alto nível):**

1. Executar ELIGIBILITY_CHECK com documento inválido ou ausente
2. Validar retorno de erro
3. Verificar mensagem e código de erro

**Resultado Esperado:**

- Retorno de erro conforme contrato

- Mensagem clara e consistente

- Nenhum avanço indevido no fluxo

**Exemplo de teste (Cypress):**
``` js
describe('Negativo essencial - Documento inválido', () => {
  it('deve retornar erro ao enviar documento inválido', () => {
    cy.requestEligibility({ document: '123' })
    cy.validateErrorResponse(400, 'INVALID_DOCUMENT')
  })
})
```

### 10.3 Sanidade de ambiente

**Objetivo:**
Validar rapidamente se o ambiente está estável para execução da suíte de testes.

**Validações realizadas:**

- Disponibilidade do backend

- Resposta básica do endpoint de elegibilidade

- Conectividade com serviços dependentes

**Critério de execução:**

- Executado no início do pipeline CI/CD

- Bloqueia a execução dos testes E2E em caso de falha

**Resultado Esperado:**

- Status HTTP 200

- Tempo de resposta dentro do aceitável

**Exemplo de teste (Cypress):**
``` js
describe('Sanidade de ambiente', () => {
  it('deve responder corretamente ao health check', () => {
    cy.request('/health')
      .its('status')
      .should('eq', 200)
  })
})
```

---

## 11. Matriz de Endpoints do Fluxo

Esta matriz consolida os endpoints envolvidos no fluxo principal, permitindo rastreabilidade entre **ordem de execução**, **tipo de validação**, **cenários cobertos** e **contratos mínimos (Zod)**.

| Ordem | Método | Descrição                                                                 | Rota                                   | Happy | Negativo | Zod | Observações |
|------:|--------|---------------------------------------------------------------------------|----------------------------------------|:-----:|:--------:|:---:|-------------|
| 1     | GET    | Busca o conteúdo da etapa de Elegibilidade                                 | /api/v1/steps/ELIGIBILITY_CHECK       | ☐     | ☐        | ☐   | —           |
| 2     | GET    | Busca o conteúdo da etapa de Lista de Opções                               | /api/v1/steps/OPTIONS_LIST            | ☐     | ☐        | ☐   | —           |
| 3     | GET    | Busca o conteúdo da etapa de Integração                                    | /api/v1/steps/INTEGRATION             | ☐     | ☐        | ☐   | —           |
| 4     | GET    | Busca o conteúdo da etapa de Relacionamentos                               | /v1/steps/EMPLOYMENT_RELATIONSHIPS    | ☐     | ☐        | ☐   | —           |
| 5     | GET    | Busca o conteúdo da etapa de Processamento                                 | //api/v1/steps/PROCESSING             | ☐     | ☐        | ☐   | —           |
| 6     | GET    | Envio das informações da etapa de Oferta Preliminar                        | /api/v1/steps/PRELIMINARY_OFFER ☐     | ☐    | ☐        | ☐   | —           |
| 7     | GET    | Busca o conteúdo da etapa de Oferta Principal                              | /api/v1/steps/MAIN_OFFER              | ☐     | ☐        | ☐   | —           |
| 8     | GET    | Direciona para jornada de completar cadastro                               | /api/v1/steps/REGISTRATION            | ☐     | ☐        | ☐   | —           |

---

## 12. Riscos e Mitigações

A identificação antecipada de riscos permite reduzir impactos no cronograma, na qualidade dos testes e na confiabilidade dos resultados.

| Risco                                      | Impacto                                          | Mitigação                                                                 |
|-------------------------------------------|--------------------------------------------------|----------------------------------------------------------------------------|
| Documentação da API desatualizada          | Atrasos e falsos negativos nos testes             | Validação com ferramenta de monitoramento e alinhamento contínuo com a equipe |
| Ambiente de teste instável (erros 5xx/timeout) | Testes inconsistentes (flakiness)                 | Implementar retry controlado para erros 5xx e identificação única nos logs |
| Dependência de configurações externas      | Erros 404/403 inesperados                         | Checklist de configurações obrigatórias e uso de simulações quando aplicável |
| Token ou permissões incorretas             | Erros 401/403 de autenticação                     | Documentar fluxo de autenticação, permissões necessárias e script para geração de tokens |

## 13. Métricas e Relatórios
- Execução: duração total do fluxo, tempo por etapa.
- Qualidade: % de falhas, flake < 5% (3 execuções).
- Cobertura: etapas cobertas vs planejadas.
- Defeitos: abertos por severidade, tempo até correção.
  
Relatórios: HTML (inicial) e/ou Allure. Export opcional para planilha.

## 14. CI/CD
- PR: executar **@smoke_flow** (fluxo E2E principal).
- Nightly: executar **full** (todos os endpoints do fluxo + negativos).
- Publicar relatório como **artefato** do pipeline; quebrar build em falha crítica.

## 15. Cronograma de Implementação (estimativo de referência)

O cronograma abaixo representa uma estimativa de esforço para implementação da automação de testes, podendo ser ajustado conforme a maturidade do ambiente, estabilidade dos endpoints e disponibilidade de recursos.

| Etapa | Descrição da Atividade                                                                 | Tempo Estimado   | Entrega Esperada |
|------:|------------------------------------------------------------------------------------------|------------------|------------------|
| 1. Levantamento e planejamento | Revisar endpoints, confirmar componentes, priorizar sequência real do fluxo e dependências entre etapas | 0,5 a 1 dia | Mapeamento final e plano de execução atualizado |
| 2. Validação de acessos e ambiente | Testar URL base e dados de teste. Ajustar configurações e verificar recursos ativos no ambiente | 0,5 dia | Configurações funcionais validadas |
| 3. Criação da estrutura do projeto | Configurar estrutura de pastas (`/schemas`, `/helpers`, `/specs`, `/reports`), instalar dependências e ferramentas de relatório | 1 dia | Projeto de automação funcional pronto para desenvolvimento |
| 4. Verificação de dependências | Validar configurações necessárias para execução dos testes | 1 dia | Checklist de configurações + simulações quando aplicável |
| 5. Implementar helpers e utilitários | Criar funções para requisições de API, validação de schemas, controle de retry e centralização de headers | 1,5 dia | Utilitários prontos e testados isoladamente |
| 6. Definir e implementar contratos mínimos | Criar schemas de validação para estruturas de dados | 1,5 a 2 dias | Schemas prontos e validados com exemplos reais |
| 7. Montar fluxo ponta a ponta | Testar sequencialmente todos os endpoints principais | 3 dias | Fluxo completo executando ponta a ponta |
| 8. Implementar testes negativos essenciais | Inserir casos de erro e validar respostas com schema de erro | 1 a 1,5 dias | Casos negativos básicos implementados |
| 9. Relatórios e evidências | Configurar exportação automática de resultados em HTML | 1 dia | Relatórios visuais funcionais |
| 10. Configurar integração contínua | Integrar pipeline para executar testes básicos em PR e suíte completa noturna | 1 a 1,5 dias | Pipeline com execução automatizada configurada |
| 11. Revisão e estabilização | Ajustar tempos, retries, dados de teste e paralelização. Validar estabilidade | 2 a 3 dias | Suíte estável (<5% de inconsistência) pronta para uso |
| 12. Documentação e entrega | Atualizar Plano de Testes, status do projeto e documentação final | 0,5 a 1 dia | Documentação final entregue |

