$(document).ready(function () {
    var currentDate = moment().format('MMMM Do YYYY');
    var Hour24 = moment().format('H');
    var Hour12 = moment().format('h');
    var dateHeading = $('#currentDay');
    //Puts Current date onto Header
    dateHeading.text(currentDate);
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));


    // Checks for Local Storage Data
    if (storedPlans !== null) {
        var planTextArr = storedPlans;
    }


    // set variable referencing planner element
    var plannerDiv = $('#plannerContainer');
    // clear existing elements
    plannerDiv.empty();


    // build calendar for business hours
    for (var hour = 9; hour <= 17; hour++) {
        // index for array use offset from hour
        var index = hour - 9;

        // Time Rows 
        var rowDiv = $('<div>');
        rowDiv.addClass('row');
        rowDiv.addClass('plannerRow');
        rowDiv.attr('hour-index', hour);

        var col2TimeDiv = $('<div>');
        col2TimeDiv.addClass('col-md-2');

        var timeBoxSpn = $('<span>');
        timeBoxSpn.attr('class', 'timeBox');

        // Hours
        var displayHour = 0;
        var ampm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }

        timeBoxSpn.text(`${displayHour} ${ampm}`);

        rowDiv.append(col2TimeDiv);
        col2TimeDiv.append(timeBoxSpn);


        //Text Rows
        var dailyPlanSpn = $('<input>');

        dailyPlanSpn.attr('id', `input-${index}`);
        dailyPlanSpn.attr('hour-index', index);
        dailyPlanSpn.attr('type', 'text');
        dailyPlanSpn.attr('class', 'dailyPlan');

        dailyPlanSpn.val(planTextArr[index]);

        var col9IptDiv = $('<div>');
        col9IptDiv.addClass('col-md-9');

        rowDiv.append(col9IptDiv);
        col9IptDiv.append(dailyPlanSpn);


        // Save Button Row
        var col1SaveDiv = $('<div>');
        col1SaveDiv.addClass('col-md-1');

        var saveBtn = $('<i>');
        saveBtn.attr('id', `saveid-${index}`);
        saveBtn.attr('save-id', index);
        saveBtn.attr('class', "far fa-save saveIcon");

        rowDiv.append(col1SaveDiv);
        col1SaveDiv.append(saveBtn);


        // Sets Row Color Depending on time
        updateRowColor(rowDiv, hour);

        // adds row to planner container
        plannerDiv.append(rowDiv);
    };

    // Updates Row Color
    function updateRowColor(hourRow, hour) {
        if (hour < Hour24) {
            hourRow.css("background-color", "lightgrey")
        } else if (hour > Hour24) {
            hourRow.css("background-color", "lightgreen")
        } else {
            hourRow.css("background-color", "tomato")
        }
    };

    // saves to local storage
    // listens for user click
    $(document).on('click', 'i', function (event) {
        event.preventDefault();
        alert("You're Input has been Saved")

        var index = $(this).attr('save-id');
        var inputId = '#input-' + index;
        var value = $(inputId).val();

        planTextArr[index] = value;

        //Keeps Text through Local Storage
        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });

    // function to color save button on change of input
    $(document).on('change', 'input', function (event) {
        event.preventDefault();

        // neeed to check for save button
        var i = $(this).attr('hour-index');
    });
});