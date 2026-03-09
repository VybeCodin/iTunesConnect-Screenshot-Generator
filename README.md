# ScreenCraft - App Store Screenshot Generator

> **Built with [VybeCoding](https://www.vybecoding.sh/)** - the AI-powered mobile coding terminal.
> This entire project was generated, debugged, and shipped using the VybeCoding app.
>
> Download VybeCoding:
> - [iOS App Store](https://apps.apple.com/app/id6759407823)
> - [macOS Desktop App](https://github.com/VybeCodin/webcam/releases/download/v0.1.2/VybeCoding_0.1.2_universal.dmg)
> - [YouTube](https://www.youtube.com/@VybeCodin)
> - Website: [vybecoding.sh](https://www.vybecoding.sh/)

### [Live Demo](https://i-tunes-connect-screenshot-generato.vercel.app/)

---

## What is ScreenCraft?

ScreenCraft is a free, modern, browser-based App Store & Google Play screenshot generator. There's no good free tool for this - existing options (FlyerBanana, AppLaunchpad, AppMockUp) cost $29/month+ or produce mediocre output. ScreenCraft changes that.

**No accounts. No subscriptions. No watermarks. Everything runs in your browser.**

### Key Features

- **Fabric.js Canvas Editor** - Full drag-and-drop editing with text, images, shapes, and layers
- **9 Device Frames** - iPhone 16 Pro Max, iPhone 15 Plus, iPhone 15, iPhone 8 Plus, iPad Pro 13", iPad Pro 12.9", Android Phone, Android 7" Tablet, Android 10" Tablet
- **Beautiful Typography** - 24 curated Google Fonts with full styling controls (size, weight, color, alignment, spacing, shadows)
- **Gradient Backgrounds** - 20 preset gradients + custom gradient builder, 32 solid color presets, image backgrounds
- **Template Gallery** - 15 professionally designed templates across Minimal, Bold, Dark, and Gradient categories
- **Multi-Screenshot Projects** - Create up to 10 screenshots per project with consistent styling
- **One-Click Export** - Export all required App Store & Google Play sizes in a single ZIP download
- **Undo/Redo History** - 50-step history with keyboard shortcuts
- **Layer Management** - Show/hide, lock/unlock, reorder, and delete layers
- **Dark Theme** - Editor uses a dark theme by default (like Figma) with light mode support
- **localStorage Persistence** - Projects auto-save to your browser, no cloud needed
- **Keyboard Shortcuts** - Ctrl+Z undo, Ctrl+Shift+Z redo, Ctrl+S save, Delete to remove elements

---

## Screenshots

### Landing Page
The landing page features an animated hero section, feature grid, and example screenshot gallery.

### Editor
The editor has a Figma-inspired layout:
```
┌─────────────────────────────────────────────────────────┐
│  Logo  │ Undo Redo │ Device: iPhone 16 Pro ▼ │ Export  │
├────────┼───────────────────────────────────┼───────────┤
│ Tools  │                                   │ Properties│
│        │                                   │           │
│ Tmpl   │         [Canvas Viewport]         │ Position  │
│ Text   │                                   │ Size      │
│ BG     │      ┌─────────────────┐          │ Font      │
│ Img    │      │  Device Frame   │          │ Color     │
│ Lyrs   │      │  with content   │          │ Effects   │
│        │      └─────────────────┘          │           │
├────────┴───────────────────────────────────┴───────────┤
│  [1] [2] [3] [4] [+]  ← Screenshot thumbnails strip   │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 16** (App Router) | Server Components, API routes, Vercel deploy |
| Canvas | **Fabric.js 6** | Rich object model, built-in serialization, great editor UX |
| UI Components | **shadcn/ui + Base UI** | Accessible, beautiful, customizable |
| Styling | **Tailwind CSS v4** | Utility-first, fast iteration |
| Animation | **Framer Motion 11** | Smooth transitions, scroll animations |
| State | **Zustand 5** | Lightweight, no boilerplate, perfect for editor state |
| Icons | **Lucide React** | Consistent, tree-shakeable |
| Export | **JSZip + FileSaver** | Client-side ZIP generation and download |
| Theme | **next-themes** | Dark/light mode with system preference |
| Toasts | **Sonner** | Beautiful toast notifications |
| Package Manager | **pnpm** | Fast, disk-efficient |
| TypeScript | **Strict mode** | Type safety throughout |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with ThemeProvider, TooltipProvider, Toaster
│   ├── page.tsx                   # Landing page (Hero + Features + Examples)
│   ├── editor/
│   │   └── page.tsx               # Main editor page (orchestrates all editor components)
│   ├── templates/
│   │   └── page.tsx               # Template gallery browser with category filtering
│   └── api/
│       └── export/route.ts        # Server-side export endpoint (PNG optimization)
│
├── components/
│   ├── ui/                        # shadcn/ui components (Button, Dialog, Dropdown, etc.)
│   ├── editor/
│   │   ├── Canvas.tsx             # Fabric.js canvas wrapper with zoom/pan/events
│   │   ├── Toolbar.tsx            # Top toolbar (undo, redo, zoom, device selector, export)
│   │   ├── Sidebar.tsx            # Left icon sidebar (5 tool panels)
│   │   ├── SidebarPanel.tsx       # Expanded sidebar panel content router
│   │   ├── PropertiesPanel.tsx    # Right panel (position, size, font, color, opacity)
│   │   ├── ScreenshotList.tsx     # Bottom screenshot strip (thumbnails, add/remove/duplicate)
│   │   ├── TextEditor.tsx         # Text presets (Headline, Subtitle, Body, Caption)
│   │   ├── BackgroundPicker.tsx   # Background controls (solid, gradient, image)
│   │   ├── ImageUploader.tsx      # Drag-and-drop image upload
│   │   ├── LayerPanel.tsx         # Layer list (visibility, lock, reorder, delete)
│   │   ├── TemplatePanel.tsx      # Template previews with one-click apply
│   │   └── ExportDialog.tsx       # Export modal (platform/size selection, ZIP download)
│   ├── landing/
│   │   ├── Hero.tsx               # Animated hero with gradient orbs and editor mockup
│   │   ├── Features.tsx           # 8-feature grid with staggered animations
│   │   └── Examples.tsx           # Example screenshot gallery with CTA
│   └── templates/
│       └── (template components)
│
├── stores/
│   ├── editor-store.ts            # Zustand store: canvas state, history, device, background
│   └── project-store.ts           # Zustand store: localStorage project persistence
│
├── lib/
│   ├── canvas/
│   │   ├── fabric-utils.ts        # Fabric.js helpers (createTextbox, loadImage, generateId)
│   │   ├── device-frames.ts       # Device spec lookup and dimension helpers
│   │   ├── export.ts              # ZIP export pipeline (JSZip + FileSaver)
│   │   └── templates.ts           # Built-in template definitions
│   ├── constants/
│   │   ├── devices.ts             # 9 device specs with dimensions and corner radii
│   │   ├── colors.ts              # 32 preset colors + 20 gradient presets
│   │   └── fonts.ts               # 24 curated Google Fonts with weight options
│   └── utils.ts                   # cn(), debounce(), generateId(), formatFileSize()
│
├── types/
│   ├── editor.ts                  # EditorState, BackgroundConfig, Screenshot, TextStyle
│   ├── template.ts                # Template, TemplateCategory, TemplateVariable
│   └── device.ts                  # DeviceType, DeviceSpec, ExportSize, Platform
│
└── data/
    └── templates/                 # (Template JSON definitions - extensible)
```

---

## How It Works

### Architecture Overview

1. **Landing Page** (`/`) - Server-rendered marketing page with Framer Motion animations. Links to the editor and template gallery.

2. **Editor** (`/editor`) - Client-side SPA powered by Fabric.js. The page orchestrates:
   - A `<Canvas>` component that wraps Fabric.js and listens for custom DOM events
   - A Zustand store (`editor-store.ts`) that manages all editor state
   - Sidebar panels communicate with the canvas via `window.dispatchEvent()` custom events
   - The properties panel reads the active Fabric.js object and updates it in real-time

3. **State Management** - Zustand stores with no boilerplate:
   - `editor-store.ts` holds canvas JSON, selected objects, zoom, device type, background config, undo/redo history (50 snapshots), and screenshot collection
   - `project-store.ts` handles localStorage read/write for project persistence

4. **Export Pipeline**:
   ```
   User clicks Export → Select target sizes (App Store / Google Play)
   → For each screenshot × each size:
       → Render Fabric.js canvas at target resolution via multiplier
       → Generate PNG blob
   → Package all blobs into ZIP with organized folders:
       /AppStore/iPhone-16-Pro-Max/screenshot-1.png
       /GooglePlay/Phone/screenshot-1.png
   → Download via FileSaver
   ```

5. **Template System** - Templates are defined as structured objects with:
   - Background config (gradient colors, angle)
   - Element definitions (headline, subtitle, placeholder positions)
   - When applied, the canvas is cleared and rebuilt with template elements

### Export Sizes

| Platform | Device | Resolution | Required |
|----------|--------|------------|----------|
| iOS | iPhone 16 Pro Max (6.9") | 1320 x 2868 | Yes |
| iOS | iPhone 15 Plus (6.7") | 1290 x 2796 | No |
| iOS | iPhone 15 (6.1") | 1179 x 2556 | No |
| iOS | iPhone 8 Plus (5.5") | 1242 x 2208 | No |
| iOS | iPad Pro 13" | 2064 x 2752 | Yes |
| iOS | iPad Pro 12.9" | 2048 x 2732 | No |
| Android | Phone | 1080 x 1920 | Yes |
| Android | 7" Tablet | 1200 x 1920 | No |
| Android | 10" Tablet | 1600 x 2560 | No |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AiCodeVoyager/iTunesConnect-Screenshot-Generator.git
cd iTunesConnect-Screenshot-Generator

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

### Deploy to Vercel

```bash
# One-click deploy
npx vercel
```

Or connect the GitHub repo to [Vercel](https://vercel.com) for automatic deployments on push.

---

## Usage Guide

### Creating a Screenshot

1. Navigate to `/editor` or click "Start Creating" on the landing page
2. Choose a device from the toolbar (e.g., iPhone 16 Pro Max)
3. Select a template from the Templates panel, or start from scratch
4. Add text using the Text panel (Headline, Subtitle, Body, Caption presets)
5. Upload your app screenshot using the Images panel
6. Customize the background using the Background panel (solid, gradient, or image)
7. Adjust element properties in the right Properties panel
8. Use the Layer panel to reorder, hide, or lock elements

### Managing Multiple Screenshots

1. Click the `+` button in the bottom screenshot strip to add new screenshots
2. Click any thumbnail to switch between screenshots
3. Hover over a thumbnail to duplicate or remove it
4. Each screenshot maintains its own canvas state

### Exporting

1. Click the "Export" button in the toolbar
2. Select which device sizes you need (App Store, Google Play, or both)
3. Click "Export" to download a ZIP file with all sizes organized by platform

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Ctrl/Cmd + S` | Save project |
| `Delete / Backspace` | Delete selected element |
| `Ctrl/Cmd + Scroll` | Zoom in/out |

---

## Configuration

### Adding Custom Fonts

Edit `src/lib/constants/fonts.ts` to add fonts from Google Fonts:

```typescript
export const CURATED_FONTS: FontOption[] = [
  { family: "Your Font", weights: [400, 700], category: "sans-serif" },
  // ...
];
```

### Adding Custom Gradients

Edit `src/lib/constants/colors.ts`:

```typescript
export const PRESET_GRADIENTS: PresetGradient[] = [
  {
    name: "My Gradient",
    stops: [
      { offset: 0, color: "#ff0000" },
      { offset: 1, color: "#0000ff" },
    ],
    angle: 135,
  },
  // ...
];
```

### Adding New Device Specs

Edit `src/lib/constants/devices.ts`:

```typescript
export const DEVICES: Record<string, DeviceSpec> = {
  "my-device": {
    id: "my-device",
    name: "My Device",
    platform: "ios",
    width: 1170,
    height: 2532,
    screenX: 0,
    screenY: 0,
    screenWidth: 1170,
    screenHeight: 2532,
    cornerRadius: 90,
  },
  // ...
};
```

---

## Future Roadmap (Phase 2)

- [ ] AI copywriting - Auto-generate headlines and subtitles
- [ ] AI background generation - Generate unique backgrounds with AI
- [ ] Cloud sync with accounts
- [ ] Real device frame PNG overlays (bezels, notches)
- [ ] Panoramic mode (shared background across screenshots)
- [ ] Animation export (animated App Store previews)
- [ ] Collaboration features
- [ ] More templates (50+)

---

## License

MIT

---

<p align="center">
  <br />
  Built with <a href="https://www.vybecoding.sh/">VybeCoding</a> - Code from anywhere.
  <br />
  <a href="https://apps.apple.com/app/id6759407823">Download on the App Store</a> · <a href="https://github.com/VybeCodin/webcam/releases">Download for macOS</a> · <a href="https://www.youtube.com/@VybeCodin">YouTube</a>
</p>
