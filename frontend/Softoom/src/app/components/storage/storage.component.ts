import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss', './storage-cols.scss'],
})
export class StorageComponent {
  constructor(private api: ApiService) {}

  ngOnInit(): void {
  }
}
