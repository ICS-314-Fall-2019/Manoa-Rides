import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Ride from '/imports/ui/components/Ride';
import { Rides } from '../../api/ride/Rides';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyRides extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let availRides = this.props.rides;
    availRides = availRides.filter(a => (a.driver === Meteor.user().username) || (a.rider === Meteor.user().username));


    return (
        <Container>
          <Header as="h2" textAlign="center"> My Rides</Header>

          <Card.Group>
            {availRides.map((ride, index) => <Ride key = {index} ride={ride} />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
MyRides.propTypes = {
  rides: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Rides');
  return {
    rides: Rides.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MyRides);
