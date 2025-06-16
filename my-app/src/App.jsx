import {useEffect, useState } from 'react'
import './index.css'; // ✅ MUST be first
//http://127.0.0.1:5500/client/public/server/
const API_URL = 'api/users';

function App() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setUser);
  }, []);

  const addUser = async () => {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    setName('');
    const res = await fetch(API_URL).then(res => res.json());
    setUser(res)
  }

  return(
    <>
    <div className='grid place-content-center min-h-screen'>
      <h1 className=''>Users</h1>
      <input value={name} className='placeholder:text-center border-2 border-black' onChange={e => setName(e.target.value)} />
      <button className='bg-emerald-600' onClick={addUser}>Add</button>
      <ul>
        {user.map(u => <li key={u._id}>{u.name}</li>)}
      </ul>
    </div>
    </>
  )
}

export default App