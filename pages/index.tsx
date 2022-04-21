import type { NextPage } from 'next'
import Head from 'next/head'

import { MouseEventHandler, useState } from "react";

import { LoremIpsum } from "lorem-ipsum";

import IpsumNumberField from '../components/IpsumNumberField'
import IpsumSelectField from '../components/IpsumSelectField'
import IpsumButton from '../components/IpsumButton'

type FormData = {
  input_number : number,
  input_type : string
}

type LoremData = string;

type CopyBtnText = string;

const ipsumTypes = [
  { value : "paragraph", label : "Paragraph" },
  { value : "word", label : "Word" },
  { value : "sentence", label : "Sentence" },
]

const loremGenerator = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 5
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const Home: NextPage = () => {

  const [formData,setFormData] = useState<FormData>({
    input_number : 5,
    input_type : "paragraph"
  });

  const [lorem,setLorem] = useState<LoremData>()

  const [copyBtnText,setCopyBtnText] = useState<CopyBtnText>("Copy")

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,[event.target.name] : event.target.value});
  }

  const handleSelectChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData,[event.target.name] : event.target.value});
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let resolvedLoremText = '';

    setCopyBtnText("Copy")

    switch(formData.input_type) { 
      case 'word': { 
        resolvedLoremText = loremGenerator.generateWords( formData.input_number )
         break; 
      } 
      case 'sentence': { 
        resolvedLoremText = loremGenerator.generateSentences( formData.input_number )
         break; 
      } 
      default: { 
        resolvedLoremText = loremGenerator.generateParagraphs( formData.input_number )
         break; 
      } 
   } 
   setLorem(
    resolvedLoremText
  );
  }

  const copyLoremText = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    navigator.clipboard.writeText(lorem || '');
    setCopyBtnText("Copied")
  }

  return (
    <div>
      <Head>
        <title>Lorem Ipsum</title>
        <meta name="description" content="Lorem Ipsum by Sachin Kiranti" />
        <meta name="name" content="Lorem Ipsum" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex h-screen bg-transparent-100">
      <div className="bg-slate-200 border shadow-x1 p-10 max-w-lg">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
            Lorem Ipsum
          </h1>
          <p className="text-sm text-gray-500 text-center w-5/6">
            Hello, Enter your desired input.
          </p>
          
          <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <IpsumNumberField 
              name='input_number'
              changeHandler={handleChange}
              currentValue={formData.input_number}
            />
            </div>

            <div className="mb-4">
            <IpsumSelectField 
              name='input_type'
              values={ipsumTypes}
              changeHandler={handleSelectChange}
              currentValue={formData.input_type}
            />
            </div>

            <button
              type='submit'
              className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full"
            >
              Generate
            </button>
            
          </form>
          <button
              onClick={copyLoremText}
              className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full"
            >
              {copyBtnText}<svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="inline-block ml-2 text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
            </button>
        </div>
        <div className='flex items-center justify-center p-5'>
          <svg className="text-blue-500 dark:text-white h-6 w-auto inline-block fill-current" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
          &nbsp;
          <a className="text-black text-sm font-mono" href="https://twitter.com/sachinkiranti" target="_blank" rel="noopener noreferrer">
            @sachinkiranti
          </a>
        </div>
        <div className='flex items-center justify-center'>
          <a className="text-blue text-sm font-mono" href="https://raisachin.com.np" target="_blank" rel="noopener noreferrer">
            https://raisachin.com.np
          </a>
        </div>
      </div>
      <div className="text-black p-10 font-mono text-justify max-w-screen-2xl">
        {lorem}
      </div>
    </div>
    </div>
  )
}

export default Home
