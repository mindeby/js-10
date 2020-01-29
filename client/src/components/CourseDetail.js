import React, { Component } from 'react';
import axios from 'axios';


export default class CourseDetail extends Component {
   constructor(props) {
     super(props);
     this.routeParam = props.match.params.id;
     this.state = {
         content: [],
     }
   }

   componentDidMount() {
     axios.get(`http://localhost:5000/api/courses/${this.routeParam}`)
     .then(res => {
         this.setState({
           content: res.data,
         })
         console.log(this.state)
       }
     )
     .catch(error => {
     console.log("Error fetching and parsing data", error);
     });
   }

   delete(){

   }

   render() {
     const course = this.state.content
     return (
       <div>
       <div className="actions--bar">
        <div className="bounds">
          <div className="bounds">
            <span>
              <a className="button" href="#" onClick={this.update}>Update Course</a>
              <a className="button"  href="#" onClick={this.delete}>Delete Course</a>
            </span>
            <a className="button button-secondary" href="/">Return to List</a>
          </div>
        </div>
       </div>
       <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{course.title}</h3>
            <p>{course.userId}</p>
          </div>
          <div className="course--description">
            <p>{course.description}</p>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item"></li>
            </ul>
          </div>
        </div>
       </div>
      </div>
     )
   };
}
