# Samiran Das - Portfolio

A modern, interactive 3D portfolio website built with Next.js, Three.js, and Tailwind CSS.

## Features

- **Interactive 3D Globe**: WebGL-powered rotating globe with mouse/touch controls
- **Hero Video Background**: Immersive full-screen video hero section
- **Projects Showcase**: Grid layout showcasing recent work
- **Skills Section**: Visual representation of technical skills
- **Responsive Design**: Mobile-first approach with smooth animations
- **Dark Theme**: Professional dark color scheme (#0a0a0a background)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js r128
- **Animation**: CSS transitions & requestAnimationFrame
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SAMI7434/my_portfolio.git
cd my_portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
my_portfolio/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page with globe hero
│   ├── skills/            # Skills section page
│   ├── projects/          # Projects section page
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── GlobeCanvas.tsx    # Three.js globe component
│   ├── Navbar.tsx         # Navigation bar
│   └── Footer.tsx         # Footer component
├── public/               # Static assets
│   └── icon/             # Image assets
└── package.json          # Dependencies
```

## Customization

### Updating the Globe Text

Edit `app/page.tsx:55` to change the caption text displayed below the globe.

### Changing Hero Video

Update the `src` attribute in `app/page.tsx:20-27` to point to your own video file (local or hosted).

### Modifying Globe Appearance

The globe's visual properties (colors, wireframe, opacity) are configured in `components/globe.tsx`:
- Shell opacity: line 43
- Wireframe color: line 49
- Name plane text: lines 68-78

## License

MIT License - feel free to use this template for your own portfolio.

## Credits

Built by Samiran Das