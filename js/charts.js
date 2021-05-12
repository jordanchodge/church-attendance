//pulling data from Firebase
firebase.database().ref('/attendance/').orderByChild("serverDate").once('value').then(function(snapshot){
    //declaring variables
    let total;
    let attendanceDate;
    let rightSection;
    let leftSection;
    let middleSection;
    let balcony; 
    let totalArray = [];
    let date_array = [];
    let dataTotal = [];
    let dataMonthTotal = [];
    let sectionTotal;
    const months = [];

    const ctx = document.getElementById('attendanceTotal').getContext('2d');

    let config = {
        type: 'bar',
        data: {
            labels: date_array,
            datasets: [{
                type: 'bar',
                label: 'Total',
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderColor: 'rgba(0, 99, 132, 1)',
                fill: false,
                data: totalArray
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
                        position: 'left'
                    },
                ticks: {
                    beginAtZero: true,
                    }
                }]
            },
            legend: {
                position: 'top'
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

        dataTotal.push([attendanceDate, total, leftSection, rightSection, middleSection, balcony]);
        dataMonthTotal.push([attendanceDate, total]);
    });

     //also display current month value on initial load
    //TODO: To make this more efficient 
    dataTotal.forEach(function(item){
        let date = item[0];
        let left = item[2];
        let right = item[3];
        let middle = item[4];
        let balcony = item[5];

        let currentDate = new Date();
        let currentMonth = currentDate.toLocaleString('default', {month: 'short'});

        currentDate.setDate(currentDate.getDate() - 7);
        let previousMonth = currentDate.toLocaleString('default', {month: 'short'});

        let tempDate;
        let tempTotal;

        resetChart();

        //determines if there is any data for the current month, if not, load the previous month.
        if(item[0].slice(0,3) === currentMonth) {
            
            createCard(date, left, right, middle, balcony);

            tempDate = item[0];
            tempTotal = item[1];
            let data = attendance_chart.config.data;

            date_array.push(tempDate);
            totalArray.push(tempTotal);
    
            data.datasets[0].data = totalArray;
            data.labels = date_array;

            attendance_chart.update();

        } else if (item[0].slice(0,3) === previousMonth) {

            createCard(date, left, right, middle, balcony);

            tempDate = item[0];
            tempTotal = item[1];
            let data = attendance_chart.config.data;

            date_array.push(tempDate);
            totalArray.push(tempTotal);
    
            data.datasets[0].data = totalArray;
            data.labels = date_array;

            attendance_chart.update();
        }
       
    });

    //clearing the data for the next month
    function resetChart(){
        totalArray = [];
        date_array = [];
    }

    function enableMonthButtons(item, yearInput) { 
        if(item[0].slice(0,3) === `Jan` && item[0].slice(-4) === yearInput){
            document.getElementById('january').disabled = false;
        } else if(item[0].slice(0,3) === `Feb` && item[0].slice(-4) === yearInput){
            document.getElementById('feburary').disabled = false;
        } else if(item[0].slice(0,3) === `Mar` && item[0].slice(-4) === yearInput){
            document.getElementById('march').disabled = false;
        } else if(item[0].slice(0,3) === `Apr` && item[0].slice(-4) === yearInput){
            document.getElementById('april').disabled = false;
        } else if(item[0].slice(0,3) === `May` && item[0].slice(-4) === yearInput){
            document.getElementById('may').disabled = false;
        } else if(item[0].slice(0,3) === `Jun` && item[0].slice(-4) === yearInput){
            document.getElementById('june').disabled = false;
        } else if(item[0].slice(0,3) === `Jul` && item[0].slice(-4) === yearInput){
            document.getElementById('july').disabled = false;
        } else if(item[0].slice(0,3) === `Aug` && item[0].slice(-4) === yearInput){
            document.getElementById('august').disabled = false;
        } else if(item[0].slice(0,3) === `Sep` && item[0].slice(-4) === yearInput){
            document.getElementById('september').disabled = false;
        } else if(item[0].slice(0,3) === `Oct` && item[0].slice(-4) === yearInput){
            document.getElementById('october').disabled = false;
        } else if(item[0].slice(0,3) === `Nov` && item[0].slice(-4) === yearInput){
            document.getElementById('november').disabled = false;
        } else if(item[0].slice(0,3) === `Dec` && item[0].slice(-4) === yearInput){
            document.getElementById('december').disabled = false;
        }
    }

    function enableYearButtons(){
        dataTotal.forEach(function (item) {
            if(item[0].slice(-4) === `2021`){
                document.getElementById('2021').disabled = false;
            } else if (item[0].slice(-4) === `2020`){
                document.getElementById('2020').disabled = false;
            }
        });
    }

    //goal adds each week together for the month's total
    //TODO: figure how to make this more efficient/more organized
    function getMonthTotal(yearInput){
        let tempArray = [];
        let temp = [];

        dataMonthTotal.forEach(function(item){
            let tempTotal;
            let data = attendance_chart.config.data;

            if(item[0].slice(-4) === yearInput) { 
               if(item[0].slice(0,3) === "Apr"){

                    temp.push(item[1]);

                    if(temp.length === 1){
                        tempTotal = temp.reduce(function(a, b){
                            return a + b;
                        }, 0);

                        for(let i = 0; i <= temp.length; i++){
                            temp.splice(0,temp.length);
                        }

                        totalArray.push(tempTotal);
                    } 
                }

                if(item[0].slice(0,3) === "May"){

                    temp.push(item[1]);

                    let counter = 0;

                    if(temp.length === 2){
                        tempTotal = temp.reduce(function(a, b){
                            return a + b;
                        }, 0);

                        for(let i = 0; i <= temp.length; i++){
                            temp.splice(0,temp.length);
                        }

                        totalArray.push(tempTotal);
                    } 

                } 
                
                // if(item[0].slice(0,3) == "Jun"){
                //     temp.push(item[1]);

                //     if(temp.length === 3){
                //         tempTotal = temp.reduce(function(a, b){
                //             return a + b;
                //         }, 0);

                //         for(let i = 0; i < temp.length; i++){
                //             temp.splice(0,temp.length);
                //         } 
                        
                //         totalArray.push(tempTotal);
                //     }
                // }

                tempArray.push(item[0].slice(0,3));
                const tempDate = new Set(tempArray);
                date_array = [...tempDate];
                data.labels = date_array;

                data.datasets[0].data = totalArray;
                attendance_chart.update();

            }
        })
    }

    function createCard(date, left, right, middle, balcony){
        const cardMainDiv = document.createElement("div");
        const cardBodyDiv = document.createElement("div");
        const cardTitleDiv = document.createElement("div");
        const cardTextDiv = document.createElement("div");
        const cardLabelDiv = document.createElement("div");
        const leftSectionLabel = document.createElement("label");
        const rightSectionLabel = document.createElement("label");
        const middleSectionLabel = document.createElement("label");
        const balconyLabel = document.createElement("label");
        const cardTitleHeading = document.createElement("h5");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");


        cardMainDiv.classList.add('card');
        cardMainDiv.classList.add('custom-card-style');
        cardMainDiv.setAttribute('id', 'main-card-div');
        cardBodyDiv.classList.add('card-body');
        cardTitleDiv.classList.add('card-title');
        cardTextDiv.classList.add('card-text');
        cardLabelDiv.classList.add('card-label');
        editButton.classList.add('btn');
        editButton.classList.add('btn-link');
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-link');
        leftSectionLabel.innerText = "Left Section: " + left;      
        rightSectionLabel.innerText = "Right Section: " + right;    
        middleSectionLabel.innerText = "Middle Section: " + middle;      
        balconyLabel.innerText = "Balcony: " + balcony;
        editButton.innerText = "Edit";
        deleteButton.innerText = "Delete"
            
        /*Appending elements to HTML*/
        cardTitleHeading.innerText = date;
        cardTitleHeading.appendChild(editButton);
        cardTitleHeading.appendChild(deleteButton);
        cardMainDiv.appendChild(cardBodyDiv);
        cardBodyDiv.appendChild(cardTitleDiv);
        cardBodyDiv.appendChild(cardTextDiv);
        cardTitleDiv.appendChild(cardTitleHeading);
        cardTextDiv.appendChild(cardLabelDiv);
        cardLabelDiv.appendChild(leftSectionLabel);
        cardLabelDiv.appendChild(rightSectionLabel);
        cardLabelDiv.appendChild(middleSectionLabel);
        cardLabelDiv.appendChild(balconyLabel);

        document.getElementById("stats").appendChild(cardMainDiv);
    }

    //gets each individual weeks total
    function getData(input, yearInput){

        document.getElementById("stats").innerHTML = "";

        dataTotal.forEach(function (item) {

            let tempDate;
            let tempTotal;

            if(item[0].slice(0,3) == input && item[0].slice(-4) === yearInput) {

                let date = item[0];
                let left = item[2];
                let right = item[3];
                let middle = item[4];
                let balcony = item[5];

                createCard(date, left, right, middle, balcony);
                
                tempDate = item[0];
                tempTotal = item[1];
                
                let data = attendance_chart.config.data;
                date_array.push(tempDate);
                totalArray.push(tempTotal);
        
                data.datasets[0].data = totalArray;
                data.labels = date_array;

                attendance_chart.update();
            }
        })
    }

    enableYearButtons();

    //Button for pulling then displaying the data
    //TODO: disable months that have no idea for that year
    $("#2020").button().click(function(){
        let yearInput = "2020";

        $(`button.month-btn`).prop(`disabled`, true);

        enableYearButtons();

        resetChart();
    
        dataTotal.forEach(function (item) {
            if(item[0].slice(-4) == yearInput){
                enableMonthButtons(item, yearInput);
            }            
        });

        getMonthTotal(yearInput);

        $("button.month-btn").button().click(function(){
            let input = $(this).val();

            resetChart();
    
            getData(input, yearInput);
        });
    });

    $("#2021").button().click(function(){
        let input = $(this).val();
        let yearInput = "2021";

        $(`:button`).prop(`disabled`, true);
        
        enableYearButtons();

        resetChart();
    
        dataTotal.forEach(function (item) {
            if(item[0].slice(-4) == input){
                enableMonthButtons(item, yearInput);
            }            
        })
    
        $(":button").button().click(function(){
            let input = $(this).val();
            resetChart();
    
            getData(input, yearInput);
        });
    });
});