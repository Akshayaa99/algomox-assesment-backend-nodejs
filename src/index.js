const express = require('express');
const fs = require('fs');
var cors = require('cors')
const YAML = require('json-to-pretty-yaml');
const { strict } = require('assert');



const app = express()
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors())
const PORT = process.env.PORT || 8000


app.get('/', (req,res) => {
    res.send("Hello")
})



app.get('/readFile', (req,res) => {
     fs.readFile(`./${req.query.filename}`, 'utf8', (err, data) => {
        if (err) {
          //console.error(err);
          res.send("error")
          return;
        }
        res.send(data)
        
      });
})

app.post('/saveFile', (req,res) => {

  const ymlText = YAML.stringify(JSON.parse(req.body.data))
  fs.writeFileSync("prize.yaml", ymlText);
  file = 'prize.yaml'
  res.download(file)    
  });




app.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT} 🚀`)
})