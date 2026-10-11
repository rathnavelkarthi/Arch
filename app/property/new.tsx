import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Upload } from 'lucide-react-native';
import { Page, Field, Action, Notice, ui } from '@/components/brand-ui';
import { useAuth } from '@/providers/auth-provider';
import { requireSupabase } from '@/lib/supabase';

const kinds = ['house', 'apartment', 'plot', 'farmhouse'] as const;
const states = ['Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Puducherry'];
export default function NewProperty() {
  const { session } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(states[0]);
  const [kind, setKind] = useState<string>('house');
  const [purpose, setPurpose] = useState('sale');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [photos, setPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  async function choosePhotos() {
    setError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsMultipleSelection: true, selectionLimit: 6, quality: 0.8 });
      if (!result.canceled) {
        if (result.assets.some(photo => (photo.fileSize ?? 0) > 10 * 1024 * 1024)) { setError('Choose photos smaller than 10 MB each.'); return; }
        setPhotos(result.assets.slice(0, 6));
      }
    } catch { setError('Photos could not be opened. Please try again.'); }
  }
  async function save() {
    if (busy || !session) return;
    setError(null); setMessage(null);
    if (title.trim().length < 5 || description.trim().length < 20 || city.trim().length < 2 || !Number.isSafeInteger(Number(price)) || Number(price) < 1 || Number(price) > 100000000000 || !Number.isFinite(Number(area)) || Number(area) <= 0 || Number(area) > 100000000) {
      setError('Add a title (5+ characters), description (20+ characters), city, a whole-rupee price and a valid area.'); return;
    }
    setBusy(true);
    try {
      const client = requireSupabase();
      let id = savedId;
      if (!id) {
        const result = await client.from('properties').insert({ title: title.trim(), description: description.trim(), city: city.trim(), state, kind, purpose, price_inr: Number(price), area_sqft: Number(area), land_classification: 'unknown' }).select('id').single();
        if (result.error) throw result.error;
        id = result.data.id as string; setSavedId(id);
      }
      for (let index = 0; index < photos.length; index++) {
        const photo = photos[index];
        const response = await fetch(photo.uri);
        const bytes = await response.arrayBuffer();
        if (bytes.byteLength > 10 * 1024 * 1024) throw new Error('photo_size');
        const contentType = photo.mimeType ?? 'image/jpeg';
        const result = await client.storage.from('property-photos').upload(`${session.user.id}/${id}/${index}`, bytes, { contentType, upsert: true });
        if (result.error) throw result.error;
      }
      setMessage('Your property and selected photos are saved as a private draft. Publishing will be available when review is connected.');
    } catch {
      setError('Could not finish saving. Your details remain on this screen. Check your connection and retry. If this continues, property storage may still need setup.');
    } finally { setBusy(false); }
  }
  function choices(values: readonly string[], value: string, change: (value: string) => void) {
    return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{values.map(item => <Pressable key={item} accessibilityRole="button" accessibilityState={{ selected: item === value }} disabled={busy || !!savedId} onPress={() => change(item)} style={{ padding: 13, borderRadius: 12, backgroundColor: item === value ? '#2463eb' : '#eef2ff' }}><Text style={{ color: item === value ? '#fff' : '#334155', textTransform: 'capitalize' }}>{item}</Text></Pressable>)}</View>;
  }
  return <Page>
    <Link href="/(app)/(tabs)/dashboard" style={ui.link}>← Home</Link>
    <View style={{ backgroundColor: '#0f172a', padding: 24, borderRadius: 24, gap: 12 }}><Upload color="#60a5fa" size={32}/><Text style={[ui.title, {color:'#fff'}]}>Upload a property</Text><Text style={{color:'#cbd5e1'}}>A house, an apartment or a farmhouse. Start with the details that make it yours.</Text></View>
    {!session && <Notice>Explore the form below. Sign in before saving your property.</Notice>}
    <View style={ui.card}>
      <Field label="Property title" value={title} onChangeText={setTitle} maxLength={120} editable={!busy && !savedId}/>
      <Text style={ui.label}>Property type</Text>{choices(kinds, kind, setKind)}
      <Text style={ui.label}>Listing for</Text>{choices(['sale','rent'], purpose, setPurpose)}
      <Field label="City" value={city} onChangeText={setCity} maxLength={100} editable={!busy && !savedId}/>
      <Text style={ui.label}>State</Text>{choices(states, state, setState)}
      <Field label={purpose === 'rent' ? 'Monthly rent (₹)' : 'Price (₹)'} value={price} onChangeText={setPrice} keyboardType="numeric" editable={!busy && !savedId}/>
      <Field label="Area (sq ft)" value={area} onChangeText={setArea} keyboardType="decimal-pad" editable={!busy && !savedId}/>
      <Field style={{minHeight:120, textAlignVertical:'top'}} label="Description" value={description} onChangeText={setDescription} multiline maxLength={5000} editable={!busy && !savedId}/>
    </View>
    <View style={ui.card}><Text style={ui.heading}>Property photos</Text><Text style={ui.body}>Choose up to 6 photos, no more than 10 MB each.</Text>
      <Action label="Choose photos" onPress={choosePhotos} secondary disabled={busy || !!savedId}/>
      <View style={{flexDirection:'row', flexWrap:'wrap', gap:10}}>{photos.map((photo,index) => <View key={photo.uri}><Image source={{uri:photo.uri}} style={{width:100,height:100,borderRadius:12}} accessibilityLabel={`Selected property photo ${index+1}`}/><Pressable accessibilityRole="button" accessibilityLabel={`Remove photo ${index+1}`} disabled={busy || !!savedId} onPress={() => setPhotos(current => current.filter((_, i) => i !== index))} style={{minHeight:48,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#2463eb'}}>Remove</Text></Pressable></View>)}</View>
    </View>
    {error && <Notice error>{error}</Notice>}{message && <Notice>{message}</Notice>}
    {session ? <Action label={savedId ? 'Retry photo upload' : 'Save private draft'} onPress={save} busy={busy} disabled={!!message}/> : <Link href="/(auth)/login" style={ui.link}>Sign in to save your property</Link>}
  </Page>;
}
