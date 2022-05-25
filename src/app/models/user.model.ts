export class User {
  get imageUrl() {
    return this.gender === Gender.FEMALE ? 'assets/woman.svg' : 'assets/man.svg';
  }

  constructor(
    public id: number,
    public name: string,
    public age: number,
    public gender: Gender,
    public likedByIds: number[] = [],
    public likedIds: number[] = [],
  ) { }
}

export enum Gender {
  MALE,
  FEMALE,
}
