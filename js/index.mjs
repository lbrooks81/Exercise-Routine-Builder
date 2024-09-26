// TODO Add New Workouts
// TODO Edit Existing Workouts
// TODO Mark Workouts As Complete
// TODO Delete Workouts
// TODO Time Based Workouts

let workoutNum = 1;

document.addEventListener('DOMContentLoaded', () =>
{
   document.getElementById('new-workout')
       .addEventListener('click', () =>
   {
      addWorkout();
   });

   document.getElementsByClassName('type')
});
function addWorkout() {
    workoutNum++;

    const newWorkout = document.createElement('div', );
    newWorkout.setAttribute("id", `workout-${workoutNum}`);
    newWorkout.innerHTML =
    `
        <label for="workout-input-${workoutNum}">Workout Name</label>
        <input id="workout-input-${workoutNum}" class="input" type="text">
    
        <label for=workout-type-${workoutNum}></label>
        <select id="workout-type-${workoutNum}" class="type">
            <option value="time">Time-Based</option>
            <option value="rep">Repetition-Based</option>
        </select>
        
        <label for="time-${workoutNum}"></label>
        <input id="time-${workoutNum}" class="time" type="number">
        
    
        <label for="reps-${workoutNum}"></label>
        <input id="reps-${workoutNum}" class="reps">
        
    
        <label for="sets-${workoutNum}"></label>
        <input id="sets-${workoutNum}" class="sets">
        </br>
    `;
    document.getElementById('form').appendChild(newWorkout);
    document.getElementById(`workout-type-${workoutNum}`)
        .addEventListener('change', (e) =>
    {
        const selection = e.target.value;

        if(selection === 'rep')
        {
            document.getElementById(`reps-${workoutNum}`)
                .style.display = 'block';
            document.querySelector(`label[for="reps-${workoutNum}"]`)
                .textContent = 'Reps';

            document.getElementById(`sets-${workoutNum}`)
                .style.display = 'block';
            document.querySelector(`label[for="sets-${workoutNum}"]`)
                .textContent = 'Sets';

        }
        else
        {

        }
    })
}