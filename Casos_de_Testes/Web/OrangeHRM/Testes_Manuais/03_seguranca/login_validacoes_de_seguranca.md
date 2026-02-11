# 🛡️ CT-LOGIN-SEC-001 – Validar proteção contra SQL Injection

**Título:** Proteção contra ataques de SQL Injection no login  
**Seção:** Security_SQL_Injection  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Proteção  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Usuário não autenticado
- Ambiente de teste seguro

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Preencher "Username" com `' OR '1'='1` | Campo preenchido com string maliciosa | ✅ Correto |
| 2 | Preencher "Password" com `' OR '1'='1` | Campo preenchido com string maliciosa | ✅ Correto |
| 3 | Clicar no botão "Login" | Processo de autenticação executado | ✅ Correto |
| 4 | Verificar mensagem de erro | Mensagem padrão "Invalid credentials" exibida | ✅ Correto |
| 5 | Verificar acesso ao sistema | Nenhum acesso indevido concedido | ✅ Correto |
| 6 | Verificar tratamento da entrada | Entrada maliciosa rejeitada e sanitizada | ✅ Correto |

---

## 📎 Pós-condições
- Sistema continua operacional
- Nenhuma vulnerabilidade explorada
- Logs registrados (se aplicável)

---

## ✅ Resultado Esperado Geral
O sistema deve rejeitar entradas maliciosas de SQL Injection, exibindo mensagem de erro padrão e mantendo a segurança do sistema intacta.

---

# 🛡️ CT-LOGIN-SEC-002 – Validar proteção contra Cross-Site Scripting (XSS)

**Título:** Proteção contra XSS nos campos de login  
**Seção:** Security_XSS  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Proteção  
**Prioridade:** Alta  
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
| 1 | Inserir `<script>alert(1)</script>` no Username | Campo aceita entrada | ✅ Correto |
| 2 | Inserir qualquer valor no Password | Campo preenchido | ✅ Correto |
| 3 | Clicar em Login | Autenticação processada | ✅ Correto |
| 4 | Verificar execução de script | Nenhum script executado | ✅ Correto |
| 5 | Verificar mensagem de erro | Mensagem padrão exibida | ✅ Correto |

---

## 📎 Pós-condições

- Nenhuma sessão iniciada com entrada maliciosa  
- Script não executado no navegador (DOM permanece íntegro)  
- Entrada maliciosa sanitizada ou escapada corretamente  
- Nenhum erro técnico (ex: erro 500) ocorre durante o processamento  
- Nenhuma informação sensível exposta na resposta  
- Estado da página permanece estável após tentativa  
- Tentativa registrada em logs de segurança (se aplicável)  
- Token de sessão não comprometido  
- Aplicação permanece funcional após múltiplas tentativas

---

## ✅ Resultado Esperado Geral
O sistema deve sanitizar entradas e impedir execução de scripts maliciosos, protegendo contra ataques XSS.

---

# 🛡️ CT-LOGIN-SEC-003 – Validar proteção contra CSRF no login

**Título:** Proteção contra Cross-Site Request Forgery  
**Seção:** Security_CSRF  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Sessão  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições

- Aplicação disponível e acessível via HTTPS  
- Página de login carregada  
- Usuário não autenticado  
- Mecanismo de proteção CSRF habilitado no backend  
- Acesso às ferramentas de inspeção de requisições (ex: DevTools, proxy)  
- Ambiente de teste seguro para simulação de requisições alteradas

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Inspecionar formulário de login | Token CSRF presente | ✅ Correto |
| 2 | Submeter login sem token CSRF | Requisição rejeitada | ✅ Correto |
| 3 | Submeter login com token inválido | Rejeição controlada | ✅ Correto |

---

## 📎 Pós-condições

- Nenhuma sessão iniciada quando o token CSRF estiver ausente ou inválido  
- Requisições inválidas rejeitadas com resposta controlada (ex: 403 Forbidden)  
- Nenhuma informação sensível exposta na resposta de erro  
- Token CSRF não reutilizável indevidamente (se aplicável)  
- Sistema permanece estável após tentativa maliciosa  
- Evento registrado em logs de segurança (se aplicável)

---

## ✅ Resultado Esperado Geral
Requisições de login devem ser protegidas por tokens CSRF válidos para evitar submissões forjadas.

---

# 🛡️ CT-LOGIN-SEC-004 – Validar transporte seguro de credenciais

**Título:** Proteção de credenciais em trânsito  
**Seção:** Security_Transport_Layer  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Criptografia  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min  

---

## 📌 Pré-condições

- Aplicação implantada em ambiente acessível externamente  
- Certificado SSL/TLS válido e ativo  
- Página de login disponível  
- Ferramenta de inspeção de rede disponível (ex: DevTools, proxy)  
- Usuário não autenticado  
- Ambiente de teste seguro para análise de tráfego

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Inspecionar URL de login | HTTPS ativo | ✅ Correto |
| 2 | Tentar acesso via HTTP | Redirecionamento para HTTPS | ✅ Correto |
| 3 | Inspecionar payload | Credenciais não visíveis em texto plano | ✅ Correto |

---

## 📎 Pós-condições

- Nenhuma credencial transmitida via HTTP em texto plano  
- Todas as requisições sensíveis realizadas exclusivamente via HTTPS  
- Redirecionamento automático de HTTP para HTTPS confirmado  
- Certificado digital válido e não expirado  
- Protocolo seguro (TLS 1.2 ou superior) em uso  
- Nenhuma informação sensível exposta em logs de rede  
- Sistema permanece funcional após validações

