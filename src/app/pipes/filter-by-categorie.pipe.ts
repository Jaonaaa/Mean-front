import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../types/types';

@Pipe({
  name: 'filterByCategorie',
})
export class FilterByCategoriePipe implements PipeTransform {
  transform(articles: Article[], idCategorie: string): Article[] {
    if (!idCategorie) return articles;
    return articles.filter((article) => article.categorie?._id === idCategorie);
  }
}
