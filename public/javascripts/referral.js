var referrals = angular.module('referrals', [])

var ManagerCtrl = function($scope) {
  // TODO: When server data model is made, remove this and user server
  $scope.referrals = [ { title: 'poseidon', clicks: 0 }
                     , { title: 'ares', clicks: 0 }
                     , { title: 'zeus', clicks: 0 }
                     ]
}
