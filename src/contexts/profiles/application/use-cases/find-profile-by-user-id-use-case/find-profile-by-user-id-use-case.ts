import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ProfileRepository } from '../../../domain/ports/profile.repository';
import { ProfileModelInterface } from '../../../domain/models/profile.model';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';

@Injectable()
export class FindProfileByUserIdUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    userId: string,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ profile: ProfileModelInterface }> {
    const profile = await this.profileRepository.findByUserId(userId);

    return {
      profile: profile ? profile.toInterface() : null,
    };
  }
}
