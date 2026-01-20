-- ==============================================
-- IT'S GOOD TO BE GOODI - DATABASE SETUP
-- Copier-coller ce fichier entier dans Supabase SQL Editor
-- ==============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- PROFILES (extends Supabase Auth users)
-- ==============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  instagram TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================
-- CATEGORIES
-- ==============================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image TEXT,
  emoji TEXT,
  parent_id UUID REFERENCES public.categories(id),
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, slug, emoji, order_index) VALUES
  ('France', 'france', '🇫🇷', 1),
  ('Europe', 'europe', '🌍', 2),
  ('Asie', 'asie', '🌸', 3),
  ('Conseils', 'conseils', '💡', 4)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================
-- TAGS
-- ==============================================
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- TRIPS (Voyages pour la carte)
-- ==============================================
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  start_date DATE,
  end_date DATE,
  color TEXT DEFAULT '#C4A484',
  cover_image TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- TRIP STOPS (Étapes de voyage)
-- ==============================================
CREATE TABLE IF NOT EXISTS public.trip_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  order_index INT NOT NULL,
  arrival_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_trip_stops_trip ON public.trip_stops(trip_id);

-- ==============================================
-- ARTICLES
-- ==============================================
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  cover_image TEXT,
  cover_image_alt TEXT,
  author_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  featured BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);

-- ==============================================
-- ARTICLE RELATIONS
-- ==============================================
CREATE TABLE IF NOT EXISTS public.article_categories (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

CREATE TABLE IF NOT EXISTS public.article_tags (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE IF NOT EXISTS public.article_trips (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, trip_id)
);

-- ==============================================
-- COMMENTS
-- ==============================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT,
  author_email TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'spam', 'deleted')),
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_article ON public.comments(article_id);

-- ==============================================
-- RESOURCES (Fichiers téléchargeables)
-- ==============================================
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INT,
  file_type TEXT NOT NULL,
  thumbnail_url TEXT,
  access_level TEXT DEFAULT 'free' CHECK (access_level IN ('free', 'email', 'member')),
  category TEXT,
  download_count INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- FAVORITES
-- ==============================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- ==============================================
-- NEWSLETTER SUBSCRIBERS
-- ==============================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  source TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- ==============================================
-- CONTACT MESSAGES
-- ==============================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================
-- SITE SETTINGS (paramètres éditables)
-- ==============================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  label TEXT,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'number', 'image', 'boolean', 'json')),
  category TEXT DEFAULT 'general',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO public.site_settings (key, value, label, type, category) VALUES
  ('site_title', 'It''s Good To Be Goodi', 'Titre du site', 'text', 'general'),
  ('site_description', 'Blog voyage en famille', 'Description', 'text', 'general'),
  ('hero_title', 'It''s Good To Be Goodi', 'Titre hero', 'text', 'homepage'),
  ('hero_subtitle', 'On partage nos aventures, nos galères et nos bons plans pour vous aider à voyager sereinement en famille.', 'Sous-titre hero', 'text', 'homepage'),
  ('stat_countries', '15+', 'Nombre de pays', 'text', 'stats'),
  ('stat_trips', '50+', 'Nombre de voyages', 'text', 'stats'),
  ('stat_children', '2', 'Nombre d''enfants', 'text', 'stats'),
  ('about_title', 'Enchanté, moi c''est Laure !', 'Titre section À propos', 'text', 'about'),
  ('about_text', 'Avec mon mari et nos deux enfants, on sillonne le monde dès qu''on peut. Ce blog, c''est notre carnet de voyage familial.', 'Texte À propos', 'text', 'about'),
  ('hero_image', '', 'Image hero', 'image', 'homepage'),
  ('about_image', '', 'Photo de famille', 'image', 'about'),
  ('instagram', 'itsgoodtobegoodi', 'Instagram', 'text', 'social'),
  ('email', 'contact@itsgoodtobegoodi.com', 'Email contact', 'text', 'social')
ON CONFLICT (key) DO NOTHING;

