import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, getDocs, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {

  firestore: Firestore = inject(Firestore);
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);
  user = new User();
  userID: string | any = '';
  user$: Observable<any> | any;
  allUsers = [] as any;

  constructor() { }

  async ngOnInit() {
    const userCollection = collection(this.firestore, 'users');
    const userDataBase = await getDocs(userCollection);

    onSnapshot(userCollection, (snapshot) => {
      this.allUsers = [];
      snapshot.docs.forEach((doc) => {
        this.allUsers.push({ ...doc.data(), id: doc.id });
      });
      console.log('AllUser:', this.allUsers);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
