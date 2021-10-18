import React, {useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext<any>(null)

export const useContacts = () => {
  return useContext(ContactsContext)
}

export const ContactsProvider = ({children}) => {
  const [contacts, setContacts] = useLocalStorage('contacts', [])

  const createContact = (id: any, name: any) => {
    setContacts((prevContacts) => {
      return [...prevContacts, {id, name}]
    })
  }
  return (
    <div>
      <ContactsContext.Provider value={{contacts, createContact}}>
        {children}
      </ContactsContext.Provider>
    </div>
  )
}
