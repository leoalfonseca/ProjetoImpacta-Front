import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { LaboratoriesProps } from 'types/laboratories';

interface iHandleExport {
  listItens: LaboratoriesProps[];
}

export const handleExportToExcel = (listItens: LaboratoriesProps[]) => {
  const exportData = listItens.map((item) => ({
    Status: item.isActive === true ? 'Ativo' : 'Inativo',
    Laboratório: item.fantasyName,
    'Tipo de Laboratório': item.laboratoryType.name,
    Código: item.code,
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
  saveAs(excelBlob, 'Exportação Laboratórios Offshore.xlsx');
};

export const handleExportToPDF = (listItens: LaboratoriesProps[]) => {
  const exportData: any = listItens.map((item: any) => ({
    Status: item.isActive === true ? 'Ativo' : 'Inativo',
    Laboratório: item.fantasyName,
    'Tipo de Laboratório': item.laboratoriesType,
    Código: item.code,
  }));

  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Laboratório', dataKey: 'Laboratório' },
    { header: 'Tipo de Laboratório', dataKey: 'Tipo de Laboratório' },
    { header: 'Código', dataKey: 'Código' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Status,
      row.Laboratório,
      row['Tipo de Laboratório'],
      row.Código,
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Laboratórios Offshore.pdf');
};
