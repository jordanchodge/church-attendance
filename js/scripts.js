//declaring variables for all javascript files
var date = moment().format("MMMM Do YYYY");
var database = firebase.database();
var ref = firebase.database().ref('attendance/' + date);
var serverDate = firebase.database.ServerValue.TIMESTAMP;

//calcuating the total
function getTotal(){ 
    var qty = document.getElementsByName('input');
    var total = 0;
    for (var i = 0; i<qty.length; i++){
        if(parseInt(qty[i].value)) total += parseInt(qty[i].value);
    }

    document.getElementById('totalInput').innerHTML = total;
    document.getElementById('totalInput').value = total;
}

//pushing the data to Firebase
function writeInputData(){
    var input = {
        leftSection: $('#leftsection').val(),
        rightSection: $('#rightsection').val(),
        middleSection: $('#middlesection').val(),
        balcony: $('#balcony').val(),
        serverDate: serverDate,
        inputDate: date,
        total:  $('#totalInput').val()
    }

    ref.set(input);
}
