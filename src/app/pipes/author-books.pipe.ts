import { Pipe, PipeTransform } from '@angular/core';
import { Author, Book } from '../books/model/book';

@Pipe({
  name: 'authorBooks',
  standalone: true,
})
export class AuthorBooksPipe implements PipeTransform {
  transform(value: any): string {
    console.log(value);
    return (
      'Author: ' +
      `${value.firstName}, ${value.lastName} <br>` +
      'Books:<br>' +
      value.books.map((book: { title: any }) => `${book.title}`).join('<br>')
    );
  }
}
