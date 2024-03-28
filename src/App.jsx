import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(14);
  const [isDigitAllowed, setIsDigitAllowed] = useState(true);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(true);
  const [password, setPassword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const inputPassRef = useRef(null);

  const handleLengthChange = ({ target: { value } }) => {
    setLength(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleDigitChange = () => {
    setIsDigitAllowed((prevState) => !prevState);
  };

  const handleSpecialCharChange = () => {
    setIsSpecialCharAllowed((prevState) => !prevState);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(password);
      inputPassRef.current?.select();

      setIsCopied((prevState) => !prevState);
      setTimeout(() => setIsCopied((prevState) => !prevState), 2000);
      // console.log('Password copied to clipboard!');
    } catch (err) {
      // console.error('ERROR: ', err);
    }
  };

  const generatePassword = useCallback(() => {
    let newPassword = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (isDigitAllowed) chars += '0123456789';
    if (isSpecialCharAllowed) chars += '!@#$%^&*()+-';

    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars.charAt(randomIndex);
    }

    setPassword(newPassword);
  }, [length, isDigitAllowed, isSpecialCharAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, isDigitAllowed, isSpecialCharAllowed, generatePassword]);

  return (
    <form
      action=""
      className="w-2/4 rounded-md bg-slate-500 mx-auto my-5 p-8 flex flex-col justify-items-center"
    >
      <header>
        <h1 className="text-center text-xl font-semibold mb-3 text-white">
          Password Generator
        </h1>
      </header>
      <div className="flex justify-center">
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          readOnly
          className="py-2 px-4 rounded-l-xl w-full outline-none"
          ref={inputPassRef}
        />
        <button
          type="button"
          className="bg-blue-600 py-2 px-4 text-white rounded-r-xl outline-none hover:bg-blue-700"
          onClick={handleCopyClick}
        >
          {!isCopied ? 'Copy' : `\u{2713}`}
        </button>
      </div>
      <div className="flex justify-start align-middle mt-2 gap-5">
        <div className="flex items-center">
          <input
            type="range"
            min={8}
            max={80}
            value={length}
            // defaultValue={14}
            id="length"
            onChange={handleLengthChange}
            className="cursor-pointer"
          />
          <label htmlFor="length" className="ml-2">
            Length: {length}
          </label>
        </div>
        <div className="flex items-center">
          <label htmlFor="digits">
            <input
              type="checkbox"
              name="digits"
              id="digits"
              className="mr-1"
              defaultChecked={isDigitAllowed}
              onChange={handleDigitChange}
            />
            Digits
          </label>
        </div>
        <div className="flex items-center">
          <label htmlFor="specialChars">
            <input
              type="checkbox"
              name="specialChars"
              id="specialChars"
              className="mr-1"
              defaultChecked={isSpecialCharAllowed}
              onChange={handleSpecialCharChange}
            />
            Special Characters
          </label>
        </div>
      </div>
    </form>
  );
}

export default App;
