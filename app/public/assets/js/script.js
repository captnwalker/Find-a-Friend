var allFieldsCompleted;

$(document).ready(function () {

    // Event Listener
    $('#submitButton').on('click', function () {

        checkIfComplete(function () {

            if (allFieldsCompleted) {
                collectInputs();
            }
            else {
                alert('Please complete all fields before submitting!');
            }
        }); 
    }); 
}); 

// Function to validate player input
function checkIfComplete(callback) {

    // Loop through all the questions 
    var questionsCompleted;
    $('.chosen-select').each(function () {
        if ($(this).val() == "") {
            questionsCompleted = false;
        }
    })

        .promise().done(function () {

            // Questions incomplete?
            if (questionsCompleted == false) {
                allFieldsCompleted = false;
            }

            // Name is entered?
            else if ($('#formName').val().trim() == "") {
                allFieldsCompleted = false;
            }

            // Img Link is entered?
            else if ($('#formImage').val().trim() == "") {
                allFieldsCompleted = false;
            }

            else {
                allFieldsCompleted = true;
            }

            callback();

        });
}

function collectInputs() {

    // Make new player an object
    var newFriend = {
        name: $('#formName').val().trim(),
        photo: $('#formImage').val().trim(),
        scores: []
    };

    // Loop through Questions to get scores
    var scoresArray = [];
    $('.chosen-select').each(function () {
        scoresArray.push(parseInt($(this).val())); /
    })

        .promise().done(function () {

            // Push the array of scores 
            newFriend.scores = scoresArray;

            var currentURL = window.location.origin;
            $.post(currentURL + "/api/friends", newFriend, function (data) {

                // Best Match to Modal
                $('#matchName').text(data.name);
                $('#matchImg').attr('src', data.photo);

                // Show best match in the modal
                $("#resultsModal").modal('toggle');

            });

        });

}