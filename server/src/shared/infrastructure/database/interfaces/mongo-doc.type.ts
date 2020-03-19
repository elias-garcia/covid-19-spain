import { Document } from "mongoose";

export { MongoDoc };

type MongoDoc<T> = Document & T;
