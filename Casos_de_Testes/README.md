# 🧪 QA – Casos de Teste

Este repositório reúne **casos de teste manuais e automatizados**, criados com foco em **qualidade de software**, **testes de API**, **fluxos E2E** e **boas práticas de QA**.

---

## 📁 Seções
- Aplicações Web - Testes de interface, API e desempenho
- APIs e Microsserviços - Contratos e integrações
- Funcionais - Validação de requisitos de negócio
- Segurança - Vetores de proteção e vulnerabilidades
- Performance - Análise de carga e tempos de resposta
- Acessibilidade - Conformidade com diretrizes WCAG
- Localização - Adaptação multi-idioma e culturas

---

## 📊 Cobertura
🔐 **Autenticação**
- Fluxos positivos (login válido, sessão ativa)

- Fluxos negativos (credenciais inválidas, conta bloqueada)

- Casos de borda (expiração de sessão, múltiplos logins simultâneos)

- Validação e renovação de tokens (JWT, refresh token)

- Encerramento correto de sessão (logout e invalidação)

🧾 **Validação de Entradas e Testes de Limite**
- Campos obrigatórios, opcionais e condicionais

- Limites mínimos e máximos de tamanho e formato

- Inputs inválidos, caracteres especiais e emojis

- Tratamento adequado de mensagens de erro e feedback ao usuário

👥 **Controle de Acesso por Perfis**

- Verificação de permissões por tipo de usuário

- Bloqueio de acesso indevido a rotas e funcionalidades

- Integridade das permissões após mudanças de estado

- Prevenção de escalonamento indevido de privilégios

🎨 **Layout da Interface e Responsividade**

- Consistência visual entre telas e fluxos

- Posicionamento correto dos componentes

- Adaptação a diferentes resoluções e orientações

- Prevenção de quebras de layout, sobreposição e overflow

♿ **Acessibilidade**

- Navegação completa via teclado

- Compatibilidade com leitores de tela

- Uso correto de atributos ARIA

- Conformidade com diretrizes WCAG

- Contraste de cores, legibilidade e foco visual

- Suporte a TalkBack e VoiceOver

🛡️ **Segurança**

- Proteção contra SQL Injection e XSS

- Tratamento de tentativas de brute force

- Validação de headers, tokens e sessões

- Prevenção de manipulação indevida de requisições

- Proteção de dados sensíveis do usuário

🌍 **Localização e Internacionalização**

- Fidelidade das traduções

- Suporte a textos longos sem quebra de layout

- Formatos corretos de data, hora, moeda e números

- Preparação para idiomas com leitura da direita para a esquerda (RTL)

🌐 **Compatibilidade**

- Renderização consistente entre navegadores

- Suporte a diferentes dispositivos e sistemas operacionais

- Testes em múltiplos tamanhos de tela

- Comportamento adequado em diferentes orientações

⚙️ **Desempenho**

- Tempo de resposta em fluxos críticos

- Comportamento sob carga e estresse

- Avaliação de cache e reaproveitamento de recursos

- Consumo de bateria em dispositivos móveis

- Impacto de performance na experiência do usuário

---

## 🧱 Estrutura de Metadata
| Campo | Descrição |
|------|----------|
| **Título** | Nome curto, claro e objetivo do caso de teste |
| **Módulo / Seção** | Agrupamento funcional ou módulo do sistema (ex.: `Login_Form`) |
| **Template** | Formato do caso de teste (ex.: *Passos + Resultado Esperado*) |
| **Tipo de Teste** | Categoria do teste: Funcional, Segurança, Usabilidade, Acessibilidade, Performance, etc. |
| **Prioridade** | Impacto do teste no negócio: Alta, Média, Baixa |
| **Status do Caso** | Estado do ciclo de vida: Rascunho, Em Revisão, Aprovado, Obsoleto |
| **Defeitos Relacionados** | IDs de bugs ou links para issues associadas |
| **Status de Execução** | Resultado da última execução: Aprovado, Reprovado, Bloqueado, Não Executado, Ignorado, Reteste |
| **Automação** | Situação da automação: Automatizado, Elegível para Automação, Não Automatizável |
| **Responsável** | QA responsável pela criação ou manutenção do teste |
| **Estimativa** | Tempo médio estimado para execução (ex.: 2 min, 5 min) |
| **Referências** | Requisitos, documentação técnica ou tickets (Jira, Azure Boards, etc.) |
| **Pré-condições** | Estado ou configuração necessária antes da execução |
| **Passos e Resultados** | Tabela detalhando cada ação e seu resultado esperado |
| **Pós-condições** | Estado esperado do sistema após a execução |
| **Resultado Esperado Geral** | Resultado final esperado após a execução completa do caso |

---

## ⚠️ Observações
- Todos os dados utilizados são **sintéticos**
- Nenhuma informação sensível ou real é versionada
> O campo **Automação** não indica apenas se o teste já foi automatizado, mas se ele é **tecnicamente e estrategicamente elegível** para automação.
---
