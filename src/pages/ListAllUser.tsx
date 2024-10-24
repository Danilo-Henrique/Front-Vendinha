import { FormEvent, useEffect, useState } from "react";

export function ListAllUser(){

    const [name, setname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnpj, setCNPJ] = useState("")
    const [id, setID] = useState("")
    const [idk, setIDK] =useState(true)


   async function handleFormSubmit(e:FormEvent){
        e.preventDefault()
        const data_update = {
            name,
            email,
            password,
            cnpj,
            id
        }
        
       await fetch(`http://localhost:8081/api/users/${id}`, {
            method:'PUT',
            headers:{
                'content-type' : 'Application/JSON',
            },
            body: JSON.stringify(data_update)
            
        })
        .then ( res => res.json())
        .then(data_update => console.log(data_update))


   }
   
    const [data, setData] = useState([])
    useEffect(() =>{
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8081/api/users/listAll',{
                    method: 'GET',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                })
                console.log(res)
                if (res.ok == false){
                    throw new Error("erro")
                } 

                const data = await res.json();
                
                setData(data)
            } catch(error){
                console.error("Error fetching data:", error);
            }
        }
        fetchData()
    }, [idk])

    return (
        <div>
            <form>
                <div>
                    <label>ID:</label>
                    <input type="number" value={id} onChange={(e) => setID(e.target.value)}/>
                </div>
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
        <div>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CNPJ</th>
                <th>Ativo?</th>
            </tr>
            </thead>
            <tbody>
                {data.map((i, index)=>(
                    <tr key={index}>
                        <td>{i.user_id}</td>
                        <td>{i.name}</td>
                        <td>{i.email}</td>
                        <td>{i.cnpj}</td>
                        <td>{i.is_active}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        <button onClick={e => setIDK(true)}>Atualizar</button>
        </div>

        
    )
   }
