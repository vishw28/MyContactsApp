(function () {
    'use strict';

    angular.module('myApp.contacts')
        .controller('ContactsController',ContactsController);

    function ContactsController($firebaseArray) {
        var cc = this;
        const rootRef = firebase.database().ref().child('angular');
        cc.contacts = $firebaseArray(rootRef);

        console.log(cc.contacts);

        cc.msg = '';
        cc.data = {};

        cc.showAddForm = function () {
            cc.addFormShow = true;
        };

        cc.hide = function () {
            cc.addFormShow = false;
            cc.contactShow = false;
        };

        cc.hideEditForm = function () {
            cc.editFormShow = false;
        }

        cc.hideAddForm = function () {
            cc.addFormShow = false;
        }

        cc.showContact = function (contact) {
            cc.contactShow = true;
            cc.name = contact.name;
            cc.email 			= contact.email;
            cc.company 			= contact.company;
            cc.work_phone 		= contact.phone.work_phone;
            cc.home_phone 		= contact.phone.home_phone;
            cc.mobile_phone 	= contact.phone.mobile_phone;
            cc.street_address 	= contact.address.street_address;
            cc.city 			= contact.address.city;
            cc.state 			= contact.address.state;
            cc.zipcode 			= contact.address.zipcode;
        };

        cc.addFormSubmit = function () {
            console.log(cc.data);
            rootRef.push(cc.data);
            clearFields();
            cc.addFormShow = false;
            cc.msg = "Contact Added ..."
        };

        cc.showEditForm = function(contact){
            cc.editFormShow = true;
            cc.id= contact.$id;
            console.log(contact);
            cc.data.name = contact.name;
            cc.data.email = contact.email;
            cc.data.company = contact.company;
            cc.data.phone = {};
            cc.data.phone.work_phone = contact.phone.work_phone;
            cc.data.phone.home_phone = contact.phone.home_phone;
            cc.data.phone.mobile_phone = contact.phone.mobile_phone;
            cc.data.address = {};
            cc.data.address.street_address = contact.address.street_address;
            cc.data.address.city = contact.address.city;
            cc.data.address.state = contact.address.state;
            cc.data.address.zipcode = contact.address.zipcode;

        };

        cc.editMe = function () {
            console.log(cc.id);
            var refe = rootRef.child(cc.id);

            refe.update(cc.data);
            cc.editFormShow = false;
            cc.msg = "Contact Updated ."
        };

        cc.removeContact = function (contact) {
            rootRef.child(contact.$id).remove();
        };

        function clearFields() {
            cc.data = {};
        };
    }
})();