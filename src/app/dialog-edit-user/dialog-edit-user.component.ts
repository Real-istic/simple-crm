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

  ngOnInit() {
    if (this.user.birthDate) {
      this.birthDate = new Date(this.user.birthDate);
    }
  }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let userCollection = collection(this.firestore, 'users')
    let userData = doc(userCollection, this.userId);
    await updateDoc(userData, this.user.toJson());
    console.log('Result:', this.user);
    this.loading = false;
    this.dialogRef.close();
  }
}
