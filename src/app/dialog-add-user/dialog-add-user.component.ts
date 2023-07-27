import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate = new Date();
  firestore: Firestore = inject(Firestore)
  loading: boolean = false;
  dialogRef: MatDialogRef<DialogAddUserComponent> = inject(MatDialogRef);


  constructor() { }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let userCollection = collection(this.firestore, 'users')
    await setDoc(doc(userCollection), this.user.toJson());
    console.log('Result:', this.user);
    this.loading = false;
    this.dialogRef.close();
  }
}
