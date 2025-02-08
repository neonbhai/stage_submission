# Instagram Stories Clone

A mobile-focused Instagram Stories clone built with React, TypeScript, and Tailwind CSS.

## Features

- Horizontal scrollable story thumbnails
- Full-screen story viewer
- Auto-advance timer (5 seconds per story)
- Touch navigation controls
- Progress bar indicators
- Smooth transitions and animations
- Error handling and loading states

## Technical Stack

- React.js with TypeScript
- Tailwind CSS for styling
- Vitest for testing
- Lucide React for icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Usage

- Click on any story thumbnail to open the story viewer
- Tap left side to go to previous story
- Tap right side to go to next story
- Click the close button (X) to exit the story viewer

## Project Structure

- `/src/components` - React components
- `/src/types` - TypeScript type definitions
- `/src/data` - Story data
- `/src/__tests__` - Test files

## Testing

The project includes end-to-end tests covering:
- Story navigation
- Auto-advance functionality
- Touch interactions
- Component rendering