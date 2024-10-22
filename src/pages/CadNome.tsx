import { FormEvent, useState } from "react" 

export function CadNome() {

    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnpj, setCNPJ] = useState("")


   async function handleFormSubmit(e:FormEvent){
        e.preventDefault()
        const data = {
            name,
            email,
            password,
            cnpj
        }
        
       await fetch('http://localhost:8081/api/users', {
            method:'POST',
            headers:{
                'content-type' : 'Application/JSON',
            },
            body: JSON.stringify(data)
            
        })
        .then ( res => res.json())
        .then(data => console.log(data))



    }
    

    return (
        <div className="container">
            <form>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)}/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>CNPJ:</label>
                    <input type="text" value={cnpj} onChange={(e) => setCNPJ(e.target.value)}/>
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button onClick={handleFormSubmit}>Enviar</button>
                </div>
            </form>
        </div>
    )
}