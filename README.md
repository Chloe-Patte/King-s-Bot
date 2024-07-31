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
    git clone https://github.com/votre-utilisateur/votre-projet.git
    cd votre-projet
    ```

2. Installez les dépendances du projet :
    ```sh
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires :
    ```ini
    DISCORD_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN
    GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY
    ```

4. Initialisez la base de données SQLite :
    ```sh
    touch database.js
    ```