---

## ✅ Resultado Esperado Geral
Credenciais devem ser transmitidas exclusivamente via HTTPS, garantindo confidencialidade e integridade dos dados.

---

# 🔒 CT-LOGIN-SEC-005 – Validar política de senhas

**Título:** Política de senhas no processo de login  
**Seção:** Security_Password_Policy  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Política  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições
- Aplicação disponível
- Usuário com senha expirada (simulada)
- Credenciais válidas disponíveis

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Tentar login com credenciais válidas | Processo de autenticação iniciado | ✅ Correto |
| 2 | Verificar redirecionamento pós-login | Direcionamento para mudança de senha (se aplicável) | ✅ Correto |
| 3 | Tentar usar senha muito simples | Sistema rejeita senha fraca | ✅ Correto |
| 4 | Tentar usar senha já utilizada anteriormente | Sistema rejeita repetição | ✅ Correto |
| 5 | Verificar requisitos mínimos de senha | Políticas claramente definidas | ✅ Correto |
| 6 | Confirmar implementação de HTTPS | Conexão segura estabelecida | ✅ Correto |

---

## 📎 Pós-condições
- Política de senhas validada
- Mecanismos de segurança confirmados
- Conexão criptografada verificada

---

## ✅ Resultado Esperado Geral
O sistema deve implementar políticas de senha robustas, incluindo requisitos de complexidade, histórico de senhas e conexão segura via HTTPS para proteger as credenciais dos usuários.

---

# 🛡️ CT-LOGIN-SEC-006 – Validar headers de segurança HTTP

**Título:** Presença de headers de segurança  
**Seção:** Security_HTTP_Headers  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Infraestrutura  
**Prioridade:** Média  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min 

---

## 📌 Pré-condições

- Aplicação disponível via HTTPS  
- Página de login acessível  
- Acesso às ferramentas de inspeção de rede (DevTools, proxy ou curl)  
- Ambiente configurado com headers de segurança no servidor ou gateway  
- Usuário não autenticado  
- Sem bloqueios de firewall que impeçam inspeção da resposta HTTP 

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Inspecionar resposta HTTP | Header `Content-Security-Policy` presente | ✅ Correto |
| 2 | Inspecionar resposta HTTP | Header `X-Frame-Options` presente | ✅ SAMEORIGIN |
| 3 | Inspecionar resposta HTTP | Header `X-Content-Type-Options` presente | ✅ nosniff |
| 4 | Inspecionar resposta HTTP | Header `Strict-Transport-Security` presente | ✅ Correto |

---

## 📎 Pós-condições

- Headers de segurança presentes em todas as respostas sensíveis  
- Configurações corretas de CSP (sem políticas permissivas inseguras)  
- Proteção contra clickjacking confirmada (X-Frame-Options ou frame-ancestors)  
- Proteção contra MIME sniffing ativa (X-Content-Type-Options)  
- HSTS ativo para reforçar uso exclusivo de HTTPS  
- Nenhum header expõe informações sensíveis (ex: versão do servidor)  
- Aplicação permanece funcional após validação  
- Logs de segurança não indicam erro de configuração (se aplicável)

---

## ✅ Resultado Esperado Geral
A aplicação deve incluir headers HTTP de segurança para mitigar ataques comuns no navegador.

---

# 🛡️ CT-LOGIN-SEC-007 – Validar invalidação de sessão após logout

**Título:** Invalidação de token após logout  
**Seção:** Security_Session_Invalidation  
**Template:** Passos + Resultados  
**Tipo:** Segurança / Sessão  
**Prioridade:** Alta  
**Status:** Aprovado   
**Automação:** Planejado 
**Responsável:** Gabrielle de Oliveira Bezerra  
**Estimativa:** 2 min

---

## 📌 Pré-condições

- Aplicação disponível via HTTPS  
- Usuário com credenciais válidas cadastradas  
- Usuário não autenticado no início do teste  
- Mecanismo de autenticação ativo (cookie de sessão ou JWT)  
- Ambiente permite inspeção de token (DevTools ou proxy)  
- Rota protegida disponível para validação pós-logout

---

## 🧪 Passos do Teste

| Passo | Ação | Resultado Esperado | Resultado Obtido |
|------:|------|--------------------|------------------|
| 1 | Realizar login válido | Sessão ativa | ✅ Correto |
| 2 | Executar logout | Sessão encerrada | ✅ Correto |
| 3 | Reutilizar token anterior | Acesso negado | ✅ Correto |
| 4 | Acessar rota protegida | Redirecionado para login | ✅ Correto |

---

## 📎 Pós-condições

- Token de sessão invalidado no servidor (se aplicável)  
- Cookie de sessão removido ou expirado no navegador  
- Token não reutilizável após logout  
- Nenhum acesso permitido a rotas protegidas após logout  
- Back button do navegador não restaura sessão ativa  
- Nenhum dado sensível permanece em cache local  
- Logs de segurança registram o encerramento da sessão (se aplicável)  
- Sistema permanece estável após tentativa de reutilização do token

---

## ✅ Resultado Esperado Geral
Tokens e sessões devem ser completamente invalidados após logout para impedir reutilização indevida.

---