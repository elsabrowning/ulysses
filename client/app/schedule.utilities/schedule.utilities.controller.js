'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleUtilitiesCtrl', function ($scope, $window, Schedule, $anchorScroll, $location) {
    $scope.nScheduleName = "";

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

          }
        }
      }
      return assignedEmails;
    };

    $scope.getUnassignedEmails = function (){
      var unassignedEmails = "";
      for (var v = 0; v < $scope.schedule.unassigned.length; v++){
        unassignedEmails +=  $scope.schedule.unassigned[v].email + ",";
      }
      return unassignedEmails;
    };


    $scope.emailAllVolunteers = function(){
      sendEmail({
        to: $scope.getAssignedEmails(),
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear Volunteer, %0D%0A%0D%0AThank you for your participation in this event!%0D%0A%0D%0A" +
        "You can log in to see the volunteer positions you have been scheduled for at http://localhost:9000/ using the email \"volunteer@example.com\" " +
        "and the password \"volunteer\".%0D%0A%0D%0ASincerely,%0D%0A%0D%0AYour Odyssey of the Mind Organizer"
      });
      sendEmail({
        to: $scope.getUnassignedEmails(),
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear Volunteer, %0D%0A%0D%0AThank you for your interest in participating in this event!%0D%0A%0D%0A" +
        "Unfortunately, we were unable to assign to any volunteer positions, but we hope you still enjoy coming to watch the performance. You can log in to see your team of interest's performance time at http://localhost:9000/ using the email \"volunteer@example.com\" " +
        "and the password \"volunteer\".%0D%0A%0D%0ASincerely,%0D%0A%0D%0AYour Odyssey of the Mind Organizer"
      });
    };

    $scope.timeRange = function(constraint) {
      if(constraint != null) {
        var start = moment(constraint.start);
        var end = moment(constraint.end);

        return start.format('h:mma') + ' to ' + end.format('h:mma');
      }
    };


    $scope.getConstraints = function(volunteer){
      var constraints = "";
      for(var i = 0; i < volunteer.constraints.length; i++){
        constraints += volunteer.constraints[i].name + ", " + $scope.timeRange(volunteer.constraints[i]) + "%0D%0A" ;
      }
      return constraints;
    };

    // $scope.noEmail = function(volunteer){
    //   if (volunteer.email = ""){
    //     return true;
    //   }
    // };


    $scope.emailOneVolunteer = function(volunteer){
      console.log("Child team is: " + volunteer.childTeam)
      var childTeam = volunteer.childTeam;
      var childTeamMessage = "Our records show that you did not list a team of interest for the day";
      if (childTeam != "") {
        childTeam = childTeam.replace('#', 'Team-');
        childTeam = childTeam.replace('#', 'Team-');
        childTeam = childTeam.replace('#', 'Team-');
        childTeam = childTeam.replace('#', 'Team-');

        childTeamMessage = "Our records show you have the following team(s) of interest " + childTeam;
      }
      var constraintMessage = "Unfortunately, we were unable to assign to any volunteer positions, but we hope you still enjoy coming to watch the performance.";
      if(volunteer.constraints.length > 0){
       constraintMessage = "You have been scheduled for the following: "
      }
      sendEmail({
        to: volunteer.email,
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear " + volunteer.name +",%0D%0A%0D%0AThank you for participating in this event! " + childTeamMessage +
        ".%0D%0A%0D%0A" + constraintMessage + "%0D%0A%0D%0A" + $scope.getConstraints(volunteer) +
        "%0D%0A%0D%0AYou can log in at http://localhost:9000/ using the email \"volunteer@example.com\" " +
        "and the password \"volunteer\" to view your schedule for the event.%0D%0A%0D%0ASincerely,%0D%0A%0D%0AYour Odyssey of the Mind Organizer"
      })
    };

    $scope.changeScheduleName = function() {
      $scope.schedule.name = $scope.nScheduleName;
      $scope.schedules = Schedule.query();
      $scope.continue('schedule.utilities');
      $scope.nScheduleName = "";
      $anchorScroll();
    };

    $scope.duplicateSchedule = function() {
      var clone = Object.create($scope.schedule);
      clone.name = clone.name + " - Copy";
      clone.date = $scope.schedule.date;
      clone.info = $scope.schedule.info;
      clone.jobs = $scope.schedule.jobs;
      clone.teams = $scope.schedule.teams;
      clone.unassigned = $scope.schedule.unassigned;
      Schedule.save(clone).$promise.then(function(response) {
        console.log(response);
        $scope.schedules = Schedule.query();
        $location.path('schedule/' + response._id + '/build');
        window.location.reload();
      });
    };

    $scope.deleteSchedule = function() {
      var temp = $scope.schedule;
      if (confirm("Are you SURE you want to delete the schedule?")) {
        Schedule.remove({id: temp._id}).$promise.then(function() {
          //$scope.continue('main');
          $location.path('main');
          window.location.reload();
        });
      }





    };

  });
