# Product Brief: It's Good To Be Goody

> **Version**: 2.0 (BMAD)
> **Date**: 2026-01-19
> **Type**: Blog de voyage familial avec communauté
> **Domaine**: itsgoodtobegoody.com

---

## 1. Vision & Objectifs

### 1.1 Vision
Créer un blog de voyage familial centré sur le partage d'expériences réelles et de conseils pratiques pour voyager sereinement en famille.

### 1.2 Objectifs
- Partager les expériences de voyage (à deux, puis avec enfants)
- Fournir des bonnes pratiques concrètes et pragmatiques
- Proposer des outils et méthodes réellement utilisés (organisation, budget, logistique)
- Être **inspirant mais surtout utile** avec un fort retour d'expérience
- **Créer une communauté** de voyageurs familiaux

### 1.3 Proposition de valeur
Un blog sincère, utile et bien structuré, centré sur l'expérience réelle d'une famille qui voyage, avec une communauté active de membres.

---

## 2. Cibles

### 2.1 Cible principale
**Familles avec enfants / jeunes parents**
- Parents qui veulent voyager avec leurs enfants
- Recherchent des conseils pratiques et éprouvés
- Veulent des ressources concrètes (checklists, budgets)

### 2.2 Cible secondaire
**Couples voyageurs**
- Intéressés par les méthodes d'organisation
- Planifient de futurs voyages en famille

---

## 3. Gouvernance éditoriale

### 3.1 Rôles
| Rôle | Personne | Responsabilités |
|------|----------|-----------------|
| Éditrice | Laure | Création, organisation et évolution des contenus |
| Technique | Développeur | Maintenance du site, évolutions techniques |

### 3.2 Contenus gérés par Laure
- Articles de blog
- Photos et médias
- Fichiers téléchargeables (Excel, checklists)
- Échanges avec les lecteurs (commentaires, emails)
- Ligne éditoriale
- Newsletter mensuelle

---

## 4. Types de contenus

### 4.1 Récits de voyage
- France
- Europe
- Monde
- Format : articles longs avec photos et galeries

### 4.2 Guides pratiques
| Thématique | Description |
|------------|-------------|
| Voyager avec un bébé | Conseils spécifiques 0-2 ans |
| Voyager avec un enfant | Conseils 2+ ans |
| Voyager en couple | Organisation à deux |

### 4.3 Bonnes pratiques
- **Billets d'avion** : astuces réservation, timing, comparateurs
- **Hébergements** : Airbnb, Booking, conseils de choix
- **Organisation sur place** : logistique, transports, activités

### 4.4 Ressources téléchargeables
| Type | Exemples | Accès |
|------|----------|-------|
| Excel itinéraires | Road trips planifiés jour par jour | Libre ou membre |
| Excel budget | Suivi des dépenses voyage | Libre ou membre |
| Checklists | Affaires enfants, adultes, médicaments | Libre ou membre |
| Documents premium | Guides complets | Contre email/membre |

**Stratégie d'accès : Mix**
- Certaines ressources en libre accès
- Ressources premium contre inscription email ou compte membre

---

## 5. Architecture du site

