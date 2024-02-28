const fs = require('fs');
const csvParser = require('csv-parser');
const db = require('./database');

function importCsvToDb(filePath, statusType) {
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      // Insert or update card in Cards table
      db.run(`INSERT OR IGNORE INTO Cards (card_id, user_contact) VALUES (?, ?)`, [row['Card ID'], row['User contact']], (err) => {
        if (err) throw err;
      });

      // Insert status in Status table
      db.run(`INSERT INTO Status (id, card_id, status, timestamp, comment) VALUES (?, ?, ?, ?, ?)`, [row['ID'], row['Card ID'], statusType, row['Timestamp'], row['Comment']], (err) => {
        if (err) throw err;
      });
    });
}

// Import each CSV with the corresponding status type
importCsvToDb('data/Delivered.csv', 'DELIVERED');
importCsvToDb('data/Delivery exceptions.csv', 'EXCEPTION');
importCsvToDb('data/Pickup.csv', 'PICKED_UP');
importCsvToDb('data/Returned.csv', 'RETURNED');