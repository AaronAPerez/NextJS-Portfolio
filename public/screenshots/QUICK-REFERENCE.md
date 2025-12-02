# 📸 Screenshot Quick Reference Card

> **Fast reference for capturing consistent, professional portfolio screenshots**

---

## ⚡ Quick Start (3 Steps)

### 1. Setup Browser
```bash
F12 → Ctrl+Shift+M → Set dimensions → 100% zoom
```

### 2. Capture
```bash
DevTools menu (⋮) → "Capture screenshot"
```

### 3. Save
```bash
Optimize → Rename → Move to public/screenshots/
```

---

## 📐 Standard Dimensions

| Type | Resolution | Use Case |
|------|-----------|----------|
| **Desktop** | 1920x1080 | Primary screenshots |
| **Tablet** | 768x1024 | Responsive demo |
| **Mobile** | 390x844 | iPhone mockup |
| **Mobile (Android)** | 360x800 | Android mockup |

---

## 📋 8 Required Screenshots

| # | Filename | Section | Viewport | Theme |
|---|----------|---------|----------|-------|
| 1 | `hero-section.png` | Hero/Landing | Desktop | Light/Dark |
| 2 | `skills-section.png` | Skills Grid | Desktop | Light/Dark |
| 3 | `timeline-section.png` | Experience | Desktop | Light/Dark |
| 4 | `mobile-hero.png` | Hero | Mobile | Light/Dark |
| 5 | `tablet-view.png` | Any Section | Tablet | Light/Dark |
| 6 | `desktop-view.png` | Full Page | Desktop | Light/Dark |
| 7 | `light-mode.png` | Any Section | Desktop | **Light** |
| 8 | `dark-mode.png` | Same as #7 | Desktop | **Dark** |

---

## 🎨 Styling Checklist

### Before Capture
- [ ] Browser @ 100% zoom
- [ ] Hide browser extensions
- [ ] Clear bookmarks bar
- [ ] Fresh page load (clear cache)
- [ ] All images loaded
- [ ] Animations completed

### Content
- [ ] Real data (no placeholders)
- [ ] Profile image visible
- [ ] Text is readable
- [ ] Colors correct
- [ ] No console errors

### After Capture
- [ ] Crop if needed
- [ ] Optimize (<500KB)
- [ ] Rename correctly
- [ ] Move to directory
- [ ] Test in README

---

## 🛠️ Keyboard Shortcuts

### Windows
```
Win + Shift + S     Snipping Tool
PrtScn              Full screen
Alt + PrtScn        Active window
```

### macOS
```
Cmd + Shift + 3     Full screen
Cmd + Shift + 4     Selection
Cmd + Shift + 5     Screenshot tool
```

### Browser DevTools
```
F12                 Open DevTools
Ctrl + Shift + M    Device toolbar
Ctrl + Shift + P    Command palette
                    → type "screenshot"
```

---

## 🌐 Online Tools (One-Click)

