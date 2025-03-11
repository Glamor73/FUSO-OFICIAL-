const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let tasks = [];  // Array para almacenar las tareas asignadas 

// Función para comparar fechas sin tener en cuenta la zona horaria
function isSameDate(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

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
    for (let i = 1; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("day", "empty");
        calendarGrid.appendChild(emptyCell);
    }

    // Llenar la cuadrícula con los días del mes
    for (let day = 1; day <= daysInMonth; day++) { 
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.innerText = day;

        // Verificar si hay tareas para ese día
        const taskForDay = tasks.filter(task => {
            const taskDate = new Date(task.date + "T00:00:00"); // Asegura que no haya desfase de zona horaria
            const currentDate = new Date(currentYear, currentMonth, day);
            return isSameDate(taskDate, currentDate); 
        });

        // Agregar las tareas si existen para ese día
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

function calculateAverage() {
    const notes = tasks.map(task => task.note).filter(note => note !== undefined);
    if (notes.length === 0) return 0;
    const sum = notes.reduce((acc, note) => acc + note, 0);
    return (sum / notes.length).toFixed(2);
}

// Actualizar el promedio en cada interfaz 
function updateAverage() {
    const averageElement = document.getElementById("average");
    averageElement.innerText = calculateAverage();
}

// Agregar las tareas 
document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const taskDate = document.getElementById("task-date").value;
    const taskName = document.getElementById("task-name").value;
    const taskNote = parseFloat(document.getElementById("task-note").value);

    if (taskDate && taskName) {
        tasks.push({ date: taskDate, name: taskName, note: taskNote });

        // Limpiar formulario
        document.getElementById("task-form").reset();

        // Volver a render del calendario de tareas 
        renderCalendar();

        // Actualizar cada promedio de cada nota 
        updateAverage();
    }
});

// Inicializar
renderCalendar();