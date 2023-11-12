const express = require('express') //connect to express
const app = express() //set the express variable to the app variable 
const bodyParser = require('body-parser') //
const MongoClient = require('mongodb').MongoClient //set up how we talk to database

var db, collection;

const url = "mongodb+srv://briannawillis195:Totgvgpvn16O9T8w@journalentries.pwr34jx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('toWatch').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {shows: result})
  })
})

// req.name.msg is to get the message from the from
// req.name.name is to get the name from the form
app.post('/shows', (req, res) => {

  console.log(req)
  db.collection('toWatch').insertOne({
    name: req.body.name,
    watched: false,
    //thumbUp: 0, 
    //thumbDown:0
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/') //triggers the GET
  })
})


//worked on making the thumbs down button with my house moses members
app.put('/shows/watched', (req, res) => {
  db.collection('toWatch')
  .findOneAndUpdate({
    name: req.body.name, 
  }, {
    $set: {
      watched: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/shows', (req, res) => {
  db.collection('toWatch').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
