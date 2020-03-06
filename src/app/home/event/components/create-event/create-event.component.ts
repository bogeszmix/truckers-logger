import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/home/event/event.service';
import { ExtendedEventModel } from 'src/app/api/models/event.model';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {}

  submitNewEvent(event: ExtendedEventModel) {
    if (event) {
      this.eventService.addNewEvent(event);
    }
  }



}
