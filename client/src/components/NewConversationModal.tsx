import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsContext'
import {useConversations} from '../contexts/ConversationsContext'

const NewConversationModal = (props: any) => {
  const [selectedContactIds, setSelectedContactIds] = useState<any>([])
  const {contacts} = useContacts()
  const {createConversation} = useConversations()

  const handleSubmit = (e) => {
    e.preventDefault()

    createConversation(selectedContactIds)
    props.closeModal()
  }

  const handleCheckboxChange = (contactId) => {
    setSelectedContactIds((prev) => {
      if (prev.includes(contactId)) {
        return prev.filter((prevId) => {
          return contactId !== prevId
        })
      } else {
        return [...prev, contactId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type='submit' className='mt-3'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewConversationModal
