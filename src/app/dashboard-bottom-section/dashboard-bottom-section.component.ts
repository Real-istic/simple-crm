import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user.class';
import { collection } from '@firebase/firestore';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../user-data-service.service';


@Component({
  selector: 'app-dashboard-bottom-section',
  templateUrl: './dashboard-bottom-section.component.html',
  styleUrls: ['./dashboard-bottom-section.component.scss']
})
export class DashboardBottomSectionComponent {
  firestore: Firestore = inject(Firestore);
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);
  userDataService: UserDataService = inject(UserDataService);

  displayedColumns: string[] = ['email', 'description', 'price', 'date'];
  dataSource!: MatTableDataSource<User>;
  user = new User();
  allUsers = [] as any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  async ngOnInit() {
    await this.userDataService.initialize();
    this.allUsers = await this.userDataService.allUsers;
    this.allUsers.sort((a: any, b: any) => this.sortByLastTransactionDate(a, b));
    this.dataSource = new MatTableDataSource(this.allUsers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortByLastTransactionDate(a: User, b: User): number {
    const lastTransactionDateA = a.transactions[a.transactions.length - 1]?.date || 0;
    const lastTransactionDateB = b.transactions[b.transactions.length - 1]?.date || 0;
    return lastTransactionDateB - lastTransactionDateA;
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}

