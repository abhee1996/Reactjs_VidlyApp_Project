import Person from './Person';

export  default class Teacher extends Person {
    constructor(name,degree){
      super(name);
      //this.name = name;
      this.degree = degree;
    }
    teach(){
      //console.log("teach")
    };
  }
  