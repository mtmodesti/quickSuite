import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {

  addToWatchList(movie: any): void {
      const watchList =  this.getWatchList()
      const list = watchList ? JSON.parse(watchList) : [];
      localStorage.setItem('@watchList',`${JSON.stringify([...list, movie.name])}`)
}

  removeFromWatchList(movie: any): void {
    const watchList =  this.getWatchList()
    const list = watchList ? JSON.parse(watchList) : [];
    const index = list.indexOf(movie.name);
    list.splice(index,1)
    localStorage.setItem('@watchList',`${JSON.stringify([...list])}`)
  }

  isMovieInWatchList(movie: any): boolean {
    const watchList = this.getWatchList();
    const list = watchList ? JSON.parse(watchList) : [];
    return list.includes(movie.name);
  }

  getWatchList():string | null {
    return  localStorage.getItem('@watchList')
  }
}
