# It's Good To Be Goody - Spécification Technique

> **Version**: 1.0
> **Date**: 2026-01-19
> **Stack**: Next.js 15 + Supabase + Vercel
> **Domaine**: itsgoodtobegoody.com

---

## 1. Architecture globale

### 1.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Next.js 15 App                         │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Public    │  │    Admin    │  │      API        │   │  │
│  │  │   Pages     │  │     CMS     │  │    Routes       │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SUPABASE                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL  │  │    Auth      │  │      Storage         │  │
│  │   Database   │  │   (users)    │  │  (images, files)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICES EXTERNES                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │
│  │  Mapbox  │  │  Resend  │  │ Plausible│  │   hCaptcha   │    │
│  │  (carte) │  │ (emails) │  │(analytics)│ │  (anti-spam) │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Stack détaillée

| Catégorie | Technologie | Version | Usage |
|-----------|-------------|---------|-------|
| Framework | Next.js | 15.x | App Router, SSR/SSG |
| UI | React | 19.x | Components |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Database | PostgreSQL | 15+ | Via Supabase |
| Auth | Supabase Auth | - | Email + OAuth |
| Storage | Supabase Storage | - | Images, fichiers |
| ORM | Supabase JS | 2.x | Client + Server |
| Editor | TipTap | 2.x | WYSIWYG editor |
| Map | Mapbox GL JS | 3.x | Carte interactive |
| Email | Resend | - | Newsletter, notifications |
| Analytics | Plausible | - | Privacy-first |
| Anti-spam | hCaptcha | - | Protection formulaires |
| Icons | Lucide React | - | Icon library |
| Forms | React Hook Form | 7.x | Validation |
| Validation | Zod | 3.x | Schema validation |
| Date | date-fns | 3.x | Manipulation dates |

---

## 2. Structure du projet

