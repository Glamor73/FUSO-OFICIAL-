const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let tasks = [];  // Array para almacenar las tareas

// Renderiza el calendario
function renderCalendar() {
    const monthYear = document.getElementById("month-year");
    const calendarGrid = document.getElementById("calendar-grid");

    // Establecer mes y año
    monthYear.innerText = `${monthNames[currentMonth]} ${currentYear}`;

    // Limpiar la cuadrícula anterior
    calendarGrid.innerHTML = '';

    // Obtener el primer día del mes y la cantidad de días en el mes
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Llenar las celdas vacías antes del primer día
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("day", "empty");
        calendarGrid.appendChild(emptyCell);
    }

    // Llenar la cuadrícula con los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.innerText = day;

        // Agregar las tareas si existen para ese día
        const taskForDay = tasks.filter(task => task.date === `${currentYear}-${currentMonth + 1}-${day}`);
        if (taskForDay.length > 0) {
            taskForDay.forEach(task => {
                const taskElement = document.createElement("div");
                taskElement.innerText = task.name;
                taskElement.classList.add("task");
                dayCell.appendChild(taskElement);
            });
        }

        calendarGrid.appendChild(dayCell);
    }
}

// Cambiar de mes
function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
}

// Agregar tarea
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const taskDate = document.getElementById("task-date").value;
    const taskName = document.getElementById("task-name").value;

    if (taskDate && taskName) {
        tasks.push({ date: taskDate, name: taskName });

        // Limpiar formulario
        document.getElementById("task-form").reset();

        // Volver a renderizar el calendario para mostrar la tarea
        renderCalendar();
    }
});

// Inicializar
renderCalendar();
// Alejandro