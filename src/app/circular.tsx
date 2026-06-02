import { SectionPlaceholderScreen } from '@/components/app-shell/SectionPlaceholderScreen';

export default function CircularScreen() {
  return (
    <SectionPlaceholderScreen
      badge="Phase 11 preview"
      eyebrow="Circular economy lab"
      title="Explore how orbital waste might become reusable mission value."
      description="This route will estimate reuse potential from object type, assumed material categories and mission feasibility."
      primaryActionHref="/prevention"
      primaryActionLabel="Open Prevention"
      cards={[
        {
          title: 'Material potential',
          body: 'Future charts will show simplified material categories instead of pretending exact composition is known.',
        },
        {
          title: 'Recovery paths',
          body: 'Users will compare repair, refuel, recycle and deorbit paths at a prototype level.',
        },
        {
          title: 'Confidence labels',
          body: 'Every estimate will be labeled as public data, system estimate, unknown or simulated.',
        },
      ]}
    />
  );
}
