import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from 'src/models/user.class';
import { collection } from '@firebase/firestore';
import { Firestore, getDocs, onSnapshot } from '@angular/fire/firestore';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'data-table.component',
  styleUrls: ['data-table.component.scss'],
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent {
  firestore: Firestore = inject(Firestore);
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<User>;
  user = new User();
  allUsers = [] as any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  async ngOnInit() {
    const userCollection = collection(this.firestore, 'users');

    onSnapshot(userCollection, (snapshot) => {
      this.allUsers = [];
      snapshot.docs.forEach((doc) => {
      this.allUsers.push(new User({ ...doc.data(), id: doc.id }));
      });
      this.dataSource = new MatTableDataSource(this.allUsers);
      console.log('AllUsers:', this.allUsers);
      console.log('DataSource:', this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
