import { FormEvent, useEffect, useState } from "react";
import './ListAllUser.css'

interface userData {
  name: string
  email: string
  password: string
  cnpj: string
  user_id: number
  is_active: boolean
}

export function ListAllUser() {

  const [name, setname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cnpj, setCNPJ] = useState("")
  const [id, setID] = useState("")
  const [idk, setIDK] = useState(true) 

  const [isEditingUser, setIsEditingUser] = useState(false)


  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    const data_update = {
      name,
      email,
      password,
      cnpj,
      id
    }

    await fetch(`http://localhost:8081/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'Application/JSON',
      },
      body: JSON.stringify(data_update)

    })
      .then(res => res.json())
      .then(data_update => console.log(data_update))


  }

  async function updateUser(id: Number) {

    setIsEditingUser(true)
    console.log(id)

    try {
      await fetch(`http://localhost:8081/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json()).then(data => {
        const {user_id, name, email, password, cnpj } = data
          setID(user_id)
          setname(name)
          setEmail(email)
          setPassword(password)
          setCNPJ(cnpj)
      })

      // setUser(editUser)

    } catch (error) {
      console.error("Error fetching data:", error);
      setIsEditingUser(true)
    }
  }
    

    //nome

    

  const [data, setData] = useState<userData[]>()

  const fetchData = async () => {

    try {
      const res = await fetch('http://localhost:8081/api/users/listAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      console.log(res)
      if (res.ok == false) {
        throw new Error("erro")
      }

      const data = await res.json();

      setData(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [idk])

  return (
    <>
      {
        isEditingUser ? (
          <div>
            <h1> Atualizar Usuario </h1>
            <form>
              <div>
                <label>ID:</label>
                <input type="number" value={id} onChange={(e) => setID(e.target.value)} />
              </div>
              <div>
                <label>Nome:</label>
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
              </div>
              <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label>CNPJ:</label>
                <input type="text" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} />
              </div>
              <div>
                <label>Senha:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <button onClick={handleFormSubmit}>Enviar</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1> Lista de Usuarios </h1>
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

                {
                  data && data.map((i, index) => (
                    <tr key={index}>
                      <td>{i.user_id}</td>
                      <td>{i.name}</td>
                      <td>{i.email}</td>
                      <td>{i.cnpj}</td>
                      <td>{i.is_active ? 'ativo' : 'inativo'}</td>
                      <td><button onClick={() => updateUser(i.user_id)}>Editar</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <button onClick={() => setIDK(!idk)}>Atualizar</button>
          </div>
        )
      }


    </>
  )
}
