import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { RequestTrailerModel } from "../models/request/request-trailer.model";

@Injectable({
  providedIn: "root",
})
export class APITrailerService {
  private readonly BASE_URL = "trailers";

  constructor(private dbConn: AngularFirestore) {}

  createTrailer(trailer: RequestTrailerModel): Promise<any> {
    return this.dbConn.collection(this.BASE_URL).add(trailer);
  }

  readTrailers(loggedInUser: firebase.default.User): Observable<any> {
    if (loggedInUser) {
      return this.dbConn
        .collection(this.BASE_URL, (ref) =>
          ref.where("userId", "==", loggedInUser.uid)
        )
        .snapshotChanges();
    }
  }

  updateTrailer(trailer: RequestTrailerModel): Promise<any> {
    return this.dbConn.collection(this.BASE_URL).doc(trailer.id).update({
      licencePlate: trailer.licencePlate,
      tractorNumber: trailer.tractorNumber,
    });
  }

  deleteTrailer(trailer: RequestTrailerModel): Promise<any> {
    return this.dbConn.collection(this.BASE_URL).doc(trailer.id).delete();
  }
}
