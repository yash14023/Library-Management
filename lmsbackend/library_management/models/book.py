from app import mysql

class Book:
    def __init__(self, title, authors, average_rating, isbn, isbn13, language_code, 
                 num_pages, ratings_count, text_reviews_count, publication_date, 
                 publisher, publication_year, qty, status, is_available):
        self.title = title
        self.authors = authors
        self.average_rating = average_rating
        self.isbn = isbn
        self.isbn13 = isbn13
        self.language_code = language_code
        self.num_pages = num_pages
        self.ratings_count = ratings_count
        self.text_reviews_count = text_reviews_count
        self.publication_date = publication_date
        self.publisher = publisher
        self.publication_year = publication_year
        self.qty = qty
        self.status = status
        self.is_available = is_available

    @staticmethod
    def get_all():
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Books')
        books = cur.fetchall()
        cur.close()
        return books

    @staticmethod
    def add_book(book_data):
        cur = mysql.connection.cursor()
        try:
            add_book_query = '''
            INSERT INTO Books (Title, Authors, AverageRating, Isbn, Isbn13, 
                             LanguageCode, NumPages, RatingsCount, TextReviewsCount, 
                             PublicationDate, Publisher, PublicationYear, Qty, 
                             Status, IsAvailable)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            '''
            book_values = (book_data.title, book_data.authors, book_data.average_rating,
                         book_data.isbn, book_data.isbn13, book_data.language_code,
                         book_data.num_pages, book_data.ratings_count,
                         book_data.text_reviews_count, book_data.publication_date,
                         book_data.publisher, book_data.publication_year,
                         book_data.qty, book_data.status, book_data.is_available)
            
            cur.execute(add_book_query, book_values)
            mysql.connection.commit()
            return True
        except Exception as e:
            print(f"Error adding book: {e}")
            return False
        finally:
            cur.close()