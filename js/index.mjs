// TODO Add New Workouts
// TODO Edit Existing Workouts
// TODO Mark Workouts As Complete
// TODO Delete Workouts
// TODO Time Based Workouts

let workoutNum = 0;

document.addEventListener('DOMContentLoaded', () =>
{
   // Add initial workout
   addWorkout();

   document.getElementById('new-workout')
       .addEventListener('click', () =>
   {
      addWorkout();
   });

});
function addWorkout()
{
    workoutNum++;
    let currentWorkout = workoutNum;

    const newWorkout = document.createElement('div');
    newWorkout.setAttribute("id", `workout-${currentWorkout}`);
    newWorkout.innerHTML =
    `
        <div class="input-group mb-2 w-25">
            <div class="input-group-prepend">
                <span class="input-group-text" id="input-${currentWorkout}" >
                    <label for="workout-input-${currentWorkout}">Workout Name</label>
                </span>
            </div>
            <input class="form-control" id="workout-input-${currentWorkout}" type="text">
        </div>
        
        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <label class="input-group-text" for="workout-type-${currentWorkout}">Workout Type</label>
            </div>  
            <select class="custom-select type" id="workout-type-${currentWorkout}">
                <option value="default" hidden>Select a Workout Type</option>
                <option value="time">Time-Based</option>
                <option value="rep">Repetition-Based</option>
            </select>
        </div>
       
        <div class="input-group mb-2 w-25" id="time-${currentWorkout}">
            <div class="input-group-prepend">
                <span class="input-group-text">
                    <label for="time-${currentWorkout}-input"></label>
                </span>
            </div>
            <input class="form-control mb-2 w-100" id="time-${currentWorkout}-input" type="time">
            
            <div class="input-group">
                <span class="input-group-text" id="timer-${currentWorkout}-container">
                    <button class="btn btn-primary" id="timer-${currentWorkout}-btn" type="button">Start Timer</button>
                </span>
                <input class="form-control w-50" id="timer-${currentWorkout}-display" disabled>
            </div>
        </div>
        
        <div class="input-group mb-2 w-25" id="reps-${currentWorkout}">
            <div class="input-group-prepend">
                <span class="input-group-text">
                    <label for="reps-${currentWorkout}-input"></label>
                </span>
            </div>
            <input class="form-control w-100" id="reps-${currentWorkout}-input">
        </div>        
        
        <div class="input-group mb-2 w-25" id="sets-${currentWorkout}">
            <div class="input-group-prepend" >
                <span class="input-group-text">
                    <label for="sets-${currentWorkout}-input"></label>
                </span>
            </div>
            <input class="form-control w-100" id="sets-${currentWorkout}-input">
        </div>
        
        <div class="mb-2" id="btn-container">
            <button class="btn btn-primary" id="edit-btn-${currentWorkout}">Edit Workout</button>
            <button class="btn btn-success" id="save-btn-${currentWorkout}">Save Workout</button>
            <button class="btn btn-danger" id="remove-btn-${currentWorkout}">Remove Workout</button>
        </div>
    `;

    document.getElementById('form').appendChild(newWorkout);

    // Set inputs' display to none by default
    document.getElementById(`reps-${currentWorkout}`)
        .style.display = 'none';

    document.getElementById(`sets-${currentWorkout}`)
        .style.display = 'none';

    document.getElementById(`time-${currentWorkout}`)
        .style.display = 'none';


    // Changes visibility of inputs based on the workout type
    document.getElementById(`workout-type-${currentWorkout}`)
        .addEventListener('change', (e) =>
    {
        setWorkoutTypeVisibility(e, currentWorkout);
    });


    document.getElementById(`edit-btn-${currentWorkout}`)
        .addEventListener('click', (e) =>
    {
        let selection = document.getElementById(`workout-type-${currentWorkout}`).value;

        e.preventDefault();
        document.getElementById(`workout-input-${currentWorkout}`)
            .removeAttribute('disabled');

        if(selection === 'time')
        {
            document.getElementById(`time-${currentWorkout}-input`)
                .removeAttribute('disabled');
        }
        else if(selection === 'rep')
        {
            document.getElementById(`reps-${currentWorkout}-input`)
                .removeAttribute('disabled');

            document.getElementById(`sets-${currentWorkout}-input`)
                .removeAttribute('disabled');
        }
    });

    document.getElementById(`save-btn-${currentWorkout}`)
        .addEventListener('click', (e) =>
    {
        let selection = document.getElementById(`workout-type-${currentWorkout}`).value;

        e.preventDefault();
        document.getElementById(`workout-input-${currentWorkout}`)
            .setAttribute('disabled', '');

        if(selection === 'time')
        {
            document.getElementById(`time-${currentWorkout}-input`)
                .setAttribute('disabled', '');
        }
        else if(selection === 'rep')
        {
            document.getElementById(`reps-${currentWorkout}-input`)
                .setAttribute('disabled', '');

            document.getElementById(`sets-${currentWorkout}-input`)
                .setAttribute('disabled', '');
        }
    });

    document.getElementById(`remove-btn-${currentWorkout}`)
        .addEventListener('click', () =>
    {
        // TODO add pop-up with confirmation
        document.getElementById('form').removeChild(newWorkout);
    });

    document.getElementById(`timer-${currentWorkout}-btn`)
        .addEventListener('click', () =>
    {
        let time = document.getElementById(`time-${currentWorkout}-input`);
        startCountdown(time, currentWorkout);
    });



}

function setWorkoutTypeVisibility(e, currentWorkout)
{
    const selection = e.target.value;

    if(selection === 'rep')
    {
        document.getElementById(`reps-${currentWorkout}`)
            .style.display = 'block';
        document.querySelector(`label[for="reps-${currentWorkout}-input"]`)
            .textContent = 'Reps';

        document.getElementById(`sets-${currentWorkout}`)
            .style.display = 'block';
        document.querySelector(`label[for="sets-${currentWorkout}-input"]`)
            .textContent = 'Sets';


        document.getElementById(`time-${currentWorkout}`)
            .style.display = 'none';
    }
    else if(selection === 'time')
    {
        document.getElementById(`time-${currentWorkout}`)
            .style.display = 'block';
        document.querySelector(`label[for="time-${currentWorkout}-input"]`)
            .textContent = 'Set Time';


        document.getElementById(`reps-${currentWorkout}`)
            .style.display = 'none';
        document.getElementById(`sets-${currentWorkout}`)
            .style.display = 'none';

    }
}

async function startCountdown(time, currentWorkout)
{

    for(let i = 0; i < time; i++)
    {
        await new Promise(r => setInterval(r, 1000));
        time--;
        document.getElementById(`timer-${currentWorkout}-display`).textContent = time;
    }
}