import React, {useContext, useState, useEffect, useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {useContacts} from './ContactsContext'
import { useSocket } from './SocketContext'

const ConversationsContext = React.createContext<any>(null)

export const useConversations = () => {
  return useContext(ConversationsContext)
}

export const ConversationsProvider = ({id, children}) => {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const {contacts} = useContacts()
  const [selectedConversationIndex, setSelectedConversationIndex] = useState<
    number
  >(0)
  const socket = useSocket()

  const createConversation = (recipients: any) => {
    setConversations((prevConversations) => {
      return [...prevConversations, {recipients, messages: []}]
    })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return {id: recipient, name}
    })

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender
      })

      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return {...message, senderName: name, fromMe}
    })

    const selected = index === selectedConversationIndex
    return {...conversations, messages, recipients, selected}
  })

  const addMessageToConversation = useCallback(({recipients, text, sender}) => {
    setConversations((prev) => {
      let madeChange = false
      const newMessage = {sender, text}
      const newConversations = prev.map((conversation) => {
  
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          }
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [...prev, {recipients, messages: [newMessage]}]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket === null) return
    
    socket?.on('receive-message', addMessageToConversation)

    return () => socket?.off('receive-message')
  }, [socket, addMessageToConversation])

  const sendMessage = (recipients, text) => {
    socket?.emit('send-message', {recipients, text})
    addMessageToConversation({recipients, text, sender: id})
  }

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  }

  return (
    <div>
      <ConversationsContext.Provider value={value}>
        {children}
      </ConversationsContext.Provider>
    </div>
  )
}

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}
