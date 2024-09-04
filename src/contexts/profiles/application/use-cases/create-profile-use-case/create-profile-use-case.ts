import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

import {
  ProfileModel,
  ProfileModelInterface,
} from 'src/contexts/profiles/domain/models/profile.model';
import { ProfileRepository } from 'src/contexts/profiles/domain/ports/profile.repository';
import { FailSaveDatabaseException } from 'src/contexts/profiles/domain/exceptions/database/fail-save-database-exception';
import { FailCreateProfileRpcException } from '../../exceptions/fail-create-profile-rpc-exception';
import { RpcException } from '@nestjs/microservices';
import { CreateProfileDto } from './create-profile.dto';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';

@Injectable()
export class CreateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    dto: CreateProfileDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<{ profile: ProfileModelInterface }> {
    const profileModel = ProfileModel.create({
      ...dto,
      user_id: config.authUserId,
    });
    let responseProfile: ProfileModelInterface;

    try {
      const resQuery = await this.profileRepository.insert(profileModel);
      responseProfile = resQuery.toInterface();
    } catch (error) {
      if (error instanceof FailSaveDatabaseException) {
        throw new FailCreateProfileRpcException();
      }
      throw new RpcException('error');
    }

    return {
      profile: responseProfile,
    };
  }
}
