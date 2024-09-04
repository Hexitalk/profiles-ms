import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FindProfileByUserIdUseCase } from 'src/contexts/profiles/application/use-cases';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';

@Controller('profiles')
export class FindProfileByUserIdController {
  constructor(
    private readonly findProfileByUserIdUseCase: FindProfileByUserIdUseCase,
  ) {}

  @MessagePattern({ cmd: 'profiles.find-profile-by-user-id' })
  run(@Payload() payload: NatsPayloadInterface<string>) {
    const { data: user_id, ...config } = payload;
    return this.findProfileByUserIdUseCase.run(user_id, config);
  }
}
