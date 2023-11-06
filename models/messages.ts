import { DateTime } from 'luxon';
import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
	user: mongoose.Types.ObjectId;
	title: string;
	text: string;
}

const MessageSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		title: { type: String, required: true, minLength: 1 },
		text: { type: String, required: true, minLength: 3 },
	},
	{
		timestamps: true,
	}
);

MessageSchema.virtual('created_date_formatted').get(function () {
	return DateTime.fromJSDate(this.createdAt).toLocaleString(
		DateTime.DATETIME_MED
	);
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
