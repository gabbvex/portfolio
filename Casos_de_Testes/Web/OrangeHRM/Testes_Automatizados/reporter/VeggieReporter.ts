// reporter/custom-reporter.ts

import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";
import * as fs from "fs";
import * as path from "path";
import { writeExcelReport } from './excel-writer';

// Estrutura de dados de cada teste
interface TestData {
  name: string;
  status: "passed" | "failed" | "skipped" | "timedOut" | "interrupted";
  duration: number; // em milissegundos
  errorMessage: string | null;
  screenshot: string | null; // caminho do arquivo
  startTime: string;
}

// Estrutura do relatório completo
interface ReportData {
  projectName: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  tests: TestData[];
  excelFileName: string;
}

class VeggieReporter implements Reporter {
  private reportData: ReportData;
  private outputDir: string;
  private startTime: Date;
  private excelBase64: string = '';

  constructor(options: Record<string, unknown> = {}) {
    this.outputDir = path.join(__dirname, '..', 'test-results', 'custom-report');
    this.startTime = new Date();

    // Valores iniciais do relatório
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toTimeString().slice(0, 8).replace(/:/g, '.');
    this.reportData = {
      projectName: "OrangeHRM - Automação de Testes",
      startTime: this.startTime.toISOString(),
      endTime: "",
      totalDuration: 0,
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      tests: [],
      excelFileName: `relatorio-${date} ${time}.xlsx`,
    };
  }

  // Chamado quando um teste termina
  onTestEnd(test: TestCase, result: TestResult): void {
    // Procura screenshot nos anexos do teste
    const screenshotAttachment = result.attachments.find(
      (a) => a.name === "screenshot" && a.path
    );

    const testData: TestData = {
      name: test.title,
      status: result.status,
      duration: result.duration,
      errorMessage: result.error?.message ?? null,
      screenshot: screenshotAttachment?.path ?? null,
      startTime: new Date(result.startTime).toISOString(),
    };

    // Atualiza contadores
    this.reportData.total++;
    if (result.status === "passed") this.reportData.passed++;
    else if (result.status === "failed" || result.status === "interrupted") this.reportData.failed++;
    else if (result.status === "skipped") this.reportData.skipped++;

    this.reportData.tests.push(testData);
  }

  // Chamado quando todos os testes terminam
  async onEnd(result: FullResult): Promise<void> {
  
    const endTime = new Date();
    this.reportData.endTime = endTime.toISOString();
    this.reportData.totalDuration = endTime.getTime() - this.startTime.getTime();

    // Garante que a pasta de saída existe
    fs.mkdirSync(this.outputDir, { recursive: true });

    this.saveJSON();
    await this.saveExcel();
    this.saveHTML();

    console.log(`\n✅ VeggieReporter gerado em: ${this.outputDir}`);
  }

  // Salva o arquivo JSON
  private saveJSON(): void {
    const filePath = path.join(this.outputDir, "report.json");
    fs.writeFileSync(filePath, JSON.stringify(this.reportData, null, 2), "utf-8");
    console.log(`📄 JSON salvo: ${filePath}`);
  }

  // Salva o arquivo HTML
  private saveHTML(): void {
    const filePath = path.join(this.outputDir, "report.html");
    fs.writeFileSync(filePath, this.buildHTML(), "utf-8");
    console.log(`🌐 HTML salvo: ${filePath}`);
  }

  private async saveExcel(): Promise<void> {
    const filePath = path.join(this.outputDir, this.reportData.excelFileName);

    const excelData = this.reportData.tests.map(t => ({
      cenario: this.reportData.projectName,
      descricao: t.name,
      execucao: t.status === 'passed' ? 'Passou'
        : t.status === 'failed' ? 'Falhou'
        : t.status === 'skipped' ? 'Ignorado'
        : 'Não iniciado',
      tags: t.name.match(/@\w+/g)?.join(', ') ?? '',
      duracao: t.duration,
    }));

    const buffer = await writeExcelReport(excelData, filePath);
    this.excelBase64 = buffer.toString('base64');
    console.log(`📦 Base64 gerado, tamanho: ${this.excelBase64.length} caracteres`);
  }

