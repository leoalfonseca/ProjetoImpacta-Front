import { FluidProps } from 'types/fluid';
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const handleExportToExcel = (listItens: FluidProps[]) => {
  const exportData = listItens.map((item) => ({
    Fluido: item.name,
    'Tipo de Sistema': item.systemType,
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
  saveAs(excelBlob, 'Exportação Fluidos.xlsx');
};

export const handleExportToPDF = (listItens: FluidProps[]) => {
  const exportData: any = listItens.map((item: any) => ({
    Fluido: item.name,
    'Tipo de Sistema': item.systemType,
  }));

  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Fluido', dataKey: 'Fluido' },
    { header: 'Tipo de Sistema', dataKey: 'Tipo de Sistema' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [row.Fluido, row['Tipo de Sistema']];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Fluidos.pdf');
};
