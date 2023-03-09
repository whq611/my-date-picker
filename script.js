// Detect touch input
const isTouchDevice = 'ontouchstart' in document.documentElement;

// Add touch class to datepicker if touch input is supported
if (isTouchDevice) {
    datePicker.classList.add('touch');
}

const datePicker = document.querySelector('#datepicker');

// Set the initial date to the current date
let currentDate = new Date();

// Render the datepicker for the given month and year
function renderDatePicker(month, year) {
    // Get the number of days in the given month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the day of the week for the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Clear the previous contents of the datepicker
    datePicker.querySelector('.dates').innerHTML = '';

    // Set the current date text to the month and year
    datePicker.querySelector('.current-date').innerHTML = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    // Create rows for the datepicker table
    let row = document.createElement('tr');

    // Add blank cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
        let cell = document.createElement('td');
        cell.innerHTML = i;

        // Add the today class to the cell if it is the current date
        const today = new Date();
        if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            i === today.getDate()
        ) {
            cell.classList.add('today');
        }


        // Add an event listener to the cell to handle the selection
        cell.addEventListener('click', () => selectDate(cell));

        row.appendChild(cell);

        // Start a new row after every 7th cell
        if ((firstDayOfMonth + i - 1) % 7 === 6) {
            datePicker.querySelector('.dates').appendChild(row);
            row = document.createElement('tr');
        }
    }

    // Add any remaining cells to the last row
    if (row.children.length > 0) {
        datePicker.querySelector('.dates').appendChild(row);
    }
}

// Handle the selection of a date
function selectDate(cell) {
    // Remove the selected class from the previously selected cell
    const selectedCell = datePicker.querySelector('.selected');
    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }

    // Add the selected class to the clicked cell
    cell.classList.add('selected');

    // Get the selected date
    const day = cell.innerHTML;
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Output the selected date
    console.log(`Selected date: ${month}/${day}/${year}`);

    // Update the current date and re-render the datepicker with a transition
    currentDate.setDate(parseInt(day, 10));
    datePicker.querySelector('.dates').style.transform = 'scale(0.9)';
    setTimeout(() => {
        renderDatePicker(currentDate.getMonth(), currentDate.getFullYear());
        datePicker.querySelector('.dates').style.transform = 'scale(1)';
    }, 300);
}

function renderDatePicker(month, year) {
    // Get the number of days in the given month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the day of the week for the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Clear the previous contents of the datepicker
    datePicker.querySelector('.dates').innerHTML = '';

    // Set the current date text to the month and year
    datePicker.querySelector('.current-date').innerHTML = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    // Create rows for the datepicker table
    let row = document.createElement('tr');

    // Add blank cells for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
        let cell = document.createElement('td');
        cell.innerHTML = i;

        // Add the today class to the cell if it is the current date
        const today = new Date();
        if (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            i === today.getDate()
        ) {
            cell.classList.add('today');
        }

        // Add an event listener to the cell to handle the selection
        cell.addEventListener('click', () => selectDate(cell));

        row.appendChild(cell);

        // Start a new row after every 7th cell
        if ((firstDayOfMonth + i - 1) % 7 === 6 || i === daysInMonth) {
            datePicker.querySelector('.dates').appendChild(row);
            row = document.createElement('tr');
        }
    }

    // Add event listener to today button to render the current date
    datePicker.querySelector('.today').addEventListener('click', () => {
        const today = new Date();
        renderDatePicker(today.getMonth(), today.getFullYear());
    });
}



// Render the datepicker for the initial date
renderDatePicker(currentDate.getMonth(), currentDate.getFullYear());

// Add event listeners to the datepicker controls
datePicker.querySelector('.prev-year').addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    renderDatePicker(currentDate.getMonth(), currentDate.getFullYear());
});

datePicker.querySelector('.next-year').addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    renderDatePicker(currentDate.getMonth(), currentDate.getFullYear());
});

datePicker.querySelector('.prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderDatePicker(currentDate.getMonth(), currentDate.getFullYear());
});

datePicker.querySelector('.next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderDatePicker(currentDate.getMonth(), currentDate.getFullYear());
});

// Handle "Today" button click
const todayBtn = datePicker.querySelector('.today-btn');
if (todayBtn) {
    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        renderDatePicker(currentDate.getMonth(), currentDate.getFullYear());
    });
}