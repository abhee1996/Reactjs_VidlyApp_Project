import React from 'react'
import _ from "lodash";
import PropTypes from 'prop-types';
//import {NavLink} from 'react-router-dom'
 const Pagination = props => {
    
    
        const {items, pageSize,currentPage, onPageChange} = props;
        //console.log('activePage=', currentPage)
        const pageCount = Math.ceil( items /pageSize) ;
        if (pageCount === 0) return null ;
        //console.log('pagesCount=', pageCount)
        const pages = _.range(1, pageCount + 1);
        return (
            <nav aria-label="Page navigation  float-right">
                <ul className="pagination">
                   {pages.map(page =>( 
                   <li key={page} className={page === currentPage ? "page-item active" :"page-item"}>
                        <a href="#" onClick={() =>onPageChange(page)} className="page-link">{page}</a>
                    </li>
                    ))}
                    
                </ul>
                
            </nav>
        );
    };
    

Pagination.propTypes ={
    items : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired, 
    onPageChange : PropTypes.func.isRequired
}
export default Pagination;