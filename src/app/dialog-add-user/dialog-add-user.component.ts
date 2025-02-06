import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  protected user: User = new User();
  protected birthDate = new Date();
  private firestore: Firestore = inject(Firestore);
  protected loading: boolean = false;
  protected dialogRef: MatDialogRef<DialogAddUserComponent> =
    inject(MatDialogRef);

  /**
   * simple validation
   *
   * @returns true or false
   */
  protected isFormValid(): boolean {
    return !!(
      this.user.firstName &&
      this.user.lastName &&
      this.user.email &&
      this.user.birthDate &&
      this.user.street &&
      this.user.zipCode &&
      this.user.city
    );
  }

  /**
   * saves the user to the database.
   */
  protected async saveUser() {
    this.loading = true;
    this.user.birthDate = Math.floor(new Date(this.user.birthDate).getTime());
    this.user.registrationDate = Math.floor(new Date().getTime());
    const userCollection = collection(this.firestore, 'users');
    const userDocRef = doc(userCollection);
    this.user.id = userDocRef.id;
    await setDoc(userDocRef, this.user.toJson());
    this.loading = false;
    this.dialogRef.close();
  }
}
