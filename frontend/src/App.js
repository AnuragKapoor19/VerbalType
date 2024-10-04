import './App.css';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import toast,{Toaster} from 'react-hot-toast';

function App() {

  const [text, settext] = useState('')
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [isCopied, setCopied] = useClipboard(text, {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 1000,
  });

  useEffect(() => {
    settext(transcript)
  }, [transcript])


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const copyfunc = () => {
    setCopied();
    toast.success("Copied to Clipboard");
  }

  const startfunc = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    toast.success("Microphone is now active. Please start speaking.");
  }

  const stopfunc = () => {
    SpeechRecognition.stopListening();
    toast.success("Microphone turned off. Voice input disabled.");
  }

  return (
    <>
      <div className='container'>
        <div className='title'>VerbalType</div>
        <p><i>"Bridging the gap between speech and text seamlessly."</i></p>

        <div className='content-container'>
          <p style={{ color: '#D9F4C7' }}>Microphone: <i>{listening ? 'on' : 'off'}</i></p>
          <div className='main-content'>
            {transcript}
          </div>
          <div className='buttons'>
            <button onClick={copyfunc}>{isCopied ? "Copied!" : "Copy"}</button>
            <button onClick={startfunc}>Start</button>
            <button onClick={stopfunc}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
