package handlers

import (
	"asset-go-backend/pkg/models"
	"encoding/json"
	"log"
	"net/http"
	"time"

	//"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/xuri/excelize/v2"
)

func GetAllAssets(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var assetsList []models.Asset
		result := db.Find(&assetsList)
		if result.Error != nil {
			http.Error(w, "Unable to retrieve assets", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(assetsList)
	}
}

func CreateAsset(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var asset models.Asset
		err := json.NewDecoder(r.Body).Decode(&asset)
		if err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		asset.Date = time.Now() // Automatically set the current date

		result := db.Create(&asset)
		if result.Error != nil {
			log.Println("Error creating asset: ", result.Error)
			http.Error(w, "Unable to create asset", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(asset)
	}
}

func GetSpecificAssets(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		category := r.URL.Query().Get("category")
		if category == "" {
			http.Error(w, "Category parameter is required", http.StatusBadRequest)
			return
		}
		var assetsList []models.Asset
		result := db.Where("category = ?", category).Find(&assetsList)
		if result.Error != nil {
			http.Error(w, "Unable to retrieve assets", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(assetsList)
	}
}

func BulkCreateAssets(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			http.Error(w, "Unable to parse form", http.StatusBadRequest)
			return
		}
		file, _, err := r.FormFile("file")
		if err != nil {
			http.Error(w, "No file provided", http.StatusBadRequest)
			return
		}
		defer file.Close()

		f, err := excelize.OpenReader(file)
		if err != nil {
			http.Error(w, "Unable to read file", http.StatusInternalServerError)
			return
		}

		sheetName := f.GetSheetList()[0]
		rows, err := f.GetRows(sheetName)
		if err != nil {
			http.Error(w, "Unable to get sheet rows", http.StatusInternalServerError)
			return
		}

		var assets []models.Asset
		for _, row := range rows[1:] {
			if len(row) < 6 {
				log.Printf("Row skipped: Missing required fields")
				continue
			}
			asset := models.Asset{
				Name:        row[0],
				FilePath:    row[2],
				Category:    row[1],
				Description: row[3],
				Owner:       row[5],
				FileType:    row[6],
				Comments:    row[7],
				Date:        time.Now(),
			}
			assets = append(assets, asset)
		}

		if len(assets) > 0 {
			for _, asset := range assets {
				result := db.Create(&asset)
				if result.Error != nil {
					log.Println("Error inserting asset:", result.Error)
					http.Error(w, "Unable to insert assets", http.StatusInternalServerError)
					return
				}
			}
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(assets)
	}
}

func DeleteAsset(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Extract the asset ID or filePath from the URL (using mux router in this example)
		filePath := r.URL.Query().Get("filePath")

		if filePath == "" {
			http.Error(w, "filePath parameter is missing", http.StatusBadRequest)
			return
		}

		// Try to find the asset in the database
		var asset models.Asset
		result := db.Where("file_path = ?", filePath).First(&asset)
		if result.Error != nil {
			// If the asset is not found, return a 404 error
			if result.Error == gorm.ErrRecordNotFound {
				http.Error(w, "Asset not found", http.StatusNotFound)
				return
			}
			// If some other error occurs during query
			log.Println("Error finding asset: ", result.Error)
			http.Error(w, "Unable to find asset", http.StatusInternalServerError)
			return
		}

		// If the asset is found, delete it
		result = db.Delete(&asset)
		if result.Error != nil {
			log.Println("Error deleting asset: ", result.Error)
			http.Error(w, "Unable to delete asset", http.StatusInternalServerError)
			return
		}

		// Send a success response
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Asset deleted successfully"))
	}
}

const uploadDir = "./uploads"

// func uploadHandler(w http.ResponseWriter, r *httpRequest) {
// 	w.Header().Set("Content-Type", "application/json")
// 	err := r.ParseMultipartForm(10 << 20)
// 	if err != nil {
// 		http.Error(w, "Unable to parse form", http.StatusBadRequest)
// 		return
// 	}
// 	file, _, err := r.FormFile("file")
// 	if err != nil {
// 		http.Error(w, "Unable to read file", http.StatusBadRequest)
// 		return
// 	}
// 	defer file.Close()

// 	// Ensure the upload directory exists
// 	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
// 		err = os.Mkdir(uploadDir, 0755)
// 		if err != nil {
// 			http.Error(w, "Unable to create upload directory", http.StatusInternalServerError)
// 			return
// 		}
// 	}

// 	// Check if there is an existing file and delete it
// 	existingFilePath := filepath.Join(uploadDir, "uploaded_file")
// 	if _, err := os.Stat(existingFilePath); err == nil {
// 		// Delete the existing file if it exists
// 		err = os.Remove(existingFilePath)
// 		if err != nil {
// 			http.Error(w, "Unable to delete old file", http.StatusInternalServerError)
// 			return
// 		}
// 	}

// 	// Save the new file with the same name "uploaded_file"
// 	dst, err := os.Create(existingFilePath)
// 	if err != nil {
// 		http.Error(w, "Unable to save file", http.StatusInternalServerError)
// 		return
// 	}
// 	defer dst.Close()

// 	// Copy the uploaded file content to the destination file
// 	_, err = io.Copy(dst, file)
// 	if err != nil {
// 		http.Error(w, "Error copying file", http.StatusInternalServerError)
// 		return
// 	}

// 	cmd := exec.Command("python3", "../image_search.py")
// 	cmd.Stdout = os.Stdout
// 	cmd.Stderr = os.Stderr

// 	errormsg := cmd.Run()
// 	if errormsg != nil {
// 		fmt.Println("Error executing python script", errormsg)
// 	} else {
// 		fmt.Println("Python script exec success")
// 	}

// }

// func getSimilarImage(){

// }
