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
  private dialog: MatDialog = inject(MatDialog);
  protected route: ActivatedRoute = inject(ActivatedRoute);
  private userDataService: UserDataService = inject(UserDataService);
  protected displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  protected dataSource!: MatTableDataSource<User>;
  protected user = new User();
  private dataSubscription?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.setSubscription();
  }

  /**
   * subscribes to allUsers and updates the table gets when the data changes, 
   * also the dataSource paginator and sort get set.
   */
  private setSubscription(): void {
    this.dataSubscription = this.userDataService.allUsers$.subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * filters the dataSource based on the filterValue.
   */
  protected applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  /**
   * opens the dialog for adding a new user.
   */
  protected openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

  /**
   * the dataSource paginator and sort gets set again after the view has been initialized 
   * to ensure that the paginator and sort are working properly.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
    this.dialog?.closeAll();
  }
}
