import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
export class TrailerListComponent implements OnChanges, OnInit, OnDestroy {
  @Input() refreshEvent: number;
  private subs = new Subscription();
  trailers: ResponseTrailerModel[];

  constructor(
    private trailerService: TrailerService,
    private authService: AuthService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshEvent) {
      this.initTrailerList();
    }
  }

  ngOnInit(): void {
    this.initTrailerList();
    this.listenListChanging();
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
  }

  listenListChanging() {
    this.subs.add(
      this.trailerService._trailers.subscribe((trailers: ResponseTrailerModel[]) => this.trailers = trailers)
    );
  }

}
