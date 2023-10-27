import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 'e32ca048-c7eb-40e1-851b-3b25f9f4169e',
      nama: 'joko',
      username: 'jokoSuper',
      password: 'jokoSuper',
      role: ['notaris', 'mpd', 'mpw', 'mpp'],
    },
    {
      id: 'e32ca048-c7eb-40e1-851b-3b25f9f4169e',
      nama: 'joko',
      username: 'jokoNotaris',
      password: 'jokoNotaris',
      role: ['notaris'],
    },
    {
      id: 'e32ca048-c7eb-40e1-851b-3b25f9f4169e',
      nama: 'joko',
      username: 'jokoPublik',
      password: 'jokoPublik',
      role: ['userPublik'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
