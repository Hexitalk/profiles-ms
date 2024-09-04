import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ProfileRepository } from '../../../domain/ports/profile.repository';
import {
  ProfileModel,
  ProfileModelInterface,
} from '../../../domain/models/profile.model';
import { FindProfileByIdDto } from './find-profile-by-id.dto';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';

@Injectable()
export class FindProfileByIdUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    dto: FindProfileByIdDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ profile: ProfileModelInterface | null }> {
    const profile: ProfileModel | null = await this.profileRepository.findById(
      dto.id,
    );

    return {
      profile: profile ? profile.toInterface() : null,
    };
  }
}
