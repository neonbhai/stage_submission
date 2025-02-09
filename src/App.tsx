import React, { useState } from 'react';
import { MobileCheck } from './components/MobileCheck';
import { StoriesRow } from './components/StoriesRow';
import { PostsList } from './components/PostsList';
import { Logo } from './components/Logo';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { ExplorePage } from './components/ExplorePage';
import { CreatePage } from './components/CreatePage';
import { ActivityPage } from './components/ActivityPage';
import { ProfilePage } from './components/ProfilePage';
import storiesData from './data/stories.json';
import postsData from './data/posts.json';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Logo />
            <StoriesRow initialStoryGroups={storiesData.storyGroups} />
            <PostsList posts={postsData.posts} />
          </>
        );
      case 'explore':
        return <ExplorePage />;
      case 'create':
        return <CreatePage />;
      case 'activity':
        return <ActivityPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return null;
    }
  };

  return (
    <MobileCheck>
      <Layout>
        {renderPage()}
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      </Layout>
    </MobileCheck>
  );
}

export default App;