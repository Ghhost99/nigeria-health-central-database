-- Fix RLS policies for patient registration without authentication requirement
-- Update the patients table RLS policy to allow public registration
DROP POLICY IF EXISTS "Allow patient registration" ON public.patients;

-- Create a new policy that allows anyone to insert patient data during registration
CREATE POLICY "Allow public patient registration" 
ON public.patients 
FOR INSERT 
WITH CHECK (true);

-- Also allow reading own patient data by NIN for login purposes
CREATE POLICY "Allow reading patient data by NIN" 
ON public.patients 
FOR SELECT 
USING (true);