var referrals = angular.module('referrals', [])

var ManagerCtrl = function($scope, $http) {
  $scope.newReferralTitle = ''

  $scope.add = function() {
    var referral = { title: $scope.newReferralTitle
                   , clicks: 0
                   }

    $http({
      method: 'POST',
      url: "/referrals",
      data: referral
    }).success(function(data, status) {
      $scope.referrals.push(referral)
    }).error(function(data, status) {
      console.log('something went wrong creating a referral link')
    })

    $scope.newReferralTitle = ''
  }

  $scope.setCurrentLink = function(r) {
    $scope.currentLink = r
    $scope.newTitle = $scope.currentLink.title
  }

  $scope.delete = function() {
    var referral = { title: $scope.currentLink.title }
                   
    $http({
      method: 'POST',
      url: '/referrals/delete',
      data: referral
    }).success(function(data, status) {
      for (var i in $scope.referrals) {
        if ($scope.referrals[i].title === $scope.currentLink.title) {
          return $scope.referrals.splice(i, 1)
        }
      }
    }).error(function(data, status) {
      console.log('something went wrong with fetching the server data')
    })
  }

  $scope.edit = function() {
    var update = { old: $scope.currentLink
                 , updated: { title: $scope.newTitle }
                 }

    $http({
      method: 'POST',
      url: '/referrals/update',
      data: update
    }).success(function(data, status) {
      for (var i in $scope.referrals) {
        if ($scope.referrals[i].title === $scope.currentLink.title) {
          return $scope.referrals[i].title = $scope.newTitle
        }
      }
    }).error(function(data, status) {
      console.log('something went wrong updating referral link')
    })
  }

  $http({
    method: 'GET',
    url: "/referrals"
  }).success(function(data, status) {
    $scope.referrals = data
  }).error(function(data, status) {
    console.log('something went wrong with fetching the server data')
  })
}
