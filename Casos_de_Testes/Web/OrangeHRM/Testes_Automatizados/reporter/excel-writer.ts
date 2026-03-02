import ExcelJS from 'exceljs';

// ── Tipos ────────────────────────────────────────────────────────────
export interface ExcelTestRow {
  cenario: string;
  descricaoTeste: string;
  descricao: string;
  passos: string;
  execucao: 'Passou' | 'Falhou' | 'Ignorado' | 'Nao iniciado';
  tags: string;
  duracao: number;
  dataExecucao: string;
  observacoes: string;
  browser: string;
}

type StatusExecucao = ExcelTestRow['execucao'];

// ── Constantes ───────────────────────────────────────────────────────
const COR_HEADER = 'FF366092';
const COR_TEXTO = 'FF366092';
const COR_BRANCO = 'FFFFFFFF';

const CORES_STATUS: Record<StatusExecucao, string> = {
  'Passou': 'FF9FD660',
  'Falhou': 'FFFFB3B3',
  'Ignorado': 'FFFFFF99',
  'Nao iniciado': 'FFCCE0FF',
};

// Bordas dotted e divisor de grupo: tudo no mesmo azul
const BORDA_DOTTED: ExcelJS.Borders = {
  top: { style: 'dotted', color: { argb: COR_HEADER } },
  bottom: { style: 'dotted', color: { argb: COR_HEADER } },
  left: { style: 'dotted', color: { argb: COR_HEADER } },
  right: { style: 'dotted', color: { argb: COR_HEADER } },
  diagonal: { style: undefined, color: { argb: '00000000' }, up: false, down: false },
};

const BORDA_GRUPO_FIM: ExcelJS.Borders = {
  top: { style: 'dotted', color: { argb: COR_HEADER } },
  bottom: { style: 'medium', color: { argb: COR_HEADER } },
  left: { style: 'dotted', color: { argb: COR_HEADER } },
  right: { style: 'dotted', color: { argb: COR_HEADER } },
  diagonal: { style: undefined, color: { argb: '00000000' }, up: false, down: false },
};

const COLUNAS_TOTAL = 11;

/**
 * Separa o prefixo CT do texto.
 * Padrão: sequência de letras/números/hífens seguida de " - " no início.
 *
 * Exemplos:
 *   "CT-LOGIN-FUNC - Validações de Autenticação" → { prefixo: "CT-LOGIN-FUNC", descricao: "Validações de Autenticação" }
 *   "CT-001 - Validar campo" → { prefixo: "CT-001", descricao: "Validar campo" }
 *   "Deve carregar a página" → { prefixo: "", descricao: "Deve carregar a página" }
 */
export function separarPrefixoCT(texto: string): { prefixo: string; descricao: string } {
  const match = texto.match(/^([A-Za-z0-9-]+) - (.+)$/);
  if (match) {
    return { prefixo: match[1], descricao: match[2] };
  }
  return { prefixo: '', descricao: texto };
}

// ── Funções auxiliares ───────────────────────────────────────────────

function formatarDuracao(ms: number): string {
  if (!ms || ms <= 0) return '0s 000ms';
  const segundos = Math.floor(ms / 1000);
  const milissegundos = ms % 1000;
  if (segundos >= 60) {
    const minutos = Math.floor(segundos / 60);
    const segsRestantes = segundos % 60;
    return `${minutos}m ${segsRestantes}s ${milissegundos.toString().padStart(3, '0')}ms`;
  }
  return `${segundos}s ${milissegundos.toString().padStart(3, '0')}ms`;
}

function estiloTexto(alignment: Partial<ExcelJS.Alignment> = {}): {
  font: Partial<ExcelJS.Font>;
  alignment: Partial<ExcelJS.Alignment>;
  border: Partial<ExcelJS.Borders>;
} {
  return {
    font: { color: { argb: COR_TEXTO } },
    alignment: { horizontal: 'center', vertical: 'middle', wrapText: true, ...alignment },
    border: BORDA_DOTTED,
  };
}

