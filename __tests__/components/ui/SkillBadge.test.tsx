// __tests__/components/ui/SkillBadge.test.tsx
import { render, screen } from '@testing-library/react';
import { SkillBadge } from '@/components/ui/SkillBadge';

describe('SkillBadge', () => {
  it('renders skill name correctly', () => {
    render(<SkillBadge name="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('displays proficiency level when showProficiency is true', () => {
    render(
      <SkillBadge 
        name="TypeScript" 
        proficiency="expert"
        showProficiency={true}
      />
    );
    expect(screen.getByText('expert')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<SkillBadge name="Next.js" proficiency="advanced" />);
    const badge = screen.getByRole('listitem');
    expect(badge).toHaveAttribute('aria-label');
  });
});