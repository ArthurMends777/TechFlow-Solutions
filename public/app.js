document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('task-form');

    const todoContainer = document.querySelector('#column-todo .tasks-container');
    const inProgressContainer = document.querySelector('#column-in-progress .tasks-container');
    const doneContainer = document.querySelector('#column-done .tasks-container');

    const API_URL = 'http://localhost:3000/tasks';

    async function fetchTasks() {
        console.log('Buscando tarefas...');
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }

            const tasks = await response.json();
            
            console.log('Tarefas recebidas:', tasks);

            // renderTasks(tasks); 

        } catch (error) {
            console.error('Falha ao buscar tarefas:', error);
            alert('Não foi possível carregar as tarefas do servidor.');
        }
    }


    fetchTasks();

});