/**
 * GBP Intake — Step Components
 * ─────────────────────────────
 * One component per wizard step. Each receives only the slice of data
 * it owns and its updater function — clean separation of concern.
 */

'use client';

import {
  TextInput,
  TextArea,
  SelectInput,
  CheckboxToggle,
  RadioGroup,
  SectionHeader,
} from './FormFields';
import type {
  BusinessInfo,
  ContentMessaging,
  PhotosMedia,
  AccessAccounts,
  CompetitorIntel,
  OngoingDelivery,
} from '@/types/gbp-intake';

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Business Information
// ─────────────────────────────────────────────────────────────────────────────
interface Step1Props {
  data: BusinessInfo;
  onChange: (updates: Partial<BusinessInfo>) => void;
}

const DAYS = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
] as const;

export function StepBusinessInfo({ data, onChange }: Step1Props) {
  return (
    <div className="space-y-8">
      {/* Core NAP */}
      <section>
        <SectionHeader
          title="Core Business Details"
          description="This information must match exactly across every platform (GBP, website, citations)."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextInput
              id="legal-name"
              label="Legal Business Name"
              required
              placeholder="e.g. AMP Design and Consulting LLC"
              value={data.legalName}
              onChange={(e) => onChange({ legalName: e.target.value })}
              hint="Must be exact — this is your GBP title and NAP anchor."
            />
          </div>
          <TextInput
            id="primary-category"
            label="Primary GBP Category"
            required
            placeholder="e.g. Vending Machine Supplier"
            value={data.primaryCategory}
            onChange={(e) => onChange({ primaryCategory: e.target.value })}
            hint="The single most important category Google uses for ranking."
          />
          <TextInput
            id="secondary-categories"
            label="Secondary Categories"
            placeholder="e.g. Snack Bar, Food and Beverage"
            value={data.secondaryCategories}
            onChange={(e) => onChange({ secondaryCategories: e.target.value })}
            hint="Up to 9, comma-separated."
          />
          <TextInput
            id="phone"
            label="Primary Phone"
            required
            type="tel"
            placeholder="(209) 403-5450"
            value={data.primaryPhone}
            onChange={(e) => onChange({ primaryPhone: e.target.value })}
          />
          <TextInput
            id="website"
            label="Website URL"
            type="url"
            placeholder="https://www.ampvendingmachines.com"
            value={data.websiteUrl}
            onChange={(e) => onChange({ websiteUrl: e.target.value })}
          />
          <TextInput
            id="year"
            label="Year Established"
            placeholder="2022"
            value={data.yearEstablished}
            onChange={(e) => onChange({ yearEstablished: e.target.value })}
          />
        </div>
      </section>

      {/* Address */}
      <section>
        <SectionHeader title="Business Address" />
        <div className="grid gap-5 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <TextInput
              id="address"
              label="Street Address"
              required
              placeholder="4120 Dale Rd Ste J8 1005"
              value={data.address}
              onChange={(e) => onChange({ address: e.target.value })}
            />
          </div>
          <div className="sm:col-span-3">
            <TextInput
              id="city"
              label="City"
              required
              placeholder="Modesto"
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
            />
          </div>
          <div className="sm:col-span-1">
            <TextInput
              id="state"
              label="State"
              required
              placeholder="CA"
              maxLength={2}
              value={data.state}
              onChange={(e) => onChange({ state: e.target.value.toUpperCase() })}
            />
          </div>
          <div className="sm:col-span-2">
            <TextInput
              id="zip"
              label="ZIP Code"
              required
              placeholder="95354"
              value={data.zip}
              onChange={(e) => onChange({ zip: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section>
        <SectionHeader
          title="Business Hours"
          description='Enter hours for each day. Use "Closed" for days not open.'
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {DAYS.map((day) => (
            <TextInput
              key={day}
              id={`hours-${day}`}
              label={day.charAt(0).toUpperCase() + day.slice(1)}
              placeholder="9:00 AM - 5:00 PM"
              value={data[`${day}Hours` as keyof BusinessInfo] as string}
              onChange={(e) =>
                onChange({ [`${day}Hours`]: e.target.value } as Partial<BusinessInfo>)
              }
            />
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section>
        <SectionHeader title="Service Areas" />
        <TextArea
          id="service-areas"
          label="All Cities & Counties Served"
          required
          placeholder="Modesto, Stockton, Turlock, Ceres, Manteca, Stanislaus County, San Joaquin County..."
          value={data.serviceAreas}
          onChange={(e) => onChange({ serviceAreas: e.target.value })}
          hint="Comma-separated. Be comprehensive — each location strengthens local map pack visibility."
        />
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Content & Messaging
// ─────────────────────────────────────────────────────────────────────────────
interface Step2Props {
  data: ContentMessaging;
  onChange: (updates: Partial<ContentMessaging>) => void;
}

export function StepContentMessaging({ data, onChange }: Step2Props) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader
          title="Business Description"
          description="This appears on your GBP profile. Google indexes it for keyword relevance."
        />
        <TextArea
          id="description"
          label="GBP Business Description"
          required
          placeholder="Describe the business, what makes it unique, who it serves, and key services. Include city names and relevant keywords naturally."
          value={data.businessDescription}
          onChange={(e) => onChange({ businessDescription: e.target.value })}
          maxCharCount={750}
          hint="750 character maximum. Lead with your strongest keyword + location combo."
        />
      </section>

      <section>
        <SectionHeader title="Services" />
        <div className="grid gap-5">
          <TextArea
            id="services-list"
            label="All Services Offered"
            required
            placeholder="Free Vending Machine Placement&#10;Snack Vending Machines&#10;Drink Vending Machines&#10;Cashless Payment Solutions&#10;24/7 Machine Maintenance"
            value={data.servicesList}
            onChange={(e) => onChange({ servicesList: e.target.value })}
            hint="One service per line. These become GBP service entries."
          />
          <TextArea
            id="service-descriptions"
            label="Service Descriptions"
            placeholder="Free Vending Machine Placement: We place and maintain vending machines at no cost to qualifying businesses..."
            value={data.serviceDescriptions}
            onChange={(e) => onChange({ serviceDescriptions: e.target.value })}
            hint="Brief descriptions (1–2 sentences each) that explain each service."
          />
        </div>
      </section>

      <section>
        <SectionHeader title="SEO & Keywords" />
        <TextInput
          id="keywords"
          label="Target Keywords"
          required
          placeholder="vending machines Modesto, vending machine company Stockton, free vending machine placement CA"
          value={data.targetKeywords}
          onChange={(e) => onChange({ targetKeywords: e.target.value })}
          hint="Comma-separated. Focus on [service] + [city] combinations."
        />
      </section>

      <section>
        <SectionHeader
          title="FAQs"
          description="These seed the GBP Q&A section and become FAQ schema on the website."
        />
        <TextArea
          id="faqs"
          label="Top Customer FAQs"
          required
          placeholder="Q: Is the vending machine placement really free?&#10;A: Yes — we provide the machine, stock it, and maintain it at zero cost to your business.&#10;&#10;Q: How long does installation take?&#10;A: Most installations are completed in under 2 hours."
          value={data.topFaqs}
          onChange={(e) => onChange({ topFaqs: e.target.value })}
          hint="Format: Q: [question] / A: [answer]. One pair per block, separated by a blank line."
        />
      </section>

      <section>
        <SectionHeader title="Value Proposition & Promotions" />
        <div className="grid gap-5">
          <TextArea
            id="usp"
            label="Unique Selling Proposition"
            required
            placeholder="We offer truly free vending machine placement — no cost, no contract, no hassle. Machines are fully stocked, cashless-enabled, and serviced on a regular schedule."
            value={data.uniqueSellingProp}
            onChange={(e) => onChange({ uniqueSellingProp: e.target.value })}
            hint="What makes this business different from every other vending company in the area?"
          />
          <TextArea
            id="promotions"
            label="Current Promotions or Offers"
            placeholder="Free consultation for new accounts. No setup fees for qualifying workplaces (25+ employees)."
            value={data.currentPromotions}
            onChange={(e) => onChange({ currentPromotions: e.target.value })}
            hint="These become GBP Offer posts. Leave blank if none."
          />
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 3 — Photos & Media
// ─────────────────────────────────────────────────────────────────────────────
interface Step3Props {
  data: PhotosMedia;
  onChange: (updates: Partial<PhotosMedia>) => void;
}

export function StepPhotosMedia({ data, onChange }: Step3Props) {
  const assetChecks: Array<{
    key: keyof PhotosMedia;
    label: string;
    hint: string;
  }> = [
    { key: 'hasLogo', label: 'Logo uploaded', hint: 'PNG, transparent bg, 250×250px min' },
    { key: 'hasCoverPhoto', label: 'Cover photo ready', hint: '1080×608px, brand-forward image' },
    { key: 'hasGeoTaggedPhotos', label: 'Photos are geo-tagged', hint: 'GPS EXIF data embedded before upload' },
    { key: 'hasTeamPhoto', label: 'Team / owner photo available', hint: 'Builds trust and humanizes the profile' },
    { key: 'hasVideo', label: 'Short video available (30–60 sec)', hint: 'Business in action, machine installation, etc.' },
    { key: 'hasBeforeAfterPhotos', label: 'Before/after or install photos', hint: 'Great for GBP update posts' },
  ];

  return (
    <div className="space-y-8">
      <section>
        <SectionHeader
          title="Media Asset Inventory"
          description="Check off what's currently available. Missing items become action items."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {assetChecks.map(({ key, label, hint }) => (
            <CheckboxToggle
              key={key}
              id={`asset-${key}`}
              label={label}
              hint={hint}
              checked={data[key] as boolean}
              onChange={(checked) => onChange({ [key]: checked })}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Photo Count" />
        <TextInput
          id="photo-count"
          label="How many photos do you currently have ready?"
          type="number"
          min="0"
          placeholder="0"
          value={data.photoCount}
          onChange={(e) => onChange({ photoCount: e.target.value })}
          hint="GBP profiles with 10+ photos get significantly more views. Target 20–30 total."
        />
      </section>

      <section>
        <SectionHeader title="Notes" />
        <TextArea
          id="photo-notes"
          label="Photo & Media Notes"
          placeholder="Machine photos taken at Modesto office location. Need to retake cover photo. Video script in progress."
          value={data.photoNotes}
          onChange={(e) => onChange({ photoNotes: e.target.value })}
          hint="Any context about existing assets, what's needed, or delivery timeline."
        />
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 4 — Access & Accounts
// ─────────────────────────────────────────────────────────────────────────────
interface Step4Props {
  data: AccessAccounts;
  onChange: (updates: Partial<AccessAccounts>) => void;
}

export function StepAccessAccounts({ data, onChange }: Step4Props) {
  const platformChecks: Array<{
    key: keyof AccessAccounts;
    label: string;
    hint: string;
  }> = [
    { key: 'ga4Access', label: 'Google Analytics 4', hint: 'Add agency as editor in GA4 property settings' },
    { key: 'searchConsoleAccess', label: 'Google Search Console', hint: 'Add agency as owner in Search Console' },
    { key: 'cmsAccess', label: 'Website CMS / Hosting', hint: 'Needed to add schema markup and tracking code' },
    { key: 'socialMediaAccess', label: 'Social Media Accounts', hint: 'FB, IG, LinkedIn — add as page manager/editor' },
  ];

  return (
    <div className="space-y-8">
      <section>
        <SectionHeader
          title="Google Business Profile Access"
          description="The most critical access. Without this, nothing else can proceed."
        />
        <RadioGroup
          id="gbp-access"
          label="Current GBP Access Level"
          value={data.gbpAccess}
          onChange={(v) => onChange({ gbpAccess: v as AccessAccounts['gbpAccess'] })}
          options={[
            {
              value: 'owner',
              label: 'Owner',
              description: 'Full control — can add managers and transfer ownership',
            },
            {
              value: 'manager',
              label: 'Manager',
              description: 'Can edit all profile info but not add/remove users',
            },
            {
              value: 'none',
              label: 'No access yet',
              description: 'Will need to claim or request access before work can begin',
            },
          ]}
        />
      </section>

      <section>
        <SectionHeader
          title="Platform Access Checklist"
          description="Check each platform where access has been granted to the agency."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {platformChecks.map(({ key, label, hint }) => (
            <CheckboxToggle
              key={key}
              id={`access-${key}`}
              label={label}
              hint={hint}
              checked={data[key] as boolean}
              onChange={(checked) => onChange({ [key]: checked })}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Existing Citations" />
        <TextArea
          id="citation-logins"
          label="Existing Citation Platform Logins"
          placeholder="Yelp — owner login available&#10;Yellow Pages — needs to be claimed&#10;BBB — not yet listed&#10;Apple Maps — listed, no login"
          value={data.citationLogins}
          onChange={(e) => onChange({ citationLogins: e.target.value })}
          hint="List which citation directories the business already has accounts for."
        />
      </section>

      <section>
        <SectionHeader title="Access Notes" />
        <TextArea
          id="access-notes"
          label="Additional Access Notes"
          placeholder="GBP was previously managed by a prior agency — need to remove their access. New manager invite sent to agency@email.com."
          value={data.accessNotes}
          onChange={(e) => onChange({ accessNotes: e.target.value })}
        />
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 5 — Competitor & Market Intel
// ─────────────────────────────────────────────────────────────────────────────
interface Step5Props {
  data: CompetitorIntel;
  onChange: (updates: Partial<CompetitorIntel>) => void;
}

export function StepCompetitorIntel({ data, onChange }: Step5Props) {
  const competitors = [
    { nameKey: 'competitor1Name', urlKey: 'competitor1Url', label: 'Competitor 1' },
    { nameKey: 'competitor2Name', urlKey: 'competitor2Url', label: 'Competitor 2' },
    { nameKey: 'competitor3Name', urlKey: 'competitor3Url', label: 'Competitor 3' },
  ] as const;

  return (
    <div className="space-y-8">
      <section>
        <SectionHeader
          title="Top Competitors"
          description="Used to identify citation gaps, keyword opportunities, and GBP weaknesses to exploit."
        />
        <div className="space-y-5">
          {competitors.map(({ nameKey, urlKey, label }) => (
            <div key={nameKey} className="grid gap-3 sm:grid-cols-2">
              <TextInput
                id={nameKey}
                label={`${label} — Name`}
                placeholder="e.g. Valley Vending Solutions"
                value={data[nameKey]}
                onChange={(e) => onChange({ [nameKey]: e.target.value })}
              />
              <TextInput
                id={urlKey}
                label={`${label} — Website`}
                type="url"
                placeholder="https://valleyvending.com"
                value={data[urlKey]}
                onChange={(e) => onChange({ [urlKey]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Target Market" />
        <div className="grid gap-5">
          <TextInput
            id="geo-targets"
            label="Geographic Areas to Dominate"
            required
            placeholder="Modesto, Stockton, Turlock, Stanislaus County"
            value={data.targetGeographies}
            onChange={(e) => onChange({ targetGeographies: e.target.value })}
            hint="Comma-separated. These drive our Local 3-Pack strategy and city landing pages."
          />
          <RadioGroup
            id="customer-type"
            label="Primary Customer Type"
            value={data.customerType}
            onChange={(v) =>
              onChange({ customerType: v as CompetitorIntel['customerType'] })
            }
            options={[
              { value: 'b2b', label: 'B2B', description: 'Offices, warehouses, facilities managers' },
              { value: 'b2c', label: 'B2C', description: 'Individual consumers' },
              { value: 'both', label: 'Both B2B and B2C' },
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeader title="Historical Context" />
        <div className="grid gap-5">
          <TextArea
            id="seasonal"
            label="Seasonal Patterns or Campaign Timing"
            placeholder="Busiest in Jan–Mar when companies plan their breakroom budgets. Slower in summer."
            value={data.seasonalPatterns}
            onChange={(e) => onChange({ seasonalPatterns: e.target.value })}
            hint="Helps plan post calendar and promotional timing."
          />
          <TextArea
            id="previous-seo"
            label="Previous SEO / GBP Work"
            placeholder="Worked with Top Quality Resource for 3 months in 2024. No significant results. GBP was set up but posts were inconsistent."
            value={data.previousSeoWork}
            onChange={(e) => onChange({ previousSeoWork: e.target.value })}
            hint="Any prior agencies, audits, or optimization attempts — good or bad."
          />
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 6 — Ongoing Delivery
// ─────────────────────────────────────────────────────────────────────────────
interface Step6Props {
  data: OngoingDelivery;
  onChange: (updates: Partial<OngoingDelivery>) => void;
}

export function StepOngoingDelivery({ data, onChange }: Step6Props) {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeader
          title="Weekly GBP Posts"
          description="GBP posts expire after 7 days. We post every week to stay active in Google's eyes."
        />
        <TextArea
          id="post-topics"
          label="Preferred Post Topics & Content Themes"
          required
          placeholder="Machine spotlights, product features, new location announcements, seasonal snack promotions, workplace wellness tips, client testimonials, cashless payment benefits..."
          value={data.preferredPostTopics}
          onChange={(e) => onChange({ preferredPostTopics: e.target.value })}
          hint="The more context you provide, the more relevant the posts. Include any topics to avoid."
        />
      </section>

      <section>
        <SectionHeader title="Photo Delivery" />
        <CheckboxToggle
          id="monthly-photos"
          label="Client will deliver 4+ new photos monthly"
          hint="Fresh photos signal an active business to Google and improve ranking over time."
          checked={data.monthlyPhotoDelivery}
          onChange={(checked) => onChange({ monthlyPhotoDelivery: checked })}
        />
      </section>

      <section>
        <SectionHeader title="Review Generation" />
        <RadioGroup
          id="review-method"
          label="Preferred Review Request Method"
          value={data.reviewRequestMethod}
          onChange={(v) =>
            onChange({
              reviewRequestMethod: v as OngoingDelivery['reviewRequestMethod'],
            })
          }
          options={[
            { value: 'qr', label: 'QR Code', description: 'Printed card or sticker on machine / counter' },
            { value: 'email', label: 'Email follow-up', description: 'Post-service email with review link' },
            { value: 'sms', label: 'SMS / text', description: 'Text message to customer phone after service' },
            { value: 'all', label: 'All of the above', description: 'Maximum review velocity — recommended' },
          ]}
        />
      </section>

      <section>
        <SectionHeader title="Reporting" />
        <RadioGroup
          id="reporting"
          label="Reporting Cadence"
          value={data.reportingCadence}
          onChange={(v) =>
            onChange({
              reportingCadence: v as OngoingDelivery['reportingCadence'],
            })
          }
          options={[
            {
              value: 'biweekly',
              label: 'Bi-weekly',
              description: 'Report every 2 weeks — good for fast-moving campaigns',
            },
            {
              value: 'monthly',
              label: 'Monthly',
              description: 'Report once per month — standard for GBP optimization',
            },
          ]}
        />
      </section>

      <section>
        <SectionHeader title="Point of Contact" />
        <div className="grid gap-5 sm:grid-cols-3">
          <TextInput
            id="poc-name"
            label="Contact Name"
            required
            placeholder="Aaron Perez"
            value={data.pointOfContact}
            onChange={(e) => onChange({ pointOfContact: e.target.value })}
          />
          <TextInput
            id="poc-email"
            label="Contact Email"
            type="email"
            required
            placeholder="owner@business.com"
            value={data.pointOfContactEmail}
            onChange={(e) => onChange({ pointOfContactEmail: e.target.value })}
          />
          <TextInput
            id="poc-phone"
            label="Contact Phone"
            type="tel"
            placeholder="(209) 403-5450"
            value={data.pointOfContactPhone}
            onChange={(e) => onChange({ pointOfContactPhone: e.target.value })}
          />
        </div>
      </section>

      <section>
        <SectionHeader title="Additional Notes" />
        <TextArea
          id="additional-notes"
          label="Anything Else We Should Know?"
          placeholder="Client prefers contact by email only. Business is expanding to Sacramento in Q3. Do not post on national holidays."
          value={data.additionalNotes}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
        />
      </section>
    </div>
  );
}
