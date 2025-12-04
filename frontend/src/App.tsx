import Button from './components/ui/Buttons'
import PlusIcon from './components/ui/icons/PlusIcon'

const App = () => {
  return (
    <>
   <Button variant='primary' text='first' size='sm' onclick={()=>{}} startIcon={<PlusIcon size='md'/>}/>
   <Button variant='secondary' text='second' size='md' onclick={()=>{}}/>
    </>
  )
}

export default App
