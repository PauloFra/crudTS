import React from 'react'
import { useParams } from 'react-router-dom'

function EditaEndereco() {
    const {idEndereco} = useParams()
    
  return (
    <div>EditaEndereco</div>
  )
}

export default EditaEndereco