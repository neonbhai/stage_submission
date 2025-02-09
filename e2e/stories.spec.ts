import { test, expect } from '@playwright/test';

test.describe('Instagram Stories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Story List View', () => {
    test('renders stories list correctly', async ({ page }) => {
      // Check if stories container exists
      await expect(page.locator('.overflow-x-auto')).toBeVisible();
      
      // Verify all story thumbnails are present (8 users in mock data)
      const thumbnails = page.locator('.flex.flex-col.items-center.space-y-1');
      await expect(thumbnails).toHaveCount(8);
    });

    test('displays correct user info in thumbnails', async ({ page }) => {
      // Check first user's info
      const firstThumbnail = page.locator('.flex.flex-col.items-center.space-y-1').first();
      await expect(firstThumbnail.locator('img')).toHaveAttribute('src', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80');
      await expect(firstThumbnail.locator('span')).toHaveText('sarah_designs');
    });

    test('shows correct ring gradient for unviewed stories', async ({ page }) => {
      // Check first story's ring (should be gradient as it's unviewed)
      const firstStoryRing = page.locator('.flex.flex-col.items-center.space-y-1').first();
      await expect(firstStoryRing.locator('.ring-gradient-to-tr')).toBeVisible();
    });

    test('supports horizontal scroll behavior', async ({ page }) => {
      const storiesList = page.locator('.overflow-x-auto');
      
      // Get initial scroll position
      const initialScrollLeft = await storiesList.evaluate(el => el.scrollLeft);
      
      // Scroll to the end
      await storiesList.evaluate(el => {
        el.scrollTo(el.scrollWidth, 0);
      });
      
      // Get final scroll position
      const finalScrollLeft = await storiesList.evaluate(el => el.scrollLeft);
      
      // Verify that scrolling occurred
      expect(finalScrollLeft).toBeGreaterThan(initialScrollLeft);
    });
  });

  test.describe('Story Viewer', () => {
    test('opens story viewer when thumbnail is clicked', async ({ page }) => {
      // Click the first story thumbnail
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Verify story viewer is visible
      await expect(page.locator('.fixed.inset-0.bg-black')).toBeVisible();
    });

    test('displays correct story content and user info', async ({ page }) => {
      // Click first story
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Check user info
      await expect(page.locator('.text-white.font-semibold')).toContainText('sarah_designs');
      
      // Check story image
      const storyImage = page.locator('.story-face.current img');
      await expect(storyImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=1080&q=80');
    });

    test('shows progress bar and advances automatically', async ({ page }) => {
      // Click first story
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Check initial progress bar
      const progressBar = page.locator('.h-0.5.bg-gray-600').first();
      await expect(progressBar.locator('.bg-white')).toBeVisible();
      
      // Wait for story to advance (5 seconds)
      await page.waitForTimeout(5500);
      
      // Verify we're on the second story
      const storyImage = page.locator('.story-face.current img');
      await expect(storyImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080&q=80');
    });
  });

  test.describe('Navigation', () => {
    test('supports tap navigation', async ({ page }) => {
      // Open story viewer
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Click right side to advance
      await page.locator('.story-face.current').click({ position: { x: 300, y: 400 } });
      
      // Verify we're on the second story
      const storyImage = page.locator('.story-face.current img');
      await expect(storyImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080&q=80');
    });

    test('handles swipe gestures', async ({ page }) => {
      // Open story viewer
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Perform swipe gesture
      await page.locator('.story-face.current').dragTo(page.locator('.story-face.current'), {
        sourcePosition: { x: 300, y: 400 },
        targetPosition: { x: 50, y: 400 },
      });
      
      // Verify we've navigated to the next user
      await expect(page.locator('.text-white.font-semibold')).toContainText('mike_travels');
    });

    test('closes viewer with close button', async ({ page }) => {
      // Open story viewer
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Click close button
      await page.locator('button').filter({ hasText: 'X' }).click();
      
      // Verify viewer is closed
      await expect(page.locator('.fixed.inset-0.bg-black')).not.toBeVisible();
    });

    test('shows transition animations', async ({ page }) => {
      // Open story viewer
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Click to advance
      await page.locator('.story-face.current').click({ position: { x: 300, y: 400 } });
      
      // Verify transition class is applied
      await expect(page.locator('.story-cube')).toHaveClass(/transition-next/);
    });

    test('navigates between different users', async ({ page }) => {
      // Open first user's story
      await page.locator('.flex.flex-col.items-center.space-y-1').first().click();
      
      // Perform swipe to next user
      await page.locator('.story-face.current').dragTo(page.locator('.story-face.current'), {
        sourcePosition: { x: 300, y: 400 },
        targetPosition: { x: 50, y: 400 },
      });
      
      // Verify second user's content
      await expect(page.locator('.text-white.font-semibold')).toContainText('mike_travels');
      
      // Perform swipe to next user
      await page.locator('.story-face.current').dragTo(page.locator('.story-face.current'), {
        sourcePosition: { x: 300, y: 400 },
        targetPosition: { x: 50, y: 400 },
      });
      
      // Verify third user's content
      await expect(page.locator('.text-white.font-semibold')).toContainText('foodie_alex');
    });
  });
});