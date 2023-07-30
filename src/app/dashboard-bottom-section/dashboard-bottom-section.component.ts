import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/models/user.class';
import { collection } from '@firebase/firestore';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-bottom-section',
  templateUrl: './dashboard-bottom-section.component.html',
  styleUrls: ['./dashboard-bottom-section.component.scss']
})
export class DashboardBottomSectionComponent {
  firestore: Firestore = inject(Firestore);
  dialog: MatDialog = inject(MatDialog);
  route: ActivatedRoute = inject(ActivatedRoute);

  displayedColumns: string[] = ['email', 'transactions'];
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
}

