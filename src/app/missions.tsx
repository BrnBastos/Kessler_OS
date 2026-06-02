import { SectionPlaceholderScreen } from '@/components/app-shell/SectionPlaceholderScreen';

export default function MissionsScreen() {
  return (
    <SectionPlaceholderScreen
      badge="Phase 10 preview"
      eyebrow="Mission simulator"
      title="Test removal, avoidance and inspection decisions before adding complexity."
      description="This route will simulate mission choices with clear tradeoffs, honest assumptions and explanation-first scoring."
      primaryActionHref="/circular"
      primaryActionLabel="Assess Reuse"
      cards={[
        {
          title: 'Mission types',
          body: 'Avoidance, inspection, deorbit and recovery missions will each expose different tradeoffs.',
        },
        {
          title: 'Decision explanation',
          body: 'Each simulated recommendation will explain why it is safer, riskier or more valuable.',
        },
        {
          title: 'Prototype scope',
          body: 'The MVP will stay explicit that it is decision support, not a professional orbital safety tool.',
        },
      ]}
    />
  );
}
