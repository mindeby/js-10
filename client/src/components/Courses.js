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
                </div>
            </div>
        );
    }
}
