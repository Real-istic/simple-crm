import { Component, inject } from '@angular/core';
import { Transaction } from 'src/models/transaction.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { transactionVariant } from 'src/models/transaction-variants.class';


@Component({
  selector: 'app-dialog-add-transaction',
  templateUrl: './dialog-add-transaction.component.html',
  styleUrls: ['./dialog-add-transaction.component.scss']
})
export class DialogAddTransactionComponent {
  transaction: Transaction = new Transaction();
  private firestore: Firestore = inject(Firestore)
  protected loading: boolean = false;
  protected dialogRef: MatDialogRef<DialogAddTransactionComponent> = inject(MatDialogRef);
  protected allUsers: User[] = [];
  transactionId?: string;
  user: User = new User();
  userId?: string;
  transactionVariant: transactionVariant = {
    name: '',
    price: 0,
  }
  transactionVariants: transactionVariant[] = [{
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
  protected minDate: Date = new Date(2024, 3, 1);
  protected maxDate: Date = new Date();

  /**
   * saves the transaction to the database.
   */
  protected async saveTransaction(): Promise<void> {
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

  /**
   * formats the price to a string with a € sign.
   *
   * @returns price with a currency sign
   */
  protected formatPrice(price: number): string {
    return '€ ' + price;
  }

  /**
   * checks if the form is valid.
   *
   * @returns the Transaction
   */
  protected isFormValid(): boolean {
    return !!(this.transaction.date && this.transactionVariant.name !== '' && this.transactionVariant.price !== 0);
  }

}

