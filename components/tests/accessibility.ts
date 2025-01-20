import { render } from '@react-three/fiber';

import { describe, it } from 'node:test';

expect.extend(toHaveNoViolations);

describe('Accessibility tests', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<YourComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});