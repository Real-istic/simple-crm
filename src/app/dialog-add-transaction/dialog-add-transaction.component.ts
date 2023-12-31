import { Component, inject } from '@angular/core';
import { Transaction } from 'src/models/transaction.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
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
  minDate: Date;
  maxDate: Date;

  // sets the minDate and maxDate for the datepicker.
  constructor() {
    this.minDate = new Date(2023, 3, 1);
    this.maxDate = new Date();
  }

  // saves the transaction to the database.
  async saveTransaction() {
    this.loading = true;
    this.transaction.userId = this.user.id;
    this.transaction.description = this.transactionVariant.name;
    this.transaction.price = this.transactionVariant.price;
    this.transaction.date = Math.floor(new Date(this.transaction.date).getTime());
    const transactionCollection = collection(this.firestore, 'transactions')
    const transactionRef = doc(transactionCollection);
    this.transaction.id = transactionRef.id;
    await setDoc(transactionRef, this.transaction.toJson());
    this.loading = false;
    this.dialogRef.close();
  }

  // formats the price to a string with a € sign.
  formatPrice(price: number): string {
    return '€ ' + price;
  }

  // checks if the form is valid.
  isFormValid() {
    return (
      this.transaction.date as number &&
      this.transactionVariant as string
    );
  }

}

