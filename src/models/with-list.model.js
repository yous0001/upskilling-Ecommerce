import mongoose from "mongoose";


const withlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
},{
    timestamps: true
});

const WithList = mongoose.models.WithList || mongoose.model('WithList', withlistSchema);
export default WithList