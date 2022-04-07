import {useQuery} from '../hooks/useQuery'
import axios from 'axios'
import { useState } from 'react'

export const RQSuperHeroesPage = () => {
  const [state,setState] = useState(true)
  const {isLoading,data=[]} = useQuery('hero',()=>axios.get('http://localhost:4000/superheroes'),{refetchOnWindowFocus:state,retry:3})
  // console.log("🚀 ~ file: RQSuperHeroes.page.js ~ line 6 ~ RQSuperHeroesPage ~ data", data)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map(hero => {
        return <div>{hero.name}</div>
      })}
      <button onClick={()=>setState(!state)}>remove</button>
    </>
  )
}