### 5.1 Page d'accueil (Layout équilibré)
```
┌─────────────────────────────────────────────────────────────┐
│  Header : Logo + Navigation + Recherche + Connexion         │
├─────────────────────────────────────────────────────────────┤
│  Hero : Photo voyage + Phrase d'accroche                    │
├─────────────────────────────────────────────────────────────┤
│                    SECTION ÉQUILIBRÉE                       │
│  ┌────────────────────┐  ┌────────────────────────────────┐ │
│  │                    │  │  Derniers articles (3 cards)   │ │
│  │  CARTE INTERACTIVE │  │  - Article 1                   │ │
│  │  (50% largeur)     │  │  - Article 2                   │ │
│  │  Voyages tracés    │  │  - Article 3                   │ │
│  │                    │  │                                │ │
│  └────────────────────┘  └────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Articles les plus consultés                                │
├─────────────────────────────────────────────────────────────┤
│  Catégories principales (accès rapide)                      │
├─────────────────────────────────────────────────────────────┤
│  Newsletter signup                                          │
├─────────────────────────────────────────────────────────────┤
│  Footer : Liens, Instagram, contact                         │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Organisation des contenus

#### Par région du monde
```
Destinations/
├── France/
├── Europe/
│   ├── Espagne/
│   ├── Italie/
│   ├── Portugal/
│   └── ...
├── Asie/
│   ├── Japon/
│   ├── Thaïlande/
│   └── ...
├── Amérique/
└── Afrique/
```

#### Par thématique (transversal)
```
Thématiques/
├── Voyager avec bébé/
├── Voyager avec enfant/
├── Organisation & Budget/
├── Bonnes pratiques avion/
├── Hébergements/
└── Checklists & Ressources/
```

### 5.3 Pages principales
| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Landing page équilibrée carte + articles |
| Blog | `/blog` | Liste des articles paginée |
| Destinations | `/destinations` | Index par région |
| Guides | `/guides` | Guides pratiques thématiques |
| Ressources | `/ressources` | Fichiers téléchargeables |
| À propos | `/a-propos` | **Page importante** - Présentation famille |
| Contact | `/contact` | Formulaire + email |
| Mon compte | `/compte` | Espace membre (favoris, profil) |
| Connexion | `/connexion` | Login / Inscription |

---

## 6. Design

### 6.1 Style : Chaleureux naturel
**Palette de couleurs :**
- **Primaire** : Terracotta / Brique douce (#C4A484, #D4A574)
- **Secondaire** : Beige sable (#F5F0E8, #EDE4D3)
- **Accent** : Vert sauge (#9CAF88) pour les CTA
- **Texte** : Brun foncé (#3D3229)
- **Fond** : Blanc cassé / Crème

**Ambiance :**
- Cocooning, voyage, famille
- Photos mises en valeur (grandes, lumineuses)
- Typographie lisible et chaleureuse

### 6.2 Typographie
- **Titres** : Serif moderne (ex: Playfair Display, Merriweather)
- **Corps** : Sans-serif lisible (ex: Inter, Source Sans Pro)

### 6.3 Responsive
- Mobile-first obligatoire
- Navigation hamburger sur mobile
- Carte adaptative

---

## 7. Fonctionnalités détaillées

### 7.1 CMS - Éditeur pour Laure

**Type : Éditeur visuel WYSIWYG (style Notion)**
- Interface intuitive, pas de code
- Drag & drop pour images et blocs
- Preview en temps réel

**Blocs disponibles :**
| Bloc | Description |
|------|-------------|
| Texte | Paragraphe, titres H1-H4 |
| Image | Image simple avec légende |
| Galerie | Grille, carrousel ou masonry (au choix) |
| Citation | Bloc citation stylisé |
| Encart | Conseil, astuce, warning |
| Fichier | Lien de téléchargement |
| Carte mini | Carte du lieu mentionné |
| Séparateur | Ligne ou espace |

### 7.2 Galeries photos

**Format : Mix selon l'article**
Laure choisit le format pour chaque galerie :
- **Grille** : Photos en grille uniforme, clic pour lightbox
- **Carrousel** : Défilement horizontal
- **Masonry** : Style Pinterest, tailles variées

### 7.3 Carte interactive

**Organisation : Par voyage (tracés/itinéraires)**
- Chaque voyage = un tracé sur la carte
- Points d'étapes cliquables
- Clic sur un voyage → articles associés

**Données par voyage :**
```typescript
interface Trip {
  id: string;
  name: string;           // "Road trip Japon 2024"
  startDate: Date;
  endDate: Date;
  color: string;          // Couleur du tracé
  stops: TripStop[];      // Étapes
  articles: Article[];    // Articles liés
}

