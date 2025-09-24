-- Change UHID from UUID to VARCHAR and update default
-- First, update the generate_uhid function to work properly
CREATE OR REPLACE FUNCTION public.generate_uhid(patient_nin text DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    uhid_result text;
    i integer;
BEGIN
    uhid_result := '';
    -- Generate 11 random digits
    FOR i IN 1..11 LOOP
        uhid_result := uhid_result || floor(random() * 10)::text;
    END LOOP;
    
    -- Ensure uniqueness by checking against existing UHIDs (as text)
    WHILE EXISTS (SELECT 1 FROM patients WHERE uhid::text = uhid_result) LOOP
        uhid_result := '';
        FOR i IN 1..11 LOOP
            uhid_result := uhid_result || floor(random() * 10)::text;
        END LOOP;
    END LOOP;
    
    RETURN uhid_result;
END;
$$;

-- Add a new column for the new UHID format
ALTER TABLE patients ADD COLUMN new_uhid VARCHAR(11);

-- Generate new 11-digit UHIDs for existing patients
UPDATE patients SET new_uhid = generate_uhid();

-- Drop the old UUID column and rename the new one
ALTER TABLE patients DROP COLUMN uhid;
ALTER TABLE patients RENAME COLUMN new_uhid TO uhid;

-- Set the new column as NOT NULL and add unique constraint
ALTER TABLE patients ALTER COLUMN uhid SET NOT NULL;
ALTER TABLE patients ADD CONSTRAINT patients_uhid_unique UNIQUE (uhid);

-- Set default value for new inserts
ALTER TABLE patients ALTER COLUMN uhid SET DEFAULT generate_uhid();