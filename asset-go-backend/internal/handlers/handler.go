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
				FilePath:    row[1],
				Category:    row[2],
				Description: row[3],
				FileType:    row[4],
				Comments:    row[5],
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
