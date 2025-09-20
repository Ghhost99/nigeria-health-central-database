-- Add additional fields to patients table for complete patient information
ALTER TABLE patients ADD COLUMN IF NOT EXISTS nin character varying(11) UNIQUE;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS emergency_contact character varying;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS emergency_phone character varying;

-- Add additional fields to institutions table
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS email character varying;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS password_hash character varying;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS institution_code character varying UNIQUE;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS license_number character varying;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS license_expiry date;
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
  profession character varying NOT NULL,
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
  attachments text[],
  sent_at timestamp DEFAULT now(),
  read_at timestamp,
  created_at timestamp DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE institution_messages ENABLE ROW LEVEL SECURITY;

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

-- Update RLS policies to allow patient registration
CREATE POLICY "Allow patient registration" ON patients
FOR INSERT WITH CHECK (true);