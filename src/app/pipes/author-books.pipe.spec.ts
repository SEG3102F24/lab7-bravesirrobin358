import { AuthorBooksPipe } from './author-books.pipe';

describe('AuthorBooksPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorBooksPipe();
    expect(pipe).toBeTruthy();
  });
});
