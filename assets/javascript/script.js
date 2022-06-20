//when i open the planner
//at the top, displays the current date + time in the header using moment
function startClock(){
    setInterval(function(){
        //creating constant for date/time 
        const now = moment().format("YYYY-MM-DD HH:mm:ss");
       //targetting the current time p tag, adding constant *now* into text El
        $("#current-time").text(now)

    }, 1000);
}

function createTimeBlock(hour){
    
    //i should see, 6am-7pm time blocks for the day
    
    const row =$("<div>");
    //when i view timeblock past, give it the 'past' class
    //when i view the time as of now, git it the 'present' class
    //when i view future time, give it the 'future' class
    const currentHour = Number(moment().format("H"));

    //past - hour less than '<' current hour
    const isPast = hour < currentHour;

    //present - current hour is === hour
    const isPresent = hour === currentHour;

    //future - hour is greater '>' then current hour
    const isFuture = hour > currentHour;

    // adding class "row" to new elements created
    let rowClass = 'row';
//adding the classes for the element colour of past, present, future (grey, red, green) with if statements
    if(isPast){
        rowClass = rowClass + ' past';
    }

    if(isPresent){
        rowClass = rowClass + ' present';
    }

    if(isFuture){
        rowClass = rowClass + ' future';
    }

    

    row.attr('class', rowClass);
    


    const timeCol = $("<div>");
    timeCol.attr('class', 'time-col col-2');

    timeCol.text(hour + ":00");

    const textareaCol = $("<div>");
    
    textareaCol.attr('class', 'textarea-col col-8');
    const textarea = $('<textarea id="text-box" rows="3">')
    textareaCol.append(textarea);

    const existingEvent = localStorage.getItem(hour);
    textarea.val(existingEvent, hour);


    const buttonCol = $("<div>");
    buttonCol.attr('class', 'button-div button-col col-2');

    const saveButton = $('<button id="saveBtn" class="btn btn-primary save-button">');
    saveButton.text('Save');

    buttonCol.append(saveButton);

    row.append(timeCol, textareaCol, buttonCol);
    return row;

    //then i can add text to each timeblock 
    
    // then i click save button, 
    //saves to page and enters event into local storage

}

$(function(){

    startClock();

    const timeBlockConatiner = $(".container");


//create each time blocks 6am - 7pm
    for (let hour = 6; hour < 20; hour++) {

       const timeBlock = createTimeBlock(hour);

       timeBlockConatiner.append(timeBlock);
    
        
    }

});

$(document).on('click', '.save-button', function(event){
    //when user clicks save on specific timeblock
    const buttonClicked = $(event.target);

    const textarea = buttonClicked.parent().prev().children();

    const timeCol = buttonClicked.parent().prev().prev();

    const time = timeCol.text();
    // console.log(time);

    // slicing the time element, removing the last 3 items from the time (:00)
    const hour = time.slice(0, -3);

    //grab the users input
    const userInput = textarea.val();
    console.log(userInput);

    //save to local storage
    //key should be the hour - the :00, value is the user text input
    localStorage.setItem(hour, userInput);


   
})



