const tasksDB = [];

/**
 * contador simples para garantir IDs únicos.
 */
let idCounter = 1;


module.exports = {

  /**
   * Adiciona uma nova tarefa ao banco de dados.
   * @param {string} title - Título da tarefa
   * @param {string} description - Descrição da tarefa
   * @param {string} status - Status da 
   * @param {string} priority - Prioridade da tarefa (Baixa, Média, Alta)
   * @returns {object} A nova tarefa criada
   */
  createTask: (title, description) => {
    const newTask = {
      id: idCounter++,
      title: title,
      description: description || "",
      status: 'A Fazer',
      priority: priority || 'Média',
      createdAt: new Date()
    };
    
    // Adiciona a tarefa ao banco de dados
    tasksDB.push(newTask);
    
    return newTask;
  },

  /**
   * Retorna a lista de todas as tarefas.
   * @returns {Array} Array de tarefas
   */
  getAllTasks: () => {
    return [...tasksDB];
  },

    findById: (id) => {
        const taskId = parseInt(id, 10);
        return tasksDB.find(task => task.id === taskId);
    },

    updateTask: (id, updates) => {
        const taskToUpdate = module.exports.findById(id);

        if (!taskToUpdate) {
        return null;
        }

        taskToUpdate.title = updates.title || taskToUpdate.title;
        taskToUpdate.description = updates.description || taskToUpdate.description;
        taskToUpdate.status = updates.status || taskToUpdate.status;
        taskToUpdate.priority = updates.priority || taskToUpdate.priority;
        return taskToUpdate;
    },

    deleteTask: (id) => {
        const taskId = parseInt(id, 10);
        const taskIndex = tasksDB.findIndex(task => task.id === taskId);

        if (taskIndex === -1) {
        return null;
        }

        const deletedTask = tasksDB.splice(taskIndex, 1);

        return deletedTask[0];
    }

};