// const mongoose = require('mongoose')
// // const mongoDbClient = require("mongodb").MongoClient
// const mongoURI = 'mongodb://<!#@!#@>:"!@!@"@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/Customer?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// // mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
// module.exports = function (callback) {
//     mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//         // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
//         if (err) console.log("---" + err)
//         else {
//             // var database =
//             console.log("connected to mongo")
//             const foodCollection = await mongoose.connection.db.collection("food_items");
//             foodCollection.find({}).toArray(async function (err, data) {
//                 const categoryCollection = await mongoose.connection.db.collection("Categories");
//                 categoryCollection.find({}).toArray(async function (err, Catdata) {
//                     callback(err, data, Catdata);

//                 })
//             });
//             // listCollections({name: 'food_items'}).toArray(function (err, database) {
//             // });
//             //     module.exports.Collection = database;
//             // });
//         }
//     })
// };

const mongoose = require("mongoose");
const dbUri =
  "mongodb+srv://Oyo-Canteen:a1b2c3d4iit@cluster0.zedicjc.mongodb.net/Oyo-Canteen?retryWrites=true&w=majority";

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray()
      .then((data) => {
        global.foodData = data;
      })
      .catch((err) => console.error(err));
    mongoose.connection.db
      .collection("foodCatagory")
      .find({})
      .toArray()
      .then((data2) => {
        global.foodCategory = data2;
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.error(err));