```
itsgoodtobegoody/
├── app/
│   ├── (public)/                    # Routes publiques
│   │   ├── page.tsx                 # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx             # Liste articles
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Article détail
│   │   ├── destinations/
│   │   │   ├── page.tsx             # Carte + liste
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Destination détail
│   │   ├── guides/
│   │   │   ├── page.tsx             # Liste guides
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Guide détail
│   │   ├── ressources/
│   │   │   └── page.tsx             # Téléchargements
│   │   ├── a-propos/
│   │   │   └── page.tsx             # Page famille
│   │   ├── contact/
│   │   │   └── page.tsx             # Formulaire contact
│   │   └── layout.tsx               # Layout public
│   │
│   ├── (auth)/                      # Routes auth
│   │   ├── connexion/
│   │   │   └── page.tsx             # Login
│   │   ├── inscription/
│   │   │   └── page.tsx             # Register
│   │   ├── mot-de-passe-oublie/
│   │   │   └── page.tsx             # Reset password
│   │   └── layout.tsx               # Layout auth
│   │
│   ├── (member)/                    # Routes membres
│   │   ├── compte/
│   │   │   ├── page.tsx             # Dashboard membre
│   │   │   ├── profil/
│   │   │   │   └── page.tsx         # Édition profil
│   │   │   ├── favoris/
│   │   │   │   └── page.tsx         # Articles favoris
│   │   │   └── telechargements/
│   │   │       └── page.tsx         # Historique DL
│   │   └── layout.tsx               # Layout membre (auth required)
│   │
│   ├── admin/                       # CMS Admin (Laure)
│   │   ├── page.tsx                 # Dashboard admin
│   │   ├── articles/
│   │   │   ├── page.tsx             # Liste articles
│   │   │   ├── nouveau/
│   │   │   │   └── page.tsx         # Créer article
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Éditer article
│   │   ├── voyages/
│   │   │   ├── page.tsx             # Liste voyages
│   │   │   ├── nouveau/
│   │   │   │   └── page.tsx         # Créer voyage
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Éditer voyage
│   │   ├── ressources/
│   │   │   ├── page.tsx             # Liste ressources
│   │   │   └── nouveau/
│   │   │       └── page.tsx         # Upload ressource
│   │   ├── commentaires/
│   │   │   └── page.tsx             # Modération
│   │   ├── membres/
│   │   │   └── page.tsx             # Liste membres
│   │   ├── newsletter/
│   │   │   └── page.tsx             # Gestion newsletter
│   │   ├── categories/
│   │   │   └── page.tsx             # Gestion catégories
│   │   └── layout.tsx               # Layout admin (admin required)
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts         # OAuth callback
│   │   ├── newsletter/
│   │   │   ├── subscribe/
│   │   │   │   └── route.ts         # Inscription
│   │   │   └── send/
│   │   │       └── route.ts         # Envoi newsletter
│   │   ├── contact/
│   │   │   └── route.ts             # Formulaire contact
│   │   ├── comments/
│   │   │   └── route.ts             # CRUD commentaires
│   │   ├── favorites/
│   │   │   └── route.ts             # Toggle favoris
│   │   ├── downloads/
│   │   │   └── [id]/
│   │   │       └── route.ts         # Téléchargement fichier
│   │   ├── upload/
│   │   │   └── route.ts             # Upload images/fichiers
│   │   └── revalidate/
│   │       └── route.ts             # ISR revalidation
│   │
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   ├── not-found.tsx                # 404 page
│   └── error.tsx                    # Error page
│
├── components/
│   ├── ui/                          # Composants UI réutilisables
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   ├── dropdown.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   │
│   ├── layout/                      # Composants layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   ├── mobile-menu.tsx
│   │   └── search-bar.tsx
│   │
│   ├── blog/                        # Composants blog
│   │   ├── article-card.tsx
│   │   ├── article-content.tsx
│   │   ├── article-header.tsx
│   │   ├── article-gallery.tsx
│   │   ├── related-articles.tsx
│   │   └── share-buttons.tsx
│   │
│   ├── map/                         # Composants carte
│   │   ├── world-map.tsx
│   │   ├── trip-layer.tsx
│   │   ├── trip-popup.tsx
│   │   └── map-controls.tsx
│   │
│   ├── comments/                    # Composants commentaires
│   │   ├── comment-list.tsx
│   │   ├── comment-item.tsx
│   │   ├── comment-form.tsx
│   │   └── comment-reply.tsx
│   │
│   ├── newsletter/                  # Composants newsletter
│   │   ├── subscribe-form.tsx
│   │   └── subscribe-popup.tsx
│   │
│   ├── resources/                   # Composants ressources
│   │   ├── resource-card.tsx
│   │   ├── resource-list.tsx
│   │   └── download-button.tsx
│   │
│   ├── editor/                      # Éditeur WYSIWYG (Admin)
│   │   ├── tiptap-editor.tsx
│   │   ├── toolbar.tsx
│   │   ├── blocks/
│   │   │   ├── image-block.tsx
│   │   │   ├── gallery-block.tsx
│   │   │   ├── quote-block.tsx
│   │   │   ├── callout-block.tsx
│   │   │   └── file-block.tsx
│   │   └── extensions/
│   │       └── custom-extensions.ts
│   │
│   ├── admin/                       # Composants admin
│   │   ├── sidebar.tsx
│   │   ├── stats-card.tsx
│   │   ├── data-table.tsx
│   │   └── image-uploader.tsx
│   │
│   └── forms/                       # Formulaires
│       ├── login-form.tsx
│       ├── register-form.tsx
│       ├── contact-form.tsx
│       └── profile-form.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # Supabase browser client
│   │   ├── server.ts                # Supabase server client
│   │   ├── admin.ts                 # Supabase admin client
│   │   └── middleware.ts            # Auth middleware
│   │
│   ├── api/
│   │   ├── articles.ts              # API articles
│   │   ├── trips.ts                 # API voyages
│   │   ├── comments.ts              # API commentaires
│   │   ├── resources.ts             # API ressources
│   │   ├── users.ts                 # API users
│   │   └── newsletter.ts            # API newsletter
│   │
│   ├── utils/
│   │   ├── cn.ts                    # classNames utility
│   │   ├── date.ts                  # Date formatting
│   │   ├── slug.ts                  # Slug generation
│   │   ├── storage.ts               # Storage helpers
│   │   └── validation.ts            # Zod schemas
│   │
│   ├── hooks/
│   │   ├── use-auth.ts              # Auth hook
│   │   ├── use-favorites.ts         # Favoris hook
│   │   ├── use-comments.ts          # Comments hook
│   │   └── use-debounce.ts          # Debounce hook
│   │
│   └── config/
│       ├── site.ts                  # Site config
│       ├── navigation.ts            # Nav links
│       └── colors.ts                # Design tokens
│
├── types/
│   ├── database.ts                  # Supabase generated types
│   ├── article.ts                   # Article types
│   ├── trip.ts                      # Trip types
│   ├── user.ts                      # User types
│   └── index.ts                     # Export all
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-dark.svg
│   │   └── placeholder.jpg
│   ├── fonts/
│   │   └── ...
│   └── favicon.ico
│
├── supabase/
│   ├── migrations/
│   │   ├── 00001_initial_schema.sql
│   │   ├── 00002_rls_policies.sql
│   │   └── ...
│   ├── seed.sql
│   └── config.toml
│
├── _bmad/                           # BMAD methodology
├── _bmad-output/                    # BMAD artifacts
│
├── .env.local                       # Variables locales
├── .env.example                     # Template variables
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── CLAUDE.md
└── README.md
```

