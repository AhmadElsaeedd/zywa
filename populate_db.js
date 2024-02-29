/* eslint-disable no-shadow */
/* eslint-disable no-console */
const fs = require('fs');
const moment = require('moment');
const csvParser = require('csv-parser');
const db = require('./create_db'); // Make sure this points to the file where the db is created

function cleanContact(contact) {
  // Remove quotes and other non-digit characters from the contact field
  return contact.replace(/[^0-9]/g, '');
}

function standardizeTimestamp(timestamp) {
  // Check if the timestamp is already in ISO format
  if (timestamp.includes('T')) {
    return timestamp; // It's already in ISO format
  }

  // Convert from 'DD-MM-YYYY HH:mm [AM/PM]' to ISO format
  return moment(timestamp, 'DD-MM-YYYY HH:mm A').toISOString();
}

function importCsvToDb(filePath, statusType) {
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      const contact = cleanContact(row['User contact'] || row['User Mobile']);
      const standardizedTimestamp = standardizeTimestamp(row.Timestamp);

      // Insert or update card in Cards table
      db.run('INSERT OR IGNORE INTO Cards (card_id, user_contact) VALUES (?, ?)', [row['Card ID'], contact], (err) => {
        if (err) {
          console.error('Error inserting into Cards table:', err);
          return;
        }

        // Insert status in Status table
        db.run('INSERT INTO Status (id, card_id, status, timestamp, comment) VALUES (?, ?, ?, ?, ?)', [row.ID, row['Card ID'], statusType, standardizedTimestamp, row.Comment], (err) => {
          if (err) {
            console.error('Error inserting into Status table:', err);
          }
        });
      });
    })
    .on('end', () => {
      console.log(`Importing ${filePath} completed.`);
    });
}

// Import each CSV with the corresponding status type
importCsvToDb('data/Delivered.csv', 'DELIVERED');
importCsvToDb('data/Delivery exceptions.csv', 'EXCEPTION');
importCsvToDb('data/Pickup.csv', 'PICKED_UP');
importCsvToDb('data/Returned.csv', 'RETURNED');
