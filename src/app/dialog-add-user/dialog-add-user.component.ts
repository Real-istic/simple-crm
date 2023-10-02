import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  user: User = new User();
  birthDate = new Date();
  firestore: Firestore = inject(Firestore)
  loading: boolean = false;
  dialogRef: MatDialogRef<DialogAddUserComponent> = inject(MatDialogRef);
  allUsers: any = [];

  constructor() { }

  async ngOnInit() { }

  // checks if all fields are filled out.
  isFormValid() {
    return (
      this.user.firstName as string &&
      this.user.lastName as string &&
      this.user.email as string &&
      this.user.birthDate as number &&
      this.user.street as string &&
      this.user.zipCode as number &&
      this.user.city as string
    );
  }

  // saves the user to the database.
  async saveUser() {
    this.loading = true;
    this.user.birthDate = Math.floor(new Date(this.user.birthDate).getTime());
    this.user.registrationDate = Math.floor(new Date().getTime());
    let userCollection = collection(this.firestore, 'users')
    const userDocRef = doc(userCollection)
    this.user.id = userDocRef.id;
    await setDoc(userDocRef, this.user.toJson());
    console.log('Result (user):', this.user);
    this.loading = false;
    this.dialogRef.close();
  }
}
