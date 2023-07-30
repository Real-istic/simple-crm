import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate = new Date();
  firestore: Firestore = inject(Firestore)
  loading: boolean = false;
  dialogRef: MatDialogRef<DialogAddUserComponent> = inject(MatDialogRef);
  allUsers: any = [
    {
      "firstName": "Grom",
      "lastName": "Hellscream",
      "email": "Grom@Hellscream.com",
      "birthDate": 1666778400000,
      "street": "Warchief Avenue 5",
      "zipCode": 67890,
      "city": "Orgrimmar",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 50.0,
          "description": "Bronze Package",
          "id": "t1"
        },
        {
          "date": 1666800000000,
          "amount": 100.0,
          "description": "Silver Package",
          "id": "t2"
        }
      ]
    },
    {
      "firstName": "Velen",
      "lastName": "Shadowbreaker",
      "email": "Velen@Shadowbreaker.com",
      "birthDate": 1692348000000,
      "street": "Temple of Light 8",
      "zipCode": 34567,
      "city": "Exodar",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 200.0,
          "description": "Gold Package",
          "id": "t3"
        }
      ]
    },
    {
      "firstName": "Thrall",
      "lastName": "Windfury",
      "email": "Thrall@Windfury.com",
      "birthDate": 1666735200000,
      "street": "Shaman Avenue 2",
      "zipCode": 56789,
      "city": "Orgrimmar",
      "transactions": [
        {
          "date": 1666735200000,
          "amount": 75.0,
          "description": "Platinum Package",
          "id": "t4"
        },
        {
          "date": 1666756800000,
          "amount": 30.0,
          "description": "Diamond Package",
          "id": "t5"
        }
      ]
    },
    {
      "firstName": "Jaina",
      "lastName": "Proudmoore",
      "email": "Jaina@Proudmoore.com",
      "birthDate": 1677885600000,
      "street": "Mage Tower 3",
      "zipCode": 54321,
      "city": "Theramore",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 150.0,
          "description": "Gold Package",
          "id": "t6"
        }
      ]
    },
    {
      "firstName": "Uther",
      "lastName": "Lightbringer",
      "email": "Uther@Lightbringer.com",
      "birthDate": 1688594400000,
      "street": "Tavernstreet 1",
      "zipCode": 11111,
      "city": "Stormwind",
      "transactions": [
        {
          "date": 1688594400000,
          "amount": 120.0,
          "description": "Silver Package",
          "id": "t7"
        },
        {
          "date": 1688605200000,
          "amount": 80.0,
          "description": "Bronze Package",
          "id": "t8"
        }
      ]
    },
    {
      "firstName": "Arthas",
      "lastName": "Menethil",
      "email": "Arthas@Menethil.com",
      "birthDate": 1689112800000,
      "street": "Icecrown Citadel 1",
      "zipCode": 12345,
      "city": "Icecrown",
      "transactions": [
        {
          "date": 1689112800000,
          "amount": 250.0,
          "description": "Platinum Package",
          "id": "t9"
        }
      ]
    },
    {
      "firstName": "Cairne",
      "lastName": "Bloodhoof",
      "email": "Cairne@Bloodhoof.com",
      "birthDate": 1677885600000,
      "street": "Elder Rise 4",
      "zipCode": 43210,
      "city": "Thunder Bluff",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 80.0,
          "description": "Silver Package",
          "id": "t10"
        }
      ]
    },
    {
      "firstName": "Tyrande",
      "lastName": "Whisperwind",
      "email": "Tyrande@Whisperwind.com",
      "birthDate": 1692348000000,
      "street": "Moon Temple 7",
      "zipCode": 23456,
      "city": "Darnassus",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 90.0,
          "description": "Gold Package",
          "id": "t11"
        },
        {
          "date": 1692358800000,
          "amount": 50.0,
          "description": "Silver Package",
          "id": "t12"
        }
      ]
    },
    {
      "firstName": "Mal'ganis",
      "lastName": "Dreadlord",
      "email": "Mal'ganis@Dreadlord.com",
      "birthDate": 1666778400000,
      "street": "Necropolis 6",
      "zipCode": 67890,
      "city": "Stratholme",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 120.0,
          "description": "Bronze Package",
          "id": "t13"
        },
        {
          "date": 1666790000000,
          "amount": 220.0,
          "description": "Platinum Package",
          "id": "t14"
        }
      ]
    },
    {
      "firstName": "Sylvanas",
      "lastName": "Windrunner",
      "email": "Sylvanas@Windrunner.com",
      "birthDate": 1689112800000,
      "street": "Woodstreet 2",
      "zipCode": 34456,
      "city": "Darnassus",
      "transactions": [
        {
          "date": 1689112800000,
          "amount": 80.0,
          "description": "Gold Package",
          "id": "t15"
        },
        {
          "date": 1689123600000,
          "amount": 30.0,
          "description": "Silver Package",
          "id": "t16"
        }
      ]
    },
    {
      "firstName": "Tandred",
      "lastName": "Proudmoore",
      "email": "Tandred@Proudmoore.com",
      "birthDate": 1692348000000,
      "street": "Harbor Lane 9",
      "zipCode": 23456,
      "city": "Kul Tiras",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 70.0,
          "description": "Bronze Package",
          "id": "t17"
        }
      ]
    },
    {
      "firstName": "Malfurion",
      "lastName": "Stormrage",
      "email": "Malfurion@Stormrage.com",
      "birthDate": 1677885600000,
      "street": "Moonglade 10",
      "zipCode": 54321,
      "city": "Darnassus",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 120.0,
          "description": "Gold Package",
          "id": "t18"
        },
        {
          "date": 1677896400000,
          "amount": 90.0,
          "description": "Silver Package",
          "id": "t19"
        }
      ]
    },
    {
      "firstName": "Baine",
      "lastName": "Bloodhoof",
      "email": "Baine@Bloodhoof.com",
      "birthDate": 1677885600000,
      "street": "Spirit Rise 7",
      "zipCode": 43210,
      "city": "Thunder Bluff",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 100.0,
          "description": "Platinum Package",
          "id": "t20"
        }
      ]
    }
  ]
  ;


  constructor() { }

  // async ngOnInit() {
  //   this.user.birthDate = this.birthDate.getTime();
  //   const userCollection = collection(this.firestore, 'users');

  //   for (const userData of this.allUsers) {
  //     const transactions = userData.transactions.map((transaction: any) => ({
  //       date: transaction.date,
  //       amount: transaction.amount,
  //       description: transaction.description,
  //       id: transaction.id,
  //     }));

  //     const userWithoutTransactions = { ...userData };
  //     delete userWithoutTransactions.transactions;

  //     const userWithTransactions = {
  //       ...userWithoutTransactions,
  //       transactions: transactions,
  //     };

  //     await setDoc(doc(userCollection), userWithTransactions);
  //   }
  // }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let userCollection = collection(this.firestore, 'users')
    await setDoc(doc(userCollection), this.user.toJson());
    console.log('Result:', this.user);
    this.loading = false;
    this.dialogRef.close();
  }
}
