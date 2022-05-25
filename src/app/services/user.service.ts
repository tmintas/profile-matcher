import { Injectable } from '@angular/core';
import { Gender, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private allUsers: User[] = [
    new User(1, 'Sarah', 21, Gender.FEMALE),
    new User(2, 'Mike', 30, Gender.MALE),
    new User(3, 'Tim', 25, Gender.MALE),
    new User(4, 'John', 44, Gender.MALE),
    new User(5, 'Bella', 19, Gender.FEMALE),
    new User(6, 'Anna', 33, Gender.FEMALE),
    new User(7, 'Michael', 97, Gender.MALE),
  ];

  getAll(): User[] {
    return [...this.allUsers];
  }

  like(targetUserId: number, likedById: number): void {
    if (targetUserId === likedById)
      throw new Error('not possible to like yourself!');

    this.allUsers = this.allUsers.map(u => {
      if (u.id !== targetUserId && u.id !== likedById) {
        return u;
      }

      if (u.id === targetUserId) {
        u.likedByIds.push(likedById);
      } else {
        u.likedIds.push(targetUserId);
      }

      return u;
    });
  }

  isMatch(user1Id: number, user2Id: number): boolean {
    const user1 = this.getAll().find(u => u.id === user1Id);

    if (!user1) return false;

    return !!user1.likedIds.find(id => id === user2Id) && !!user1.likedIds.find(id => id === user2Id);
  }
}
