import mongoose, { Schema } from "mongoose";
export function connectDB() {
	if (!process.env.MONGODB_URL) {
		throw new Error("MONGODB_URL is missing in .env");
	}
	return mongoose.connect(process.env.MONGODB_URL);
}

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
    share:{
        type:Boolean,
        default:false
    }
});

export const userModel = mongoose.model("user", userSchema);

const contentSchema = new Schema({
	title: String,
	link: String,
	typeoflink: String,
	tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
	userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
});

export const contentModel = mongoose.model("content", contentSchema);

const LinkSchema = new Schema({
	hash:String,
	userId:{
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
		unique:true
	}
	
})

export const LinkModel = mongoose.model("links",LinkSchema)