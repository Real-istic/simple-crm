import { Component, inject } from '@angular/core';
import { Transaction } from 'src/models/transaction.class';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { MatRadioModule } from '@angular/material/radio';


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
    let userCollection = collection(this.firestore, 'users')
    await setDoc(doc(userCollection), this.transaction.toJson());
    console.log('Result:', this.transaction);
    this.loading = false;
    this.dialogRef.close();
  }

  formatPrice(price: number): string {
    return '€ ' + price;
  }

}

