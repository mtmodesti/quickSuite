import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss'],
})
export class MovieDashboardComponent implements OnInit, AfterViewInit {
  selectedMovie = history.state.movieInfo;
  trailerLink = this.selectedMovie.trailerLink;
  @ViewChild('movieImage') movieImage: ElementRef | undefined;
  safeLinkUrl: any;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.handleSafeUrl();
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.handleMovieImage();
  }

  handleSafeUrl() {
    this.trailerLink = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.trailerLink
    );
  }

  handleMovieImage() {
    const htmlMoviePictureElement = this.movieImage;
    this.renderer.setStyle(
      htmlMoviePictureElement?.nativeElement,
      'background-image',
      `url(${this.selectedMovie.url}`
    );
  }

  handleMoveHome() {
    this.router.navigate(['']);
  }

  handleTransformString(originalTime: string) {
    const [hours, minutes] = originalTime.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    const newFormat = `${formattedHours}h:${formattedMinutes}m`;
    return newFormat;
  }
}
