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
    const {
        completedChallenges,
        currentExperience,
        email,
        image,
        level,
        name,
        totalExperience
    } = request.body;
    return connectToMongo(process.env.MONGODB_URI).then((client) => {
        const db = client.db('moveit');

        const collection = db.collection('users');

        return collection.insertOne({
            completedChallenges,
            currentExperience,
            email,
            image,
            level,
            name,
            totalExperience
        }).then((result) => {
            return response.status(201).json(result);
        }).catch((error) => {
            return response.status(500).json(error);
        });
    });
}
