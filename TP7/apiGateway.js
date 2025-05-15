const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const kafka = require("kafkajs");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
const port = 4000;

// Kafka setup
const { Kafka } = kafka;
const kafkaClient = new Kafka({
  clientId: "api-gateway",
  brokers: ["localhost:9092"], // adresse kafka
});

const producer = kafkaClient.producer();
const consumer = kafkaClient.consumer({ groupId: "api-group" }); // terminaisons correctes

async function start() {
  // Connecter le producer et consumer Kafka
  await producer.connect();
  await consumer.connect();

  // Abonnement au topic Kafka
  await consumer.subscribe({ topic: "mon-topic", fromBeginning: true });

  // Consommer les messages Kafka
  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Message reçu : ${message.value.toString()}`);
      // Ici tu peux gérer le message reçu et éventuellement appeler une mutation GraphQL ou autre logique
    },
  });

  // Création du serveur Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Démarrer Apollo Server
  await server.start();

  // Middleware Apollo + Express + bodyParser + CORS
  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  app.listen(port, () => {
    console.log(`Serveur API démarré sur http://localhost:${port}/graphql`);
  });
}

start().catch((err) => {
  console.error("Erreur au démarrage du serveur:", err);
  process.exit(1);
});
