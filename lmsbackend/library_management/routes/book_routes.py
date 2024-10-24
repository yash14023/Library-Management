from flask import Blueprint
from flask_cors import cross_origin
from ..controllers.book_controller import BookController

bp = Blueprint('books', __name__, url_prefix='/books')

@bp.route('/', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_books():
    return BookController.get_all_books()

@bp.route('/add', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def add_book():
    return BookController.add_book()

@bp.route('/<int:book_id>', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_book(book_id):
    return BookController.get_book_by_id(book_id)

@bp.route('/<int:book_id>', methods=['PUT'])
@cross_origin(origin="http://localhost:3000")
def update_book(book_id):
    return BookController.update_book(book_id)

@bp.route('/<int:book_id>', methods=['DELETE'])
@cross_origin(origin="http://localhost:3000")
def delete_book(book_id):
    return BookController.delete_book(book_id)