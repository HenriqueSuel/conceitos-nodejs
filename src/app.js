const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id:uuid(), title, url, techs,likes: 0
  }
  repositories.push(repository)
  response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  
  if(repositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Repository not found.'})
  }

  const { title, url, techs } = request.body;
  
  const { likes } = repositories[repositoryIndex]

  const repository = {
    title, url, techs, id, likes
  }

  repositories[repositoryIndex] = repository;

  response.json(repositories[repositoryIndex])


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if (repositoryIndex < 0 ) {
    return response.status(400).json({ error: 'Repository not found.'})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json('Excluido com sucesso')
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repository = repositories.find(repository => repository.id === id)

  if (!repository) {
    return response.status(400).json({ error: 'Repository not found.'})
  }

  repository.likes++ 

  response.json(repository)

});

module.exports = app;
