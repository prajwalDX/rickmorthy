import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Search(query, page) {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [chara, setChara] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setChara([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/character',
      params: { name: query, page },
      cancelToken: new axios.CancelToken(c => {
        cancel = c
        setLoading(false)})
    }).then(res => {
      setChara(prev => {
        return [... new Set([...prev, ...res.data.results])]
      })
      setHasMore(res.data.results.length > 0 )
      setLoading(false)
    }).catch(e => {
        if (axios.isCancel(e)) {
          return setError(true)
        }
    })  
    return () => {
      cancel()
    }
  }, [query, page])

  return { loading, error, chara, hasMore }
}