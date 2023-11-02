import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	username: string;
	password: string;
	member: boolean;
	admin: boolean;
}

const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	member: {
		type: Boolean,
		required: true,
	},
	admin: {
		type: Boolean,
		required: true,
	},
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
