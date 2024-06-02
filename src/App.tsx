import Routing from './router/routs';
import { ChakraProvider } from '@chakra-ui/react';

import 'react-loading-skeleton/dist/skeleton.css' 
import './App.css';
// import { MainRouter } from './router/routs/main';

function App() {
  return (
    <ChakraProvider>
      <Routing />
      {/* <MainRouter /> */}
    </ChakraProvider>
    
  )
}

export default App
