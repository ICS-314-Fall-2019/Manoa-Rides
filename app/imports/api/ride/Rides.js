import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo Notes to hold the data. */
const Rides = new Mongo.Collection('Rides');

/** Define a schema to specify the structure of each document in the Notes. */
const RidesSchema = new SimpleSchema({
  driver: String,
  rider: String,
  origin: String,
  destination: String,
  date: Date,
}, { tracker: Tracker });

/** Attach this schema to the Notes. */
Rides.attachSchema(RidesSchema);

/** Make the Notes and schema available to other code. */
export { Rides, RidesSchema };
