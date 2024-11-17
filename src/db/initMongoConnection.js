import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

export async function initMongoConnection() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error('Error while setting up mongo connection', err);
    throw err;
  }
}
