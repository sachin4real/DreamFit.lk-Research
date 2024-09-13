import React from 'react'
import { Footer  } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook , BsInstagram , BsGithub, BsLinkedin, BsYoutube, BsTiktok, BsTwitter} from 'react-icons/bs'


export default function Footercom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto'>
      <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
        <div className='mt-5'>
        <Link
      to="/"
      className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
    >
      <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white">
      DreamFit
      </span>
      .LK
      {/* spm */}
    </Link>
        </div>
        <div className='grid grid-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6'>
      <div>
      <Footer.Title title='About'/>
          <Footer.LinkGroup col>
            <Footer.Link
              href='https://www.DreamFit.lk'
              target='_blank'
              rel='noopener noreferrer'
            >
             DreamFit.Lk
            </Footer.Link>
            <Footer.Link
              href='/about'
              target='_blank'
              rel='noopener noreferrer'
            >
              DreamFit.LK
            </Footer.Link>
          </Footer.LinkGroup>
      </div>
      <div>
      <Footer.Title title='Follow us'/>
          <Footer.LinkGroup col>
            <Footer.Link
              href='https:DreamFit.lk'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </Footer.Link>
            <Footer.Link
              href='#'
              target='_blank'
              rel='noopener noreferrer'
            >
              FaceBook
            </Footer.Link>
          </Footer.LinkGroup>
      </div>
      <div>
      <Footer.Title title='Legal'/>
          <Footer.LinkGroup col>
            <Footer.Link
              href='#'
            >
              Privacy Policy
            </Footer.Link>
            <Footer.Link
              href='#'
             
            >
              Terms and Conditions
            </Footer.Link>
          </Footer.LinkGroup>
      </div>
        </div>
      </div>
      <Footer.Divider />
      <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright 
          href='#'
          by="DreamFit.LK" 
          year={new Date().getFullYear()} />
          <div className='flex gap-6  sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsYoutube} />
            <Footer.Icon href='#' icon={BsTiktok} />
            <Footer.Icon href='#' icon={BsTwitter} />
            
          </div>
      </div>
    </div>
  </Footer>
  )
}
