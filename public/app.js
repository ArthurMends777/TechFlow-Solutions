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

        const deleteBtn = card.querySelector('.delete-btn');

        deleteBtn.addEventListener('click', async (event) => {
            event.stopPropagation(); 

            if (!confirm(`Tem certeza que deseja deletar a tarefa: "${task.title}"?`)) {
                return;
            }

            console.log(`Deletando tarefa ID: ${task.id}`);

            try {
                const response = await fetch(`${API_URL}/${task.id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    card.remove(); 
                } else {
                    const errorData = await response.json();
                    throw new Error(`Erro da API: ${errorData.error || response.statusText}`);
                }

            } catch (error) {
                console.error('Falha ao deletar tarefa:', error);
                alert(`Não foi possível deletar a tarefa: ${error.message}`);
            }
        });

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

    async function handleTaskFormSubmit(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;

        if (!title) {
            alert('Por favor, preencha o título da tarefa.');
            return;
        }

        const newTaskData = {
            title: title,
            description: description,
            priority: priority
        };

        console.log('Enviando nova tarefa:', newTaskData);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTaskData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro da API: ${errorData.error || response.statusText}`);
            }

            taskForm.reset();

            await fetchTasks();

        } catch (error) {
            console.error('Falha ao criar tarefa:', error);
            alert(`Não foi possível criar a tarefa: ${error.message}`);
        }
    }


    taskForm.addEventListener('submit', handleTaskFormSubmit);

    fetchTasks();

});