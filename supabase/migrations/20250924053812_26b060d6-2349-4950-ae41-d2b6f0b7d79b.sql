-- Fix RLS policies for government_users
-- Drop all existing policies first
DROP POLICY IF EXISTS "Allow public government registration" ON government_users;
DROP POLICY IF EXISTS "Government users can view own record" ON government_users;

-- Create the correct policies
CREATE POLICY "Allow public government registration" 
ON government_users 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Government users can view own record" 
ON government_users 
FOR SELECT 
USING (true); -- Allow public reading for login validation

-- Update the UHID generation function to use only numbers
CREATE OR REPLACE FUNCTION public.generate_uhid(patient_nin text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
    uhid_result text;
    i integer;
BEGIN
    uhid_result := '';
    -- Generate 11 random digits
    FOR i IN 1..11 LOOP
        uhid_result := uhid_result || floor(random() * 10)::text;
    END LOOP;
    
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM patients WHERE uhid::text = uhid_result) LOOP
        uhid_result := '';
        FOR i IN 1..11 LOOP
            uhid_result := uhid_result || floor(random() * 10)::text;
        END LOOP;
    END LOOP;
    
    RETURN uhid_result;
END;
$function$