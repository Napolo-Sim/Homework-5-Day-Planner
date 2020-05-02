$(document).ready(function () {
    var currentDate = moment().format("MMMM Do YYYY");
    console.log(currentDate);

    var currentHour24 = moment().format("H");
    console.log(currentHour24);

    var currentHour12 = moment().format("h");
    console.log(currentHour12);

    var dateHeading = $("#currentDay");
    dateHeading.text(currentDate);

});
