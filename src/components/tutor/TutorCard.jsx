import React from 'react'
import PrimaryOutlineBtn from '../../utils/buttons/PrimaryOutlineBtn'

function TutorCard({tutor}) {
  return (
    <div className='flex flex-col items-center rounded-lg bg-base-100 p-6 text-center shadow-lg hover:shadow-xl transition-all border-1 border-primary border-base-300 dark:border-none'>
        <img
            alt={`Profile of ${tutor.displayName}`}
            className="h-27 w-27 rounded-full object-cover ring-4 ring-secondary/20"
            src={tutor.photoURL}
        />
        <p className="mt-4 text-lg font-bold text-base-content">{tutor.displayName}</p>
        <p className="mt-2 text-sm text-base-content/70">{tutor.email}</p>
        <p className="my-2 text-sm text-base-content/70">{tutor.district || 'not added'}</p>
        <PrimaryOutlineBtn value="See Profile" url={`/tutors/${tutor._id}`}/>
    </div>
  )
}

export default TutorCard