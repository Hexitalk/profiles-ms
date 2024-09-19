import { ProfileModel } from '../models/profile.model';

export abstract class ProfileRepository {
  abstract insert(profile: ProfileModel): Promise<ProfileModel>;
  abstract update(profile: ProfileModel): Promise<ProfileModel>;
  abstract delete(id: string): Promise<ProfileModel>;
  abstract findById(id: string): Promise<ProfileModel>;
  abstract findByUserId(userId: string): Promise<ProfileModel>;
  abstract findListByIds(ids: string[]): Promise<ProfileModel[]>;
}
