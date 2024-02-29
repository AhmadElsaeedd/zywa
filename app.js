/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');
const db = require('./database');

const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server alive!');
});

app.get('/get_card_status', (req, res) => {
  const { userMobile, cardId } = req.query;

  // Construct the query to get the latest status and user contact based on userMobile or cardId
  const query = `
      SELECT s.status, s.timestamp, s.comment, c.user_contact
      FROM Status s
      INNER JOIN Cards c ON s.card_id = c.card_id
      WHERE c.user_contact = ? OR c.card_id = ?
      ORDER BY datetime(s.timestamp) DESC
      LIMIT 1
    `;

  // Clean the userMobile input to remove any non-numeric characters
  const cleanedUserMobile = userMobile ? userMobile.replace(/[^0-9]/g, '') : null;

  db.get(query, [cleanedUserMobile, cardId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error getting card status');
      return;
    }
    if (row) {
      res.json({
        cardId: cardId || row.card_id, // Use the cardId from the query or the one from the database
        userMobile: cleanedUserMobile || row.user_contact, // Use the userMobile from the query or the one from the database
        status: row.status,
        timestamp: row.timestamp,
        comment: row.comment,
      });
    } else {
      res.status(404).send('Card not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
