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

  useEffect(() => {
    const textContainer = document.querySelector('.animated-text');
    
    if (textContainer) {
      textContainer.innerHTML = '';

      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.classList.add('animated-char');
        
        if (index === activeIndex) {
          span.classList.add('active');
        }

        textContainer.appendChild(span);
      });
    }
  }, [text, activeIndex]);

  return (
    <div className="animated-text"></div>
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
  },
  {
    id: '4',
    title: 'Лабораторна робота 4',
    additionalInfo: [
      `Завдання 14: Дано рядок \'wйw wяw wёw wqw\'. Напишіть регулярний вираз,
      який знайде рядки наступного вигляду: по краях стоять букви w, а між
      ними - буква кирилиці.`
    ],
    conditionPath: 'https://docs.google.com/document/d/1R31W-Flb6lgg9JwwvhCRytYs8jFZtQkqG_mzYqd2q_8/edit?usp=sharing',
    results: [
      {
        title: 'Main project. Exercise 14',
        path: 'https://stip-l4.vercel.app/'
      }
    ],
    codes: [
      {
        file: 'App.tsx',
        code: 
  `import Home from "./pages/Home/Home"

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
        file: 'RegistrationForm.tsx',
        code: 
  `import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { creditCardRegex, registrationValidation } from "../../yup/registration.scheme";

const RegistrationForm = () => {
  const [creditCardAttempts, setCreditCardAttempts] = useState<number>(0);
  const [creditCard, setCreditCard] = useState<string>('');
  const maxAttempts = 3;

  const handleCreditCardInput = (value: string) => {
    if (!creditCardRegex.test(value) && value.length > 0) {
      setCreditCardAttempts((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Форма реєстрації</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          organization: "",
          creditCard: "",
          phone: "",
          email: "",
        }}
        validationSchema={registrationValidation}
        onSubmit={(_, { resetForm }) => {
          if (creditCardAttempts >= 3) {
            alert("Перевищено кількість спроб введення номера кредитної картки");
            return;
          }

          alert("Дані успішно надіслані");
          resetForm();
          setCreditCardAttempts(0);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Ім'я</label>
              <Field
                name="firstName"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Прізвище</label>
              <Field
                name="lastName"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Найменування організації</label>
              <Field
                name="organization"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="organization" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700">
                Номер кредитної картки
              </label>
              <Field
                name="creditCard"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  setFieldValue("creditCard", value);
                  setCreditCard(value);
                }}
              />
              <ErrorMessage name="creditCard" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div>
              <p>Залишилося спроб введення номера картки: {creditCardAttempts >= 3 ? 0 : maxAttempts - creditCardAttempts}</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Номер телефону</label>
              <Field
                name="phone"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Електронна пошта</label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex items-center flex-col justify-between">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                onClick={() => handleCreditCardInput(creditCard)}
              >
                Надіслати
              </button>
              <button
                type="reset"
                className="w-full mt-2 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Очистити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;`
      },
      {
        file: 'Home.tsx',
        code: 
  `import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import RegularCheckBlock from "../../components/RegularCheckBlock/RegularCheckBlock";

const Home = () => {

  return (
    <div>
      <RegistrationForm/>
      <RegularCheckBlock/>
    </div>
  )
};

export default Home;`
      },
      {
        file: 'RegularCheckBlock.tsx',
        code: 
  `import { useState } from "react";

const RegularCheckBlock = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string[]>([]);
  
  const cyrillicRegex = /w[а-яёїієґ]w/gi;

  const handleRegexTest = () => {
    const matches = inputValue.match(cyrillicRegex);
    if (matches) {
      setResult(matches);
    } else {
      setResult(["Нічого не знайдено"]);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Перевірка регулярного виразу</h2>
      <div className="mb-4">
        <label htmlFor="regexInput" className="block text-sm font-medium text-gray-700">
          Введіть рядок для перевірки:
        </label>
        <input
          id="regexInput"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleRegexTest}
        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
      >
        Перевірити
      </button>
      <div className="mt-4">
        <h3 className="font-medium">Результати:</h3>
        {result.length > 0 && result.map((res, idx) => (
          <div key={idx} className="text-gray-700 mt-2">
            {res}
          </div>
        ))}
      </div>
    </div>
  )
};

export default RegularCheckBlock;`
      },
      {
        file: 'registration.scheme.ts',
        code: 
  `import * as yup from "yup";

const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
const creditCardRegex = /^\d{16}$/;
const phoneRegex = /^\+?\d{10,15}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registrationValidation = yup.object().shape({
  firstName: yup
    .string()
    .matches(nameRegex, "Ім'я повинно містити тільки літери")
    .required("Ім'я є обов'язковим"),
  lastName: yup
    .string()
    .matches(nameRegex, "Прізвище повинно містити тільки літери")
    .required("Прізвище є обов'язковим"),
  organization: yup.string().required("Найменування організації є обов'язковим"),
  creditCard: yup
    .string()
    .matches(creditCardRegex, "Номер кредитної картки повинен містити 16 цифр")
    .required("Номер кредитної картки є обов'язковим"),
  phone: yup
    .string()
    .matches(phoneRegex, "Введіть правильний номер телефону")
    .required("Номер телефону є обов'язковим"),
  email: yup
    .string()
    .matches(emailRegex, "Введіть коректну електронну адресу")
    .required("Електронна адреса є обов'язковою"),
});

export { registrationValidation, creditCardRegex };`
      }
    ]
  },
  {
    id: '5',
    title: 'Лабораторна робота 5',
    additionalInfo: [
      `Завдання 1. Варіант 14. На кліку на тексті він замінювався іншим текстом`,
      `Завдання 2. Варіант 14. Блок синього кольору з текстом всередині рухається праворуч наліво, в центрі сторінки блок збільшується, потім текст стає білим, текст збільшується`,
      `Завдання 3. Варіант парний. Додати на сторінку форму, що містить декілька елементів форми, при цьому при виборі певного значення в одному елементі: відображати інший елемент`,
    ],
    conditionPath: 'https://docs.google.com/document/d/1GJBwwkNebeqiBWCDUwCrUASk1d6pUPWl/edit?usp=sharing',
    results: [
      {
        title: 'jQuery project',
        path: 'https://stip-l5.vercel.app/'
      }
    ],
    codes: [
      {
        file: 'App.tsx',
        code: 
  `import Home from "./pages/Home/Home"

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
        file: 'FormComponent.tsx',
        code: 
  `const FormComponent = () => {
  return (
    <div className="flex flex-col items-start space-y-4">
      <form className="space-y-4">
        <label htmlFor="select" className="block text-lg font-medium text-gray-700">
          Choose an option:
        </label>
        <select
          id="select"
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">--Select--</option>
          <option value="show">Show Input Field</option>
          <option value="hide">Hide Input Field</option>
        </select>

        <div id="extra-input">
          <label htmlFor="extra-input-field" className="block text-sm font-medium text-gray-700">
            Extra Input:
          </label>
          <input
            id="extra-input-field"
            type="text"
            placeholder="Type something"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default FormComponent;`
      },
      {
        file: 'Home.tsx',
        code: 
  `import { useEffect } from 'react';
import $ from 'jquery';
import FormComponent from '../../components/FormComponent/FormComponent';

const Home = () => {
  useEffect(() => {
    $('#text').on('click', function () {
      $(this).text('Text changed via jQuery!');
    });

    $('#animate-btn').on('click', function () {
      $('#blue-box').animate({ left: '85%' }, 1000, function () {
        $(this).animate({ width: '200px', height: '200px' }, 1000, function () {
          $(this).css({ backgroundColor: 'white', color: 'blue' });
          $(this).text('Animated with jQuery!');
        });
      });
    });

    $('#select').on('change', function () {
      const selectedValue = $(this).val();
      if (selectedValue === 'show') {
        $('#extra-input').show();
      } else {
        $('#extra-input').hide();
      }
    });

    $('#extra-input').hide();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1
        id="text"
        className="text-xl font-bold cursor-pointer"
      >
        Click me to change text via jQuery
      </h1>

      <div
        id="blue-box"
        className="w-24 h-24 bg-blue-600 text-white flex items-center justify-center absolute"
        style={{ left: '10%' }}
      >
        Moving...
      </div>
      <button
        id="animate-btn"
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Start Animation
      </button>

      <FormComponent />
    </div>
  );
};

export default Home;`
      }
    ]
  },
  {
    id: '6',
    title: 'Лабораторна робота 6',
    additionalInfo: [
      `Варіант 14. 3 вкладені один в одного блоки, з рамками різних кольорів`,
      `1. Відображається у верхньому лівому куті вікна браузера`,
      `2. Усі рамки змінюють кольори.`,
      `3. Рухається у правий нижній кут`,
      `4. Зникає`,
      `5. Виявляється у лівому нижньому кутку`,
      `6. З'являється синьому тлі.`
    ],
    conditionPath: 'https://docs.google.com/document/d/1cYOhlZqC_R89mzZ9ppYGqJZCTLpBjeYFEcV5Mrw9BGA/edit?usp=sharing',
    results: [
      {
        title: 'jQuery project. Color box',
        path: 'https://stip-l6.vercel.app/'
      }
    ],
    codes: [
      {
        file: 'App.tsx',
        code: 
  `import Home from "./pages/Home/Home"

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
        file: 'ColorBox.tsx',
        code: 
  `import { useEffect } from 'react';
import $ from 'jquery';

const ColorBox = () => {
  useEffect(() => {
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    let currentColorIndex = 0;

    const changeBorderColor = () => {
      $('.color-box').css('border-color', colors[currentColorIndex]);
      $('.inner-box-1').css('border-color', colors[(currentColorIndex + 1) % colors.length]);
      $('.inner-box-2').css('border-color', colors[(currentColorIndex + 2) % colors.length]);

      currentColorIndex = (currentColorIndex + 1) % colors.length;
    };

    const animateBox = () => {
      const $box = $('.color-box');
      const boxWidth = $box.outerWidth();
      const boxHeight = $box.outerHeight();
      const windowWidth = $(window).width();
      const windowHeight = $(window).height();

      if (!windowWidth || !windowHeight) return;
      if (!boxWidth || !boxHeight) return;

      const maxLeft = windowWidth - boxWidth;
      const maxTop = windowHeight - boxHeight;

      $box.animate({
        left: maxLeft,
        top: maxTop
      }, 2000, function () {
        $(this).fadeOut(1000, function () {
          $(this).css({ left: '0%', top: maxTop, backgroundColor: 'blue' }).fadeIn(1000);
        });
      });
    };

    const intervalId = setInterval(changeBorderColor, 1000);

    setTimeout(animateBox, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed w-full h-full">
      <div className="color-box absolute border-8 border-red-500 w-48 h-48 flex justify-center items-center left-0 top-0">
        <div className="inner-box-1 w-32 h-32 border-8 border-green-500 flex justify-center items-center">
          <div className="inner-box-2 w-16 h-16 border-8 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;`
      },
      {
        file: 'Home.tsx',
        code: 
  `import ColorBox from '../../components/ColorBox/ColorBox';

const Home = () => {
  return (
    <div>
      <ColorBox />
    </div>
  );
};

export default Home;`
      }
    ]
  },
  {
    id: '7',
    title: 'Лабораторна робота 7',
    additionalInfo: [...
      `Варіант 3. Кулінарна книга:
- Тип страви;
- Назва страви;
- міра терезів;
- інгредієнт 1;
- кількість інгредієнта 1;
…
- рецепт;
– кількість калорій.`.split('\n')
    ],
    conditionPath: 'https://docs.google.com/document/d/1yODpszkg1o3edLAGMim7OI4MKc9PAJlFuZVAX87V4uA/edit?usp=sharing',
    results: [
      {
        title: 'XML project',
        path: 'https://stip-l7.vercel.app/'
      }
    ],
    codes: [
      {
        file: 'App.tsx',
        code: 
  `import Home from "./pages/Home/Home"

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
        file: 'Table.tsx',
        code: 
  `import React, { useState, useRef } from 'react';

const parseXML = (xml: Document) => {
  const dishes = Array.from(xml.getElementsByTagName('dish'));

  return dishes.map((dish) => ({
    type: dish.getElementsByTagName('type')[0].textContent,
    name: dish.getElementsByTagName('name')[0].textContent,
    measure: dish.getElementsByTagName('measure')[0].textContent,
    ingredients: Array.from(dish.getElementsByTagName('ingredient')).map((ingredient) => ({
      name: ingredient.getElementsByTagName('name')[0].textContent,
      amount: ingredient.getElementsByTagName('amount')[0].textContent,
    })),
    recipe: dish.getElementsByTagName('recipe')[0].textContent,
    calories: dish.getElementsByTagName('calories')[0].textContent,
  }));
};

const Table = () => {
  const [dishes, setDishes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'application/xml');
        const parsedDishes = parseXML(xmlDoc);
        setDishes(parsedDishes);
      };

      reader.onerror = () => {
        setError('Не вдалося прочитати файл');
      };

      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список страв</h1>

      <div className="mb-4 space-x-4">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
        >
          Завантажити XML файл
        </button>
        <input
          type="file"
          accept=".xml"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Тип</th>
              <th className="border px-4 py-2">Назва</th>
              <th className="border px-4 py-2">Одиниці виміру</th>
              <th className="border px-4 py-2">Інгредієнти</th>
              <th className="border px-4 py-2">Рецепт</th>
              <th className="border px-4 py-2">Калорії</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish, index) => (
              <tr key={index} className="border-t">
                <td className="border px-4 py-2 text-center">{dish.type}</td>
                <td className="border px-4 py-2 text-center">{dish.name}</td>
                <td className="border px-4 py-2 text-center">{dish.measure}</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc space-y-1">
                    {dish.ingredients.map((ingredient: any, idx: number) => (
                      <li key={idx} className="flex justify-between gap-5">
                        <span>{ingredient.name}</span>
                        <span className="font-semibold">{ingredient.amount}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2 text-justify">{dish.recipe}</td>
                <td className="border px-4 py-2 text-center">{dish.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;`
      },
      {
        file: 'Home.tsx',
        code: 
  `import Model from "../../components/Model/Model";
import staticModelImage from '../../assets/StaticModel.drawio.png';
import dynamicModelImage from '../../assets/DynamicModel.drawio.png';
import Table from "../../components/Table/Table";

const Home = () => {
  return (
    <div>
      <Model header="Статична модель" image={staticModelImage} />
      <Model header="Динамічна модель" image={dynamicModelImage} />
      <Table />
    </div>
  );
};

export default Home;`
      },
      {
        file: 'Model.tsx',
        code: 
  `interface ModelProps {
  header: string;
  image: string;
}

const Model = ({ header, image }: ModelProps) => {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">{ header }</h1>
      <div className="w-full flex justify-center py-5">
        <img 
          className='w-2/3 px-10'
          src={image} 
          alt='static model static-model' 
        />
      </div>
    </div>
  )
};

export default Model;`
      }
    ]
  },
  {
    id: '8',
    title: 'Лабораторна робота 8',
    additionalInfo: [...
      `Варіант 3. Кулінарна книга:
- Тип страви;
- Назва страви;
- міра терезів;
- інгредієнт 1;
- кількість інгредієнта 1;
…
- рецепт;
– кількість калорій.`.split('\n')
    ],
    conditionPath: 'https://docs.google.com/document/d/1PPo6Ih0CQ4HpBfMv8youJIwtSjoGDJtT/edit?usp=sharing',
    codes: [
      {
        file: 'DTD-schema',
        code: 
  `<!DOCTYPE cookbook [
  <!ELEMENT cookbook (dish+)>
  <!ELEMENT dish (type, name, measure, ingredient+, recipe, calories)>

  <!ELEMENT type (#PCDATA)>
  <!ELEMENT name (#PCDATA)>
  <!ELEMENT measure (#PCDATA)>
  <!ELEMENT ingredient (name, amount)>
  <!ELEMENT name (#PCDATA)>
  <!ELEMENT amount (#PCDATA)>
  <!ELEMENT recipe (#PCDATA)>
  <!ELEMENT calories (#PCDATA)>

  <!-- Атрибути -->
  <!ATTLIST dish id ID #REQUIRED>
  <!ATTLIST ingredient id ID #IMPLIED>
  <!ATTLIST calories unit CDATA #IMPLIED>

  <!-- Опис множинності входження -->
  <!ELEMENT cookbook (dish+)>
  <!ELEMENT dish (type, name, measure, ingredient+, recipe, calories)>

  <!-- Атрибути:
    - dish: обов'язковий унікальний атрибут id
    - ingredient: необов'язковий унікальний атрибут id
    - calories: необов'язковий атрибут для одиниці виміру калорій (наприклад, ккал)
  -->
]>
`
      },
      {
        file: 'XMLSchema',
        code: 
  `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema>

  <!-- Root element -->
  <xs:element name="cookbook">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="dish" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="type" type="xs:string"/>
              <xs:element name="name" type="xs:string"/>
              <xs:element name="measure" type="xs:string"/>
              
              <!-- Ingredients list -->
              <xs:element name="ingredient" maxOccurs="unbounded">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element name="name" type="xs:string"/>
                    <xs:element name="amount" type="xs:decimal"/>
                  </xs:sequence>
                </xs:complexType>
              </xs:element>
              
              <xs:element name="recipe" type="xs:string"/>
              <xs:element name="calories" type="xs:integer"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

</xs:schema>
`
      },
    ]
  },
  {
    id: '9',
    title: 'Лабораторна робота 9',
    additionalInfo: [...
      `Варіант 3. Кулінарна книга:
- Тип страви;
- Назва страви;
- міра терезів;
- інгредієнт 1;
- кількість інгредієнта 1;
…
- рецепт;
– кількість калорій.`.split('\n')
    ],
    results: [
      {
        title: 'Project',
        path: 'https://stip-l9.vercel.app/'
      }
    ],
    conditionPath: 'https://docs.google.com/document/d/1W3aCtYqv_F_gOR2qRf-5rtFiAxErlmye/edit?usp=sharing',
    codes: [
      {
        file: 'Table.tsx',
        code: 
  `import { useState, useEffect, useRef } from 'react';

const Table = () => {
  const [dishes, setDishes] = useState<any[]>([]);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const parseXML = (xml: Document) => {
    const dishes = Array.from(xml.getElementsByTagName('dish'));
  
    return dishes.map((dish) => ({
      type: dish.getElementsByTagName('type')[0].textContent,
      name: dish.getElementsByTagName('name')[0].textContent,
      measure: dish.getElementsByTagName('measure')[0].textContent,
      ingredients: Array.from(dish.getElementsByTagName('ingredient')).map((ingredient) => ({
        name: ingredient.getElementsByTagName('name')[0].textContent,
        amount: ingredient.getElementsByTagName('amount')[0].textContent,
      })),
      recipe: dish.getElementsByTagName('recipe')[0].textContent,
      calories: dish.getElementsByTagName('calories')[0].textContent,
    }));
  };

  useEffect(() => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData.trim(), 'application/xml');
    const parsedDishes = parseXML(xmlDoc);
    setDishes(parsedDishes);
  }, []);

  function loadXMLString(txt: string) {
    const parser = new DOMParser();
    return parser.parseFromString(txt.trim(), "text/xml");
  }

  function displayResult(xml: Document, xsl: Document) {
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);

    const resultDocument = xsltProcessor.transformToFragment(xml, document);
    if(resultRef.current) {
      resultRef.current.innerHTML = "";
      resultRef.current.appendChild(resultDocument);
    }
}

  const sortByCalories = () => {
    const xml = loadXMLString(xmlData);
    const xsl = loadXMLString(sortXSL);
    displayResult(xml, xsl);
  }

  const filterByType = () => {
    const xml = loadXMLString(xmlData);
    const xsl = loadXMLString(filterXSL);
    displayResult(xml, xsl);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список страв</h1>

      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Тип</th>
            <th className="border px-4 py-2">Назва</th>
            <th className="border px-4 py-2">Одиниці виміру</th>
            <th className="border px-4 py-2">Інгредієнти</th>
            <th className="border px-4 py-2">Рецепт</th>
            <th className="border px-4 py-2">Калорії</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish, index) => (
            <tr key={index} className="border-t">
              <td className="border px-4 py-2 text-center">{dish.type}</td>
              <td className="border px-4 py-2 text-center">{dish.name}</td>
              <td className="border px-4 py-2 text-center">{dish.measure}</td>
              <td className="border px-4 py-2">
                <ul className="list-disc space-y-1">
                  {dish.ingredients.map((ingredient: any, idx: number) => (
                    <li key={idx} className="flex justify-between gap-5">
                      <span>{ingredient.name}</span>
                      <span className="font-semibold">{ingredient.amount}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2 text-justify">{dish.recipe}</td>
              <td className="border px-4 py-2 text-center">{dish.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex flex-col gap-3 w-[20%] my-5'>
        <button className='rounded px-4 py-2 text-white bg-blue-500' onClick={sortByCalories}>
          Sort
        </button>
        <button className='rounded px-4 py-2 text-white bg-orange-500' onClick={filterByType}>
          Filter
        </button>
      </div>
      <div ref={resultRef}>

      </div>
    </div>
  );
};

export default Table;
`
      },
      {
        file: 'data.xml',
        code: 
  `<?xml version="1.0" encoding="UTF-8"?>
<cookbook>
  <dish>
    <type>Суп</type>
    <name>Борщ</name>
    <measure>грам</measure>
    <ingredient>
      <name>Капуста</name>
      <amount>200</amount>
    </ingredient>
    <ingredient>
      <name>Буряк</name>
      <amount>100</amount>
    </ingredient>
    <ingredient>
      <name>М'ясо</name>
      <amount>300</amount>
    </ingredient>
    <ingredient>
      <name>Картопля</name>
      <amount>200</amount>
    </ingredient>
    <recipe>Приготуйте бульйон з м'яса, додайте нарізану капусту, картоплю, буряк і варіть до готовності. Додайте приправи за смаком.</recipe>
    <calories>400</calories>
  </dish>

  <dish>
    <type>Салат</type>
    <name>Олів'є</name>
    <measure>грам</measure>
    <ingredient>
      <name>Картопля</name>
      <amount>300</amount>
    </ingredient>
    <ingredient>
      <name>Морква</name>
      <amount>100</amount>
    </ingredient>
    <ingredient>
      <name>Майонез</name>
      <amount>100</amount>
    </ingredient>
    <ingredient>
      <name>Ковбаса</name>
      <amount>200</amount>
    </ingredient>
    <ingredient>
      <name>Огірок</name>
      <amount>100</amount>
    </ingredient>
    <recipe>Варіть картоплю та моркву, наріжте всі інгредієнти кубиками, змішайте з майонезом.</recipe>
    <calories>500</calories>
  </dish>

  <dish>
    <type>Основна страва</type>
    <name>Котлета по-київськи</name>
    <measure>штука</measure>
    <ingredient>
      <name>Куряче філе</name>
      <amount>1</amount>
    </ingredient>
    <ingredient>
      <name>Вершкове масло</name>
      <amount>50</amount>
    </ingredient>
    <ingredient>
      <name>Панірувальні сухарі</name>
      <amount>100</amount>
    </ingredient>
    <recipe>Куряче філе начиніть маслом, обваляйте в сухарях, обсмажуйте на сковороді до золотистої скоринки.</recipe>
    <calories>700</calories>
  </dish>

  <dish>
    <type>Десерт</type>
    <name>Наполеон</name>
    <measure>грам</measure>
    <ingredient>
      <name>Листкове тісто</name>
      <amount>500</amount>
    </ingredient>
    <ingredient>
      <name>Вершковий крем</name>
      <amount>300</amount>
    </ingredient>
    <ingredient>
      <name>Цукор</name>
      <amount>100</amount>
    </ingredient>
    <recipe>Розкачайте листкове тісто, випікайте шари, змащуйте вершковим кремом та складіть торт.</recipe>
    <calories>900</calories>
  </dish>

  <dish>
    <type>Основна страва</type>
    <name>Плов</name>
    <measure>грам</measure>
    <ingredient>
      <name>Рис</name>
      <amount>300</amount>
    </ingredient>
    <ingredient>
      <name>М'ясо</name>
      <amount>400</amount>
    </ingredient>
    <ingredient>
      <name>Морква</name>
      <amount>100</amount>
    </ingredient>
    <ingredient>
      <name>Цибуля</name>
      <amount>100</amount>
    </ingredient>
    <recipe>Обсмажте м'ясо з цибулею та морквою, додайте рис, залийте водою та тушкуйте до готовності.</recipe>
    <calories>600</calories>
  </dish>

  <dish>
    <type>Суп</type>
    <name>Курячий бульйон</name>
    <measure>літр</measure>
    <ingredient>
      <name>Курка</name>
      <amount>500</amount>
    </ingredient>
    <ingredient>
      <name>Морква</name>
      <amount>100</amount>
    </ingredient>
    <ingredient>
      <name>Цибуля</name>
      <amount>100</amount>
    </ingredient>
    <recipe>Варіть курку з морквою та цибулею на повільному вогні, додайте спеції за смаком.</recipe>
    <calories>350</calories>
  </dish>

  <dish>
    <type>Салат</type>
    <name>Грецький салат</name>
    <measure>грам</measure>
    <ingredient>
      <name>Огірок</name>
      <amount>200</amount>
    </ingredient>
    <ingredient>
      <name>Помідор</name>
      <amount>200</amount>
    </ingredient>
    <ingredient>
      <name>Сир фета</name>
      <amount>150</amount>
    </ingredient>
    <ingredient>
      <name>Оливки</name>
      <amount>50</amount>
    </ingredient>
    <recipe>Наріжте овочі, додайте сир фета та оливки, приправте оливковою олією та орегано.</recipe>
    <calories>300</calories>
  </dish>

  <dish>
    <type>Десерт</type>
    <name>Чізкейк</name>
    <measure>грам</measure>
    <ingredient>
      <name>Печиво</name>
      <amount>200</amount>
    </ingredient>
    <ingredient>
      <name>Сир маскарпоне</name>
      <amount>400</amount>
    </ingredient>
    <ingredient>
      <name>Цукор</name>
      <amount>100</amount>
    </ingredient>
    <recipe>Змішайте подрібнене печиво з маскарпоне та цукром, випікайте в духовці до готовності.</recipe>
    <calories>800</calories>
  </dish>

  <dish>
    <type>Основна страва</type>
    <name>Смажена риба</name>
    <measure>грам</measure>
    <ingredient>
      <name>Риба</name>
      <amount>300</amount>
    </ingredient>
    <ingredient>
      <name>Олія</name>
      <amount>50</amount>
    </ingredient>
    <recipe>Обсмажте рибу на олії до золотистої скоринки, додайте приправи за смаком.</recipe>
    <calories>450</calories>
  </dish>

  <dish>
    <type>Салат</type>
    <name>Цезар</name>
    <measure>грам</measure>
    <ingredient>
      <name>Курка</name>
      <amount>200</amount>
    </ingredient>
    <ingredient>
      <name>Салат айсберг</name>
      <amount>150</amount>
    </ingredient>
    <ingredient>
      <name>Сир пармезан</name>
      <amount>50</amount>
    </ingredient>
    <ingredient>
      <name>Грінки</name>
      <amount>50</amount>
    </ingredient>
    <recipe>Обсмажте курку, наріжте салат, додайте грінки та сир, заправте соусом цезар.</recipe>
    <calories>400</calories>
  </dish>
  
</cookbook>
`
      },
      {
        file: 'sort-by-calories.xsl',
        code: 
  `<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Головний шаблон для обробки документа -->
    <xsl:template match="/">
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          tr:hover {
            background-color: #f1f1f1;
          }
          p {
            margin: 0;
          }
        </style>
      </head>
      <body>
        <h2>Рецепти, відсортовані за калоріями</h2>
        <table>
          <tr>
            <th>Назва страви</th>
            <th>Тип</th>
            <th>Калорії</th>
            <th>Інгредієнти</th>
            <th>Рецепт</th>
          </tr>
          <!-- Сортування страв за калоріями -->
          <xsl:for-each select="cookbook/dish">
            <xsl:sort select="calories" data-type="number" order="ascending"/>
            <tr>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="type"/></td>
              <td><xsl:value-of select="calories"/></td>
              <td>
                <xsl:for-each select="ingredient">
                  <p><xsl:value-of select="name"/>: <xsl:value-of select="amount"/> <xsl:value-of select="../measure"/></p>
                </xsl:for-each>
              </td>
              <td><xsl:value-of select="recipe"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
      </html>
    </xsl:template>
  </xsl:stylesheet>;
`
      },
      {
        file: 'filter-by-type.xsl',
        code: 
  `<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <!-- Головний шаблон для обробки документа -->
    <xsl:template match="/">
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          h2 {
            text-align: center;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          tr:hover {
            background-color: #f1f1f1;
          }
          p {
            margin: 0;
          }
        </style>
      </head>
      <body>
        <h2>Рецепти: Основні страви</h2>
        <table>
          <tr>
            <th>Назва страви</th>
            <th>Тип</th>
            <th>Калорії</th>
            <th>Інгредієнти</th>
            <th>Рецепт</th>
          </tr>
          <!-- Фільтрація за типом страви -->
          <xsl:for-each select="cookbook/dish">
            <xsl:if test="type = 'Основна страва'">
              <tr>
                <td><xsl:value-of select="name"/></td>
                <td><xsl:value-of select="type"/></td>
                <td><xsl:value-of select="calories"/></td>
                <td>
                  <xsl:for-each select="ingredient">
                    <p><xsl:value-of select="name"/>: <xsl:value-of select="amount"/> <xsl:value-of select="../measure"/></p>
                  </xsl:for-each>
                </td>
                <td><xsl:value-of select="recipe"/></td>
              </tr>
            </xsl:if>
          </xsl:for-each>
        </table>
      </body>
      </html>
    </xsl:template>
  </xsl:stylesheet>
`
      },
    ]
  }
];

export { labs };