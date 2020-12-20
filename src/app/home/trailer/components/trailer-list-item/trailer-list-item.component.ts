import { Component, Input, OnInit } from '@angular/core';
import { ResponseTrailerModel } from 'src/app/api/models/response/response-trailer.model';

@Component({
  selector: 'app-trailer-list-item',
  templateUrl: './trailer-list-item.component.html',
  styleUrls: ['./trailer-list-item.component.scss']
})
export class TrailerListItemComponent implements OnInit {
  @Input() trailerObject: ResponseTrailerModel;

  constructor() { }

  ngOnInit(): void {
  }

}
