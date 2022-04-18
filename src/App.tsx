import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import { ReactChild, ReactFragment, ReactPortal, useEffect, useRef, useState } from 'react';
import LeftTemplate from './Components/LeftTemplate';
import RightTemplate from './Components/RightTemplate';
import blogStore from './store';

const App = observer(() => {
  return (
    <div>
      <LeftTemplate></LeftTemplate>
      <RightTemplate></RightTemplate>
    </div>
  )
});

export default App;
