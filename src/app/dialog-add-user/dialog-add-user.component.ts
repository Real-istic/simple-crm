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
      "firstName": "Anduin",
      "lastName": "Wrynn",
      "email": "Anduin@Wrynn.com",
      "birthDate": 1677885600000,
      "street": "Stormwind Keep 1",
      "zipCode": 11111,
      "city": "Stormwind",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 150.0,
          "description": "Gold Package",
          "id": "t21"
        },
        {
          "date": 1677896400000,
          "amount": 90.0,
          "description": "Silver Package",
          "id": "t22"
        },
        {
          "date": 1677907200000,
          "amount": 50.0,
          "description": "Bronze Package",
          "id": "t23"
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
          "id": "t24"
        },
        {
          "date": 1689123600000,
          "amount": 30.0,
          "description": "Silver Package",
          "id": "t25"
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
          "id": "t26"
        },
        {
          "date": 1692358800000,
          "amount": 40.0,
          "description": "Silver Package",
          "id": "t27"
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
          "id": "t28"
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
          "id": "t29"
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
          "id": "t30"
        }
      ]
    },
    {
      "firstName": "Jastor",
      "lastName": "Gallywix",
      "email": "Jastor@Gallywix.com",
      "birthDate": 1689112800000,
      "street": "Trade Prince Avenue 15",
      "zipCode": 65432,
      "city": "Kezan",
      "transactions": [
        {
          "date": 1689112800000,
          "amount": 180.0,
          "description": "Gold Package",
          "id": "t31"
        },
        {
          "date": 1689123600000,
          "amount": 100.0,
          "description": "Silver Package",
          "id": "t32"
        },
        {
          "date": 1689134400000,
          "amount": 50.0,
          "description": "Bronze Package",
          "id": "t33"
        }
      ]
    },
    {
      "firstName": "Vol'jin",
      "lastName": "DarkSpear",
      "email": "Vol'jin@DarkSpear.com",
      "birthDate": 1688594400000,
      "street": "Sen'jin Village 3",
      "zipCode": 56789,
      "city": "Durotar",
      "transactions": [
        {
          "date": 1688594400000,
          "amount": 120.0,
          "description": "Platinum Package",
          "id": "t34"
        }
      ]
    },
    {
      "firstName": "Gazlowe",
      "lastName": "Gearslipper",
      "email": "Gazlowe@Gearslipper.com",
      "birthDate": 1666735200000,
      "street": "Ratchet 6",
      "zipCode": 34567,
      "city": "The Barrens",
      "transactions": [
        {
          "date": 1666735200000,
          "amount": 75.0,
          "description": "Platinum Package",
          "id": "t35"
        },
        {
          "date": 1666756800000,
          "amount": 30.0,
          "description": "Diamond Package",
          "id": "t36"
        }
      ]
    },
    {
      "firstName": "Saurfang",
      "lastName": "Warsong",
      "email": "Saurfang@Warsong.com",
      "birthDate": 1666735200000,
      "street": "Warsong Hold 8",
      "zipCode": 65432,
      "city": "Nagrand",
      "transactions": [
        {
          "date": 1666735200000,
          "amount": 100.0,
          "description": "Platinum Package",
          "id": "t37"
        },
        {
          "date": 1666746000000,
          "amount": 50.0,
          "description": "Silver Package",
          "id": "t38"
        }
      ]
    },
    {
      "firstName": "Garrosh",
      "lastName": "Hellscream",
      "email": "Garrosh@Hellscream.com",
      "birthDate": 1666778400000,
      "street": "Warsong Hold 1",
      "zipCode": 65432,
      "city": "Nagrand",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 90.0,
          "description": "Gold Package",
          "id": "t39"
        },
        {
          "date": 1666789200000,
          "amount": 40.0,
          "description": "Silver Package",
          "id": "t40"
        },
        {
          "date": 1666800000000,
          "amount": 20.0,
          "description": "Bronze Package",
          "id": "t41"
        }
      ]
    },
    {
      "firstName": "Bolvar",
      "lastName": "Fordragon",
      "email": "Bolvar@Fordragon.com",
      "birthDate": 1666778400000,
      "street": "Stormwind Keep 2",
      "zipCode": 11111,
      "city": "Stormwind",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 150.0,
          "description": "Gold Package",
          "id": "t42"
        },
        {
          "date": 1666789200000,
          "amount": 100.0,
          "description": "Silver Package",
          "id": "t43"
        }
      ]
    },
    {
      "firstName": "Taelia",
      "lastName": "Fordragon",
      "email": "Taelia@Fordragon.com",
      "birthDate": 1692348000000,
      "street": "Stormwind Keep 2",
      "zipCode": 11111,
      "city": "Stormwind",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 70.0,
          "description": "Bronze Package",
          "id": "t44"
        },
        {
          "date": 1692358800000,
          "amount": 40.0,
          "description": "Silver Package",
          "id": "t45"
        }
      ]
    },
    {
      "firstName": "Alleria",
      "lastName": "Windrunner",
      "email": "Alleria@Windrunner.com",
      "birthDate": 1677885600000,
      "street": "Windrunner Spire 5",
      "zipCode": 67890,
      "city": "Silvermoon",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 120.0,
          "description": "Gold Package",
          "id": "t46"
        },
        {
          "date": 1677896400000,
          "amount": 80.0,
          "description": "Silver Package",
          "id": "t47"
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
          "id": "t48"
        },
        {
          "date": 1689123600000,
          "amount": 30.0,
          "description": "Silver Package",
          "id": "t49"
        }
      ]
    },
    {
      "firstName": "Varok",
      "lastName": "Saurfang",
      "email": "Varok@Saurfang.com",
      "birthDate": 1666735200000,
      "street": "Orgrimmar Embassy 4",
      "zipCode": 56789,
      "city": "Orgrimmar",
      "transactions": [
        {
          "date": 1666735200000,
          "amount": 150.0,
          "description": "Gold Package",
          "id": "t50"
        },
        {
          "date": 1666746000000,
          "amount": 90.0,
          "description": "Silver Package",
          "id": "t51"
        },
        {
          "date": 1666756800000,
          "amount": 50.0,
          "description": "Bronze Package",
          "id": "t52"
        }
      ]
    },
    {
      "firstName": "Gallywix",
      "lastName": "TradePrince",
      "email": "Gallywix@TradePrince.com",
      "birthDate": 1689112800000,
      "street": "Trade Prince Avenue 1",
      "zipCode": 65432,
      "city": "Kezan",
      "transactions": [
        {
          "date": 1689112800000,
          "amount": 120.0,
          "description": "Gold Package",
          "id": "t53"
        },
        {
          "date": 1689123600000,
          "amount": 70.0,
          "description": "Silver Package",
          "id": "t54"
        }
      ]
    },
    {
      "firstName": "Genn",
      "lastName": "Greymane",
      "email": "Genn@Greymane.com",
      "birthDate": 1692348000000,
      "street": "Gilneas City 10",
      "zipCode": 23456,
      "city": "Gilneas",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 100.0,
          "description": "Gold Package",
          "id": "t55"
        },
        {
          "date": 1692358800000,
          "amount": 50.0,
          "description": "Silver Package",
          "id": "t56"
        }
      ]
    },
    {
      "firstName": "Valeera",
      "lastName": "Sanguinar",
      "email": "Valeera@Sanguinar.com",
      "birthDate": 1677885600000,
      "street": "Rogue's Quarter 8",
      "zipCode": 67890,
      "city": "Undercity",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 80.0,
          "description": "Gold Package",
          "id": "t57"
        },
        {
          "date": 1677896400000,
          "amount": 30.0,
          "description": "Silver Package",
          "id": "t58"
        },
        {
          "date": 1677907200000,
          "amount": 20.0,
          "description": "Bronze Package",
          "id": "t59"
        }
      ]
    },
    {
      "firstName": "Varian",
      "lastName": "Wrynn",
      "email": "Varian@Wrynn.com",
      "birthDate": 1666778400000,
      "street": "Stormwind Keep 5",
      "zipCode": 11111,
      "city": "Stormwind",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 150.0,
          "description": "Gold Package",
          "id": "t60"
        }
      ]
    },
    {
      "firstName": "Wrathion",
      "lastName": "BlackPrince",
      "email": "Wrathion@BlackPrince.com",
      "birthDate": 1677885600000,
      "street": "Blackwing Lair 7",
      "zipCode": 67890,
      "city": "Blackrock Spire",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 120.0,
          "description": "Gold Package",
          "id": "t61"
        },
        {
          "date": 1677896400000,
          "amount": 80.0,
          "description": "Silver Package",
          "id": "t62"
        }
      ]
    },
    {
      "firstName": "Lor'themar",
      "lastName": "Theron",
      "email": "Lor'themar@Theron.com",
      "birthDate": 1692348000000,
      "street": "Sunfury Spire 3",
      "zipCode": 23456,
      "city": "Silvermoon",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 70.0,
          "description": "Bronze Package",
          "id": "t63"
        }
      ]
    },
    {
      "firstName": "Vereesa",
      "lastName": "Windrunner",
      "email": "Vereesa@Windrunner.com",
      "birthDate": 1666778400000,
      "street": "Windrunner Spire 7",
      "zipCode": 67890,
      "city": "Silvermoon",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 120.0,
          "description": "Gold Package",
          "id": "t64"
        }
      ]
    },
    {
      "firstName": "Broll",
      "lastName": "Bearmantle",
      "email": "Broll@Bearmantle.com",
      "birthDate": 1692348000000,
      "street": "Hyjal 4",
      "zipCode": 23456,
      "city": "Mount Hyjal",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 100.0,
          "description": "Gold Package",
          "id": "t65"
        }
      ]
    },
    {
      "firstName": "Hamuul",
      "lastName": "Runetotem",
      "email": "Hamuul@Runetotem.com",
      "birthDate": 1677885600000,
      "street": "Thunder Bluff 1",
      "zipCode": 43210,
      "city": "Thunder Bluff",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 90.0,
          "description": "Gold Package",
          "id": "t66"
        }
      ]
    },
    {
      "firstName": "Zekhan",
      "lastName": "EarthenRing",
      "email": "Zekhan@EarthenRing.com",
      "birthDate": 1692348000000,
      "street": "Shaman District 5",
      "zipCode": 23456,
      "city": "Orgrimmar",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 80.0,
          "description": "Gold Package",
          "id": "t67"
        }
      ]
    },
    {
      "firstName": "Talanji",
      "lastName": "Zandalari",
      "email": "Talanji@Zandalari.com",
      "birthDate": 1692348000000,
      "street": "Dazar'alor 2",
      "zipCode": 23456,
      "city": "Zuldazar",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 70.0,
          "description": "Gold Package",
          "id": "t68"
        }
      ]
    },
    {
      "firstName": "Rokhan",
      "lastName": "Darkspear",
      "email": "Rokhan@Darkspear.com",
      "birthDate": 1692348000000,
      "street": "Sen'jin Village 8",
      "zipCode": 23456,
      "city": "Durotar",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 60.0,
          "description": "Bronze Package",
          "id": "t69"
        }
      ]
    },
    {
      "firstName": "Thalyssra",
      "lastName": "Nightborne",
      "email": "Thalyssra@Nightborne.com",
      "birthDate": 1677885600000,
      "street": "Suramar 1",
      "zipCode": 67890,
      "city": "Suramar",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 150.0,
          "description": "Gold Package",
          "id": "t70"
        }
      ]
    },
    {
      "firstName": "Mayla",
      "lastName": "Highmountain",
      "email": "Mayla@Highmountain.com",
      "birthDate": 1692348000000,
      "street": "Highmountain Peak 5",
      "zipCode": 23456,
      "city": "Thunder Totem",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 120.0,
          "description": "Gold Package",
          "id": "t71"
        }
      ]
    },
    {
      "firstName": "Nathanos",
      "lastName": "Blightcaller",
      "email": "Nathanos@Blightcaller.com",
      "birthDate": 1666778400000,
      "street": "Undercity Ruins 4",
      "zipCode": 67890,
      "city": "Undercity",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 110.0,
          "description": "Gold Package",
          "id": "t72"
        }
      ]
    },
    {
      "firstName": "Xal'atath",
      "lastName": "Shadow-Priestess",
      "email": "Xal'atath@Shadow-Priestess.com",
      "birthDate": 1692348000000,
      "street": "Ny'alotha 7",
      "zipCode": 23456,
      "city": "N'Zoth's Lair",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 100.0,
          "description": "Gold Package",
          "id": "t73"
        }
      ]
    },
    {
      "firstName": "Tinkmaster",
      "lastName": "Overspark",
      "email": "Tinkmaster@Overspark.com",
      "birthDate": 1692348000000,
      "street": "Tinker Town 5",
      "zipCode": 23456,
      "city": "Ironforge",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 90.0,
          "description": "Gold Package",
          "id": "t74"
        }
      ]
    },
    {
      "firstName": "Maiev",
      "lastName": "Shadowsong",
      "email": "Maiev@Shadowsong.com",
      "birthDate": 1677885600000,
      "street": "Black Temple 1",
      "zipCode": 67890,
      "city": "Outland",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 80.0,
          "description": "Gold Package",
          "id": "t75"
        }
      ]
    },
    {
      "firstName": "Aysa",
      "lastName": "Cloudsinger",
      "email": "Aysa@Cloudsinger.com",
      "birthDate": 1692348000000,
      "street": "Temple of Earth 5",
      "zipCode": 23456,
      "city": "Stormwind",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 70.0,
          "description": "Gold Package",
          "id": "t76"
        }
      ]
    },
    {
      "firstName": "Warchief",
      "lastName": "Saurfang",
      "email": "Warchief@Saurfang.com",
      "birthDate": 1666778400000,
      "street": "Orgrimmar Embassy 10",
      "zipCode": 56789,
      "city": "Orgrimmar",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 150.0,
          "description": "Gold Package",
          "id": "t77"
        }
      ]
    },
    {
      "firstName": "High",
      "lastName": "Tinker Mekkatorque",
      "email": "High@TinkerMekkatorque.com",
      "birthDate": 1666778400000,
      "street": "Tinker Town 1",
      "zipCode": 56789,
      "city": "Ironforge",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 140.0,
          "description": "Gold Package",
          "id": "t78"
        }
      ]
    },
    {
      "firstName": "Tyrathan",
      "lastName": "Khort",
      "email": "Tyrathan@Khort.com",
      "birthDate": 1666778400000,
      "street": "Shadowglen 2",
      "zipCode": 67890,
      "city": "Teldrassil",
      "transactions": [
        {
          "date": 1666778400000,
          "amount": 130.0,
          "description": "Gold Package",
          "id": "t79"
        }
      ]
    },
    {
      "firstName": "Emmarel",
      "lastName": "Shadewarden",
      "email": "Emmarel@Shadewarden.com",
      "birthDate": 1692348000000,
      "street": "Warden's Post 5",
      "zipCode": 23456,
      "city": "Felwood",
      "transactions": [
        {
          "date": 1692348000000,
          "amount": 120.0,
          "description": "Gold Package",
          "id": "t80"
        }
      ]
    },
    {
      "firstName": "Lasan",
      "lastName": "Skyhorn",
      "email": "Lasan@Skyhorn.com",
      "birthDate": 1677885600000,
      "street": "Highmountain Peak 10",
      "zipCode": 67890,
      "city": "Thunder Totem",
      "transactions": [
        {
          "date": 1677885600000,
          "amount": 110.0,
          "description": "Gold Package",
          "id": "t81"
        }
      ]
    }
  ]




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