interface TripStop {
  id: string;
  name: string;           // "Tokyo"
  lat: number;
  lng: number;
  order: number;
  description?: string;
}
```

### 7.4 Commentaires

**Mode : Publication directe avec anti-spam**
- Commentaires visibles immédiatement après soumission
- Filtre anti-spam automatique (Akismet ou custom)
- Laure peut supprimer si nécessaire
- Réponses imbriquées (threads)
- Notification email à Laure pour nouveaux commentaires

### 7.5 Newsletter

**Fréquence : Résumé mensuel**
- Email mensuel automatique avec :
  - Nouveaux articles du mois
  - Mise en avant d'un article
  - Prochains voyages (si partagés)
- Laure peut aussi envoyer manuellement
- Désabonnement facile

### 7.6 Espace membre (Communauté complète)

**Fonctionnalités membres :**
| Feature | Description |
|---------|-------------|
| Profil | Photo, bio, pays |
| Favoris | Sauvegarder des articles |
| Ressources | Accès aux ressources premium |
| Commentaires | Nom/avatar affiché |
| Historique | Articles lus, téléchargements |

**Inscription :**
- Email + mot de passe
- Ou OAuth (Google, Apple)
- Confirmation email

### 7.7 Ressources téléchargeables

**Stratégie : Mix libre / contre email**

| Type | Accès |
|------|-------|
| Checklists simples | Libre |
| Excel basiques | Libre |
| Guides complets | Inscription email |
| Excel détaillés | Compte membre |
| Ressources premium | Compte membre |

### 7.8 Langue

**Français avec traduction automatique**
- Contenu rédigé en français
- Bouton "Traduire" (Google Translate widget)
- Meta tags FR prioritaires pour SEO

### 7.9 Page À propos (Importante)

**Contenu :**
- Photo de famille
- Histoire du couple/famille
- Pourquoi ce blog
- Parcours de voyage
- Valeurs (authenticité, praticité)
- Liens Instagram

---

## 8. Rôles utilisateurs

### 8.1 Admin (Laure)
- Créer/modifier/supprimer des articles
- Gérer les catégories et tags
- Upload d'images et fichiers
- Gérer les voyages sur la carte
- Supprimer les commentaires
- Voir les statistiques
- Envoyer la newsletter
- Gérer les membres

### 8.2 Membre inscrit
- Lire les articles
- Commenter avec son profil
- Sauvegarder en favoris
- Télécharger toutes les ressources
- Gérer son profil
- Recevoir la newsletter

### 8.3 Visiteur anonyme
- Lire les articles
- Commenter (nom/email requis)
- S'inscrire à la newsletter
- Télécharger ressources libres
- Naviguer sur la carte

---

## 9. Stack technique

### 9.1 Architecture
| Composant | Technologie |
|-----------|-------------|
| Frontend | Next.js 15 + React 19 |
| Styling | Tailwind CSS 4 |
| Backend | Supabase |
| Base de données | PostgreSQL (Supabase) |
| Auth | Supabase Auth (email + OAuth) |
| Storage | Supabase Storage (images, fichiers) |
| CMS | Interface admin custom (WYSIWYG) |
| Éditeur | TipTap ou Plate (rich text) |
| Hébergement | Vercel |
| Newsletter | Resend ou Loops |
| Carte | Mapbox GL JS |
| Traduction | Google Translate widget |
| Anti-spam | Akismet ou hCaptcha |
| Analytics | Plausible (privacy-first) |

---

## 10. Base de données

```sql
-- Utilisateurs (membres + admin)
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT DEFAULT 'member',  -- 'admin', 'member'
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  created_at TIMESTAMPTZ,
  email_verified BOOLEAN
)

-- Articles
articles (
  id UUID PRIMARY KEY,
  title TEXT,
  slug TEXT UNIQUE,
  content JSONB,              -- Contenu WYSIWYG (TipTap JSON)
  excerpt TEXT,
  cover_image TEXT,
  published_at TIMESTAMPTZ,
  status TEXT,                -- 'draft', 'published'
  author_id UUID REFERENCES users,
  reading_time INT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)

-- Catégories
categories (
  id UUID PRIMARY KEY,
  name TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES categories,
  order_index INT
)

-- Tags
tags (id, name, slug)
article_tags (article_id, tag_id)
article_categories (article_id, category_id)

