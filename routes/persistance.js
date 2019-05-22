const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let db;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'time4coffee';
const collectionName = 'coffeepots';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

module.exports = {
    insertDocuments: function (data, callback) {
      // Get the documents collection
      const collection = db.collection(collectionName);
      // Insert some documents
      collection.insertMany([
          {"pot_id" : data['potId'], "empty_pot_weight" : data['emptyPotWeight'], "pot_capacity" : data['potCapacity']}
      ], function(err, result) {
          console.log("Inserted into the collection");
          callback(result);
      });
    },

    updateDocument: function (data, callback) {
      // Get the collection
      const collection = db.collection(collectionName);
      // Update the document
      collection.updateOne({ pot_id : data['potId'] }
          , { $set: { "current_weight" : data['currentWeight'] } }, function(err, result) {
              console.log("Updated the document with current weight");
              callback(result);
          });
    },

    insert: async function (params) {
      const collection = db.collection(collectionName);
      const resp = await collection.insertOne(params);
      console.log('resp', resp);
    },

    update: async function (id, params) {
      const collection = db.collection(collectionName);
      return await collection.updateOne(
        { pot_id: id },
        { $set: params }
      );
    },

    find: async function (params) {
      const collection = db.collection(collectionName);
      return await collection.findOne(params);
    },
};
