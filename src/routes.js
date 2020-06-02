import Home from './components/Home'
import Stocks from './components/Stocks'
import Portfolio from './components/Portfolio'

export const routes = [
    { path: '', component: Home },
    { path: '/stocks', component: Stocks },
    { path: '/portfolio', component: Portfolio }
]