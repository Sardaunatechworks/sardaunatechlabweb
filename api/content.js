import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });
    
    try {
        if (!supabase) return res.status(500).json({ error: 'Supabase credentials missing' });

        const [servicesRes, productsRes, teamRes, blogsRes] = await Promise.all([
            supabase.from('services').select('*'),
            supabase.from('products').select('*'),
            supabase.from('team').select('*'),
            supabase.from('blogs').select('*')
        ]);

        res.status(200).json({
            services: servicesRes.data || [],
            products: productsRes.data || [],
            team: teamRes.data || [],
            blogs: blogsRes.data || []
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}