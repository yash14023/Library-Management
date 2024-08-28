import BookList from "./ReactComponents/BookList/BookList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import Member from "./ReactComponents/MemberList/Member";
import Transaction from "./ReactComponents/TransactionForm/Transaction";
import AddForm from "./ReactComponents/BookList/AddForm";
import EditForm from "./ReactComponents/BookList/EditForm";
import Tester from "./ReactComponents/Dashbord/DashBordMain";
import { useEffect} from "react";
import MemberForm from "./ReactComponents/MemberList/MemberForm";
import EditMemberForm from "./ReactComponents/MemberList/EditMemberForm";
import TransactionForm from "./ReactComponents/TransactionForm/TransactionForm";
import ReturnTransactionForm from "./ReactComponents/TransactionForm/ReturnTransaction";
import Layout from "./ReactComponents/Layout";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <div>
      <Router>
      <Layout>
      <Routes>
        <Route path="/booklist" element={<BookList />} />
        <Route path="/" element={<Tester />} />
        <Route path="/booklist/add" element={<AddForm />} />
        <Route path="/booklist/edit/:bookid" element={<EditForm />} />
        <Route path="/member" element={<Member />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/member/add" element={<MemberForm/>} />
        <Route path="/member/edit/:memberId" element={<EditMemberForm/>} />
        <Route path="/transaction/add" element={<TransactionForm/>} />
        <Route path="/transaction/edit/:transactionId" element={<TransactionForm/>} />
        <Route path="/transaction/return/:transactionId" element={<ReturnTransactionForm/>} />
        {/* <Route path="/import_book" element={<ImportBook />} /> */}
      </Routes>
  
    
    </Layout>
    </Router>
    </div>

  );
}

export default App;
