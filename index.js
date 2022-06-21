const express = require('express');
const app = express();
const port = 8000;

const User = require("./models/User");
const config = require("./config/key")

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI) 
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register', (req, res) => {
  const user = new User(req.body);
  console.log(user);
  user.save((err, userInfo) => {
    console.log(userInfo);
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


