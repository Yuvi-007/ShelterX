import { Link } from 'wouter';
import { ArrowUpRight, BedDouble, CircleCheck, Droplets, HeartPulse, Utensils, Accessibility } from 'lucide-react';
import type { Shelter } from '@/data/shelters';
import { StatusPill } from './app-shell';

export function ShelterCard({ shelter }: { shelter: Shelter }) {
  const percent = Math.round((shelter.currentOccupancy / shelter.maxCapacity) * 100);
  return <Link href={`/shelters/${shelter.id}`} className="group block rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary-foreground/30 hover:shadow-lg" data-testid={`card-shelter-${shelter.id}`}>
    <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{shelter.district}</p><h3 className="mt-1.5 font-display text-base font-semibold tracking-tight">{shelter.name}</h3><p className="mt-1 text-xs text-muted-foreground">{shelter.location}</p></div><span className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors group-hover:border-secondary-foreground/40 group-hover:text-secondary-foreground"><ArrowUpRight size={16} /></span></div>
    <div className="mt-6 flex items-end justify-between"><div><div className="flex items-baseline gap-1.5"><span className="font-display text-2xl font-semibold">{shelter.currentOccupancy.toLocaleString()}</span><span className="text-xs text-muted-foreground">/ {shelter.maxCapacity.toLocaleString()}</span></div><p className="mt-0.5 text-[11px] text-muted-foreground">people sheltered</p></div><StatusPill status={shelter.status} /></div>
    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${percent >= 90 ? 'bg-red-500' : percent >= 75 ? 'bg-orange-400' : percent >= 50 ? 'bg-amber-400' : 'bg-secondary-foreground'}`} style={{ width: `${percent}%` }} /></div>
    <div className="mt-4 flex items-center justify-between"><div className="flex gap-2 text-muted-foreground">{shelter.medicalSupport && <HeartPulse size={14} aria-label="Medical support" />} {shelter.foodAvailable && <Utensils size={14} aria-label="Food available" />} {shelter.waterAvailable && <Droplets size={14} aria-label="Water available" />} {shelter.wheelchairAccessible && <Accessibility size={14} aria-label="Wheelchair accessible" />}</div><span className="flex items-center gap-1 text-[10px] text-muted-foreground"><CircleCheck size={12} className="text-emerald-600" />Updated {shelter.updatedAt}</span></div>
  </Link>;
}