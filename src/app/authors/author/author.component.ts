import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bio, Book } from 'src/app/books/model/book';
import { BooksService } from 'src/app/books/service/books.service';
import { Subscription } from 'rxjs';
import { AuthorBooksPipe } from '../../pipes/author-books.pipe';
import { NgIf } from '@angular/common';
import { Author } from 'src/app/books/model/book';

@Component({
  selector: 'app-book',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  standalone: true,
  imports: [NgIf, AuthorBooksPipe],
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  selectedAuthorBio!: String | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private booksService: BooksService = inject(BooksService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.subscription = this.booksService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        },
      });
      this.subscription = this.booksService.getAuthorBio(id).subscribe({
        next: (data: Bio) => {
          console.log(data);
          this.selectedAuthorBio = data.biodata;
        },
        error: (_: any) => {
          this.selectedAuthorBio = null;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
