import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResponseTrailerModel } from 'src/app/api/models/response/response-trailer.model';
import { AuthService } from 'src/app/auth/auth.service';
import { TrailerService } from '../../trailer.service';

@Component({
  selector: 'app-trailer-list',
  templateUrl: './trailer-list.component.html',
  styleUrls: ['./trailer-list.component.scss']
})
export class TrailerListComponent implements OnInit {
  private subs = new Subscription();
  trailers: ResponseTrailerModel[];

  constructor(
    private trailerService: TrailerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initTrailerList();
  }

  initTrailerList() {
    this.subs.add(
      this.trailerService.initTrailerList(this.authService._currentLoggedInUser).subscribe()
    );

    this.subs.add(
      this.trailerService._trailers.subscribe((trailers: ResponseTrailerModel[]) => this.trailers = trailers)
    );
  }

}
