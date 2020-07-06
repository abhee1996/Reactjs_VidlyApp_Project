import React from 'react'
import Form from './Form'
import Joi from 'joi-browser';
import * as userService from "../../services/userService";


export default class RegisterForm extends Form {
    state={
        data:{fullname:'',username:'',password:''},
        errors:{}
    }
    schema ={
        fullname : Joi.string().required().label("FullName"),
        username : Joi.string().email().required().label("UserName"),
        password: Joi.string().min(5).required().label("Password")
    }
    doSubmit = async () =>{
        console.log('Submitted')
      try{ 
          const response = await userService.register(this.state.data);
          localStorage.setItem("token", response.headers["x-auth-token"]);
          //this.props.history.push("/");
          window.location = "/";

          console.log(response)
      }
      catch(ex){
          if( ex.response && ex.response.status === 400) return
            const errors ={ ...this.state.errors };
            errors.username = ex.response.data;
            this.setState({ errors });  
      }
    }
    render() {
        return (
            <div className="container">
                <h1>Register Now</h1>
                <form onSubmit={this.handleSubmit}>
                {this.renderInput("fullname","Full Name")}
                {this.renderInput("username","User Name")}
                {this.renderInput("password", "Password")}
                {this.renderButton("Register")}
                </form>
                
            </div>
        )
    };
}
