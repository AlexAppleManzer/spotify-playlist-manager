import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  data: any[];
  serializedData: String;
  constructor(private backendService: BackendService){};
  
  ngOnInit(): void {
    this.backendService.getUserPlaylists().subscribe(
      result => this.data = result,
      err => console.error(err),
      () => {
        this.serializedData = JSON.stringify(this.data);
      }
    )
  }
}
