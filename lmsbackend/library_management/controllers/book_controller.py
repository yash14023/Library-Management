from flask import jsonify, request
from ..models.book import Book

class BookController:
    @staticmethod
    def get_all_books():
        try:
            books = Book.get_all()
            book_list = []
            for book in books:
                book_data = {
                    'bookID': book[0],
                    'title': book[1],
                    'author': book[2],
                    'status': book[14],
                    'publisher': book[11],
                }
                book_list.append(book_data)
            return jsonify(book_list)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @staticmethod
    def add_book():
        try:
            book_data = request.json
            new_book = Book(
                title=book_data.get('title'),
                authors=book_data.get('authors'),
                average_rating=book_data.get('average_rating'),
                isbn=book_data.get('isbn'),
                isbn13=book_data.get('isbn13'),
                language_code=book_data.get('language_code'),
                num_pages=book_data.get('num_pages'),
                ratings_count=book_data.get('ratings_count'),
                text_reviews_count=book_data.get('text_reviews_count'),
                publication_date=book_data.get('publication_date'),
                publisher=book_data.get('publisher'),
                publication_year=book_data.get('publication_year'),
                qty=book_data.get('qty'),
                status=book_data.get('status'),
                is_available=book_data.get('isAvailable')
            )
            
            if Book.add_book(new_book):
                return jsonify({"message": "Book added successfully!"}), 201
            return jsonify({"error": "Failed to add book"}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 500