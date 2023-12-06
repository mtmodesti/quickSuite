import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import movies from '../../../assets/configs/moviesDescription.json';
import { WatchListService } from 'src/app/services/watchlist.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('movieWrapper') movieWrapper: QueryList<ElementRef> | undefined;
  @ViewChild('section') section: ElementRef | undefined;

  latestReleases = movies.latestReleases;
  mainMovie = movies.mainMovie;
  userWatchList: any = undefined;
  sortOption = ['Title', 'Release Date'];
  selectedSortOption = 'Title';

  constructor(
    private renderer: Renderer2,
    private wls: WatchListService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.handleMainMovie();
    this.handleLatestMovies();
    this.handleStartWatchList();
  }

  handleMainMovie() {
    const mainMovie = this.mainMovie[0];
    this.renderer.setStyle(
      this?.section?.nativeElement,
      'background-image',
      `url(${mainMovie.url})`
    );
  }

  handleLatestMovies() {
    const latestMovies = this.movieWrapper?.toArray();
    latestMovies?.forEach((movie: ElementRef, index) => {
      const imgUrl = this.latestReleases[index].url;
      this.renderer.setStyle(
        movie.nativeElement,
        'background-image',
        `url(${imgUrl})`
      );
    });
  }

  handleStartWatchList() {
    this.userWatchList = this.wls.getWatchList() || [];
  }

  handleWatchList(movie: any) {
    const isMovieInWatchList = this.wls.isMovieInWatchList(movie);
    if (!isMovieInWatchList) {
      this.wls.addToWatchList(movie);
    } else {
      this.wls.removeFromWatchList(movie);
    }
  }

  handleWatchLIstThumbnail(movie: any) {
    const list = this.wls.getWatchList();
    if (list) {
      const parsedList = JSON.parse(list);
      return parsedList.includes(movie.name);
    }
    return false;
  }

  handleMoviePage(movie: any) {
    this.router.navigate([movie.name], { state: { movieInfo: movie } });
  }

  onSelectChange(event: MatSelectChange) {
    if (event.value === 'Title') {
      this.sortByTitle();
    } else if (event.value === 'Release Date') {
      this.sortByReleaseDate();
    }
  }

  sortByTitle() {
    return this.latestReleases.sort((a, b) =>
      a.name
        .trim()
        .localeCompare(b.name.trim(), undefined, { sensitivity: 'base' })
    );
  }

  sortByReleaseDate() {
    return this.latestReleases.sort(
      (a, b) =>
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );
  }
}
