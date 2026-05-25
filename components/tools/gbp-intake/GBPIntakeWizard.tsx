/**
 * GBPIntakeWizard — Main Wizard Component
 * ────────────────────────────────────────
 * Orchestrates the full 6-step GBP client onboarding wizard.
 * Handles step navigation, progress display, sidebar, and renders
 * the correct step component. All state lives in useGBPIntake.
 *
 * Design: Dark glassmorphism sidebar + clean right-side form panel.
 * Matches aaronaperez.dev aesthetic — dark bg, blue accents, subtle borders.
 */

'use client';

import { useEffect, useState } from 'react';
import {
  Building2, FileText, Camera, Key, BarChart2,
  CalendarCheck, ChevronRight, ChevronLeft, Save,
  CheckCircle2, Circle, Menu, X,
} from 'lucide-react';

import { useGBPIntake } from '@/hooks/useGBPIntake';
import { WIZARD_STEPS } from '@/types/gbp-intake';

import {
  StepBusinessInfo,
  StepContentMessaging,
  StepPhotosMedia,
  StepAccessAccounts,
  StepCompetitorIntel,
  StepOngoingDelivery,
} from './StepComponents';
import { IntakeSummary } from './IntakeSummary';

// ── Icon map (matches WizardStep.icon string) ─────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Building2,
  FileText,
  Camera,
  Key,
  BarChart2,
  CalendarCheck,
};

