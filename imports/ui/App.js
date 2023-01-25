import { Template } from 'meteor/templating';
import { LinksCollection } from "../db/LinksCollection.js";
import { ReactiveDict } from 'meteor/reactive-dict'
import './App.html';
import "./Login.js";

const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();
const IS_LOADING_STRING = "isLoading";


Template.navbar.onCreated(function navbarOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe('links');
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  });
})

Template.app.helpers({
  isUserLogged() {
    return isUserLogged();
  },
});

Template.linksList.helpers({
  links() {
    return LinksCollection.find({ userId: getUser()._id }, {sort: {createdAt: -1}});
  },
});

Template.navbar.helpers({
  isLoading() {
    const instance = Template.instance();
    return instance.state.get(IS_LOADING_STRING);
  }
})

Template.navbar.events({
  'click .js-export-button'() {
    Meteor.call('links.insert');
  },
});

Template.linkItem.events({
  'click .js-delete'() {
    Meteor.call('links.remove', this._id);
  },
})