import express from 'express';
import bodyParser from 'body-parser';

const app = express();  
const port=4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.post('/submit', (req, res) => {
 const {name,email} = req.body;
 if(!name || !email) {
   return res.status(400).send('Name and email are required');
 }
 console.log(`Email: ${email}, Password: ${password}`);
  res.status(201).send('Login data received');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});