### Add Browser Frame
- [Screely](https://www.screely.com/) - Instant browser mockup
- [Shots.so](https://shots.so/) - Beautiful frames & backgrounds
- [Browser Frame](https://browserframe.com/) - Multiple browsers

### Optimize Images
- [TinyPNG](https://tinypng.com/) - Compress PNG/JPG
- [Squoosh](https://squoosh.app/) - Google's optimizer
- [Compressor.io](https://compressor.io/) - Smart compression

### Device Mockups
- [Mockuphone](https://mockuphone.com/) - All devices
- [Smartmockups](https://smartmockups.com/) - Realistic mockups
- [Dimmy.club](https://dimmy.club/) - Device frames

---

## 📦 File Naming Convention

```
Format: [section]-[device]-[theme].png

Examples:
✓ hero-section.png
✓ skills-section-desktop-dark.png
✓ mobile-hero-light.png
✓ timeline-section.png

Avoid:
✗ Screenshot_123.png
✗ image-1.png
✗ portfolio_pic.png
```

---

## 🎯 Quality Standards

### Resolution
- **Minimum:** 1920x1080 (desktop)
- **File Size:** Under 500KB
- **Format:** PNG or WebP
- **Quality:** High, no artifacts

### Content
- **Text:** Clear and readable
- **Colors:** Accurate representation
- **Contrast:** WCAG AA compliant
- **Alignment:** Centered, balanced

### Technical
- **No Cut-offs:** Complete elements
- **Sharp:** No blur or pixelation
- **Consistent:** Matching style across all
- **Optimized:** Compressed but high-quality

---

## 🔧 DevTools Screenshot Commands

### Open Command Menu
```
Ctrl + Shift + P (Windows)
Cmd + Shift + P (macOS)
```

### Available Commands
```
> Capture screenshot           # Visible area
> Capture full size screenshot # Entire page
> Capture node screenshot      # Selected element
> Capture area screenshot      # Custom selection
```

---

## 💡 Pro Tips

### Lighting & Colors
✓ Use consistent time of day for captures
✓ Verify colors on multiple displays
✓ Check both light and dark modes
✓ Ensure gradients render correctly

### Composition
✓ Center key content
✓ Show complete UI elements
✓ Include CTAs in frame
✓ Balance whitespace

### Efficiency
✓ Batch capture all screenshots at once
✓ Use consistent browser window size
✓ Save templates for repeated use
✓ Create a reusable checklist

---

## 🚨 Common Mistakes

| ❌ Avoid | ✅ Do Instead |
|---------|--------------|
| Random dimensions | Use standard sizes |
| Lorem ipsum text | Real content |
| Broken images | Verify all loaded |
| Huge file sizes | Optimize <500KB |
| Inconsistent styling | Match all screenshots |
| Cut-off content | Complete elements |
| Low resolution | High-quality capture |
| No alt text | Descriptive captions |

---

## 📱 Device-Specific Settings

### iPhone 12 Pro (Mobile)
```yaml
Width: 390px
Height: 844px
Device Pixel Ratio: 3
User Agent: iOS Safari
```

### iPad (Tablet)
```yaml
Width: 768px (Portrait) / 1024px (Landscape)
Height: 1024px (Portrait) / 768px (Landscape)
Device Pixel Ratio: 2
User Agent: iOS Safari
```

### Desktop
```yaml
Width: 1920px
Height: 1080px
Browser: Chrome/Edge
Zoom: 100%
```

---

## 🎨 Color Values Reference

### Portfolio Brand Colors
```css
Primary Blue:    #3B82F6
Primary Purple:  #8B5CF6
Primary Indigo:  #6366F1

Accent Cyan:     #06B6D4
Accent Pink:     #EC4899

Light BG:        #FFFFFF, #F9FAFB
Dark BG:         #111827, #1F2937

Text Light:      #1F2937
Text Dark:       #F9FAFB
```

---

## 📊 Optimization Targets

| Metric | Target | Max |
|--------|--------|-----|
| File Size | 200-300KB | 500KB |
| Width | 1920px | 2560px |
| Height | 1080px | 1440px |
| Format | PNG/WebP | PNG |
| Compression | 85% | 100% |

---

## 🔗 Useful Links

- [SCREENSHOT-TEMPLATE.md](SCREENSHOT-TEMPLATE.md) - Full styling guide
- [README.md](README.md) - Detailed instructions
- [browser-frame-template.html](browser-frame-template.html) - HTML template

---

## 📞 Need Help?

1. Check [SCREENSHOT-TEMPLATE.md](SCREENSHOT-TEMPLATE.md) for detailed guide
2. Review [README.md](README.md) for step-by-step instructions
3. Use [browser-frame-template.html](browser-frame-template.html) for consistent framing
4. Open GitHub issue if stuck

---

<div align="center">

**Quick Workflow Summary**

Open Site → F12 → Ctrl+Shift+M → Set Size → Capture → Optimize → Save

**Average Time: 2-3 minutes per screenshot**

</div>

---

**Version:** 1.0
**Last Updated:** December 2024
**Status:** ✅ Ready to use
