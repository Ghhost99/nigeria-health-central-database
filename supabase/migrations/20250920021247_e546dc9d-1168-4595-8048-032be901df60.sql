-- Fix security issues by adding missing RLS policies and correcting function search paths

-- Add RLS policies for staff table
CREATE POLICY "Staff can view own institution staff" ON staff
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND u.institution_id = staff.institution_id
  )
);

CREATE POLICY "Institutions can manage their staff" ON staff
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND u.institution_id = staff.institution_id
  )
);

-- Add RLS policies for government_users table
CREATE POLICY "Government users can view own record" ON government_users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND profiles.government_user_id = government_users.gov_user_id
  )
);

-- Add RLS policies for institution_messages table
CREATE POLICY "Institutions can view their messages" ON institution_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND (u.institution_id = sender_institution_id OR u.institution_id = receiver_institution_id)
  )
);

CREATE POLICY "Institutions can send messages" ON institution_messages
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND u.institution_id = sender_institution_id
  )
);

-- Fix function search paths
CREATE OR REPLACE FUNCTION generate_uhid(patient_nin text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    uhid_result text;
    chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    i integer;
BEGIN
    uhid_result := '';
    FOR i IN 1..11 LOOP
        uhid_result := uhid_result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    
    WHILE EXISTS (SELECT 1 FROM patients WHERE uhid::text = uhid_result) LOOP
        uhid_result := '';
        FOR i IN 1..11 LOOP
            uhid_result := uhid_result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
    END LOOP;
    
    RETURN uhid_result;
END;
$$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION enforce_user_role_constraints()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF (NEW.role_id = (SELECT role_id FROM roles WHERE role_name = 'doctor') AND NEW.doctor_id IS NULL) THEN
        RAISE EXCEPTION 'Doctor users must be linked to a doctor_id';
    END IF;

    IF (NEW.role_id = (SELECT role_id FROM roles WHERE role_name = 'patient') AND NEW.patient_id IS NULL) THEN
        RAISE EXCEPTION 'Patient users must be linked to a patient_id';
    END IF;

    RETURN NEW;
END;
$$;