CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- First signed-up user becomes admin, everyone else is a normal user
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL DEFAULT '',
  customer_type text NOT NULL DEFAULT 'home',
  system_size text NOT NULL DEFAULT '',
  savings text NOT NULL DEFAULT '',
  bill_before text NOT NULL DEFAULT '',
  bill_after text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  highlights text[] NOT NULL DEFAULT '{}',
  before_image_url text NOT NULL DEFAULT '',
  after_image_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.case_studies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_studies TO authenticated;
GRANT ALL ON public.case_studies TO service_role;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published case studies are public" ON public.case_studies
FOR SELECT TO anon, authenticated USING (published = true);

CREATE POLICY "Admins can read all case studies" ON public.case_studies
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert case studies" ON public.case_studies
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case studies" ON public.case_studies
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case studies" ON public.case_studies
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.case_studies (title, location, customer_type, system_size, savings, bill_before, bill_after, description, highlights, before_image_url, after_image_url, sort_order) VALUES
('Manakkad Family Home', 'Manakkad, Kerala', 'home', '5 kW', '92%', '₹4,800/mo', '₹380/mo', 'A two-story family home switched to a 5 kW rooftop system. Monthly KSEB bills dropped from nearly ₹4,800 to under ₹400, with surplus power exported to the grid.', ARRAY['5 kW grid-tied system','Net metering enabled','25-year panel warranty'], '/assets/project-home-before.png', '/assets/project-home-after.png', 1),
('Thodupuzha Commercial Complex', 'Thodupuzha, Kerala', 'business', '10 kW', '78%', '₹18,500/mo', '₹4,100/mo', 'A retail and office building reduced its operating costs with a 10 kW commercial installation. The system runs lighting, AC, and equipment during peak business hours.', ARRAY['10 kW commercial array','Daytime load offset','Depreciation benefits'], '/assets/project-business-before.png', '/assets/project-business-after.png', 2);