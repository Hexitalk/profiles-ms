import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { ProfileRepository } from '../../../domain/ports/profile.repository';
import { DeleteProfileDto } from './delete-profile.dto';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';

@Injectable()
export class DeleteProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    dto: DeleteProfileDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ success: boolean }> {
    await this.profileRepository.delete(dto._id);

    return {
      success: true,
    };
  }
}
