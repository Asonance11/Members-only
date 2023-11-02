import mongoose, { InferSchemaType, Schema } from 'mongoose';

const UserSchema = new Schema({
	username: { type: String, required: true, unique: true, length: { min: 3 } },
	password: { type: String, required: true, length: { min: 6 } },
	member: { type: Boolean, required: true },
	admin: { type: Boolean, required: true },
});

type IUser = InferSchemaType<typeof UserSchema>;

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
