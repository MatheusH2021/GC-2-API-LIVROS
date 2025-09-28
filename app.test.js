const express = require("express");
const routes = require("./routes/router");
const cors = require("cors");
const request = require("supertest");

jest.mock("./models/Livro", () => {
    const find = jest.fn();
    const create = jest.fn();
    const findOne = jest.fn();

    return {
        Livro: { find, create, findOne },
        LivroModel: { find, create, findOne },
    };
});

const { LivroModel } = require("./models/Livro");

function getApp() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);
    return app;
}

describe("Testes de rotas da API de Livros", () => {
    it("Verifica se a rota GET retorna o (status 200)", async () => {
        LivroModel.find.mockResolvedValue([
        {
            _id: "68c704f2241e0157b6a8b11c",
            title: "Frankenstein",
            author: "Mary Shelley",
            publishedYear: 1818,
            genre: "Ficção científica",
            isbn: "8594540183",
            description: "Frankenstein...",
            language: "pt-BR",
            __v: 0,
        }
        ]);

        const app = getApp();
        const response = await request(app).get("/api/livros/all");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].title).toBe("Frankenstein");
    });

    it("Deve criar um livro com sucesso (status 201)", async () => {
        const novoLivro = {
            title: "Frankenstein",
            author: "Mary Shelley",
            publishedYear: 1818,
            genre: "Ficção científica",
            isbn: "8594540183",
            description: "Livro clássico de terror gótico.",
            language: "pt-BR"
        };

        LivroModel.findOne.mockResolvedValue(null);

        LivroModel.create.mockResolvedValue({
            _id: "abc123",
            ...novoLivro,
        });

        const app = getApp();
        const response = await request(app)
        .post("/api/livros")
        .send(novoLivro);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("msg", "Livro cadastrado!");
        expect(response.body.response).toHaveProperty("title", "Frankenstein");
    });

    it("Tenta criar um livro com ISBN cadastrado e retorna erro (Status 400)", async () => {
        const novoLivro = {
            title: "Frankenstein",
            author: "Mary Shelley",
            publishedYear: 1818,
            genre: "Ficção científica",
            isbn: "8594540183",
            description: "Livro clássico de terror gótico.",
            language: "pt-BR"
        }

        LivroModel.findOne.mockResolvedValue([
            {
                title: "Frankenstein",
                author: "Mary Shelley",
                publishedYear: 1818,
                genre: "Ficção científica",
                isbn: "8594540183",
                description: "Livro clássico de terror gótico.",
                language: "pt-BR"
            }
        ])

        LivroModel.create.mockResolvedValue({
            _id: "abc123",
            ...novoLivro,
        });

        const app = getApp();
        const response = await request(app)
        .post("/api/livros")
        .send(novoLivro);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toMatch(/ISBN já cadastrado/);
    })

    it("Tenta criar um Livro sem informar o Titulo (campo obrigatorio) e retorna erro (Status code 400)", async () => {
        const novoLivro = {
            title: "",
            author: "Bram Stoker",
            publishedYear: "1897",
            genre: "Terror Gótico, Romance Epistolar, Ficção de Vampiros",
            isbn: "978-0141439846",
            description: "Um romance gótico epistolar que narra a história do Conde Drácula, um vampiro da Transilvânia que se muda para a Inglaterra e aterroriza a cidade de Whitby, e a caçada por um pequeno grupo liderado por Abraham Van Helsing para destruí-lo. A narrativa é contada através de cartas, diários e artigos de jornal.",
            language: "en-US",
            publisher: "Archibald Constable and Company"
        }

        LivroModel.findOne.mockResolvedValue(null);

        LivroModel.create.mockResolvedValue({
            _id: "abc123",
            ...novoLivro,
        })

        const app = getApp();
        const response = await request(app)
        .post("/api/livros")
        .send(novoLivro);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toMatch(/informe o campo obrigatorio: Title./);

    })

    it("Tenta criar um Livro sem informar o Titulo (campo obrigatorio) e retorna erro (Status code 400)", async () => {
        const novoLivro = {
            title: "Dracula",
            author: "",
            publishedYear: "1897",
            genre: "Terror Gótico, Romance Epistolar, Ficção de Vampiros",
            isbn: "978-0141439846",
            description: "Um romance gótico epistolar que narra a história do Conde Drácula, um vampiro da Transilvânia que se muda para a Inglaterra e aterroriza a cidade de Whitby, e a caçada por um pequeno grupo liderado por Abraham Van Helsing para destruí-lo. A narrativa é contada através de cartas, diários e artigos de jornal.",
            language: "en-US",
            publisher: "Archibald Constable and Company"
        }

        LivroModel.findOne.mockResolvedValue(null);

        LivroModel.create.mockResolvedValue({
            _id: "abc123",
            ...novoLivro,
        })

        const app = getApp();
        const response = await request(app)
        .post("/api/livros")
        .send(novoLivro);

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toMatch(/informe o campo obrigatorio: Author./);

    })

});