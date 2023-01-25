import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { LinksCollection } from '/imports/db/LinksCollection';
import '/imports/api/linksMethods';

if (Meteor.isServer) {
  describe('Links', () => {
    describe('methods', () => {
      const userId = Random.id();
      let linkId;

      beforeEach(() => {
        LinksCollection.remove({});
        linkId = LinksCollection.insert({
          link: 'Test Link',
          progress: 100,
          createdAt: new Date(),
          userId,
        });
      });

      it('can delete owned link', () => {
        mockMethodCall('links.remove', linkId, { context: { userId } });

        assert.equal(LinksCollection.find().count(), 0);
      });

      it(`can't delete not owned link`, () => {
        const fn = () => mockMethodCall('links.remove', linkId, { context: { userId: Random.id() } });
        assert.throw(fn, /Access denied/);
        assert.equal(LinksCollection.find().count(), 1);
      });

      it(`can't delete link without an user authenticated`, () => {
        const fn = () => mockMethodCall('links.remove', linkId);
        assert.throw(fn, /Not authorized/);
        assert.equal(LinksCollection.find().count(), 1);
      });

      it('can insert new links', () => {
        mockMethodCall('links.insert', {
          context: { userId },
        });

        const links = LinksCollection.find({}).fetch();
        assert.equal(links.length, 2);
      });

      it(`can't insert new links without an user authenticated`, () => {
        const fn = () => mockMethodCall('links.insert');
        
        assert.throw(fn, /Not authorized/);
        assert.equal(LinksCollection.find().count(), 1);
      });
    });
  });
}