# 📚 🤡 King's Bot
 
# Bot Discord pour Gestion des Livres de Stephen King

Ce projet est un bot Discord qui permet aux utilisateurs d'ajouter des livres de Stephen King à leur bibliothèque personnelle en utilisant l'API Google Books et une base de données SQLite pour stocker les livres. Le bot vérifie également les doublons avant d'ajouter un livre à la bibliothèque de l'utilisateur.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [SQLite](https://www.sqlite.org/download.html)

## Installation

1. Clonez le dépôt de votre projet :
    ```sh
    git clone https://github.com/votre-utilisateur/votre-projet.git](https://github.com/Chloe-Patte/King-s-Bot.git
    cd votre-projet
    ```

2. Installez les dépendances du projet :
    ```sh
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires :
    ```ini
    TOKEN=YOUR_DISCORD_BOT_TOKEN
    GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY
    MONGODB_URI=YOUR_MONGODB_URI
    CLIENT_ID=YOUR_CLIENT_ID_BOT
    ```
4. Démarrez votre bot localement :
    ```sh
    npm start
    ```

## Utilisation

- Ajoutez votre bot à un serveur Discord.
- Utilisez la commande `/addbook` suivie du titre du livre pour ajouter un livre de Stephen King à votre bibliothèque personnelle.
- Utilisez la commande `/bookSumary` suivie du titre du livre pour consulter le résumé du livre de Stephen King grâce à l'API Google Books.
- Utilisez la commande `/removeBook` suivie du titre du livre pour supprimer un livre de Stephen King à votre bibliothèque personnelle.
- Utilisez la commande `/listBook` pour accéder à votre liste personnelle.
- Utilisez la commande `/help` pour afficher la liste de toutes les commandes disponibles.

## Auteur

- Chloé
