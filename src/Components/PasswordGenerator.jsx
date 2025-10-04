import React, { useState } from 'react'
import './PasswordGenerator.css'

const PasswordGenerator = () => {

const[password, setPassword]=useState('')
const[options, setOptions]=useState({
    length:6,
    uppercase:true,
    lowercase: true,
    number: true,
    symbol: false
});
const[copy, setCopy]=useState(false)

const generatePassword =()=>{
    
    let uppercaseChars= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercaseChars= "abcdefghijklmnopqrstuvwxyz";
    let numberChars= "0123456789";
    let symbolsChars= "@#$%^&*(){}?><|\~`';:";

    let availableChars= '';
    let requiredChars= '';

    if(options.uppercase){
        availableChars += uppercaseChars;
        requiredChars  += uppercaseChars[Math.floor(Math.random()*uppercaseChars.length)];
    }

    if(options.lowercase){
        availableChars +=lowercaseChars;
        requiredChars +=lowercaseChars[Math.floor(Math.random()*lowercaseChars.length)];
    }

    
    if(options.number){
        availableChars +=numberChars;
        requiredChars += numberChars[Math.floor(Math.random()*numberChars.length)];
    }
 
     if(options.symbol){
        availableChars +=symbolsChars;
        requiredChars += symbolsChars[Math.floor(Math.random()*symbolsChars.length)];
    }
  
    if(!availableChars){
        setPassword('Please select at least one character type');
      return;
    }

    let results=requiredChars;

    for(let i = requiredChars.length; i<options.length;i++){
        results += availableChars[Math.floor(Math.random()*availableChars.length)]
    }

     results = results.split('').sort(() => Math.random() - 0.5).join('');

     setPassword(results);
     setCopy(false);

};

const copyToClipboard = async ()=>{
if(password && !password.includes("please select")){
  try{
  await navigator.clipboard.writeText(password);
   setCopy(true);
   setTimeout(()=>{
    setCopy(false);
   }, 2000)

  }
   catch(err){
 console.error("Failed to copy password");
  }

  
}

};
  const getPasswordStrength = () => {
    if (!password || password.includes('Please select'))
       return { text: "", color: "" };

    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (password.length < 8) return { text: 'Weak', color: "red" };
if (password.length < 12) return { text: 'Medium', color: "orange" };
return { text: 'Strong', color: "green" };

  };

  const strength = getPasswordStrength();

   


  return (
    <div>
      
<div className="password-generator">
  <p>Password Generator</p>

  {/* Password Display */}
  <div className="password-display">
    <input type="text" value={password} readOnly />
    <button onClick={copyToClipboard}>
      {copy ? "Copied!" : "Copy"}
    </button>
  </div>

  {/* Length Selector */}
  <div className="lenght-selector">
 <label>Password Length: {options.length}</label>
<input 
  type="range" 
  min="4" 
  max="32" 
  value={options.length} 
  onChange={(e) => setOptions({...options, length: Number(e.target.value)})}
/>
</div>

  {/* Options */}
    <div className="options">
        <label>
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={() => setOptions({ ...options, uppercase: !options.uppercase })}
          /> Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={() => setOptions({ ...options, lowercase: !options.lowercase })}
          /> Lowercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={options.number}
            onChange={() => setOptions({ ...options, number: !options.number })}
          /> Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={options.symbol}
            onChange={() => setOptions({ ...options, symbol: !options.symbol })}
          /> Symbols
        </label>



        {/* Strength Meter */}
  <div className="strength" style={{color: strength.color}}>
  Strength: {strength.text}
</div>
      </div>

  


  {/* Generate Button */}
  <button className="generate-btn" onClick={generatePassword}>
    Generate Password
  </button>
</div>




    </div>
  )
}

export default PasswordGenerator
