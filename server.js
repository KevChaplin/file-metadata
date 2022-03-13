var express = require('express');
var cors = require('cors');
require('dotenv').config()
// const mongoose = require('mongoose')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/'})

var app = express();

// Connect DB
// const connectDB = (url) => {
//   return mongoose.connect(url)
// }

// MIDDLEWARE

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// ROUTES

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file)
  const resObj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
  res.json(resObj)
})


// Basic Configuration
const port = process.env.PORT || 3000

// Run App
const start = () => {
  try {
    // await connectDB(process.env.MONGO_URI)
    app.listen(port, () => 
      console.log(`Server is listening on port ${port}...`)
    )
  } catch(err) {
    console.log(err)
  }
}

start()
