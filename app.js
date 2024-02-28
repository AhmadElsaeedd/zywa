const express = require('express');
//to make the next http request
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server alive!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/get_card_status', async (req, res) => {
    try {
      const { userMobile, cardId } = req.query;
      // Query the database for the card status using userMobile or cardId
      // You'll need to adjust the query based on the table structure and what constitutes a "status"
      const query = `SELECT * FROM card_pickup WHERE user_mobile = ? OR card_id = ?`;
      db.get(query, [userMobile, cardId], (err, row) => {
        if (err) {
          res.status(500).send('Error getting card status');
        } else {
          res.json({ status: row ? 'Picked Up' : 'Unknown', ...row });
        }
      });
    } catch (error) {
      res.status(500).send('Error getting card status');
    }
  });