import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/db/LinksCollection';

Meteor.publish('links', function publishLinks() {
  return LinksCollection.find({ userId: this.userId }, {sort: {createdAt: -1}});
});