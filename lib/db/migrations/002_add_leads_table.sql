-- ════════════════════════════════════════════════════════════════════════════
-- GBP Leads Table Migration
-- ════════════════════════════════════════════════════════════════════════════
-- Captures leads from the free GBP audit tool and other sources
-- Run this in your Neon console to add lead tracking

-- ── Leads Table ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gbp_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Business Information
  business_name VARCHAR(255) NOT NULL,
  business_phone VARCHAR(50),
  business_website VARCHAR(255),
  business_city VARCHAR(100),
  business_state VARCHAR(50),
  business_category VARCHAR(100),

  -- Contact Information
  contact_name VARCHAR(255),
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),

  -- Lead Tracking
  source VARCHAR(50) DEFAULT 'website', -- gbp_audit, website, referral, etc.
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, proposal_sent, converted, lost
  notes TEXT,

  -- Audit Results (if from audit tool)
  audit_score INTEGER,
  audit_grade VARCHAR(2),
  audit_results JSONB,

  -- Follow-up Tracking
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  next_follow_up_at TIMESTAMP WITH TIME ZONE,
  assigned_to VARCHAR(255),

  -- Conversion Tracking
  converted_at TIMESTAMP WITH TIME ZONE,
  converted_client_id UUID REFERENCES clients(id) ON DELETE SET NULL,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_leads_email ON gbp_leads(contact_email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON gbp_leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON gbp_leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created ON gbp_leads(created_at DESC);

-- ── Updated At Trigger ────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON gbp_leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON gbp_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();

-- ══════════════════════════════════════════════════════════════════════════════
-- Run the following in your Neon console to apply this migration
-- ══════════════════════════════════════════════════════════════════════════════
