# TechFlow Tasks - Sistema de Gerenciamento Ágil

Projeto desenvolvido para a disciplina de Engenharia de Software, simulando o desenvolvimento de um sistema de gerenciamento de tarefas para a startup "TechFlow Solutions".

## 1. Objetivo do Projeto

O objetivo é criar um sistema web que permita a uma equipe de logística acompanhar seu fluxo de trabalho em tempo real, priorizar tarefas críticas e monitorar o desempenho, utilizando uma abordagem ágil.

## 2. Escopo

A versão inicial (MVP) do projeto se concentrará nas seguintes funcionalidades:
* [x] CRUD (Create, Read, Update, Delete) de Tarefas.
* [X] Painel visual (Kanban) para visualização das tarefas.


## 3. Metodologia Adotada

Este projeto utiliza uma metodologia ágil híbrida, combinando:
* **Scrum:** Para o planejamento em Sprints (ciclos de desenvolvimento) e definição de papéis.
* **Kanban:** Para a visualização do fluxo de trabalho contínuo, representado diretamente no GitHub Projects.

## 4. Como Executar o Sistema

1.  Clone o repositório: `git clone ...`
2.  Instale as dependências: `npm install`
3.  Execute o projeto: `npm start`

---

## 5. Simulação de Gestão de Mudanças

* **Mudança Solicitada (Data: 20/10/2025):** Adição do campo `priority` (prioridade) ao modelo de Tarefas.
* **Justificativa:** O cliente (startup de logística) identificou a necessidade de priorizar tarefas críticas para otimizar o fluxo de trabalho da equipe, o que não era possível apenas com o campo `status`.
* **Impacto no Escopo:**
    * **Model:** O `taskRepository` deve ser atualizado para incluir `priority` (ex: 'Baixa', 'Média', 'Alta') na criação e atualização de tarefas.
    * **API:** A rota `POST /tasks` deve aceitar o campo `priority` (opcional).
    * **API:** A rota `PUT /tasks/:id` deve permitir a atualização do campo `priority`.
    * **Testes:** Os testes devem ser atualizados para refletir a nova estrutura do objeto de tarefa.