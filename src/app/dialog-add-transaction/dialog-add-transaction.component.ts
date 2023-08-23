import { Component, inject } from '@angular/core';
import { Transaction } from 'src/models/transaction.class';
import { Firestore, addDoc } from '@angular/fire/firestore';
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
    "price": 5
  }, {
    "name": "Silver Package",
    "price": 10
  }, {
    "name": "Gold Package",
    "price": 15
  }, {
    "name": "Platinum Package",
    "price": 20
  }];

  constructor() { }


  async saveTransaction() {
    this.loading = true;
    this.transaction.userId = this.user.id;
    this.transaction.description = this.transactionVariant.name;
    this.transaction.price = this.transactionVariant.price;
    this.transaction.date = Math.floor(new Date(this.transaction.date).getTime() / 1000);
    const transactionCollection = collection(this.firestore, 'transactions')
    const transactionRef = doc(transactionCollection);
    this.transaction.id = transactionRef.id;
    await setDoc(transactionRef, this.transaction.toJson());
    console.log('Result (transaction):', this.transaction);
    this.loading = false;
    this.dialogRef.close();
  }

  formatPrice(price: number): string {
    return '€ ' + price;
  }
}

