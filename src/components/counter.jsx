import React, { Component } from 'react'

export default class Counter extends Component {

    
    state = {
        city : ['Select City','Lahore', 'karachi', 'Islamabad'],
        province : ['Select state','Punjab', 'Sindth', 'KPK', 'Balochistan']
    };
    
    componentWillUnmount(){
        console.log("App -UnMount")
    }
    formatCount(){
        const {value} = this.props.counter;
        return value === 0 ? "Zero" :value;
    };
    
    
    
    render() {
        console.log("Counter - Rendered")
        
        let classes = this.newClasses();
        let btnClasses = this.greyChange();
        return (
            <div>
                <h4>Counter # {this.props.counter.id}</h4>

                {this.props.children}
                <h1 className={classes}>Counter: {this.formatCount()}</h1>
                <select>
                        {this.state.province.map(province => <option key={province}>{province}</option>)}
                </select>
                <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-info"> Plus </button>
                <button 
                onClick={()=> this.props.onMinus(this.props.counter)} 
                disable = {this.props.counter.value === 0 ? "disabled" : ""} className={btnClasses}>Minus</button>
                <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger">Delete</button>
                
            </div>
        )
    }
    newClasses() {
        let classes = "badge  m-4 p-3 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }
    
    greyChange(){
        let btnClasses = "btn btn-";
        btnClasses += this.props.counter.value === 0  ? "default" :"success"  ;
        return btnClasses; 
    }
}