---

## 3. Base de données (PostgreSQL)

### 3.1 Schéma complet

```sql
-- ==============================================
-- EXTENSIONS
-- ==============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- Pour recherche fulltext

-- ==============================================
-- ENUM TYPES
-- ==============================================
CREATE TYPE user_role AS ENUM ('admin', 'member');
CREATE TYPE article_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE comment_status AS ENUM ('approved', 'pending', 'spam', 'deleted');
CREATE TYPE resource_access AS ENUM ('free', 'email', 'member');
CREATE TYPE subscriber_status AS ENUM ('active', 'unsubscribed');

-- ==============================================
-- USERS (via Supabase Auth + profil étendu)
-- ==============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role user_role DEFAULT 'member',
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  website TEXT,
  instagram TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- CATEGORIES
-- ==============================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image TEXT,
  parent_id UUID REFERENCES public.categories(id),
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour hiérarchie
CREATE INDEX idx_categories_parent ON public.categories(parent_id);

-- ==============================================
-- TAGS
-- ==============================================
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- TRIPS (Voyages)
-- ==============================================
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  start_date DATE,
  end_date DATE,
  color TEXT DEFAULT '#C4A484',  -- Terracotta par défaut
  cover_image TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- TRIP STOPS (Étapes de voyage)
-- ==============================================
CREATE TABLE public.trip_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  order_index INT NOT NULL,
  arrival_date DATE,
  departure_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour requêtes par voyage
CREATE INDEX idx_trip_stops_trip ON public.trip_stops(trip_id);
CREATE INDEX idx_trip_stops_order ON public.trip_stops(trip_id, order_index);

-- ==============================================
-- ARTICLES
-- ==============================================
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '{}',  -- TipTap JSON
  cover_image TEXT,
  cover_image_alt TEXT,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  status article_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  featured BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche et filtrage
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published ON public.articles(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_articles_featured ON public.articles(featured) WHERE featured = TRUE;
CREATE INDEX idx_articles_slug ON public.articles(slug);

-- Index fulltext pour recherche
CREATE INDEX idx_articles_search ON public.articles
  USING GIN (to_tsvector('french', coalesce(title, '') || ' ' || coalesce(excerpt, '')));

-- ==============================================
-- ARTICLE RELATIONS
-- ==============================================

-- Articles <-> Categories
CREATE TABLE public.article_categories (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- Articles <-> Tags
CREATE TABLE public.article_tags (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Articles <-> Trips
CREATE TABLE public.article_trips (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, trip_id)
);

-- Index pour relations
CREATE INDEX idx_article_categories_cat ON public.article_categories(category_id);
CREATE INDEX idx_article_tags_tag ON public.article_tags(tag_id);
CREATE INDEX idx_article_trips_trip ON public.article_trips(trip_id);

-- ==============================================
-- COMMENTS
-- ==============================================
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  -- Pour commentaires anonymes
  author_name TEXT,
  author_email TEXT,
  content TEXT NOT NULL,
  status comment_status DEFAULT 'approved',
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_comments_article ON public.comments(article_id);
CREATE INDEX idx_comments_user ON public.comments(user_id);
CREATE INDEX idx_comments_parent ON public.comments(parent_id);
CREATE INDEX idx_comments_status ON public.comments(status);

-- ==============================================
-- RESOURCES (Fichiers téléchargeables)
-- ==============================================
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INT,  -- En bytes
  file_type TEXT NOT NULL,  -- 'pdf', 'xlsx', 'zip'
  thumbnail_url TEXT,
  access_level resource_access DEFAULT 'free',
  category TEXT,
  download_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_resources_access ON public.resources(access_level);
CREATE INDEX idx_resources_category ON public.resources(category);

-- ==============================================
-- DOWNLOADS (Tracking téléchargements)
-- ==============================================
CREATE TABLE public.downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_downloads_resource ON public.downloads(resource_id);
CREATE INDEX idx_downloads_user ON public.downloads(user_id);

-- ==============================================
-- FAVORITES
-- ==============================================
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Index
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_article ON public.favorites(article_id);

-- ==============================================
-- NEWSLETTER SUBSCRIBERS
-- ==============================================
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  status subscriber_status DEFAULT 'active',
  source TEXT,  -- 'popup', 'footer', 'resource'
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Index
CREATE INDEX idx_subscribers_status ON public.subscribers(status);
CREATE INDEX idx_subscribers_email ON public.subscribers(email);

-- ==============================================
-- NEWSLETTER CAMPAIGNS
-- ==============================================
CREATE TABLE public.newsletter_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMPTZ,
  recipient_count INT DEFAULT 0,
  open_count INT DEFAULT 0,
  click_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- CONTACT MESSAGES
-- ==============================================
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- SITE SETTINGS
-- ==============================================
CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- FUNCTIONS
-- ==============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Fonction pour incrémenter view_count
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.articles
  SET view_count = view_count + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour incrémenter download_count
CREATE OR REPLACE FUNCTION increment_download_count(resource_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.resources
  SET download_count = download_count + 1
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql;

-- Fonction de recherche articles
CREATE OR REPLACE FUNCTION search_articles(search_query TEXT)
RETURNS SETOF public.articles AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.articles
  WHERE status = 'published'
    AND (
      to_tsvector('french', coalesce(title, '') || ' ' || coalesce(excerpt, ''))
      @@ plainto_tsquery('french', search_query)
      OR title ILIKE '%' || search_query || '%'
      OR excerpt ILIKE '%' || search_query || '%'
    )
  ORDER BY published_at DESC;
END;
$$ LANGUAGE plpgsql;
```

