import { SectionPlaceholderScreen } from '@/components/app-shell/SectionPlaceholderScreen';

export default function PreventionScreen() {
  return (
    <SectionPlaceholderScreen
      badge="Phase 12 preview"
      eyebrow="Prevention hub"
      title="Show how better mission design reduces the debris problem upstream."
      description="This route will teach disposal, tracking and design practices with prototype-friendly language."
      primaryActionHref="/"
      primaryActionLabel="Back Home"
      cards={[
        {
          title: 'Safer design',
          body: 'Explain passivation, end-of-life planning and disposal choices in human language.',
        },
        {
          title: 'Policy-aware wording',
          body: 'Reference good practices without claiming legal compliance verification.',
        },
        {
          title: 'Actionable learning',
          body: 'Connect prevention choices back to risk scores and mission simulation outcomes.',
        },
      ]}
    />
  );
}
