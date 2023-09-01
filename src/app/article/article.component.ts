import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from './article.model';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {
  @Input()
  article: Article;

  @Output()
  articleSelected = new EventEmitter<Article>();

  @Output()
  articleToDelete = new EventEmitter<number>();

  constructor() {
    this.article = new Article('', '', 0);
  }

  deleteArticle(article: Article) {
    this.articleToDelete.emit(article.id);
  }

  voteUp(): boolean {
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean {
    this.article.voteDown();
    return false;
  }
}
