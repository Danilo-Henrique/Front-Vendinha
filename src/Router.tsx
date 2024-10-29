import {Routes, Route} from "react-router-dom"
import { CadNome } from "./pages/CadNome"
import { ListAllUser } from "./pages/ListAllUser"

export function Router() {

    return(

        <Routes>
            <Route path="/" element = {<CadNome/>}/>
            <Route path="/atualizar" element = {<ListAllUser/>}/>
            
        </Routes>
    )
    
}