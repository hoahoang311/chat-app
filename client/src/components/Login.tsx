import React, {useRef} from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'

const Login = (props: any) => {
  const idRef = useRef<any>()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    props.onIdSubmit(idRef.current.value)
  }

  const createNewId = () => {
    props.onIdSubmit(uuidv4())
  }
  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
      <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group className='mb-3'>
          <Form.Label>Enter your Id</Form.Label>
          <Form.Control type='text' ref={idRef} required />
        </Form.Group>
        <Button type='submit' className='mr-2'>
          Login
        </Button>
        <Button onClick={createNewId} variant='secondary'>
          Create A New Id
        </Button>
      </Form>
    </Container>
  )
}

export default Login
