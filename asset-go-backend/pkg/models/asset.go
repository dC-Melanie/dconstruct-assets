package models

import (
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
	ID       uint     `json:"id"`
	Name     string   `json:"name"`
	FilePath string   `json:"filePath"`
	Category Category `json:"category"`
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
