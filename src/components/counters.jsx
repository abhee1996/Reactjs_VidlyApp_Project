import React, { Component } from 'react'
import Counter from './counter';

class Counters extends Component {

    render() { 
        console.log("Counters - Rendered")

        const {onIncrement ,onMinus ,onReset ,onDelete ,counters} = this.props;
        return (
            <div>
                <button onClick={onReset} className="btn btn-primary">Reset</button>
                    {counters.map(counter => (
                    <Counter 
                    key={counter.id} 
                    onDelete={onDelete}
                    onIncrement ={onIncrement} 
                    onMinus ={onMinus}
                    counter = {counter}
                    />
                ))};
            </div>
        );
            
    }
}
 
export default Counters;