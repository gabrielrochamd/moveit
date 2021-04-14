import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

let cachedClient: MongoClient;

async function connectToMongo(uri: string) {
    if (cachedClient) return cachedClient;

    return MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

export default async (request: VercelRequest, response: VercelResponse) => {
    return connectToMongo(process.env.MONGODB_URI).then((client) => {
        const db = client.db('moveit');

        const collection = db.collection('users');

        return collection.find().sort({ totalExperience: -1 }).toArray().then((users) => {
            return response.status(200).json(users);
        }).catch((error) => {
            return response.status(500).json(error);
        });
    });
}
