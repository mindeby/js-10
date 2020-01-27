import React, { Component } from 'react';
import axios from 'axios';

export default class Courses extends Component {

    constructor() {
        super();
        this.state = {
            content: [],
        }
        this.renderCourses.bind(this);
    }

    componentDidMount() {
      axios.get(`http://localhost:5000/api/courses`)
      .then(res => {
          this.setState({
            content: res.data,
          })
        }
      )
      .catch(error => {
      console.log("Error fetching and parsing data", error);
      });
    }

    renderCourses() {
        let courses = '';
        for (let i = 0; i < this.state.content.length; ++i) {
            courses = this.state.content.map(course => `${course.title}` + " " + `${course.id}` + `${course.description}` + `${course.estimatedTime}` + `${course.materialsNeeded}` );
        }
        return courses;
    }

    render() {
        return(
            <div>
                <hr />
                <div className="bounds">
                  <p>{this.renderCourses()}</p>
                </div>
            </div>
        );
    }
}
