import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { LinksCollection } from '/imports/db/LinksCollection';
import '/imports/api/linksMethods';
import '/imports/api/linksPublications';

const insertLink = (link, user) => LinksCollection.insert({ link, progress: 100, createdAt: new Date(), userId: user._id });
 

const SEED_USERNAME = 'test';
const SEED_PASSWORD = 'test';


Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);
  
  if (LinksCollection.find().count() === 0) {
    [
      'https://www.lempire.com/',
      'https://www.lemlist.com/',
      'https://www.lemverse.com/',
      'https://www.lemstash.com/',
    ].forEach(link => insertLink(link, user))
  }
});
