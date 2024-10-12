// TODO Add New Workouts
// TODO Edit Existing Workouts
// TODO Mark Workouts As Complete
// TODO Delete Workouts
// TODO Time Based Workouts

let workoutNumCounter = 0;
let workouts = [];


document.addEventListener('DOMContentLoaded', () =>
{

    // Add initial workout
   workouts[workoutNumCounter] = new Workout();

   document.getElementById('new-workout')
       .addEventListener('click', () =>
   {
      workouts[workoutNumCounter] = new Workout();
   });

});

class Workout
{
    workoutNum;
    timeChange;
    timerHours;
    timerMinutes;
    timerSeconds;
    timerOutput;
    timerId;

    constructor()
    {
        this.workoutNum = workoutNumCounter++;
        this.timerId = 0;
        this.addWorkout();
        this.timeRemaining = 0;
    }
    addWorkout()
    {
        const newWorkout = document.createElement('ti');
        newWorkout.setAttribute("id", `exercise-${this.workoutNum}`);
        newWorkout.innerHTML =
        `
        <div class="d-inline-block" id="workout-${this.workoutNum}">
            <span class="input-group mb-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="input-${this.workoutNum}" >
                        <label for="workout-input-${this.workoutNum}">Workout Name</label>
                    </span>
                </div>
                <input class="form-control" id="workout-input-${this.workoutNum}" type="text">
            </span>
            
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="workout-type-${this.workoutNum}">Workout Type</label>
                </div>  
                <select class="custom-select type" id="workout-type-${this.workoutNum}">
                    <option value="default" hidden>Select a Workout Type</option>
                    <option value="time">Time-Based</option>
                    <option value="rep">Repetition-Based</option>
                </select>
            </div>
           
            <div class="input-group my-2" id="time-${this.workoutNum}">                
                <div class="input-group timer-input-group">
                    <label for="hour-input-${this.workoutNum}">H
                        <input class="timer-inputs" id="hour-input-${this.workoutNum}" type="number" value="0">
                    </label>
                    <label for="minute-input-${this.workoutNum}">M
                        <input class="timer-inputs" id="minute-input-${this.workoutNum}" type="number" value="0">
                    </label>
                    <label for="second-input-${this.workoutNum}">S
                        <input class="timer-inputs" id="second-input-${this.workoutNum}" type="number" value="0">
                    </label>                    
                    <button class="btn btn-primary" id="timer-${this.workoutNum}-btn" type="button">Start Timer</button>
                    <button class="btn btn-danger" id="timer-${this.workoutNum}-stop" type="button">Stop</button> 
                    
                    <time id="timer-output-${this.workoutNum}">00:00:00</time>
                    
                </div>
            </div>
            
            <div class="input-group mb-2 w-25" id="reps-${this.workoutNum}">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <label for="reps-${this.workoutNum}-input"></label>
                    </span>
                </div>
                <input class="form-control w-100" id="reps-${this.workoutNum}-input">
            </div>        
            
            <div class="input-group mb-2 w-25" id="sets-${this.workoutNum}">
                <div class="input-group-prepend" >
                    <span class="input-group-text">
                        <label for="sets-${this.workoutNum}-input"></label>
                    </span>
                </div>
                <input class="form-control w-100" id="sets-${this.workoutNum}-input">
            </div>
            
            <div class="mb-2" id="btn-container">
                <button class="btn btn-primary" type="button" id="edit-btn-${this.workoutNum}">Edit Workout</button>
                <button class="btn btn-success" type="button" id="save-btn-${this.workoutNum}">Save Workout</button>
                <button class="btn btn-danger" type="button" id="remove-btn-${this.workoutNum}">Remove Workout</button>
            </div>
        </div>
        `;

        const row = document.createElement("tr");
        row.setAttribute("id", `row-${this.workoutNum}`);
        document.getElementById("table").appendChild(row);

        const checkboxTableItem = document.createElement("ti");
        checkboxTableItem.setAttribute("id", `checkboxTI-${this.workoutNum}`);
        checkboxTableItem.setAttribute("colspan", "5");
        checkboxTableItem.style.width = '10';

        checkboxTableItem.style.verticalAlign= 'middle';

        document.getElementById(`row-${this.workoutNum}`).appendChild(checkboxTableItem);
        document.getElementById(`row-${this.workoutNum}`).appendChild(newWorkout);

        const checkbox = document.createElement("input");
        checkbox.setAttribute("id", `checkbox-${this.workoutNum}`);
        checkbox.setAttribute("type", "checkbox");

        document.getElementById(`checkboxTI-${this.workoutNum}`).appendChild(checkbox);


        this.timerHours = document.getElementById(`hour-input-${this.workoutNum}`);
        this.timerMinutes =  document.getElementById(`minute-input-${this.workoutNum}`);
        this.timerSeconds = document.getElementById(`second-input-${this.workoutNum}`);
        this.timerOutput = document.getElementById(`timer-output-${this.workoutNum}`);


        // Set inputs' display to none by default
        document.getElementById(`reps-${this.workoutNum}`)
            .style.display = 'none';

        document.getElementById(`sets-${this.workoutNum}`)
            .style.display = 'none';

        document.getElementById(`time-${this.workoutNum}`)
            .style.display = 'none';


        // Changes visibility of inputs based on the workout type
        document.getElementById(`workout-type-${this.workoutNum}`)
            .addEventListener('change', (e) =>
            {
                this.setWorkoutTypeVisibility(e, this.workoutNum);
            });

        // Allows user to edit the exercise
        document.getElementById(`edit-btn-${this.workoutNum}`)
            .addEventListener('click', () =>
            {
                let selection = document.getElementById(`workout-type-${this.workoutNum}`).value;

                document.getElementById(`workout-input-${this.workoutNum}`)
                    .removeAttribute('disabled');

                if(selection === 'time')
                {
                    document.getElementById(`time-${this.workoutNum}-input`)
                        .removeAttribute('disabled');
                }
                else if(selection === 'rep')
                {
                    document.getElementById(`reps-${this.workoutNum}-input`)
                        .removeAttribute('disabled');

                    document.getElementById(`sets-${this.workoutNum}-input`)
                        .removeAttribute('disabled');
                }
            });

        // Saves user input, disabling the ability to make changes
        document.getElementById(`save-btn-${this.workoutNum}`)
            .addEventListener('click', () =>
            {
                let selection = document.getElementById(`workout-type-${this.workoutNum}`).value;

                document.getElementById(`workout-input-${this.workoutNum}`)
                    .setAttribute('disabled', '');

                if(selection === 'time')
                {
                    document.getElementById(`time-${this.workoutNum}-input`)
                        .setAttribute('disabled', '');
                }
                else if(selection === 'rep')
                {
                    document.getElementById(`reps-${this.workoutNum}-input`)
                        .setAttribute('disabled', '');

                    document.getElementById(`sets-${this.workoutNum}-input`)
                        .setAttribute('disabled', '');
                }
            });

        // Removes the selected workout
        document.getElementById(`remove-btn-${this.workoutNum}`)
            .addEventListener('click', () =>
            {
                // TODO add pop-up with confirmation
                document.getElementById('table').removeChild(row);
            });


        document.getElementById(`checkbox-${this.workoutNum}`)
            .addEventListener('input', (e) =>
            {
                const inputs = document.getElementById(`workout-${this.workoutNum}`)
                    .querySelectorAll("input");
                if(e.target.checked === true)
                {
                    for (const input of inputs)
                    {
                        input.setAttribute("disabled", "true");
                    }
                }
                else
                {
                    for (const input of inputs)
                    {
                        input.removeAttribute("disabled");
                    }
                }
            })

        this.timerHours.addEventListener('change', () =>
        {
            this.timeRemaining += this.timerHours.valueAsNumber * 3600000;
        });

        this.timerMinutes.addEventListener('change', () =>
        {
            this.timeRemaining += this.timerMinutes.valueAsNumber * 60000;
        });

        this.timerSeconds.addEventListener('change', () =>
        {
            this.timeRemaining += this.timerSeconds.valueAsNumber * 1000
        });

        document.getElementById(`timer-${this.workoutNum}-btn`)
            .addEventListener('click', () =>
            {
                this.timeRemaining += 1000;
                this.timeChange = Date.now();
                this.timerId = setInterval(this.startTimer, 1);
            });

        document.getElementById(`timer-${this.workoutNum}-stop`)
            .addEventListener('click', () =>
            {
                this.stopTimer();
            });

        workoutNumCounter++;
    }

