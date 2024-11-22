import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  animes: Anime[] = [];
  selectedAnime!: Anime;
  selected = false;

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.getAnimes();
  }

  getAnimes(): void {
    this.animeService.getAnimes().subscribe((animes) => {
      this.animes = animes;
    });
  }

  onSelected(anime: Anime): void {
    this.selectedAnime = anime;
    this.selected = true;
  }

  clearSelection(): void {
    this.selected = false;
  }

  getTotalEpisodes(): number {
    return this.animes.reduce((total, anime) => total + anime.episode, 0);
  }

  getAverageRating(): number {
    const totalRating = this.animes.reduce((total, anime) => total + parseFloat(anime.Rating), 0);
    return this.animes.length > 0 ? totalRating / this.animes.length : 0;
  }
}

