import { SamplingPointProps } from 'types/sampling';
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const HandleExportToExcel = (samplings: SamplingPointProps[]) => {
  const exportData = samplings.map((item) => {
    const isWellAssociated = item.isWellAssociated;

    return {
      Status: item.isActive === true ? 'Ativo' : 'Inativo',
      Ativo: item.installation,
      'Ponto de Amostragem': item.name,
      Código: item.code,
      'Associado à um Poço?': isWellAssociated ? 'Sim' : 'Não',
      Poço: item.well ? item.well.name : 'Não associado',
      Fluido: item.fluid,
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
  saveAs(excelBlob, 'Exportação Pontos de Amostragem.xlsx');
};

export const HandleExportToPDF = (samplings: SamplingPointProps[]) => {
  const exportData = samplings.map((item) => {
    const isWellAssociated = item.isWellAssociated;
    const well = isWellAssociated ? item.well : '';

    return {
      Status: item.isActive === true ? 'Ativo' : 'Inativo',
      Ativo: item.installation,
      'Ponto de Amostragem': item.name,
      Código: item.code,
      'Associado à um Poço?': isWellAssociated ? 'Sim' : 'Não',
      Poço: item.well ? item.well.name : 'Não associado',
      Fluido: item.fluid,
    };
  });
  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Ativo', dataKey: 'Ativo' },
    { header: 'Ponto de Amostragem', dataKey: 'Ponto de Amostragem' },
    { header: 'Código', dataKey: 'Código' },
    { header: 'Associado à um Poço?', dataKey: 'Associado à um Poço?' },
    { header: 'Poço', dataKey: 'Poço' },
    { header: 'Fluido', dataKey: 'Fluido' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Status,
      row.Ativo,
      row['Ponto de Amostragem'],
      row.Código,
      row['Associado à um Poço?'],
      row.Poço,
      row.Fluido,
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Pontos de Amostragem.pdf');
};
