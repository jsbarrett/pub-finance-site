import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

const FaqListItem = ({ item }) => {
  const [open, setOpen] = useState(false)

  return (
    <div onClick={() => setOpen(!open)} className='flex justify-between cursor-pointer'>
      <div>
        <h3 className='text-5xl font-bold'>{ item.title }</h3>
        <p className='text-3xl mt-8'>
          { open && item.body }
        </p>
      </div>
      <div className='text-accent-green text-5xl font-bold ml-8'>
        <span>{!open ? '+' : '-'}</span>
      </div>
    </div>
  )
}

export const FaqSection = () => {
  const faqlist = [
    { title: 'What is PINT?', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' },
    { title: 'How to stake?', body: '' },
    { title: 'Is PINT a stable coin?', body: '' },
    { title: 'Where can I purchase PINT?', body: '' },
    { title: 'What is a coin?', body: '' },
  ]

  return (
    <section className='max-w-screen-2xl mx-auto my-36 px-12'>
      <div className='text-center'>
        <h2 className='font-bold text-7xl leading-tight'>Frequently Asked Questions</h2>
        {/* <p className='text-4xl mt-12'> */}
        {/*   To learn more about PINT, check out the <Link to='/'><span className='text-accent-green'>FAQ page</span></Link> */}
        {/* </p> */}
      </div>

      <div className='max-w-screen-xl space-y-10 mx-auto mt-16'>
        {faqlist.map(x => <FaqListItem item={x} key={x.title} />)}
      </div>
    </section>
  )
}

