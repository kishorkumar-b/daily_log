/* 
import { lazy, Suspense } from 'react'; */
import './App.css';
import React, { Suspense} from 'react';
import Portal from './component/createportal';
import Lifecycle from './component/Classcomponent';
import Functioncomponent from './component/Functioncomponent';
import Props from './component/Propes';
import Propsclass from './component/Propesinclass';
import Parent from './component/propeschildren';
import Reactlist from './component/reactlist';
import Parentclass from './component/event emmitor/parent';
import Formreact from './component/forminreact';
import SelectReact from './component/selectReact';
import Checkbox from './component/checkbox';
import Ratioreact from './component/ratioreact';
import SearchBar from './component/transitions';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import { Home ,About,Contact} from './reactrouthing/component';
import { Team,Company } from './reactrouthing/component';
import UseEffectHook from './component/useeffecthook';


/* const Portal = lazy(()=> import('./component/createportal')); */
function App() {
  return (
    <div className="App">
          <h1>Hello World</h1>
      <p>Welcome to React!</p>
     <Lifecycle/>
    <Functioncomponent/>
    <Props name="kishor" age="20"/>
    <Propsclass a={10} b={20}/>
    <Parent/>
    <Parentclass/>
    <Reactlist/>
    <Formreact/>
    <SelectReact/>
    <Checkbox/>
    
    <Ratioreact/>

      <Suspense fallback={<div>Loading...</div>}>
        <Portal/>
      </Suspense>
      <SearchBar/>
      <UseEffectHook/>

    </div>
/*     <BrowserRouter>

    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about/" element={<About/>}>
          <Route path="team" element={<Team />} />
          <Route path="company" element={<Company />} />
      </Route>
      <Route path="/contact/*" element={<Contact/>}/>
    </Routes>
    </BrowserRouter> */
  );
}

export default App;
