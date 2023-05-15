import { Schema,model } from "mongoose";

interface TBook {
    id?:string,
    author: string,
    title: string,
    year: Number,
}

const BookSchema = new Schema<TBook>({
    id: String,
    author: {type: String, required: true},
    title: {type: String, required: true},

    year: {type: String, required: true},


});

const  Book = model<TBook>('books',BookSchema)
export default Book;
