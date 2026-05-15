import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout.jsx';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { StatesPage } from './pages/StatesPage/StatesPage.jsx';
import { StateDetailsPage } from './pages/StateDetailsPage/StateDetailsPage.jsx';
import { GovernmentPage } from './pages/GovernmentPage/GovernmentPage.jsx';
import { GovernmentLeaderPage } from './pages/GovernmentLeaderPage/GovernmentLeaderPage.jsx';
import { AboutPage } from './pages/AboutPage/AboutPage.jsx';
import { HistoryErasPage } from './pages/HistoryErasPage/HistoryErasPage.jsx';
import { ExChiefMinistersPage } from './pages/ExChiefMinistersPage/ExChiefMinistersPage.jsx';
import { EconomyPage } from './pages/EconomyPage/EconomyPage.jsx';
import { EconomyIndiaPage } from './pages/EconomyIndiaPage/EconomyIndiaPage.jsx';
import { EconomyStateDetailsPage } from './pages/EconomyStateDetailsPage/EconomyStateDetailsPage.jsx';
import { CulturePage } from './pages/CulturePage/CulturePage.jsx';
import { CultureStateDetailsPage } from './pages/CulturePage/CultureStateDetailsPage.jsx';
import { TourismPage } from './pages/TourismPage/TourismPage.jsx';


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/culture" element={<CulturePage />} />
        <Route
          path="/culture/state/:stateSlug"
          element={<CultureStateDetailsPage />}
        />

        <Route path="/economy" element={<EconomyPage />} />
        <Route path="/economy/india" element={<EconomyIndiaPage />} />
        <Route path="/economy/state/:stateName" element={<EconomyStateDetailsPage />} />

        <Route path="/states" element={<StatesPage />} />
        <Route path="/states/:stateSlug" element={<StateDetailsPage />} />


        <Route path="/government" element={<GovernmentPage />} />
        <Route
          path="/government/:leaderSlug"
          element={<GovernmentLeaderPage />}
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/history-eras" element={<HistoryErasPage />} />

        <Route path="/tourism" element={<TourismPage />} />

        <Route
          path="/state/:stateSlug/ex-chief-ministers"
          element={<ExChiefMinistersPage />}
        />


        <Route
          path="*"
          element={
            <div style={{ padding: 24, textAlign: 'center' }}>
              <h1 style={{ marginBottom: 8 }}>Page not found</h1>
              <p style={{ margin: 0, opacity: 0.8 }}>
                The page you requested does not exist.
              </p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}


