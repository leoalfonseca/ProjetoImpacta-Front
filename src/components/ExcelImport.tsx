import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Box, Button } from "@mui/material";
import { IconDownload } from "@tabler/icons-react";

interface ImportFromExcelProps {
  onDataImported: (data: any[]) => void;
}

const ImportFromExcel: React.FC<ImportFromExcelProps> = ({
  onDataImported,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const importData = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        onDataImported(jsonData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={importData}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          component="span"
          endIcon={<IconDownload />}
          sx={{
            backgroundColor: "#096268",
            color: "white",
            "&:hover": {
              backgroundColor: "#0e4e51",
              color: "#fff",
            },
          }}
        >
          Carregar Arquivo   
        </Button>
      </label>
      {/* {file && (
        <div>
          <p>{file.name}</p>
        </div>
      )} */}
      
    </Box>
  );
};

export default ImportFromExcel;
