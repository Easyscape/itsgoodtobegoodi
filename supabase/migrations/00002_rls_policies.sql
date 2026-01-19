-- ==============================================
-- ROW LEVEL SECURITY POLICIES
-- ==============================================

-- Enable RLS
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

-- ==============================================
-- PROFILES
-- ==============================================
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ==============================================
-- ARTICLES
-- ==============================================
CREATE POLICY "Published articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (
    status = 'published'
    OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can update articles"
  ON public.articles FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ==============================================
-- CATEGORIES & TAGS (public read, admin write)
-- ==============================================
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Tags are viewable by everyone"
  ON public.tags FOR SELECT USING (true);

CREATE POLICY "Admins can manage tags"
  ON public.tags FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ==============================================
-- TRIPS (public read, admin write)
-- ==============================================
CREATE POLICY "Trips are viewable by everyone"
  ON public.trips FOR SELECT USING (true);

CREATE POLICY "Admins can manage trips"
  ON public.trips FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Trip stops are viewable by everyone"
  ON public.trip_stops FOR SELECT USING (true);

CREATE POLICY "Admins can manage trip stops"
  ON public.trip_stops FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ==============================================
-- COMMENTS
-- ==============================================
CREATE POLICY "Approved comments are viewable by everyone"
  ON public.comments FOR SELECT
  USING (
    status = 'approved'
    OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "Anyone can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments"
  ON public.comments FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ==============================================
-- RESOURCES
-- ==============================================
CREATE POLICY "Free resources are viewable by everyone"
  ON public.resources FOR SELECT
  USING (
    access_level = 'free'
    OR auth.uid() IS NOT NULL
    OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

CREATE POLICY "Admins can manage resources"
  ON public.resources FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ==============================================
-- FAVORITES
-- ==============================================
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id);

-- ==============================================
-- SUBSCRIBERS
-- ==============================================
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON public.subscribers FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Admins can manage subscribers"
  ON public.subscribers FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ==============================================
-- ARTICLE RELATIONS (public read)
-- ==============================================
CREATE POLICY "Article categories are viewable"
  ON public.article_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage article categories"
  ON public.article_categories FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Article tags are viewable"
  ON public.article_tags FOR SELECT USING (true);

CREATE POLICY "Admins can manage article tags"
  ON public.article_tags FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

CREATE POLICY "Article trips are viewable"
  ON public.article_trips FOR SELECT USING (true);

CREATE POLICY "Admins can manage article trips"
  ON public.article_trips FOR ALL
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
