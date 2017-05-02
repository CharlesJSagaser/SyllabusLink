/**
 * Created by syrus on 5/1/17.
 */
var app1 = angular.module('app1', []);

app1.controller('ctrlSyl', function($scope){

});

$scope.homeworkblock = function(){
    console.log('test');
    var hwBlockButton = document.createElement('div');
    hwBlockButton.id = "addHomeworkButton"
    //hwBlockButton.innerHTML = "<input type="button" value="Add a Homework" onClick ="addHomework();">";
    document.getElementById(sylData).appendChild(hwBlockButton);
    increment();
}