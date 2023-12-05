import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
})
export class MovieDashboardComponent implements OnInit, AfterViewInit {
  selectedMovie = history.state.movieInfo;
  @ViewChild('movieImage') movieImage: ElementRef | undefined;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.handleMovieImage();
  }

  handleMovieImage() {
    console.log(this.selectedMovie);
    const htmlMoviePictureElement = this.movieImage;
    console.log(htmlMoviePictureElement);
    this.renderer.setStyle(
      htmlMoviePictureElement?.nativeElement,
      'background-image',
      `url(${this.selectedMovie.url}`
    );
  }
}
