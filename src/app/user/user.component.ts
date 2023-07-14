import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, getDoc, collection, doc, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {

  firestore: Firestore = inject(Firestore)
  dialog: MatDialog = inject(MatDialog)
  route: ActivatedRoute = inject(ActivatedRoute)
  user = new User();
  userID: string | any = '';
  user$: Observable<any> | any;

  constructor() { }

  async ngOnInit() {
    // this.route.params.subscribe(async (params: any) => {
    //   this.userID = params.id;


      const userCollection = collection(this.firestore, 'users');
      console.log('User:', userCollection);

      const userDataBase = await getDocs(userCollection);
      // console.log('UserDatabase:', userDataBase);
      userDataBase.forEach((doc) => {
        console.log(doc.id, doc.data());
      });



      // this.user$ = doc(userCollection, this.userID);
      // this.user$.subscribe((myuser: any) => {
      //   this.user = new User(myuser);
      //   console.log('User:', this.user);
      //   console.log('User changes:', myuser);
      //   console.log('db changes:', userCollection);
      // });
    // });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
