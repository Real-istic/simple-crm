import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data-service.service';


@Component({
  selector: 'app-data-table',
  styleUrls: ['data-table.component.scss'],
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent {
  firestore: Firestore = inject(Firestore);
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);
  userDataService: UserDataService = inject(UserDataService);

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<User>;
  user = new User();
  allUsers = [] as any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  }

  async ngOnInit() {
    await this.userDataService.initialize();
    this.allUsers = await this.userDataService.allUsers;
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

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