### 3.2 Row Level Security (RLS)

```sql
-- ==============================================
-- RLS POLICIES
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- PROFILES
-- ==============================================

-- Tout le monde peut voir les profils publics
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ==============================================
-- ARTICLES
-- ==============================================

-- Articles publiés visibles par tous
CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (status = 'published' OR auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- Seuls les admins peuvent créer/modifier/supprimer
CREATE POLICY "Admins can manage articles"
  ON public.articles FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- ==============================================
-- CATEGORIES & TAGS
-- ==============================================

-- Visibles par tous
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Tags are viewable by everyone"
  ON public.tags FOR SELECT
  USING (true);

-- Admins only pour modifications
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can manage tags"
  ON public.tags FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- ==============================================
-- TRIPS
-- ==============================================

-- Voyages visibles par tous
CREATE POLICY "Trips are viewable by everyone"
  ON public.trips FOR SELECT
  USING (true);

CREATE POLICY "Trip stops are viewable by everyone"
  ON public.trip_stops FOR SELECT
  USING (true);

-- Admins only pour modifications
CREATE POLICY "Admins can manage trips"
  ON public.trips FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

CREATE POLICY "Admins can manage trip stops"
  ON public.trip_stops FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- ==============================================
-- COMMENTS
-- ==============================================

-- Commentaires approuvés visibles par tous
CREATE POLICY "Approved comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (status = 'approved' OR auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- Tout le monde peut créer un commentaire
CREATE POLICY "Anyone can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (true);

-- Les utilisateurs peuvent supprimer leurs propres commentaires
CREATE POLICY "Users can delete own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id);

-- Admins peuvent tout gérer
CREATE POLICY "Admins can manage comments"
  ON public.comments FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- ==============================================
-- RESOURCES
-- ==============================================

-- Ressources visibles selon niveau d'accès
CREATE POLICY "Resources are viewable based on access level"
  ON public.resources FOR SELECT
  USING (
    access_level = 'free'
    OR (access_level = 'email' AND auth.uid() IS NOT NULL)
    OR (access_level = 'member' AND auth.uid() IS NOT NULL)
    OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Admins only pour modifications
CREATE POLICY "Admins can manage resources"
  ON public.resources FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- ==============================================
-- FAVORITES
-- ==============================================

-- Utilisateurs voient leurs propres favoris
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Utilisateurs peuvent gérer leurs favoris
CREATE POLICY "Users can manage own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id);

-- ==============================================
-- SUBSCRIBERS
-- ==============================================

-- Admins peuvent voir/gérer
CREATE POLICY "Admins can manage subscribers"
  ON public.subscribers FOR ALL
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- Insertion publique (inscription)
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  WITH CHECK (true);

-- ==============================================
-- DOWNLOADS
-- ==============================================

-- Utilisateurs voient leurs téléchargements
CREATE POLICY "Users can view own downloads"
  ON public.downloads FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  ));

-- Insertion pour tracking
CREATE POLICY "Anyone can create download record"
  ON public.downloads FOR INSERT
  WITH CHECK (true);
```

