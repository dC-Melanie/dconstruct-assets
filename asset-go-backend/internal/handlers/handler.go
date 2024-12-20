package handlers

import (
	"asset-go-backend/pkg/models"
	"encoding/json"
	"log"
	"net/http"

	"github.com/xuri/excelize/v2"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

// HelloHandler is a simple route that returns a hello message
func HelloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello, World!",
	})
}

// GetUsersHandler returns a mock list of users (can be expanded with a database)
func GetUsersHandler(c *gin.Context) {
	users := []map[string]interface{}{
		{"id": 1, "name": "John Doe", "email": "john@example.com"},
		{"id": 2, "name": "Jane Doe", "email": "jane@example.com"},
	}
	c.JSON(http.StatusOK, users)
}

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
		log.Println("category", category)
		if category == "" {
			http.Error(w, "Category paramter is required", http.StatusBadRequest)
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
		} else {
			log.Println("file opened")
		}
		sheetNames := f.GetSheetList()
		log.Println("Available sheets:", sheetNames)

		sheetName := sheetNames[0]
		log.Println("sheet name", sheetName)
		rows, err := f.GetRows(sheetName)
		if err != nil {
			http.Error(w, "Unable to get sheet rows", http.StatusInternalServerError)
			return
		}
		log.Println("Rows from sheet:", rows)
		var assets []models.Asset
		for _, row := range rows[1:3] {
			log.Println("Rows from sheet:", row)
			if len(row) < 3 {
				log.Printf("Row skipped: Missing required fields")
				continue
			}
			asset := models.Asset{
				Name:     row[0],
				FilePath: row[2],
				Category: models.Category(row[1]),
			}
			assets = append(assets, asset)
		}
		log.Println("Assets from sheet:", assets)
		if len(assets) > 0 {
			for _, asset := range assets {
				result := db.Create(&asset) // Create each asset one by one
				if result.Error != nil {
					log.Println("Error inserting asset:", result.Error)
					http.Error(w, "Unable to insert asset", http.StatusInternalServerError)
					return
				}
			}
			log.Println("All assets inserted successfully!")
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(assets)
	}
}
