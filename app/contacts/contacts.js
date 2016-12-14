'use strict';

angular.module('myApp.contacts', ['ngRoute','firebase'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsController',
            controllerAs: 'cc'
        });
    }]);