import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService';
//import { getMovies } from '../services/MovieService';

import Pagination from '../components/comman/pagination';
import {Link} from 'react-router-dom';
import MoviesTable from '../components/comman/MoviesTable';
import { paginate } from '../components/comman/paginate';
import {getGenres} from '../services/fakeGenreService';
//import {getGenres} from '../services/genreService';
import ListGroup from './comman/ListGroup';

import _ from 'lodash';
import Buttons from './comman/Buttons';
import SearchBox from './comman/Searchbox';
import { toast } from 'react-toastify';



export default class Movies extends (Component,Buttons)  {
    state = {
        movies : [],
        genres : [],
        pageSize : 4,
        sortColumn :{path :'title' ,order: 'asc'},
        currentPage : 1,
        searchQuery:"",
        selectedGenre:null,
        
    };
    //componentDidMount(){
    async componentDidMount(){
        //const {data} = await getGenres();
        const Genre = [{_id:'', name:"All Genre"}, ...getGenres()]
       // const Genre = [{_id:'', name:"All Genre"}, ...data]
        //const {moviedata} = await getMovies()
        this.setState({ movies : getMovies() , genres : Genre })
       // this.setState({ movies : moviedata , genres : Genre })

    }
    handleGenreSelect = genre =>{
        this.setState({ selectedGenre : genre,searchQuery: "" , currentPage : 1})
    }
    handleSearch = query =>{
        this.setState({searchQuery: query ,selectedGenre: null ,currentPage: 1})
    }
    handleDelete = async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({movies : movies});
        try {
            await delete(movie._id);

        }
        catch(ex){
            if(ex.responce && ex.responce.status === 404) 
                toast.error("this movie is already been deletred or not found")
            this.setState({movies: originalMovies})
        }
        console.log(movie)
    }   
    handleHeart = movie =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };
    handlePageChange = page => {
        console.log('pages :', page);
        this.setState({currentPage : page})
    }
    handleSort = sortColumn =>{
        
        this.setState({ sortColumn });
       // console.log('sortColumn :', sortColumn)
    }
    getPageData = () =>{
        const {
            pageSize ,
            currentPage,
            selectedGenre ,
            searchQuery,
            movies :allMovies ,
            sortColumn
        } = this.state;
        let filtered = allMovies;
        if (searchQuery)
            filtered = allMovies.filter(m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        //const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m =>m.genre._id === selectedGenre._id): allMovies;
        const sorted = _.orderBy(filtered,[sortColumn.path], [sortColumn.order] );
        const movies = paginate(sorted ,currentPage ,pageSize);
        return ({totalColumn :filtered.length , data :movies})
       //return ({totalCount :filtered.length , data :movies})


    }
    render() {
        const { length : count} = this.state.movies;
         const {
             pageSize ,
             currentPage,
             searchQuery,
             sortColumn
         } = this.state;
         const { totalColumn ,data :movies} = this.getPageData();

        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m =>m.genre._id === selectedGenre._id): allMovies;
        // const sorted = _.orderBy(filtered,[sortColumn.path], [sortColumn.order] );
        // const movies = paginate(sorted ,currentPage ,pageSize);

        // if (this.state.movies.length === 0) {
        if (count === 0) {
            return "there is no movies listed in the database."
        }
        return (
            <>
            <div className="row">
            
                <div className="col-3">
                    <ListGroup
                    items={this.state.genres} 
                    selectedItem ={this.state.selectedGenre}
                    onItemSelected={this.handleGenreSelect}/>
            </div>
                <div className="col">
                {/* <form onSubmit={this.handleSubmit}>
                    {this.renderButton("Add Movie", <Link  to={"/addmovies/"}/>)}
                </form> */}
                <Link to="/addmovie/" className="btn btn-primary" style={{marginBottom:20}}>New Movie</Link>
                <Link to="/posts/" className="btn btn-primary" style={{marginBottom:20}}>Posts</Link>
                {/* <p>There are {filtered.length} movies listed in the database</p> */}
                <p>There are {totalColumn} movies listed in the database</p>
            {/* <p>There are {this.state.movies.length} movies listed in the database</p> */}
                <SearchBox value={searchQuery} onChange={this.handleSearch}/>
                <MoviesTable  
                    movies={movies} 
                    sortColumn ={sortColumn}
                    onLike={this.handleHeart}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}      
                />
                <div className="mx-5 float-right">
                        <Pagination 
                            items ={totalColumn}
                            pageSize ={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                            />
                        </div>
                    </div>
            </div>
            
            </>
        )
        
    }
  }
