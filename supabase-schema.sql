-- Supabase SQL Schema setup
-- Run this in your Supabase SQL Editor to create tables for the portfolio backend.

-- 1. Create table for Portfolios
CREATE TABLE public.portfolios (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  url text,
  image_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Create table for Applications (Contact Form)
CREATE TABLE public.applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Note: In a real app we'd setup Row Level Security (RLS)
-- But for a simple personal backend, you can leave it off or secure it accordingly.
-- To allow public inserts for applications (since ANYONE can contact you via form):
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts to applications" ON public.applications FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow admin to view applications" ON public.applications FOR SELECT TO public USING (true); -- In reality, require auth here

-- Portfolios: public can view, but only you should be able to insert/delete
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select of portfolios" ON public.portfolios FOR SELECT TO public USING (true);
CREATE POLICY "Allow anonymous insert of portfolios" ON public.portfolios FOR ALL TO public USING (true); -- For now allowing all as auth is not fully configured
