import { Check } from 'lucide-react';
import { roleDefinitions, type RoleId } from '@/data/roles';

export function RoleSelector({
  value,
  onChange,
}: {
  value: RoleId;
  onChange: (role: RoleId) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Choose your demo role</p>
          <p className="mt-1 text-xs text-muted-foreground">This prototype uses role selection to preview access.</p>
        </div>
        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-accent-foreground">Demo</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {roleDefinitions.map(({ id, label, description, icon: Icon }) => {
          const selected = value === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => onChange(id)}
              className={`group relative rounded-xl border p-3.5 text-left transition-all ${selected ? 'border-primary bg-primary/[.04] shadow-sm ring-1 ring-primary/20' : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40'}`}
              aria-pressed={selected}
              data-testid={`button-role-${id}`}
            >
              <div className="flex items-start gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${selected ? 'bg-primary text-accent' : 'bg-secondary text-secondary-foreground'}`}>
                  <Icon size={17} />
                </span>
                <span className="min-w-0 pr-4">
                  <span className="block text-xs font-bold">{label}</span>
                  <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">{description}</span>
                </span>
                {selected && <Check size={15} className="absolute right-3 top-3 text-secondary-foreground" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}