# API-LIVROS
---

[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-gc--2--api--livros-blue)](https://hub.docker.com/r/mathdocker227/gc-2-api-livros)
![Docker Version](https://img.shields.io/docker/v/mathdocker227/gc-2-api-livros?sort=semver)
![Docker Size](https://img.shields.io/docker/image-size/mathdocker227/gc-2-api-livros/latest)
![Docker Pulls](https://img.shields.io/docker/pulls/mathdocker227/gc-2-api-livros)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

---

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

## Deploy Ansible

Esse projeto inclui um *playbook Ansible* (`configura-node.yml`) e um arquivo `inventory` que permitem subir a aplicação **API-LIVROS** junto com um banco **MongoDB** em containers.

Essa automação facilita o deploy em ambientes locais, máquinas virtuais ou servidores na cloud.

### O que o playbook faz?
- Instalação do Docker (caso não exista)
- Download da imagem `mongo:latest`
- Download da imagem `mathdocker227/gc-2-api-livros:latest` (imagem desse repositório)
- Subida do container MongoDB
- Subida da **API-LIVROS** configurando variáveis de ambiente
- Teste automático do endpoint `/api/livros/all` para validar o deploy

### Arquivos adicionados
- `configura-node.yml` – Playbook Ansible responsável por instalar dependências, rodar MongoDB via Docker e subir a API.
- `inventory` – Define os servidores onde o Ansible deve executar o deploy (ex: `192.168.0.19`).

### Como usar o playbook?
1. Certifique-se de ter o **Ansible** instalado.
2. Abra um terminal na raiz do projeto.
3. Execute:
```bash
    ansible-playbook -i inventory configura-node.yml
```
**OBS:** Lembre de adicionar o IP das máquinas de destino no arquivo `inventory`, e também adicionar a chave SSH na mesma (com `ssh-copy-id`, por exemplo).

### Resultado esperado
Após a execução:
- O **MongoDB** estará rodando normalmente
- A **API-LIVROS** estará disponível em `http://<IP da máquina de destino>:3000/api/livros`
- Você pode testar com:
```bash
    curl http://<IP da máquina de destino>:3000/api/livros
```