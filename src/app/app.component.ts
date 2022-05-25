import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  isMatch = false;
  loggedInUser: User ;
  allUsers: User[] = [];

  // all users to be shown
  usersToShow: User[] = [];

  // number of users already shown
  viewedUsersCount = 0;

  // the user shown for like or reject action
  get viewedUser(): User {
    return this.usersToShow[this.viewedUsersCount];
  }

  ngOnInit(): void {
    this.allUsers = this.userService.getAll();
  }

  onUserSelect(userId: number): void {
    const foundUser = this.allUsers.find(u => u.id === userId);

    if (!foundUser)
      return;

    this.loggedInUser = foundUser;

    this.viewedUsersCount = 0;

    this.usersToShow = this.allUsers
      .filter(u => u.id !== this.loggedInUser.id) // user does not see him/herselft
      .filter(u => u.gender !== this.loggedInUser.gender) // user sees opposite genders only
      .filter(u => !u.likedByIds.some(id => id === userId)) // user does not see people he/she has already liked
      .sort(() => Math.random() - 0.5) // shuffle users randomly
  }

  onLikeClick(targetUserId: number): void {
    this.userService.like(targetUserId, this.loggedInUser.id);
    this.isMatch = this.userService.isMatch(targetUserId, this.loggedInUser.id);

    if (this.isMatch) {
      return;
    }

    this.viewedUsersCount++;
  }

  onDislikeClick(): void {
    this.viewedUsersCount++;
  }

  onOkayCick(): void {
    this.isMatch = false;
    this.viewedUsersCount++;
  }
}
