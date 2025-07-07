# SmartingPen Stripe Checkout Backend

Ce projet fournit un backend Node.js/Express pour déclencher une session Stripe Checkout complète pour le produit SmartingPen (89€ TTC), avec collecte obligatoire du nom, prénom, email, adresse, téléphone.

## Fonctionnalités
- Prix : 89€ TTC
- Produit : SmartingPen
- Collecte obligatoire : prénom, nom, email, adresse, téléphone
- Limité à la France pour la livraison
- Redirection après paiement : `/success.html` (succès), `/commande.html` (annulation)
- Prêt pour déploiement Render, Vercel, ou local
- **Achat uniquement à l'unité : il n'est pas possible de commander plus d'un produit à la fois**

## Prérequis
- Node.js >= 16
- Un compte Stripe (clé API secrète)

## Installation

1. Clone ce repo ou copie les fichiers dans un dossier :
   ```sh
   git clone <repo-url>
   cd smartingpen-checkout-backend
   npm install
   ```

2. Crée un fichier `.env` à la racine avec :
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   ```
   (remplace par ta vraie clé Stripe secrète)

## Lancement en local