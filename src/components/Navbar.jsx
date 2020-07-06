import React from 'react'
import {NavLink, Link} from 'react-router-dom';
// export default class Navbar extends Component {
//     render() {
//         return (
//             <nav className="navbar navbar-light">
//                <a className="nav-link" href="#">Navbar <span className="badge">{this.props.totalCounters}</span></a> 

//             </nav >
//         )
//     }
// }

 const Navbar = ({totalCounters, user}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
               <Link className="nav-link navbar-brand" to="/">Vidly</Link> 
               <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
              </button>
                <div className="collapse navbar-collapse" >
                    <div className="navbar-nav ">
                        <NavLink className="nav-link" to="/movies" >Movies</NavLink> 
                        <NavLink className="nav-link" to="/addmovie/">Add Movies</NavLink>
                        <NavLink className="nav-link" to="/customer">Customers</NavLink>
                        <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                        <NavLink className="nav-link" to="/searchgituser">Search Git Users</NavLink>

                        {!user && (
                        <><NavLink className="nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-link" to="/register">Register</NavLink></>)}
                        {user && (
                        <>
                        <NavLink className="nav-link" to="/profile">{user.name}</NavLink>
                        <NavLink className="nav-link" to="/logout">Register</NavLink></>)}
                    </div>

                </div>

        </nav >
    );
};
export default Navbar;

    
