// import fs from 'fs';
// import path from 'path';
// import conncetMongoDB from './controllers/mongodb';
// import App from './app';
// import settings from '../settings.json';

// // eslint-disable-next-line
// console.log(`\x1b[31m
// BRAKING CHANGE!!!
// From now on all the API endpoints will be prefixed as /api
// You won't need to change the server code but the front end.

// HTTP methods should be used as this.route.METHOD
// rather than this.METHOD

// The previous way will keep working but will not be served as endpoint
// \x1b[0m`);

// (() => {
//   // Check for clients directory as it is required by this framework
//   const statics = path.resolve(__dirname, '..', 'client');
//   if (!fs.existsSync(statics)) {
//     fs.mkdirSync(statics);
//   }

  

//   // Connect to MongoDB
//   conncetMongoDB(settings.mongodbURL)
//     .then(function (res) {
//       console.log(`=> ${res}!`);

//       // Boot Up the server & services
//       const app = new App();
//       app.start();
//     })
//     .catch(err => console.log(err));
// })();


const express = require('express');
const cors = require('cors');
const app=express();
const port=process.env.PORT||5000;

app.get('/',(req,res)=>{
  res.send('Server running');
});

app.use(cors());
app.use(express.json());

const users=[
  {id:1,name:'Talha',email:'talha@gmail.com'},
  {id:1,name:'Tanzil',email:'tanzil@gmail.com'},

];

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://taskk:lf07bjlzJGg59nXx@cluster0.bv1vhng.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
app.get('/users',(req,res)=>{
  if(req.query.name){
    const search=req.query.name;
    const filtered=users.filter(usr =>usr.name.indexOf(search));
    res.send(filtered);
  }
  else{
    res.send(users);
  }
});

app.listen(port,()=>{
  console.log(`Server ${port}`);
});