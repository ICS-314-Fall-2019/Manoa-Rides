import React from 'react';
import { Container, Form, Grid, Header, Segment, Input, Select } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Rides } from '../../api/ride/Rides';

/** Renders the Page for adding a document. */
class AddRides extends React.Component {

  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { driver: '', rider: '', origin: '', destination: '', month: '', day: '', year: '',
      hour: '', min: '', time: '', hi: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** On submit, insert the data. */
  submit = () => {
    const { origin, destination, month, day, year, hour, min, time, hi } = this.state;
    const owner = Meteor.user().username;
    Rides.insert({ origin, destination, month, day, year, hour, min, time, hi, owner }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        swal('Success', 'Item added successfully', 'success');
        this.setState({ driver: '', rider: '', origin: '', destination: '', month: '', day: '', year: '',
          hour: '', min: '', time: '', hi: '', error: '', redirectToReferer: false });
      }
    });
  }

  /** Display the form. */
  render() {
    const times = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
      { key: 'o', text: 'Other', value: 'other' },
    ];
    const hours = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
      { key: 'o', text: 'Other', value: 'other' },
    ];
    const mins = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
      { key: 'o', text: 'Other', value: 'other' },
    ];
    return (
        <div className='signUpBackground'>
          <Container>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center">
                  Offer A Ride
                </Header>
                <Form onSubmit={this.submit}>
                  <Segment stacked>
                    <Form.Group widths='equal'>
                    <Grid columns='equal'>
                      <Grid.Column>
                        <Form.Input readOnly
                            label="Driver"
                            name="driver"
                            type="driver"
                            placeholder="Enter First Name"
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Input readOnly
                            label="Rider"
                            name="rider"
                            type="rider"
                            placeholder="TBD"
                        />
                      </Grid.Column>
                    </Grid>
                    </Form.Group>
                    <Form.Group widths='equal' inline>
                      <label>Date</label>
                      <Input placeholder='Month' />
                        / <Input placeholder='Day' />
                      / <Input placeholder='Year' />
                    </Form.Group>
                    <Form.Group widths='equal' inline>
                      <label>Time</label>
                      <Select options={hours} placeholder='Hour' error />
                      : <Select options={mins} placeholder='Min' error />
                       <Select options={times} placeholder='AM/PM' error />
                    </Form.Group>
                    <Form.Button content="Submit"/>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

export default AddRides;
