# Social Network API

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

A simple social network API created for training concepts like authentication, authorization, HATEOAS, encryption, openAPI, containers, etc.

## Features

- Authentication and authorization mechanisms
- HATEOAS support for RESTful interactions
- Encryption for securing sensitive data
- OpenAPI documentation with Swagger
- Containerized with Docker

## Getting started

### Downloading from Docker Hub

1. Download the image

```
docker pull vceolin/social-network-api
```

2. Run it!

```
docker run -p 3000:3000 vceolin/social-network-api
```

### Setting up the docker image yourself

If you prefer, you can setup the docker image locally:

1. Build the Dockerfile

```
docker build -t social-network-api .
```

2. Run it!

```
docker run -p 3000:3000 social-network-api
```

### Running without Docker

After making sure you have `nodejs` and `yarn` installed, you need to first install the dependencies:

```
yarn install
```

Then you can simply run:

```
yarn start
```

## Usage

After running the application, Swagger will be available @ `http://localhost:3000`.

---

Made with ❤️ by vceolin
