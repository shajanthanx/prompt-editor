# Prompter - AI Prompt Crafting Studio

A beautiful, user-friendly web application for designing, editing, and managing AI prompts. Built with Next.js and React.

🔗 **Live Demo**: [https://shajanthanx.github.io/prompt-editor](https://shajanthanx.github.io/prompt-editor)

## Features

- 📝 **Spacious Editor**: Large editing area with auto-save, character/word count
- 📚 **Template Library**: 10+ pre-built templates for common use cases
- ⚡ **Power Phrases**: 25+ quick-insert snippets to enhance prompts
- 💾 **Saved Prompts**: Save, search, and manage your prompt library
- 🌓 **Theme Toggle**: Beautiful light and dark themes
- 📥 **Export/Import**: Backup and restore all your data
- 💿 **Offline First**: All data stored locally in browser

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/shajanthanx/prompt-editor.git
cd prompt-editor

# Install dependencies
npm install

# Run development server
npm run dev
# OR if you have Node version issues:
node node_modules/next/dist/bin/next dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Building for Production

```bash
# Build static export
npm run build
# OR
node node_modules/next/dist/bin/next build
```

## Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

This will:
1. Build the static export
2. Deploy to the `gh-pages` branch
3. Make the site available at your GitHub Pages URL

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Vanilla CSS with CSS Variables
- **TypeScript**: Full type safety
- **Storage**: Browser localStorage

## Project Structure

```
prompter/
├── app/
│   ├── components/      # React components
│   ├── data/           # Default templates & phrases
│   ├── types/          # TypeScript interfaces
│   ├── utils/          # Utility functions
│   ├── globals.css     # Design system
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main app
├── public/             # Static assets
└── package.json
```

## License

MIT

## Author

Built by [shajanthanx](https://github.com/shajanthanx)
