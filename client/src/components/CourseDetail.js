import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            content: [],
            authenticated: false,
        }
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
      const {context} = this.props;
      const authUser = context.authenticatedUser;
      axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(res => {
          this.setState({
            content: res.data,
            user: res.data.User,
          })
        }
      )
      .catch(error => {
      console.log("Error fetching and parsing data", error);
      });

      context.data.getCourse(this.props.match.params.id)
      .then( course => {
          if (course === null ) {
              this.setState(() => {
                  return {
                    errors: [ 'Unable to fulfill your request.' ]
                  };
              });
          } else {
              if (authUser !== null) {
                if (authUser.email === course.User.emailAddress) {
                    this.setState({ authenticated: true });
                }
              }
            }
          })
      .catch( err => {
          console.log(err);
          this.props.history.push('/error');
      })
    }

    delete() {
      const {context} = this.props;
      const authUser = context.authenticatedUser;
      context.data.deleteCourse(this.props.match.params.id, authUser.email, context.password)
        .then( errors => {
            if (errors.length) {
                this.setState({errors});
            } else {
                console.log(`The Course "${this.state.content.title}" was deleted.`);
                this.props.history.push('/');
            }
        })
        .catch( err => {
            console.log(err);
            this.props.history.push('/error');
        });
    }

    update(){
      this.props.history.push(`/courses/${this.props.match.params.id}/update`);
    }

    render() {
        return(
          <div>
              <hr/>
              <div className="actions--bar">
                  <div className="bounds">
                      <div className="grid-100">
                          { (this.state.authenticated)
                                    ?
                                  <span>
                                      <Link className="button" onClick={this.update} to="#">Update Course</Link>
                                      <Link className="button" onClick={this.delete} to="#">Delete Course</Link>
                                  </span>
                                    : null
                          }
                          <Link className="button button-secondary" to="/">Return to List</Link>
                      </div>
                  </div>
              </div>
              <div className="bounds course--detail">
                  <div className="grid-66">
                      <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <h3 className="course--title">{this.state.content.title}</h3>
                          <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                      </div>
                      <div className="course--description">
                          {this.state.content.description}
                      </div>
                  </div>
              </div>
              <div className="grid-25 grid-right">
                  <div className="course--stats">
                      <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                              <h4>Estimated Time</h4>
                              <h3>{this.state.content.estimatedTime}</h3>
                          </li>
                          <li className="course--stats--list--item">
                              <h4>Materials Needed</h4>
                              <ul>{this.state.content.materialsNeeded}</ul>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
        );
    }
}
