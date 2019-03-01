import React from 'react'
const ContentManager = React.lazy(() => import('./ContentManager'))
const IntraPage = React.lazy(() => import('./IntraPage'))
const NavigationManager = React.lazy(() => import('./NavigationManager'))
const NotFound = React.lazy(() => import('../NotFound'))
const Profile = React.lazy(() => import('./ProfilePage'))
const SponsorManager = React.lazy(() => import('./SponsorManager'))
const AccountManager = React.lazy(() => import('./AccountManager'))
const EventManager = React.lazy(() => import('./EventManager'))
const FileManager = React.lazy(() => import('./FileManager'))

const routes = [
  { title: 'Intra', path: '/intra', component: IntraPage, active: true, exact: true },
  { title: 'Profiili', path: '/intra/profile', component: Profile, active: true },
  { title: 'Ilmo', path: '/intra/events', component: EventManager, active: true },
  { title: 'Käyttäjät', path: '/intra/accounts', component: AccountManager, active: true },
  {
    title: 'CMS',
    path: '/intra/cms',
    component: null,
    active: false,
    routes: [
      { title: 'Navigointi', path: '/intra/cms/navigation', component: NavigationManager, active: true },
      { title: 'Sivut', path: '/intra/cms/content', component: ContentManager, active: true },
      { title: 'Yhteistyökumppanit', path: '/intra/cms/sponsors', component: SponsorManager, active: true },
      { title: 'Tiedostot', path: '/intra/cms/files', component: FileManager, active: true }
    ]
  },
  {
    title: 'Jäsenrekisteri',
    path: '/intra/registry',
    component: null,
    active: false,
    routes: [
      { title: 'Hallitus', path: '/intra/registry/board', component: null, active: false },
      { title: 'Toimihenkilöt', path: '/intra/registry/officials', component: null, active: false }
    ]
  },
  { title: 'Palaute', path: '/intra/feedback', component: NotFound, active: false }

]

export default routes
