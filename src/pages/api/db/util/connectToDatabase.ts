import { Db, MongoClient } from "mongodb";

let cachedDb: Db;

export default async (uri: string) => {
    if (cachedDb) {
        return cachedDb;
    } else {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const dbName = new URL(uri).pathname.substr(1);

        const db = client.db(dbName);

        cachedDb = db;

        return db;
    }
}