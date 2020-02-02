import React from 'react';
import Form from './Form';
import axios from 'axios';

export default class UpdateCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            user:'',
            errors: [],
        }
    }

    componentDidMount() { //make a get request to the api/courses/:id and set the state to the matching course
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(res => {
              this.setState({
                  title: res.data.title,
                  description: res.data.description,
                  estimatedTime: res.data.estimatedTime,
                  materialsNeeded: res.data.materialsNeeded,
                  user: res.data.User,
              })
              //if the user doesn't own that course redirect to forbidden
              if (this.props.context.authenticatedUser.email !== this.state.user.emailAddress){
                this.props.history.push('/forbidden');
              }
            }
          )
          .catch(error => {
          console.log("Error fetching and parsing data", error);
          this.props.history.push('/notfound');
          });
    }

    render() { //render the original course to be updated and recorded in state
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            user,
            errors
        } = this.state;

        return(
            <div>
                <hr />
                <div className="bounds course--detail">
                  <h1>Update Course</h1>
                  <Form
                      cancel={this.cancel}
                      errors={errors}
                      submit={this.submit}
                      submitButtonText="Update Course"
                      elements={() => (
                        <div>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                      <React.Fragment>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={title || ''}
                                            onChange={this.change}
                                            className="input-title course--title--input"/>
                                        </React.Fragment>
                                    </div>
                                    <p>By {user.firstName} {user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            type="text"
                                            value={description || ''}
                                            onChange={this.change}
                                            className="" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    value={estimatedTime || ''}
                                                    onChange={this.change}
                                                    className="course--time--input" />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    type="text"
                                                    value={materialsNeeded || ''}
                                                    onChange={this.change}
                                                    className="" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                      )} />
                </div>
            </div>
        );
    }

    //everytime the input values change the state of the corresponding value will change as well.
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

    submit = () => {

        const { context } = this.props;

        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        } = this.state;

        //course to submit on Put request
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        const authUser = context.authenticatedUser;
        //send a PUT request to the api with the information currently inserted in the body of the request
        context.data.updateCourse(course, this.props.match.params.id, authUser.email, context.password)
          .then( errors => {
            if (errors.length) {
              this.setState({errors});
            } else {
              this.props.history.push('/courses/' + this.props.match.params.id); //If there are no errors with the request send the user to the course detail after its been updated
            }
          })
          .catch( err => {
              console.log(err);
              this.props.history.push('/error');
          });

    }

    cancel = () => {
        this.props.history.push('/courses/' + this.props.match.params.id); //If the user cancels the update go back to the original courses detail page
    }
}
