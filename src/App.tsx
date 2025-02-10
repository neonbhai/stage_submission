import React, { useState } from 'react';
import { MobileCheck } from './components/MobileCheck';
import { HomePage } from './components/HomePage';
import { ExplorePage } from './components/ExplorePage';
import { CreatePage } from './components/CreatePage';
import { ActivityPage } from './components/ActivityPage';
import { ProfilePage } from './components/ProfilePage';
import { Layout } from './components/Layout';
import { BottomNavigationBar } from './components/BottomNavigationBar';
import storiesData from './data/stories.json';
import postsData from './data/posts.json';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage storyGroups={storiesData.storyGroups} posts={postsData.posts} />;
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
        <BottomNavigationBar currentPage={currentPage} onNavigate={setCurrentPage} />
      </Layout>
    </MobileCheck>
  );
}

export default App;