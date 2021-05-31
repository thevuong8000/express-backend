import { Schema, model, Document, Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUserPublicInfo {
  name: string;
  id: string;
}

export interface IUserDocument extends Document {
  name: string;
  password: string;
  email?: string;

  // methods
  getPublicInfo(): IUserPublicInfo;
}

export interface IUserModel extends Model<IUserDocument> {
  getUserById(id: string): Promise<IUserDocument>;
}

const userSchema = new Schema<IUserDocument, IUserModel>({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.getPublicInfo = function (): IUserPublicInfo {
  const { name, _id: id } = this;
  return { id, name };
};

userSchema.statics.getUserById = async function (id: string): Promise<IUserDocument> {
  return this.findOne({ _id: id });
};

export default model<IUserDocument, IUserModel>('User', userSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *       required:
 *         - id
 *         - name
 */
