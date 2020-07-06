import React, {useState} from 'react'
import axios from 'axios';
import { Form } from 'semantic-ui-react';

const SearchGitUsers = ({}) => {
    const [users, setUsers] = useState([]);
    const [query , setQuery] = useState("");
    const searchUsers =(query) =>{
        axios.get(`https://api.github.com/search/users?q=${query}`)
        .then(response =>{
            setUsers(response.data.items)

        })
    }
    const change = e =>{
        setQuery(e.target.value)
    }
    return (
        <div className="container">
             <Form onSubmit={e =>{searchUsers(query)}}>
                        <Form.Group>
                        <Form.Input onChange={change} value={query} placeholder="search user" name="github user"/>
                        <Form.Button  type="submit" content="search"/>
                    </Form.Group>
                </Form>
                <div className="row">
                    {users.map(user =>
                        (
                            <div key={user.id} className="card mb-3">
                            <h1>Our Users</h1>
                            
                            <div className="card-body">
                                <div className="card-title">
                                    Name: {user.name}
                                </div>
                                <p className="card-text">UserName: {user.name}</p>
                                <p className="card-text">followers:{user.follower}</p>
                                <p className="card-text">repos: {user.public_repos}</p>
                                <p className="card-text">following:{user.following}</p>
                                <p className="card-text"><img src={user.avatar_url}  alt="Logo" /></p>    
                            </div>
                        </div>
                        )
                    )}
                </div>
        </div>
    )
}

export default SearchGitUsers
