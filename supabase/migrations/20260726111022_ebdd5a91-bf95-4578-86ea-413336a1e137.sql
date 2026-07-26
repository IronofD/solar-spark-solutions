CREATE POLICY "Admins can upload project photos" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project photos" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project photos" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read project photos" ON storage.objects
FOR SELECT TO authenticated USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));