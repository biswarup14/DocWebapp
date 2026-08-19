import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './SEO';

const wrapper = ({ children }) => <HelmetProvider>{children}</HelmetProvider>;

describe('SEO', () => {
  it('renders default title', () => {
    render(<SEO />, { wrapper });
    expect(document.title).toBe('Incapremo Dental Care');
  });

  it('renders page title with site name', () => {
    render(<SEO title="Home" />, { wrapper });
    expect(document.title).toBe('Home | Incapremo Dental Care');
  });

  it('renders canonical URL', () => {
    render(<SEO url="/services" />, { wrapper });
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toHaveAttribute('href', 'https://incapremodental.com/services');
  });

  it('renders default canonical when no url prop', () => {
    render(<SEO />, { wrapper });
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toHaveAttribute('href', 'https://incapremodental.com');
  });

  it('renders JSON-LD schema by default', () => {
    render(<SEO />, { wrapper });
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    const data = JSON.parse(script.textContent);
    expect(data['@type']).toBe('Dentist');
    expect(data.name).toBe('Incapremo Dental Care');
  });

  it('does not render JSON-LD when schema is false', () => {
    render(<SEO schema={false} />, { wrapper });
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeInTheDocument();
  });

  it('merges custom schema with default', () => {
    render(
      <SEO
        schema={{
          '@type': 'EmergencyService',
          name: 'Emergency',
        }}
      />,
      { wrapper }
    );
    const script = document.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script.textContent);
    expect(data['@type']).toBe('EmergencyService');
    expect(data.telephone).toBe('(+91) 7050576335');
  });

  it('renders Open Graph meta tags', () => {
    render(<SEO title="Test" description="Test description" />, { wrapper });
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute('content', 'Test | Incapremo Dental Care');
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute('content', 'Test description');
  });

  it('renders Twitter Card meta tags', () => {
    render(<SEO title="Test" />, { wrapper });
    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute('content', 'Test | Incapremo Dental Care');
  });
});
