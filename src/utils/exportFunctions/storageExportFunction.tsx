import * as XLSX from 'xlsx';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StorageProps } from 'types/storage';
import { format } from 'date-fns';

export const handleExportToExcel = (storage: StorageProps[]) => {
  const exportData = storage.map((item) => {
    const obj = {
      Status: item.elementItemStatus,
      produto: item.parent,
      Tipo_de_Contentor: item.element,
      Volume: item.volumeUnit,
      Número_do_Contentor: `${item.prioLabId.slice(0, 5)}-${item.prioLabId[5]}`,
      ID_Único: item.prioLabId,
      Lote: item.lot,
      Validade: format(new Date(item.expiryDate), 'dd/MM/yyyy'),
      Localização: item.location,
    };

    return obj;
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
  saveAs(excelBlob, 'Exportação de Contentores.xlsx');
};

export const handleExportToPDF = (storage: StorageProps[]) => {
  const exportData = storage.map((item: any) => {
    const obj = {
      Status: item.elementItemStatus,
      product: item.parent,
      storageType: item.element,
      amount: item.volumeUnit,
      storageNumber: `${item.prioLabId.slice(0, 6)}-${item.prioLabId[6]}`,
      uniqueId: item.prioLabId,
      lot: item.lot,
      expiryDate: format(new Date(item.expiryDate), 'dd/MM/yyyy'),
      location: item.location,
    };

    return obj;
  });
  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Produto', dataKey: 'product' },
    { header: 'Tipo de Contentor', dataKey: 'storageType' },
    { header: 'Volume', dataKey: 'amount' },
    { header: 'Número do Contentor', dataKey: 'storageNumber' },
    { header: 'ID Único', dataKey: 'uniqueId' },
    { header: 'Lote', dataKey: 'lot' },
    { header: 'Validade', dataKey: 'expiryDate' },
    { header: 'Localização', dataKey: 'location' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Status,
      row['product'],
      row['storageType'],
      row['amount'],
      row['storageNumber'],
      row['uniqueId'],
      row['lot'],
      row['expiryDate'],
      row['expiryDate'],
      row.Observações,
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação de Contentores.pdf');
};
