# Dashboard VitalView

Dashboard interactif pour visualiser les données cardiovasculaires avec Prisma, Next.js et Recharts.

## 🚀 Démarrage rapide

### 1. Installer les dépendances

```bash
yarn install
```

### 2. Configurer la base de données

Assurez-vous que Docker est lancé, puis démarrez PostgreSQL :

```bash
yarn dev-config
```

### 3. Créer le fichier .env

Créez un fichier `.env` à la racine avec :

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vitalview?schema=public"
```

### 4. Appliquer les migrations

```bash
npx prisma migrate dev
```

### 5. Générer le client Prisma

```bash
npx prisma generate
```

### 6. Ajouter des données de test

```bash
yarn db:seed
```

### 7. Lancer le serveur de développement

```bash
yarn dev
```

Ouvrez [http://localhost:3000/dashboard](http://localhost:3000/dashboard) dans votre navigateur.

## 📊 Fonctionnalités du Dashboard

### Cartes de statistiques

- **Total Patients** : Nombre total d'enregistrements
- **Âge Moyen** : Moyenne d'âge des patients
- **Taux de Maladie** : Pourcentage de patients avec maladie cardiovasculaire
- **Rythme Cardiaque** : Moyenne du rythme cardiaque maximum

### Graphiques

#### Distribution par Âge

Graphique en barres montrant la répartition des patients sains vs malades par tranche d'âge.

#### Facteurs de Risque

Graphique circulaire illustrant la distribution des principaux facteurs de risque :

- Hypertension (pression > 140 mmHg)
- Cholestérol élevé (> 240 mg/dl)
- Glycémie élevée
- Angine après effort

#### Métriques de Santé par Âge

Graphique en courbes montrant l'évolution de :

- Pression artérielle
- Cholestérol
- Rythme cardiaque

### Tableau de données

Liste des 10 derniers enregistrements avec les informations clés de chaque patient.

## 🗄️ Structure des données

Le modèle `CardiovascularData` comprend :

- **Données démographiques** : âge, sexe
- **Indicateurs vitaux** : pression artérielle, cholestérol, rythme cardiaque, glycémie
- **Résultats d'examens** : ECG, fluoroscopie, thalassémie
- **Symptômes** : types d'angine, angine après sport
- **Diagnostic** : présence de maladie cardiovasculaire (0 = Non, 1-4 = Oui)

## 🛠️ Technologies utilisées

- **Next.js 16** : Framework React avec App Router
- **Prisma** : ORM pour la gestion de la base de données
- **PostgreSQL** : Base de données relationnelle
- **Recharts** : Bibliothèque de graphiques React
- **Tailwind CSS** : Framework CSS utilitaire
- **shadcn/ui** : Composants UI réutilisables

## 📝 Scripts utiles

```bash
# Lancer le dev
yarn dev

# Démarrer la base de données
yarn dev-config

# Arrêter la base de données
yarn dev-config:stop

# Voir les logs de la base de données
yarn dev-config:logs

# Réinitialiser la base de données
yarn dev-config:reset

# Ajouter des données de test
yarn db:seed

# Ouvrir Prisma Studio
npx prisma studio
```

## 🎨 Personnalisation

Les couleurs des graphiques sont définies dans `src/styles/globals.css` :

- `--chart-1` à `--chart-5` pour les thèmes clair et sombre

## 📦 Structure du projet

```
src/
├── app/
│   ├── (board)/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Page principale du dashboard
│   │   └── layout.tsx             # Layout de la section board
│   ├── layout.tsx                 # Layout racine
│   └── page.tsx                   # Page d'accueil
├── components/
│   ├── dashboard/
│   │   ├── stats-cards.tsx        # Cartes de statistiques
│   │   ├── age-distribution-chart.tsx
│   │   ├── health-metrics-chart.tsx
│   │   ├── disease-factors-chart.tsx
│   │   └── data-table.tsx         # Tableau de données
│   └── ui/                        # Composants UI (shadcn)
├── lib/
│   └── prisma.ts                  # Client Prisma
└── styles/
    └── globals.css                # Styles globaux

prisma/
├── schema.prisma                  # Schéma de la base de données
├── seed.ts                        # Script de seed
└── migrations/                    # Migrations
```
