import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Anime } from './anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiUrl);
  }

  calculateTotals(animes: Anime[]): { totalEpisodes: number; avgRating: number } {
    const totalEpisodes = animes.reduce((acc, anime) => acc + anime.episode, 0);
    const avgRating =
      animes.reduce((acc, anime) => acc + parseFloat(anime.Rating), 0) /
      animes.length;
    return { totalEpisodes, avgRating };
  }

  getAnime(id: number): Observable<Anime | undefined> {
    return this.http.get<Anime[]>(this.apiUrl).pipe(
      map((animes: Anime[]) => animes.find((anime) => anime.id === id))
    );
  }
}