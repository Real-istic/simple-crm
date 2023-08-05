import { Component, inject } from '@angular/core';
import { Transaction } from 'src/models/transaction.class';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-transaction',
  templateUrl: './dialog-add-transaction.component.html',
  styleUrls: ['./dialog-add-transaction.component.scss']
})
export class DialogAddTransactionComponent {
  transaction: Transaction = new Transaction();
  date = new Date();
  firestore: Firestore = inject(Firestore)
  loading: boolean = false;
  dialogRef: MatDialogRef<DialogAddTransactionComponent> = inject(MatDialogRef);
  allUsers: any = [];
  transactionId: string = '';
  user: User = new User();
  userId: string = '';
  transactionVariant: any = '';
  transactionVariants: any[] = [{
    "name": "Bronze Package",
    "price": 15
  }, {
    "name": "Silver Package",
    "price": 30
  }, {
    "name": "Gold Package",
    "price": 45
  }, {
    "name": "Platinum Package",
    "price": 60
  }];

  constructor() { }


  async saveTransaction() {
    this.loading = true;
    this.transaction.firstName = this.user.firstName;
    this.transaction.lastName = this.user.lastName;
    this.transaction.email = this.user.email;
    this.transaction.id = this.user.id;
    let transactionCollection = collection(this.firestore, 'transactions')
    await setDoc(doc(transactionCollection), this.transaction.toJson());
    console.log('Result:', this.transaction.id);
    this.loading = false;
    this.dialogRef.close();
  }

  formatPrice(price: number): string {
    return '€ ' + price;
  }

}

