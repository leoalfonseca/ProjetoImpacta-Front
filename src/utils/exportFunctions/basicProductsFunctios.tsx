import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProductProps } from 'types/product';
import * as XLSX from 'xlsx';

export const handleExportToExcel = (basicProducts: ProductProps[]) => {
  const exportData = basicProducts.map((item) => {
    const CQ = item.isControlled;

    return {
      Status: item.isUsed ? 'Ativo' : 'Inativo',
      Produto: item.name,
      Aplicação: item.function,
      Fornecedor: item.supplier,
      CQ: CQ ? 'Sim' : 'Não',
      'Aparência Física': item.appearancePhysical
        ? item.appearancePhysical
        : 'Não se aplica',
      'pH Especificado': item.phSpec ? item.phSpec : 'Não se aplica',
      pH: item.phMin ? item.phMin + ' - ' + item.phMax : 'Não se aplica',
      Densidade: item.densityMin
        ? item.densityMin + ' - ' + item.densityMax
        : 'Não se aplica',
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
  saveAs(excelBlob, 'Exportação Produtos.xlsx');
};
export const handleExportToPDF = (basicProducts: ProductProps[]) => {
  const exportData = basicProducts.map((item) => {
    const CQ = item.isControlled;

    return {
      Status: item.isUsed ? 'Ativo' : 'Inativo',
      Produto: item.name,
      Aplicação: item.function,
      Fornecedor: item.supplier,
      CQ: CQ ? 'Sim' : 'Não',
      'Aparência Física': item.appearancePhysical
        ? item.appearancePhysical
        : 'Não se aplica',
      'pH Especificado': item.phSpec ? item.phSpec : 'Não se aplica',
      pH: item.phMin ? item.phMin + ' - ' + item.phMax : 'Não se aplica',
      Densidade: item.densityMin
        ? item.densityMin + ' - ' + item.densityMax
        : 'Não se aplica',
    };
  });
  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Produto', dataKey: 'Produto' },
    { header: 'Aplicação', dataKey: 'Aplicação' },
    { header: 'Fornecedor', dataKey: 'Fornecedor' },
    { header: 'CQ', dataKey: 'CQ' },
    { header: 'Aparência Física', dataKey: 'Aparência Física' },
    { header: 'pH Especificado', dataKey: 'pH Especificado' },
    { header: 'pH', dataKey: 'pH' },
    { header: 'Densidade', dataKey: 'Densidade' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Status,
      row.Produto,
      row.Aplicação,
      row.Fornecedor,
      row.CQ,
      row['Aparência Física'],
      row['pH Especificado'],
      row.pH,
      row.Densidade,
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Produtos.pdf');
};
