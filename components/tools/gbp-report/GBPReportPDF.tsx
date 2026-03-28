/**
 * GBP Monthly Report — PDF Document
 * ────────────────────────────────────
 * Built with @react-pdf/renderer. This is the print-optimized
 * version of the report — clean white, professional typography,
 * designed to be sent to clients as a PDF attachment.
 *
 * @react-pdf/renderer uses its own style system (StyleSheet.create)
 * — NOT Tailwind or regular CSS. All styles must be inline objects.
 *
 * Install: npm install @react-pdf/renderer
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from '@react-pdf/renderer';
import type { GBPMonthlyReport, KeywordRanking } from '@/types/gbp-report';
import { getRankChange, formatChange } from '@/types/gbp-report';

// ── Brand colors ──────────────────────────────────────────────────────────────
const BRAND = {
  navy: '#0F172A',
  blue: '#2563EB',
  blueLight: '#DBEAFE',
  green: '#16A34A',
  greenLight: '#DCFCE7',
  amber: '#D97706',
  amberLight: '#FEF3C7',
  red: '#DC2626',
  redLight: '#FEE2E2',
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray200: '#E2E8F0',
  gray400: '#94A3B8',
  gray600: '#475569',
  gray800: '#1E293B',
  white: '#FFFFFF',
};

// ── Stylesheet ─────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: BRAND.white,
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
    fontSize: 9,
    color: BRAND.gray800,
  },

  // ── Cover band ──────────────────────────────────────────────────────────────
  coverBand: {
    backgroundColor: BRAND.navy,
    paddingHorizontal: 40,
    paddingTop: 36,
    paddingBottom: 28,
    marginBottom: 0,
  },
  coverLabel: {
    fontSize: 8,
    color: BRAND.blue,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  coverTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: BRAND.white,
    marginBottom: 4,
  },
  coverSubtitle: {
    fontSize: 11,
    color: BRAND.gray400,
    marginBottom: 20,
  },
  coverMeta: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 4,
  },
  coverMetaItem: {
    flexDirection: 'column',
  },
  coverMetaLabel: {
    fontSize: 7,
    color: BRAND.gray400,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  coverMetaValue: {
    fontSize: 9,
    color: BRAND.white,
    fontFamily: 'Helvetica-Bold',
  },

  // ── Accent bar below cover ──────────────────────────────────────────────────
  accentBar: {
    height: 3,
    backgroundColor: BRAND.blue,
  },

  // ── Body padding ────────────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 40,
    paddingTop: 28,
  },

  // ── Section ─────────────────────────────────────────────────────────────────
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.gray200,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BRAND.blue,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: BRAND.navy,
    letterSpacing: 0.5,
  },
  sectionNumber: {
    fontSize: 8,
    color: BRAND.gray400,
    marginLeft: 'auto',
  },

  // ── Metric cards grid ────────────────────────────────────────────────────────
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    minWidth: 100,
    backgroundColor: BRAND.gray50,
    borderWidth: 1,
    borderColor: BRAND.gray200,
    borderRadius: 6,
    padding: 10,
  },
  metricLabel: {
    fontSize: 7,
    color: BRAND.gray600,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: BRAND.navy,
    marginBottom: 3,
  },
  metricChange: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  metricChangePositive: {
    color: BRAND.green,
  },
  metricChangeNegative: {
    color: BRAND.red,
  },
  metricChangeNeutral: {
    color: BRAND.gray400,
  },

  // ── Highlight box ────────────────────────────────────────────────────────────
  highlightBox: {
    backgroundColor: BRAND.blueLight,
    borderLeftWidth: 3,
    borderLeftColor: BRAND.blue,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  highlightLabel: {
    fontSize: 7,
    color: BRAND.blue,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold',
  },
  highlightText: {
    fontSize: 9,
    color: BRAND.gray800,
    lineHeight: 1.6,
  },

  // ── Keyword table ─────────────────────────────────────────────────────────────
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: BRAND.navy,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontSize: 7,
    color: BRAND.gray400,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.gray100,
    alignItems: 'center',
  },
  tableRowAlt: {
    backgroundColor: BRAND.gray50,
  },
  tableCell: {
    fontSize: 9,
    color: BRAND.gray800,
  },
  tableCellMuted: {
    fontSize: 8,
    color: BRAND.gray400,
  },

  // ── Col widths for keyword table ─────────────────────────────────────────────
  colKeyword: { flex: 3 },
  colRank: { flex: 1, textAlign: 'center' },
  colPrev: { flex: 1, textAlign: 'center' },
  colChange: { flex: 1, textAlign: 'center' },
  col3Pack: { flex: 1, textAlign: 'center' },

  // ── Badge ─────────────────────────────────────────────────────────────────────
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 99,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.3,
  },
  badgeGreen: { backgroundColor: BRAND.greenLight },
  badgeGreenText: { color: BRAND.green },
  badgeAmber: { backgroundColor: BRAND.amberLight },
  badgeAmberText: { color: BRAND.amber },
  badgeRed: { backgroundColor: BRAND.redLight },
  badgeRedText: { color: BRAND.red },
  badgeGray: { backgroundColor: BRAND.gray100 },
  badgeGrayText: { color: BRAND.gray600 },
  badgeBlue: { backgroundColor: BRAND.blueLight },
  badgeBlueText: { color: BRAND.blue },

  // ── Action item row ──────────────────────────────────────────────────────────
  actionItem: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.gray100,
    alignItems: 'flex-start',
  },
  actionItemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
    flexShrink: 0,
  },
  actionItemContent: {
    flex: 1,
  },
  actionItemTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: BRAND.navy,
    marginBottom: 2,
  },
  actionItemDesc: {
    fontSize: 8,
    color: BRAND.gray600,
    lineHeight: 1.5,
  },

  // ── Goals table ──────────────────────────────────────────────────────────────
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.gray100,
    gap: 8,
  },
  goalName: { flex: 2, fontSize: 9, color: BRAND.gray800 },
  goalTarget: { flex: 1, fontSize: 9, color: BRAND.gray400, textAlign: 'center' },
  goalActual: { flex: 1, fontSize: 9, fontFamily: 'Helvetica-Bold', color: BRAND.navy, textAlign: 'center' },
  goalBarContainer: {
    flex: 2,
    height: 6,
    backgroundColor: BRAND.gray200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalBarFill: {
    height: 6,
    borderRadius: 3,
  },

  // ── Two-col layout ────────────────────────────────────────────────────────────
  twoCol: {
    flexDirection: 'row',
    gap: 16,
  },
  col50: {
    flex: 1,
  },

  // ── Review star display ───────────────────────────────────────────────────────
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  starRating: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: BRAND.navy,
  },
  starLabel: {
    fontSize: 8,
    color: BRAND.gray400,
    marginTop: 4,
  },

  // ── Footer ────────────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: BRAND.gray200,
    paddingTop: 8,
  },
  footerLeft: {
    flex: 1,
    fontSize: 7,
    color: BRAND.gray400,
  },
  footerRight: {
    fontSize: 7,
    color: BRAND.gray400,
    textAlign: 'right',
  },

  // ── Executive summary box ─────────────────────────────────────────────────────
  summaryBox: {
    backgroundColor: BRAND.gray50,
    borderRadius: 6,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BRAND.gray200,
  },
  summaryText: {
    fontSize: 9.5,
    color: BRAND.gray800,
    lineHeight: 1.7,
  },

  // ── Citation stat row ─────────────────────────────────────────────────────────
  citationRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  citationStat: {
    flex: 1,
    backgroundColor: BRAND.gray50,
    borderWidth: 1,
    borderColor: BRAND.gray200,
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
  },
  citationStatValue: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: BRAND.navy,
    marginBottom: 2,
  },
  citationStatLabel: {
    fontSize: 7,
    color: BRAND.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

// ── Helper: change color ──────────────────────────────────────────────────────
function changeStyle(value: number) {
  if (value > 0) return S.metricChangePositive;
  if (value < 0) return S.metricChangeNegative;
  return S.metricChangeNeutral;
}

// ── Helper: goal bar width (capped at 100%) ───────────────────────────────────
function goalBarWidth(actual: number, target: number): string {
  const pct = Math.min((actual / target) * 100, 100);
  return `${pct}%`;
}

// ── Helper: goal bar color ────────────────────────────────────────────────────
function goalBarColor(actual: number, target: number): string {
  const pct = actual / target;
  if (pct >= 1) return BRAND.green;
  if (pct >= 0.75) return BRAND.blue;
  return BRAND.amber;
}

// ── Keyword rank change indicator ─────────────────────────────────────────────
function RankChangeBadge({ kw }: { kw: KeywordRanking }) {
  const dir = getRankChange(kw.currentRank, kw.previousRank);
  if (dir === 'new') {
    return (
      <View style={[S.badge, S.badgeBlue]}>
        <Text style={[S.badgeText, S.badgeBlueText]}>NEW</Text>
      </View>
    );
  }
  if (dir === 'up') {
    const diff = (kw.previousRank ?? 0) - (kw.currentRank ?? 0);
    return (
      <View style={[S.badge, S.badgeGreen]}>
        <Text style={[S.badgeText, S.badgeGreenText]}>▲ {diff}</Text>
      </View>
    );
  }
  if (dir === 'down') {
    const diff = (kw.currentRank ?? 0) - (kw.previousRank ?? 0);
    return (
      <View style={[S.badge, S.badgeRed]}>
        <Text style={[S.badgeText, S.badgeRedText]}>▼ {diff}</Text>
      </View>
    );
  }
  return (
    <View style={[S.badge, S.badgeGray]}>
      <Text style={[S.badgeText, S.badgeGrayText]}>—</Text>
    </View>
  );
}

// ── Priority dot color ────────────────────────────────────────────────────────
function priorityDotColor(priority: 'high' | 'medium' | 'low'): string {
  if (priority === 'high') return BRAND.red;
  if (priority === 'medium') return BRAND.amber;
  return BRAND.blue;
}

// ── Footer component (repeated on each page) ──────────────────────────────────
function Footer({ report }: { report: GBPMonthlyReport }) {
  return (
    <View style={S.footer} fixed>
      <Text style={S.footerLeft}>
        {report.clientBusinessName} — GBP Performance Report — {report.reportMonth}
      </Text>
      <Text style={S.footerRight}>
        Prepared by {report.preparedBy} · {report.preparedByWebsite}
      </Text>
    </View>
  );
}

// ── Main PDF Document ─────────────────────────────────────────────────────────
export function GBPReportPDF({ report }: { report: GBPMonthlyReport }) {
  const { insights: ins, reviews: rev, citations: cit, keywords, actionItems, goals } = report;

  return (
    <Document
      title={`GBP Report — ${report.clientBusinessName} — ${report.reportMonth}`}
      author={report.preparedBy}
      subject="Google Business Profile Monthly Performance Report"
      keywords="GBP, Google Business Profile, local SEO, monthly report"
    >
      {/* ── Page 1: Cover + Executive Summary + Metrics ── */}
      <Page size="LETTER" style={S.page}>
        {/* Cover band */}
        <View style={S.coverBand}>
          <Text style={S.coverLabel}>Monthly Performance Report</Text>
          <Text style={S.coverTitle}>{report.clientBusinessName}</Text>
          <Text style={S.coverSubtitle}>Google Business Profile Optimization</Text>
          <View style={S.coverMeta}>
            <View style={S.coverMetaItem}>
              <Text style={S.coverMetaLabel}>Period</Text>
              <Text style={S.coverMetaValue}>{report.reportMonth}</Text>
            </View>
            <View style={S.coverMetaItem}>
              <Text style={S.coverMetaLabel}>Campaign month</Text>
              <Text style={S.coverMetaValue}>Month {report.campaignMonth}</Text>
            </View>
            <View style={S.coverMetaItem}>
              <Text style={S.coverMetaLabel}>Service area</Text>
              <Text style={S.coverMetaValue}>{report.serviceArea}</Text>
            </View>
            <View style={S.coverMetaItem}>
              <Text style={S.coverMetaLabel}>Prepared by</Text>
              <Text style={S.coverMetaValue}>{report.preparedBy}</Text>
            </View>
          </View>
        </View>
        <View style={S.accentBar} />

        <View style={S.body}>
          {/* Executive summary */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>Executive Summary</Text>
            </View>
            <View style={S.summaryBox}>
              <Text style={S.summaryText}>{report.executiveSummary}</Text>
            </View>

            {/* Highlight of the month */}
            <View style={S.highlightBox}>
              <Text style={S.highlightLabel}>Highlight of the Month</Text>
              <Text style={S.highlightText}>{report.highlightOfMonth}</Text>
            </View>
          </View>

          {/* GBP Visibility metrics */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>Profile Visibility</Text>
              <Text style={S.sectionNumber}>vs. prior month</Text>
            </View>
            <View style={S.metricsGrid}>
              {[
                { label: 'Total views', value: ins.totalViews.toLocaleString(), change: ins.viewsChange },
                { label: 'Search views', value: ins.searchViews.toLocaleString(), change: ins.viewsChange },
                { label: 'Maps views', value: ins.mapsViews.toLocaleString(), change: ins.viewsChange },
                { label: 'Photo views', value: ins.photoViews.toLocaleString(), change: ins.photoViewsChange },
              ].map((m) => (
                <View key={m.label} style={S.metricCard}>
                  <Text style={S.metricLabel}>{m.label}</Text>
                  <Text style={S.metricValue}>{m.value}</Text>
                  <Text style={[S.metricChange, changeStyle(m.change)]}>
                    {formatChange(m.change)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Customer Actions */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>Customer Actions</Text>
              <Text style={S.sectionNumber}>vs. prior month</Text>
            </View>
            <View style={S.metricsGrid}>
              {[
                { label: 'Website clicks', value: ins.websiteClicks, change: ins.websiteClicksChange },
                { label: 'Phone calls', value: ins.phoneCalls, change: ins.phoneCallsChange },
                { label: 'Direction requests', value: ins.directionRequests, change: ins.directionRequestsChange },
                { label: 'Posts published', value: ins.postsPublished, change: 0 },
              ].map((m) => (
                <View key={m.label} style={S.metricCard}>
                  <Text style={S.metricLabel}>{m.label}</Text>
                  <Text style={S.metricValue}>{m.value}</Text>
                  <Text style={[S.metricChange, changeStyle(m.change)]}>
                    {m.change === 0 ? `${ins.postsPublished} this month` : formatChange(m.change)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <Footer report={report} />
      </Page>

      {/* ── Page 2: Keywords + Reviews + Citations ── */}
      <Page size="LETTER" style={S.page}>
        <View style={S.accentBar} />
        <View style={S.body}>
          {/* Keyword rankings */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>Keyword Rankings</Text>
            </View>
            <View style={S.table}>
              <View style={S.tableHeader}>
                <Text style={[S.tableHeaderCell, S.colKeyword]}>Keyword</Text>
                <Text style={[S.tableHeaderCell, S.colRank]}>Rank</Text>
                <Text style={[S.tableHeaderCell, S.colPrev]}>Prev</Text>
                <Text style={[S.tableHeaderCell, S.colChange]}>Change</Text>
                <Text style={[S.tableHeaderCell, S.col3Pack]}>3-Pack</Text>
              </View>
              {keywords.map((kw, i) => (
                <View key={kw.keyword} style={[S.tableRow, i % 2 === 1 ? S.tableRowAlt : {}]}>
                  <Text style={[S.tableCell, S.colKeyword]}>{kw.keyword}</Text>
                  <Text style={[S.tableCell, S.colRank, { fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>
                    {kw.currentRank ?? '—'}
                  </Text>
                  <Text style={[S.tableCellMuted, S.colPrev, { textAlign: 'center' }]}>
                    {kw.previousRank ?? '—'}
                  </Text>
                  <View style={[S.colChange, { alignItems: 'center' }]}>
                    <RankChangeBadge kw={kw} />
                  </View>
                  <View style={[S.col3Pack, { alignItems: 'center' }]}>
                    {kw.inLocalPack ? (
                      <View style={[S.badge, S.badgeGreen]}>
                        <Text style={[S.badgeText, S.badgeGreenText]}>YES</Text>
                      </View>
                    ) : (
                      <View style={[S.badge, S.badgeGray]}>
                        <Text style={[S.badgeText, S.badgeGrayText]}>NO</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews + Citations — two columns */}
          <View style={[S.twoCol, S.section]}>
            {/* Reviews */}
            <View style={S.col50}>
              <View style={S.sectionHeader}>
                <View style={S.sectionDot} />
                <Text style={S.sectionTitle}>Reviews</Text>
              </View>
              <View style={S.starRow}>
                <Text style={S.starRating}>{rev.averageRating.toFixed(1)}</Text>
                <View>
                  <Text style={[S.metricChange, changeStyle(rev.ratingChange)]}>
                    {formatChange(rev.ratingChange, ' pts')}
                  </Text>
                  <Text style={S.starLabel}>avg. rating</Text>
                </View>
              </View>
              {[
                { label: 'Total reviews', value: rev.totalReviews },
                { label: 'New this month', value: rev.newReviewsThisMonth },
                { label: 'Responses sent', value: rev.respondedCount },
                { label: 'Response rate', value: `${rev.responseRate}%` },
              ].map((r) => (
                <View
                  key={r.label}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: BRAND.gray100,
                  }}
                >
                  <Text style={{ fontSize: 8, color: BRAND.gray600 }}>{r.label}</Text>
                  <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: BRAND.navy }}>
                    {r.value}
                  </Text>
                </View>
              ))}
            </View>

            {/* Citations */}
            <View style={S.col50}>
              <View style={S.sectionHeader}>
                <View style={S.sectionDot} />
                <Text style={S.sectionTitle}>Citations</Text>
              </View>
              <View style={S.citationRow}>
                <View style={S.citationStat}>
                  <Text style={S.citationStatValue}>{cit.totalCitations}</Text>
                  <Text style={S.citationStatLabel}>Total</Text>
                </View>
                <View style={S.citationStat}>
                  <Text style={[S.citationStatValue, { color: BRAND.green }]}>+{cit.newThisMonth}</Text>
                  <Text style={S.citationStatLabel}>New this month</Text>
                </View>
              </View>
              <Text style={{ fontSize: 8, color: BRAND.gray600, marginBottom: 6, marginTop: 4 }}>
                Active directories
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                {cit.topDirectories.map((dir) => (
                  <View key={dir} style={[S.badge, S.badgeGray]}>
                    <Text style={[S.badgeText, S.badgeGrayText]}>{dir}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Monthly Goals */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>Monthly Goals</Text>
            </View>
            <View style={S.tableHeader}>
              <Text style={[S.tableHeaderCell, { flex: 2 }]}>Metric</Text>
              <Text style={[S.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Target</Text>
              <Text style={[S.tableHeaderCell, { flex: 1, textAlign: 'center' }]}>Actual</Text>
              <Text style={[S.tableHeaderCell, { flex: 2 }]}>Progress</Text>
            </View>
            {goals.map((g, i) => (
              <View key={g.metric} style={[S.goalRow, i % 2 === 1 ? { backgroundColor: BRAND.gray50 } : {}]}>
                <Text style={S.goalName}>{g.metric}</Text>
                <Text style={S.goalTarget}>{g.target} {g.unit}</Text>
                <Text style={[S.goalActual, { color: g.actual >= g.target ? BRAND.green : BRAND.navy }]}>
                  {g.actual} {g.unit}
                </Text>
                <View style={S.goalBarContainer}>
                  <View
                    style={[
                      S.goalBarFill,
                      { width: goalBarWidth(g.actual, g.target), backgroundColor: goalBarColor(g.actual, g.target) },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        <Footer report={report} />
      </Page>

      {/* ── Page 3: Action Items + Next Month ── */}
      <Page size="LETTER" style={S.page}>
        <View style={S.accentBar} />
        <View style={S.body}>
          {/* Action items */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>Action Items</Text>
            </View>
            {actionItems.map((item) => (
              <View key={item.id} style={S.actionItem}>
                <View style={[S.actionItemDot, { backgroundColor: priorityDotColor(item.priority) }]} />
                <View style={S.actionItemContent}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <Text style={S.actionItemTitle}>{item.title}</Text>
                    <View style={[S.badge, item.status === 'complete' ? S.badgeGreen : item.status === 'in-progress' ? S.badgeBlue : S.badgeGray]}>
                      <Text style={[S.badgeText, item.status === 'complete' ? S.badgeGreenText : item.status === 'in-progress' ? S.badgeBlueText : S.badgeGrayText]}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={S.actionItemDesc}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Next month focus */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>Next Month Focus</Text>
            </View>
            <View style={S.highlightBox}>
              <Text style={S.highlightText}>{report.nextMonthFocus}</Text>
            </View>
          </View>

          {/* Contact / prepared by */}
          <View
            style={{
              borderWidth: 1,
              borderColor: BRAND.gray200,
              borderRadius: 6,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 16,
              marginTop: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: BRAND.gray400, marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Prepared by
              </Text>
              <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: BRAND.navy, marginBottom: 2 }}>
                {report.preparedBy}
              </Text>
              <Link src={`mailto:${report.preparedByEmail}`} style={{ fontSize: 8, color: BRAND.blue, marginBottom: 1 }}>
                {report.preparedByEmail}
              </Link>
              <Link src={report.preparedByWebsite} style={{ fontSize: 8, color: BRAND.blue }}>
                {report.preparedByWebsite}
              </Link>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: BRAND.gray400, marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Prepared for
              </Text>
              <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: BRAND.navy, marginBottom: 2 }}>
                {report.clientName}
              </Text>
              <Text style={{ fontSize: 8, color: BRAND.gray600, marginBottom: 1 }}>{report.clientBusinessName}</Text>
              <Link src={report.clientWebsite} style={{ fontSize: 8, color: BRAND.blue }}>
                {report.clientWebsite}
              </Link>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 8, color: BRAND.gray400, marginBottom: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Report details
              </Text>
              <Text style={{ fontSize: 9, color: BRAND.gray800, marginBottom: 2 }}>
                {report.reportMonth}
              </Text>
              <Text style={{ fontSize: 8, color: BRAND.gray600, marginBottom: 1 }}>
                Campaign month {report.campaignMonth}
              </Text>
              <Text style={{ fontSize: 8, color: BRAND.gray600 }}>
                {new Date(report.reportDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </View>
          </View>
        </View>
        <Footer report={report} />
      </Page>
    </Document>
  );
}