export function GBPIntakeWizard() {
  const intake = useGBPIntake();
  const [showSummary, setShowSummary] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);

  // ── Auto-save flash feedback ───────────────────────────────────────────────
  const handleManualSave = () => {
    intake.saveToStorage();
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
  };

  // ── Show summary when all steps are complete ───────────────────────────────
  const allComplete =
    intake.data.completedSteps.length === WIZARD_STEPS.length;

  // ── Render active step form ────────────────────────────────────────────────
  const renderStep = () => {
    switch (intake.currentStepId) {
      case 'business-info':
        return (
          <StepBusinessInfo
            data={intake.data.businessInfo}
            onChange={intake.updateBusinessInfo}
          />
        );
      case 'content-messaging':
        return (
          <StepContentMessaging
            data={intake.data.contentMessaging}
            onChange={intake.updateContentMessaging}
          />
        );
      case 'photos-media':
        return (
          <StepPhotosMedia
            data={intake.data.photosMedia}
            onChange={intake.updatePhotosMedia}
          />
        );
      case 'access-accounts':
        return (
          <StepAccessAccounts
            data={intake.data.accessAccounts}
            onChange={intake.updateAccessAccounts}
          />
        );
      case 'competitor-intel':
        return (
          <StepCompetitorIntel
            data={intake.data.competitorIntel}
            onChange={intake.updateCompetitorIntel}
          />
        );
      case 'ongoing-delivery':
        return (
          <StepOngoingDelivery
            data={intake.data.ongoingDelivery}
            onChange={intake.updateOngoingDelivery}
          />
        );
    }
  };

  const currentStep = WIZARD_STEPS[intake.currentStepIndex];
  const StepIcon = ICON_MAP[currentStep.icon];

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gray-950 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Back to wizard */}
          <button
            onClick={() => setShowSummary(false)}
            className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to wizard
          </button>
          <IntakeSummary
            data={intake.data}
            onExportJson={intake.exportAsJson}
            onNewClient={() => {
              intake.resetForm();
              setShowSummary(false);
            }}
            onSubmitToDatabase={intake.submitToDatabase}
            isSubmitting={intake.isSubmitting}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ── Mobile sidebar overlay ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex min-h-screen">
        {/* ── Sidebar ───────────────────────────────────────────────────────── */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/8 
                      bg-gray-900/95 backdrop-blur-sm transition-transform duration-300 lg:relative lg:translate-x-0
                      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          aria-label="Wizard navigation"
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-blue-400">
                AP Designs
              </p>
              <h2 className="mt-0.5 text-sm font-semibold text-gray-100">
                GBP Client Intake
              </h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1.5 text-gray-500 hover:text-gray-300 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>Overall progress</span>
              <span className="font-medium text-gray-300">
                {intake.completionPercent}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/8">
              <div
                className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${intake.completionPercent}%` }}
                role="progressbar"
                aria-valuenow={intake.completionPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Step list */}
          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            {WIZARD_STEPS.map((step, idx) => {
              const Icon = ICON_MAP[step.icon];
              const isActive = idx === intake.currentStepIndex;
              const isDone = intake.data.completedSteps.includes(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    intake.goToStep(idx);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left 
                              transition-all duration-150 mb-1 ${
                    isActive
                      ? 'bg-blue-500/15 border border-blue-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Step number / complete indicator */}
                  <div
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium
                      ${isDone
                        ? 'bg-green-500/20 text-green-400'
                        : isActive
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-white/5 text-gray-500'
                      }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Step label */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium ${
                        isActive ? 'text-blue-300' : isDone ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="truncate text-xs text-gray-600">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Active chevron */}
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-blue-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Client info in sidebar footer */}
          {intake.data.businessInfo.legalName && (
            <div className="border-t border-white/8 px-5 py-4">
              <p className="text-xs text-gray-500">Current client</p>
              <p className="mt-0.5 text-sm font-medium text-gray-300 truncate">
                {intake.data.businessInfo.legalName}
              </p>
            </div>
          )}

          {/* Summary button */}
          {allComplete && (
            <div className="border-t border-white/8 p-3">
              <button
                onClick={() => setShowSummary(true)}
                className="w-full rounded-lg bg-green-500/15 border border-green-500/30 
                           px-4 py-2.5 text-sm font-medium text-green-300 
                           hover:bg-green-500/25 transition-colors"
              >
                View Complete Summary →
              </button>
            </div>
          )}
        </aside>

        {/* ── Main content area ─────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between 
                          border-b border-white/8 bg-gray-950/90 backdrop-blur-sm px-4 py-3 sm:px-8">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 rounded-lg p-2 text-gray-500 
                         hover:text-gray-300 lg:hidden"
              aria-label="Open step navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
              <span>GBP Intake</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gray-300">
                Step {intake.currentStepIndex + 1} — {currentStep.title}
              </span>
            </div>

            {/* Save indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleManualSave}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium 
                            border transition-all duration-200 ${
                  saveFlash
                    ? 'border-green-500/40 bg-green-500/15 text-green-400'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-gray-200'
                }`}
                aria-live="polite"
              >
                <Save className="h-3 w-3" />
                {saveFlash ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>

          {/* Step content */}
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8">
            {/* Step header */}
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center 
                              rounded-xl border border-blue-500/30 bg-blue-500/10">
                <StepIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <span>Step {intake.currentStepIndex + 1} of {intake.totalSteps}</span>
                  {intake.data.completedSteps.includes(intake.currentStepId) && (
                    <span className="flex items-center gap-1 text-green-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Saved
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-semibold text-gray-100">
                  {currentStep.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>

            {/* Active step form */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 sm:p-8">
              {renderStep()}
            </div>

            {/* Navigation footer */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={intake.prevStep}
                disabled={intake.isFirstStep}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 
                           px-4 py-2.5 text-sm font-medium text-gray-300 
                           hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed 
                           transition-all duration-150"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {/* Step dots */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Wizard steps">
                {WIZARD_STEPS.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => intake.goToStep(idx)}
                    role="tab"
                    aria-selected={idx === intake.currentStepIndex}
                    aria-label={`Go to step ${idx + 1}: ${step.title}`}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      idx === intake.currentStepIndex
                        ? 'w-6 bg-blue-400'
                        : intake.data.completedSteps.includes(step.id)
                        ? 'w-2 bg-green-500'
                        : 'w-2 bg-white/15'
                    }`}
                  />
                ))}
              </div>

              {intake.isLastStep ? (
                <button
                  onClick={() => {
                    intake.nextStep();
                    setShowSummary(true);
                  }}
                  className="flex items-center gap-2 rounded-lg bg-green-500/20 border border-green-500/40 
                             px-5 py-2.5 text-sm font-medium text-green-300 
                             hover:bg-green-500/30 transition-all duration-150"
                >
                  Complete Intake
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={intake.nextStep}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 
                             text-sm font-medium text-white hover:bg-blue-500 
                             transition-all duration-150"
                >
                  Next Step
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Auto-save notice */}
            <p className="mt-4 text-center text-xs text-gray-600">
              Progress is auto-saved to your browser. You can close and return anytime.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
