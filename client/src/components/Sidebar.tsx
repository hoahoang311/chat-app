import React, {useState} from 'react'
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'

const KEY_CONVERSATIONS = 'conversations'
const KEY_CONTACTS = 'contacts'

const Sidebar = ({id}: {id: any}) => {
  const [activeKey, setActiveKey] = useState<any>(KEY_CONVERSATIONS)
  const [modalOpen, setModalOpen] = useState<any>(false)
  const conversationsOpen = activeKey === KEY_CONVERSATIONS

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div style={{width: '250px'}} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={KEY_CONVERSATIONS}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={KEY_CONTACTS}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='overflow-auto flex-grow-1 border'>
          <Tab.Pane eventKey={KEY_CONVERSATIONS}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={KEY_CONTACTS}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top border-right small'>
          Your Id: <span className='text-muted'>{id}</span>
        </div>
        <Button className='rounded-0' onClick={() => setModalOpen(true)}>
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  )
}

export default Sidebar