function aplicarBordasLinha(row: ExcelJS.Row, borda: Partial<ExcelJS.Borders> = BORDA_DOTTED): void {
  for (let col = 1; col <= COLUNAS_TOTAL; col++) {
    row.getCell(col).border = borda;
  }
}

// ── Função principal ─────────────────────────────────────────────────

export async function writeExcelReport(data: ExcelTestRow[], tester: string = ''): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Cenarios');

  sheet.columns = [
    { key: 'cenario', width: 35 },
    { key: 'descricaoTeste', width: 35 },
    { key: 'id', width: 10 },
    { key: 'descricao', width: 37 },
    { key: 'passos', width: 40 },
    { key: 'execucao', width: 20 },
    { key: 'browser', width: 25 },
    { key: 'tags', width: 20 },
    { key: 'duracao', width: 16 },
    { key: 'dataExecucao', width: 27 },
    { key: 'observacoes', width: 40 },
  ];

  // ── Linha 1: "Plano de Testes" — sem fundo, fonte azul (A1:K1) ──
  criarTitulo(sheet);

  // ── Linha 2: Tester (só coluna A) ──
  criarCelulaTester(sheet, tester);

  // ── Linhas 2-5: Resumo nas colunas J e K ──
  criarResumo(sheet, data);

  // ── B2:I5: bloco mergeado (colunas B a I, linhas 2 a 5) ──
  sheet.mergeCells('B2:I5');
  sheet.getCell('B2').border = BORDA_DOTTED;

  // ── A3:A5: merge da coluna A abaixo do tester ──
  sheet.mergeCells('A3:A5');

  // ── Bordas linhas 1-7 ──
  for (let rowNum = 1; rowNum <= 7; rowNum++) {
    aplicarBordasLinha(sheet.getRow(rowNum));
  }

  // ── Linha 6: Elaboração / Execução ──
  criarGruposCabecalho(sheet);

  // ── Linha 7: cabeçalho da tabela ──
  criarCabecalhoTabela(sheet);

  // ── Dados ──
  preencherDados(sheet, data);

  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
  console.log('Excel gerado na memória');
  return buffer;
}

// ── Funções de construção ────────────────────────────────────────────

function criarTitulo(sheet: ExcelJS.Worksheet): void {
  sheet.mergeCells('A1:K1');
  const row = sheet.getRow(1);
  row.height = 30;

  const cell = sheet.getCell('A1');
  cell.value = 'Plano de Testes';
  cell.font = { bold: true, size: 14, color: { argb: COR_HEADER } };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
  cell.border = BORDA_DOTTED;
}

function criarCelulaTester(sheet: ExcelJS.Worksheet, tester: string): void {
  const row = sheet.getRow(2);
  row.height = 20;

  const cell = sheet.getCell('A2');
  cell.value = `Tester: ${tester}`;
  cell.font = { bold: true, color: { argb: COR_TEXTO } };
  cell.alignment = { horizontal: 'left', vertical: 'middle' };
  cell.border = BORDA_DOTTED;
}

function criarResumo(sheet: ExcelJS.Worksheet, data: ExcelTestRow[]): void {
  const itens: { label: string; cor: string; valor: number }[] = [
    { label: 'Passados:', cor: CORES_STATUS['Passou'], valor: data.filter(d => d.execucao === 'Passou').length },
    { label: 'Nao iniciado:', cor: CORES_STATUS['Nao iniciado'], valor: data.filter(d => d.execucao === 'Nao iniciado').length },
    { label: 'Falhos:', cor: CORES_STATUS['Falhou'], valor: data.filter(d => d.execucao === 'Falhou').length },
    { label: 'Bloqueados:', cor: CORES_STATUS['Ignorado'], valor: data.filter(d => d.execucao === 'Ignorado').length },
  ];

  itens.forEach((item, idx) => {
    const row = sheet.getRow(2 + idx);
    row.height = 20;

    // Coluna J (10) = label com cor de fundo
    const labelCell = row.getCell(10);
    labelCell.value = item.label;
    labelCell.font = { bold: true, color: { argb: 'FF000000' } };
    labelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.cor } };
    labelCell.alignment = { horizontal: 'left', vertical: 'middle' };
    labelCell.border = BORDA_DOTTED;

    // Coluna K (11) = valor numérico
    const valorCell = row.getCell(11);
    valorCell.value = item.valor;
    valorCell.font = { color: { argb: COR_TEXTO } };
    valorCell.alignment = { horizontal: 'center', vertical: 'middle' };
    valorCell.border = BORDA_DOTTED;
  });
}

