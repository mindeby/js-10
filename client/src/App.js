import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import Error from './components/Error';


// New import
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route exact path="/error" component={Error} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
