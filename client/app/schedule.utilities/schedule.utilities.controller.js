'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleUtilitiesCtrl', function ($scope, $window) {
    //
    // console.log($scope.schedule.jobs[1].slots[1].assigned[1].email)
    console.log($scope.schedule);
    console.log($scope.schedule.jobs[0].slots[0].assigned[0].email);

    var sendEmail = function(vols){
      var str = 'http://mail.google.com/mail/?view=cm&fs=1'+
        '&to=' + vols.to +
        '&su=' + vols.subject +
        '&body=' + vols.message +
        '&ui=1';
      $window.open(str);
    };

    $scope.getAssignedEmails = function () {
      var assignedEmails = "";
      for (var j = 0; j < $scope.schedule.jobs.length; j++){
        for(var s = 0; s < $scope.schedule.jobs[j].slots.length; s++){
          for (var v = 0; v < $scope.schedule.jobs[j].slots[s].assigned.length; v++){
            assignedEmails +=  $scope.schedule.jobs[j].slots[s].assigned[v].email + ",";
            console.log(assignedEmails);
          }
        }
      }
      return assignedEmails;
    };

    $scope.getUnassignedEmails = function (){
      var unassignedEmails = "";
      return unassignedEmails;
    };

    $scope.emailAllVolunteers = function(){
      console.log($scope.getAssignedEmails());
      sendEmail({
        to: $scope.getAssignedEmails(),
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear Volunteer, %0D%0A%0D%0AThank you for your participation in this event!%0D%0A%0D%0AYou can log in to see your schedule at http://localhost:9000/ using the email \"volunteer@example.com\" and the password \"volunteer\".%0D%0A%0D%0ASincerely,%0D%0A%0D%0AOdyssey of the Mind"

      });
    };


    $scope.emailOneVolunteer = function(){
      sendEmail({
      })
    };


  });
