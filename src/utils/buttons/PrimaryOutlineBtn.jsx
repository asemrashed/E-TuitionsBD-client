import React from 'react'
import { Link } from 'react-router-dom'

function PrimaryOutlineBtn({value, url}) {
  return (
    <Link to={url} className="btn btn-outline hover:bg-primary hover:text-primary-content btn-xs md:btn-sm">
        {value}
    </Link>
  )
}

export default PrimaryOutlineBtn