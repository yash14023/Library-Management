This project is a React-based library management system, with a backend built using Flask and a MySQL database. The project is structured into various sections like BookList, Dashboard, MemberList, and TransactionForm, each containing components specific to their functionalities, such as adding/editing books and members, managing transactions, and displaying lists.


Folder Structure Overview

ReactComponents

The main directory containing subdirectories for different parts of the application.
1. BookList

AddForm.jsx: A component for adding new books to the list.
BookList.jsx: Displays a list of books.
EditForm.jsx: A component for editing details of an existing book.
Dashbord (likely a typo for "Dashboard")

2. Dashboard

CommandDemo: This for the search feature
DashboardCard: representing individual cards on the dashboard
Dashboard.jsx: The main dashboard component.
SideBar.jsx: A sidebar component for navigation within the dashboard.

3. MemberList

EditMemberForm.jsx: A component for editing member details.
Member.jsx: Displays information about a single member.
MemberForm.jsx: A form component for adding or editing member details.

4. TransactionForm

ReturnTransactionForm.jsx: A form for handling book return transactions.
Transaction.jsx: Manages transaction details.
TransactionForm.jsx: A form component for handling different types of transactions,book issuance and edit thoes details.





After that there is a 
ReusableTable.jsx
A versatile and reusable component used across the entire project to display various types of data in a tabular format. This component handles functionalities like searching, selection, and editing, making it a central piece for data presentation within the application.










Backend Overview
Flask API: 
The backend is built using Flask, which serves as the API layer for the React frontend. It handles various operations such as CRUD operations for books, members, and transactions, as well as custom operations like issuing books or recording returns.

MySQL Database: 
The data is stored in a MySQL database, with tables likely representing entities like Books, Members, and Transactions. Flask interacts with this database to store and retrieve information as required by the frontend.



DataBase Name : lms 
MySQL Database: The data is stored in a MySQL database with the following tables:

Books Fields:
BookID (int, primary key)
Title (varchar)
Authors (varchar)
AverageRating (decimal)
Isbn (varchar)
Isbn13 (varchar)
LanguageCode (varchar)
NumPages (int)
RatingsCount (int)
TextReviewsCount (int)
PublicationDate (date)
Publisher (varchar)
PublicationYear (year)
Qty (int, default 0)
Status (varchar)
IsAvailable (tinyint, default 1)



Members
Fields:
id (int, primary key)
name (varchar)
email (varchar)
contact (varchar)
outstanding_debt (decimal, default 0.00)
date_of_registration (datetime, default current_timestamp)
status (enum, default 'active')



Transactions
Fields:
transaction_id (int, primary key)
book_id (int, foreign key)
member_id (int, foreign key)
issue_date (date)
return_date (date, nullable)
rent_fee (decimal)
status (enum, default 'issued')
fine_amount (decimal, nullable)
actual_return_date (date, nullable)
outstanding_debt (decimal, default 0.00)
current_due_amount (decimal, default 0.00)
Payment_of_Outstanding_Amount (decimal, nullable)


1. Landing Page
![image](https://github.com/user-attachments/assets/4c6518e7-aa5e-45ea-b192-6a78451c5d7f)

2. Book List 
![image](https://github.com/user-attachments/assets/6290cce7-2810-4303-8416-36207127be96)

3. Member List
![image](https://github.com/user-attachments/assets/f2212140-703d-42f3-b4c8-d260ee1477dc)

4. Transaction
![image](https://github.com/user-attachments/assets/aab5f2d1-7044-4813-bb35-90d66774d171)

Search Filter: 
![image](https://github.com/user-attachments/assets/cbd46134-8fef-461b-a195-aa697f1be628)

