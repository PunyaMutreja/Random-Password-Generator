import { useState , useCallback, useEffect  } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const generatePassword=useCallback(
    () => {
      let pass=''
      let str="ABCDEFGHIIJKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz"
      if(numberAllowed){
        str=str+"1234567890"
      }
      if(charAllowed){
        str=str+"!@#$%^&*?"
      }
      for(let i=1; i<=length;i++){
        const char = Math.floor(Math.random() * str.length+1)
        pass+=str.charAt(char)
      }
      setPass(pass)
    },
    [length, numberAllowed, charAllowed],
  )

  useEffect(() => {
    generatePassword()

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(pass)
  }
  return (
    <div className="w-full h-screen bg-blue-950 px-2 py-3 text-orange">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 place-content-center">
        <input
          type="text"
          value={pass}
          className="outline-none w-1/4 py-1 px-3 rounded-full"
          placeholder="password"
          readOnly
        />
        <button onClick={copyPasswordToClipboard}className="outline-none bg-blue-700 text-white px-3 py-2 shrink-0 rounded-full">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2 place-content-center">
        <div className="flex items-center gap-x-1 ">
          <input
            type="range"
            value={length}
            min={6}
            max={20}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="Length" className="text-white ">
            Length: {length}
          </label>{" "}
          <input
            type="checkbox"
            defaultCheck={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="Numbers" className="text-white">
            Numbers
          </label>
          <input
            type="checkbox"
            defaultCheck={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="Characters" className="text-white">
            Character
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
