import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input() users: User[];
  @Input() selectedUser: User;

  @Output() userSelected = new EventEmitter<number>();

  onUserSelect(selectEvent: MatSelectionListChange) {
    this.userSelected.emit(selectEvent.option.value);
  }
}
