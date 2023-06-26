# Ton API

Api para contagem de visitas na página e criação de usuários.

## Requisitos

```
Node: 18.16.x
npm: 9.5.x
Mysql
Serverless 3.32.2
```

## Uso

### Instalação das dependências

```bash
$ npm i
```

### Executar migrations

Executar o comando a seguir para criação das tabelas do banco de dados.

```bash
$ npm run migrate
```

### Desenvolvimento local

Para iniciar a api basta utilizar o comando a seguir:

```bash
$ npm run build
$ npm run dev
```

### Testes

Para executar os testes automatizados utilizar um dos seguintes comandos:

```bash
$ npm test
$ npm run test:watch
$ npm run test:watchAll
```

### Deploy

```bash
$ npm run deploy:dev //deploy ambiente de desenvolvimento
$ npm run deploy:prod //deploy ambiente de produção
```
