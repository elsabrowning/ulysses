'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleUtilitiesCtrl', function ($scope, $window) {


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
      sendEmail({
        to: volunteer.email,
        subject: "Volunteer information for Odyssey of the Mind",
        message: "Dear " + volunteer.name +",%0D%0A%0D%0AThank you for participating in this event! " + childTeamMessage +
        ".%0D%0A%0D%0AYou have been assigned to the following:%0D%0A%0D%0A"
      })
    };


  });
