//pulling data from Firebase
firebase.database().ref('/attendance/').orderByChild("serverDate").once('value').then(function(snapshot){
    //declaring variables
    let total;
    let attendanceDate;
    let weekDate;
    let weekTotal;
    let rightSection;
    let leftSection;
    let middleSection;
    let balcony; 
    let monthTotalArray = [];
    let chart_labels = [];
    let dataTotal = [];
    let sectionTotal = [];

    const ctx = document.getElementById('attendanceTotal').getContext('2d');

    //clearing the data for the next month
    function resetChart(){
        monthTotalArray = [];
        chart_labels = []
    }

    //disable is the initial state of the buttons - using jquery
    //TODO: Find to only disable month buttons
    $(`:button`).prop(`disabled`, true);

    let config = {
        type: 'bar',
        data: {
            labels: chart_labels,
            datasets: [{
                type: 'bar',
                label: 'Total',
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderColor: 'rgba(0, 99, 132, 1)',
                fill: false,
                data: monthTotalArray
            }],
        },
        options: {
            responsive:true,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "# of Attendees",
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
    //creating the chart instance
    const attendance_chart = new Chart(ctx, config);

    //pulling data from firebase and pushing it into the dataTotal array
    snapshot.forEach(function(childSnapshot){
        let attendanceData = childSnapshot.val();

        attendanceDate = attendanceData.inputDate;
        total = attendanceData.total;

        leftSection = attendanceData.leftSection;
        rightSection = attendanceData.rightSection;
        middleSection = attendanceData.middleSection;
        balcony = attendanceData.balcony;

        dataTotal.push([attendanceDate, total, leftSection, rightSection, middleSection, balcony])
        //dataTotal.push([attendanceDate, total]);
    });

    //getting the current month for initial load
    let today = new Date();
    let currentMonth = today.toLocaleString('default', {month: 'short'});
    
    //getting the previous month if there's no data for the current month
    let lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 7);
    let previousMonth = lastMonth.toLocaleString('default', {month: 'short'});

    //going through and seeing if there is any data avaiable, if data is availabe then enable button
    //also display current month value on initial load
    //TODO: To make this more efficient 
    dataTotal.forEach(function(item){
        if(item[0].slice(0,3) === currentMonth) {
            //console.log(item[0] + " " + item[1]);

            resetChart();
            
            weekDate = item[0];
            weekTotal = item[1];
            let data = attendance_chart.config.data;

            chart_labels.push(weekDate);
            monthTotalArray.push(weekTotal);
    
            data.datasets[0].data = monthTotalArray;
            data.labels = chart_labels;

            attendance_chart.update();
        } else if (item[0].slice(0,3) === previousMonth) {
            weekDate = item[0];
            weekTotal = item[1];
            let data = attendance_chart.config.data;

            chart_labels.push(weekDate);
            monthTotalArray.push(weekTotal);
    
            data.datasets[0].data = monthTotalArray;
            data.labels = chart_labels;

            attendance_chart.update();
        }

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
    });

    //Button for pulling then displaying the data
    $(":button").click(function(){
        let month = $(this).val();

        resetChart();

        dataTotal.forEach(function (item) {
            if(item[0].slice(0,3) == month) {
                
                //leftSection = item[2];

                //console.log(leftSection);
                
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