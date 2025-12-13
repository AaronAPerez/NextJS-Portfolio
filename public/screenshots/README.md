# Portfolio Screenshots Guide

This directory contains screenshots used in the main README.md file. Below are instructions for capturing and organizing screenshots.

## 📸 Required Screenshots

To complete the README showcase, capture the following screenshots:

### 1. Hero Section (`hero-section.webp`)
- **Page**: Homepage
- **Section**: Hero/Landing section
- **Viewport**: Desktop (1920x1080 or 1440x900)
- **Theme**: Light or Dark (your choice)
- **What to capture**:
  - Full hero section with profile image
  - Tech stack rotation animation (mid-state)
  - Navigation header
  - "Available for Hire" badge

### 2. Skills Section (`skills-section.webp`)
- **Page**: Homepage
- **Section**: Skills & Technologies section
- **Viewport**: Desktop (1920x1080)
- **What to capture**:
  - Section header with decorative lines
  - Category filter buttons
  - Skills grid showing multiple technology cards
  - Stats (Technologies/Categories/Years Experience)

### 3. Timeline Section (`timeline-section.webp`)
- **Page**: Homepage
- **Section**: Professional Experience & Education
- **Viewport**: Desktop (1920x1080)
- **What to capture**:
  - Section header
  - At least one experience card and one education card
  - Timeline layout with gradient cards

### 4. Mobile View (`mobile-hero.webp`)
- **Viewport**: iPhone 12 Pro (390x844) or similar
- **Section**: Hero section on mobile
- **Orientation**: Portrait
- **What to capture**: Full mobile hero layout

### 5. Tablet View (`tablet-view.webp`)
- **Viewport**: iPad (768x1024) or similar
- **Section**: Skills or Projects section
- **Orientation**: Portrait or Landscape
- **What to capture**: Responsive grid layout

### 6. Desktop View (`desktop-view.webp`)
- **Viewport**: Desktop (1920x1080)
- **Section**: Full homepage or projects section
- **What to capture**: Wide desktop layout showcase

### 7. Light Mode (`light-mode.webp`)
- **Theme**: Light mode active
- **Section**: Any prominent section (Hero or About)
- **Viewport**: Desktop
- **What to capture**: Light theme styling

### 8. Dark Mode (`dark-mode.webp`)
- **Theme**: Dark mode active
- **Section**: Same section as light-mode.webp
- **Viewport**: Desktop
- **What to capture**: Dark theme styling (for comparison)

---

## 🛠️ How to Take Screenshots

### Option 1: Browser DevTools (Recommended)

1. **Open your portfolio** in Chrome/Edge
2. **Open DevTools** (F12 or Right-click → Inspect)
3. **Toggle device toolbar** (Ctrl+Shift+M)
4. **Select viewport size** from the dropdown or enter custom dimensions
5. **Capture screenshot**:
   - DevTools menu (⋮) → "Capture screenshot" or "Capture full size screenshot"
   - Or use browser extension like "GoFullPage"

### Option 2: Windows Snipping Tool

1. Press **Win + Shift + S**
2. Select area to capture
3. Save to this directory

### Option 3: Third-Party Tools

**Recommended tools:**
- [Awesome Screenshot](https://www.awesomescreenshot.com/)
- [Nimbus Screenshot](https://nimbusweb.me/)
- [Lightshot](https://app.prntscr.com/)
- [ShareX](https://getsharex.com/) (Windows)

---

## 📏 Screenshot Specifications

### Image Format
- **Format**: webp (preferred) or WebP
- **Quality**: High quality, no compression
- **File Size**: Keep under 500KB per image (optimize if needed)

### Dimensions
| Screenshot Type | Recommended Size |
|----------------|------------------|
| Desktop Full   | 1920x1080 or 1440x900 |
| Mobile         | 390x844 (iPhone) or 360x800 |
| Tablet         | 768x1024 (iPad) |

### Best Practices
- ✅ Use clean, crisp screenshots
- ✅ Hide personal information if needed
- ✅ Ensure text is readable
- ✅ Capture consistent states (e.g., no loading spinners)
- ✅ Show real data, not lorem ipsum
- ✅ Include browser chrome if showing responsive design
- ✅ Maintain consistent lighting/contrast

---

## 🎨 Optimization Tips

After capturing screenshots, optimize them:

### Using Online Tools
- [Tinywebp](https://tinywebp.com/) - Compress webp files
- [Squoosh](https://squoosh.app/) - Google's image optimizer

### Using Command Line (Optional)
```bash
# Install ImageMagick
# Then resize/compress:
magick convert input.webp -resize 1920x1080 -quality 85 output.webp
```

---

## 📝 Naming Convention

Follow these naming conventions for consistency:

```
hero-section.webp          # Homepage hero
skills-section.webp        # Skills showcase
timeline-section.webp      # Experience timeline
projects-section.webp      # Featured projects
mobile-hero.webp          # Mobile view
tablet-view.webp          # Tablet view
desktop-view.webp         # Desktop full view
light-mode.webp           # Light theme
dark-mode.webp            # Dark theme
```

---

## ✅ Checklist

Before pushing screenshots to GitHub:

- [ ] All 8 required screenshots captured
- [ ] Images optimized (under 500KB each)
- [ ] Filenames match README references
- [ ] webp or WebP format
- [ ] No personal/sensitive information visible
- [ ] High quality and readable text
- [ ] Consistent styling across screenshots

---

## 🔄 Updating Screenshots

When updating the portfolio design:

1. Re-capture affected screenshots
2. Maintain same naming convention
3. Replace old files
4. Test README renders correctly on GitHub
5. Commit changes with descriptive message

Example commit:
```bash
git add public/screenshots/
git commit -m "docs: update portfolio screenshots with new design"
git push
```

---

## 📞 Need Help?

If you need assistance with screenshots:
- Check browser DevTools documentation
- Use [GitHub's Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- Test image links locally before pushing

---

**Last Updated**: December 2024
