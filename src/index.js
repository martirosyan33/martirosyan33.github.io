import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
import { NotFound, List, Header, Detail } from './components';
import {BrowserRouter, Route, Switch} from 'react-router-dom'



const App = () =>{
  return (
    <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route exact path={'/'} component={List} />
        <Route path={'/currency/:id'} component={Detail} />
        <Route component={NotFound} />
      </Switch>
    </div>
    </BrowserRouter>
  )
}


ReactDom.render(
   <App/>,
  document.getElementById('root')
)