  // Monta o HTML do relatório
  private buildHTML(): string {
    const { projectName, startTime, totalDuration, total, passed, failed, skipped, tests } =
      this.reportData;
    const excelBase64 = this.excelBase64;
    const excelFileName = this.reportData.excelFileName;

    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : "0";
    const durationFormatted = (totalDuration / 1000).toFixed(2);

    const testsHTML = tests
      .map((t) => {
        const statusColor =
          t.status === "passed" ? "#22c55e" : t.status === "failed" ? "#ef4444" : "#f59e0b";

        const screenshotHTML = t.screenshot
          ? `<img src="${t.screenshot}" alt="screenshot" style="max-width:100%;margin-top:8px;border-radius:6px;">`
          : "";

        const errorHTML = t.errorMessage
          ? `<pre style="background:#1e1e1e;color:#f87171;padding:10px;border-radius:6px;overflow:auto;font-size:12px;margin-top:8px">${t.errorMessage}</pre>`
          : "";

        return `
          <div style="background:#1a1a2e;border-radius:10px;padding:16px;margin-bottom:12px;border-left:4px solid ${statusColor}">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-weight:600;color:#e2e8f0">${t.name}</span>
              <span style="background:${statusColor};color:#000;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:700">
                ${t.status.toUpperCase()}
              </span>
            </div>
            <div style="color:#94a3b8;font-size:13px;margin-top:6px">
              ⏱ Duração: ${(t.duration / 1000).toFixed(2)}s &nbsp;|&nbsp; 🕐 Início: ${new Date(t.startTime).toLocaleString("pt-BR")}
            </div>
            ${errorHTML}
            ${screenshotHTML}
          </div>`;
      })
      .join("");

  // Serializa os dados dos testes para usar no JS do HTML
  const testsJSON = JSON.stringify(tests);
  const reportMeta = JSON.stringify({ projectName, startTime, totalDuration, total, passed, failed, skipped });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${projectName} — Relatório</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #0f0f1a; color: #e2e8f0; padding: 32px; }
    h1 { font-size: 24px; color: #818cf8; margin-bottom: 4px; }
    .subtitle { color: #64748b; font-size: 14px; margin-bottom: 28px; }
    .cards { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 28px; }
    .card { background: #1a1a2e; border-radius: 12px; padding: 20px 28px; min-width: 140px; text-align: center; }
    .card .value { font-size: 32px; font-weight: 700; }
    .card .label { font-size: 13px; color: #94a3b8; margin-top: 4px; }
    .green { color: #22c55e; } .red { color: #ef4444; } .yellow { color: #f59e0b; } .blue { color: #60a5fa; }
    h2 { font-size: 18px; color: #818cf8; margin-bottom: 16px; }

    /* Caixa de exportação */
    .export-box {
      background: #1a1a2e;
      border: 1px solid #2d2d4e;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .export-box span {
      color: #94a3b8;
      font-size: 13px;
    }
    .btn-export {
      background: #22c55e;
      color: #000;
      border: none;
      padding: 7px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.2s;
    }
    .btn-export:hover { background: #16a34a; }
  </style>
</head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;">
    <div>
      <h1>📊 ${projectName}</h1>
      <p class="subtitle">Gerado em: ${new Date(startTime).toLocaleString("pt-BR")} &nbsp;|&nbsp; Duração total: ${durationFormatted}s</p>
    </div>
    <div class="export-box">
      <button class="btn-export" onclick="downloadExcel()">⬇ Excel</button>
      <button class="btn-export" style="background:#64748b;opacity:0.4;cursor:default;" disabled>⬇ —</button>
      <button class="btn-export" style="background:#64748b;opacity:0.4;cursor:default;" disabled>⬇ —</button>
    </div>
  </div>

  <h2>📋 Detalhes dos Testes</h2>
  ${testsHTML}

  <script>
    const EXCEL_BASE64 = "${excelBase64.replace(/"/g, '\\"')}";
    function downloadExcel() {
      const base64 = EXCEL_BASE64;
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "${excelFileName}";
      link.click();
    }
  </script>
</body>
</html>`;
}
}

export default VeggieReporter;