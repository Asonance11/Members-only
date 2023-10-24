import mongoose, { InferSchemaType, Schema } from 'mongoose';

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

type MessageType = InferSchemaType<typeof MessageSchema>;

const MessageModel = mongoose.model<MessageType>('Message', MessageSchema);
