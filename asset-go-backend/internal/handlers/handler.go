package handlers

import (
	"asset-go-backend/pkg/models"
	"encoding/json"
	"log"
	"net/http"

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
