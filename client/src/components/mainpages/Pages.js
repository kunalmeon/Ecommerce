import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import CreateProduct from './createproduct/CreateProduct'
import Products from './products/Products'
import Category from './category/Category'
import ProductDetail from './productdetail/ProductDetail'
import Payment from './payment/Payment'
import NotFound from '../../components/utils/notfound/NotFound'



function Pages() {
    
    return (
        <Switch>
            <Route  path='/register' exact component={Register}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/' exact component={Products}></Route>
            <Route path='/cart' exact component={Cart}></Route>
            <Route path='/categories' exact component={Category}></Route>
            <Route path='/create_product' exact component={CreateProduct}></Route>
            <Route path='/edit_product/:id' exact component={CreateProduct}></Route>
            <Route path='/payment' exact component={Payment}></Route>

            <Route path="/detail/:id" exact component={ProductDetail}></Route>
            <Route path='*' exact component={NotFound}/>


        </Switch>
    )
}

export default Pages
