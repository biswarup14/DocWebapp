import { render, screen } from '@testing-library/react';
import LiveClock from './LiveClock';

describe('LiveClock', () => {
  it('renders time in en-IN format', () => {
    render(<LiveClock />);
    const clock = screen.getByText(/\d{1,2}:\d{2}:\d{2}/);
    expect(clock).toBeInTheDocument();
  });

  it('has clock class', () => {
    render(<LiveClock />);
    const clock = screen.getByText(/\d{1,2}:\d{2}:\d{2}/);
    expect(clock.className).toMatch(/clock/);
  });
});
