import { AfterViewInit, Component,ElementRef,QueryList,Renderer2,ViewChild, ViewChildren } from '@angular/core';
import movies from "../../../assets/configs/moviesDescription.json"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements AfterViewInit {
  @ViewChildren('movieWrapper') movieWrapper: QueryList<ElementRef> | undefined;

  latestReleases = movies.latestReleases
  
  constructor(
    private renderer:Renderer2
  ){
  
   
  }
  


  
  ngAfterViewInit(): void {
    
  this.handleLatestMovies()
    
  }
  
  handleLatestMovies(){
    const latestMovies = this.movieWrapper?.toArray()
    latestMovies?.forEach((movie:ElementRef,index) => {
      const imgUrl = this.latestReleases[index].url
      this.renderer.setStyle(movie.nativeElement,'background-image', `url(${imgUrl})`)

    })
    console.log(latestMovies)
  }

}
