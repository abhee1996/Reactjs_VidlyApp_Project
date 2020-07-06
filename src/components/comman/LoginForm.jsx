import React from 'react'
import Joi from 'joi-browser';
import Form from './Form';
import * as userService from '../../services/userService';
class LoginForm extends Form {
    //state object
    state ={
        data: {username :'', password :''},
        errors : {}
    }


    schema = {
        username: Joi.string()
        .required()
        .label("Username"),

        password: Joi.string()
        .required()
        .label("Password")
    }
    doSubmit =async () =>{
        console.log('Submitted')
        try{
            const {data} = this.state;
           const{data :jwt}= await userService.login(data.username , data.password);
           localStorage.setItem("token" ,jwt);
           //this.props.history.push("/");
           window.location = "/";

        }
        catch(ex){
            if (ex.response && ex.response.status === 400) return
              const errors= {...this.state.errors};
              errors.username = ex.response.data;
              this.setState({ errors });
        }
    }
    render(){
        //const {data , errors} = this.state;
        return (
            //it need single source of truth
            //make it a controlled component
            <div className="container">
                <h1>Login Now </h1>
                <form onSubmit={this.handleSubmit} >
                    {this.renderInput("username","Username")}
                    {this.renderInput("password","Password","password")}
                    
                    {this.renderButton("Login")}
                </form>
                
            </div>
        )
    }
}

export default LoginForm
