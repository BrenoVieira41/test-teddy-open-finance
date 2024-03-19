<p align="center">
    <h1 align="center">Teste - teddy open finance</h1>
    <h2 align="center">Encurtador de URLs.</h2>
</p>

---
### 🛠 Techs
  - [Node.js](https://nodejs.org/en/)
  - [Typescript](https://www.typescriptlang.org/)
  - [NestJS](https://nestjs.com/)
---

## :bookmark: About
Teste feito para o processo seletivo da empresa (test teddy open finance).

---

## Improvements:
- adicionar QRCode.
- Implementar pesquisas com filtragem (por data, site específico e última alteração).
- Adicionar testes E2E e class-validator.
---

## Versão do Node:
- Node.js Version: v18.16.0

---

### Para rodar o código

#### Cloning
```ps
  # Clone o repositório utilizando o git
  $ git clone https://github.com/BrenoVieira41/test-teddy-open-finance.git
```

#### :arrow_forward: Executando

##### Running the app
```ps
  # Instalar as dependências
  $ npm install

  # Criar banco de dados
  $ docker-compose up -d

  # Executar a aplicação
  $ npm run start
```

##### Running the test
```ps
  # Testes unitários
  $ npm run test
```

#### Docs:
- host/docs

### Infos:
Por favor, note que o código utiliza o UTC para referência de horário. Se estiver fora do Brasil, as datas de criação e validação da URL podem estar em horário diferente. Além disso, é importante observar que a API não permite spam. Caso não tenha um login, será necessário aguardar um período de 5 minutos após a outra inserção da mesma URL.
