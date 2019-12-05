import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Ride from '/imports/ui/components/Ride';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRides extends React.Component {

  rides = [{
    driver: 'Philip', rider: 'Johnson',
    origin: 'Hawaii Kai', destination: 'UH Manoa',
    month: 12, day: 12, year: 2019, time: '6:00AM',
  },
    {
      driver: 'Henri', rider: 'Casanova',
      origin: 'Kailua', destination: 'UH Manoa',
      month: 12, day: 22, year: 2019, time: '9:00AM',
    },
    {
      driver: 'Kim', rider: 'Ron',
      origin: 'UH Manoa', destination: 'Honolulu',
      month: 12, day: 25, year: 2019, time: '1:00PM',
    },
    {
      driver: 'Henri', rider: 'Casanova',
      origin: 'UH Manoa', destination: 'Kailua',
      month: 12, day: 28, year: 2019, time: '4:00PM',
    },
    {
      driver: 'Kim', rider: 'Ron',
      origin: 'UH Manoa', destination: 'Honolulu',
      month: 12, day: 23, year: 2019, time: '1:00PM',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='signUpBackground' >
        <Container >
          <Header as="h2" textAlign="center"> Available Rides</Header>
          <Card.Group>
            {this.rides.map((ride, index) => <Ride key = {index} ride = {ride}/>)}

          </Card.Group>
        </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRides.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListRides);
