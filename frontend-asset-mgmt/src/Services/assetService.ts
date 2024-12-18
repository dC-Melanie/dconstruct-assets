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