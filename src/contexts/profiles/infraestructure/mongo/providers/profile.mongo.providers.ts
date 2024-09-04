import { Connection } from 'mongoose';
import ProfileMongoSchema from '../schemas/profile.mongo.schema';
export const profilesMongoProviders = [
  {
    provide: 'PROFILE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Profile', ProfileMongoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
