//declaring variables
let total;
let attendanceDate;
let dataInput;
let weekDate;
let weekTotal;
let inputDate = [];
let monthTotalArray = [];
let chart_labels = [];
let dataTotal = [];

const ctx = document.getElementById('attendanceTotal').getContext('2d');

chart_labels = [`June`];
monthTotalArray = [100];

//config settings for chartJS 
let config = {
    type: 'bar',
    data: {
        labels: chart_labels,
        datasets: [{
            type: 'bar',
            label: 'Total',
            backgroundColor: 'rgba(0, 99, 132, 0.6)',
            borderColor: 'rgba(0, 99, 132, 1)',
            yAxisID: 'y-axis-0',
            fill: false,
            data: monthTotalArray
        }],
    },
    options: {
        responsive:true,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Date"  
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "# of Attendees",
                    "id": "y-axis-0",
                    position: "left"
                },
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        legend: {
            position: 'right'
        }
    }    
}

const attendance_chart = new Chart(ctx, config);

//IDEA -default state of chart, to hide until the user picks a month
//$(`#attendanceTotal`).hide();

//pulling data from Firebase
firebase.database().ref('/attendance/').orderByChild("serverDate").once('value').then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
        let attendanceData = childSnapshot.val();

        attendanceDate = attendanceData.inputDate;
        total = attendanceData.total;

        dataTotal.push([attendanceDate, total]);
    });

    //clearing the data for the next month
    function resetChart(){
        monthTotalArray = [];
        chart_labels = [];
    }

    //IDEA - create sepearte function for displaying weekly total
    /*function showWeeklyData() {
        weekDate = item[0];
        weekTotal = item[1];
        let data = attendance_chart.config.data;

        chart_labels.push(weekDate);
        monthTotalArray.push(weekTotal);

        data.datasets[0].data = monthTotalArray;
        data.labels = chart_labels;

        attendance_chart.update();
        
    }*/

    //disable is the initial state of the buttons - using jquery
    $(`:button`).prop(`disabled`, true);

    //going through and seeing if there is any data avaiable, if data is availabe then enable button
    dataTotal.forEach(function(item){
        if(item[0].slice(0,3) == `Jun`){
            document.getElementById('june').disabled = false;
        } else if(item[0].slice(0,3) == `Jan`){
            document.getElementById('january').disabled = false;
        } else if(item[0].slice(0,3) == `Feb`){
            document.getElementById('feburary').disabled = false;
        } else if(item[0].slice(0,3) == `Mar`){
            document.getElementById('march').disabled = false;
        } else if(item[0].slice(0,3) == `Apr`){
            document.getElementById('april').disabled = false;
        } else if(item[0].slice(0,3) == `May`){
            document.getElementById('may').disabled = false;
        } else if(item[0].slice(0,3) == `Jul`){
            document.getElementById('july').disabled = false;
        } else if(item[0].slice(0,3) == `Aug`){
            document.getElementById('august').disabled = false;
        } else if(item[0].slice(0,3) == `Sep`){
            document.getElementById('september').disabled = false;
        } else if(item[0].slice(0,3) == `Oct`){
            document.getElementById('october').disabled = false;
        } else if(item[0].slice(0,3) == `Nov`){
            document.getElementById('november').disabled = false;
        } else if(item[0].slice(0,3) == `Dec`){
            document.getElementById('december').disabled = false;
        }
    })

    //Button for pulling then displaying the data
    $("#january").click(function(){

        let month = $(this).val();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#february").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#march").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#april").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#may").click(function(){
        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#june").click(function(){
        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#july").click(function(){
        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month){
                //console.log(item[0] + " " + item[1]);
    
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;
    
                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;
    
                attendance_chart.update();
            }
        })
    });

    $("#august").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#september").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#october").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#november").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });

    $("#december").click(function(){

        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item, index) {
            if(item[0].slice(0,3) == month) {
                //console.log(item[0] + " " + item[1]);
                
                weekDate = item[0];
                weekTotal = item[1];
                let data = attendance_chart.config.data;

                chart_labels.push(weekDate);
                monthTotalArray.push(weekTotal);
        
                data.datasets[0].data = monthTotalArray;
                data.labels = chart_labels;

                attendance_chart.update();
            }
        })
    });
});
