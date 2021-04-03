import React from 'react'
import Footer from './components/Footer'
import User from "./components/User"
import Loader from './components/loader'
import MyData from './components/MyData'
import {Switch,Route,Redirect} from 'react-router-dom'
const App =  ()=>{
return(

  <>
  <Switch>
    <Route exact path="/" component={User} />
    <Route exact path="/myData" component={MyData} />
    <Route component={()=>{ return (<Loader error='1000'/>)}} />
   </Switch>
  <Footer/>
  </>
)
}

export default App