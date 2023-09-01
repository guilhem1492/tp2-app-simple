import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article.model';
import { ArticleService } from '../article.service';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  articles: Article[] = [];

  constructor(private service: HttpserviceService) {}

  ngOnInit(): void {
    this.service
      .getArticles()
      .subscribe((restArticles) => (this.articles = restArticles));
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement) {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.service
      .addArticle(new Article(title.value, link.value))
      .subscribe((data) => {
        this.getArticles();
      });
    location.reload();
    return false;
  }

  updateArticle(title: HTMLInputElement, link: HTMLInputElement) {
    const a = new Article('hello', 'how', 1);
    a.id = 1;
    this.service.updateArticle(a).subscribe((data) => {
      this.getArticles();
    });
  }

  deleteArticle(id: number) {
    this.service.deleteArticle(id).subscribe((data) => {
      this.getArticles();
    });
  }

  getArticles() {
    this.service.getArticles().subscribe((a) => {
      this.articles = a;
    });
  }

  sortedArticles(): Article[] {
    return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
  }
}
