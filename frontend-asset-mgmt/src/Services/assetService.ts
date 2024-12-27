import {Asset} from "../Types/Asset"

const API_URL = "http://localhost:8080/api";

export const getAllAssets = async(): Promise<Asset[]>=>{
    try{
        const response = await fetch(`${API_URL}/assets`);
        console.log("Response", response)
        if(!response.ok){
            throw new Error("Failed to fetch assets");
        }
        return await response.json();
    }catch (error) {
        console.error("Error fetching assets:", error);
        throw error; // Throw error to be handled by the component
    }
}

export const createAsset = async(newAsset: Asset): Promise<Asset>=>{
    try{
        const response = await fetch(`${API_URL}/createAsset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(newAsset), // Stringify the asset object to send as the body
        });
        console.log("Response", response);

        if(!response.ok){
            throw new Error("Failed to create asset")
        }
        return await response.json();

    }catch (error) {
        console.error("Error creating asset:", error);
        throw error; // Throw error to be handled by the component
    }
}

export const getAssetsByCategory = async (category: string) => {
    try {
      // Construct the URL with the category query parameter
      const response = await fetch(`${API_URL}/getSpecificAssets?category=${category}`);
  
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch assets');
      }
  
      // Parse the response body as JSON
      const assets = await response.json();
      return assets;
    } catch (error) {
      console.error('Error fetching assets:', error);
      throw error;
    }
  };

  export const uploadAssets = async(file: File)=>{
    const formData = new FormData();
    formData.append('file', file)

    try {
        const response = await fetch(`${API_URL}/uploadAssets`, {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
    
        const result = await response.json();
        return result; // Return the result if upload is successful
      } catch (error) {
        throw new Error('Error uploading assets: ' + error);
      }
  }

  export const deleteAsset = async (filepath: string) => {
    try {
      const response = await fetch(`${API_URL}/delete-image?filePath=${encodeURIComponent(filepath)}`, {
        method: 'DELETE', // HTTP method for deletion
      });
  
      // If response is not OK, throw an error
      if (!response.ok) {
        throw new Error('Failed to delete the image');
      }
  
      return response; // Return the successful response
    } catch (error) {
      console.error('Error deleting asset:', error);
      throw error; // Propagate error for handling in the component
    }
  };