import session from 'express-session';
import mongoose from 'mongoose';

import { MONGODB_USERNAME, MONGODB_PASSWORD } from './credentials.js';
let models = {};

main().catch((error) => console.log(error));

async function main(){
    let url = "mongodb+srv://"+ MONGODB_USERNAME + ":"+ MONGODB_PASSWORD + "@game-dash-cluster.5lhrnzu.mongodb.net/?retryWrites=true&w=majority"
    console.log("Connecting to MongoDB...");
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Connected to MongoDB');

    const voteSchema = new mongoose.Schema({
        categoryID: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
        userName: String,
        gameTitle: String,
        gameImageUrl : String,
        date: Date,
    });

    const categorySchema = new mongoose.Schema({
        name: String,
    });
    
    models.Vote = mongoose.model('Vote', voteSchema);
    console.log("Vote model created");
    models.Category = mongoose.model('Category', categorySchema);
    console.log("Category model created");
    
}

export default models