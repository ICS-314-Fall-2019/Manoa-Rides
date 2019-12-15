import React from 'react';
import { Container, Form, Grid, Header, Segment, Input, Select, Dropdown } from 'semantic-ui-react';
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
    const { origin, destination, month, day, year, hour, min, time } = this.state;
    const owner = Meteor.user().username;
    Rides.insert({ origin, destination, month, day, year, hour, min, time, owner }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        swal('Success', 'Ride added successfully', 'success');
        this.setState({ driver: '', rider: '',
          origin: '', destination: '',
          month: '', day: '', year: '',
          hour: '', min: '', time: '',
          error: '', redirectToReferer: false });
      }
    });
  }

  /** Display the form. */
  render() {
    const times = [
      { key: 'am', text: 'AM', value: 'am' },
      { key: 'pm', text: 'PM', value: 'pm' },
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
    const location = [
      { key: 'aiea', value: 'aiea', text: 'Aiea' },
      { key: 'ewa', value: 'ewa', text: 'Ewa Beach' },
      { key: 'haleiwa', value: 'haleiwa', text: 'Hale`iwa' },
      { key: 'hauula', value: 'hauula', text: 'Hau`ula' },
      { key: 'kai', value: 'kai', text: 'Hawaii Kai' },
      { key: 'honolulu', value: 'honolulu', text: 'Honolulu' },
      { key: 'kaaawa', value: 'kaaawa', text: 'Ka`a`awa' },
      { key: 'kahala', value: 'kahala', text: 'Kahala' },
      { key: 'kahuku', value: 'kahuku', text: 'Kahuku' },
      { key: 'kailua', value: 'kailua', text: 'Kailua' },
      { key: 'kaneohe', value: 'kaneohe', text: 'Kane`ohe' },
      { key: 'kapolei', value: 'kapolei', text: 'Kapolei' },
      { key: 'laie', value: 'laie', text: 'La`ie' },
      { key: 'lanikai', value: 'lanikai', text: 'Lanikai' },
      { key: 'maili', value: 'maili', text: 'Ma`ili' },
      { key: 'makaha', value: 'makaha', text: 'Makaha' },
      { key: 'manoa', value: 'manoa', text: 'Manoa' },
      { key: 'mililani', value: 'mililani', text: 'Mililani' },
      { key: 'nanakuli', value: 'nanakuli', text: 'Nanakuli' },
      { key: 'pearlCity', value: 'pearlCity', text: 'Pearl City' },
      { key: 'uh', value: 'uh', text: 'UH Manoa' },
      { key: 'wahiawa', value: 'wahiawa', text: 'Wahiawa' },
      { key: 'waialua', value: 'waialua', text: 'Waialua' },
      { key: 'waianae', value: 'waianae', text: 'Wai`anae' },
      { key: 'waikiki', value: 'waikiki', text: 'Waikiki' },
      { key: 'waimanalo', value: 'waimanalo', text: 'Waimanalo' },
      { key: 'waipahu', value: 'waipahu', text: 'Waipahu' },
    ];
    const months = [
      { key: '1', value: '1', text: 'January' },
      { key: '2', value: '2', text: 'February' },
      { key: '3', value: '3', text: 'March' },
      { key: '4', value: '4', text: 'April' },
      { key: '5', value: '5', text: 'May' },
      { key: '6', value: '6', text: 'June' },
      { key: '7', value: '7', text: 'July' },
      { key: '8', value: '8', text: 'August' },
      { key: '9', value: '9', text: 'September' },
      { key: '10', value: '10', text: 'October' },
      { key: '11', value: '11', text: 'November' },
      { key: '12', value: '12', text: 'December' },
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

                    <Grid container columns='equal' >
                      <Grid.Column>
                        <Form.Input readOnly
                            label="Driver"
                            name="driver"
                            type="driver"
                            placeholder=""
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
                      <label>From</label>
                      <Dropdown placeholder='Origin' onChange={this.handleChange}
                                fluid search selection options={location}
                                name='origin'/>
                      to
                      <Dropdown placeholder='Destination' onChange={this.handleChange}
                                fluid search selection options={location}
                                name='destination'/>
                    </Form.Group>
                    <Form.Group widths='equal' inline>
                      <label>Date</label>
                      <Dropdown placeholder='Month' onChange={this.handleChange}
                                fluid search selection options={months}
                                name='month'/> /
                      <Dropdown placeholder='Month' onChange={this.handleChange}
                                fluid search selection options={months}
                                name='day'/> /
                      <Dropdown placeholder='Month' onChange={this.handleChange}
                                fluid search selection options={times}
                                name='year'/>
                    </Form.Group>
                    <Form.Group widths='equal' inline>
                      <label>Time</label>
                      <Select fluid options={hours} placeholder='Hour' onChange={this.handleChange}/>
                      : <Select fluid options={mins} placeholder='Min' onChange={this.handleChange}/>
                       <Select fluid options={times} placeholder='AM/PM' onChange={this.handleChange}/>
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
