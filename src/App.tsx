import { observer } from 'mobx-react';
import LeftTemplate from './Components/LeftTemplate';
import RightTemplate from './Components/RightTemplate';

const App = observer(() => {
  return (
    <div>
      <LeftTemplate></LeftTemplate>
      <RightTemplate></RightTemplate>
    </div>
  )
});


export default App;
