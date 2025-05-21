
import {Route,Routes} from "react-router-dom"
import { Home } from "../home/home"

import { RealEstate } from "../realEstate/realEstate"
import { CustomerRegister } from "../CustomerRegister/CustomerRegister"
import { Investor } from "../investor/investor"
import { Manager } from "../manager/manager"
import { Investee } from "../investee/investee"
import { InvesteeRegister } from "../investee/investeeRegister"
import { PersonalDetails } from "../personalDetails/personalDetails"
import { Request } from "../investor/request"
import { Information } from "../information/information"
import { Investments } from "../investments/investments"
import { AddInvestment } from "../investee/AddInvestment"

export const Routing=()=>{
    return <div>

<Routes>
<Route path={''} element={<Home/>}></Route>

<Route path={'/home'} element={<Home/>}></Route>

<Route path={'/realEstate'} element={<RealEstate/>}></Route>
<Route path={'/customerRegister'} element={<CustomerRegister/>}></Route>
<Route path={'/investor'} element={<Investor/>}></Route>
<Route path={'/investee'} element={<Investee/>}></Route>
<Route path={'/realEstate'} element={<RealEstate/>}></Route>
<Route path={'/manager'} element={<Manager/>}></Route>
<Route path={'/investee/investeeRegister'} element={<InvesteeRegister/>}></Route>
<Route path={'investeeRegister'} element={<InvesteeRegister/>}></Route>
{/* <Route path={'AddInvestment/investeeRegister'} element={<InvesteeRegister/>}></Route> */}
<Route path={'/personalDetails'} element={<PersonalDetails/>}></Route>
<Route path={'/request'} element={<Request/>}></Route>
<Route path={'/information'} element={<Information/>}></Route>
<Route path={'/investments'} element={<Investments/>}></Route>
<Route path={'/AddInvestment'} element={<AddInvestment/>}></Route>







</Routes>


    </div>
}