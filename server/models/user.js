import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
	},
	{ timestamps: true }
);
export default mongoose.model("User", userSchema);