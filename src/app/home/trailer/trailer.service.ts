import { Injectable } from '@angular/core';
import { RequestTrailerModel } from 'src/app/api/models/request/request-trailer.model';
import { APITrailerService } from 'src/app/api/services/api-trailer.service';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {

  constructor(
    private trailerAPI: APITrailerService
  ) { }

  addNewTrailer(trailer: RequestTrailerModel): Promise<any> {
    return this.trailerAPI.createTrailer(trailer);
  }
}
