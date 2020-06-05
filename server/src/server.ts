import express, { request, response } from 'express';

const app = express();

app.use(express.json());

// Rota: endereço completo da requisição
// Recurso: qual entidade estamos acessando do sistema

// GET: Buscar um ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remove uma informação do back-end

// Request Param: Parâmetros que vem na própria rota que identificam um recurso
// Query Param: Parâmetro que vem na própria rota geralmente opcionais para filtros, paginação
// Request Body: Parâmetros para criação/atualização de informações

const users = [
    'José',
    'Jean',
    'Gina',
    'Juâo'
]

app.get('/users', (request, response) => {
    const search = request.query.search;

    const filteredUsers = search ? users.filter(user => user.includes(String(search))) : users ;

    return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
    const id = request.params.id;

    const user = users[Number(id)];

    return response.json(user);
})

app.post('/users', (request, response) => {
    const data = request.body;

    console.log(data);

    const user = {
        name: data.name,
        email: data.email
    };

    return response.json(user);
})

app.listen(3333);