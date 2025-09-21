-- Enable RLS on institutions table and fix policies
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public institution registration
CREATE POLICY "Allow public institution registration" 
ON public.institutions 
FOR INSERT 
WITH CHECK (true);

-- Allow reading institution data for login purposes
CREATE POLICY "Allow reading institution data" 
ON public.institutions 
FOR SELECT 
USING (true);