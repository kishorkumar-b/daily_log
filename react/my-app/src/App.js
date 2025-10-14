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
import Forref from './component/forwardref/parent';
import Component1 from './component/Hook/context';
import Sespensetrans from './component/suspense+transaction/suspenseandtransaction';
import Counter from './component/Hook/usereducerhook';
import CallbackHook from './component/Hook/callbackHook';
import Localstorage from './component/local storage/Localstorage';
import Usemamo from './component/Hook/useMemo';
import Cookieexamp from './component/cookies/example';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import { Home ,About,Contact} from './reactrouthing/component';
import { Team,Company } from './reactrouthing/component';
import UseEffectHook from './component/Hook/useeffecthook';
import CounterComponent from './component/Hook/Custom Hook/countercomponent';


/* const Portal = lazy(()=> import('./component/createportal')); */
function App() {
  return (
    <div className="App">
          <h1>Hello World</h1>
      <p>Welcome to React!</p>
     <Lifecycle/>
     <hr/>
    <Functioncomponent/>
    <hr/>
    <Props name="kishor" age="20"/>
    <hr/>
    <Propsclass a={10} b={20}/>
    <hr/>
    <Parent/>
    <hr/>
    <Parentclass/>
    <hr/>
    <Reactlist/>
    <hr/>
    <Formreact/>
    <hr/>
    <SelectReact/>
    <hr/>
    <Checkbox/>
    <hr/>
    <Ratioreact/>
    <hr/>
      <Suspense fallback={<div>Loading...</div>}>
        <Portal/>
      </Suspense>
      <hr/>
      <SearchBar/>
      <hr/>
      <UseEffectHook/>
      <hr/>
      <Sespensetrans/>
      <hr/>
      <Forref/>
      <hr/>
      <Component1/>
      <hr/>
      <Counter/>
      <hr/>
      <CallbackHook/>
      <hr/>
      <CounterComponent/>
      <hr/>
      <Localstorage/>
      <hr/>
      <Usemamo/>
      <hr/>
      <Cookieexamp/>
      <hr/>
          <BrowserRouter>

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
    </BrowserRouter>
    </div>

  );
}

export default App;
