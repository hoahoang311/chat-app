import React, {useState, useContext, useEffect} from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext(null)

export const useSocket = (): any => {
    return useContext(SocketContext)
}

export const SocketProvider = ({id, children}) => {
    const [socket, setSocket] = useState<any>()

    useEffect((): any => {
        console.log('connect')
        const newSocket = io('http://localhost:2000', {query : {id}})
        setSocket(newSocket)
        return () => newSocket.close()
    },[id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

