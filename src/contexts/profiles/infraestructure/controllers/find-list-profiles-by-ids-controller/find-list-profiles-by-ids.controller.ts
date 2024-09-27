import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FindListProfilesByIdsUseCase } from 'src/contexts/profiles/application/use-cases';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';

@Controller('profiles')
export class FindListProfilesByIdsController {
  constructor(
    private readonly findListProfilesByIdsUseCase: FindListProfilesByIdsUseCase,
  ) {}

  @MessagePattern({ cmd: 'profiles.find-list-profiles-by-ids' })
  run(@Payload() payload: NatsPayloadInterface<{ profilesIds: string[] }>) {
    const { data: dto, ...config } = payload;

    return this.findListProfilesByIdsUseCase.run(
      { profilesIds: dto.profilesIds },
      config,
    );
  }
}
