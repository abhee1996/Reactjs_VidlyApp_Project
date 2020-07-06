import React, { Component } from 'react';
import {Route , Switch, Redirect} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
//import Counters from './components/counters';
//import Teacher from './Teacher';
import jwtDecode from "jwt-decode";
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/comman/NotFound';
import './App.css';
import MovieForm from './components/movies/MovieForm';
import LoginForm from './components/comman/LoginForm';
import RegisterForm from './components/comman/RegisterForm';
import AddMovie from './components/movies/AddMovie';
import Posts from './components/comman/posts';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './components/comman/Logout';
import SearchGitUsers from './UserSearchAPi/GItUserSearchApi';




//lesson15 Array Mapping
//const colors =['red','yellow' ,'green']
//const colors1 =['blue','white' ,'orange']
//const colors2 =['grey','purple' ,'cyan']
// const items = colors.map(function(color){
//   return '<li>' + color + '</li>';
// });
//const items1 = colors1.map(color => '<li>' + color+  '</li>')

//const items2 = colors2.map(color =>`<li>${color}</li>`);
//console.log(items, items1, items2)

//lesson16 destructuring
// const address ={
//   street: 'Allama Iqbal Town',
//   city: 'Lahore',
//   country: 'Pakistan'
// };
//long way
// const street = address.street;
// const city = address.city;
// const country = address.country;
// destructured way +alius
//const { street :st ,city :ct , country :cnty} = address;
 //console.log(st,ct,cnty);

 // => lesson 17 Spread operators (...spreadOperators)
//const first = [1,2,3,4]
//const second = [5,6,7,8]

//const combined1 = first.concat(second);
//use spread operators
//const combined2 = [...first , ...second]
//const combined3 = [...first, 'a' , ...second ,'b']

//console.log('combined1 via concate' ,combined1, 'combined2 ',combined2,'combined3 ',combined3)
 
//lesson 19-Inheritance  btw person and teacher & lesson:20 MOdules
// const teacher = new  Teacher("Mosh", 'MSC');
//   teacher.teach();


class App  extends Component{
  
  state = {  };
  // state = {
  //   counters : [
  //     {id: 1 ,value: 2},
  //     {id: 2 ,value: 0},
  //     {id: 3 ,value: 0},
  //     {id: 4 ,value: 0}
  //   ]
  // }
  handleIncrement = counter =>{
    const counters = [...this.state.counters];
     
    const index =counters.indexOf(counter);
    counters[index] = {...counter};
    counters[index].value++;
    this.setState({ counters });
  }
  handleMinus = counter =>{
    const counters = [...this.state.counters];
     
    const index =counters.indexOf(counter);
    counters[index] = {...counter};
    counters[index].value--;
    this.setState({ counters });
  }
  handleReset = () =>{
    const counters = this.state.counters.map(c =>{
      c.value = 0;
      return c;
    })

    this.setState({counters})
  }
  handleDelete = counterId =>{
    const counters = this.state.counters.filter(m =>m.id !== counterId);
    this.setState({
      counters : counters
    })

  }
  componentDidMount(){
    try{
      const jwt = localStorage.getItem("token");
      const  user  = jwtDecode(jwt);
      this.setState({user});

    }
    catch(ex){

    }
  }
  
  render(){

    return (
      < >
      <ToastContainer />
      <Navbar user={this.state.user}/>

      <Switch>
      
        <Route path="/" exact  component={Movies}/>
        <Route path="/movies/:id" component={MovieForm}/>
        <Route path="/movies/" component={Movies}/>
       <Route path="/addmovie" component={AddMovie}/> 
        
        {/* <Redirect from ='/'  to="/movies"/> */}
        <Route path="/customer/" component={Customers}/>
        <Route path="/rentals/" component={Rentals}/>
        <Route path="/register/" component={RegisterForm}/>
        <Route path="/login/" component={LoginForm}/>
        <Route path="/logout/" component={Logout}/>
        <Route path="/posts/" component={Posts}/>
        <Route path="/searchgituser/" component={SearchGitUsers}/>
         <Redirect to="/not-found"/>  
        <Route path="/not-found" component={NotFound}/>
        
      
      
      </Switch>
       </>
    );
  }
}

export default App;

//person.talk();

{/* <main className="main">
         <Counters 
            onIncrement ={this.handleIncrement}
            onReset = {this.handleReset}
            onDelete = {this.handleDelete}
            onMinus = {this.handleMinus}
            counters = {this.state.counters}/> 
        </main> */}