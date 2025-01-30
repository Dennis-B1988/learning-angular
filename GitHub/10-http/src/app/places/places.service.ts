import { DestroyRef, inject, Injectable, OnInit, signal } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { catchError, map, tap, throwError } from "rxjs";

import { Place } from "./place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  isFetching = signal<boolean>(false);
  error = signal("");
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/places",
      "Something went wrong fetching available places. Please try again later.",
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      "http://localhost:3000/user-places",
      "Something went wrong fetching your favourite places. Please try again later.",
    ).pipe(
      tap({
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces);
        },
      }),
    );
  }

  addPlaceToUserPlaces(place: Place) {
    this.userPlaces.update((currentPlaces) => [...currentPlaces, place]);

    return this.httpClient.put("http://localhost:3000/user-places", {
      placeId: place.id,
    });
  }

  removeUserPlace(place: Place) {
    return this.httpClient.delete(
      `http://localhost:3000/user-places/${place.id}`,
    );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
