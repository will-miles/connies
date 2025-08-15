import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-timberwolf text-center p-4 text-black_olive flex flex-col'>
      <span>
        &copy; {new Date().getFullYear()} connies.in All rights reserved.
      </span>
      <span className='mt-2 text-sm'>
        <a
          href='https://www.flaticon.com/free-icons/climbing'
          title='climbing icons'
        >
          Climbing icons created by Culmbio - Flaticon
        </a>
      </span>
    </footer>
  );
};

export default Footer;
