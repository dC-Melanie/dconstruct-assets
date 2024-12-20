import React, { useState } from 'react';
import { uploadAssets } from '../Services/assetService';

const UploadExcelButton = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file");
            return;
        }
        setUploading(true);
        setError(null);
        setSuccess(null);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await uploadAssets(file); // Call the service function
            setSuccess('Assets uploaded successfully!');
        } catch (err: any) {
            setError('Error uploading assets: ' + err.message);
        } finally {
            setUploading(false);
        }

    };

    return (
        <div>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload Excel'}
          </button>
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      );
}


export default UploadExcelButton;