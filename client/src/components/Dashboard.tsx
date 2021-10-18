import React from 'react'
import {useConversations} from '../contexts/ConversationsContext'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

function Dashboard (props: any) {
  const {selectedConversation} = useConversations()
  return (
    <div className='d-flex' style={{height: '100vh'}}>
      <Sidebar id={props.id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}

export default Dashboard
