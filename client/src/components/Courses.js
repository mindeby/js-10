import React, { Component } from 'react';
import axios from 'axios';

export default class Courses extends Component {

    constructor() {
        super();
        this.state = {
            content: [],
        }
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

    render() {
      const courses = this.state.content.map((course, key) =>
      <div key={course.id} className="grid-33">
        <a className="course--module course--link" href={'/courses/' + course.id}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
        </a>
      </div>
    );

        return(
            <div>
                <hr />
                <div className="bounds">
                  {courses}
                  <div className="grid-33">
                    <a className="course--module course--add--module" href='/courses/create'>
                      <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" class="add">
                          <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                      </h3>
                    </a>
                  </div>
                </div>

            </div>
        );
    }
}
