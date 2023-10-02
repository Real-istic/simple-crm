import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-data-table',
  styleUrls: ['data-table.component.scss'],
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent {
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);
  userDataService: UserDataService = inject(UserDataService);

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource!: MatTableDataSource<User>;
  user = new User();
  dataSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  // allUsers is subscribed to and the table gets updated when the data changes, also the dataSource paginator and sort gets set.
  async ngOnInit() {
    this.dataSubscription = this.userDataService.allUsers$.subscribe(async (users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // the dataSource paginator and sort gets set again after the view has been initialized to ensure that the paginator and sort are working properly.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // filters the dataSource based on the filterValue.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  // opens the dialog for adding a new user.
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  // unsubscribes from the subscriptions and closes the dialog when the component gets destroyed to avoid memory leaks.
  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
    this.dialog?.closeAll();
  }
}
