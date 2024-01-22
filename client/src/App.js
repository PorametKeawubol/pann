import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import LoginForm from './LoginForm';
import EntryPageforstaff from './EntryPageforstaff';


function App() {
  const clickMe = () => console.log('hello world')
  return (
    <div class="container">
      <LoginForm/>
      
    </div>
  );
}

export default App;

