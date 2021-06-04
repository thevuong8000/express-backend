import { Message } from '@schemas/message';

export class UpdateSuccessMessage extends Message {
  constructor(message?: string) {
    super(message ?? 'Successfully modified!');
  }
}

export class DeleteSuccessMessage extends Message {
  constructor(message?: string) {
    super(message ?? 'Successfully deleted!');
  }
}

export class PasswordChangeSuccessMessage extends Message {
  constructor(message?: string) {
    super(message ?? 'Password has been updated!');
  }
}
