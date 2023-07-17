import { Component, inject } from '@angular/core';
import { Firestore, collection, getDocs, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})



export class UserDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  dialog: MatDialog = inject(MatDialog);
  userId: string = '';
  user: User = new User();

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      console.log('got id!: ', this.userId);
      this.getUser();
    });
  }

  async getUser() {
    const userCollection = collection(this.firestore, 'users');
    const userDataBase = await getDocs(userCollection);

    onSnapshot(userCollection, (snapshot) => {
      const userDoc = snapshot.docs.find((doc) => doc.id === this.userId);
      if (userDoc) {
        this.user = new User(null);
        this.user = new User({ ...userDoc.data(), id: userDoc.id });
        console.log('this user: ', this.user);
      } else {
        console.log('User not found');
      }
    });
  }

  openEditAddressDialog() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;

  }

  openEditHeaderDialog() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;

  }
}