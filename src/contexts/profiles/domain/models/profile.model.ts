import { GenderEnum } from '../enums';

export interface ProfileModelInterface {
  id: string;
  user_id: string;
  nick: string;
  image: string;
  date_birth: string;
  gender: GenderEnum;
  online_status: boolean;
  province_id: string;
  country_id: string;
}

export interface ProfileModelInterfaceDb {
  _id: string;
  user_id: string;
  nick: string;
  image: string;
  date_birth: string;
  gender: GenderEnum;
  online_status: boolean;
  province_id: string;
  country_id: string;
}

export class ProfileModel {
  private constructor(private attributes: ProfileModelInterface) {}

  static create(attributes: Partial<ProfileModelInterface>): ProfileModel {
    return new ProfileModel({
      id: attributes.id ?? undefined,
      user_id: attributes.user_id ?? undefined,
      date_birth: attributes.date_birth ?? '',
      gender: attributes.gender ?? GenderEnum.MALE,
      online_status: attributes.online_status ?? false,
      province_id: attributes.province_id ?? '',
      country_id: attributes.country_id ?? '',
      image: attributes.image ?? '',
      nick: attributes.nick ?? '',
    });
  }

  static createFromDb(
    attributes: Partial<ProfileModelInterfaceDb>,
  ): ProfileModel {
    return new ProfileModel({
      id: attributes._id ?? undefined,
      user_id: attributes.user_id ?? undefined,
      date_birth: attributes.date_birth ?? '',
      gender: attributes.gender ?? GenderEnum.MALE,
      online_status: attributes.online_status ?? false,
      province_id: attributes.province_id ?? '',
      country_id: attributes.country_id ?? '',
      image: attributes.image ?? '',
      nick: attributes.nick ?? '',
    });
  }

  toInterface(): ProfileModelInterface {
    return { ...this.attributes };
  }

  toInterfaceDb(): ProfileModelInterfaceDb {
    return { _id: this.attributes.id, ...this.attributes };
  }
}
