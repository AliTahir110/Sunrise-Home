import type {MetadataRoute} from 'next';
import {site} from '@/data/site';
export default function sitemap():MetadataRoute.Sitemap{return ['','about','services','accommodation','referrals','safeguarding','contact','careers','privacy','cookies'].map(path=>({url:`${site.url}/${path}`,changeFrequency:'monthly',priority:path?0.7:1}))}
