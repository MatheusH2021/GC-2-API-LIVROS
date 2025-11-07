# API-LIVROS

Este é uma simples API de livros

---

## Workflow escolhido:
O workflow escolhido foi o Github flow, por se tratar de um workflow de branching simples, leve e que funciona bem para projetos que não tem necessidade de vários ambientes de release. Por se tratar de uma API de livros simples, o Github flow atende bem a necessidade.

## Como rodar o projeto:

1. **Clone o repositório**

```bash
git clone https://github.com/MatheusH2021/GC-2-API-LIVROS.git
```

2. **Acesse a pasta do projeto**

```bash
cd GC-2-API-LIVROS
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Configure as variáveis de ambiente**

Crie um arquivo na raiz do projeto o arquivo ".env", e nele coloque as seguintes informações:

```bash
PORT=3000 
MONGO_URI=sua_string_de_conexão_mongodb_atlas_aqui
```
- Para uso local, mantenha:
mongodb://127.0.0.1:27017/Livros

5. **Inicie a aplicação:**

```bash
npm start
```

## Rotas da API:

---
### 🔍 Listar todos os livros:
- **Método:** `GET`
- **Endpoint:** `http://127.0.0.1:3000/livros/all`

### ➕ Cadastrar um livro:
- **Método:** `POST`
- **Endpoint:** `http://127.0.0.1:3000/livros`
- **Exemplo de JSON para realizar o cadastro:**
```json
{
    "title":"Frankenstein",
    "author":"Mary Shelley",
    "publishedYear":"1818",
    "genre":"Ficção científica, Ficção gótica, Terror,",
    "isbn":"8594540183",
    "description":"Frankenstein, o romance gótico de Mary Shelley, narra a história do jovem Victor Frankenstein, um cientista que, movido pela ambição, dá vida a uma criatura grotesca a partir de restos mortais.",
    "language":"pt-BR",
    "publishe":"Darkside"
}
```

### ➕ Deletar um livro:
- **Método:** `DELETE`
- **Endpoint:** `http://127.0.0.1:3000/livros/:id-livro`