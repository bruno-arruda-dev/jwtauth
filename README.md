
# jwtauth

Este projeto é uma API para cadastrar, autenticar e fornecer rotas privadas para usuários.

---

## Funcionalidades

- Cadastro de usuário
- Autenticação de usuário
- Alteração de dados de usuário
- Rotas privadas para usuário
- Token gerado com Jsonwebtoken (JWT)
- Senha criptografada com bcrypt

---

## Stack utilizada

**Back-end:** Node, Express, Typescript

**Database:** MongoDb

**Segurança:** bcrypt, Jasonwebtoken

---

## Instalação

Para instalar as dependências rode os comandos abaixo:

```bash
  cd my-project
  npm install
```

---    

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`: Url para o banco de dados MongoDB.

`SECRET`: Secret exigido pelo JWT na criação de tokens.

---

## Endpoints

| **Método** | **Endpoint** | **Descrição** |
| :---: | :---: | :--- |
| ![POST](https://img.shields.io/badge/POST-34d399) | ``/auth/register`` | Permite cadastrar um usuário|
| ![POST](https://img.shields.io/badge/POST-34d399) | ``/auth/login`` | Rota para autenticação de usuário |
| ![POST](https://img.shields.io/badge/PUT-2c7bd3) | ``/user/:id`` | Rota para alteração dos dados do usuário. |


- ### /auth/register

Enviar JSON no body da requisição:

**Campos obrigatórios:** "name", "email", "password", "confirmPassword".

*Exemplo:*
```
{
	"name": "Bruno Arruda",
	"email": "bruno.arrm@gmail.com",
	"password": "123",
	"confirmPassword": "123"
}
```
*Retorno da API:*
```
{
    "_id": "65560ed529bf767827461452",
    "name": "Bruno Arruda",
    "email": "bruno.arrm@gmail.com",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEwMSw4NiwxNCwyMTMsNDEsMTkxLDExOCwxMjAsMzksNzAsMjAsODJdfSwiaWF0IjoxNzAwMTM4NzEwfQ.PVEG2O-N9InEEVBJp3hRQefqDkfET1mdvwk5kHCfrKk",
    "username": "brunoarruda65586"
}
```


- **"_id"**: Campo de id gerado automaticamente pelo MongoDB;
- **"name"**: Campo de nome informado pelo usuário;
- **"email"**: Campo de email informado pelo usuário;
- **"__v"**: Campo de versão gerado pelo banco, utilizado no controle das versões do campo;
- **"token"**: Token gerado automaticamente pela API;
- **"username"**: Username é gerado automaticamente pela API, baseado nos campos "name" e "id".

*Possíveis erros*

| **ERRO** | **CAUSA** | **SOLUÇÃO** |
| :---: | :---: | :---: |
| *(422) "msg": "Please provide your name."* | "name" não informado. | Informar o nome do usuário. |
| *"msg": "Please provide your email."* | "email" não informado. | Informar o email do usuário. |
| *"msg": "Please provide your password."* | "password" não informado. | Informar a senha do usuário. |
|*"msg": "Passwords do not match. Please try again."* | "confirmPassword" não informado ou diferente de "password". | Informar a confirmação de senha e garantir que seu valor seja igual ao valor da senha. |
| *"msg": "User with this email already exists."* | Usuário já cadastrado com este email. | Cadastre com um email diferente. |


- ### /auth/login

Enviar JSON no body da requisição:

**Campos obrigatórios:** "email", "password".

*Exemplo:*
```
{
	"email": "bruno.arrm@gmail.com",
	"password": "123"
}
```
*Retorno da API:*
```
{
    "msg": "Autentication sucsess",
    "userId": "655628f4867f78054af9976a",
    "userName": "brunoarruda65552",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEwMSw4Niw0MCwyNDQsMTM0LDEyNywxMjAsNSw3NCwyNDksMTUxLDEwNl19LCJpYXQiOjE3MDAxNDY0Nzl9.Cj9GTSST3ChPbNHHYGw1ahYP3NonfGj-AKnS_0ixum0"
}
```


- **msg"**: Confirmação de login;
- **"userId"**: ID do usuário logado;
- **"userName"**: Username gerado ao se cadastrar;
- **"__v"**: Campo de versão gerado pelo banco, utilizado no controle das versões do campo;
- **"token"**: Token gerado automaticamente pela API;

*Possíveis erros*

| **ERRO** | **CAUSA** | **SOLUÇÃO** |
| :---: | :---: | :---: |
| *"msg": "Please provide your email."* | "email" não informado.. | Informar o email do usuário. |
| *"msg": "User not found."* | "email" informado não corresponde a nenhum usuário cadastrado. | Informar o email correto. |
| *"msg": "Please provide your password."* | "password" não informado. | Informar a senha do usuário. |

- ### /user/:id

Rota privada, a solicitação somente será atendida se os critérios obrigatórios forem obedecidos.

Enviar nos headers da requisição:

**Campos obrigatórios:** "id", "token". O middleware de validação irá verificaros campos do header.

*Exemplo:*
```
{
	"id": "65560ed529bf767827461452",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEwMSw4Niw0MCwyNDQsMTM0LDEyNywxMjAsNSw3NCwyNDksMTUxLDEwNl19LCJpYXQiOjE3MDAxNDY0Nzl9.Cj9GTSST3ChPbNHHYGw1ahYP3NonfGj-AKnS_0ixum0"
}
```

Enviar JSON no body da requisição:

**Campos opcionais:** "name", "email", "password" junto de "confirmPassword".

Obs.: Caso o "password" seja enviado, o campo "confirmPassword" é obrigatório.

*Exemplo:*

```
{
    "name":"Bruno Arruda Magalhães",
	  "email": "newemail@email.com",
    "password": "123456789",
    "confirmPassword": "123456789"
}
```

*Retorno da API:*
```
{
    "msg": "Updated!",
    "updatedUserData": {
        "_id": "655628f4867f78054af9976a",
        "name": "Bruno Arruda Magalhães",
        "email": "newemail@email.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6WzEwMSw4Niw0MCwyNDQsMTM0LDEyNywxMjAsNSw3NCwyNDksMTUxLDEwNl19LCJpYXQiOjE3MDAxNDY0Nzl9.Cj9GTSST3ChPbNHHYGw1ahYP3NonfGj-AKnS_0ixum0",
        "username": "brunoarruda65522"
    }
}
```


- **msg"**: Objeto contendo a confirmação da operação;
- **"updatedUserData"**: Objeto contendo os dados atualizados, exceto password;
- - **"_id"**: Id do usuário atualizado;
- - **"name"**: Nome do usuário atualizado;
- - **"email"**: Email do usuário atualizado;
- - **"token"**: Token do usuário atualizado;
- - **"Username"**: Username do usuário atualizado;

*Possíveis erros*

| **ERRO** | **CAUSA** | **SOLUÇÃO** |
| :---: | :---: | :---: |
| *""msg": "This user are not owner of this token"* | "id" ou "token" nos headers da requisição não se correspondem. | Enviar o id e token corretamente. |
| *"msg": "Password and confirmPassword doesnt match."* | Tentativa de alterar o password sem enviar "confirmPassword". | Enviar "confirmPassword. |

## AuthenticateSession Middleware para garantir rota privada.

Middleware que deve ser chamado dentro do seu controller, a fim de que o mesmo autentique o usuário da solicitação.

Exemplo:

```
// Autenticate session middleware

const authenticatedSession = await AutenticateSession(req, res);
```

Enviar via props ```req``` e ```res```.

A função retornará uma string, caso a autenticação ocorra com sucesso:

```Authenticated```

---

## Aprendizados

Eu pretendo elevar o nível dos meus projetos e, acredito que uma ótima implementação seria um sistema de login e rotas privadas, a fim de garantir ao usuário melhor personalização dos sistemas que desenvolvo.

Este projeto foi muito importante para mim, pois, além de praticar NodeJS e CRUD com Express, pude entender melhor a lógica de autenticação via token.