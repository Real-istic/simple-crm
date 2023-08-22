import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
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
  allUsers: any = [
    {
      "firstName": "Vol'jin",
      "lastName": "DarkSpear",
      "email": "Vol'jin@DarkSpear.com",
      "birthDate": 1688594400000,
      "street": "Sen'jin Village 3",
      "zipCode": 56789,
      "city": "Durotar",
    },
    {
      "firstName": "Velen",
      "lastName": "Shadowbreaker",
      "email": "Velen@Shadowbreaker.com",
      "birthDate": 1692348000000,
      "street": "Temple of Light 8",
      "zipCode": 34567,
      "city": "Exodar",
    },
    {
      "firstName": "Cairne",
      "lastName": "Bloodhoof",
      "email": "Cairne@Bloodhoof.com",
      "birthDate": 1677885600000,
      "street": "Elder Rise 4",
      "zipCode": 43210,
      "city": "Thunder Bluff",
    },
    {
      "firstName": "Saurfang",
      "lastName": "Warsong",
      "email": "Saurfang@Warsong.com",
      "birthDate": 1666735200000,
      "street": "Warsong Hold 8",
      "zipCode": 65432,
      "city": "Nagrand",
    },
    {
      "firstName": "Grom",
      "lastName": "Hellscream",
      "email": "Grom@Hellscream.com",
      "birthDate": 1666778400000,
      "street": "Warchief Avenue 5",
      "zipCode": 67890,
      "city": "Orgrimmar",
    },
    {
      "firstName": "Tinkmaster",
      "lastName": "Overspark",
      "email": "Tinkmaster@Overspark.com",
      "birthDate": 1692348000000,
      "street": "Tinker Town 5",
      "zipCode": 23456,
      "city": "Ironforge",
    },
    {
      "firstName": "Tyrande",
      "lastName": "Whisperwind",
      "email": "Tyrande@Whisperwind.com",
      "birthDate": 1692348000000,
      "street": "Moon Temple 7",
      "zipCode": 23456,
      "city": "Darnassus",
    },
    {
      "firstName": "Thrall",
      "lastName": "Windfury",
      "email": "Thrall@Windfury.com",
      "birthDate": 1666735200000,
      "street": "Shaman Avenue 2",
      "zipCode": 56789,
      "city": "Orgrimmar",
    },
    {
      "firstName": "Mal'ganis",
      "lastName": "Dreadlord",
      "email": "Mal'ganis@Dreadlord.com",
      "birthDate": 1666778400000,
      "street": "Necropolis 6",
      "zipCode": 67890,
      "city": "Stratholme",
    },
    {
      "firstName": "Talanji",
      "lastName": "Zandalari",
      "email": "Talanji@Zandalari.com",
      "birthDate": 1692348000000,
      "street": "Dazar'alor 2",
      "zipCode": 23456,
      "city": "Zuldazar",
    },
    {
      "firstName": "Malfurion",
      "lastName": "Stormrage",
      "email": "Malfurion@Stormrage.com",
      "birthDate": 1677885600000,
      "street": "Moonglade 10",
      "zipCode": 54321,
      "city": "Darnassus",
    },
    {
      "firstName": "Mayla",
      "lastName": "Highmountain",
      "email": "Mayla@Highmountain.com",
      "birthDate": 1692348000000,
      "street": "Highmountain Peak 5",
      "zipCode": 23456,
      "city": "Thunder Totem",
    },
    {
      "firstName": "Gazlowe",
      "lastName": "Gearslipper",
      "email": "Gazlowe@Gearslipper.com",
      "birthDate": 1666735200000,
      "street": "Ratchet 6",
      "zipCode": 34567,
      "city": "The Barrens",
    },
    {
      "firstName": "Varian",
      "lastName": "Wrynn",
      "email": "Varian@Wrynn.com",
      "birthDate": 1666778400000,
      "street": "Stormwind Keep 5",
      "zipCode": 11111,
      "city": "Stormwind",
    },
    {
      "firstName": "Rokhan",
      "lastName": "Darkspear",
      "email": "Rokhan@Darkspear.com",
      "birthDate": 1692348000000,
      "street": "Sen'jin Village 8",
      "zipCode": 23456,
      "city": "Durotar",
    },
  ];





  constructor() { }


  // async ngOnInit() {
  // this.user.birthDate = this.birthDate.getTime();
  // const userCollection = collection(this.firestore, 'users');

  // for (const userData of this.allUsers) {
  //   const transactions = userData.transactions.map((transaction: any) => ({
  //     date: transaction.date,
  //     price: transaction.price,
  //     description: transaction.description,
  //     id: transaction.id,
  //   }));

  //   const userWithoutTransactions = { ...userData };
  //   delete userWithoutTransactions.transactions;

  //   const userWithTransactions = {
  //     ...userWithoutTransactions,
  //     transactions: transactions,
  //   };
  //   this.user.id = doc(userCollection).id;
  //   await setDoc(doc(userCollection), userWithTransactions);
  //   console.log('Result:', userWithTransactions);
  // }
  // }



  async ngOnInit() {
    const userCollection = collection(this.firestore, 'users');
    for (const userData of this.allUsers) {
      const userDocRef = doc(userCollection);
      userData.id = userDocRef.id;
      await setDoc(userDocRef, userData);
    }
    this.loading = false;
    this.dialogRef.close();
  }



  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let userCollection = collection(this.firestore, 'users')
    const userDocRef = doc(userCollection)
    this.user.id = userDocRef.id;
    await setDoc(userDocRef, this.user.toJson());
    this.loading = false;
    this.dialogRef.close();
  }
}
