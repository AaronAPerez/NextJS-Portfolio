// SEO-related type definitions

export interface PersonSchema {
  '@context'?: string;
  '@type'?: string;
  name: string;
  givenName?: string;
  familyName?: string;
  description?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
  email?: string;
  telephone?: string;
  jobTitle?: string;
  skills?: string[];
  socialProfiles?: string[];
  experience?: string;
  worksFor?: {
    '@type': string;
    name: string;
  };
  address?: {
    '@type'?: string;
    city?: string;
    state?: string;
    country?: string;
    addressLocality?: string;
    addressRegion?: string;
    addressCountry?: string;
  };
}

export interface LocalBusinessData {
  name: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  openingHours?: string[];
  priceRange?: string;
}
