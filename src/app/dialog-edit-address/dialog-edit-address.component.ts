import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User = new User();
  loading: boolean = false;
  dialogRef: MatDialogRef<DialogEditAddressComponent> = inject(MatDialogRef);
  firestore: Firestore = inject(Firestore)
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

