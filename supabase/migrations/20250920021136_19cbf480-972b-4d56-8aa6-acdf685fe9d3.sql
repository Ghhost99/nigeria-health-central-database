-- Add additional fields to patients table for complete patient information
ALTER TABLE patients ADD COLUMN IF NOT EXISTS nin character varying(11) UNIQUE;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS emergency_contact character varying;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS emergency_phone character varying;

-- Add additional fields to institutions table
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS email character varying;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS password_hash character varying;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS institution_code character varying UNIQUE;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS license_number character varying;
ALTER TABLE institutions ADD COLUMNS IF NOT EXISTS license_expiry date;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS cac_number character varying;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS services_offered text[];
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS bed_capacity integer;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS status character varying DEFAULT 'pending';

-- Create staff table for healthcare professionals
CREATE TABLE IF NOT EXISTS staff (
  staff_id serial PRIMARY KEY,
  institution_id integer REFERENCES institutions(institution_id),
  staff_code character varying UNIQUE NOT NULL,
  first_name character varying NOT NULL,
  last_name character varying NOT NULL,
  profession character varying NOT NULL, -- doctor, nurse, pharmacist, lab_tech, etc.
  email character varying,
  phone character varying,
  specialty character varying,
  license_number character varying,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Create government_users table for government access
CREATE TABLE IF NOT EXISTS government_users (
  gov_user_id serial PRIMARY KEY,
  employee_id character varying UNIQUE NOT NULL,
  organization_name character varying NOT NULL,
  organization_type character varying NOT NULL,
  department character varying,
  official_email character varying UNIQUE NOT NULL,
  government_id character varying NOT NULL,
  contact_person_name character varying NOT NULL,
  job_title character varying NOT NULL,
  access_level character varying DEFAULT 'read_only',
  access_expiry date,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Create institution_messages table for inter-institutional communication
CREATE TABLE IF NOT EXISTS institution_messages (
  message_id serial PRIMARY KEY,
  sender_institution_id integer REFERENCES institutions(institution_id),
  receiver_institution_id integer REFERENCES institutions(institution_id),
  subject character varying NOT NULL,
  message_content text NOT NULL,
  attachments text[], -- file paths
  sent_at timestamp DEFAULT now(),
  read_at timestamp,
  created_at timestamp DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE institution_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for staff table
CREATE POLICY "Staff can view own institution staff" ON staff
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND u.institution_id = staff.institution_id
  )
);

-- Create RLS policies for government_users table
CREATE POLICY "Government users can view own record" ON government_users
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND profiles.government_user_id = government_users.gov_user_id
  )
);

-- Create RLS policies for institution_messages
CREATE POLICY "Institutions can view their messages" ON institution_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND (u.institution_id = sender_institution_id OR u.institution_id = receiver_institution_id)
  )
);

-- Add government_user_id to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS government_user_id integer REFERENCES government_users(gov_user_id);

-- Create function to generate UHID
CREATE OR REPLACE FUNCTION generate_uhid(patient_nin text)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    uhid_result text;
    chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    i integer;
BEGIN
    -- Generate 11 character alphanumeric UHID
    uhid_result := '';
    FOR i IN 1..11 LOOP
        uhid_result := uhid_result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM patients WHERE uhid::text = uhid_result) LOOP
        uhid_result := '';
        FOR i IN 1..11 LOOP
            uhid_result := uhid_result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
    END LOOP;
    
    RETURN uhid_result;
END;
$$;

-- Create trigger to auto-generate UHID when patient is created
CREATE OR REPLACE FUNCTION set_patient_uhid()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.uhid IS NULL THEN
        NEW.uhid := generate_uhid(NEW.nin)::uuid;
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_patient_uhid
    BEFORE INSERT ON patients
    FOR EACH ROW
    EXECUTE FUNCTION set_patient_uhid();

-- Update RLS policies to allow patient registration
CREATE POLICY "Allow patient registration" ON patients
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow patient updates for own records" ON patients
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND u.patient_id = patients.patient_id
  )
);