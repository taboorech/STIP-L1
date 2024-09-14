// import { v4 as uuid } from "uuid";

const labs = [
  {
    id: '1',
    title: 'Лабораторна робота 1',
    conditionPath: 'https://docs.google.com/document/d/1qt-jl6vioFjCHKePM4uf_4HgBtd2SUWyYyrXhU0C48s/edit?usp=sharing',
    results: [
      {
        title: 'Main project',
        path: 'https://stip-l1.vercel.app/'
      }
    ],
    codes: [
      {
        file: 'App.tsx',
        code: 
  `import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/:lab" element={<Home/>} />
    </Routes>
  )
}

export default App`
      },
      {
        file: 'ReportBlock.tsx',
        code: 
  `import classNames from "classnames";
import Button from "../Button/Button";
import ReportContent from "../ReportContent/ReportContent";
import { useState } from "react";
import { Lab } from "../../types/lab.type";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ReportBlockProps {
  lab: Lab | null;
};

const ReportBlock = ({ lab }: ReportBlockProps) => {

  const [conditionOpen, setConditionOpen] = useState<boolean>(false);
  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
  const [linksOpen, setLinksOpen] = useState<boolean>(false);

  if(!lab) {
    return (
      <div className="w-full flex items-center justify-center">
        Choose the lab 
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Вікно для завантаження</h2>
      <div className="flex flex-col gap-3">
        <Button 
          className={classNames(conditionOpen ? "text-white bg-blue-500" : 'text-blue-500 outline outline-blue-500')}
          onClick={() => setConditionOpen(!conditionOpen)}
        >Умова лабораторної роботи</Button>
        {
          conditionOpen &&
          <ReportContent>
            { lab.conditionPath ?
              <iframe 
                src={lab.conditionPath.replace('/edit?usp=sharing', '/preview')}
                title="Google Document"
                className="w-full h-screen border rounded-lg shadow-lg"
                allowFullScreen
              ></iframe>
              :
              'No content'
            }
          </ReportContent>
        }
        <Button 
          className={classNames(resultsOpen ? "text-white bg-blue-500" : 'text-blue-500 outline outline-blue-500')}
          onClick={() => setResultsOpen(!resultsOpen)}
        >Результати виконання роботи</Button>
        {
          resultsOpen &&
          <ReportContent>
            Condition
          </ReportContent>
        }
        <Button 
          className={classNames(linksOpen ? "text-white bg-blue-500" : 'text-blue-500 outline outline-blue-500')}
          onClick={() => setLinksOpen(!linksOpen)}
        >
          Посилання на програмний код роботи (всіх складових - HTML, CSS, JavaScript і т.д.)
        </Button>
        {
          linksOpen &&
          <ReportContent>
            { lab.codes.map(({ file, code }, index) =>
              <div key={'code-file-index'}>
                <h3 className="text-center text-xl p-3">{ file }</h3>
                <SyntaxHighlighter language="typescript" style={docco}>
                  { code }
                </SyntaxHighlighter>
              </div>
            ) }
          </ReportContent>
        }
      </div>
    </div>
  )
};

export default ReportBlock;`
      },
      {
        file: 'Home.tsx',
        code: 
  `import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import { v4 as uuid } from 'uuid';
import { Lab } from "../../types/lab.type";
import ReportBlock from "../../components/ReportBlock/ReportBlock";

const Home = () => {

  const { lab } = useParams();

  const [labs, setLabs] = useState<Lab[]>([]);
  const [activeLab, setActiveLab] = useState<string | null>(null);

  useEffect(() => {
    setActiveLab(lab || null);
  }, [lab]);

  useEffect(() => {
    setLabs(savedLabs);
  }, []);

  const fillLabs = labs.map(({ id, title }) => 
    <Link key={'lab-id'} to={'/id'} className={classNames(activeLab === id && 'bg-gray-50 font-semibold')}>
      <li className="hover:bg-gray-100 p-4 cursor-pointer">
        { title }
      </li>
    </Link>
  )

  return (
    <div className="flex flex-row">
      <div className="w-full md:w-1/4">
        <ul className="list-none flex flex-col">
          { fillLabs }
        </ul>
      </div>

      <div className="w-full md:w-3/4 bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">
          Звіт про лабораторні роботи з курсу
        </h1>
        <p className="text-lg mb-4">
          «Сучасні технології Інтернет-програмування» студента групи ІПЗ-22-1
        </p>
        <Link to="#" className="text-lg hover:underline">Кісельов Єгор Геннадійович</Link>

        <ReportBlock lab={labs.find(({ id }) => id === activeLab) || null} />
      </div>
    </div>
  )
};

export default Home;`
      },
      {
        file: 'ReportContent.tsx',
        code: 
  `import classNames from "classnames";
import { ReactNode } from "react";

interface ReportContentProps {
  className?: string;
  children: string | ReactNode | ReactNode[];
}

const ReportContent = ({ className, children }: ReportContentProps) => {
  return(
    <div className={classNames("w-full", className)}>
      { children }
    </div>
  )
};

export default ReportContent;`
      },
      {
        file: 'Button.tsx',
        code: 
  `import classNames from "classnames"
import { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: string | ReactNode | ReactNode[];
  [key: string]: any;
}

const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={classNames("px-4 py-2 rounded-lg", className)}
      {...rest}
    >
      { children }
    </button>
  )
};

export default Button;`
      },
      {
        file: 'lab.type.ts',
        code: 
  `interface Code {
  file: string;
  code: string;
}

type Lab = {
  id: string;
  title: string;
  conditionPath: string;
  codes: Code[];
};

export type { Lab };`
      }
    ]
  },
  {
    id: '2',
    title: 'Лабораторна робота 2',
    additionalInfo: [
      `Варіант 7. Текстове дворівневе меню: при виборі певного пункту меню пункти
      верхнього рівня розсуваються та вставляють підпункти обраного пункту, тобто пункт
      меню «розкривається».`,
      `Варіант 2. Розмістіть на сторінці чотири зображення, два поля введення та кнопку
      Переставити. При натисканні на цю кнопку зображення з номерами, введеними в
      текстові поля, слід поміняти місцями.`
    ],
    conditionPath: 'https://docs.google.com/document/d/1ubZRO8bXbKRds8vbmBrPwJz8bvqOOxNx/edit?usp=sharing',
    results: [
      {
        title: 'Main project. Exercise 7. Exercise 2',
        path: 'https://stip-l2.vercel.app/'
      }
    ],
    codes: [
      {
        file: 'App.tsx',
        code: 
  `import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  )
}

export default App`
      },
      {
        file: 'Input.tsx',
        code: 
  `import classNames from "classnames";

interface InputProps {
  className?: string;
  [key: string]: any;
}

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={classNames("px-4 py-2 rounded-lg border", className)}
      {...rest}
    />
  )
};

export default Input;`
      },
      {
        file: 'Home.tsx',
        code: 
  `import FirstExercise from "../../components/FirstExercise/FirstExercise";
import SecondExercise from "../../components/SecondExercise/SecondExercise";
import Tabs from "../../components/Tabs/Tabs";
import { Tab } from "../../types/tab.type";

const Home = () => {

  const tabs: Tab[] = [
    {
      title: 'Exercise 1',
      element: <FirstExercise/>
    },
    {
      title: 'Exercise 2',
      element: <SecondExercise/>
    },
  ];

  return (
    <div className="flex flex-col">
      <Tabs tabs={tabs} />
    </div>
  )
};

export default Home;`
      },
      {
        file: 'FirstExercise.tsx',
        code: 
  `import { useState } from "react";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import Backdrop from "../Backdrop/Backdrop";
import { DropdownItem } from "../../types/dropdown-item.type";

const FirstExercise = () => {

  const [dropdownPosition, setDropdownPosition] = useState<DOMRect | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const dropdownItems: DropdownItem[] = [
    {
      item: 'Item 1',
    },
    {
      item: 'Item 2',
      subitems: [
        'Subitem 1',
        'Subitem 2',
        'Subitem 3',
        'Subitem 4',
        'Subitem 5',
      ]
    },
    {
      item: 'Item 3',
    },
    {
      item: 'Item 4',
      subitems: [
        'Subitem 1',
        'Subitem 2',
        'Subitem 3',
        'Subitem 4',
        'Subitem 5',
      ]
    }
  ];

  const dropdownButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    setDropdownPosition(rect);
    setDropdownOpen(true);
  }

  return (
    <div className="p-4">
      <Button className="bg-blue-500 text-white" onClick={dropdownButtonClickHandler}>
        Dropdown
      </Button>
      <Dropdown items={dropdownItems}  position={dropdownPosition} isOpen={dropdownOpen} />
      <Backdrop isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)} />
    </div>
  )
};

export default FirstExercise;`
      },
      {
        file: 'Button.tsx',
        code: 
  `import classNames from "classnames";
import { ReactNode } from "react";

interface ButtonProps {
  children: string | ReactNode | ReactNode[];
  className?: string;
  [key: string]: any;
}

const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button className={classNames('px-4 py-2 shadow-md rounded-lg', className)} {...rest}>
      { children }
    </button>
  )
};

export default Button;`
      },
      {
        file: 'Dropdown.tsx',
        code: 
  `import classNames from "classnames";
import { useState } from "react";
import { DropdownItem } from "../../types/dropdown-item.type";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";

interface DropdownProps {
  isOpen: boolean;
  position: DOMRect | null;
  items: DropdownItem[];
}

const Dropdown = ({ isOpen, position, items }: DropdownProps) => {

  const styles = position ? { left: position.left, top: position.top + position.height } : {};
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const itemsFill = items.map((item, index) => 
    <div className="bg-gray-100 cursor-pointer" key={item-index}>
      <div 
        className="flex flex-row gap-3 bg-white items-center text-lg hover:bg-gray-50 px-4 py-2" 
        onClick={() => setActiveItems(prev => prev.includes(index) ? prev.filter((value) => value !== index) : [...prev, index])}
      >
        { activeItems.includes(index) && <FaChevronDown className={classNames("text-sm", !item.subitems && 'opacity-0')}/>}
        { !activeItems.includes(index) && <FaChevronRight className={classNames("text-sm", !item.subitems && 'opacity-0')}/>}
        { item.item }
      </div>
      {(item.subitems && activeItems.includes(index)) && 
        <div className="bg-transparent">
          { item.subitems.map((subitem, index) => 
            <div className="hover:bg-gray-200 px-4 py-2" key={subtitle-subitem-index}>{ subitem }</div>
          ) }
        </div>
      }
    </div>
  );

  return (
    <div 
      className={classNames("w-3/12 absolute z-30 h-auto bg-white transition-opacity duration-300 ease-in-out mt-2", isOpen ? 'opacity-100' : 'opacity-0')}
      style={styles}
    >
      { itemsFill }
    </div>
  )
};

export default Dropdown;`
      },
      {
        file: 'Backdrop.tsx',
        code: 
  `import classNames from "classnames";

interface BackdropProps {
  isOpen: boolean;
  onClose: () => void;
}

const Backdrop = ({ isOpen, onClose }: BackdropProps) => {
  return (
    <div 
      className={classNames(
        "fixed left-0 bottom-0 top-0 right-0 bg-black opacity-0", 
        "transition-opacity duration-300 ease-in-out",
        isOpen ? 'z-20 opacity-20' : '-z-50'
      )}
      onClick={onClose}
    >
    </div>
  )
};


export default Backdrop;`
      },
      {
        file: 'Tabs.tsx',
        code: 
  `import classNames from "classnames";
import { useState } from "react";
import { Tab as TabType } from "../../types/tab.type";
import Tab from "./Tab/Tab";

interface TabsProps {
  className?: string;
  tabsClassName?: string;
  tabs: TabType[];
  bodyClassName?: string;
};

const Tabs = ({ className, tabs, tabsClassName, bodyClassName }: TabsProps) => {

  const [activeTab, setActiveTab] = useState<number>(0);
  const fillTabs = tabs.map(({ title }, index) => 
    <Tab 
      onClick={() => setActiveTab(index)} 
      key={tab-index}
      className={classNames(index === activeTab && "bg-gray-50 font-semibold")}
    >{ title }</Tab>
  );

  return (
    <div className={classNames("flex flex-col h-screen", className)}>
      <div className={classNames("w-full flex flex-row", tabsClassName)}>
        { fillTabs }
      </div>
      <div className={classNames("w-full", bodyClassName)}>
        { tabs[activeTab].element }
      </div>
    </div>
  )
};

export default Tabs;`
      },
      {
        file: 'Tab.tsx',
        code: 
  `import classNames from "classnames";
import { ReactNode } from "react";

interface TabProps {
  children: string | ReactNode | ReactNode[];
  className?: string;
  [key: string]: any;
}

const Tab = ({ children, className, ...rest }: TabProps) => {
  return (
    <div className={classNames("bg-transparent hover:bg-gray-100 text-xl w-full text-center py-3 cursor-pointer", className)} {...rest}>
      { children }
    </div>
  )
};

export default Tab;`
      },
      {
        file: 'SecondExercise.tsx',
        code: 
  `import React, { useState } from 'react';
import first from '../../assets/1.jpg';
import second from '../../assets/2.jpeg';
import third from '../../assets/3.avif';
import fourth from '../../assets/3.jpeg';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { IoIosSwap } from "react-icons/io";

const SecondExercise = () => {

  const [images, setImages] = useState<string[]>([first, second, third, fourth]);
  const [firstImageInput, setFirstImageInput] = useState<number>(1);
  const [secondImageInput, setSecondImageInput] = useState<number>(1);

  const fillImages = images.map((image, index) => 
    <div className="w-[20%] flex flex-col gap-3" key={image-image-index}>
      <img src={image} className="w-full h-[200px] object-cover" />
      <p className='text-center text-xl'>{ index + 1 }</p>
    </div>
  );  

  const changeButtonClickHandler = () => {
    if(firstImageInput <= 0 || firstImageInput > images.length)
      return

    if(secondImageInput <= 0 || secondImageInput > images.length)
      return

    const changedArr = [...images];
    const tmp = changedArr[firstImageInput - 1];
    changedArr[firstImageInput - 1] = images[secondImageInput - 1];
    changedArr[secondImageInput - 1] = tmp;

    setImages(changedArr);
  };

  return(
    <div className="p-4 flex flex-col gap-8">
      <div className="flex flex-row justify-center gap-[5%]">
        { fillImages }
      </div>
      <div className='flex flex-row justify-around'>
        <Input 
          type="text"
          value={firstImageInput || ''} 
          className='w-1/6'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFirstImageInput(+event.target.value)} 
        />
        <Button className='bg-blue-500 text-white' onClick={changeButtonClickHandler}>
          <IoIosSwap/>
        </Button>
        <Input 
          type="text"
          value={secondImageInput || ''} 
          className='w-1/6'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSecondImageInput(+event.target.value)} 
        />
      </div>
    </div>
  )
};

export default SecondExercise;`
      },
      {
        file: 'tab.type.ts',
        code: 
  `import { ReactNode } from "react";

type Tab = {
  title: string;
  element: ReactNode;
};

export type { Tab };`
      },
      {
        file: 'dropdown-item.type.ts',
        code: 
  `type DropdownItem = {
  item: string;
  subitems?: string[];
};

export type { DropdownItem };`
      }
    ]
  },
  {
    id: '3',
    title: 'Лабораторна робота 3',
    additionalInfo: [
      `Варіант 4: Створення ефекту анімованого тексту. 
      У тексті символ за символом змінюється колір та розмір чергового символу. 
      Попередній символ стає тим самим.`
    ],
    conditionPath: 'https://docs.google.com/document/d/14uOLEkRJvzz1JtvnQDAKQ5bR8LVXK1KV/edit?usp=sharing',
    results: [
      {
        title: 'Main project. Exercise 4',
        path: 'https://stip-l3.vercel.app/'
      }
    ],
    codes: [
      {
        file: 'App.tsx',
        code: 
  `import Home from "./pages/Home/Home"

const App = () => {
  return (
    <>
      <Home/>
    </>
  )
}

export default App`
      },
      {
        file: 'Input.tsx',
        code: 
  `import React from "react";
import "./Input.scss";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const Input = ({ value, onChange, ...rest }: InputProps) => {
  return (
    <input
      className="Input"
      value={value}
      onChange={onChange}
      {...rest}
    />
  )
};

export default Input;`
      },
      {
        file: 'Home.tsx',
        code: 
  `import { useState } from "react";
import AnimatedText from "../../components/AnimatedText/AnimatedText";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import './Home.scss';

const Home = () => {
  const [text, setText] = useState<string>('Animated text');
  const [value, setValue] = useState<string>('');

  const buttonClickHandler = () => {
    setText(value);
  }

  return (
    <div className="Home">
      <AnimatedText text={text} />
      <div className="controls">
        <Input value={value} onChange={(event) => setValue(event.target.value)}/>
        <Button onClick={buttonClickHandler} >
          Save
        </Button>
      </div>
    </div>
  )
};

export default Home;`
      },
      {
        file: 'AnimatedText.tsx',
        code: 
  `import { useState, useEffect } from 'react';
import './AnimatedText.scss';

interface AnimatedTextProps {
  text: string;
}

const AnimatedText = ({ text }: AnimatedTextProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 400);

    return () => clearInterval(interval);
  }, [text.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [text]);

  return (
    <div className="animated-text">
      {[...text].map((char, index) => (
        <span
          key={index}
          className={'animated-char index === activeIndex ? 'active' : ''}
        >
          {char === " " ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;`
      },
      {
        file: 'Button.tsx',
        code: 
  `import { ReactNode } from "react";
import "./Button.scss";
import classNames from "classnames";

interface ButtonProps {
  children: string | ReactNode | ReactNode[];
  className?: string;
  [key: string]: any;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button className={classNames("Button", className)} {...rest}>
      { children }
    </button>
  )
};

export default Button;`
      },
      {
        file: 'Button.scss',
        code: 
  `.Button {
  padding: .5rem;
  border-radius: 5px;
  background-color: #6464e9;
  color: #FFF;
  border: none;
  outline: none;
  font-size: 18px;
  cursor: pointer;
}`
      },
      {
        file: 'AnimatedText.scss',
        code: 
  `.animated-text {
  font-size: 32px;
  font-weight: bold;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7rem;

  > .animated-char {
    display: inline-block;
    transition: all .3s ease;

    &.active {
      color: red;
      font-size: 40px;
    }
  }
}`
      },
      {
        file: 'Input.scss',
        code: 
  `.Input {
  border-radius: 5px;
  border: 1px solid #3b3b3b;
  padding: .5rem;
  font-size: 18px;
}`
      },
      {
        file: 'Home.scss',
        code: 
  `.Home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  > .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20%;

    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
}`
      }
    ]
  }
];

export { labs };