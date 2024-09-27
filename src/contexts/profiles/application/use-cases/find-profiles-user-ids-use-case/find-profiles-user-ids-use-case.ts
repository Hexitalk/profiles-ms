import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ProfileRepository } from '../../../domain/ports/profile.repository';
import { ProfileModel } from '../../../domain/models/profile.model';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { FindProfilesUserIdsUseCaseDto } from './find-profiles-user-ids.dto';

@Injectable()
export class FindProfilesUserIdsUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    dto: FindProfilesUserIdsUseCaseDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ usersIds: { user_id: string; profile_id: string }[] }> {
    const profiles: ProfileModel[] = await this.profileRepository.findListByIds(
      dto.profilesIds,
    );

    return {
      usersIds: profiles.map((e) => {
        const profInterface = e.toInterface();
        return {
          user_id: profInterface.user_id ?? '',
          profile_id: profInterface.id,
        };
      }),
    };
  }
}
