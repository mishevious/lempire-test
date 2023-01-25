import { LinksCollection } from '../db/LinksCollection';
import { check } from 'meteor/check';
import { exportLinkJob } from './linksFakeJob'
 
Meteor.methods({
  'links.insert'() {
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    const linkId = LinksCollection.insert({
      link: '',
      progress: 0,
      createdAt: new Date(),
      userId: this.userId,
    })
    exportLinkJob(linkId)
  },
 
  'links.remove'(linkId) {
    check(linkId, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const link = LinksCollection.findOne({ _id: linkId, userId: this.userId });

    if (!link) {
      throw new Meteor.Error('Access denied.');
    }

    LinksCollection.remove(linkId);
  },
});