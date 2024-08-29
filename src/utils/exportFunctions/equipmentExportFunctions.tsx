import { format } from 'date-fns';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
import { EquipmentProps } from 'types/equipment';

export const handleExportToExcel = (listItens: EquipmentProps[]) => {
  const exportData = listItens.map((item) => ({
    Status: item.elementItemStatusId,
    Tipo: item.type,
    Equipamento: item.name,
    'ID PRIO': item.prioLabId,
    'Número de Série': item.serialNumber,
    Localização: item.location,
    Fabricante: item.manufacturer,
    'Tag do Fabricante': item.manufacturerTag,
    Modelo: item.model,
    Range: item.range,
    Criticidade: item.criticality ? 'Sim' : 'Não',
    'Data de Fabricação': format(new Date(item.manufactureDate), 'dd/MM/yyyy'),
    'Data de Instalação': format(new Date(item.installationDate), 'dd/MM/yyyy'),
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
  saveAs(excelBlob, 'Exportação Equipamento.xlsx');
};

export const handleExportToPDF = (listItens: EquipmentProps[]) => {
  const exportData: any = listItens.map((item: any) => ({
    Status: item.elementItemStatusId,
    Tipo: item.type,
    Equipamento: item.name,
    'ID PRIO': item.prioLabId,
    'Número de Série': item.serialNumber,
    Localização: item.location,
    Fabricante: item.manufacturer,
    'Tag do Fabricante': item.manufacturerTag,
    Modelo: item.model,
    Range: item.range,
    Criticidade: item.criticality ? 'Sim' : 'Não',
    'Data de Fabricação': format(new Date(item.manufactureDate), 'dd/MM/yyyy'),
    'Data de Instalação': format(new Date(item.installationDate), 'dd/MM/yyyy'),
  }));

  const doc = new jsPDF('l', 'mm', [297, 400]);

  const columns = [
    { header: 'Status', dataKey: 'Status' },
    { header: 'Tipo', dataKey: 'Tipo' },
    { header: 'Equipamento', dataKey: 'Equipamento' },
    { header: 'ID PRIO', dataKey: 'ID PRIO' },
    { header: 'Número de Série', dataKey: 'Número de Série' },
    { header: 'Localização', dataKey: 'Localização' },
    { header: 'Fabricante', dataKey: 'Fabricante' },
    { header: 'Tag do Fabricante', dataKey: 'Tag do Fabricante' },
    { header: 'Modelo', dataKey: 'Modelo' },
    { header: 'Range', dataKey: 'Range' },
    { header: 'Criticidade', dataKey: 'Criticidade' },
    { header: 'Data de Fabricação', dataKey: 'Data de Fabricação' },
    { header: 'Data de Instalação', dataKey: 'Data de Instalação' },
  ];

  const rowsPDF = exportData.map((row: any) => {
    return [
      row.Status,
      row.Tipo,
      row.Equipamento,
      row['ID PRIO'],
      row['Número de Série'],
      row.Localização,
      row.Fabricante,
      row['Tag do Fabricante'],
      row.Modelo,
      row.Range,
      row.Criticidade,
      row['Data de Fabricação'],
      row['Data de Instalação'],
    ];
  });

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: rowsPDF,
  });

  const pdfBlob = doc.output('blob');

  saveAs(pdfBlob, 'Exportação Equipamento.pdf');
};
