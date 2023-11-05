import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
	user: mongoose.Types.ObjectId;
	title: string;
	text: string;
}

const MessageSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		title: { type: String, required: true },
		text: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
