import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AnalysisEditProps, AnalysisProps } from 'types/analysis';

export const handleExportToExcel = (listItems: AnalysisEditProps[]) => {
  const exportData = listItems.map((item) => ({
    Análise: item.name,
    Fluido: item.fluid,
    'Quantidade de Subanálises': item.quantity,
    //@ts-ignore
    'Ativos Associados': item.installations.join(', '),
  }));

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
  saveAs(excelBlob, 'Exportação Análises.xlsx');
};

export const handleExportToPDF = (listItems: AnalysisEditProps[]) => {
  const exportData: any = listItems.map((item: any) => ({
    Análise: item.name,
    Fluido: item.fluid,
    'Quantidade de Subanálises': item.quantity,
    'Ativos Associados': item.installations.join(', '),
  }));

  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Análise', dataKey: 'Análise' },
    { header: 'Fluido', dataKey: 'Fluido' },
    {
      header: 'Quantidade de Subanálises',
      dataKey: 'Quantidade de Subanálises',
    },
    {
      header: 'Ativos Associados',
      dataKey: 'Ativos Associados',
    },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Análise,
      row.Fluido,
      row['Quantidade de Subanálises'],
      row['Ativos Associados'],
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Análises.pdf');
};
