import React from 'react';
import Avatar from 'react-avatar';
import { Grid, Container, Loader, Menu, Divider, Header, Segment, Button } from 'semantic-ui-react';
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
          <Divider hidden />
          <Header as='h1' textAlign='center'>Profile</Header>
          <Grid.Row />
          <Grid.Row>{this.props.currentUser}</Grid.Row>
          <Grid.Row>
            <Header as='h2' texttAlign='left'>Name: </Header>
          </Grid.Row>
          <Link to='/editProfile/:_id'><Button floated='right'>Edit</Button></Link>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
AddProfile.propTypes = {
  currentUser: PropTypes.string,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

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
})(AddProfile);
