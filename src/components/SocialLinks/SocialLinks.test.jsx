import { render, screen } from '@testing-library/react';
import SocialLinks from './SocialLinks';

describe('SocialLinks', () => {
  it('renders all social links', () => {
    render(<SocialLinks />);
    expect(screen.getByLabelText('Follow us on Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Google')).toBeInTheDocument();
  });

  it('renders correct href for Facebook', () => {
    render(<SocialLinks />);
    const facebookLink = screen.getByLabelText('Follow us on Facebook');
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/people/Incapremo-Dental-Care/61568445414620/');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders correct href for Instagram', () => {
    render(<SocialLinks />);
    const instagramLink = screen.getByLabelText('Follow us on Instagram');
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/incapremodental/');
  });

  it('renders correct href for Google', () => {
    render(<SocialLinks />);
    const googleLink = screen.getByLabelText('Follow us on Google');
    expect(googleLink).toHaveAttribute('href', 'https://maps.app.goo.gl/p3BLPCVnkG4gG2HB6');
  });
});
