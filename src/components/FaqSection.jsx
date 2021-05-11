import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

const FaqListItem = ({ item }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='flex justify-between'>
      <div>
        <h3 onClick={() => setOpen(!open)} className='cursor-pointer text-2xl xl:text-4xl font-bold'>
          { item.title }
        </h3>
        { open && (
        <p
          className='text-lg xl:text-2xl mt-8 opacity-75'
          dangerouslySetInnerHTML={{ __html: item.body }}>
        </p> )}
      </div>
      <div onClick={() => setOpen(!open)} className='text-accent-green cursor-pointer text-2xl xl:text-5xl font-bold ml-8'>
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
    { title: `What is WenRug?`, body: 'PINT’s flagship product, “Wen Rug” is a re-envisioning of the popular crash game, Moneypot; fleshed out and gamified with hot streaks, achievement badges, defi memes, bonuses, and more. While most crash games pay 50% of revenue to investors in the house pool and keep back 50% for the site owners, with PINT you are the “owners” of Wen Rug. User fees from the game are paid out to PINT stakers. Holders will be able to stake their PINT to earn a voice in the community governance process, and direct use of funds of the Community Wallet towards PINT buybacks or additional development–all the while earning revenue from Wen Rug and more.' },
    { title: `What is the long term vision?`, body: 'While WenRug is PINT’s first cashflow project, the PINT ecosystem will eventually consist of multiple projects that all work together to drive PINT demand and reward PINT stakers.' },
    { title: `What are PINT's tokenomics?`, body: 'PINT has a circulating supply of approximately 8,000,000 tokens, with 1 additional PINT being generated every block as a liquidity incentive.  New supply will be hardcapped at a max supply of 10,000,000 tokens at which point PINT will become fully deflationary.' },
  ]

  return (
    <div>
      <div className='text-center'>
        <h2 className='font-bold text-4xl xl:text-7xl leading-tight xl:leading-tight'>Frequently Asked Questions</h2>
        {/* <p className='text-4xl mt-12'> */}
        {/*   To learn more about PINT, check out the <Link to='/'><span className='text-accent-green'>FAQ page</span></Link> */}
        {/* </p> */}
      </div>

      <div className='max-w-screen-xl space-y-10 mx-auto mt-16'>
        {faqlist.map(x => <FaqListItem item={x} key={x.title} />)}
      </div>
    </div>
  )
}

