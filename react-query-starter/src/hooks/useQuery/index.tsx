import { useEffect, useRef, useState } from 'react'
import Query from './query'
// import{CacheProps} from './type'

const query = new Query()
window._query_ = query

type Options = {
  cacheTime?: number
  refetchOnWindowFocus?: boolean
  retry?: number
  retryTime?:number
}

// export type useQuery<T> = (key:string,func: Promise<T>,options:Options)=>CacheProps

// const DEFAULT_CACHE_TIME = 5*60*1000
const DEFAULT_CACHE_TIME = 20 * 1000
const RETRY_DELAY = 3*1000

export const useQuery = (
  key: string,
  func: () => Promise<any>,
  options: Options
) => {
  const [isLoading, setIsLoading] = useState(!!!query.getCache(key))
  const [isError, setIsError] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState()
  const retryRef = useRef(0)
  // const useMemo()
  useEffect(() => {
    fetchDataFromCache(key)
    onFocus2Fetch(key)
  }, [])

  useEffect(()=>{
    console.log("🚀 ~ file: index.tsx ~ line 35 ~ useEffect ~ options", options)
    if(options?.refetchOnWindowFocus){
        onFocus2Fetch(key)
    }else{
        query.focusHandle.hasSubscribe(key) && query.focusHandle.removeSubscribe(key)
    }
  },[options.refetchOnWindowFocus])

  const fetchDataFromServe = async (key: string) => {
    setIsFetching(true)
    try {
      const { data } = await func()
      setIsLoading(false)
      setIsFetching(false)
      setData(data)
      query.setCache(key, {
        data,
        ...options,
        cacheTime: options?.cacheTime || DEFAULT_CACHE_TIME,
      })
      retryRef.current = 0
    } catch (error) {
        if(options.retry&&options.retry > retryRef.current){
            setTimeout(() => {
                fetchDataFromServe(key)
                retryRef.current += 1
            },options.retryTime || RETRY_DELAY);
        }
      console.log(
        '🚀 ~ file: index.tsx ~ line 39 ~ fetchDataFromServe ~ error',
        error
      )
      setIsError(true)
    }
  }

  const fetchDataFromCache = (key: string) => {
    const cache = query.getCache(key)
    if (cache) {
      setData(cache.data)
      fetchDataFromServe(key)
    } else {
      setIsLoading(true)
      fetchDataFromServe(key)
    }
  }

  const onFocus2Fetch = (key:string) => {
    query.focusHandle.addSubscribe(key,()=>fetchDataFromCache(key))
  }

  return { isLoading, isError, isFetching, data }
}
