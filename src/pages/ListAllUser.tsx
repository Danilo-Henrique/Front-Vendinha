
export function ListAllUser(){

    async function listAll(){
        const data = 
        await fetch('http://localhost:8081/api/users', {
            method:'POST',
            headers:{
                'content-type' : 'Application/JSON',
            },
            body: JSON.stringify(data)
            
        })
        .then ( res => res.json())
        .then(data => (data))
    }

    return (
        <button></button>
    )


}