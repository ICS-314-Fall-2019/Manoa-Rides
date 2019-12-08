import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Rides = new Mongo.Collection('Rides');

/** Define a schema to specify the structure of each document in the collection. */
const RidesSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  owner: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Rides.attachSchema(RidesSchema);

/** Make the collection and schema available to other code. */
export { Rides, RidesSchema };
