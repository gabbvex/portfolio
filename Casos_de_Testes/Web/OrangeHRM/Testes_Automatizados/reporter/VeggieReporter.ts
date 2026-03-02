import type {
  Reporter,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";
import * as fs from "fs";
import * as path from "path";
import { writeExcelReport, separarPrefixoCT } from './excel-writer';
import type { ExcelTestRow } from './excel-writer';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// ── Tipos ────────────────────────────────────────────────────────────

interface StepData {
  title: string;
  status: "passed" | "failed";
  duration: number;
}

type TestStatus = "passed" | "failed" | "skipped" | "timedOut" | "interrupted";

interface TestData {
  name: string;
  suiteName: string;
  browser: string;
  status: TestStatus;
  duration: number;
  errorMessage: string | null;
  screenshot: string | null;
  startTime: string;
  steps: StepData[];
}

interface ReportData {
  projectName: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  timedOut: number;
  interrupted: number;
  tests: TestData[];
  excelFileName: string;
}

// ── Constantes ───────────────────────────────────────────────────────

/** Lista de nomes de browser/device conhecidos pelo Playwright */
const KNOWN_BROWSERS = [
  'chromium', 'firefox', 'webkit',
  'Mobile Chrome', 'Mobile Safari',
  'Google Chrome', 'Microsoft Edge',
];

// ── Reporter ─────────────────────────────────────────────────────────

class VeggieReporter implements Reporter {
  private reportData: ReportData;
  private outputDir: string;
  private startTime: Date;
  private excelBase64: string = '';

  constructor(_options: Record<string, unknown> = {}) {
    this.outputDir = path.join(__dirname, '..', 'test-results', 'custom-report');
    this.startTime = new Date();

    this.reportData = {
      projectName: "OrangeHRM - Automação de Testes",
      startTime: this.startTime.toISOString(),
      endTime: "",
      totalDuration: 0,
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      timedOut: 0,
      interrupted: 0,
      tests: [],
      excelFileName: 'relatorio.xlsx',
    };
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const screenshotAttachment = result.attachments.find(
      (a) => a.name === "screenshot" && a.path
    );

    // Coleta steps: prioriza test.step, mas se não houver, usa expect e ações
    const testSteps = result.steps.filter(s => s.category === 'test.step');
    const fallbackSteps = testSteps.length > 0
      ? testSteps
      : result.steps.filter(s =>
          s.category === 'expect' ||
          s.category === 'pw:api' ||
          s.category === 'test.step'
        );

    const steps: StepData[] = fallbackSteps.map(s => ({
      title: s.title,
      status: (s.error ? 'failed' : 'passed') as 'passed' | 'failed',
      duration: s.duration,
    }));

    // Converte screenshot para base64 inline (funciona em qualquer máquina)
    let screenshotData: string | null = null;
    if (screenshotAttachment?.path) {
      try {
        const imgBuffer = fs.readFileSync(screenshotAttachment.path);
        const ext = path.extname(screenshotAttachment.path).slice(1) || 'png';
        screenshotData = `data:image/${ext};base64,${imgBuffer.toString('base64')}`;
      } catch {
        // Se não conseguir ler, guarda o caminho original como fallback
        screenshotData = screenshotAttachment.path;
      }
    }

    const testData: TestData = {
      name: test.title,
      suiteName: test.parent?.title ?? 'Sem Cenário',
      browser: this.detectBrowser(test),
      status: result.status,
      duration: result.duration,
      errorMessage: result.error?.message ?? null,
      screenshot: screenshotData,
      startTime: new Date(result.startTime).toISOString(),
      steps,
    };

    // Contagem por status — cada status tem seu próprio contador
    this.reportData.total++;
    switch (result.status) {
      case 'passed':     this.reportData.passed++; break;
      case 'failed':     this.reportData.failed++; break;
      case 'skipped':    this.reportData.skipped++; break;
      case 'timedOut':   this.reportData.timedOut++; break;
      case 'interrupted': this.reportData.interrupted++; break;
    }

    this.reportData.tests.push(testData);
  }

  async onEnd(_result: FullResult): Promise<void> {
    const endTime = new Date();
    this.reportData.endTime = endTime.toISOString();
    this.reportData.totalDuration = endTime.getTime() - this.startTime.getTime();

    fs.mkdirSync(this.outputDir, { recursive: true });

    this.saveJSON();

    // Se o Excel falhar, o HTML ainda é gerado (sem botão de download)
    try {
      await this.saveExcel();
    } catch (err) {
      console.error('Erro ao gerar Excel:', err);
      this.excelBase64 = '';
    }

    this.saveHTML();
  }

  // ── Detecção de browser ──

  private detectBrowser(test: TestCase): string {
    const titlePath = test.titlePath();
    const found = titlePath.find(t => KNOWN_BROWSERS.includes(t));
    if (found) return found;

    // Fallback: tenta pegar do projeto do Playwright
    // titlePath[0] geralmente é o nome do projeto
    const projectName = titlePath[0];
    if (projectName && projectName !== test.title) return projectName;

    return 'desconhecido';
  }

  // ── Geradores de arquivo ──

  private saveJSON(): void {
    const filePath = path.join(this.outputDir, "report.json");
    fs.writeFileSync(filePath, JSON.stringify(this.reportData, null, 2), "utf-8");
  }

  private async saveExcel(): Promise<void> {
    const filePath = path.join(this.outputDir, this.reportData.excelFileName);

    const excelData = this.buildExcelData();

    // Agrupa por cenario + descricaoTeste + descricao, juntando navegadores
    const agrupado = new Map<string, ExcelTestRow & { navegadores: Set<string> }>();
    for (const item of excelData) {
      const chave = `${item.cenario}||${item.descricaoTeste}||${item.descricao}`;
      if (!agrupado.has(chave)) {
        agrupado.set(chave, { ...item, navegadores: new Set<string>() });
      }
      const entry = agrupado.get(chave)!;
      if (item.browser) entry.navegadores.add(item.browser);
      // Se qualquer navegador falhou, marca como falhou
      if (item.execucao === 'Falhou') {
        entry.execucao = 'Falhou';
        if (item.observacoes) entry.observacoes = item.observacoes;
      }
    }

    const excelDataFinal: ExcelTestRow[] = Array.from(agrupado.values()).map(item => ({
      cenario: item.cenario,
      descricaoTeste: item.descricaoTeste,
      descricao: item.descricao,
      passos: item.passos,
      execucao: item.execucao,
      tags: item.tags,
      duracao: item.duracao,
      dataExecucao: item.dataExecucao,
      observacoes: item.observacoes,
      browser: Array.from(item.navegadores).join(', '),
    }));

    const tester = process.env.TESTER_NAME ?? 'Nao informado';
    const buffer = await writeExcelReport(excelDataFinal, tester);

    // Salva o arquivo no disco
    fs.writeFileSync(filePath, buffer);

    this.excelBase64 = buffer.toString('base64');
  }

  private buildExcelData(): ExcelTestRow[] {
    return this.reportData.tests.map(t => {
      const tags = t.name.match(/@\w+/g)?.join(', ') ?? '';
      const nomeDoTeste = separarPrefixoCT(t.name.replace(/@\w+\s*/g, '').trim()).descricao;
      const dataExecucao = new Date(t.startTime).toLocaleString('pt-BR');

      // Separa o describe em prefixo (cenário) e descrição
      const { prefixo, descricao: descricaoSuite } = separarPrefixoCT(t.suiteName);

      const mapStatus = (status: string): ExcelTestRow['execucao'] => {
        switch (status) {
          case 'passed': return 'Passou';
          case 'failed': return 'Falhou';
          case 'skipped': return 'Ignorado';
          default: return 'Nao iniciado';
        }
      };

      // Cada teste é uma linha. Steps são ignorados.
      // Coluna A (cenario) = prefixo do describe (ex: "CT-LOGIN-FUNC")
      // Coluna B (descricaoTeste) = texto do describe (ex: "Validações de Autenticação")
      // Coluna D (descricao) = test.title (ex: "Deve carregar a página de login")
      // Coluna E (passos) = steps numerados, um por linha
      const passosTexto = t.steps.length > 0
        ? t.steps.map((s, i) => `${i + 1}. ${s.title}`).join('\n')
        : '';

      return {
        cenario: prefixo,
        descricaoTeste: descricaoSuite,
        descricao: nomeDoTeste,
        passos: passosTexto,
        execucao: mapStatus(t.status),
        tags,
        duracao: t.duration,
        dataExecucao,
        observacoes: t.errorMessage ?? '',
        browser: t.browser,
      };
    });
  }

  // ── HTML ──

  private saveHTML(): void {
    const filePath = path.join(this.outputDir, "report.html");
    fs.writeFileSync(filePath, this.buildHTML(), "utf-8");
  }

  private buildHTML(): string {
    const {
      projectName, startTime, totalDuration,
      total, passed, failed, skipped, timedOut, interrupted, tests,
    } = this.reportData;
    const excelBase64 = this.excelBase64;
    const excelFileName = this.reportData.excelFileName;

    const formatDuration = (ms: number): string => {
      const totalSec = ms / 1000;
      if (totalSec >= 60) {
        const min = Math.floor(totalSec / 60);
        const sec = (totalSec % 60).toFixed(1);
        return `${min}m ${sec}s`;
      }
      return `${totalSec.toFixed(2)}s`;
    };

    const durationFormatted = formatDuration(totalDuration);

    // Escape de HTML para evitar XSS/renderização quebrada
    const escapeHtml = (str: string): string =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const testsHTML = tests.map((t) => {
      const statusColor =
        t.status === "passed" ? "#22c55e"
        : t.status === "failed" ? "#ef4444"
        : t.status === "timedOut" ? "#f97316"
        : t.status === "interrupted" ? "#a855f7"
        : "#f59e0b";

      const statusLabel =
        t.status === "passed" ? "PASSOU"
        : t.status === "failed" ? "FALHOU"
        : t.status === "timedOut" ? "TIMEOUT"
        : t.status === "interrupted" ? "INTERROMPIDO"
        : "IGNORADO";

      const screenshotHTML = t.screenshot
        ? `<img src="${escapeHtml(t.screenshot)}" alt="screenshot" class="screenshot" onclick="this.classList.toggle('expanded')">`
        : "";

      const errorHTML = t.errorMessage
        ? `<pre class="error-block">${escapeHtml(t.errorMessage)}</pre>`
        : "";

      const stepsHTML = t.steps.length > 0
        ? `<div class="steps-container">
            <button class="steps-toggle" onclick="this.parentElement.classList.toggle('open')">
              ${t.steps.length} passos ▾
            </button>
            <div class="steps-list">
              ${t.steps.map((s, i) => `
                <div class="step-item ${s.status}">
                  <span class="step-num">${i + 1}</span>
                  <span class="step-title">${escapeHtml(s.title)}</span>
                  <span class="step-status">${s.status === 'passed' ? '✓' : '✗'}</span>
                  <span class="step-dur">${formatDuration(s.duration)}</span>
                </div>
              `).join('')}
            </div>
          </div>`
        : "";

      return `
        <div class="test-card" data-status="${t.status}">
          <div class="test-header">
            <div class="test-info">
              <span class="test-name">${escapeHtml(t.name)}</span>
              <span class="test-meta">
                ${escapeHtml(t.suiteName)} · ${t.browser} · ${formatDuration(t.duration)}
              </span>
            </div>
            <span class="status-badge" style="--badge-color: ${statusColor}">${statusLabel}</span>
          </div>
          ${stepsHTML}
          ${errorHTML}
          ${screenshotHTML}
        </div>`;
    }).join("");

    // Botão Excel: desabilitado se não tem dados
    const excelBtnDisabled = !excelBase64;
    const excelBtnClass = excelBtnDisabled ? 'btn-export disabled' : 'btn-export';
    const excelBtnOnclick = excelBtnDisabled ? '' : 'onclick="downloadExcel()"';

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(projectName)}</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
  <style>
    :root {
      --bg-primary: #0c0c18;
      --bg-card: #151528;
      --bg-card-hover: #1a1a35;
      --text-primary: #e8eaf0;
      --text-secondary: #7a8094;
      --accent: #6366f1;
      --green: #22c55e;
      --red: #ef4444;
      --yellow: #eab308;
      --orange: #f97316;
      --purple: #a855f7;
      --radius: 10px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      padding: 28px 32px;
      line-height: 1.5;
    }

    /* ── Topo ── */
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
    .header h1 { font-size: 22px; color: var(--accent); font-weight: 700; }
    .header .subtitle { color: var(--text-secondary); font-size: 13px; margin-top: 4px; }

    .export-box { display: flex; gap: 8px; }
    .btn-export {
      background: var(--green); color: #000; border: none;
      padding: 7px 16px; border-radius: 8px; font-size: 13px;
      font-weight: 700; cursor: pointer; transition: opacity 0.2s;
    }
    .btn-export:hover { opacity: 0.85; }
    .btn-export.disabled { background: #444; color: #888; cursor: default; opacity: 0.5; }

    /* ── Filtros ── */
    .filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
    .filter-btn {
      background: var(--bg-card); color: var(--text-secondary); border: 1px solid #2a2a45;
      padding: 5px 14px; border-radius: 20px; font-size: 12px; cursor: pointer;
      transition: all 0.15s;
    }
    .filter-btn:hover, .filter-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

    /* ── Cards de resumo ── */
    .summary-grid { display: flex; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; align-items: flex-start; }
    .chart-box, .stats-box {
      background: var(--bg-card); border-radius: var(--radius); padding: 20px;
    }
    .chart-box h2, .stats-box h2 { font-size: 15px; color: var(--accent); margin-bottom: 14px; font-weight: 600; }

    .stats-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .stats-table th { background: #2d3568; color: #fff; padding: 7px 12px; text-align: left; }
    .stats-table th:last-child { text-align: center; }
    .stats-table td { padding: 6px 12px; border-bottom: 1px solid #1e1e3a; }
    .stats-table td:last-child { text-align: center; font-weight: 600; }
    .stats-table tr:last-child { background: #2d3568; color: #fff; font-weight: 700; }
    .stats-table tr:last-child td { border: none; }

    /* ── Test cards ── */
    .tests-section h2 { font-size: 16px; color: var(--accent); margin-bottom: 14px; }
    .test-card {
      background: var(--bg-card); border-radius: var(--radius); padding: 14px 16px;
      margin-bottom: 10px; border-left: 4px solid transparent;
      transition: background 0.15s;
    }
    .test-card:hover { background: var(--bg-card-hover); }
    .test-card[data-status="passed"] { border-left-color: var(--green); }
    .test-card[data-status="failed"] { border-left-color: var(--red); }
    .test-card[data-status="skipped"] { border-left-color: var(--yellow); }
    .test-card[data-status="timedOut"] { border-left-color: var(--orange); }
    .test-card[data-status="interrupted"] { border-left-color: var(--purple); }

    .test-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .test-info { display: flex; flex-direction: column; min-width: 0; }
    .test-name { font-weight: 600; font-size: 14px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .test-meta { font-size: 12px; color: var(--text-secondary); margin-top: 2px; }

    .status-badge {
      background: var(--badge-color); color: #000; padding: 2px 10px;
      border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; flex-shrink: 0;
    }

    /* ── Steps ── */
    .steps-container { margin-top: 10px; }
    .steps-toggle {
      background: none; border: 1px solid #2a2a45; color: var(--text-secondary);
      padding: 3px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;
    }
    .steps-list { display: none; margin-top: 8px; }
    .steps-container.open .steps-list { display: block; }
    .steps-container.open .steps-toggle { color: var(--accent); border-color: var(--accent); }

    .step-item {
      display: flex; align-items: center; gap: 8px; padding: 4px 0;
      font-size: 12px; color: var(--text-secondary);
    }
    .step-num { color: #555; width: 20px; text-align: right; }
    .step-title { flex: 1; }
    .step-status { width: 16px; text-align: center; }
    .step-item.passed .step-status { color: var(--green); }
    .step-item.failed .step-status { color: var(--red); }
    .step-dur { color: #555; font-size: 11px; }

    /* ── Erro e screenshot ── */
    .error-block {
      background: #1a0a0a; color: #f87171; padding: 10px; border-radius: 6px;
      overflow: auto; font-size: 12px; margin-top: 10px; max-height: 200px;
      border: 1px solid #3a1515;
    }
    .screenshot {
      max-width: 300px; max-height: 200px; margin-top: 10px;
      border-radius: 6px; cursor: pointer; transition: max-width 0.2s;
    }
    .screenshot.expanded { max-width: 100%; max-height: none; }

    /* ── Responsivo ── */
    @media (max-width: 700px) {
      body { padding: 16px; }
      .summary-grid { flex-direction: column; }
      .header { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>📊 ${escapeHtml(projectName)}</h1>
      <p class="subtitle">Gerado em: ${new Date(startTime).toLocaleString("pt-BR")} · Duração total: ${durationFormatted}</p>
    </div>
    <div class="export-box">
      <button class="${excelBtnClass}" ${excelBtnOnclick}>⬇ Excel</button>
    </div>
  </div>

  <!-- Filtros por status -->
  <div class="filters">
    <button class="filter-btn active" onclick="filterTests('all')">Todos (${total})</button>
    <button class="filter-btn" onclick="filterTests('passed')">Passou (${passed})</button>
    <button class="filter-btn" onclick="filterTests('failed')">Falhou (${failed})</button>
    <button class="filter-btn" onclick="filterTests('skipped')">Ignorado (${skipped})</button>
    ${timedOut > 0 ? `<button class="filter-btn" onclick="filterTests('timedOut')">Timeout (${timedOut})</button>` : ''}
    ${interrupted > 0 ? `<button class="filter-btn" onclick="filterTests('interrupted')">Interrompido (${interrupted})</button>` : ''}
  </div>

  <div class="summary-grid">
    <div class="chart-box">
      <h2>Distribuição dos Resultados</h2>
      <div style="position:relative;width:280px;height:280px;">
        <canvas id="pizzaChart"></canvas>
      </div>
    </div>
    <div class="stats-box">
      <h2>Resumo</h2>
      <table class="stats-table">
        <tr><th>Status</th><th>Total</th></tr>
        <tr><td style="color:var(--green)">Passou</td><td>${passed}</td></tr>
        <tr><td style="color:var(--red)">Falhou</td><td>${failed}</td></tr>
        <tr><td style="color:var(--yellow)">Ignorado</td><td>${skipped}</td></tr>
        ${timedOut > 0 ? `<tr><td style="color:var(--orange)">Timeout</td><td>${timedOut}</td></tr>` : ''}
        ${interrupted > 0 ? `<tr><td style="color:var(--purple)">Interrompido</td><td>${interrupted}</td></tr>` : ''}
        <tr><td>Total</td><td>${total}</td></tr>
      </table>
    </div>
  </div>

  <div class="tests-section">
    <h2>Detalhes dos Testes</h2>
    ${testsHTML}
  </div>

  <script>
    // ── Gráfico ──
    const ctx = document.getElementById('pizzaChart').getContext('2d');
    const chartData = [${passed}, ${failed}, ${skipped}, ${timedOut}, ${interrupted}];
    const chartLabels = ['Passou', 'Falhou', 'Ignorado', 'Timeout', 'Interrompido'];
    const chartColors = ['#22c55e', '#ef4444', '#eab308', '#f97316', '#a855f7'];

    // Remove categorias com zero
    const filtered = chartLabels.reduce((acc, label, i) => {
      if (chartData[i] > 0) {
        acc.labels.push(label);
        acc.data.push(chartData[i]);
        acc.colors.push(chartColors[i]);
      }
      return acc;
    }, { labels: [], data: [], colors: [] });

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: filtered.labels,
        datasets: [{
          data: filtered.data,
          backgroundColor: filtered.colors,
          borderWidth: 0,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: false,
        cutout: '55%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#e2e8f0', font: { size: 12 }, boxWidth: 14, padding: 16 }
          }
        }
      }
    });

    // ── Filtro de testes ──
    function filterTests(status) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      document.querySelectorAll('.test-card').forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // ── Download Excel ──
    ${excelBase64 ? `
    const EXCEL_BASE64 = "${excelBase64.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}";
    function downloadExcel() {
      const binary = atob(EXCEL_BASE64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "${escapeHtml(excelFileName)}";
      link.click();
      URL.revokeObjectURL(link.href);
    }` : ''}
  </script>
</body>
</html>`;
  }
}

export default VeggieReporter;