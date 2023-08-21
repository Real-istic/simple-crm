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
        "transactions": [
            {
                "date": 1688594400000,
                "price": 120,
                "description": "Platinum Package",
                "id": "t34"
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
                "price": 200,
                "description": "Gold Package",
                "id": "t4"
            },
            {
                "date": 1692369600000,
                "price": 50,
                "description": "Silver Package",
                "id": "t5"
            },
            {
                "date": 1692391200000,
                "price": 120,
                "description": "Bronze Package",
                "id": "t6"
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
                "price": 80,
                "description": "Silver Package",
                "id": "t19"
            },
            {
                "date": 1677896400000,
                "price": 50,
                "description": "Gold Package",
                "id": "t20"
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
                "price": 100,
                "description": "Platinum Package",
                "id": "t37"
            },
            {
                "date": 1666746000000,
                "price": 50,
                "description": "Silver Package",
                "id": "t38"
            }
        ]
    },
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
                "price": 50,
                "description": "Bronze Package",
                "id": "t1"
            },
            {
                "date": 1666800000000,
                "price": 100,
                "description": "Silver Package",
                "id": "t2"
            },
            {
                "date": 1666821600000,
                "price": 200,
                "description": "Gold Package",
                "id": "t3"
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
                "price": 90,
                "description": "Gold Package",
                "id": "t74"
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
                "price": 90,
                "description": "Gold Package",
                "id": "t30"
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
                "price": 75,
                "description": "Platinum Package",
                "id": "t7"
            },
            {
                "date": 1666756800000,
                "price": 100,
                "description": "Diamond Package",
                "id": "t8"
            },
            {
                "date": 1666778400000,
                "price": 80,
                "description": "Silver Package",
                "id": "t9"
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
                "price": 120,
                "description": "Bronze Package",
                "id": "t24"
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
                "price": 70,
                "description": "Gold Package",
                "id": "t68"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t28"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t71"
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
                "price": 75,
                "description": "Platinum Package",
                "id": "t35"
            },
            {
                "date": 1666756800000,
                "price": 100,
                "description": "Diamond Package",
                "id": "t36"
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
                "price": 50,
                "description": "Gold Package",
                "id": "t60"
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
                "price": 60,
                "description": "Bronze Package",
                "id": "t69"
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
                "price": 10,
                "description": "Bronze Package",
                "id": "t28"
            },
            {
                "date": 1692358800000,
                "price": 20,
                "description": "Silver Package",
                "id": "t29"
            },
            {
                "date": 1692369600000,
                "price": 120,
                "description": "Gold Package",
                "id": "t30"
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
                "price": 50,
                "description": "Gold Package",
                "id": "t70"
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
                "price": 100,
                "description": "Gold Package",
                "id": "t65"
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
                "price": 90,
                "description": "Gold Package",
                "id": "t21"
            },
            {
                "date": 1692358800000,
                "price": 50,
                "description": "Silver Package",
                "id": "t22"
            },
            {
                "date": 1692369600000,
                "price": 30,
                "description": "Bronze Package",
                "id": "t23"
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
                "price": 10,
                "description": "Bronze Package",
                "id": "t63"
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
                "price": 80,
                "description": "Gold Package",
                "id": "t67"
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
                "price": 130,
                "description": "Gold Package",
                "id": "t79"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t53"
            },
            {
                "date": 1689123600000,
                "price": 70,
                "description": "Silver Package",
                "id": "t54"
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
                "price": 50,
                "description": "Gold Package",
                "id": "t50"
            },
            {
                "date": 1666746000000,
                "price": 20,
                "description": "Silver Package",
                "id": "t51"
            },
            {
                "date": 1666756800000,
                "price": 50,
                "description": "Bronze Package",
                "id": "t52"
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
                "price": 50,
                "description": "Gold Package",
                "id": "t10"
            },
            {
                "date": 1677896400000,
                "price": 20,
                "description": "Silver Package",
                "id": "t11"
            },
            {
                "date": 1677918000000,
                "price": 75,
                "description": "Platinum Package",
                "id": "t12"
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
                "price": 90,
                "description": "Gold Package",
                "id": "t66"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t46"
            },
            {
                "date": 1677896400000,
                "price": 80,
                "description": "Silver Package",
                "id": "t47"
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
                "price": 250,
                "description": "Platinum Package",
                "id": "t16"
            },
            {
                "date": 1689123600000,
                "price": 130,
                "description": "Silver Package",
                "id": "t17"
            },
            {
                "date": 1689134400000,
                "price": 80,
                "description": "Bronze Package",
                "id": "t18"
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
                "price": 100,
                "description": "Platinum Package",
                "id": "t34"
            },
            {
                "date": 1677896400000,
                "price": 80,
                "description": "Gold Package",
                "id": "t35"
            },
            {
                "date": 1677907200000,
                "price": 50,
                "description": "Silver Package",
                "id": "t36"
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
                "price": 80,
                "description": "Gold Package",
                "id": "t24"
            },
            {
                "date": 1689123600000,
                "price": 30,
                "description": "Silver Package",
                "id": "t25"
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
                "price": 70,
                "description": "Gold Package",
                "id": "t76"
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
                "price": 10,
                "description": "Bronze Package",
                "id": "t26"
            },
            {
                "date": 1692358800000,
                "price": 40,
                "description": "Silver Package",
                "id": "t27"
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
                "price": 140,
                "description": "Gold Package",
                "id": "t78"
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
                "price": 10,
                "description": "Bronze Package",
                "id": "t44"
            },
            {
                "date": 1692358800000,
                "price": 40,
                "description": "Silver Package",
                "id": "t45"
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
                "price": 50,
                "description": "Gold Package",
                "id": "t42"
            },
            {
                "date": 1666789200000,
                "price": 100,
                "description": "Silver Package",
                "id": "t43"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t31"
            },
            {
                "date": 1677896400000,
                "price": 20,
                "description": "Silver Package",
                "id": "t32"
            },
            {
                "date": 1677907200000,
                "price": 10,
                "description": "Bronze Package",
                "id": "t33"
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
                "price": 80,
                "description": "Gold Package",
                "id": "t57"
            },
            {
                "date": 1677896400000,
                "price": 30,
                "description": "Silver Package",
                "id": "t58"
            },
            {
                "date": 1677907200000,
                "price": 20,
                "description": "Bronze Package",
                "id": "t59"
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
                "price": 80,
                "description": "Gold Package",
                "id": "t48"
            },
            {
                "date": 1689123600000,
                "price": 30,
                "description": "Silver Package",
                "id": "t49"
            }
        ]
    },
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
                "price": 50,
                "description": "Gold Package",
                "id": "t21"
            },
            {
                "date": 1677896400000,
                "price": 20,
                "description": "Silver Package",
                "id": "t22"
            },
            {
                "date": 1677907200000,
                "price": 50,
                "description": "Bronze Package",
                "id": "t23"
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
                "price": 100,
                "description": "Platinum Package",
                "id": "t29"
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
                "price": 110,
                "description": "Gold Package",
                "id": "t81"
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
                "price": 80,
                "description": "Gold Package",
                "id": "t75"
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
                "price": 50,
                "description": "Gold Package",
                "id": "t77"
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
                "price": 110,
                "description": "Gold Package",
                "id": "t72"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t64"
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
                "price": 100,
                "description": "Gold Package",
                "id": "t73"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t61"
            },
            {
                "date": 1677896400000,
                "price": 80,
                "description": "Silver Package",
                "id": "t62"
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
                "price": 180,
                "description": "Gold Package",
                "id": "t31"
            },
            {
                "date": 1689123600000,
                "price": 100,
                "description": "Silver Package",
                "id": "t32"
            },
            {
                "date": 1689134400000,
                "price": 50,
                "description": "Bronze Package",
                "id": "t33"
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
                "price": 120,
                "description": "Silver Package",
                "id": "t13"
            },
            {
                "date": 1688605200000,
                "price": 80,
                "description": "Bronze Package",
                "id": "t14"
            },
            {
                "date": 1688616000000,
                "price": 160,
                "description": "Gold Package",
                "id": "t15"
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
                "price": 90,
                "description": "Gold Package",
                "id": "t39"
            },
            {
                "date": 1666789200000,
                "price": 40,
                "description": "Silver Package",
                "id": "t40"
            },
            {
                "date": 1666800000000,
                "price": 20,
                "description": "Bronze Package",
                "id": "t41"
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
                "price": 80,
                "description": "Gold Package",
                "id": "t25"
            },
            {
                "date": 1689123600000,
                "price": 30,
                "description": "Silver Package",
                "id": "t26"
            },
            {
                "date": 1689134400000,
                "price": 10,
                "description": "Bronze Package",
                "id": "t27"
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
                "price": 120,
                "description": "Gold Package",
                "id": "t80"
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
                "price": 100,
                "description": "Gold Package",
                "id": "t55"
            },
            {
                "date": 1692358800000,
                "price": 50,
                "description": "Silver Package",
                "id": "t56"
            }
        ]
    }
  ];

  userId: string = '';



  constructor() { }


  async ngOnInit() {
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
  }

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    let userCollection = collection(this.firestore, 'users')
    this.user.id = doc(userCollection).id;
    await setDoc(doc(userCollection), this.user.toJson());
    this.loading = false;
    this.dialogRef.close();
  }
}
