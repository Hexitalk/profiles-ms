import { RpcException } from '@nestjs/microservices';

export class ProfileNotFoundRpcException extends RpcException {
  constructor() {
    super({ status: 404, message: 'profile.error.profile-not-found' }); // i18n key
  }
}