function criarGruposCabecalho(sheet: ExcelJS.Worksheet): void {
  const row = sheet.getRow(6);
  row.height = 20;

  // Elaboração: A6:F6 (cenário, desc teste, ID, desc script, passos, execução)
  sheet.mergeCells('A6:F6');
  const cellElab = sheet.getCell('A6');
  cellElab.value = 'Elaboração';
  cellElab.font = { bold: true, color: { argb: COR_BRANCO } };
  cellElab.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COR_HEADER } };
  cellElab.alignment = { horizontal: 'center', vertical: 'middle' };

  // Execução: G6:K6
  sheet.mergeCells('G6:K6');
  const cellExec = sheet.getCell('G6');
  cellExec.value = 'Execução';
  cellExec.font = { bold: true, color: { argb: COR_BRANCO } };
  cellExec.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COR_HEADER } };
  cellExec.alignment = { horizontal: 'center', vertical: 'middle' };
}

function criarCabecalhoTabela(sheet: ExcelJS.Worksheet): void {
  const headerRow = sheet.getRow(7);
  headerRow.values = [
    'Cenário', 'Descrição do Teste', 'Script (ID)', 'Script (Descrição)', 'Script (Passos)',
    'Execução do Teste', 'Navegador', 'Tags', 'Duração', 'Data de Execução', 'Observações',
  ];
  headerRow.font = { bold: true, color: { argb: COR_BRANCO } };
  headerRow.height = 25;
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COR_HEADER } };
    cell.border = BORDA_DOTTED;
  });
}

