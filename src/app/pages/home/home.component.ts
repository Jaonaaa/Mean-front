import { Component } from '@angular/core';
import { ArticleListComponent } from '../../components/article-list/article-list.component';

@Component({
  selector: 'app-home',
  imports: [ArticleListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {}
