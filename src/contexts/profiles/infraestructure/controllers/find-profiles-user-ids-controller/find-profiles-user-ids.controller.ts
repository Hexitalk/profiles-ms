import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FindProfilesUserIdsUseCase } from 'src/contexts/profiles/application/use-cases';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';

@Controller('profiles')
export class FindProfilesUserIdsController {
  constructor(
    private readonly findProfilesUserIdsdUseCase: FindProfilesUserIdsUseCase,
  ) {}

  @MessagePattern({ cmd: 'profiles.find-profiles-user-ids' })
  run(@Payload() payload: NatsPayloadInterface<{ profilesIds: string[] }>) {
    const { data: dto, ...config } = payload;

    return this.findProfilesUserIdsdUseCase.run(
      { profilesIds: dto.profilesIds },
      config,
    );
  }
}
