import { requireSupabase } from './supabase';

export type PropertyKind = 'house' | 'apartment' | 'plot' | 'farmhouse';
export type Property = {
  id: string; title: string; city: string; state: string; kind: PropertyKind;
  purpose: 'sale' | 'rent'; price_inr: number; area_sqft: number;
  description: string; facing: string | null; land_classification: string;
};
export type Architect = {
  id: string; display_name: string; city: string; state: string;
  bio: string; specialties: string[]; languages: string[];
};

export async function listProperties(signal: AbortSignal): Promise<Property[]> {
  const { data, error } = await requireSupabase().from('properties')
    .select('id,title,city,state,kind,purpose,price_inr,area_sqft,description,facing,land_classification')
    .eq('status', 'published').order('created_at', { ascending: false }).limit(60).abortSignal(signal);
  if (error) throw error;
  return data ?? [];
}

export async function listArchitects(signal: AbortSignal): Promise<Architect[]> {
  const { data, error } = await requireSupabase().from('architect_profiles')
    .select('id,display_name,city,state,bio,specialties,languages')
    .eq('status', 'published').order('display_name').limit(60).abortSignal(signal);
  if (error) throw error;
  return data ?? [];
}

export function catalogError(error: unknown) {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'PGRST205') {
    return 'This directory is being prepared. Please check back soon.';
  }
  return 'We could not load this directory. Check your connection and try again.';
}
