import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

function createProfile(firstName, lastName, city, userImage, phone){
  const profileID = Accounts.createProfile({
    firstName: firstName,
    lastName: lastName,
    city: city,
    userImage: userImage,
    phone: phone,
  });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(
        ({ email, password, role , firstName, lastName, city, userImage, phone}) => createUser(email, password, role, firstName, lastName, city, userImage, phone),
    );
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
