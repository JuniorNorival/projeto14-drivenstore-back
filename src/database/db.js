import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://localhost:27017");

async function mongo() {
    let conection;

    try {
        conection = await mongoClient.db("drivenstore");
        return conection;
    } catch (error) {
        console.error(error.message)
        return error.message;
    }
}

export { mongo };