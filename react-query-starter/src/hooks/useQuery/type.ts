import Query from './query'

declare global {
    interface Window {
        _query_: Query;
    }
}

export type CacheProps = {
    cacheTime: number,
    // isLoading: boolean,
    // isFetching: boolean,
    // isError: boolean,
    data: any
    timer?: number 
}

export type CacheListProps = {
    [key:string] : CacheProps
}



