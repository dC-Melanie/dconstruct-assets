package main

import (
	"asset-go-backend/internal/handlers"
	"asset-go-backend/pkg/models"
	"fmt"
	"log"
	"net/http"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/rs/cors"
	//"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Hello world")

	//populating database if empty

	// Connect to SQLite database
	db, err := gorm.Open("sqlite3", "test.db")
	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		return
	}

	// Automatically migrate the User model to create the table
	if err := db.AutoMigrate(&models.Asset{}).Error; err != nil {
		fmt.Println("Failed to migrate database schema:", err)
		return
	}

	var count int64
	db.Model(&models.Asset{}).Count(&count)

	// If no assets exist, create a new one
	if count == 0 {
		newAsset := models.Asset{
			Name:     "Sample Asset",
			FilePath: "https://static.wixstatic.com/media/160bab_aeae549f24234e52967bb6136a7bb390~mv2.png",
			Category: models.Branding,
		}

		// Insert the new asset into the database
		result := db.Create(&newAsset)
		if result.Error != nil {
			fmt.Println("Error creating asset:", result.Error)
			return
		}

		fmt.Println("New asset created:", newAsset)
	} else {
		fmt.Println("Assets already exist. Skipping creation.")
	}

	mux := http.NewServeMux()

	// Register the /api/assets route with the GetAssets handler
	mux.HandleFunc("/api/assets", handlers.GetAllAssets(db))
	mux.HandleFunc("/api/createAsset", handlers.CreateAsset(db))

	// Enable CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // React frontend URL
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	handler := corsHandler.Handler(mux)
	log.Println("Starting server on :8080...")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal("Unable to start server: ", err)
	}

}
