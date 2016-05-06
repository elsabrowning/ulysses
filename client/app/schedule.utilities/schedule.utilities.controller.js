'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleUtilitiesCtrl', function ($scope, $window, Schedule, $anchorScroll, $state, $location, moment) {
    $scope.nScheduleName = "";
    $scope.detail = null;

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


    $scope.open = function(volunteer) {
      $scope.detail = volunteer;
    };

    $scope.close = function() {
      $scope.detail = null;
    };


    $scope.removeVolunteer = function(volunteer) {
      var unassigned = $scope.schedule.unassigned;
      for(var i in $scope.schedule.jobs){
        var job = $scope.schedule.jobs[i];
        for(var j in job.slots){
          var slot = job.slots[j];
          for(var k in slot.assigned){
            var aVol = slot.assigned[k];
            console.log(aVol);
            if(aVol == volunteer){
              window.alert(volunteer.name + " is assigned to " + job.name + ". Please unassign volunteer before deleting.");
            }
          }
        }
      }
      unassigned.splice(unassigned.indexOf(volunteer), 1);
    };


    $scope.getUnassignedEmails = function (){
      var unassignedEmails = "";
      for (var v = 0; v < $scope.schedule.unassigned.length; v++){
        unassignedEmails +=  $scope.schedule.unassigned[v].email + ",";
      }
      return unassignedEmails;
    };


    $scope.emailAllVolunteers = function(){
      $scope.schedule.emailAll = moment().format('MMMM Do YYYY, h:mm a');
      sendEmail({
        to: $scope.getAssignedEmails(),
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear Volunteer, %0D%0A%0D%0AThank you for your participation in this event!%0D%0A%0D%0A" +
        "You can log in to see the volunteer positions you have been scheduled for at http://localhost:9000/ using the email \"volunteer@example.com\" " +
        "and the password \"volunteer\". Please stop by the registration desk at the event if you have any questions about where to go to report for your volunteer time and find out how early to report for shift training.%0D%0A%0D%0ASincerely,%0D%0A%0D%0AYour Odyssey of the Mind Organizer"
      });
      sendEmail({
        to: $scope.getUnassignedEmails(),
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear Volunteer, %0D%0A%0D%0AThank you for your interest in participating in this event!%0D%0A%0D%0A" +
        "Due to a variety of constraints, we were unable to assign you to any volunteer positions. We hope you still enjoy coming to watch the performance. You can log in to see your team of interest's performance time at http://localhost:9000/ using the email \"volunteer@example.com\" " +
        "and the password \"volunteer\".%0D%0A%0D%0ASincerely,%0D%0A%0D%0AYour Odyssey of the Mind Organizer"
      });

      $scope.schedule.$save();

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
        var trainTime = 0;
        for(var j = 0; j < $scope.schedule.jobs.length; j++) {
          var job = $scope.schedule.jobs[j];
          if(job.name === volunteer.constraints[i].name) {
            trainTime = job.training;
          }
        }
        var trainingString = "";
        if(trainTime > 0) {
          trainingString = " (Training Time is " + trainTime + " minutes)";
        }

        constraints += volunteer.constraints[i].name + ", " + $scope.timeRange(volunteer.constraints[i]) + trainingString + "%0D%0A" ;
      }
      return constraints;
    };

    // $scope.noEmail = function(volunteer){
    //   if (volunteer.email = ""){
    //     return true;
    //   }
    // };


    $scope.emailOneVolunteer = function(volunteer){
      console.log("Child team is: " + volunteer.childTeam);
      var childTeam = volunteer.childTeam;
      var childTeamMessage = "Our records show that you did not list a team of interest for the day";
      if (childTeam != "") {
        childTeam = childTeam.replace('#', 'Team-');
        childTeam = childTeam.replace('#', 'Team-');
        childTeam = childTeam.replace('#', 'Team-');
        childTeam = childTeam.replace('#', 'Team-');

        childTeamMessage = "Our records show you have the following team(s) of interest " + childTeam;
      }
      var constraintMessage = "Due to a variety of constraints, we were unable to assign you to any volunteer positions. We hope you still enjoy coming to watch the performance.";
      if(volunteer.constraints.length > 0){
       constraintMessage = "You have been scheduled for the following: "
      }
      sendEmail({
        to: volunteer.email,
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear " + volunteer.name +",%0D%0A%0D%0AThank you for participating in this event! " + childTeamMessage +
        ".%0D%0A%0D%0A" + constraintMessage + "%0D%0A%0D%0A" + $scope.getConstraints(volunteer) +
        "%0D%0A%0D%0AYou can log in at http://localhost:9000/ using the email \"volunteer@example.com\" " +
        "and the password \"volunteer\" to view your schedule for the event and find out how early to report for shift training. Please stop by the registration desk at the event if you have any questions.%0D%0A%0D%0ASincerely,%0D%0A%0D%0AYour Odyssey of the Mind Organizer"
      });
      volunteer.lastEmail = moment().format('MMMM Do YYYY, h:mm a');
      $scope.schedule.$save();
    };

    //changes the name of the schedule
    $scope.changeScheduleName = function() {
      if ($scope.nScheduleName != "") {
        window.location.reload();
        $scope.schedule.name = $scope.nScheduleName;
        $scope.schedules = Schedule.query();
        $scope.continue('schedule.utilities');
        $scope.nScheduleName = "";
        $anchorScroll();
      }

    };



  });
