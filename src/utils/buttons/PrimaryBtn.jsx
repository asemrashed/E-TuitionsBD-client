import React from 'react'
import { Link } from 'react-router-dom'

function PrimaryBtn({value, url}) {
  return (
    <Link to={url} className="btn btn-primary hover:btn-secondary btn-sm md:btn-md">
        {value}
    </Link>
  )
}

export default PrimaryBtn