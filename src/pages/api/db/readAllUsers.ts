import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from './util/connectToDatabase';

export default async (request: VercelRequest, response: VercelResponse) => {
    const db = await connectToDatabase(process.env.MONGODB_URI);

    const collection = db.collection('users');

    return collection.find().sort({ totalExperience: -1 }).toArray().then((users) => {
        return response.status(200).json(users);
    }).catch((error) => {
        return response.status(500).json(error);
    });
}
