import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { ResponseTrailerModel } from 'src/app/api/models/response/response-trailer.model';
import { AuthService } from 'src/app/auth/auth.service';
import { TrailerService } from '../../trailer.service';

@Component({
  selector: 'app-trailer-list',
  templateUrl: './trailer-list.component.html',
  styleUrls: ['./trailer-list.component.scss']
})
export class TrailerListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  trailers: ResponseTrailerModel[];

  constructor(
    private trailerService: TrailerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initTrailerList();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initTrailerList() {
    this.subs.add(
      this.trailerService.initTrailerList(this.authService._currentLoggedInUser).pipe(
        distinctUntilChanged(),
        take(1)
      ).subscribe()
    );

    this.subs.add(
      this.trailerService._trailers.subscribe((trailers: ResponseTrailerModel[]) => this.trailers = trailers)
    );
  }

}
