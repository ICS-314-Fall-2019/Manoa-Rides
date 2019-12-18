import React from 'react';
import Avatar from 'react-avatar';
import { Grid, Loader, Menu, Header, Segment, Button, Container, Form } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import SelectField from 'uniforms-semantic/SelectField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles, ProfileSchema } from '../../api/profile/Profile';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';


/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', city: '', userImage: '', phone: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, city, userImage, phone } = this.state;
    Accounts.createProfile({ firstName, lastName, city, userImage, phone}, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
          <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center">
                  Edit Profile
                </Header>
                <Form onSubmit={this.submit}>
                  <Segment stacked>
                    <Grid columns='equal'>
                      <Grid.Column>
                        <Form.Input
                            label="First Name"
                            name="First Name"
                            type="firstName"
                            placeholder="Enter First Name"
                            onChange={this.handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input
                            label="Last Name"
                            name="Last Name"
                            type="lastName"
                            placeholder="Enter Last Name"
                            onChange={this.handleChange}
                        />
                      </Grid.Column>
                    </Grid>

                    <Form.Input
                        label="Location"
                        name="city"
                        placeholder="Enter home city"
                        type="city"
                        onChange={this.handleChange}
                    />

                    <Form.Input
                        label="Profile Image"
                        name="userImage"
                        placeholder="Enter URL for profile image"
                        type="userImage"
                        onChange={this.handleChange}
                    />

                    <Form.Input
                        label="Phone Number"
                        name="phone"
                        placeholder="Enter phone number"
                        type="phone"
                        onChange={this.handleChange}
                    />

                    <Form.Button content="Submit"/>
                    <Link to="/addProfile/:_id">Back to Profile</Link>
                  </Segment>
                </Form>

                {this.state.error === '' ? (
                    ''
                ) : (
                    <Message
                        error
                        header="Registration was not successful"
                        content={this.state.error}
                    />
                )}
              </Grid.Column>
            </Grid>
          </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  location: PropTypes.object,
};

export default EditProfile



