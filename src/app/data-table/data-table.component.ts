// import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';
// import { Firestore, collection, getDocs } from '@angular/fire/firestore';
// import { User } from 'src/models/user.class';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'data-table.component',
//   styleUrls: ['data-table.component.scss'],
//   templateUrl: 'data-table.component.html',
// })
// export class DataTableComponent implements AfterViewInit {
//   displayedColumns: string[] = ['firstname', 'lastname', 'email', 'birthDate'];
//   dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
//   firestore: Firestore = inject(Firestore);
//   allUsers: User[] = [];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   async ngOnInit() {
//     const userCollection = collection(this.firestore, 'users');
//     const querySnapshot = await getDocs(userCollection);

//     this.allUsers = [];
//     querySnapshot.forEach((doc) => {
//       this.allUsers.push(new User(doc.data()));
//     });

//     this.dataSource = new MatTableDataSource(this.allUsers);
//   }

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();

//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }


import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from 'src/models/user.class';
import { collection } from '@firebase/firestore';
import { Firestore, getDocs, onSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'data-table.component',
  styleUrls: ['data-table.component.scss'],
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent {
  firestore: Firestore = inject(Firestore);
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<User>;
  user = new User();
  allUsers = [] as any;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users


    // Assign the data to the data source for the table to render
  }

  async ngOnInit() {
    const userCollection = collection(this.firestore, 'users');
    const querySnapshot = await getDocs(userCollection);

    // this.allUsers = [];
    // querySnapshot.forEach((doc) => {
    //   this.allUsers.push(new User(doc.data()));
    // });

    this.allUsers = [];
    onSnapshot(userCollection, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.allUsers.push(new User(doc.data()));
      });
      console.log('AllUsers:', this.allUsers);
    });

    this.dataSource = new MatTableDataSource(this.allUsers);
    console.log('DataSource:', this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
