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
      "birthDate": 511036000000,
      "street": "Sen'jin Village 3",
      "zipCode": 56789,
      "city": "Durotar",
      "registrationDate": 1683458400
    },
    {
      "firstName": "Velen",
      "lastName": "Shadowbreaker",
      "email": "Velen@Shadowbreaker.com",
      "birthDate": 773452800000,
      "street": "Temple of Light 8",
      "zipCode": 34567,
      "city": "Exodar",
      "registrationDate": 1684298400
    },
    {
      "firstName": "Cairne",
      "lastName": "Bloodhoof",
      "email": "Cairne@Bloodhoof.com",
      "birthDate": 278691200000,
      "street": "Elder Rise 4",
      "zipCode": 43210,
      "city": "Thunder Bluff",
      "registrationDate": 1685234400
    },
    {
      "firstName": "Saurfang",
      "lastName": "Warsong",
      "email": "Saurfang@Warsong.com",
      "birthDate": 1137792000000,
      "street": "Warsong Hold 8",
      "zipCode": 65432,
      "city": "Nagrand",
      "registrationDate": 1686760800
    },
    {
      "firstName": "Grom",
      "lastName": "Hellscream",
      "email": "Grom@Hellscream.com",
      "birthDate": 1570147200000,
      "street": "Warchief Avenue 5",
      "zipCode": 67890,
      "city": "Orgrimmar",
      "registrationDate": 1692746400
    },
    {
      "firstName": "Tinkmaster",
      "lastName": "Overspark",
      "email": "Tinkmaster@Overspark.com",
      "birthDate": 773452800000,
      "street": "Tinker Town 5",
      "zipCode": 23456,
      "city": "Ironforge",
      "registrationDate": 1691912000
    },
    {
      "firstName": "Tyrande",
      "lastName": "Whisperwind",
      "email": "Tyrande@Whisperwind.com",
      "birthDate": 1220188800000,
      "street": "Moon Temple 7",
      "zipCode": 23456,
      "city": "Darnassus",
      "registrationDate": 1694200800
    },
    {
      "firstName": "Thrall",
      "lastName": "Windfury",
      "email": "Thrall@Windfury.com",
      "birthDate": 1126070400000,
      "street": "Shaman Avenue 2",
      "zipCode": 56789,
      "city": "Orgrimmar",
      "registrationDate": 1686060000
    },
    {
      "firstName": "Mal'ganis",
      "lastName": "Dreadlord",
      "email": "Mal'ganis@Dreadlord.com",
      "birthDate": 1569897600000,
      "street": "Necropolis 6",
      "zipCode": 67890,
      "city": "Stratholme",
      "registrationDate": 1695212000
    },
    {
      "firstName": "Talanji",
      "lastName": "Zandalari",
      "email": "Talanji@Zandalari.com",
      "birthDate": 1220188800000,
      "street": "Dazar'alor 2",
      "zipCode": 23456,
      "city": "Zuldazar",
      "registrationDate": 1683602400
    },
    {
      "firstName": "Malfurion",
      "lastName": "Stormrage",
      "email": "Malfurion@Stormrage.com",
      "birthDate": 278691200000,
      "street": "Moonglade 10",
      "zipCode": 54321,
      "city": "Darnassus",
      "registrationDate": 1694815200
    },
    {
      "firstName": "Mayla",
      "lastName": "Highmountain",
      "email": "Mayla@Highmountain.com",
      "birthDate": 1220188800000,
      "street": "Highmountain Peak 5",
      "zipCode": 23456,
      "city": "Thunder Totem",
      "registrationDate": 1684754400
    },
    {
      "firstName": "Gazlowe",
      "lastName": "Gearslipper",
      "email": "Gazlowe@Gearslipper.com",
      "birthDate": 1126070400000,
      "street": "Ratchet 6",
      "zipCode": 34567,
      "city": "The Barrens",
      "registrationDate": 1694522400
    },
    {
      "firstName": "Varian",
      "lastName": "Wrynn",
      "email": "Varian@Wrynn.com",
      "birthDate": 1569897600000,
      "street": "Stormwind Keep 5",
      "zipCode": 11111,
      "city": "Stormwind",
      "registrationDate": 1685863200
    },
    {
      "firstName": "Rokhan",
      "lastName": "Darkspear",
      "email": "Rokhan@Darkspear.com",
      "birthDate": 1220188800000,
      "street": "Sen'jin Village 8",
      "zipCode": 23456,
      "city": "Durotar",
      "registrationDate": 1693845600
    }
  ];






  constructor() { }


  async ngOnInit() {
    // const userCollection = collection(this.firestore, 'users');
    // for (const userData of this.allUsers) {
    //   const userDocRef = doc(userCollection);
    //   userData.id = userDocRef.id;
    //   await setDoc(userDocRef, userData);
    // }
    // this.loading = false;
    // this.dialogRef.close();
  }

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

  async saveUser() {
    this.loading = true;
    this.user.birthDate = Math.floor(new Date(this.user.birthDate).getTime() / 1000);
    this.user.registrationDate = Math.floor(new Date().getTime() / 1000);
    let userCollection = collection(this.firestore, 'users')
    const userDocRef = doc(userCollection)
    this.user.id = userDocRef.id;
    await setDoc(userDocRef, this.user.toJson());
    console.log('Result (user):', this.user);
    this.loading = false;
    this.dialogRef.close();
  }
}