---

## 4. API Routes

### 4.1 Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| **Auth** ||||
| GET | `/api/auth/callback` | OAuth callback | - |
| **Articles** ||||
| GET | `/api/articles` | Liste articles | - |
| GET | `/api/articles/[slug]` | Article par slug | - |
| POST | `/api/articles` | Créer article | Admin |
| PATCH | `/api/articles/[id]` | Modifier article | Admin |
| DELETE | `/api/articles/[id]` | Supprimer article | Admin |
| **Comments** ||||
| GET | `/api/comments?articleId=X` | Liste commentaires | - |
| POST | `/api/comments` | Créer commentaire | - |
| DELETE | `/api/comments/[id]` | Supprimer | User/Admin |
| PATCH | `/api/comments/[id]/status` | Changer statut | Admin |
| **Favorites** ||||
| GET | `/api/favorites` | Mes favoris | User |
| POST | `/api/favorites` | Ajouter favori | User |
| DELETE | `/api/favorites/[articleId]` | Retirer favori | User |
| **Resources** ||||
| GET | `/api/resources` | Liste ressources | - |
| GET | `/api/downloads/[id]` | Télécharger | Selon accès |
| POST | `/api/resources` | Upload ressource | Admin |
| **Newsletter** ||||
| POST | `/api/newsletter/subscribe` | S'inscrire | - |
| POST | `/api/newsletter/unsubscribe` | Se désinscrire | - |
| POST | `/api/newsletter/send` | Envoyer newsletter | Admin |
| **Contact** ||||
| POST | `/api/contact` | Envoyer message | - |
| **Upload** ||||
| POST | `/api/upload` | Upload fichier | Admin |
| **Revalidate** ||||
| POST | `/api/revalidate` | Revalidate ISR | Admin |

---

## 5. Composants clés

### 5.1 Éditeur TipTap (CMS)

```typescript
// components/editor/tiptap-editor.tsx

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

// Extensions custom
import { GalleryExtension } from './extensions/gallery'
import { CalloutExtension } from './extensions/callout'
import { FileExtension } from './extensions/file'

interface TiptapEditorProps {
  content: JSONContent
  onChange: (content: JSONContent) => void
  placeholder?: string
}

export function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Commencez à écrire...',
      }),
      GalleryExtension,
      CalloutExtension,
      FileExtension,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  return (
    <div className="editor-container">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="prose prose-lg" />
    </div>
  )
}
```

### 5.2 Carte Mapbox

