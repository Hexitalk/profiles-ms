import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ProfileRepository } from '../../../domain/ports/profile.repository';
import {
  ProfileModel,
  ProfileModelInterface,
} from '../../../domain/models/profile.model';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { FindListProfilesByIdsDto } from './find-list-profiles-by-ids.dto';

@Injectable()
export class FindListProfilesByIdsUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    dto: FindListProfilesByIdsDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ profiles: ProfileModelInterface[] }> {
    const profiles: ProfileModel[] = await this.profileRepository.findListByIds(
      dto.profilesIds,
    );

    return {
      profiles: profiles.map((e) => e.toInterface()),
    };
  }
}
