import tryTable from './components/tryTable'
import Id from './components/Id'
import Card from './components/Card'
import Card_detail from './components/Card_detail'
export const routes = [
    {
        path: '',
        
    },
    {
        path: '/users/',
        component: tryTable,
        children: [
            {
                path: ':id',
                component: Id
            }
        ]
    },
    {
        path: '/users-card/',
        component: Card,
        children: [
            {
                path: ':id',
                component: Card_detail
            }
        ]
    }
    

]