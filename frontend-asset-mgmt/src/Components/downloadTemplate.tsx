import React from 'react';
import * as XLSX from 'xlsx';

const DownloadTemplateButton = () => {
    const generateExcelTemplate = () => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Define the headers for the sheet
        const headers = ['Name', 'Category', 'FilePath'];
        
        // Create data for the sheet, which is just the headers in this case
        const data = [
            headers,
            // Add more sample data if desired
        ];
        
        // Convert the data into a sheet
        const ws = XLSX.utils.aoa_to_sheet(data);

        // Add the sheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Assets');

        // Generate and download the Excel file
        XLSX.writeFile(wb, 'Asset_Template.xlsx');
    };

    return (
        <button onClick={generateExcelTemplate} className="btn btn-success">
            Download Template for Mass Upload
        </button>
    );
};

export default DownloadTemplateButton;
