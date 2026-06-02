import { SectionPlaceholderScreen } from '@/components/app-shell/SectionPlaceholderScreen';

export default function OrbitScreen() {
  return (
    <SectionPlaceholderScreen
      badge="Phase 6 preview"
      eyebrow="Orbital object exploration"
      title="Explore public orbital objects without losing the mobile experience."
      description="This route will become the object exploration workspace: searchable objects, focused cards for phones and richer orbit panels for desktop web."
      primaryActionHref="/priority"
      primaryActionLabel="View Priority"
      cards={[
        {
          title: 'Object browser',
          body: 'The next data phase will add realistic local objects with orbit, type, mass and confidence labels.',
        },
        {
          title: 'Mobile-first detail',
          body: 'Phones will use stacked object cards instead of dense desktop tables.',
        },
        {
          title: 'Orbit visual area',
          body: 'The visual can later evolve into a simplified 2D or 3D orbital map.',
        },
      ]}
    />
  );
}
