import { MongoClient } from 'mongodb'

const URI = process.env.MONGODB_URI;
const options: object = {}

if (!URI) throw new Error ('Please add your Mongo URI to .env.local')

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development'){
    // Caching pencegahan reconnection development
    if (!global._mongoClientPromise){
        client = new MongoClient(URI, options);
        global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise
} else {
    // production
    client = new MongoClient(URI, options)
    clientPromise = client.connect();
}

export default clientPromise;