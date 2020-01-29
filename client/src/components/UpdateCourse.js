import React, { Component } from 'react';
import Form from './Form';
import axios from 'axios';

export default class createCourse extends Component {
  constructor(props) {
    super(props);
    this.routeParam = props.match.params.id;
    this.state = {
      id: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
    }
  }

  componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.routeParam}`)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    title: res.data.title,
                    description: res.data.description,
                    estimatedTime: res.data.estimatedTime,
                    materialsNeeded: res.data.materialsNeeded,
                    firstName: res.data.User.firstName,
                    lastName: res.data.User.lastName
                })
              }
            )
            .catch(error => {
            console.log("Error fetching and parsing data", error);
            });
    }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
          <h1>Update Course</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={this.change}
                  placeholder="Title" />
                  <input
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={this.change}
                    placeholder="Description" />
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={this.change}
                  placeholder="estimatedTime" />
                <input
                  id="materialsNeeded"
                  name="materialsNeeded"
                  type="text"
                  value={materialsNeeded}
                  onChange={this.change}
                  placeholder="MaterialsNeeded" />
              </React.Fragment>
            )} />

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
      errors,
    } = this.state;

    // New user payload
    const user = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    };

    context.data.updateCourse(this.routeParam)
      .then( errors => {
         if (errors.length) {
          this.setState({ errors });
          console.log(errors);
         } else {
            this.props.history.push('/courses/' + this.state.id);
          }
       })
       .catch( err => { // handle rejected promises
         console.log(err);
         this.props.history.push('/error'); // push to history stack
       });
  }

  cancel = () => {
    this.props.history.push('/courses/' + this.state.id);
  }
}
