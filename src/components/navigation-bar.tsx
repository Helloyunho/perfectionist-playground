import { SiGithub } from '@icons-pack/react-simple-icons'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export const NavBar = () => {
  return (
    <nav className='flex justify-center items-center py-4 px-4 sm:px-6 lg:px-8'>
      <h4 className='text-xl font-semibold'>Perfectionist Playgrounds</h4>
      <div className='ml-auto flex gap-4'>
        <ModeToggle />
        <Button asChild variant='outline' size='icon'>
          <a href='https://github.com/Helloyunho/perfectionist-playgrounds'>
            <SiGithub className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Check GitHub</span>
          </a>
        </Button>
      </div>
    </nav>
  )
}
