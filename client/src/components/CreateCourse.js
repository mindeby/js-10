import React, {Component} from 'react';
import Form from './Form';

export default class CreateCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            newCourseId: null,
            firstName: '',
            lastName: '',
            errors: [],
        }
    }

    render() {

        const authUser = this.props.context.authenticatedUser;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;

        return(
            <div>
                <hr />
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                            <div>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input
                                                id="title"
                                                name="title"
                                                type="text"
                                                value={title}
                                                onChange={this.change}
                                                className="input-title course--title--input"
                                                placeholder="Course title..." />
                                        </div>
                                        <p>By {authUser.firstName} {authUser.lastName}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea
                                                id="description"
                                                name="description"
                                                type="text"
                                                value={description}
                                                onChange={this.change}
                                                className=""
                                                placeholder="Course description..." />
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
                                                        value={estimatedTime}
                                                        onChange={this.change}
                                                        className="course--time--input"
                                                        placeholder="Hours" />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea
                                                        id="materialsNeeded"
                                                        name="materialsNeeded"
                                                        type="text"
                                                        value={materialsNeeded}
                                                        onChange={this.change}
                                                        className=""
                                                        placeholder="List materials..." />
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

        // New course payload
        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        const authUser = context.authenticatedUser;

        console.log(context);

        context.data.createCourse(course, authUser.emailAddress, context.password)
          .then( errors => {
            if (errors.length) {
              this.setState({errors});
            } else {
              console.log(`Course "${title}" has been successfully registered!`);
              context.data.getCourses()
                .then( courses => {
                    if (courses === null) {
                    this.setState(() => {
                        return { errors: [ 'Unable to connect to server.' ] };
                    });
                    } else {
                        this.setState({newCourseId: courses[courses.length-1]});
                        this.props.history.push('/courses/' + this.state.newCourseId.id);
                    }
                })
                .catch( err => {
                    console.log(err);
                    this.props.history.push('/error');
                })
            }
          })
          .catch( err => { // handle rejected promises
              console.log(err);
              this.props.history.push('/error'); // push to history stack
          });

      }

      cancel = () => {
        this.props.history.push('/');
      }

}
