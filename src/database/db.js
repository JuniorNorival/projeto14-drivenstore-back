import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function mongo() {
  let conection;

  try {
    conection = await mongoClient.db("drivenstore");
    return conection;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}

export { mongo };
