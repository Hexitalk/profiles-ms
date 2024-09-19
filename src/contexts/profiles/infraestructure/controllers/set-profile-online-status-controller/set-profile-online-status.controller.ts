import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcAuthGuard } from 'src/contexts/shared/guards/rpc-auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { SetProfileOnlineStatusControllerDto } from './set-profile-online-status-controller.dto';
import { SetProfileOnlineStatusUseCase } from 'src/contexts/profiles/application/use-cases';

@Controller('profiles')
export class SetProfileOnlineStatusController {
  constructor(
    private readonly setProfileOnlineStatusUseCase: SetProfileOnlineStatusUseCase,
  ) {}

  // @UseGuards(RpcAuthGuard)
  @MessagePattern({ cmd: 'profiles.set-online-status' })
  run(
    @Payload()
    payload: NatsPayloadInterface<SetProfileOnlineStatusControllerDto>,
  ) {
    const { data: updateProfileStatusDto, ...config } = payload;
    return this.setProfileOnlineStatusUseCase.run(
      updateProfileStatusDto.user_id,
      updateProfileStatusDto.online_status,
      config,
    );
  }
}
