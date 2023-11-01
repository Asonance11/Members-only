import mongoose, { InferSchemaType, Schema } from 'mongoose';

const UserSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	member: { type: Boolean, required: true },
	admin: { type: Boolean, required: true },
});

type IUser = InferSchemaType<typeof UserSchema>;

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
