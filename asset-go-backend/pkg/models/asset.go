package models

import (
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

type Category string

const (
	Branding   Category = "Branding"
	Products   Category = "Products"
	Events     Category = "Events"
	Guides     Category = "Guides"
	Operations Category = "Operations"
)

type Asset struct {
	ID          uint      `json:"id"`          // Corresponds to the "id" column
	Name        string    `json:"name"`        // Corresponds to the "name" column
	FilePath    string    `json:"filePath"`    // Corresponds to the "file_path" column
	Category    string    `json:"category"`    // Corresponds to the "category" column
	Description string    `json:"description"` // Corresponds to the "description" column
	Date        time.Time `json:"date"`        // Corresponds to the "date" column
	Owner       string    `json:"owner"`       // Corresponds to the "owner" column
	FileType    string    `json:"fileType"`    // Corresponds to the "file_type" column
	Comments    string    `json:"comments"`    // Corresponds to the "comments" column
}

// InitDB initializes the SQLite database connection
func InitDB() (*gorm.DB, error) {
	// Connect to SQLite database
	db, err := gorm.Open("sqlite3", "test.db")
	if err != nil {
		return nil, err
	}

	// Automatically migrate the User model to create the table
	db.AutoMigrate(&Asset{})
	return db, nil
}
