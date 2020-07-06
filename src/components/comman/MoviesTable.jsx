
import React, { Component } from 'react'
import Liked from './Liked';
import Table from './Table';
import {Link} from 'react-router-dom';

export default class MoviesTable extends Component {
    columns =[
    {path: "title" , label: "Title" , content:movie => <Link to={`/addmovie/${movie._id}`}>{movie.title}</Link>},
        {path: "genre.name" , label : "Genre"},
        {path: "numberInStock" , label: "Stock"},
        {path: "dailyRentalRate" , label : "Rate"},
        { key: "like" , 
          content : movie =><Liked liked={movie.liked} 
                                   onClick ={() =>this.props.onLike(movie)}/>},
        { key: "delete" , 
          content : movie => <button onClick={() => this.props.onDelete(movie)} 
                                     className="btn btn-danger">Delete</button>}
    ];
    
    render() {
    const { movies  ,onSort, sortColumn } = this.props;
    //const { movies , onLike , onDelete ,onSort, sortColumn } = this.props;
    return (  
    <Table 
        columns ={this.columns} 
        sortColumn ={sortColumn} 
        data={movies} 
        onSort={onSort}/>
);
    }
}

