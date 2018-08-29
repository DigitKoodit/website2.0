import asyncComponent from '../../components/AsyncComponent'
const ContentManager = asyncComponent(() => import('./ContentManager'))
const IntraPage = asyncComponent(() => import('./IntraPage'))
const NavigationManager = asyncComponent(() => import('./NavigationManager'))
const NotFound = asyncComponent(() => import('../NotFound'))
const Profile = asyncComponent(() => import('./ProfilePage'))
const SponsorManager = asyncComponent(() => import('./SponsorManager'))
const AccountManager = asyncComponent(() => import('./AccountManager'))

const routes = [
  { title: 'Intra', path: '/intra', component: IntraPage, active: true, exact: true },
  { title: 'Profiili', path: '/intra/profile', component: Profile, active: true },
  { title: 'Ilmo', path: '/intra/enroll', component: NotFound, active: false },
  { title: 'Käyttäjät', path: '/intra/accounts', component: AccountManager, active: true },
  {
    title: 'CMS',
    path: '/intra/cms',
    component: null,
    active: false,
    routes: [
      { title: 'Navigointi', path: '/intra/cms/navigation', component: NavigationManager, active: true },
      { title: 'Sivut', path: '/intra/cms/content', component: ContentManager, active: true },
      { title: 'Yhteistyökumppanit', path: '/intra/cms/sponsors', component: SponsorManager, active: true }
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
