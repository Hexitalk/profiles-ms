import { IsBoolean, IsMongoId } from 'class-validator';

export class SetProfileOnlineStatusControllerDto {
  @IsMongoId()
  public user_id: string;

  @IsBoolean()
  public online_status: boolean;
}
