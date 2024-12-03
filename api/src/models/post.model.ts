import mongoose, { Schema } from "mongoose";

// Define interface for User document
// interface IPost extends Document {
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	password: string;
// 	active: boolean;
// 	role: UserRole;
// 	plantId: string;
// 	screens: string[];
// 	phone?: string; // Optional phone field
// }

// Define Mongoose schema for User
const postSchema: Schema = new Schema(
	{
		content: { type: String, required: true },
		parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default:null },
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
