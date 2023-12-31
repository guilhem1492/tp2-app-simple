import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent {
  @Input()
  article: Article;

  updateOn: boolean = false;

  @Output()
  articleToUpdate = new EventEmitter<Article>();

  @Output()
  articleToDelete = new EventEmitter<number>();

  constructor() {
    this.article = new Article('', '', 0);
  }

  deleteArticle(article: Article) {
    this.articleToDelete.emit(article.id);
  }

  voteUp(article: Article): boolean {
    this.article.votes++;
    this.articleToUpdate.emit(article);
    return false;
  }

  voteDown(article: Article): boolean {
    this.article.votes--;
    this.articleToUpdate.emit(article);
    return false;
  }

  updateArticle(
    article: Article,
    updatedTitle: HTMLInputElement,
    updatedLink: HTMLInputElement
  ) {
    this.article.title = updatedTitle.value;
    this.article.link = updatedLink.value;
    this.articleToUpdate.emit(article);
    return false;
  }
}
