import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: any = Date;
  firestore: Firestore = inject(Firestore)
  loading: boolean = false;
  dialogRef: MatDialogRef<DialogAddUserComponent> = inject(MatDialogRef);
  // users$: Observable<any[]>;


  constructor() {
    // const userCollection = collection(this.firestore, 'users')
    // this.users$ = doc(userCollection)
  }

  async saveUser() {
    this.loading = true;
    if (this.birthDate && this.birthDate instanceof Date) {
      this.user.birthDate = this.birthDate.getTime();
    }

    let userCollection = collection(this.firestore, 'users')
    let setUser = await setDoc(doc(userCollection), this.user.toJson());
    console.log('Result:', this.user);
    this.loading = false;
    this.dialogRef.close();
    // let userInDb = await getDoc(doc(userCollection));

    // if (userInDb) {
    //   console.log('Result:', userInDb.data());
    // } else {
    //   console.log('An error occurred!');
    // }
  }

}
