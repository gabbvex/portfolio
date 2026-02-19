import ExcelJS from 'exceljs';

function formatarDuracao(ms: number): string {
  if (!ms || ms <= 0) return '0s 000ms';
  if (ms > 1000000) ms = Math.round(ms / 1_000_000);
  const segundos = Math.floor(ms / 1000);
  const milissegundos = ms % 1000;
  return `${segundos}s ${milissegundos.toString().padStart(3, '0')}ms`;
}

export async function writeExcelReport(data: any[], filePath: string): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Cenários');

  sheet.columns = [
    { header: 'Cenário', key: 'cenario', width: 40 },
    { header: 'Descrição do Teste', key: 'descricaoTeste', width: 40 },
    { header: 'Script (ID)', key: 'id', width: 15 },
    { header: 'Script (Descrição)', key: 'descricao', width: 40 },
    { header: 'Execução do teste', key: 'execucao', width: 25 },
    { header: 'Tags', key: 'tags', width: 30 },
    { header: 'Duração', key: 'duracao', width: 15 },
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
  headerRow.height = 25;
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF366092' } };
    cell.border = {
      top: { style: 'dotted', color: { argb: '008000' } },
      bottom: { style: 'dotted', color: { argb: '008000' } },
      left: { style: 'dotted', color: { argb: '008000' } },
      right: { style: 'dotted', color: { argb: '008000' } },
    };
  });

  let idCounter = 1;
  const cenariosMap = new Map<string, typeof data>();

  for (const item of data) {
    if (!cenariosMap.has(item.cenario)) {
      cenariosMap.set(item.cenario, []);
    }
    cenariosMap.get(item.cenario)!.push(item);
  }

  for (const [cenario, passos] of cenariosMap.entries()) {
    const linhaIds: number[] = [];

    for (const passo of passos) {
      const row = sheet.addRow({
        cenario: passo.cenario,
        descricaoTeste: passo.descricao,
        id: idCounter++,
        descricao: passo.descricao,
        execucao: passo.execucao,
        tags: passo.tags,
        duracao: formatarDuracao(passo.duracao),
      });

      linhaIds.push(row.number);

      row.getCell('id').alignment = { horizontal: 'center', vertical: 'middle' };
      row.getCell('id').font = { color: { argb: 'FF366092' } };
      row.getCell('descricao').alignment = { wrapText: true, vertical: 'top', indent: 1 };
      row.getCell('descricao').font = { color: { argb: 'FF366092' } };
      row.getCell('descricaoTeste').alignment = { wrapText: true, vertical: 'top', indent: 1 };
      row.getCell('descricaoTeste').font = { color: { argb: 'FF366092' } };
      row.getCell('cenario').alignment = { wrapText: true, vertical: 'middle' };
      row.getCell('tags').alignment = { wrapText: true, vertical: 'middle' };
      row.getCell('duracao').alignment = { horizontal: 'center', vertical: 'middle' };
      row.getCell('duracao').font = { color: { argb: 'FF366092' } };

      ['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach((_, i) => {
        row.getCell(i + 1).border = {
          top: { style: 'dotted', color: { argb: '008000' } },
          bottom: { style: 'dotted', color: { argb: '008000' } },
          left: { style: 'dotted', color: { argb: '008000' } },
          right: { style: 'dotted', color: { argb: '008000' } },
        };
      });

      let corFundo = 'FF9FD660';
      if (passo.execucao === 'Falhou') corFundo = 'FFFFB3B3';
      else if (passo.execucao === 'Pendente' || passo.execucao === 'Indefinido') corFundo = 'FFFFFF99';
      else if (passo.execucao === 'Não iniciado' || passo.execucao === 'Ignorado') corFundo = 'FFCCE0FF';

      row.getCell('execucao').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: corFundo } };
      row.getCell('execucao').font = { color: { argb: 'FF366092' } };
      row.getCell('execucao').alignment = { horizontal: 'center', vertical: 'middle' };
      row.getCell('execucao').border = {
        top: { style: 'dotted', color: { argb: '008000' } },
        bottom: { style: 'dotted', color: { argb: '008000' } },
        left: { style: 'dotted', color: { argb: '008000' } },
        right: { style: 'dotted', color: { argb: '008000' } },
      };
    }

    const primeiraLinha = linhaIds[0];
    const ultimaLinha = linhaIds[linhaIds.length - 1];

    sheet.mergeCells(`A${primeiraLinha}:A${ultimaLinha}`);
    const cellCenario = sheet.getCell(`A${primeiraLinha}`);
    cellCenario.value = cenario;
    cellCenario.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellCenario.font = { bold: false, color: { argb: 'FF366092' } };

    sheet.mergeCells(`F${primeiraLinha}:F${ultimaLinha}`);
    const cellTags = sheet.getCell(`F${primeiraLinha}`);
    cellTags.value = passos[0].tags || '';
    cellTags.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cellTags.font = { color: { argb: 'FF366092' } };
  }

  const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
  console.log(`📊 Relatório Excel gerado na memória`);
  return buffer;
}