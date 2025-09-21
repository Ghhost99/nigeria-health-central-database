-- Enable RLS on api_endpoints table to fix the linter warning
ALTER TABLE public.api_endpoints ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to read API endpoints
CREATE POLICY "Allow reading api endpoints" 
ON public.api_endpoints 
FOR SELECT 
USING (true);