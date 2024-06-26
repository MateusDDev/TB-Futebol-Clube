import { ServiceResponse } from '../interfaces/ServiceResponse';
import { IUser } from '../interfaces/users/IUser';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  async findRole(email: string): Promise<ServiceResponse<IUser['role']>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    return {
      status: 'SUCCESSFUL',
      data: user.role,
    };
  }
}
