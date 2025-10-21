// Importa o framework Express
const express = require('express');
const taskRepository = require('./taskRepository');


const app = express();
const PORT = 3000;

// Middleware para permitir que o Express leia JSON no corpo das requisições
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API da TechFlow Solutions rodando!');
});

app.get('/tasks', (req, res) => {
  try {
    const allTasks = taskRepository.getAllTasks();

    res.status(200).json(allTasks);

  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao buscar as tarefas.' });
  }
});

app.post('/tasks', (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'O campo "title" é obrigatório.' });
    }

    // Usa o repositório para criar a tarefa
    const newTask = taskRepository.createTask(title, description);

    res.status(201).json(newTask);

  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao criar a tarefa.' });
  }

});

app.put('/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const updates = req.body;

    const updatedTask = taskRepository.updateTask(id, updates);

    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao atualizar a tarefa.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});