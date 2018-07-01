import asyncComponent from '../../components/AsyncComponent'
const ContentManager = asyncComponent(() => import('./ContentManager'))
const NavigationManager = asyncComponent(() => import('./NavigationManager'))
const NotFound = asyncComponent(() => import('../NotFound'))
const Profile = asyncComponent(() => import('./ProfilePage'))

const routes = [
  { title: 'Profiili', path: '/intra/profile', component: Profile, active: true },
  { title: 'Ilmo', path: '/intra/enroll', component: NotFound, active: false },
  { title: 'Käyttäjät', path: '/intra/accounts', component: NotFound, active: false },
  {
    title: 'CMS',
    path: '/intra/cms',
    component: null,
    active: false,
    routes: [
      { title: 'Sivut', path: '/intra/cms/content', component: ContentManager, active: true },
      { title: 'Navigointi', path: '/intra/cms/navigation', component: NavigationManager, active: true },
      { title: 'Sponsorit', path: '/intra/cms/sponsors', component: null, active: false }
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
  { title: 'MordorMarket', path: '/intra/market', component: NotFound, active: false },
  { title: 'Palaute', path: '/intra/feedback', component: NotFound, active: false }

]

export default routes
