import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from './util/connectToDatabase';

export default async (request: VercelRequest, response: VercelResponse) => {
    const { completedChallenges, currentExperience, email, level, totalExperience } = request.body;

    const db = await connectToDatabase(process.env.MONGODB_URI);

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
    });
}
