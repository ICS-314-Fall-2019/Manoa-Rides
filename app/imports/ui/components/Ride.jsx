import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Ride extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.ride.origin} to {this.props.ride.destination}</Card.Header>
            <Card.Meta>{this.props.ride.date} at {this.props.ride.time}</Card.Meta>
            <Card.Description>
              <a href= '#'>
              <strong>Driver:</strong> {this.props.ride.driver}
              </a><br />
              <strong>Rider:</strong> TBD
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>
              Take this ride!
            </Button>
              <Button basic color='blue'>
                Driver Info.
              </Button>
            </div>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Ride.propTypes = {
  ride: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Ride);
