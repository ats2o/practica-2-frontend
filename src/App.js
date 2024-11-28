import './App.css';
import UpdateUser from './components/UpdateUser';
import Register from './components/Register';
import DeleteUser from './components/DeleteUser';
import Vote from './components/Vote';

function App() {
  const pageId = '123'; 
  return (
    <div className="App">
      < Register />
      < UpdateUser />
      <h1>User Management</h1>
            <Vote pageId={pageId} />
            <DeleteUser  />
      
    </div>
  );
}

export default App;