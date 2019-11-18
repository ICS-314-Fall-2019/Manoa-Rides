import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='background_landing'>
          <Grid container stackable centered columns={3}>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Icon inverted size='huge' name={'users'}/>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon inverted size='huge' name={'file text outline'}/>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon inverted size='huge' name={'checked calendar'}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'><Header inverted as='h1'>Multiple Users</Header></Grid.Column>
              <Grid.Column textAlign='center'><Header inverted as='h1'>Contact Details</Header></Grid.Column>
              <Grid.Column textAlign='center'><Header inverted as='h1'>Timestamped Notes</Header></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'><Header inverted as='h3'>This address book enables any number
                of users to register and save their business contacts.
                You can only see the contacts you have created</Header></Grid.Column>
              <Grid.Column textAlign='center'> <Header inverted as='h3'>For each contact, you can save their
                name, address, and phone number.</Header></Grid.Column>
              <Grid.Column textAlign='center'><Header inverted as='h3'>Each time you make contact with a
                contact, you can write a note that summarizes the conversation.
                This note is saved along with a timestamp with the contact.</Header></Grid.Column>
            </Grid.Row>
          </Grid>

        </div>
    );
  }
}

export default Landing;