function preencherDados(sheet: ExcelJS.Worksheet, data: ExcelTestRow[]): void {
  const grupos = new Map<string, ExcelTestRow[]>();
  for (const item of data) {
    const chave = `${item.cenario}||${item.descricaoTeste}`;
    if (!grupos.has(chave)) grupos.set(chave, []);
    grupos.get(chave)!.push(item);
  }

  // Primeiro passo: preencher todas as linhas e coletar info dos grupos
  const todosGrupos: { primeiraLinha: number; ultimaLinha: number; passos: ExcelTestRow[] }[] = [];

  for (const [_chave, passos] of grupos.entries()) {
    let idCounter = 1;
    const linhaIds: number[] = [];

    for (const passo of passos) {
      const row = sheet.addRow({
        cenario: passo.cenario,
        descricaoTeste: passo.descricaoTeste,
        id: idCounter++,
        descricao: passo.descricao,
        passos: passo.passos,
        execucao: passo.execucao,
        browser: passo.browser ?? '',
        tags: passo.tags,
        duracao: formatarDuracao(passo.duracao),
        dataExecucao: passo.dataExecucao,
        observacoes: passo.observacoes ?? '',
      });

      linhaIds.push(row.number);

      const estilo = estiloTexto();
      ['cenario', 'descricaoTeste', 'id', 'descricao', 'passos', 'browser', 'tags', 'duracao', 'dataExecucao', 'observacoes'].forEach(key => {
        const cell = row.getCell(key);
        Object.assign(cell, estilo);
      });

      // Coluna passos: alinhamento à esquerda e topo (para os steps numerados)
      const cellPassos = row.getCell('passos');
      cellPassos.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };

      aplicarBordasLinha(row);

      const corFundo = CORES_STATUS[passo.execucao as StatusExecucao] ?? CORES_STATUS['Nao iniciado'];
      const cellExec = row.getCell('execucao');
      cellExec.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: corFundo } };
      cellExec.font = { color: { argb: COR_TEXTO } };
      cellExec.alignment = { horizontal: 'center', vertical: 'middle' };
      cellExec.border = BORDA_DOTTED;
    }

    const primeiraLinha = linhaIds[0];
    const ultimaLinha = linhaIds[linhaIds.length - 1];

    todosGrupos.push({ primeiraLinha, ultimaLinha, passos });

    // Merge coluna A (Cenário)
    if (primeiraLinha !== ultimaLinha) {
      sheet.mergeCells(`A${primeiraLinha}:A${ultimaLinha}`);
    }
    const cellCenario = sheet.getCell(`A${primeiraLinha}`);
    cellCenario.value = passos[0].cenario;
    cellCenario.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellCenario.font = { color: { argb: COR_TEXTO } };

    // Merge coluna B (Descrição do Teste)
    if (primeiraLinha !== ultimaLinha) {
      sheet.mergeCells(`B${primeiraLinha}:B${ultimaLinha}`);
    }
    const cellDescTeste = sheet.getCell(`B${primeiraLinha}`);
    cellDescTeste.value = passos[0].descricaoTeste;
    cellDescTeste.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellDescTeste.font = { color: { argb: COR_TEXTO } };

    // Merge coluna H (Tags consecutivas iguais) — era G, agora H por causa da nova coluna
    mesclarTagsConsecutivas(sheet, passos, linhaIds);

    // Divisor horizontal entre cenários (medium azul em A-J)
    aplicarBordasLinha(sheet.getRow(ultimaLinha), BORDA_GRUPO_FIM);
  }

  // Segundo passo: aplicar bordas externas da tabela inteira
  if (todosGrupos.length > 0) {
    const primeiraLinhaTabela = todosGrupos[0].primeiraLinha;
    const ultimaLinhaTabela = todosGrupos[todosGrupos.length - 1].ultimaLinha;

    for (let rowNum = primeiraLinhaTabela; rowNum <= ultimaLinhaTabela; rowNum++) {
      const row = sheet.getRow(rowNum);

      // Coluna A (1): borda esquerda medium
      const cellA = row.getCell(1);
      const bordaA = cellA.border || {};
      cellA.border = {
        ...bordaA,
        left: { style: 'medium', color: { argb: COR_HEADER } },
      } as ExcelJS.Borders;

      // Coluna K (11): borda direita medium
      const cellK = row.getCell(11);
      const bordaK = cellK.border || {};
      cellK.border = {
        ...bordaK,
        right: { style: 'medium', color: { argb: COR_HEADER } },
      } as ExcelJS.Borders;
    }

    // Primeira linha de dados: borda superior medium em A-J
    const rowTopo = sheet.getRow(primeiraLinhaTabela);
    for (let col = 1; col <= COLUNAS_TOTAL; col++) {
      const cell = rowTopo.getCell(col);
      const bordaAtual = cell.border || {};
      cell.border = {
        ...bordaAtual,
        top: { style: 'medium', color: { argb: COR_HEADER } },
      } as ExcelJS.Borders;
    }

    // Última linha de dados: borda inferior medium em A-J
    const rowFundo = sheet.getRow(ultimaLinhaTabela);
    for (let col = 1; col <= COLUNAS_TOTAL; col++) {
      const cell = rowFundo.getCell(col);
      const bordaAtual = cell.border || {};
      cell.border = {
        ...bordaAtual,
        bottom: { style: 'medium', color: { argb: COR_HEADER } },
      } as ExcelJS.Borders;
    }
  }
}

function mesclarTagsConsecutivas(
  sheet: ExcelJS.Worksheet,
  passos: ExcelTestRow[],
  linhaIds: number[],
): void {
  let grupoInicio = 0;
  while (grupoInicio < passos.length) {
    const tagAtual = passos[grupoInicio].tags || '';
    let grupoFim = grupoInicio;
    while (grupoFim + 1 < passos.length && (passos[grupoFim + 1].tags || '') === tagAtual) {
      grupoFim++;
    }
    const linhaInicio = linhaIds[grupoInicio];
    const linhaFim = linhaIds[grupoFim];
    if (linhaInicio !== linhaFim) {
      sheet.mergeCells(`H${linhaInicio}:H${linhaFim}`);
    }
    const cell = sheet.getCell(`H${linhaInicio}`);
    cell.value = tagAtual;
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.font = { color: { argb: COR_TEXTO } };
    grupoInicio = grupoFim + 1;
  }
}