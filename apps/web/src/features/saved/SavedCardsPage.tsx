import { BookmarkSimple } from '@phosphor-icons/react';
import { useMemo } from 'react';
import { EmptyState } from '@/components/states/EmptyState';
import { QueryBoundary } from '@/components/states/QueryBoundary';
import { CardGrid } from '@/features/deck/CardGrid';
import { useSavedCards } from '@/hooks/data';

export default function SavedCardsPage() {
  const cards = useSavedCards();
  const deckUserValues = useMemo(
    () =>
      (cards.data ?? [])
        .flatMap((entry) => entry.metrics)
        .filter((metric) => metric.metricType === 'users' && metric.value != null)
        .map((metric) => metric.value as number),
    [cards.data],
  );
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-6 font-display text-[28px] font-bold tracking-tight text-content">
        Saved Cards
      </h1>
      <QueryBoundary
        query={cards}
        loading={<div className="py-12 text-[13px] text-muted">Loading saved cards…</div>}
        errorTitle="Saved cards couldn't load"
        isEmpty={(data) => data.length === 0}
        empty={
          <EmptyState
            title="No saved cards yet"
            description="Bookmark company cards from any deck to save them here for quick access."
            icon={<BookmarkSimple weight="duotone" size={24} />}
          />
        }
      >
        {(data) => <CardGrid cards={data} deckUserValues={deckUserValues} />}
      </QueryBoundary>
    </div>
  );
}
