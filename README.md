# Projet API Gateway & Microservices GraphQL avec gRPC et Kafka

## Description

Ce projet met en place une architecture microservices avec une **API Gateway** en Node.js qui expose une API GraphQL. Cette API orchestre les appels vers plusieurs microservices spécialisés (`movie` et `tvShow`) via gRPC, avec des définitions dans des fichiers `.proto`. Kafka est intégré pour gérer la communication asynchrone par messages.

Cette architecture permet une séparation claire des responsabilités, une scalabilité facile, et un système réactif.

## Architecture du projet


├── apiGateway.js # Serveur API Gateway avec Apollo Server GraphQL
├── movieMicroservice.js # Microservice Movie (serveur gRPC)
├── tvShowMicroservice.js # Microservice TV Show (serveur gRPC)
├── movie.proto # Définition gRPC pour Movie
├── tvShow.proto # Définition gRPC pour TV Show
├── resolvers.js # Résolveurs GraphQL appelant les microservices
├── schema.js # Schéma GraphQL (typeDefs)
├── services/ # Clients gRPC et autres services utilitaires
├── package.json # Dépendances et scripts du projet

##lancer les microservices gRPC dans terminaux
node movieMicroservice.js
node tvShowMicroservice.js
