import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

const FaqListItem = ({ item }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex justify-between'>
      <div>
        <h3 onClick={() => setOpen(!open)} className='text-2xl font-bold cursor-pointer xl:text-4xl'>
          { item.title }
        </h3>
        { open && (
        <p
          className='mt-8 text-lg opacity-75 xl:text-2xl'
          dangerouslySetInnerHTML={{ __html: item.body }}>
        </p> )}
      </div>
      <div onClick={() => setOpen(!open)} className='ml-8 text-2xl font-bold cursor-pointer text-accent-green xl:text-5xl'>
        <span>{!open ? '+' : '-'}</span>
      </div>
    </div>
  )
}

export const FaqSection = () => {
  const faqlist = [
    { title: `What is PINT?`, body: 'PINT is a governance token for the Pub.Finance ecosystem. Owning and staking PINT gives you a voice in the future development of the project and spending of the community warchest. Pub.finance’s vision is to create an ecosystem of products that drive value for token holders.' },
    { title: `How can I contribute?`, body: 'Pint is a community-driven project. The original founders wanted a project that was driven by a strong community presence.  Therefore, any changes or additions to the team must be passed by a governance vote from the community. Join the <a class="opacity-100 font-bold underline" href="https://t.me/PubFin" target="_blank" rel="noreferrer">community</a> and get involved!' },
    { title: `Who is the team behind PINT?`, body: 'The PINT developers are a worldwide team of anonymous cryptocurrency and DeFi enthusiasts. Through the decentralized <a class="opacity-100 font-bold underline" href="https://snapshot.org/#/pub-finance.eth" target="_blank" rel="noreferrer">Governance Portal</a>, the whole community is now involved in the future direction of PINT.' },
    { title: `What is WenRug?`, body: 'PINT’s flagship product, <a class="text-accent-green" href="https://beta.wenrug.com" target="_blank" rel="noreferrer">“WenRug”</a> is a re-envisioning of the popular crash game, Moneypot; fleshed out and gamified with hot streaks, achievement badges, defi memes, bonuses, and more. While most crash games pay 50% of revenue to investors in the house pool and keep back 50% for the site owners, with PINT you are the “owners” of WenRug. User fees from the game are paid out to PINT stakers. Holders will be able to stake their PINT to earn a voice in the community governance process, and direct use of funds of the Community Wallet towards PINT buybacks or additional development–all the while earning revenue from WenRug and more.' },
    { title: `What is the long term vision?`, body: 'While WenRug is PINT’s first cashflow project, the PINT ecosystem will eventually consist of multiple projects that all work together to drive PINT demand and reward PINT stakers.' },
    { title: `What are PINT's tokenomics?`, body: 'PINT has a circulating supply of approximately 8,000,000 tokens, with 1 additional PINT being generated every block as a liquidity incentive.  New supply will be hardcapped at a max supply of 10,000,000 tokens at which point PINT will become fully deflationary.' },
  ]

  return (
    <div>
      <div className='text-center'>
        <h2 className='text-4xl font-bold leading-tight xl:text-7xl xl:leading-tight'>Frequently Asked Questions</h2>
        {/* <p className='mt-12 text-4xl'> */}
        {/*   To learn more about PINT, check out the <Link to='/'><span className='text-accent-green'>FAQ page</span></Link> */}
        {/* </p> */}
      </div>

      <div className='mx-auto mt-16 max-w-screen-xl space-y-10'>
        {faqlist.map(x => <FaqListItem item={x} key={x.title} />)}
      </div>
    </div>
  )
}

