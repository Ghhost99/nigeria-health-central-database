-- Create RLS policies for staff table
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

CREATE POLICY "Institutions can send messages" ON institution_messages
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND u.institution_id = sender_institution_id
  )
);

-- Allow institutions to view basic institution info for messaging
CREATE POLICY "Allow viewing institution names for messaging" ON institutions
FOR SELECT USING (true);

-- Allow patients to update their own records
CREATE POLICY "Patients can update own records" ON patients
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users u 
    JOIN profiles p ON p.user_id = u.user_id 
    WHERE p.id = auth.uid() AND u.patient_id = patients.patient_id
  )
);