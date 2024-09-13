
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Home';
import { GenderComponent } from './Components/GenderComponent';
import { IndustrySelection } from './Components/IndustrySelection';
import { ClickPhoto } from './Components/ClickPhoto';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/gender' element={<GenderComponent/>}></Route>
        <Route path='/industry' element={<IndustrySelection/>}/>
        <Route path='/clickphoto' element={<ClickPhoto/>}/>
      </Routes>
    </div>
  );
}

export default App;
