# CLAUDE.md - It's Good To Be Goody

## Description du projet

**It's Good To Be Goody** est un blog de voyage familial créé pour Laure et sa famille. Le blog partage des expériences réelles de voyage et des conseils pratiques pour voyager sereinement en famille.

### Objectifs
- Partager les expériences de voyage (à deux, puis avec enfants)
- Fournir des bonnes pratiques concrètes et pragmatiques
- Proposer des outils (Excel, checklists) réellement utilisés
- Créer une communauté de voyageurs familiaux

### Cible
- Familles avec enfants / jeunes parents
- Couples voyageurs

## Structure du projet

```
itsgoodtobegoody/
├── app/
│   ├── (public)/         # Pages publiques (blog, destinations, etc.)
│   ├── (auth)/           # Connexion, inscription
│   ├── (member)/         # Espace membre (compte, favoris)
│   ├── admin/            # CMS pour Laure
│   └── api/              # API routes
├── components/
│   ├── ui/               # Composants UI (button, card...)
│   ├── layout/           # Header, footer
│   ├── blog/             # Composants blog
│   └── editor/           # Éditeur TipTap WYSIWYG
├── lib/
│   ├── supabase/         # Clients Supabase
│   ├── utils/            # Utilitaires (cn, date...)
│   └── config/           # Configuration site
├── types/                # Types TypeScript
├── public/               # Assets statiques
├── supabase/
│   └── migrations/       # Migrations SQL
├── _bmad/                # Méthodologie BMAD
└── _bmad-output/         # Spécifications
```

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | Next.js 15 + React 19 + Tailwind CSS 4 |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Éditeur | TipTap (WYSIWYG) |
| Carte | Mapbox GL JS |
| Newsletter | Resend |
| Analytics | Plausible |
| Hébergement | Vercel |

## Commandes principales

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Supabase
npm run db:push      # Pousser les migrations
npm run db:reset     # Reset la base
npm run db:generate  # Générer les types
```

## Design

**Style : Chaleureux naturel**
- Primaire : Terracotta (#C4A484)
- Secondaire : Beige sable (#F5F0E8)
- Accent : Vert sauge (#9CAF88)
- Texte : Brun foncé (#3D3229)

**Typographie :**
- Titres : Playfair Display (serif)
- Corps : Inter (sans-serif)

## Fonctionnalités principales

### Pour les visiteurs
- Blog avec articles, catégories, tags
- Carte interactive des voyages
- Ressources téléchargeables
- Commentaires
- Newsletter mensuelle
- Espace membre (favoris, profil)

### Pour Laure (Admin)
- Éditeur WYSIWYG intuitif
- Gestion des articles
- Gestion des voyages sur la carte
- Upload d'images et fichiers
- Modération des commentaires
- Envoi de newsletters

## Base de données

Tables principales :
- `profiles` - Utilisateurs (membres + admin)
- `articles` - Articles de blog
- `categories` - Catégories d'articles
- `tags` - Tags transversaux
- `trips` - Voyages (pour la carte)
- `trip_stops` - Étapes de voyage
- `comments` - Commentaires visiteurs
- `resources` - Fichiers téléchargeables
- `favorites` - Favoris des membres
- `subscribers` - Abonnés newsletter

## Documentation BMAD

- **Product Brief** : `_bmad-output/specs/product-brief.md`
- **Spec technique** : `_bmad-output/specs/technical-spec.md`

## Contact

- **Site** : itsgoodtobegoody.com
- **Email** : contact@itsgoodtobegoody.com
- **Instagram** : @itsgoodtobegoody
