import { RpcException } from '@nestjs/microservices';

export class FailCreateProfileRpcException extends RpcException {
  constructor() {
    super({ status: 404, message: 'profile.error.fail-create-profile' }); // i18n key
  }
}
