import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import AppBar from './components/Appbar';
import Update from './components/Update';
import Delete from './components/Delete';
import axios from 'axios';

function App({store}) {
  function Page(){
    switch(store.getState().NavReducer){
      case "Login":
        return(<div><Login store={store} /></div>)
      case "Registration":
        return(<div><Registration/></div>)
      case "Update":
        return(<div><Update /></div>)
      case "Delete":
        return(<div><Delete /></div>)  
      default:
        return(<div><Login/></div>)      
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://kluniversity.irins.org/assets/profile_images/84501.png" alt="logo" />
        <p>
          Student Counselling Management System
        </p>
      </header>
      <div className="App-body">
        <AppBar store={store}/>
        <center><Page/></center>
      </div>
    </div>
  );
}

export default App;
