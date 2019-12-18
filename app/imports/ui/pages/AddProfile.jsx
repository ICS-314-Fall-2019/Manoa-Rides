import React from 'react';
import Avatar from 'react-avatar';
import { Grid, Container, Loader, Menu, Divider, Header, Segment, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles, ProfileSchema } from '../../api/profile/Profile';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for editing a single document. */
class AddProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Container>
          <Header as='h1' textAlign='center'>Profile</Header>
          <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Column width={8}>
              column 1
              <divider hidden/>
              <Header padded as='h2' texttAlign='left'>Name: </Header>                  <Header as='h3'>{this.props.currentUser}</Header>
              <Header as='h3'>{this.props.currentFirstName}</Header>

              <divider hidden/>
              <Header as='h2' texttAlign='left'>Location: </Header>
              <divider hidden/>

              <Grid column={2}>
                <Grid.Column width={3}>
                  <Header as='h2' texttAlign='left'>Email: </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h3'>{this.props.currentUser}</Header>
                </Grid.Column>
              </Grid>

              <divider hidden/>
              <Header as='h2' texttAlign='left'>Other Contact </Header>

              <divider hidden/>
              <Header as='h2' texttAlign='left'>User Type </Header>

            </Grid.Column>
            <Grid.Column width={8}>column 2</Grid.Column>
          </Grid>
          <Link to={`/editprofile/${this.props.currentId}`} ><Button floated='right'>Edit</Button></Link>
          <Divider hidden /><Divider hidden /><Divider hidden /><Divider hidden /><Divider hidden />
          <Header as='h2' texttAlign='left'>Ratings</Header>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
AddProfile.propTypes = {
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
  currentFirstName: PropTypes.string,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

const AddProfileContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  currentId: Meteor.user() ? Meteor.user()._id : '',
  currentfirstName: Meteor.user() ? Meteor.user().firstName: '',
}))(AddProfile);

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne(documentId),
    ready: subscription.ready(),
  };
})(AddProfileContainer);
