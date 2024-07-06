import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user: User = new User();
  protected loading: boolean = false;
  protected dialogRef: MatDialogRef<DialogEditUserComponent> = inject(MatDialogRef);
  private firestore = inject(Firestore);
  protected birthDate: Date = new Date();
  userId = '';

  /**
   * sets the birthDate to the user's birthDate.
   */
  ngOnInit(): void {
    this.birthDate = new Date(this.user.birthDate);
  }

  /**
   * updates the user data in the database.
   */
  protected async saveUser(): Promise<void> {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let userCollection = collection(this.firestore, 'users')
    let userData = doc(userCollection, this.userId);
    await updateDoc(userData, this.user.toJson());
    this.loading = false;
    this.dialogRef.close();
  }
}
