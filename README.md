# SmartingPen Stripe Checkout Backend

Ce projet fournit un backend Node.js/Express pour déclencher une session Stripe Checkout complète pour le produit SmartingPen (89€ TTC), avec collecte obligatoire du nom, prénom, email, adresse, téléphone, etc.

## Fonctionnalités
- Prix : 89€ TTC
- Produit : SmartingPen
- Collecte obligatoire : prénom, nom, email, adresse, téléphone
- Limité à la France pour la livraison
- Redirection après paiement : `/success.html` (succès), `/commande.html` (annulation)
- Prêt pour déploiement Render, Vercel, ou local

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

```sh
node server.js
```

Le serveur écoute sur http://localhost:4242

## Utilisation côté client

Dans `checkout.html`, le bouton "Commander maintenant" appelle `/create-checkout-session` et redirige automatiquement vers Stripe.

## Déploiement

### Render
- Crée un nouveau service web sur [Render](https://render.com/)
- Connecte ton repo ou upload les fichiers
- Ajoute la variable d'environnement `STRIPE_SECRET_KEY`
- Commande de démarrage : `node server.js`

### Vercel
- Déploie comme un projet Node.js (API routes)
- Ajoute la variable d'environnement `STRIPE_SECRET_KEY`

## Personnalisation
- Modifie le prix, le nom du produit, ou les champs Stripe dans `server.js` si besoin.

---

**Contact :** contact@smartingpen.com 