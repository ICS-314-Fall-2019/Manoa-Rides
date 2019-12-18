import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Select, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Ride from '/imports/ui/components/Ride';
import { Rides } from '../../api/ride/Rides';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyRides extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleClick() {
      this.setState({ search: this.state.value });
    }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let availRides = this.props.rides;
    if (this.state.value === 'Im the driver.') { availRides = availRides.filter(a => (a.driver === Meteor.user().username)); }
    else if (this.state.search === 'rider') { availRides = availRides.filter(a => (a.rider === Meteor.user().username)); }
    else if (this.state.search === 'pending') { availRides = availRides.filter(a => (a.rider === 'TBD')); }
    else { availRides = availRides.filter(a => (a.driver === Meteor.user().username) || (a.rider === Meteor.user().username)); }

    const rideLists = [
      { key: 'driver', value: 'driver', text: 'Im the driver.' },
      { key: 'rider', value: 'rider', text: 'Im the rider.' },
      { key: 'pending', value: 'pending', text: 'Pending rides.' },
    ];

    return (
        <Container>
          <Header as="h2" textAlign="center"> My Rides</Header>
        <div>
          <Select
                  onChange={this.handleChange}
                    placeholder='Filter by...' options={rideLists} />
                    <Button onClick={this.handleClick}>Filter</Button>
        </div>
          <br/>
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
