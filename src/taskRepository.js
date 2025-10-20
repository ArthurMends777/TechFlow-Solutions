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
   * @param {string} status - Status da tarefa
   * @returns {object} A nova tarefa criada
   */
  createTask: (title, description) => {
    // Cria o objeto da nova tarefa
    const newTask = {
      id: idCounter++,
      title: title,
      description: description || "",
      status: 'A Fazer',
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
  }

};