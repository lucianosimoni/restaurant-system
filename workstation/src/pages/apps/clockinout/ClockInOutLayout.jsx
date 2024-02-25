import { useState } from 'react';
import IdCheck from './IdCheck.jsx';
import PhotoCheck from './PhotoCheck.jsx';

export default function ClockInOutLayout() {
  const [idChecked, setIdChecked] = useState(false);
  const [photoChecked, setPhotoChecked] = useState(false);

  if (!idChecked) {
    return <IdCheck setIdChecked={setIdChecked} />;
  }

  if (!photoChecked) {
    return <PhotoCheck setPhotoChecked={setPhotoChecked} />;
  }

  const reset = () => {
    setIdChecked(false);
    setPhotoChecked(false);
    console.log('Reseted the Clockinout to be ready for a new entry.');
  };

  return (
    <>
      <h1>TODO: Send it to the cloud.</h1>;<button onClick={reset}>Again</button>
    </>
  );
}