```typescript
// components/map/world-map.tsx

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface Trip {
  id: string
  name: string
  color: string
  stops: { lat: number; lng: number; name: string }[]
}

interface WorldMapProps {
  trips: Trip[]
  onTripClick?: (tripId: string) => void
  interactive?: boolean
}

export function WorldMap({ trips, onTripClick, interactive = true }: WorldMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [2.3522, 46.6034], // France center
      zoom: 3,
      interactive,
    })

    map.current.on('load', () => {
      setLoaded(true)
    })

    return () => {
      map.current?.remove()
    }
  }, [interactive])

  // Ajouter les tracés de voyage
  useEffect(() => {
    if (!loaded || !map.current) return

    trips.forEach((trip) => {
      const coordinates = trip.stops.map((s) => [s.lng, s.lat])

      // Ligne du voyage
      map.current!.addSource(`trip-${trip.id}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: trip.name },
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      })

      map.current!.addLayer({
        id: `trip-line-${trip.id}`,
        type: 'line',
        source: `trip-${trip.id}`,
        paint: {
          'line-color': trip.color,
          'line-width': 3,
          'line-opacity': 0.8,
        },
      })

      // Marqueurs pour chaque étape
      trip.stops.forEach((stop, index) => {
        const marker = new mapboxgl.Marker({
          color: trip.color,
        })
          .setLngLat([stop.lng, stop.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <strong>${stop.name}</strong>
              <p>${trip.name}</p>
            `)
          )
          .addTo(map.current!)
      })
    })
  }, [loaded, trips])

  return (
    <div ref={mapContainer} className="w-full h-[500px] rounded-xl overflow-hidden" />
  )
}
```

### 5.3 Article Card

```typescript
// components/blog/article-card.tsx

import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils/date'
import type { Article } from '@/types'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact'
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <article className={cn(
        'group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow',
        variant === 'featured' && 'md:flex md:h-80',
        variant === 'compact' && 'flex gap-4'
      )}>
        {/* Image */}
        <div className={cn(
          'relative overflow-hidden',
          variant === 'featured' ? 'md:w-1/2 h-48 md:h-full' : 'h-48',
          variant === 'compact' && 'w-24 h-24 rounded-lg flex-shrink-0'
        )}>
          <Image
            src={article.cover_image || '/images/placeholder.jpg'}
            alt={article.cover_image_alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className={cn(
          'p-5',
          variant === 'featured' && 'md:w-1/2 md:p-8 flex flex-col justify-center',
          variant === 'compact' && 'p-0 flex-1'
        )}>
          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="flex gap-2 mb-2">
              {article.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs font-medium text-terracotta-600 uppercase tracking-wide"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className={cn(
            'font-serif font-bold text-brown-900 group-hover:text-terracotta-600 transition-colors',
            variant === 'featured' ? 'text-2xl md:text-3xl' : 'text-xl',
            variant === 'compact' && 'text-base line-clamp-2'
          )}>
            {article.title}
          </h3>

          {/* Excerpt */}
          {variant !== 'compact' && article.excerpt && (
            <p className="mt-3 text-brown-600 line-clamp-2">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="mt-4 flex items-center gap-3 text-sm text-brown-500">
            <time dateTime={article.published_at}>
              {formatDate(article.published_at)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  )
}
```

---

## 6. Design System

### 6.1 Couleurs (Tailwind config)

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales
        terracotta: {
          50: '#fdf8f6',
          100: '#f9ede8',
          200: '#f3dcd2',
          300: '#e9c4b3',
          400: '#dba58d',
          500: '#C4A484',  // Primary
          600: '#a87d5c',
          700: '#8c6548',
          800: '#74533d',
          900: '#614636',
        },
        beige: {
          50: '#fdfcfa',
          100: '#F5F0E8',  // Background
          200: '#EDE4D3',  // Secondary
          300: '#e2d5be',
          400: '#d4c2a3',
          500: '#c4ac86',
          600: '#b0956a',
          700: '#967a54',
          800: '#7b6346',
          900: '#65523c',
        },
        sage: {
          50: '#f4f6f3',
          100: '#e6eae4',
          200: '#cdd6c9',
          300: '#adbba5',
          400: '#9CAF88',  // Accent
          500: '#768b64',
          600: '#5d704e',
          700: '#4a5940',
          800: '#3d4936',
          900: '#343e2f',
        },
        brown: {
          50: '#f9f7f6',
          100: '#f0ebe8',
          200: '#dfd5cf',
          300: '#c9b9ae',
          400: '#b09889',
          500: '#9d806f',
          600: '#8f6f5e',
          700: '#775b4e',
          800: '#634c43',
          900: '#3D3229',  // Text
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#3D3229',
            '--tw-prose-headings': '#3D3229',
            '--tw-prose-links': '#C4A484',
            '--tw-prose-bold': '#3D3229',
            '--tw-prose-quotes': '#634c43',
            '--tw-prose-quote-borders': '#C4A484',
            h1: { fontFamily: 'Playfair Display, serif' },
            h2: { fontFamily: 'Playfair Display, serif' },
            h3: { fontFamily: 'Playfair Display, serif' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
```

### 6.2 Composants UI de base

```typescript
// components/ui/button.tsx

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-terracotta-500 text-white hover:bg-terracotta-600 focus:ring-terracotta-500',
        secondary: 'bg-beige-200 text-brown-900 hover:bg-beige-300 focus:ring-beige-400',
        outline: 'border-2 border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50',
        ghost: 'text-brown-600 hover:bg-beige-100 hover:text-brown-900',
        sage: 'bg-sage-400 text-white hover:bg-sage-500 focus:ring-sage-400',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

---

## 7. Authentification

### 7.1 Flow d'authentification

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Visiteur  │     │   Membre    │     │    Admin    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       ▼                   ▼                   ▼
  ┌─────────┐         ┌─────────┐         ┌─────────┐
  │ Lecture │         │ Connexion│         │ Connexion│
  │ Articles│         │ Email/   │         │ Email +  │
  │ Gratuits│         │ OAuth    │         │ Vérif    │
  └─────────┘         └─────────┘         └─────────┘
       │                   │                   │
       │              ┌────┴────┐         ┌────┴────┐
       │              ▼         ▼         ▼         │
       │         ┌─────────┐ ┌─────┐ ┌─────────┐   │
       │         │ Favoris │ │Profil│ │   CMS   │   │
       │         │ Premium │ │ Bio  │ │ Articles│   │
       │         │Downloads│ │Avatar│ │ Voyages │   │
       │         └─────────┘ └─────┘ └─────────┘   │
       │                                           │
       └───────────────────────────────────────────┘
```

### 7.2 Middleware de protection

```typescript
// middleware.ts

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  // Routes admin - require admin role
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/connexion', req.url))
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Routes membres - require auth
  if (pathname.startsWith('/compte')) {
    if (!session) {
      return NextResponse.redirect(new URL('/connexion', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/compte/:path*'],
}
```

---

## 8. Intégrations externes

### 8.1 Resend (Newsletter)

```typescript
// lib/email/resend.ts

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendNewsletterParams {
  to: string[]
  subject: string
  html: string
}

export async function sendNewsletter({ to, subject, html }: SendNewsletterParams) {
  const batchSize = 100
  const batches = []

  for (let i = 0; i < to.length; i += batchSize) {
    batches.push(to.slice(i, i + batchSize))
  }

  const results = []

  for (const batch of batches) {
    const result = await resend.emails.send({
      from: 'It\'s Good To Be Goody <newsletter@itsgoodtobegoody.com>',
      to: batch,
      subject,
      html,
    })
    results.push(result)
  }

  return results
}

export async function sendWelcomeEmail(email: string) {
  return resend.emails.send({
    from: 'Laure <bonjour@itsgoodtobegoody.com>',
    to: email,
    subject: 'Bienvenue dans la communauté !',
    html: `
      <h1>Bienvenue !</h1>
      <p>Merci de rejoindre notre communauté de voyageurs.</p>
      <p>Vous recevrez notre newsletter mensuelle avec nos dernières aventures et conseils.</p>
      <p>À bientôt,<br>Laure</p>
    `,
  })
}
```

### 8.2 Mapbox

```typescript
// lib/config/mapbox.ts

export const MAPBOX_CONFIG = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
  style: 'mapbox://styles/mapbox/light-v11',
  defaultCenter: [2.3522, 46.6034] as [number, number], // France
  defaultZoom: 3,
  maxZoom: 15,
  minZoom: 1,
}

// Couleurs pour les tracés de voyage
export const TRIP_COLORS = [
  '#C4A484', // Terracotta
  '#9CAF88', // Sage
  '#8B7355', // Brown
  '#A0785A', // Caramel
  '#6B8E6B', // Forest
  '#B8860B', // Golden
]
```

### 8.3 hCaptcha (Anti-spam)

```typescript
// lib/captcha/hcaptcha.ts

export async function verifyCaptcha(token: string): Promise<boolean> {
  const response = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET_KEY!,
      response: token,
    }),
  })

  const data = await response.json()
  return data.success
}
```

---

## 9. Variables d'environnement

```env
# ==============================================
# .env.local
# ==============================================

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx

# Resend (Email)
RESEND_API_KEY=re_xxx

# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=xxx
HCAPTCHA_SECRET_KEY=xxx

# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=itsgoodtobegoody.com

# App
NEXT_PUBLIC_APP_URL=https://itsgoodtobegoody.com
NEXT_PUBLIC_APP_NAME="It's Good To Be Goody"

# Revalidation
REVALIDATION_SECRET=xxx
```

---

## 10. Phases d'implémentation

### Phase 1 : Fondations (Semaine 1-2)
- [ ] Setup Next.js 15 + Tailwind
- [ ] Configurer Supabase (projet, tables, RLS)
- [ ] Créer les migrations SQL
- [ ] Implémenter authentification (email + Google)
- [ ] Layout de base (header, footer, navigation)
- [ ] Design system (boutons, inputs, cards)

### Phase 2 : CMS Admin (Semaine 3-4)
- [ ] Layout admin (sidebar, navigation)
- [ ] Dashboard admin (stats)
- [ ] Éditeur TipTap pour articles
- [ ] Gestion catégories/tags
- [ ] Upload images (Supabase Storage)
- [ ] Preview articles

### Phase 3 : Blog public (Semaine 5-6)
- [ ] Homepage avec layout équilibré
- [ ] Liste articles avec pagination
- [ ] Page article détail
- [ ] Rendu contenu TipTap
- [ ] Galeries photos (grille/carrousel/masonry)
- [ ] Articles liés
- [ ] SEO (meta, sitemap, structured data)

### Phase 4 : Carte interactive (Semaine 7)
- [ ] Intégration Mapbox
- [ ] CRUD voyages dans admin
- [ ] Tracés de voyage
- [ ] Marqueurs d'étapes
- [ ] Popup avec infos voyage
- [ ] Lien voyage → articles

### Phase 5 : Communauté (Semaine 8-9)
- [ ] Inscription/connexion membres
- [ ] Profil utilisateur
- [ ] Système de favoris
- [ ] Commentaires
- [ ] Anti-spam hCaptcha
- [ ] Notifications email commentaires

### Phase 6 : Ressources & Newsletter (Semaine 10)
- [ ] Upload ressources (admin)
- [ ] Page ressources publique
- [ ] Téléchargement selon accès
- [ ] Inscription newsletter
- [ ] Template newsletter mensuelle
- [ ] Envoi automatique/manuel

### Phase 7 : Finitions (Semaine 11-12)
- [ ] Page À propos
- [ ] Page Contact
- [ ] Responsive final
- [ ] Tests
- [ ] Optimisation performance
- [ ] Mise en production Vercel

---

## 11. Critères de validation technique

| Critère | Objectif | Mesure |
|---------|----------|--------|
| Performance | Chargement < 3s | Lighthouse |
| SEO | Score > 90 | Lighthouse |
| Accessibilité | Score > 85 | Lighthouse |
| Mobile | 100% responsive | Test devices |
| Sécurité | RLS activé | Audit Supabase |
| Uptime | > 99.9% | Vercel/monitoring |

---

## Annexes

### A. Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Supabase local
npx supabase start
npx supabase stop

# Générer types Supabase
npx supabase gen types typescript --local > types/database.ts

# Migrations
npx supabase db push
npx supabase db reset

# Lint & Format
npm run lint
npm run format
```

### B. Ressources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TipTap Docs](https://tiptap.dev/docs)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Resend](https://resend.com/docs)
