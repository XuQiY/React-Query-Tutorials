type CacheProps = {
    cacheTime: number,
    isLoading: boolean,
    isFetching: boolean,
    isError: boolean,
    data: any
}

type CacheListProps = {
    [key:string] : CacheProps
}

class UseQuery {
    cacheList: CacheListProps
    constructor(){
        this.cacheList = {}
    }

    public setCache(key:string,cache:CacheProps){
        this.cacheList[key] = cache
        this.setTimeOutToClear(cache.cacheTime,key)
    }


    public getCache(key:string):CacheProps{
        return this.cacheList[key]
    }

    public updateCache(key:string,cache:CacheProps){}

    private clearCache(key:string){
        delete this.cacheList[key]
    }

    private setTimeOutToClear(timeout:number,key:string){
        setTimeout(() => {
            this.clearCache(key)
        }, timeout);
    }
}

export default UseQuery