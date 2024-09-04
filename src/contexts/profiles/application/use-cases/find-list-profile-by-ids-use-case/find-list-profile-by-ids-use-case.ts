import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ProfileRepository } from '../../../domain/ports/profile.repository';
import {
  ProfileModel,
  ProfileModelInterface,
} from '../../../domain/models/profile.model';
import { FindListProfileByIdsDto } from './find-list-profile-by-ids.dto';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';

@Injectable()
export class FindListProfileByIdsUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    dto: FindListProfileByIdsDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ profiles: ProfileModelInterface[] }> {
    const profiles: ProfileModel[] = await this.profileRepository.findListByIds(
      dto.ids,
    );

    return {
      profiles: profiles.map((e) => e.toInterface()),
    };
  }
}
