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
  month: {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
  },
  day: Number,
  year: Number,
  time: {
    type: String,
    allowedValues: ['AM', 'PM'],
  },
}, { tracker: Tracker });

/** Attach this schema to the Notes. */
Rides.attachSchema(RidesSchema);

/** Make the Notes and schema available to other code. */
export { Rides, RidesSchema };
