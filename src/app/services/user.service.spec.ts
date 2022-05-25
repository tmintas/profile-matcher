import { TestBed, async, } from '@angular/core/testing';
import { User } from '../models/user.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let allUsers: User[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ ],
      providers: [
        { provide: UserService, useClass: UserService },
      ]
    }).compileComponents();

    service = TestBed.inject(UserService);
    allUsers = service.getAll();
  }));

  it('should increase the liked and liked by arrays correspondingly after like', () => {
    // arrange
    const user1 = allUsers[0];
    const user2 = allUsers.find(u => u.gender !== user1.gender);

    if (!user2) return;

    // act - user1 likes user2
    service.like(user2.id, user1.id);

    // assert
    expect(user1.likedIds).toEqual([user2.id]);
    expect(user2.likedByIds).toEqual([user1.id]);
  });

  it('should return isMatch = true when two users liked each other', () => {
    // arrange
    const user1 = allUsers[0];
    const user2 = allUsers.find(u => u.gender !== user1.gender);

    if (!user2) return;

    // act - user1 likes user2 and the other way around
    service.like(user2.id, user1.id);
    service.like(user1.id, user2.id);

    // assert
    expect(service.isMatch(user1.id, user2.id)).toBeTrue();
  });
});
