import React from 'react';
import Avatar from 'react-avatar';
import { Grid, Loader, Menu, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import SelectField from 'uniforms-semantic/SelectField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles, ProfileSchema } from '../../api/profile/Profile';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import Footer from '../components/Footer';


/** Create a schema to specify the structure of the data to appear in the form. */
const ProfileformSchema = new SimpleSchema({
  Name: String,
  Location: String,
  Phone: String,
  Email: String,
  Other: String,
  UserType: {
    type: String,
    allowedValues: ['Driver', 'Rider', 'Both'],
    defaultValue: 'Driver',
  },
});

/** Renders the Page for editing a single document. */
class AddProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data, formRef) {
    const {
      Name,
      Location,
      Phone,
      Email,
      Other,
      UserType
    } = data;
    const Owner = Meteor.user().username;
    // For Insert or create new Profile
    let check = Profiles.findOne(
      {
        Owner : Meteor.user().username
      },
      {
        Owner: 1, _id: 0
      }
    );
    
    if (check === undefined){
      check = {};
      check.Owner = '';
    }

    // If inside database then Update
    if (check.Owner == Meteor.user().username){
        const ID = check._id;
        Profiles.update(
          ID, 
        { 
          $set: { 
          Name, 
          Location, 
          Phone,
          Email,
          Other,
          UserType
          } 
        }, (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', 'Item updated successfully', 'success')));
    }
    // Else, Insert
    else{
      Profiles.insert(
        {
          Name,
          Location,
          Phone,
          Email,
          Other,
          UserType,
          Owner
        }, (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
          }
        });
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Your Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={ProfileformSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='Name'/>
                <TextField name='Location'/>
                <TextField name='Phone'/>
                <TextField name='Email'/>
                <TextField name='Other'/>
                <SelectField name='UserType'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  return{};
})(AddProfile);