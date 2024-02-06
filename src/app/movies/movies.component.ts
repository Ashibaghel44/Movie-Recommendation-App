import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  data: any[] = [];
  searchTerm: any;
  loading: boolean = false;
  constructor(private http: HttpClient, private toast:ToastrService) { }
  ngOnInit() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=b60939858ae0aff45d0358ad05c933f4&language=en-US&page=1'
    this.http.get(url).subscribe((res: any) => {
      this.data = res.results
      console.log(this.data);

    })
  }

  searchMovies() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=b60939858ae0aff45d0358ad05c933f4&language=en-US&query=${this.searchTerm}&page=1&include_adult=false`;
    this.http.get(url).subscribe((res: any) => {
      this.data = res.results;
    },(error) => {
      this.toast.error('This movie is not available')
      console.error('An error occurred:', error);
    })
  }
  watchMovie() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}