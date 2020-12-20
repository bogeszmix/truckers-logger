import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RequestTrailerModel } from 'src/app/api/models/request/request-trailer.model';
import { ResponseTrailerModel } from 'src/app/api/models/response/response-trailer.model';
import { APITrailerService } from 'src/app/api/services/api-trailer.service';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {
  private trailers = new BehaviorSubject<ResponseTrailerModel[]>([]);

  constructor(
    private trailerAPI: APITrailerService
  ) { }

  get _trailers() {
    return this.trailers.asObservable();
  }

  addNewTrailer(trailer: RequestTrailerModel): Promise<any> {
    return this.trailerAPI.createTrailer(trailer);
  }

  initTrailerList(loggedInUser: firebase.default.User) {
    return this.trailerAPI.readTrailers(loggedInUser).pipe(
      map((eventMetaArray: any[]) =>
        eventMetaArray.map((item: any) => item.payload.doc.data())
      ),
      tap((trailers: ResponseTrailerModel[]) => this.trailers.next(trailers))
    );
  }
}