    setWorkoutTypeVisibility(e)
    {
        const selection = e.target.value;

        if(selection === 'rep')
        {
            document.getElementById(`reps-${this.workoutNum}`)
                .style.display = 'block';
            document.querySelector(`label[for="reps-${this.workoutNum}-input"]`)
                .textContent = 'Reps';

            document.getElementById(`sets-${this.workoutNum}`)
                .style.display = 'block';
            document.querySelector(`label[for="sets-${this.workoutNum}-input"]`)
                .textContent = 'Sets';


            document.getElementById(`time-${this.workoutNum}`)
                .style.display = 'none';
        }
        else if(selection === 'time')
        {
            document.getElementById(`time-${this.workoutNum}`)
                .style.display = 'block';
            document.getElementById(`minute-input-${this.workoutNum}`).textContent = 'M';

            /*document.querySelectorAll(".timer-input-group label")[0]
                .textContent = 'H';


            document.querySelectorAll(".timer-input-group label")[1].innerHTML
                // .textContent = 'M';

            document.querySelectorAll(".timer-input-group label")[2]
                .textContent = 'S';
*/

            document.getElementById(`reps-${this.workoutNum}`)
                .style.display = 'none';
            document.getElementById(`sets-${this.workoutNum}`)
                .style.display = 'none';
        }
    }

