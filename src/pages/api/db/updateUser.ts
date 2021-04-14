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
    const { completedChallenges, currentExperience, email, level, totalExperience } = request.body;

    return connectToMongo(process.env.MONGODB_URI).then((client) => {
        const db = client.db('moveit');

        const collection = db.collection('users');

        return collection.updateOne({ email }, {
            $set: {
                completedChallenges,
                currentExperience,
                level,
                totalExperience
            }
        }).then((result) => {
            return response.status(200).json(result);
        }).catch((error) => {
            return response.status(500).json(error);
        }).finally(() => {
            client.close();
        });
    });
}
