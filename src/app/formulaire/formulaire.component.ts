import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article.model';
//import { ArticleService } from '../article.service';
import { HttpserviceService } from '../httpservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
})
export class FormulaireComponent implements OnInit {
  articles: Article[] = [];

  formArticle = this.fb.group({
    title: ['', Validators.required],
    link: ['', Validators.required],
  });

  postReactiveFormArticle(formArticle: FormGroup) {
    const article: Article = formArticle.value;
    article.votes = 0;
    this.service.addArticle(article).subscribe((res) => this.ngOnInit());
  }

  constructor(private service: HttpserviceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.service
      .getArticles()
      .subscribe((restArticles) => (this.articles = restArticles));
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement) {
    console.log(`Adding article title: ${title.value} and link: ${link.value}`);
    this.service
      .addArticle(new Article(title.value, link.value))
      .subscribe((data) => this.getArticles());
    location.reload();
    return false;
  }

  updateArticle(article: Article) {
    this.service.updateArticle(article).subscribe((data) => this.getArticles());
    return false;
  }

  deleteArticle(id: number) {
    this.service.deleteArticle(id).subscribe((data) => this.getArticles());
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
