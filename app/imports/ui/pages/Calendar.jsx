import React from 'react';
import { Table, Container, Header } from 'semantic-ui-react';

class Calendar extends React.Component {
  render() {

    return (
        <Container>
          <Header textAlign='center' as='h1'>Month Year</Header>
          <Table celled padded fixed>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Sun</Table.HeaderCell>
                <Table.HeaderCell>Mon</Table.HeaderCell>
                <Table.HeaderCell>Tues</Table.HeaderCell>
                <Table.HeaderCell>Wed</Table.HeaderCell>
                <Table.HeaderCell>Thurs</Table.HeaderCell>
                <Table.HeaderCell>Fri</Table.HeaderCell>
                <Table.HeaderCell>Sat</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Row height='120'>
              <Table.Cell><Table.Header verticalAlign='top'>22</Table.Header></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row height='120'>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row height='120'>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row height='120'>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row height='120'>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table>
        </Container>
    );
  }
}

export default Calendar;
