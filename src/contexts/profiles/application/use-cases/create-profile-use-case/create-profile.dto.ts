import { GenderEnum } from '../../../domain/enums/gender.enum';

export interface CreateProfileDto {
  nick: string;
  gender: GenderEnum;
  date_birth: string;
  image?: string;
  province_id: string;
  country_id: string;
}
