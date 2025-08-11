import { useState, useCallback, useEffect, useRef } from "react";
// useCallBack is use to memorize the function sa much possible
// useRef is use to get the refernce of the function on the webpage and manuplate it
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPass] = useState("");
  // rseRef hook
   const passwordRef =useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()+-{}[]_=`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
  }, [length, numberAllowed, charAllowed, setPass,]);

  // copy to clipboard Function
  const copyPasswordToClipborad = useCallback(() => {
    passwordRef.current?.select() // use for show that input is selected
    passwordRef.current?.setSelectionRange(0, 26) // use for only selecting within the range 
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {passwordGenrator()}, [length, numberAllowed, charAllowed, passwordGenrator])

  return (
    <> <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-2 relative">
      <div className="w-full  h-[50vh] max-w-md mx-auto shadow-md rounded-xl px-4 my-8 text-cyan-200 bg-slate-800 border-gray-800 flex flex-col justify-evenly flex-wrap">
        <h1 className="text-gray-200 font-bold text-2xl text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-2xl overflow-hidden mb-4 bg-slate-800 border border-cyan-600">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-slate-800"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipborad} className="outline-none bg-slate-800 px-3 py-0.5 mx-2 my-2 rounded-2xl shrink-0">
            {/* Copy */}
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
             </svg>
          </button>
        </div>
        <div className="flex flex-col text-sm gap-y-1 py-5 font-semibold">
          <div className="flex justify-between item-center gap-x-1">
            <label> Length (6-26) : {length}</label>
            <input
              type="range"
              min={6}
              max={26}
              value={length}
              className="cursor-pointer accent-cyan-400"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between gap-x-1 items-center">
            <label htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="accent-cyan-400"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
          </div>
          <div className="flex justify-between gap-x-1 items-center">
            <label htmlFor="charInput">Symbols</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className="accent-cyan-400"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
          </div>
        </div>
          <button className="flex justify-center items-center border-2 border-cyan-500 rounded-lg bg-cyan-600 text-gray-200"
              onClick={passwordGenrator}> 
              Regenerate Password
           </button>
      </div>
      </div>
    </>
  );
}

export default App;
