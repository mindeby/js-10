import React from 'react';
import Form from './Form';

export default class CreateCourse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            errors: [],
        }
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors,
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
                                    <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</p>
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
        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        } = this.state;

        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded
        }

        const { context } = this.props;

        const authUser = context.authenticatedUser;

        context.data.createCourse(course, authUser.email, context.password)
          .then( errors => {
            if (errors.length) {
              this.setState({errors});
            } else {
              this.props.history.push('/');
            }
          })
          .catch( err => {
              console.log(err);
              this.props.history.push('/error');
          });

    }

    cancel = () => {
        this.props.history.push('/');
    }
}
