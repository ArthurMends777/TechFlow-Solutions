document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('task-form');

    const todoContainer = document.querySelector('#column-todo .tasks-container');
    const inProgressContainer = document.querySelector('#column-in-progress .tasks-container');
    const doneContainer = document.querySelector('#column-done .tasks-container');

    const API_URL = 'http://localhost:3000/tasks';

    function createTaskCard(task) {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.draggable = true;
        card.dataset.id = task.id;

        card.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <span>Prioridade: ${task.priority}</span>
            <button class="delete-btn">X</button>
        `;

        return card;
    }

    async function fetchTasks() {
        console.log('Buscando tarefas...');
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }

            const tasks = await response.json();
            
            console.log('Tarefas recebidas:', tasks);

            renderTasks(tasks); 

        } catch (error) {
            console.error('Falha ao buscar tarefas:', error);
            alert('Não foi possível carregar as tarefas do servidor.');
        }
    }

    function renderTasks(tasks) {
        todoContainer.innerHTML = '';
        inProgressContainer.innerHTML = '';
        doneContainer.innerHTML = '';

        tasks.forEach(task => {
            const card = createTaskCard(task);

            if (task.status === 'A Fazer') {
                todoContainer.appendChild(card);
            } else if (task.status === 'Em Progresso') {
                inProgressContainer.appendChild(card);
            } else if (task.status === 'Concluído') {
                doneContainer.appendChild(card);
            }
        });
    }

    fetchTasks();

});