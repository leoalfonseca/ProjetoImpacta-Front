import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ReagentProps } from 'types/reagent';
import { format } from 'date-fns';

export const handleExportToExcel = (listItens: ReagentProps[]) => {
  const exportData = listItens.map((item) => {
    const isControlled = item.isControlled;
    const controlled = isControlled ? item.observations : '';

    return {
      // Status: item.elementItemStatus.name,
      Reagente: item.name,
      Código: item.reagentCode,
      Fornecedor: item.supplier,
      Validade: format(new Date(item.expiryDate), 'dd/MM/yyyy'),
      'Controlado por': controlled ? controlled : 'Não controlado',
      'Responsável Técnico': item.responsibleTechnician.name,
      'Prev. Recompra': format(
        new Date(item.replenishmentForecast),
        'dd/MM/yyyy'
      ),
    };
  });

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dados');

  // Gere o arquivo XLSX como base64
  const excelBase64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

  // Converta o base64 em Blob
  const byteCharacters = atob(excelBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const excelBlob = new Blob([new Uint8Array(byteNumbers)], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Salve o arquivo usando a biblioteca file-saver
  saveAs(excelBlob, 'Exportação Reagentes.xlsx');
};

export const handleExportToPDF = (listItens: ReagentProps[]) => {
  const exportData = listItens.map((item) => {
    const isControlled = item.isControlled;
    const controlled = isControlled ? item.observations : 'Não controlado';

    return {
      // Status: item.elementItemStatus.name,
      Reagente: item.name,
      Código: item.reagentCode,
      Fornecedor: item.supplier,
      Validade: format(new Date(item.expiryDate), 'dd/MM/yyyy'),
      'Controlado por': controlled ? controlled : 'Não controlado',
      'Responsável Técnico': item.responsibleTechnician.name,
      'Prev. Recompra': format(
        new Date(item.replenishmentForecast),
        'dd/MM/yyyy'
      ),
    };
  });
  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Reagente', dataKey: 'Reagente' },
    { header: 'Código', dataKey: 'Código' },
    { header: 'Fornecedor', dataKey: 'Fornecedor' },
    { header: 'Validade', dataKey: 'Validade' },
    { header: 'Controlado por', dataKey: 'Controlado por' },
    { header: 'Responsável Técnico', dataKey: 'Responsável Técnico' },
    { header: 'Prev. Recompra', dataKey: 'Prev. Recompra' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Código,
      row.Reagente,
      row.Código,
      row.Fornecedor,
      row['Validade'],
      row['Controlado por'],
      row['Responsável Técnico'],
      row['Prev. Recompra'],
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Reagentes.pdf');
};
