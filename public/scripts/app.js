console.log("Sanity Check: JS is working!");
var $vacationsList;
var allVacations = [];

$(document).ready(function(){

  $vacationsList = $('#vacationTarget');
  $.ajax({
    method: 'GET',
    url: '/api/vacations',
    success: handleSuccess,
    error: handleError
  });

  $('#newVacationForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/vacations',
      data: $(this).serialize(),
      success: newVacationSuccess,
      error: newVacationError
    });

  });

  $vacationsList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/vacations/'+$(this).attr('data-id'));
    $.ajax({
        method: 'DELETE',
        url: '/api/vacations/'+$(this).attr('data-id'),
        success: deleteVacationSuccess,
        error: deleteVacationError
    });
  });

});

// functions below

// populate data
function getVacationHtml(vacation) {
  return `<hr>
          <p>
            <b>${vacation.place}</b>
            in ${(vacation.date)}
            <div>
              <img src="${vacation.photo}" alt="photo of ${vacation.place}" style="width:40%; height:40%;">
              <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${vacation._id}>Delete</button>
            </div>
          </p>`;
}

function getAllVacationsHtml(vacations) {
  return vacations.map(getVacationHtml).join("");
}

function render () {
  $vacationsList.empty();
  var vacationsHtml = getAllVacationsHtml(allVacations);
  $vacationsList.append(vacationsHtml);
};

function newVacationSuccess(json) {
  $('#newVacationForm input').val('');
  allVacations.push(json);
  render();
}

function newVacationError() {
  console.log("new vacation error!");
}

// deleting vacations
function deleteVacationSuccess(json) {
  var vacation = json;
  var vacationId = vacation._id;
  for(var i = 0; i < allVacations.length; i++) {
    console.log(allVacations.length)
    if(allVacations[i]._id === vacationId) {
      allVacations.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteVacationError() {
  console.log("vacation deleting error!");
}


function handleSuccess(json) {
  allVacations = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#vacationTarget').text('Failed to load vacations, is the server working?');
}

// delete vacation
function deleteVacationSuccess(json) {
  var vacation = json;
  var vacationId = vacation._id;
  for(var i = 0; i < allVacations.length; i++) {
    console.log(allVacations.length)
    if(allVacations[i]._id === vacationId) {
      allVacations.splice(i, 1);
      break;
    }
  }
  render();
}

function deleteVacationError() {
  console.log("vacation deleting error!");
}
