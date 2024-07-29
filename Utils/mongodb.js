const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('bookStats');
  }
  return db;
}

async function incrementBookSummaryCount(title) {
  const database = await connectToDatabase();
  const collection = database.collection('bookSummaries');
  console.log(`Incrementing count for title: ${title}`);
  await collection.updateOne(
    { title: title },
    { $inc: { count: 1 } },
    { upsert: true }
  );
  console.log(`Count incremented for title: ${title}`);
}

async function getBookSummaryCount(title) {
  const database = await connectToDatabase();
  const collection = database.collection('bookSummaries');
  const book = await collection.findOne({ title: title });
  const count = book ? book.count : 0;
  console.log(`Retrieved count for title ${title}: ${count}`);
  return count;
}

module.exports = { incrementBookSummaryCount, getBookSummaryCount };
