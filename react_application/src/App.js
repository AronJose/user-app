
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Router/index';


function App() {
  return (
    <div className="App">
        <Router />
        <ToastContainer position="top-right"
          autoClose={1000} />
    </div>
  );
}

export default App;
