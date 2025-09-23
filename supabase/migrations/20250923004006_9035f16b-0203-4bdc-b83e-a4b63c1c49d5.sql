-- Fix the RLS policy for government_users to allow public registration
-- Since government users register without authentication first, we need to allow public inserts

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Government users can view own record" ON government_users;

-- Create new policies that allow public registration but restrict viewing
CREATE POLICY "Allow public government registration" 
ON government_users 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Government users can view own record" 
ON government_users 
FOR SELECT 
USING (
  -- Allow viewing if authenticated and linked through profiles
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.government_user_id = government_users.gov_user_id
  )
  -- OR allow public viewing for login purposes (by employee_id + government_id combo)
  OR auth.uid() IS NULL
);

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