import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BaseLayout from './components/layout/base';
import IndexPage from './pages';
import AboutPage from './pages/about';
import GenerateGitignore from './pages/gen_git';
import GenerateLicence from './pages/gen_license';
import PrivacyPage from './pages/privacy';
import TermsConditionPage from './pages/terms';
import WeatherCLI from './pages/weather_cli';
import DjangoInit from './pages/create_django_app';
import MERNInit from './pages/mern_initializer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<BaseLayout />}>
          <Route path={''} element={<IndexPage />} />
          <Route path={'about'} element={<AboutPage />} />
          <Route path={'terms'} element={<TermsConditionPage />} />
          <Route path={'privacy'} element={<PrivacyPage />} />
          <Route path={'generate-gitignore'} element={<GenerateGitignore />} />
          <Route path={'generate-license'} element={<GenerateLicence />} />
          <Route path={'weather-cli'} element={<WeatherCLI />} />
          <Route path={'django-initializer'} element={<DjangoInit />} />
          <Route path={'mern-initializer'} element={<MERNInit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
