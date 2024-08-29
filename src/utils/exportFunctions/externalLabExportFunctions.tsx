import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LaboratoriesProps } from 'types/laboratories';
import * as XLSX from 'xlsx';

export const handleExportToExcel = (listItens: LaboratoriesProps[]) => {
  const exportData = listItens.map((item) => ({
    Status: item.isActive === true ? 'Ativo' : 'Inativo',
    Código: item.code,
    'Nome Fantasia': item.fantasyName,
    'Razão Social': item.fantasyName,
    CNPJ: item.cnpj,
    Email: item.email,
    'Tipo de Laboratório': item.laboratoryType.name,
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dados');

  const excelBase64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

  const byteCharacters = atob(excelBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const excelBlob = new Blob([new Uint8Array(byteNumbers)], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(excelBlob, 'Exportação Laboratórios Onshore.xlsx');
};

export const handleExportToPDF = (listItens: LaboratoriesProps[]) => {
  const exportData: any = listItens.map((item: any) => ({
    Status: item.isActive === true ? 'Ativo' : 'Inativo',
    Código: item.code,
    'Nome Fantasia': item.fantasyName,
    'Razão Social': item.fantasyName,
    CNPJ: item.cnpj,
    Email: item.email,
    'Tipo de Laboratório': item.laboratoryType.name,
  }));

  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Código', dataKey: 'Código' },
    { header: 'Nome Fantasia', dataKey: 'Nome Fantasia' },
    { header: 'Razão Social', dataKey: 'Razão Social' },
    { header: 'CNPJ', dataKey: 'CNPJ' },
    { header: 'Email', dataKey: 'Email' },
    { header: 'Tipo de Laboratório', dataKey: 'Tipo de Laboratório' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Status,
      row.Código,
      row['Nome Fantasia'],
      row['Razão Social'],
      row.CNPJ,
      row.Email,
      row['Tipo de Laboratório'],
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Laboratórios Onshore.pdf');
};