-- ==============================================
-- UPDATED_AT TRIGGERS
-- ==============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_articles_updated_at ON public.articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_trips_updated_at ON public.trips;
CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_comments_updated_at ON public.comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_resources_updated_at ON public.resources;
CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==============================================
-- ROW LEVEL SECURITY
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
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PROFILES
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ARTICLES
DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON public.articles;
CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (status = 'published' OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can insert articles" ON public.articles;
CREATE POLICY "Admins can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can update articles" ON public.articles;
CREATE POLICY "Admins can update articles"
  ON public.articles FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete articles" ON public.articles;
CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- CATEGORIES
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- TAGS
DROP POLICY IF EXISTS "Tags are viewable by everyone" ON public.tags;
CREATE POLICY "Tags are viewable by everyone"
  ON public.tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage tags" ON public.tags;
CREATE POLICY "Admins can manage tags"
  ON public.tags FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- TRIPS
DROP POLICY IF EXISTS "Trips are viewable by everyone" ON public.trips;
CREATE POLICY "Trips are viewable by everyone"
  ON public.trips FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage trips" ON public.trips;
CREATE POLICY "Admins can manage trips"
  ON public.trips FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Trip stops are viewable by everyone" ON public.trip_stops;
CREATE POLICY "Trip stops are viewable by everyone"
  ON public.trip_stops FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage trip stops" ON public.trip_stops;
CREATE POLICY "Admins can manage trip stops"
  ON public.trip_stops FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- COMMENTS
DROP POLICY IF EXISTS "Approved comments are viewable by everyone" ON public.comments;
CREATE POLICY "Approved comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (status = 'approved' OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Anyone can create comments" ON public.comments;
CREATE POLICY "Anyone can create comments"
  ON public.comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage all comments" ON public.comments;
CREATE POLICY "Admins can manage all comments"
  ON public.comments FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- RESOURCES
DROP POLICY IF EXISTS "Resources are viewable by everyone" ON public.resources;
CREATE POLICY "Resources are viewable by everyone"
  ON public.resources FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage resources" ON public.resources;
CREATE POLICY "Admins can manage resources"
  ON public.resources FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- FAVORITES
DROP POLICY IF EXISTS "Users can view own favorites" ON public.favorites;
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own favorites" ON public.favorites;
CREATE POLICY "Users can manage own favorites"
  ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- SUBSCRIBERS
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view subscribers" ON public.subscribers;
CREATE POLICY "Admins can view subscribers"
  ON public.subscribers FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ARTICLE RELATIONS
DROP POLICY IF EXISTS "Article categories are viewable" ON public.article_categories;
CREATE POLICY "Article categories are viewable"
  ON public.article_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage article categories" ON public.article_categories;
CREATE POLICY "Admins can manage article categories"
  ON public.article_categories FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Article tags are viewable" ON public.article_tags;
CREATE POLICY "Article tags are viewable"
  ON public.article_tags FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage article tags" ON public.article_tags;
CREATE POLICY "Admins can manage article tags"
  ON public.article_tags FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

DROP POLICY IF EXISTS "Article trips are viewable" ON public.article_trips;
CREATE POLICY "Article trips are viewable"
  ON public.article_trips FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage article trips" ON public.article_trips;
CREATE POLICY "Admins can manage article trips"
  ON public.article_trips FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- SITE SETTINGS
DROP POLICY IF EXISTS "Site settings are viewable by everyone" ON public.site_settings;
CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- CONTACT MESSAGES
DROP POLICY IF EXISTS "Anyone can send contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can send contact messages"
  ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ==============================================
-- STORAGE BUCKETS
-- ==============================================
-- Note: Execute these in a separate query if they fail

INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true) ON CONFLICT DO NOTHING;

-- Storage policies for images bucket
DROP POLICY IF EXISTS "Anyone can view images" ON storage.objects;
CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Admins can upload images" ON storage.objects;
CREATE POLICY "Admins can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images'
    AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

DROP POLICY IF EXISTS "Admins can delete images" ON storage.objects;
CREATE POLICY "Admins can delete images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images'
    AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Storage policies for resources bucket
DROP POLICY IF EXISTS "Anyone can view resources" ON storage.objects;
CREATE POLICY "Anyone can view resources" ON storage.objects
  FOR SELECT USING (bucket_id = 'resources');

DROP POLICY IF EXISTS "Admins can upload resources" ON storage.objects;
CREATE POLICY "Admins can upload resources" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resources'
    AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- ==============================================
-- DONE! 🎉
-- ==============================================
