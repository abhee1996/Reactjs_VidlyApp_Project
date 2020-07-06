import React from 'react'
import Form from '../comman/Form'
import Joi  from 'joi-browser';
import { getGenres } from './../../services/fakeGenreService';
//import { getGenres } from './../../services/genreService';

 import { getMovie ,saveMovie } from './../../services/fakeMovieService';
//import { getMovie ,saveMovie } from './../../services/MovieService';

export default class AddMovie extends Form {
    state={
        data:{title:"",genreId:"",numberInStock:"",dailyRentalRate:""},
        genres:[],
        errors:{}
    }
    schema={
        _id: Joi.string(),
        title : Joi.string()
                .required()
                .label("Title"),
        genreId : Joi.string()
                .required()
                .label("Genre"),
        numberInStock : Joi.number()
                .required()
                .min(0)
                .max(100)
                .label("Stock"),
        dailyRentalRate : Joi.number()
                .required()
                .min(0)
                .max(10)
                .label("Rate"),

    }
    //for fake movie services
     componentDidMount(){
         const genres = getGenres();
         this.setState({ genres });

         const movieId = this.props.match.params.id;
         if(movieId === "new") return;
         const movie = getMovie(movieId);
         if(!movie) return this.props.history.replace("/addmovie/");
         this.setState({data: this.mapToViewModel(movie) });
     };

    //for db movie service
    async populateGenre(){
        //const genres = getGenres();
        const {data : genres} = await getGenres();

        this.setState({ genres });
    }
    async populateMovie(){
        try{
        const movieId = this.props.match.params.id;
        if(movieId === "new") return;
        //const movie = getMovie(movieId);
        const {data : movie } = await getMovie(movieId);
        this.setState({data: this.mapToViewModel(movie) });
        }
        catch(ex){
            if(ex.responce && ex.responce.status === 404) 
                this.props.history.replace("/addmovie/");
        }
    }
    // async componentDidMount(){
    //     await this.populateGenre();
    //     await this.populateMovie();
        
    // };
    mapToViewModel(movie){
        return{
            _id : movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock : movie.numberInStock,
            dailyRentalRate : movie.dailyRentalRate
        };
    }
    doSubmit = () =>{
        saveMovie(this.state.data);
        this.props.history.push("/movies/");
        console.log('Submitted')
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h1 >Add New Movie</h1>
                    {this.renderInput("title","Title")}
                    {this.renderSelect("genreId","Genre",this.state.genres)}
                    {this.renderInput("numberInStock","Stock","number")}
                    {this.renderInput("dailyRentalRate","Rate")},
                    {this.renderButton("Save")}
                </form>
            </div>
        )
    }
}
