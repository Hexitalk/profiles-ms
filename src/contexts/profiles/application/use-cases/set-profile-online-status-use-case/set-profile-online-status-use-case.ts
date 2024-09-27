import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';

import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import {
  NatsPayloadConfigInterface,
  NatsPayloadInterface,
} from 'src/contexts/shared/nats/interfaces';
import { ProfileRepository } from 'src/contexts/profiles/domain/ports/profile.repository';
import { ProfileModel } from 'src/contexts/profiles/domain/models/profile.model';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { Inject } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class SetProfileOnlineStatusUseCase {
  constructor(
    private readonly profileRepository: ProfileRepository,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  async run(
    userId: string,
    onlineStatus: boolean,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    const profileResult: ProfileModel =
      await this.profileRepository.findByUserId(userId);

    if (!profileResult) {
      throw new ExceptionsHandler();
    }

    const profileModelUpdate = ProfileModel.create({
      ...profileResult.toInterface(),
      online_status: onlineStatus,
    });

    try {
      await this.profileRepository.update(profileModelUpdate);

      const payloadSocketEmit: NatsPayloadInterface<{
        userId: string;
      }> = {
        ...config,
        data: { userId },
      };

      await firstValueFrom(
        this.client.send(
          { cmd: 'socket.hub-propagate-emit' },
          payloadSocketEmit,
        ),
        { defaultValue: void 0 },
      );
    } catch (error) {
      throw new ExceptionsHandler();
    }
  }
}
