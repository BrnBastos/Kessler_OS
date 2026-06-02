import { SectionPlaceholderScreen } from '@/components/app-shell/SectionPlaceholderScreen';

export default function PriorityScreen() {
  return (
    <SectionPlaceholderScreen
      badge="Phase 9 preview"
      eyebrow="Priority queue"
      title="Rank orbital attention by risk, reuse value and mission urgency."
      description="This route will become the decision queue where users compare the objects that deserve attention first."
      primaryActionHref="/missions"
      primaryActionLabel="Simulate Mission"
      cards={[
        {
          title: 'Transparent ranking',
          body: 'Priority will be calculated from risk score, reuse score and operational context.',
        },
        {
          title: 'Readable mobile cards',
          body: 'Each item will show object ID, orbit, risk level and a clear next action.',
        },
        {
          title: 'Desktop comparison',
          body: 'Wide screens can show richer side-by-side queues without forcing that density onto phones.',
        },
      ]}
    />
  );
}
