import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { WellProps } from 'types/well';

export const handleExportToExcel = (wells: WellProps[]) => {
  const exportData = wells.map((item) => ({
    Status: item.isActive === true ? 'Ativo' : 'Inativo',
    Código: item.code,
    Poço: item.name,
    Ativo: item.installation,
    Campo: item.field,
    Observações: item.description,
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
  saveAs(excelBlob, 'Exportação Poços.xlsx');
};

export const handleExportToPDF = (wells: WellProps[]) => {
  const exportData: any = wells.map((item: any) => ({
    Status: item.isActive === true ? 'Ativo' : 'Inativo',
    Código: item.code,
    Poço: item.name,
    Ativo: item.installation,
    Campo: item.field,
    Observações: item.description,
  }));
  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Código', dataKey: 'Código' },
    { header: 'Poço', dataKey: 'Poço' },
    { header: 'Ativo', dataKey: 'Ativo' },
    { header: 'Campo', dataKey: 'Campo' },
    { header: 'Observações', dataKey: 'Observações' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Status,
      row['Código'],
      row['Poço'],
      row['Ativo'],
      row['Campo'],
      row.Observações,
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Poços.pdf');
};
