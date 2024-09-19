import { ProfileRepository } from '../../domain/ports/profile.repository';
import {
  ProfileModel,
  ProfileModelInterface,
} from '../../domain/models/profile.model';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NotFoundDatabaseException } from '../../domain/exceptions/database/not-found-database-exception';
import { FailSaveDatabaseException } from '../../domain/exceptions/database/fail-save-database-exception';
import { FailDeleteDatabaseException } from '../../domain/exceptions/database/fail-delete-database-exception';

@Injectable()
export class ProfileDbRepository extends ProfileRepository {
  constructor(
    @Inject('PROFILE_MODEL')
    private profileModel: Model<ProfileModelInterface>,
  ) {
    super();
  }

  async insert(profileEntity: ProfileModel): Promise<ProfileModel> {
    const profile = new this.profileModel(profileEntity.toInterfaceDb());
    try {
      await profile.save();
    } catch (error) {
      console.log(error);
      throw new FailSaveDatabaseException('profile');
    }

    return ProfileModel.createFromDb(profile.toObject());
  }

  async update(profileEntity: ProfileModel): Promise<ProfileModel> {
    const profile = profileEntity.toInterfaceDb();
    try {
      const updatedProfile = await this.profileModel.findOneAndUpdate(
        { _id: profile._id },
        profile,
        {
          new: true,
          upsert: false,
          useFindAndModify: false,
        },
      );

      return ProfileModel.createFromDb(updatedProfile.toObject());
    } catch (error) {
      console.log(error);
      throw new FailSaveDatabaseException('profile');
    }
  }

  async delete(id: string): Promise<ProfileModel> {
    const profile = await this.profileModel.findByIdAndDelete(id).exec();

    if (!profile) {
      throw new FailDeleteDatabaseException('profile');
    }

    return ProfileModel.createFromDb(profile.toObject());
  }

  async findById(id: string): Promise<ProfileModel> {
    const profile = await this.profileModel.findById(id).exec();

    if (!profile) {
      throw new NotFoundDatabaseException('profile');
    }

    return ProfileModel.createFromDb(profile.toObject());
  }

  async findByUserId(userId: string): Promise<ProfileModel> {
    const profile = await this.profileModel.findOne({ user_id: userId }).exec();

    if (!profile) {
      throw new NotFoundDatabaseException('profile');
    }

    return ProfileModel.createFromDb(profile.toObject());
  }

  async findListByIds(ids: string[]): Promise<ProfileModel[]> {
    const profiles = await this.profileModel.find({ _id: { $in: ids } }).exec();

    return profiles.map((profile) =>
      ProfileModel.createFromDb(profile.toObject()),
    );
  }
}
