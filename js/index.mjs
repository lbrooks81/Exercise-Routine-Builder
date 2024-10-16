let exerciseNumCounter = 0;
let exercises = [];


document.addEventListener('DOMContentLoaded', () =>
{

    // Add initial exercise
   exercises[exerciseNumCounter] = new Exercise();

   document.getElementById('new-exercise')
       .addEventListener('click', () =>
   {
      exercises[exerciseNumCounter] = new Exercise();
   });

});

class Exercise
{
    exerciseNum;
    timeChange;
    timeRemaining;
    timerHours;
    timerMinutes;
    timerSeconds;
    timerOutput;
    timerId;
    repsInput;
    repsLabel;
    setsInput;
    setsLabel;
    timerBlock;

    constructor()
    {
        this.exerciseNum = exerciseNumCounter++;
        this.timerId = 0;
        this.timeRemaining = 1000;
        this.addExercise();
        this.repsInput = document.getElementById(`reps-${this.exerciseNum}`);
        this.repsLabel = document.querySelector(`label[for="reps-${this.exerciseNum}-input"]`);
        this.setsInput = document.getElementById(`sets-${this.exerciseNum}`);
        this.setsLabel = document.querySelector(`label[for="sets-${this.exerciseNum}-input"]`);
        this.timerBlock = document.getElementById(`time-${this.exerciseNum}`);
    }
    addExercise()
    {
        const newExercise = document.createElement('ti');
        newExercise.innerHTML =
        `
        <div class="d-inline-block" id="exercise-${this.exerciseNum}">
            <span class="input-group mb-2">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="input-${this.exerciseNum}" >
                        <label for="exercise-input-${this.exerciseNum}">Exercise Name</label>
                    </span>
                </div>
                <input class="form-control" id="exercise-input-${this.exerciseNum}" type="text">
            </span>
            
            <div class="input-group mb-2">
                <div class="input-group-prepend">
                    <label class="input-group-text type" for="exercise-type-${this.exerciseNum}">Exercise Type</label>
                </div>  
                <select class="custom-select type" id="exercise-type-${this.exerciseNum}">
                    <option value="default" hidden>Select an Exercise Type</option>
                    <option value="time">Time-Based</option>
                    <option value="rep">Repetition-Based</option>
                </select>
            </div>
           
            <div class="input-group my-2" id="time-${this.exerciseNum}">                
                <div class="timer-input-group">
                    <label for="hour-input-${this.exerciseNum}">H
                        <input class="timer-inputs" id="hour-input-${this.exerciseNum}" type="number" value="0" min="0">
                    </label>
                    <label for="minute-input-${this.exerciseNum}">M
                        <input class="timer-inputs" id="minute-input-${this.exerciseNum}" type="number" value="0" min="0">
                    </label>
                    <label for="second-input-${this.exerciseNum}">S
                        <input class="timer-inputs" id="second-input-${this.exerciseNum}" type="number" value="0" min="0">
                    </label>                    
                    <button class="btn btn-primary" type="button" id="timer-${this.exerciseNum}-btn">Start Timer</button>
                    <button class="btn btn-danger" type="button" id="timer-${this.exerciseNum}-stop">Stop</button> 
                    
                    <time id="timer-output-${this.exerciseNum}">00:00:00</time>
                    
                </div>
            </div>
            
            <div class="d-inline-flex reps" id="reps-container">
                <div class="input-group mb-2" id="reps-${this.exerciseNum}">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <label for="reps-${this.exerciseNum}-input"></label>
                        </span>
                    </div>
                    <input class="form-control w-100" id="reps-${this.exerciseNum}-input" 
                    type="number" min="0">
                </div>        
                
                <div class="input-group mb-2 center" id="sets-${this.exerciseNum}">
                    <div class="input-group-prepend" >
                        <span class="input-group-text">
                            <label for="sets-${this.exerciseNum}-input"></label>
                        </span>
                    </div>
                    <input class="form-control w-100" id="sets-${this.exerciseNum}-input" 
                    type="number" min="0">
                </div>
            </div>
            <div class="mb-2 center" id="btn-container">
                <button class="btn btn-primary" type="button" id="edit-btn-${this.exerciseNum}">Edit Exercise</button>
                <button class="btn btn-success" type="button" id="save-btn-${this.exerciseNum}">Save Exercise</button>
                <button class="btn btn-danger" type="button" id="remove-btn-${this.exerciseNum}">Remove Exercise</button>
            </div>
        </div>
        `;

        const div = document.createElement("div");
        div.classList.add('center');

        const exercise = document.createElement("tr");
        exercise.classList.add('exercises');
        exercise.setAttribute("id", `exercise-${this.exerciseNum}`);


        const checkboxDiv = document.createElement("ti");
        checkboxDiv.classList.add('checkbox-item');

        exercise.appendChild(checkboxDiv);
        exercise.appendChild(newExercise);

        div.appendChild(exercise)

        document.getElementById("exercises").appendChild(div);

        const checkbox = document.createElement("input");
        checkbox.setAttribute("id", `checkbox-${this.exerciseNum}`);
        checkbox.classList.add("checkbox");
        checkbox.setAttribute("type", "checkbox");

        checkboxDiv.appendChild(checkbox);

        this.timerHours = document.getElementById(`hour-input-${this.exerciseNum}`);
        this.timerMinutes =  document.getElementById(`minute-input-${this.exerciseNum}`);
        this.timerSeconds = document.getElementById(`second-input-${this.exerciseNum}`);
        this.timerOutput = document.getElementById(`timer-output-${this.exerciseNum}`);


        // Set inputs' display to none by default
        document.getElementById(`reps-${this.exerciseNum}`)
            .style.display = 'none';

        document.getElementById(`sets-${this.exerciseNum}`)
            .style.display = 'none';

        document.getElementById(`time-${this.exerciseNum}`)
            .style.display = 'none';


        // Changes visibility of inputs based on the exercise type
        document.getElementById(`exercise-type-${this.exerciseNum}`)
            .addEventListener('change', (e) =>
            {
                this.setExerciseTypeVisibility(e, this.exerciseNum);
            });

        // Allows user to edit the exercise
        document.getElementById(`edit-btn-${this.exerciseNum}`)
            .addEventListener('click', () =>
            {
                this.unlockInputs();
            });

        // Saves user input, disabling the ability to make changes
        document.getElementById(`save-btn-${this.exerciseNum}`)
            .addEventListener('click', () =>
            {
                this.lockInputs();
            });

        // Removes the selected exercise
        document.getElementById(`remove-btn-${this.exerciseNum}`)
            .addEventListener('click', () =>
            {
                document.getElementById('exercises').removeChild(div);
            });


        // Toggles marking exercise as done, disables/enables inputs appropriately
        document.getElementById(`checkbox-${this.exerciseNum}`)
            .addEventListener('input', (e) =>
            {
                if(e.target.checked === true)
                {
                    this.lockInputs();
                }
                else
                {
                    this.unlockInputs();
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

        document.getElementById(`timer-${this.exerciseNum}-btn`)
            .addEventListener('click', () =>
            {
                if(this.timerSeconds + this.timerMinutes + this.timerHours === 0)
                {
                    return;
                }
                this.timeChange = Date.now();
                this.timerId = setInterval(function () {this.startTimer()}.bind(this), 1);
            });

        document.getElementById(`timer-${this.exerciseNum}-stop`)
            .addEventListener('click', () =>
            {
                this.stopTimer();
            });

        exerciseNumCounter++;
    }

    setExerciseTypeVisibility(e)
    {
        const selection = e.target.value;

        if(selection === 'rep')
        {
            this.repsInput.style.display = 'block';
            this.repsLabel.textContent = 'Reps';
            this.setsInput.style.display = 'block';
            this.setsLabel.textContent = 'Sets';

            this.timerBlock.style.display = 'none';
        }
        else if(selection === 'time')
        {
            this.timerBlock.style.display = 'block';

            this.repsInput.style.display = 'none';
            this.setsInput.style.display = 'none';
        }
    }

    startTimer()
    {
        if(this.timeRemaining <= 0)
        {
            return;
        }
        this.timeRemaining -= Date.now() - this.timeChange;
        this.timeChange = Date.now();

        this.timerOutput.textContent = `${addZero(Math.floor(this.timeRemaining / 3600000 % 24), false)}:` +   // Hours
            `${addZero(Math.floor(this.timeRemaining / 60000 % 60), false)}:` +     // Minutes
            `${addZero(Math.floor(this.timeRemaining / 1000 % 60), false)}`;        // Seconds

        document.getElementById(`timer-${this.exerciseNum}-btn`)
            .setAttribute("disabled", '');

        if(this.timeRemaining <= 0)
        {
            this.stopTimer();
        }
    }

    stopTimer()
    {
        document.getElementById(`timer-${this.exerciseNum}-btn`)
            .removeAttribute("disabled");

        this.timerHours.value = 0;
        this.timerMinutes.value = 0;
        this.timerSeconds.value = 0;
        this.timeRemaining = 1000;

        clearInterval(this.timerId);
        this.timerOutput.textContent = "00:00:00";
        alert('Timer Finished');
    }

    lockInputs()
    {
        let inputs = document.querySelectorAll("#exercise-" + this.exerciseNum + " input");
        let checkbox = document.getElementById(`checkbox-${this.exerciseNum}`);
        for(let i of inputs)
        {
            if(i !== checkbox)
            {
                i.setAttribute('disabled', '');
            }
        }

        document.getElementById(`exercise-type-${this.exerciseNum}`)
            .setAttribute('disabled', '');
    }
    unlockInputs()
    {
        let inputs = document.querySelectorAll("#exercise-" + this.exerciseNum + " input");
        for(let i of inputs)
        {
            i.removeAttribute('disabled');
        }

        document.getElementById(`exercise-type-${this.exerciseNum}`)
            .removeAttribute('disabled');
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

