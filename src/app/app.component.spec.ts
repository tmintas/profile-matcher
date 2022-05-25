import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Gender, User } from './models/user.model';
import { UserService } from './services/user.service';
import { UserListComponent } from './user-list/user-list.component';

describe('AppComponent', () => {
  const spy = jasmine.createSpyObj<UserService>('UserService', ['getAll', 'like', 'isMatch']);

  const allUsers = [
    new User(1, 'testUser1', 30, Gender.MALE),
    new User(2, 'testUser2', 19, Gender.FEMALE),
    new User(3, 'testUser3', 25, Gender.MALE),
    new User(4, 'testUser4', 22, Gender.FEMALE),
  ];

  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSelectModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [
        AppComponent,
        UserListComponent,
      ],
      providers: [
        { provide: UserService, useValue: spy },
      ]
    }).compileComponents();

    spy.getAll.and.returnValue(allUsers);
    spy.isMatch.and.returnValue(false);

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    appComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should hide user profiles if the user is not logged in', () => {
    // arrange, act
    const app = fixture.debugElement.nativeElement;
    const userProfile = app.querySelector('.user-profile');

    // assert
    expect(userProfile).toBe(null);
  });

  it('should show user profiles if the user is logged in', () => {
    // arrange
    const loggedInUser = allUsers[0];

    // act
    appComponent.onUserSelect(loggedInUser.id);

    // assert
    fixture.detectChanges();
    const userProfile = fixture.debugElement.nativeElement.querySelector('.user-profile');
    expect(userProfile).toBeTruthy();
  });

  it('should show only profiles of the opposite gender', () => {
    // arrange
    const loggedInUser = allUsers[0];

    // act
    appComponent.onUserSelect(loggedInUser.id);

    // assert
    fixture.detectChanges();
    expect(appComponent.usersToShow.map(u => u.gender).every(g => g !== loggedInUser.gender)).toBe(true);
  });

  it('should show only profiles of the opposite gender', () => {
    // arrange
    const loggedInUser = allUsers[0];

    // act
    appComponent.onUserSelect(loggedInUser.id);

    // assert
    fixture.detectChanges();
    expect(appComponent.usersToShow.map(u => u.gender).every(g => g !== loggedInUser.gender)).toBe(true);
  });

  it('should not show the logged in user\'s profile', () => {
    // arrange
    const svc=  TestBed.inject(UserService);
    spy.getAll.and.returnValue([]);

    const loggedInUser = allUsers[0];

    // act
    appComponent.onUserSelect(loggedInUser.id);

    // assert
    fixture.detectChanges();
    expect(!!appComponent.usersToShow.find(u => u.id === loggedInUser.id)).toBe(false);
  });

  it('should show the profile of the next user after clicking the like button', () => {
    // arrange
    const loggedInUser = allUsers[0];
    appComponent.onUserSelect(loggedInUser.id);
    fixture.detectChanges();

    // act
    appComponent.onLikeClick(appComponent.usersToShow[0].id);

    // assert
    fixture.detectChanges();
    expect(appComponent.viewedUser.id).toBe(appComponent.usersToShow[1].id);
  });

  it('should show the profile of the next user after clicking the dislike button', () => {
    // arrange
    const loggedInUser = allUsers[0];
    appComponent.onUserSelect(loggedInUser.id);
    fixture.detectChanges();

    // act
    appComponent.onDislikeClick();

    // assert
    fixture.detectChanges();
    expect(appComponent.viewedUser.id).toBe(appComponent.usersToShow[1].id);
  });

  it('should disable the like button if there is a match', () => {
    // arrange
    const loggedInUser = allUsers[0];
    appComponent.onUserSelect(loggedInUser.id);
    fixture.detectChanges();

    spy.isMatch.and.returnValue(true);

    // act
    appComponent.onLikeClick(appComponent.usersToShow[0].id);

    // assert
    fixture.detectChanges();
    const likeButton = fixture.debugElement.query(By.css('button'));
    expect(likeButton.nativeElement.disabled).toBe(true);
  });

  it('should enable the like button if okay button is clicked after match', () => {
    // arrange
    const loggedInUser = allUsers[0];
    appComponent.onUserSelect(loggedInUser.id);
    fixture.detectChanges();

    spy.isMatch.and.returnValue(true);

    // act
    appComponent.onOkayCick();

    // assert
    fixture.detectChanges();
    const likeButton = fixture.debugElement.query(By.css('button'));
    expect(likeButton.nativeElement.disabled).toBe(false);
  });

  it('should show the \'no users left\' if all users were shown', () => {
    // arrange
    const loggedInUser = allUsers[0];
    appComponent.onUserSelect(loggedInUser.id);
    fixture.detectChanges();

    spy.isMatch.and.returnValue(false);

    // act
    appComponent.usersToShow.forEach(u => {
      appComponent.onLikeClick(u.id);
    });

    // assert
    fixture.detectChanges();
    const noUsersContainer = fixture.debugElement.query(By.css('.no-users'));
    expect(noUsersContainer).toBeTruthy();
  });
});
