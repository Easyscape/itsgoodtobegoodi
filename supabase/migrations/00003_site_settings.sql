-- ==============================================
-- SITE SETTINGS (paramètres éditables du site)
-- ==============================================
CREATE TABLE public.site_settings (
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
  ('email', 'contact@itsgoodtobegoodi.com', 'Email contact', 'text', 'social');

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings
CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings FOR SELECT USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
