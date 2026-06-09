# Task Manager - Vercel + Supabase Demo

Une application simple de gestion de tâches construite avec Next.js, TypeScript, Tailwind CSS, Supabase et déployée sur Vercel.

## 🚀 Fonctionnalités

- ✅ Créer, lire, mettre à jour et supprimer des tâches
- ✅ Prioriser les tâches (Basse, Moyenne, Haute)
- ✅ Catégoriser les tâches (Professionnel, Personnel)
- ✅ Filtrer et trier les tâches
- ✅ Interface moderne et réactive avec Tailwind CSS
- ✅ Base de données PostgreSQL avec Supabase
- ✅ Déploiement automatique sur Vercel

## 📋 Stack Technique

- **Frontend**: Next.js 14+ avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **VCS**: GitHub

## 🔧 Configuration

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
   - Nom: `vercel-supabase-demo`
   - Region: `eu-west-1`
3. Attendez la création (~2-3 minutes)

### 2. Créer la table des tâches

1. Allez dans **SQL Editor**
2. Exécutez cette requête:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  category TEXT DEFAULT 'perso',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Récupérer les clés d'API

1. Allez dans **Settings > API**
2. Copiez:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configurer les variables d'environnement

#### Local (.env.local):
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

#### Vercel:
1. Allez sur [vercel.com/tsubasa10dev-1537s-projects/vercel-supabase-app-demo](https://vercel.com/tsubasa10dev-1537s-projects/vercel-supabase-app-demo)
2. Allez dans **Settings > Environment Variables**
3. Ajoutez les deux variables ci-dessus
4. Redéployez

## 🏃 Démarrer localement

```bash
npm install
npm run dev
```

Ouvrez http://localhost:3000

## 📤 Déploiement

Le projet est configuré sur Vercel. Chaque push sur `main` déploie automatiquement en production.

Pour tester les changements avant production:
1. Créez une branche: `git checkout -b my-feature`
2. Poussez: `git push origin my-feature`
3. Vercel crée automatiquement une **Preview Deployment**
4. Testez le changement
5. Créez une Pull Request sur GitHub
6. Merge dans `main` pour déployer en production

## 📂 Structure du projet

```
app/
├── components/
│   ├── TaskForm.tsx      # Formulaire pour ajouter une tâche
│   ├── TaskItem.tsx      # Élément de tâche avec actions
│   └── TaskList.tsx      # Liste des tâches avec filtres
├── layout.tsx           # Layout principal
└── page.tsx             # Page d'accueil

lib/
├── supabase.ts          # Client Supabase
└── types.ts             # Types TypeScript
```

## 🔗 Liens

- **GitHub Repo**: https://github.com/tsubasa10-dev/vercel-supabase-app-demo
- **Vercel Project**: https://vercel.com/tsubasa10dev-1537s-projects/vercel-supabase-app-demo

## 📝 Licence

MIT
