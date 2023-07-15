import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User = new User();
  loading: boolean = false;
  dialogRef: MatDialogRef<DialogEditUserComponent> = inject(MatDialogRef);
  firestore: any = inject(Firestore);
  birthDate: any = this.user.birthDate;
  userId: string = '';


  async saveUser() {
    this.loading = true;
    let userCollection = collection(this.firestore, 'users')
    await updateDoc(doc(userCollection, this.userId), this.user.toJson());
    console.log('Result:', this.user);
    this.loading = false;
    this.dialogRef.close();
  }
}
