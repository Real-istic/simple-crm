import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, doc, updateDoc, setDoc } from "firebase/firestore";


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: any = Date;
  firestore: Firestore = inject(Firestore)
  // users$: Observable<any[]>;


  constructor() {
    const userCollection = collection(this.firestore, 'users')
    // this.users$ = doc(userCollection)

   }

  async saveUser() {
    if (this.user.birthDate){
      this.user.birthDate = this.birthDate.getTime();
    }

    let userCollection = collection(this.firestore, 'users')

    await setDoc(doc(userCollection, 'users'), this.user.toJson());


    console.log('Current User is: ', collection(this.firestore, 'users'));

  }

}
