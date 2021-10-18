import React, {useRef} from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import {useContacts} from '../contexts/ContactsContext'

const NewContactModal = (props: any) => {
  const idRef = useRef<any>()
  const nameRef = useRef<any>()
  const {createContact} = useContacts()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    createContact(idRef.current.value, nameRef.current.value)
    props.closeModal()
  }
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type='text' ref={idRef} required />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required />
          </Form.Group>
          <Button type='submit' className='mt-3'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewContactModal
