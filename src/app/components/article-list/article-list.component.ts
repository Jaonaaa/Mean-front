import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Article, ArticleForm, Categorie } from '../../types/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../services/categorie.service';
import { FilterByCategoriePipe } from '../../pipes/filter-by-categorie.pipe';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-article-list',
  imports: [
    CommonModule,
    FormsModule,
    FilterByCategoriePipe,
    CategoriesComponent,
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.sass',
})
export class ArticleListComponent implements OnInit {
  articleService = inject(ArticlesService);
  categorieService = inject(CategorieService);
  articles = signal<Article[]>([]);
  categories = signal<Categorie[]>([]);
  filterCategory = signal<string>('');
  newArticle = signal<ArticleForm>({
    title: '',
    content: '',
    categorieId: null,
  });

  ngOnInit(): void {
    this.loadArticles();
    this.loadCategories();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.articles.set(articles);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des articles:', error);
      },
    });
  }

  addNewCategorie(categorie: string): void {
    if (!categorie) return;
    const newCategorie: Categorie = {
      name: categorie,
    };
    this.categorieService.addCategorie(newCategorie).subscribe(() => {
      this.loadCategories();
    });
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      },
    });
  }

  filterByCategory(categoryId: string | null | undefined): void {
    if (!categoryId) return;
    if (categoryId == this.filterCategory()) {
      this.filterCategory.set('');
    } else this.filterCategory.set(categoryId);
  }

  addArticle(): void {
    if (
      this.newArticle().title &&
      this.newArticle().content &&
      this.newArticle().categorieId
    ) {
      const newArticle: Article = {
        ...this.newArticle(),
        categorie: {
          _id: this.newArticle().categorieId,
        },
      };
      this.articleService.addArticle(newArticle).subscribe(() => {
        this.loadArticles();
        this.newArticle.set({ title: '', content: '', categorieId: null });
      });
    }
  }

  deleteArticle(id: string | undefined): void {
    if (id)
      this.articleService
        .deleteArticle(id)
        .subscribe(() => this.loadArticles());
  }
}
