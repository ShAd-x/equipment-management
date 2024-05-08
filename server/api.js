async function run(){
    let url = "mongodb://0.0.0.0:27017/test";
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(url);
    await client.connect();
    const database = client.db('dsds');
    // log the database name
    console.log("Connected to the database");
}
run();