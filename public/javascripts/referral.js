var referrals = angular.module('referrals', [])

var ManagerCtrl = function($scope) {
  $scope.newReferralTitle = ''
  // TODO: When server data model is made, remove this and user server
  $scope.referrals = [ { title: 'poseidon', clicks: 0 }
                     , { title: 'ares', clicks: 0 }
                     , { title: 'zeus', clicks: 0 }
                     ]

  $scope.add = function() {
    var referral = { title: $scope.newReferralTitle
                   , clicks: 0
                   }

    $scope.referrals.push(referral)
    $scope.newReferralTitle = ''
  }

  $scope.setCurrentLink = function(r) {
    $scope.currentLink = r
    $scope.newTitle = $scope.currentLink.title
  }

  $scope.delete = function() {
    for (var i in $scope.referrals) {
      if ($scope.referrals[i].title === $scope.currentLink.title) {
        return $scope.referrals.splice(i, 1)
      }
    }
  }

  $scope.edit = function() {
    for (var i in $scope.referrals) {
      if ($scope.referrals[i].title === $scope.currentLink.title) {
        return $scope.referrals[i].title = $scope.newTitle
      }
    }
  }
}