-- Voyages (pour la carte)
trips (
  id UUID PRIMARY KEY,
  name TEXT,
  slug TEXT UNIQUE,
  description TEXT,
  start_date DATE,
  end_date DATE,
  color TEXT,                 -- Couleur du tracé
  cover_image TEXT,
  created_at TIMESTAMPTZ
)

-- Étapes de voyage
trip_stops (
  id UUID PRIMARY KEY,
  trip_id UUID REFERENCES trips,
  name TEXT,
  lat DECIMAL,
  lng DECIMAL,
  order_index INT,
  description TEXT
)

-- Lien articles <-> voyages
article_trips (article_id, trip_id)

-- Commentaires
comments (
  id UUID PRIMARY KEY,
  article_id UUID REFERENCES articles,
  user_id UUID REFERENCES users,  -- NULL si anonyme
  author_name TEXT,               -- Si anonyme
  author_email TEXT,              -- Si anonyme
  content TEXT,
  status TEXT DEFAULT 'approved', -- 'approved', 'spam', 'deleted'
  parent_id UUID REFERENCES comments,
  created_at TIMESTAMPTZ
)

-- Ressources téléchargeables
resources (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  file_url TEXT,
  file_type TEXT,             -- 'pdf', 'excel', 'zip'
  access_level TEXT,          -- 'free', 'email', 'member'
  download_count INT DEFAULT 0,
  category TEXT,
  created_at TIMESTAMPTZ
)

-- Favoris des membres
favorites (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  article_id UUID REFERENCES articles,
  created_at TIMESTAMPTZ
)

-- Newsletter
subscribers (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  status TEXT DEFAULT 'active', -- 'active', 'unsubscribed'
  subscribed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ
)

-- Téléchargements (tracking)
downloads (
  id UUID PRIMARY KEY,
  resource_id UUID REFERENCES resources,
  user_id UUID REFERENCES users,
  ip_address INET,
  downloaded_at TIMESTAMPTZ
)
```

---

## 11. SEO & Performance

### 11.1 SEO
- Meta tags dynamiques par article
- Sitemap XML automatique
- Structured data (Article, BreadcrumbList, Person)
- URLs propres : `/blog/japon-avec-bebe-conseils`
- Images optimisées avec alt text
- Open Graph pour partage social

### 11.2 Performance
- Images optimisées (Next.js Image, WebP)
- Lazy loading images et galeries
- Cache des pages statiques (ISR)
- Core Web Vitals optimisés
- Compression gzip/brotli

---

## 12. Critères de succès

1. **Laure peut publier** : interface CMS intuitive et agréable
2. **Design chaleureux** : ambiance beige/terracotta réussie
3. **Carte fonctionnelle** : voyages tracés et cliquables
4. **Communauté** : inscription membres, favoris, commentaires
5. **Ressources** : téléchargement libre et membre
6. **Newsletter** : envoi mensuel automatique
7. **Mobile** : site 100% responsive
8. **Performance** : chargement < 3s
9. **SEO** : indexation Google

---

## 13. Résumé des choix BMAD

| Aspect | Décision |
|--------|----------|
| Page d'accueil | Équilibrée (50% carte + 50% articles) |
| Éditeur CMS | Visuel WYSIWYG (TipTap/Plate) |
| Ressources | Mix (libres + contre email/membre) |
| Commentaires | Publication directe + anti-spam auto |
| Design | Chaleureux naturel (beige/terracotta) |
| Carte | Par voyage (tracés/itinéraires) |
| Newsletter | Résumé mensuel automatique |
| Page À propos | Importante et détaillée |
| Galeries photos | Mix selon l'article (grille/carrousel/masonry) |
| Langue | Français + bouton traduction Google |
| Temps de lecture | Non affiché |
| Espace membre | Communauté complète (favoris, profil, ressources) |
| Scope | Tout d'un coup (pas de MVP réduit) |

---

## Annexe : Inspirations

- **Design** : Tons terracotta/beige des blogs lifestyle
- **CMS** : Notion, Medium (éditeur)
- **Carte** : Polarsteps (voyages tracés)
- **Communauté** : Blogs avec espace membre