    getTimeRemaining()
    {
        return this.timeRemaining;
    }
    setTimeRemaining(timeRemaining)
    {
        this.timeRemaining = timeRemaining;
    }

    getTimeChange()
    {
        return this.timeChange;
    }
    setTimeChange(timeChange)
    {
        this.timeChange = timeChange;
    }

    startTimer()
    {
        this.setTimeRemaining(this.getTimeRemaining() - Date.now() - this.getTimeChange());
        // this.timeRemaining -= Date.now() - this.timeChange;
        this.setTimeChange(Date.now());


        console.log(`${addZero(Math.floor(this.timeRemaining / 3600000 % 24), false)}:` +
            `${addZero(Math.floor(this.timeRemaining / 60000 % 60), false)}:` +
            `${addZero(Math.floor(this.timeRemaining / 1000 % 60), false)}`);
        /*this.timerOutput.textContent = `${addZero(Math.floor(this.timeRemaining / 3600000 % 24), false)}:` +   // Hours
            `${addZero(Math.floor(this.timeRemaining / 60000 % 60), false)}:` +     // Minutes
            `${addZero(Math.floor(this.timeRemaining / 1000 % 60), false)}`;        // Seconds
*/
        if(this.timeRemaining <= 0)
        {
            this.stopTimer();
        }
    }

    stopTimer()
    {
        clearInterval(this.timerId);
        this.timerOutput.textContent = "00:00:00";
        alert('Timer Finished');
    }
}

function addZero(num, moreDigits = true)
{
    let digit = parseInt(num) >= 10 ? num : "0" + num;

    if(moreDigits)
    {
        digit += ":";
    }
    return digit;
}



/*
async function startCountdown(time, workoutNum)
{

    for(let i = 0; i < time; i++)
    {
        await new Promise(r => setInterval(r, 1000));
        time--;
        document.getElementById(`timer-${this.workoutNum}-display`).textContent = time;
    }
}
*/
