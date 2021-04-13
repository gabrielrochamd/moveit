import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from './util/connectToDatabase';

export default async (request: VercelRequest, response: VercelResponse) => {
    const { email } = request.body;

    const db = await connectToDatabase(process.env.MONGODB_URI);

    const collection = db.collection('users');

    return collection.findOne({ email }).then((result) => {
        return response.status(200).json(result);
    }).catch((error) => {
        return response.status(500).json(error);
    });
}
