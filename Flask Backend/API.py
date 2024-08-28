from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from datetime import datetime
import requests


from config import Config
app = Flask(__name__)
cors = CORS(app)
app.config.from_object(Config)



mysql = MySQL(app)

@app.route('/')
# @cross_origin(origin="http://localhost:4000")
@cross_origin(origin="*")
def home():
    print("This is a message from the home route.")
    return jsonify(message = "hello world")

@app.route('/db_check')
def db_check():
    try:
        cur = mysql.connection.cursor()  # Attempt to get a cursor
        cur.execute('''
            CREATE TABLE IF NOT EXISTS test_table (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50)
            )
        ''')         # Execute a simple query
        cur.close()                      # Close the cursor
        return jsonify(status="Database connected")
    except Exception as e:
        return jsonify(status="Database connection failed", error=str(e))


@app.route('/add_book', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def add_book():
    book_data = request.json
    title = book_data.get('title')
    authors = book_data.get('authors')
    average_rating = book_data.get('average_rating')
    isbn = book_data.get('isbn')
    isbn13 = book_data.get('isbn13')
    language_code = book_data.get('language_code')
    num_pages = book_data.get('num_pages')
    ratings_count = book_data.get('ratings_count')
    text_reviews_count = book_data.get('text_reviews_count')
    publication_date = book_data.get('publication_date')
    publisher = book_data.get('publisher')
    publication_year = book_data.get('publication_year')
    qty = book_data.get('qty')
    status = book_data.get('status')
    is_available = book_data.get('isAvailable')

    # Insert the book details into the database
    try:
        cur = mysql.connection.cursor() 

        add_book_query = '''
        INSERT INTO Books (Title, Authors, AverageRating, Isbn, Isbn13, LanguageCode, NumPages, RatingsCount, TextReviewsCount, PublicationDate, Publisher, PublicationYear, Qty, Status, IsAvailable)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''

        book_values = (title, authors, average_rating, isbn, isbn13, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher, publication_year, qty, status, is_available)

        cur.execute(add_book_query, book_values)
        mysql.connection.commit() 

        return jsonify({"message": "Book added successfully!"}), 201

    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cur.close()


@app.route('/bookdata', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_book():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Books')
        books = cur.fetchall()
        # print(books)
        cur.close()
        book_list = []
        for book in books:
            book_data = {
                'bookID': book[0],
                'title': book[1],
                'author': book[2],               
                'status': book[14],
                'publisher' : book[11],
            }
            # print(book_data)
            book_list.append(book_data)
        return jsonify(book_list)
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500


@app.route('/get_book/<int:book_id>', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_book_by_id(book_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Books WHERE bookId = %s', (book_id,))
        book = cur.fetchone()
        
        cur.close()
        
        if book:
            print(book)
            return jsonify(book)
        
        else:
            return jsonify({"message": "Book not found"}), 404
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500


@app.route('/update_book/<int:book_id>', methods=['PUT'])
@cross_origin(origin="http://localhost:3000")
def update_book(book_id):
    book_data = request.json
    title = book_data.get('title')
    authors = book_data.get('authors')
    average_rating = book_data.get('average_rating')
    isbn = book_data.get('isbn')
    isbn13 = book_data.get('isbn13')
    language_code = book_data.get('language_code')
    num_pages = book_data.get('num_pages')
    ratings_count = book_data.get('ratings_count')
    text_reviews_count = book_data.get('text_reviews_count')
    publication_date = book_data.get('publication_date')
    publisher = book_data.get('publisher')
    publication_year = book_data.get('publication_year')
    qty = book_data.get('qty')
    status = book_data.get('status')
    is_available = book_data.get('isAvailable')

    try:
        cur = mysql.connection.cursor()

        update_book_query = '''
        UPDATE Books
        SET Title = %s, Authors = %s, AverageRating = %s, Isbn = %s, Isbn13 = %s, LanguageCode = %s, NumPages = %s, RatingsCount = %s, TextReviewsCount = %s, PublicationDate = %s, Publisher = %s, PublicationYear = %s, Qty = %s, Status = %s, IsAvailable = %s
        WHERE bookId = %s
        '''

        book_values = (title, authors, average_rating, isbn, isbn13, language_code, num_pages, ratings_count, text_reviews_count, publication_date, publisher, publication_year, qty, status, is_available, book_id)

        cur.execute(update_book_query, book_values)
        mysql.connection.commit()

        return jsonify({"message": "Book updated successfully!"}), 200

    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cur.close()

@app.route('/get_total_books', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def total_book():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) FROM Books')
        total_books = cur.fetchone()
        # print(total_books)
        cur.close()
        return jsonify(total_books)
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500


@app.route('/add_member', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def add_member():
    member_data = request.json;
    name = member_data.get('name')
    email = member_data.get('email')
    contact = member_data.get('contact')
    date_of_registration = member_data.get('date_of_registration')
    outstanding_debt = member_data.get('outstanding_debt')
    status = member_data.get('status')
    try:
        cur = mysql.connection.cursor()
        add_member_query = '''
        INSERT INTO Member (Name, Email, Contact, Date_Of_Registration, Outstanding_Debt, Status)
        VALUES (%s, %s, %s, %s, %s, %s)
        '''
        member_values = (name, email, contact, date_of_registration, outstanding_debt, status)
        cur.execute(add_member_query, member_values)
        mysql.connection.commit()

        return jsonify({"message": "Member added successfully!"}), 201
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cur.close()

@app.route('/get_members', methods=['GET'])    
@cross_origin(origin="http://localhost:3000")
def get_member():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Member')
        members = cur.fetchall()
        cur.close()
        member_list = []
       
        for member in members:
            member_data = {
                'memberID': member[0],
                'name': member[1],
                'email': member[2],
                # 'contact': member[3],
                # 'date_of_registration': member[4],
                # 'outstanding_debt': member[5],
                'status': member[6]
            }

            member_list.append(member_data)
            # print(member_list)
        return jsonify(member_list)
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500


# def get_member(member_id):
#     try:
#         cur = mysql.connection.cursor()
#         cur.execute('SELECT * FROM Member')
#         member = cur.fetchall()
#         cur.close()
        

@app.route('/get_total_member', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_total_members():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT COUNT(*) FROM Member')
        total_members = cur.fetchone()
        cur.close()
        return jsonify(total_members)
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/update_member/<int:member_id>', methods=['PUT'])
@cross_origin(origin="http://localhost:3000")
def update_member(member_id):
    member_data = request.json
    name = member_data.get('name')
    email = member_data.get('email')
    contact = member_data.get('contact')
    date_of_registration = member_data.get('date_of_registration')
    outstanding_debt = member_data.get('outstanding_debt')
    status = member_data.get('status')

    try:
        cur = mysql.connection.cursor()

        update_member_query = '''
        UPDATE Member
        SET Name = %s, Email = %s, Contact = %s, Date_Of_Registration = %s, Outstanding_Debt = %s, Status = %s
        WHERE ID = %s
        '''

        member_values = (name, email, contact, date_of_registration, outstanding_debt, status, member_id)

        cur.execute(update_member_query, member_values)
        print(member_values)
        mysql.connection.commit()

        return jsonify({"message": "Member updated successfully!"}), 200

    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cur.close()

@app.route('/get_member_by_id/<int:memberId>', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_member_by_id(memberId):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Member WHERE ID = %s', (memberId,))
        member = cur.fetchone()
        print(member)
        cur.close()
        
        if member:
            return jsonify(member)
        else:
            return jsonify({"message": "Member not found"}), 404
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500




@app.route('/get_book_options', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_book_options():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Books Where Qty > 0')
        books = cur.fetchall()
        cur.close()
        book_list = []
        for book in books:
            book_data = {
                'bookID': book[0],
                'title': book[1]
            }
            book_list.append(book_data)
        return jsonify(book_list)
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500


@app.route('/get_members_option', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_members_option():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Member')
        members = cur.fetchall()
        cur.close()
        member_list = []
        for member in members:
            member_data = {
                'memberID': member[0],
                'name': member[1],
                'email': member[2]
            }
            member_list.append(member_data)
        return jsonify(member_list)
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500
    

@app.route('/add_transaction', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def create_transaction(): 
    transaction_data = request.json
    print(transaction_data)
    # sprint(transaction_data)
    member_id = transaction_data.get('memberId')
    book_id = transaction_data.get('bookId')
    issue_date = transaction_data.get('issueDate')
    return_date = transaction_data.get('returnDate')
    rent_fee = transaction_data.get('rentFee')
    status = transaction_data.get('status').lower()
    outstanding_debt = transaction_data.get('outStandingDebt')
    current_due_amount = transaction_data.get('currentDueAmount')
    try:
        cur = mysql.connection.cursor()
        add_transaction_query = '''
        INSERT INTO Transaction (member_id,book_id, issue_date, return_date, rent_fee, status,outstanding_debt,current_due_amount)
        VALUES (%s,%s, %s, %s, %s, %s,%s,%s)
        '''
        transaction_values = (member_id,book_id, issue_date, return_date, rent_fee, status,outstanding_debt,current_due_amount)
        print(transaction_values)
        cur.execute(add_transaction_query, transaction_values)
        update_book_query = '''
        UPDATE Books
        SET qty = GREATEST(qty - 1, 0),
        IsAvailable = CASE WHEN GREATEST(qty - 1, 0) > 0 THEN 1 ELSE 0 END,
        status = CASE WHEN GREATEST(qty - 1, 0) > 0 THEN status ELSE 'unavailable' END
        WHERE BookId = %s
        '''
        cur.execute(update_book_query, (book_id,))
        cur.execute(update_book_query, (book_id,))
        mysql.connection.commit()
        return jsonify({"message": "Transaction added successfully!"}), 201
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/get_transactions', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_transaction():
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Transaction')
        transactions = cur.fetchall()
        cur.close()
        transaction_list = []
        for transaction in transactions:
            issue_date = transaction[3].strftime('%d/%m/%Y') if transaction[3] else None
            return_date = transaction[4].strftime('%d/%m/%Y') if transaction[4] else None
            transaction_data = {
                'transactionID': transaction[0],
                'memberID': transaction[1],
                'bookID': transaction[2],
                'issueDate': issue_date,
                'returnDate': return_date,
                'rentFee': transaction[5],
                'status': transaction[6]
            }
            transaction_list.append(transaction_data)
        return jsonify(transaction_list)
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/get_transaction_by_id/<int:transactionId>', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def get_transaction_by_id(transactionId):
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM Transaction WHERE transaction_id = %s', (transactionId,))
        transaction = cur.fetchone()
        cur.close()
        print(transaction)
        if transaction:
            return jsonify(transaction)
        else:
            return jsonify({"message": "Transaction not found"}), 404
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500    
    
@app.route('/update_transaction/<int:transaction_id>', methods=['PUT'])
@cross_origin(origin="http://localhost:3000")
def update_transaction(transaction_id):
    try:
        transaction_data = request.json
        print(transaction_data)
        
        member_id = transaction_data.get('memberId')
        book_id = transaction_data.get('bookId')
        issue_date = transaction_data.get('issueDate')
        return_date = transaction_data.get('returnDate')
        rent_fee = transaction_data.get('rentFee')
        status = transaction_data.get('status')
        outstanding_debt = transaction_data.get('outStandingDebt')
        current_due_amount = transaction_data.get('currentDueAmount')
        cur = mysql.connection.cursor()
        update_transaction_query = '''
        UPDATE Transaction
        SET member_id = %s, book_id = %s, issue_date = %s, return_date = %s, rent_fee = %s, status = %s,outstanding_debt = %s,current_due_amount = %s
        WHERE transaction_id = %s
        '''
        transaction_values = (member_id, book_id, issue_date, return_date, rent_fee, status, outstanding_debt,current_due_amount,transaction_id)
        print(transaction_values)
        cur.execute(update_transaction_query, transaction_values)
        mysql.connection.commit()
        return jsonify({"message": "Transaction updated successfully!"}), 200
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/update_return_transaction/<int:transaction_id>', methods=['PUT'])
@cross_origin(origin="http://localhost:3000")
def update_return_transactions(transaction_id):
    try:
        cur = mysql.connection.cursor()
        return_data = request.json
        print(return_data)
        
        cur.execute("SELECT status FROM Transaction WHERE transaction_id = %s", (transaction_id,))
        current_status = cur.fetchone()[0]

        actual_return_date = return_data.get('actualReturnDate')
        new_status = return_data.get('status').lower()
        print(new_status)
        fine_amount = return_data.get('fineAmount')
        payment_of_outstanding_amount = return_data.get('paymentOfOutStanding')
        member_id = return_data.get('memberId')
        book_id = return_data.get('bookID')
        

        update_return_transaction_query = '''
        UPDATE Transaction SET actual_return_date = %s, status = %s, fine_amount = %s, Payment_of_Outstanding_Amount = %s WHERE transaction_id = %s
        '''
        return_values = (actual_return_date, new_status, fine_amount, payment_of_outstanding_amount, transaction_id)
        cur.execute(update_return_transaction_query, return_values)

        # Only update book quantity if the status is changing from 'issued' to 'returned'
        if new_status == 'returned':
            update_book = '''
            UPDATE Books SET qty = qty + 1,
            IsAvailable = CASE WHEN qty + 1 > 0 THEN 1 ELSE 0 END,
            status = CASE WHEN qty + 1 > 0 THEN 'available' ELSE 'unavailable' END
            WHERE BookId = %s;  
            '''
            cur.execute(update_book, (book_id,))
            mysql.connection.commit()
            update_member_debt = '''
            UPDATE Member
            SET outstanding_debt =  outstanding_debt + %s
            WHERE Id = %s
            '''
            cur.execute(update_member_debt, (payment_of_outstanding_amount, member_id))
        mysql.connection.commit()
        return jsonify({"message": "Transaction updated successfully!"}), 200

    except mysql.connection.Error as err:
        mysql.connection.rollback()
        return jsonify({"error": str(err)}), 500
    finally:
        cur.close()




        
@app.route('/import_books', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def import_books(books_data):
    # print(books_data)
    # books_data = request.json
    
    try:
        cur = mysql.connection.cursor()
        
        add_book_query = '''
        INSERT INTO Books (BookID,Title, Authors, AverageRating, Isbn, Isbn13, LanguageCode, NumPages, RatingsCount, TextReviewsCount,PublicationDate, Publisher, PublicationYear, Qty, Status, IsAvailable)
        VALUES (%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        
        for book_data in books_data:
            book_data = {key.strip(): value for key, value in book_data.items()}
            publication_date = book_data.get('publication_date')
            publication_year = None
            if publication_date:
                try:
                    publication_date = datetime.strptime(publication_date, '%m/%d/%Y').date()
                    publication_year = publication_date.year 

                    # print(type(publication_date))
                    # print(publication_date)
                except ValueError:
                    publication_date = ''
                    publication_year = ''

            # publication_year = book_data.get('publication_year', '')
            # if publication_year:
            #     try:
            #         publication_year = int(publication_year)
            #     except ValueError:
            #         publication_year = ''
            # print(type(publication_year))
            book_values = (
                 book_data.get('bookID'),                      # BookID
                    book_data.get('title', ''),                   # Title
                    book_data.get('authors', ''),                 # Authors
                    book_data.get('average_rating', 0.0),         # AverageRating
                    book_data.get('isbn', ''),                    # Isbn
                    book_data.get('isbn13', ''),                  # Isbn13
                    book_data.get('language_code', ''),           # LanguageCode
                    eval(book_data.get('num_pages', 0)),          # NumPages
                    book_data.get('ratings_count', 0),            # RatingsCount
                    book_data.get('text_reviews_count', 0),       # TextReviewsCount
                    publication_date,                             # PublicationDate
                    book_data.get('publisher', ''),               # Publisher
                    publication_year,                             # PublicationYear
                    book_data.get('qty', 1),                      # Qty
                    book_data.get('status', 'Available'),         # Status
                    book_data.get('isAvailable', True)  
            )
            # print(book_values)
            # print(add_book_query % book_values)

            # check = cur.execute('SELECT * FROM Books WHERE BookID = %s', (book_data.get('bookID'),))
            # if check:
            #     update_book_query = ''' UPDATE Books         
            #     SET Title = %s, Authors = %s, AverageRating = %s, Isbn = %s, Isbn13 = %s, LanguageCode = %s, NumPages = %s, RatingsCount = %s, TextReviewsCount = %s, PublicationDate = %s, Publisher = %s, PublicationYear = %s, Qty = %s, Status = %s, IsAvailable = %s
            #     WHERE bookId = %s'''
               # cur.execute(update_book_query,  book_values[1:] + (book_data.get('bookID'),))
            # else:
            cur.execute(add_book_query, book_values)
        
        mysql.connection.commit()
        
        return jsonify({"message": "Books imported successfully!"}), 201

    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

    finally:
        cur.close()



        
@app.route('/update_customer_outstanding', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def update_member_debt():
    try:
        member_id = request.json.get('member_id')
        outstanding_debt = request.json.get('additional_debt')

        if member_id is None or outstanding_debt is None:
            return jsonify({"error": "member_id and outstanding_debt are required"}), 400

        cur = mysql.connection.cursor()

        update_member_debt_query = '''
        UPDATE Member
        SET outstanding_debt =  outstanding_debt + %s
        WHERE Id = %s
        '''

        cur.execute(update_member_debt_query, (outstanding_debt, member_id))
        mysql.connection.commit()

        return jsonify({"message": "Member debt updated successfully"}), 200
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500


@app.route('/delete_book_by_id/<int:bookID>', methods=['DELETE'])
@cross_origin(origin="http://localhost:3000")
def delete_single_book(bookID):
    try:
        cur = mysql.connection.cursor()

        delete_book_query = '''
        DELETE FROM Books
        WHERE BookId = %s
        '''
        cur.execute(delete_book_query, (bookID,))
        mysql.connection.commit()
        return jsonify({"message": f"Book with ID {bookID} deleted successfully"}), 200
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500




@app.route('/delete_member_by_id/<int:Id>', methods=['DELETE'])
@cross_origin(origin="http://localhost:3000")
def delete_single_Member(Id):
    try:
        cur = mysql.connection.cursor()

        delete_book_query = '''
        DELETE FROM Member
        WHERE Id = %s
        '''
        cur.execute(delete_book_query, (Id,))
        mysql.connection.commit()
        return jsonify({"message": f"Book with ID {Id} deleted successfully"}), 200
    except mysql.connection.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/books_on_loan', methods=['GET'])
@cross_origin(origins='http://localhost:3000')
def book_on_loan():
    try:
       cur = mysql.connection.cursor()
       count_query =''' 
        SELECT COUNT(*) FROM `transaction` WHERE `status` = 'issued'
        '''
       cur.execute(count_query)
       count_result = cur.fetchone()
       count = count_result[0] if count_result else 0
       return jsonify({"loans": count})  
    except mysql.connection.Error as err: 
        return jsonify({'error': str(err)}), 500

@app.route('/total_transaction', methods=['GET'])  
@cross_origin(origins='http://localhost:3000')
def total_transaction():
    try:
        cur = mysql.connection.cursor()
        count_query = '''SELECT COUNT(*) FROM `transaction`'''
        cur.execute(count_query)
        count_result = cur.fetchone()
        count = count_result[0] if count_result else 0
        cur.close() 
        return jsonify({"totalTransactions":count})
    except Exception as err: 
        return jsonify({'error': str(err)}), 500
    
# @app.route('/delete_transaction_by_id/<int:id>', methods=['DELETE'])
# def delete_transaction(id):
#     try: 
#         cur = mysql.connection.cursor()
#         get_due_amount = '''
#         SELECT current_due_amount, member_id FROM Transaction WHERE transaction_id = %s
#         '''
#         cur.execute(get_due_amount, (id,))
#         transaction = cur.fetchone()
#         print(transaction)
#         if transaction is None:
#             return jsonify({'error': 'Transaction not found'}), 404
#         current_due_amount, member_id = transaction
#         delete_transaction = '''
#         DELETE FROM Transaction WHERE transaction_id = %s
#         '''
#         cur.execute(delete_transaction, (id,))
#         mysql.connection.commit()
#         clear_outstanding = '''
#         UPDATE Member
#         SET outstanding_debt = outstanding_debt - %s
#         WHERE id = %s
#         '''
#         cur.execute(clear_outstanding, (current_due_amount, member_id))
#         mysql.connection.commit()

#         return jsonify({'message': 'Transaction and associated data cleared successfully'}), 200
#     except mysql.connection.Error as err:
#         return jsonify({'error': str(err)}), 500
#     finally:
#         cur.close()

@app.route('/delete_transaction_by_id/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    try:
        cur = mysql.connection.cursor()

        # Print the ID being processed
        print(f"Processing delete for transaction ID: {id}")

        # Retrieve current due amount and member ID
        get_due_amount = '''
        SELECT current_due_amount, member_id FROM Transaction WHERE transaction_id = %s
        '''
        cur.execute(get_due_amount, (id,))
        transaction = cur.fetchone()

        # Print retrieved transaction data
        print(f"Transaction data retrieved: {transaction}")

        if transaction is None:
            print("Transaction not found")
            return jsonify({'error': 'Transaction not found'}), 404

        current_due_amount, member_id = transaction

        # Print current due amount and member ID
        print(f"Current due amount: {current_due_amount}, Member ID: {member_id}")

        # Delete the transaction
        delete_transaction = '''
        DELETE FROM Transaction WHERE transaction_id = %s
        '''
        cur.execute(delete_transaction, (id,))
        mysql.connection.commit()
        print("Transaction deleted")

        # Update member's outstanding debt
        clear_outstanding = '''
        UPDATE Member
        SET outstanding_debt = outstanding_debt - %s
        WHERE id = %s
        '''
        cur.execute(clear_outstanding, (current_due_amount, member_id))
        mysql.connection.commit()
        print("Member's outstanding debt updated")

        return jsonify({'message': 'Transaction and associated data cleared successfully'}), 200

    except Exception as err:
        # Print the error message
        print(f"Error occurred: {str(err)}")
        return jsonify({'error': str(err)}), 500

    finally:
        cur.close()
        print("Cursor closed")







# @app.route('delete_transaction_by_id/<int:memberID>',methods=['DELETE'])
# def delete_transaction(id):
#     try: 
#         cur = mysql.connection.cursor()

#         delete_transaction = '''
#         DELETE FROM Transaction
#         Where transaction_id = %s
#         '''
#         cur.execute(delete_transaction,(id,))
#         mysql.connection.commit()

#         clear_outstanding = '''

#         '''
#     except mysql.connection.Error as err:
#         return jsonify({'error' : str(err)}), 500
#     pass


API_URL = "https://frappe.io/api/method/frappe-library?page=2&title=and"

@app.route('/api/proxy', methods=['GET'])
def proxy_request():
    query_params = request.args
    response = requests.get(API_URL, params=query_params)
    try:
        import_books(response.json().get('message', []))
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return jsonify(response.json()), response.status_code


if __name__ == '__main__':
    app.run(debug=True)





# @app.route('/books_on_loan',method=['GET'])
# @cross_origin(origins='http://localhost:3000')
# def book_on_loan():
#     try:
#         cur = mysql.connection.cursor()
#         loan_query = '''
#             SELECT * FROM `transaction` WHERE `status` = 'issued';
#         '''
#         cur.execute(loan_query)
#         loans = cur.fetchall()
#         print(loan)
#         cur.close()
#         loan_list = []
#         for loan in loans:
#             loan_list = {
              
#             }
#         mysql.connection.commit()
#         return jsonify({"message : "})
#     except mysql.connection.Error as err:
#         return jsonify({'error': str(err)}), 500