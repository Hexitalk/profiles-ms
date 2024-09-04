import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProfileUseCase } from '../../../application/use-cases/create-profile-use-case/create-profile-use-case';
import { CreateProfileControllerDto } from './create-profile-controller.dto';
import { RpcAuthGuard } from 'src/contexts/shared/guards/rpc-auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';

@Controller('profiles')
export class CreateProfileController {
  constructor(private readonly createProfileUseCase: CreateProfileUseCase) {}

  @UseGuards(RpcAuthGuard)
  @MessagePattern({ cmd: 'profiles.create-profile' })
  run(@Payload() payload: NatsPayloadInterface<CreateProfileControllerDto>) {
    const { data: createProfileDto, ...config } = payload;
    return this.createProfileUseCase.run(createProfileDto, config);
  }
}
