# API-LIVROS

Este é uma simples API de livros

---

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