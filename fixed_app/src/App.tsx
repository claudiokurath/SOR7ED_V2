import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Landing from './pages/Landing';
import Lab from './pages/Lab';
import BlogPost from './pages/BlogPost';

// Scroll to top on route change
const ScrollToTop = () => {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/lab" component={Lab} />
        <Route path="/lab/:slug" component={BlogPost} />

        {/* 404 Fallback to Landing for now */}
        <Route>
          {() => <Landing />}
        </Route>
      </Switch>
    </>
  );
};

export default App;
