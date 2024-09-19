import * as mongoose from 'mongoose';
import { GenderEnum } from 'src/contexts/profiles/domain/enums';

const ProfileMongoSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    nick: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    date_birth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(GenderEnum),
      required: true,
    },
    online_status: {
      type: Boolean,
      required: false,
      default: false,
    },
    province_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    country_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default ProfileMongoSchema;
