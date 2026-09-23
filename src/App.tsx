import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { VFarm } from './pages/VFarm';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

/** Every route renders inside the same layout, so navigation swaps only the page. */
export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/vfarm"
        element={
          <Layout>
            <VFarm />
          </Layout>
        }
      />
      {/* /team is now a section of Home. Old links land there. */}
      <Route path="/team/*" element={<Navigate to={{ pathname: '/', hash: '#team' }} replace />} />
      <Route
        path="/privacy"
        element={
          <Layout>
            <Privacy />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout notFound>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}
