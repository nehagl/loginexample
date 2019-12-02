import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/article';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  allArticles: Article[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  articleForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });

  constructor(private articleService: ArticleService) { }

  ngOnInit():void {
    this.getAllArticles();
  }

  getAllArticles() {
		this.articleService.getAllArticles()
			.subscribe(
				data => this.allArticles = data,
				errorCode => this.statusCode = errorCode);
	}
  onArticleFormSubmit()
  {
    this.processValidation = true;
    if (this.articleForm.invalid) {
			return; //Validation failed, exit from method.
    }
    this.preProcessConfigurations();
    let article = this.articleForm.value;
    if(this.articleIdToUpdate === null)
    {
      this.articleService.getAllArticles().subscribe(articles=> {
        let maxIndex = articles.length - 1;
        let articleWithMaxIndex = articles[maxIndex];
        let articleId = articleWithMaxIndex.id + 1;
        article.id = articleId;
        this.articleService.createArticle(article).subscribe(statusCode =>{
          this.statusCode = statusCode;
          this.getAllArticles();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode );  
        });
      } else 
      {
        article.id = this.articleIdToUpdate;
        this.articleService.updateArticle(article).subscribe(statusCode =>{
          this.statusCode = 200;
          this.getAllArticles();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode); 
      }
    }
    loadArticleToEdit(articleId: string) {
      this.preProcessConfigurations();
      this.articleService.getArticleById(articleId).subscribe(article => {
				this.articleIdToUpdate = article.id;
				this.articleForm.setValue({ title: article.title, category: article.category });
				this.processValidation = true;
				this.requestProcessing = false;
			},
				errorCode => this.statusCode = errorCode);
    }
    deleteArticle(articleId:string)
    {
      this.preProcessConfigurations();
      this.articleService.deleteArticleById(articleId).subscribe(successCode =>{
        this.statusCode = 204;
        this.getAllArticles();
        this.backToCreateArticle();
      },  errorCode => this.statusCode = errorCode);
    }
    preProcessConfigurations() {
      this.statusCode = null;
      this.requestProcessing = true;
    }
    backToCreateArticle() {
      this.articleIdToUpdate = null;
      this.articleForm.reset();
      this.processValidation = false;
    }
  }

