import {motion} from 'motion/react';
import Image from 'next/image';
function HighlightedLink({name, img=""} : {name: string, img?: string}) {
  return (
    <motion.span className='inline-flex font-bold gap-1 items-center md:text-sm bg-black/5 dark:bg-white/15 border hover:bg-orange-300/50 border-dashed border-[--secondary-text]/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-[--text-color]'>
        <Image alt="img" src={img } className="" width={16} height={16} />{name}
    </motion.span>
  )
}

export default HighlightedLink;