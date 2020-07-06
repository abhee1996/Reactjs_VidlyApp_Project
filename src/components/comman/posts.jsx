 import React, { Component } from 'react'
 import http from '../../services/httpServices';
 import config from "../../services/config.json";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
export default class Posts extends Component {
    state={
        posts:[]
    };
    async componentDidMount(){
        const promise = await http.get(config.apiEndpoint);
        //console.log('promise', promise)
        const {data :posts} = promise;
        console.log('responce', posts)

        this.setState({ posts })
    }
    handleAdd = async () =>{
        const obj ={title: "a", body:"b"};
        const promise = await http.post(config.apiEndpoint ,obj);
        const {data : post} =  promise;//http.post(config.apiEndpoint ,obj);
        console.log(post);
        const posts = [post , ...this.state.posts];
        this.setState({ posts});
        //console.log("Add", posts)
    }
    handleUpdate = async post =>{
        console.log("Update",post)
        post.title =  "UPDATED";
        await http.put(config.apiEndpoint  + "/" + post.id ,post);
        const posts = [...this.state.posts];
        const index = posts.indexOf(post);
        posts[index] ={...post}
        this.setState({posts})
    }
    handleDelete = async post =>{
        console.log("Delete",post);
        const OriginalPosts = this.state.posts;
        const posts = this.state.posts.filter(p => p.id !== post.id);
        this.setState({posts});
        try{
            await http.delete("s" + config.apiEndpoint + "/" + post.id);
        }
        catch(ex){
            if(ex.responce && ex.responce === 404)
                alert("This post is already deleted")
            //Expected-(404:Not Found,400-bad Request)-Client Error
            // Display a specfic error message
            //
            // else{
            //     console.log('Logging the error', ex)
            //     alert("An unexpected error occurred")
            // }
            //UnExpected -(Network error ,db error,server error,bug)
            // - Log them
            //Display a genre and friendly error message 
            this.setState({posts:OriginalPosts});
        }
        
    }
     

    render() {
        return (
            <>
            <ToastContainer/>
            <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>

<table className="table">
    <thead><tr>
    <th>Title</th>
    <th>Update</th>
    <th>Delete</th>    
    </tr></thead>
    <tbody>
    {this.state.posts.map( post =>(
        <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>                </td>
                <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>                </td>

        </tr>
            ))}
            
        
    </tbody>
</table>
            </>
        )
    }
}
