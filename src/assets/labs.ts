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
  },
  {
    id: '10',
    title: 'Лабораторна робота 10',
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
        path: 'https://stip-l10.vercel.app/'
      }
    ],
    conditionPath: 'https://docs.google.com/document/d/18tU_oAqB9MIvkYJLqQvS4d6xt5Ix-INq/edit?usp=sharing',
    codes: [
      {
        file: 'Home.tsx',
        code: 
  `import { useState, useEffect } from 'react';

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

const numberToWords = (num: string) => {
  const words: { [key: string]: string } = {
    "0": "нуль", "1": "один", "2": "два", "3": "три",
    "4": "чотири", "5": "п'ять", "6": "шість", "7": "сім",
    "8": "вісім", "9": "дев'ять",
  };

  return num.split('').map(digit => words[digit] || digit).join(' ');
};

const Home = () => {
  const [dishes, setDishes] = useState<any[]>([]);
  const [displayMode, setDisplayMode] = useState<string>('text');

  useEffect(() => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData.trim(), 'application/xml');
    const parsedDishes = parseXML(xmlDoc);
    setDishes(parsedDishes);
  }, []);

  const renderDishes = () => {
    switch (displayMode) {
      case 'text':
        return (
          <div className="space-y-4">
            {dishes.map((dish, index) => (
              <div key={index} className="border-b border-gray-300 pb-4 mb-4">
                <p><strong>Тип:</strong> {dish.type}</p>
                <p><strong>Назва:</strong> {dish.name}</p>
                <p><strong>Одиниці виміру:</strong> {dish.measure}</p>
                <p><strong>Інгредієнти:</strong></p>
                <ul className="ml-4 list-disc">
                  {dish.ingredients.map((ingredient: any, idx: number) => (
                    <li key={idx}>{ingredient.name} - {ingredient.amount}</li>
                  ))}
                </ul>
                <p><strong>Рецепт:</strong> {dish.recipe}</p>
                <p><strong>Калорії:</strong> {dish.calories}</p>
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
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
        );

      case 'tableWithWords':
        return (
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
                          <span className="font-semibold">{numberToWords(ingredient.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2 text-justify">{dish.recipe}</td>
                  <td className="border px-4 py-2 text-center">{numberToWords(dish.calories)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список страв</h1>
      <div className="mb-4 space-x-4">
        <select
          value={displayMode}
          onChange={(e) => setDisplayMode(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="text">Текстовий формат</option>
          <option value="table">Таблиця</option>
          <option value="tableWithWords">Таблиця з текстовими числами</option>
        </select>
      </div>

      { renderDishes() }
    </div>
  );
};

export default Home;
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
      }
    ]
  },
  {
    id: '11',
    title: 'Лабораторна робота 2.1',
    results: [
      {
        title: 'Project',
        path: '/lab2-1'
      }
    ],
    conditionPath: 'https://docs.google.com/document/d/1R7TikG5Xm83Yy5jZmNJRkOkNF2vKtwLJmNnzHpV3g38/edit?usp=sharing',
    codes: [
      {
        file: 'server.cjs',
        code: 
  `const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Головна сторінка ('GET /')
app.get('/', (req, res) => {
  res.send('<h1>Welcome to My Server</h1><p><a href="/document1.txt">Document 1</a></p><p><a href="/document2.txt">Document 2</a></p>');
});

// 2. Версія HTTP та заголовки відповіді
app.get('/headers', (req, res) => {
  res.setHeader('Last-Modified', new Date().toUTCString());
  res.json({
    httpVersion: req.httpVersion,
    server: 'Express.js',
    date: new Date().toUTCString(),
    lastModified: new Date().toUTCString()
  });
});

// 4. Статичні файли (імітація документів)
app.get('/document1.txt', (req, res) => {
  res.send('This is document 1');
});

app.get('/document2.txt', (req, res) => {
  res.send('This is document 2');
});

// 5. Читання частини документа через 'Range'
app.get('/somefile.txt', (req, res) => {
  const filePath = path.join(__dirname, 'somefile.txt');

  res.sendFile(filePath);
});

// 6. 'PUT' і 'DELETE'
app.put('/resource', (req, res) => {
  res.send({ message: 'Resource updated successfully' });
});

app.delete('/resource', (req, res) => {
  res.send({ message: 'Resource deleted successfully' });
});

// 7. 'OPTIONS' для перевірки підтримуваних методів
app.options('*', (req, res) => {
  res.setHeader('Allow', 'GET, POST, PUT, DELETE, OPTIONS, TRACE');
  res.send();
});

// 8. 'TRACE'
app.use((req, res, next) => {
  if (req.method === 'TRACE') {
    res.setHeader('Content-Type', 'message/http');

    const traceResponse = '
TRACE \${req.url} HTTP/\${req.httpVersion}
Host: \${req.headers.host}
User-Agent: \${req.headers['user-agent']}
Accept: \${req.headers.accept || 'N/A'}
';

    res.status(200).send(traceResponse);
  } else {
    next();
  }
});

// 3. Обробка неіснуючих запитів
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log('Server running at http://localhost:\${PORT}');
});`
      }
    ]
  },
  {
    id: '12',
    title: 'Лабораторна робота 2.2',
    additionalInfo: [`Варіант 10. https://jsonplaceholder.typicode.com/posts`],
    results: [
      {
        title: 'Project',
        path: '/lab2-2'
      }
    ],
    conditionPath: 'https://docs.google.com/document/d/1VkteOCCkmVZOmbCjZXD_oJpyr_27qGa_/edit?usp=sharing',
    codes: [
      {
        file: 'app.ts',
        code: 
  `import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/error-handler';
import cors from "cors";
import { createDefaultRoutes } from './routes/default-routes';

function createServer() {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:5173'
    ]
  }));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('uploads'));

  // routes
  app.use('/', createDefaultRoutes());

  // error handler
  app.use(errorHandler);

  return app;
}

export { createServer };`
      },
      {
        file: 'entrypoint.ts',
        code: 
  `import "dotenv/config";
import { createServer } from "./app";
import { Application } from "express";

async function boot() {
  let _server: Application | undefined = createServer();
  let serverName: string = "api";

  try {
    const port = parseInt(process.env.PORT || "8080", 10);

    if (_server) {
      _server.listen(port, () => {
        console.log('APP ({serverName}) is running on port {port}');
      });
    }
  } catch (error) {
    console.error('Failed to boot the application', error);
    process.exit(1);
  }
}

boot();`
      },
      {
        file: 'default-routes.ts',
        code: 
  `import { Router } from "express";
import { hello } from "../controllers/default-controllers";

const createDefaultRoutes = () => {
  const router = Router();

  router.get('/', hello);

  return router;
};

export { createDefaultRoutes };`
      },
      {
        file: 'default-controllers.ts',
        code: 
  `import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

const hello = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  res.json({
    message: "Доброго дня!"
  });
});

export { hello };`
      },
      {
        file: 'CustomError.class.ts',
        code: 
  `class CustomError extends Error {
  public statusNumber?: number;

  constructor(message: string, statusNumber?: number) {
    super();
    this.message = message;
    this.statusNumber = statusNumber;
  }
};

export { CustomError };`
      },
      {
        file: 'error-handler.ts',
        code: 
  `import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../libs/classes/CustomError.class';
import { ValidationError } from 'yup';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if(err instanceof ValidationError) {
    res.status(400).send({ errors: [{ message: err.errors }] });
    return next(err);
  }

  res.status(err.statusNumber || 500).send({ errors: [{ message: err.message || "Something went wrong" }] });

  return next(err);
};`
      },
    ]
  },
  {
    id: '13',
    title: 'Лабораторна робота 2.3',
    additionalInfo: [`Варіант 10. Отримати список замовлень користувачів GET /api/orders`],
    results: [
      {
        title: 'Project',
        path: '/lab2-3'
      }
    ],
    conditionPath: 'https://docs.google.com/document/d/1RlJIfEVM7WsoQwCKBq8erR-GOv59oWs6bEyCTa8_pxk/edit?usp=sharing',
    codes: [
      {
        file: 'app.ts',
        code: 
  `import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/error-handler';
import cors from "cors";
import { createOrderRoutes } from './routes/order-routes';

function createServer() {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174'
    ]
  }));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('uploads'));

  // routes
  app.use('/api', createOrderRoutes());

  // error handler
  app.use(errorHandler);

  return app;
}

export { createServer };`
      },
      {
        file: 'entrypoint.ts',
        code: 
  `import "dotenv/config";
import { createServer } from "./app";
import { Application } from "express";

async function boot() {
  let _server: Application | undefined = createServer();
  let serverName: string = "api";

  try {
    const port = parseInt(process.env.PORT || "8080", 10);

    if (_server) {
      _server.listen(port, () => {
        console.log('APP (\${serverName}) is running on port \${port}');
      });
    }
  } catch (error) {
    console.error('Failed to boot the application', error);
    process.exit(1);
  }
}

boot();`
      },
      {
        file: 'order-routes.ts',
        code: 
  `import { Router } from "express";
import { getOrders } from "../controllers/order-controllers";

const createOrderRoutes = () => {
  const router = Router();

  router.get('/orders', getOrders);

  return router;
};

export { createOrderRoutes };`
      },
      {
        file: 'order-controllers.ts',
        code: 
  `import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { OrderStatus } from "../libs/enum/order-status.enum";

const getOrders = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const orders = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    customer: 'Client \${i + 1}',
    items: Math.floor(Math.random() * 10) + 1,
    total: (Math.random() * 500).toFixed(2),
    status: Object.values(OrderStatus)[Math.floor(Math.random() * 3)],
  }));

  res.json({ orders });
});

export { getOrders };`
      },
      {
        file: 'CustomError.class.ts',
        code: 
  `class CustomError extends Error {
  public statusNumber?: number;

  constructor(message: string, statusNumber?: number) {
    super();
    this.message = message;
    this.statusNumber = statusNumber;
  }
};

export { CustomError };`
      },
      {
        file: 'error-handler.ts',
        code: 
  `import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../libs/classes/CustomError.class';
import { ValidationError } from 'yup';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if(err instanceof ValidationError) {
    res.status(400).send({ errors: [{ message: err.errors }] });
    return next(err);
  }

  res.status(err.statusNumber || 500).send({ errors: [{ message: err.message || "Something went wrong" }] });

  return next(err);
};`
      },
      {
        file: 'order-status.enum.ts',
        code: 
  `export enum OrderStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERED = "DELIVERED"
}`
      },
      {
        file: 'Home.tsx',
        code: 
  `import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/root-state.type";
import { OrdersState } from "../../redux/reducers/orders/initialState";
import Button from "../../components/Button/Button";
import { getOrdersRequest } from "../../redux/actions/orders/actions";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner";

const Home = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector<RootState>(state => state.orders) as OrdersState;

  const getOrdersButtonClickHandler = () => {
    dispatch(getOrdersRequest());
  };

  const renderTableContent = () => {
    if(loading) {
      return (
        <tr>
          <td className="py-5 text-center" colSpan={5}>
            <LoadingSpinner
              color="text-green-500"
            />
          </td>
        </tr>
      )
    }

    if(!loading && orders.length > 0) {
      return (
        orders.map(({ id, customer, items, total, status }) => 
          <tr key={'order-\${id}'} className="hover:bg-gray-50">
            <td className="px-4 py-2 text-center border-b">{ id }</td>
            <td className="px-4 py-2 text-center border-b">{ customer }</td>
            <td className="px-4 py-2 text-center border-b">{ items }</td>
            <td className="px-4 py-2 text-center border-b">{ total }</td>
            <td className="px-4 py-2 text-center border-b">{ status }</td>
          </tr>
        )
      )
    }

    return (
      <tr>
        <td colSpan={5} className="text-center py-5">
          No orders
        </td>
      </tr>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Button className="bg-green-500 text-white hover:bg-green-600" onClick={getOrdersButtonClickHandler}>
        Get Orders
      </Button>
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md mt-4">
        <table className="min-w-full table-auto rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-center border-b">Id</th>
              <th className="px-4 py-2 text-center border-b">Customer</th>
              <th className="px-4 py-2 text-center border-b">Items</th>
              <th className="px-4 py-2 text-center border-b">Total</th>
              <th className="px-4 py-2 text-center border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            { renderTableContent() }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;`
      },
      {
        file: 'loading-spinner.tsx',
        code: 
  `import classNames from "classnames";

interface LoadingSpinnerProps {
  color?: string;
}

const LoadingSpinner = ({ color = "text-surface" }: LoadingSpinnerProps) => {
  return (
    <div
      className={classNames(
        "inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent",
        "align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        color
      )}
      role="status"
    >
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;`
      },
      {
        file: 'orders.api.ts',
        code: 
  `import mainInstance from "../../api/mainInstance";

export const getOrders = () =>
  mainInstance.get('/api/orders');`
      },
      {
        file: 'ordersSagas.ts',
        code: 
  `import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { writeErrors } from '../../utils/write-errors';
import { GET_ORDERS_REQUEST } from '../actions/orders/action-types';
import { getOrdersFailure, getOrdersSuccess } from '../actions/orders/actions';
import { getOrders } from '../api/orders.api';
import { GetOrdersResponse } from '../../types/order.type';

function* getOrdersSaga() {
  try {
    const result: AxiosResponse<GetOrdersResponse> = yield call(getOrders);
    yield put(getOrdersSuccess(result.data.orders));
  } catch (error: any) {
    yield writeErrors(error, getOrdersFailure);
  }
}

function* watchAuthSaga() {
  yield takeLatest(GET_ORDERS_REQUEST, getOrdersSaga);
}

function* rootSaga() {
  yield fork(watchAuthSaga);
}

export default rootSaga;`
      },
    ]
  },
  {
    id: '14',
    title: 'Лабораторна робота 2.4',
    additionalInfo: [`Варіант 10. GET-запит на /api/random-animal, який повертає випадкову тварину: {
&quot;animal&quot;: &quot;котик&quot; }.
2. POST-запит на /api/reverse-number, який приймає число і повертає його у
зворотному порядку: { &quot;reversed_number&quot;: &quot;&lt;reversed-number&gt;&quot; }.`],
    results: [{
      title: 'Screens',
      path: '/lab2-4'
    }],
    conditionPath: 'https://docs.google.com/document/d/16eMEkebY2ht_f6QFGevP7GMoy5Q2z-Mx/edit?usp=sharing',
    codes: [
      {
        file: 'app.ts',
        code: 
  `import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/error-handler';
import cors from "cors";
import { createIndexRoutes } from './routes/index/index.routes';
import { requestLogger } from './middleware/logger';
import { callError } from './middleware/call-error';

function createServer() {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174'
    ]
  }));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('uploads'));

  app.use(callError);

  // routes
  app.use('/api', requestLogger, createIndexRoutes());

  // error handler
  app.use(errorHandler);

  return app;
}

export { createServer };`
      },
      {
        file: 'entrypoint.ts',
        code: 
  `import "dotenv/config";
import { createServer } from "./app";
import { Application } from "express";

async function boot() {
  let _server: Application | undefined = createServer();
  let serverName: string = "api";

  try {
    const port = parseInt(process.env.PORT || "8080", 10);

    if (_server) {
      _server.listen(port, () => {
        console.log('APP (\${serverName}) is running on port \${port}');
      });
    }
  } catch (error) {
    console.error('Failed to boot the application', error);
    process.exit(1);
  }
}

boot();`
      },
      {
        file: 'index.routes.ts',
        code: 
  `import { Router } from "express";
import { getRandomAnimal, reverseNumber } from "./index.controller";

const createIndexRoutes = () => {
  const router = Router();

  router.get('/random-animal', getRandomAnimal);
  router.post('/reverse-number', reverseNumber);

  return router;
};

export { createIndexRoutes };`
      },
      {
        file: 'index.controller.ts',
        code: 
  `import { faker } from '@faker-js/faker';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { reverseNumberValidation } from '../../yup/reverse-number.scheme';

const getRandomAnimal = asyncHandler(async (req: Request, res: Response) => {
  const animal = faker.animal.type();

  res.json({ animal });
});

const reverseNumber = asyncHandler(async (req: Request, res: Response) => {
  const { number } = await reverseNumberValidation.validate(req.body, { abortEarly: false });

  const reversedNumber = Number.parseInt([...number.toString()].reverse().join(''));

  res.json({
    original: number, 
    reversed: reversedNumber
  })
});

export { getRandomAnimal, reverseNumber };`
      },
      {
        file: 'CustomError.class.ts',
        code: 
  `class CustomError extends Error {
  public statusNumber: number;

  constructor(statusNumber: number, message: string) {
    super();
    this.message = message;
    this.statusNumber = statusNumber;
  }
};

export { CustomError };`
      },
      {
        file: 'error-handler.ts',
        code: 
  `import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../libs/classes/CustomError.class';
import { ValidationError } from 'yup';
import logger from '../config/logger';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(\`Error: \${err.message} | Status: \${err.statusNumber || 500} | URL: \${req.url}\`);

  if(err instanceof ValidationError) {
    res.status(400).send({ errors: [{ message: err.errors }] });
    return next(err);
  }

  res.status(err.statusNumber || 500).send({ errors: [{ message: err.message || "Something went wrong" }] });

  return next(err);
};`
      },
      {
        file: 'middleware/logger.ts',
        code: 
  `import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(\`Method: \${req.method}, URL: \${req.url}\`);
  
  return next();
};`
      },
      {
        file: 'call-error.ts',
        code: 
  `import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { callErrorValidation } from '../yup/call-error.scheme';
import { CustomError } from '../libs/classes/CustomError.class';

export const callError = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { callError, errorMessage } = await callErrorValidation.validate(req.query, { abortEarly: false });

  if(callError) {
    throw new CustomError(400, errorMessage || 'Unknown error');
  }
  
  return next();
});`
      },
      {
        file: 'config/logger.ts',
        code: 
  `import winston from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return \`[\${timestamp}] \${level.toUpperCase()}: \${message}\`;
  })
);

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log')
    })
  ]
});

export default logger;
`
      },
      {
        file: 'call-error.scheme.ts',
        code: 
  `import * as yup from 'yup';

const callErrorValidation = yup.object().shape({
  callError: yup.boolean().optional(),
  errorMessage: yup.string().optional()
});

export { callErrorValidation };`
      },
      {
        file: 'reverse-number.scheme.ts',
        code: 
  `import * as yup from 'yup';

const reverseNumberValidation = yup.object().shape({
  number: yup.number().required('Number can\'t be empty')
});

export { reverseNumberValidation };`
      },
    ]
  },
  {
    id: '15',
    title: 'Лабораторна робота 2.5',
    additionalInfo: [`Варіант 10. Створити API для системи підтримки: заявки користувачів, статуси, JWT-
аутентифікація, WebSockets для онлайн-чату з підтримкою.`],
    results: [{
      title: 'Report',
      path: '/lab2-5'
    }],
    conditionPath: 'https://docs.google.com/document/d/1yBzpXMy9CwYL23JIFHY4frvEpTL8-gyXnGJFfRBR7Uw/edit?usp=sharing',
    codes: [
      {
        file: 'app.ts',
        code: 
  `import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/error-handler';
import cors from "cors";
import { createAuthRoutes } from './routes/auth/auth.routes';
import { createServer as createServerHttp } from 'http';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { createApplicationRoutes } from './routes/application/application.routes';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'support service',
      version: '1.0.0',
    },
  },
  apis: ['./dist/src/routes/**/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

function createServer() {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:5173'
    ]
  }));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('uploads'));

  // routes
  app.use('/auth', createAuthRoutes());
  app.use('/application', createApplicationRoutes());
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  // error handler
  app.use(errorHandler);

  const httpServer = createServerHttp(app);

  return httpServer;
}

export { createServer };`
      },
      {
        file: 'entrypoint.ts',
        code: 
  `import "dotenv/config";
import { createServer } from "./app";
import { Server } from "http";
import { formSocketHandler } from "./socket";

async function boot() {
  let _server: Server | undefined = createServer();
  let serverName: string = "api";

  try {
    const port = parseInt(process.env.PORT || "5000", 10);

    if (_server) {
      formSocketHandler(_server);
      _server.listen(port, () => {
        console.log(\`APP (\${serverName}) is running on port \${port}\`);
      });
    }
  } catch (error) {
    console.error('Failed to boot the application', error);
    process.exit(1);
  }
}

boot();`
      },
      {
        file: 'socket.ts',
        code: `import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middleware/auth-middleware";
import { UserRole } from "./libs/enum/user-role.enum";
import User from "./models/user.model";

const formSocketHandler = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    },
  });

  io.use(socketAuthMiddleware);

  const sockets = new Map<number, string>();
  const admins: number[] = [];

  io.on("connection", async (socket) => {
    const user = socket.user;
    sockets.set(user.id, socket.id);
  
    console.log(\`✅ \${user.id} connected\`);
  
    if (user.role === UserRole.ADMIN) {
      const users = await User.query().where("role", UserRole.USER);
      const userList = users.map((u) => ({ id: u.id, username: u.email }));
  
      if (!admins.includes(user.id)) {
        admins.push(user.id);
      }

      socket.emit("init_admin", { users: userList, user });
    } else {
      socket.emit("init_user", { message: \`Welcome, \${user.email}\`, user });
    }
  
    socket.on("sendMessage", ({ recipientId, text }) => {
      const senderId = user.id;
  
      const message = {
        senderId,
        recipientId,
        text,
        sentAt: new Date().toISOString()
      };

      const recipientSocketId = sockets.get(recipientId);
      
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("new_message", message);
      }

      if(user.role === UserRole.USER && !recipientId) {
        admins.map((id) => {
          console.log(id);
          
          const adminSocket = sockets.get(id);
          if(adminSocket) {
            io.to(adminSocket).emit("new_message", message)
          }
        })
      }
  
      socket.emit("new_message", message);
    });
  
    socket.on("disconnect", () => {
      sockets.delete(user.id);
      console.log(\`❌ \${user.email} disconnected\`);
    });
  });
}

export { formSocketHandler };`
      },
      {
        file: 'auth.routes.ts',
        code: 
  `/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AuthCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: mysecurepassword
 *     AuthTokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIs...
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIs...
 */

import { Router } from "express";
import { signUp, login, logout, refreshTokens } from "./auth.controller";
import { authMiddleware, refreshMiddleware } from "../../middleware/auth-middleware";

const createAuthRoutes = () => {
  const router = Router();

  /**
   * @swagger
   * /auth/signup:
   *   post:
   *     tags: [Auth]
   *     summary: Register a new user
   *     description: Create a new user account with email and password.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthCredentials'
   *     responses:
   *       201:
   *         description: User successfully registered
   *       400:
   *         description: Invalid input or user already exists
   */
  router.post("/signup", signUp);

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     tags: [Auth]
   *     summary: User login
   *     description: Authenticates user and returns access and refresh tokens.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AuthCredentials'
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthTokens'
   *       401:
   *         description: Invalid credentials
   */
  router.post("/login", login);

  /**
   * @swagger
   * /auth/logout:
   *   get:
   *     tags: [Auth]
   *     summary: Logout user
   *     description: Logs out the currently authenticated user.
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logged out successfully
   *       401:
   *         description: Unauthorized or token missing
   */
  router.get("/logout", authMiddleware, logout);

  /**
   * @swagger
   * /auth/refresh:
   *   get:
   *     tags: [Auth]
   *     summary: Refresh tokens
   *     description: Returns a new access token using a valid refresh token.
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: New access token issued
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthTokens'
   *       401:
   *         description: Invalid or expired refresh token
   */
  router.get("/refresh", refreshMiddleware, refreshTokens);

  return router;
};

export { createAuthRoutes };`
      },
      {
        file: 'auth.controller.ts',
        code: 
  `import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
import { createUserValidation, loginUserValidation, refreshUserTokenValidation } from '../../yup/user.scheme';
import * as bcrypt from "bcrypt";
import User from '../../models/user.model';
import { CustomError } from '../../libs/classes/custom-error.class';
import { generateTokens } from '../../utils/generate-tokens';

const signUp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = await createUserValidation.validate(req.body, { abortEarly: false })

  const securedPassword = await bcrypt.hash(password, 10);

  const user = await User.query().insert({
    email,
    password: securedPassword
  });

  res.status(201).json(user);
});

const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = await loginUserValidation.validate(req.body, { abortEarly: false });
  
  const user = await User.query().findOne({ email });

  if(!user) {
    throw new CustomError(404, 'Wrong user');
  }

  const comparedPasswords = await bcrypt.compare(password, user.password);

  if(!comparedPasswords) {
    throw new CustomError(403, 'Wrong password');
  }

  const tokens = await generateTokens(user);

  res.status(200).json(tokens);
});

const refreshTokens = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const refreshToken = await refreshUserTokenValidation.validate(req.headers.authorization.replace("Bearer ", ""));

  const user = await User.query().findById(req.user.id);

  if(!user) {
    throw new CustomError(404, 'User not found');
  }

  const verifyToken = await bcrypt.compare(refreshToken, user.refreshToken);

  if(!verifyToken) {
    throw new CustomError(403, 'Wrong refresh token');
  }

  const tokens = await generateTokens(user);

  res.status(200).json(tokens);
});

const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await User.query().patchAndFetchById(req.user.id, { refreshToken: null });
  res.status(200).send("Logout successfully");
});

export { signUp, login, logout, refreshTokens };`
      },
      {
        file: 'application.routes.ts',
        code: 
  `import { Router } from 'express';
import { createApplication, getAllApplications } from './application.controller';
import { authMiddleware } from '../../middleware/auth-middleware';

const createApplicationRoutes = () => {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: Applications
   *   description: Application management
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Application:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         user_id:
   *           type: integer
   *           example: 5
   *         status:
   *           type: string
   *           enum: [OPEN, IN_PROGRESS, CLOSED]
   *           example: OPEN
   *         title:
   *           type: string
   *           example: Заявка на доступ
   *         description:
   *           type: string
   *           example: Хочу отримати доступ до системи
   *         created_at:
   *           type: string
   *           format: date-time
   *         updated_at:
   *           type: string
   *           format: date-time
   *     CreateApplicationDto:
   *       type: object
   *       required:
   *         - title
   *         - description
   *       properties:
   *         title:
   *           type: string
   *           example: Заявка на участь
   *         description:
   *           type: string
   *           example: Будь ласка, прийміть мою заявку
   */

  /**
   * @swagger
   * /applications:
   *   post:
   *     tags: [Applications]
   *     summary: Create new application
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateApplicationDto'
   *     responses:
   *       201:
   *         description: Application created successfully
   *       400:
   *         description: Invalid input
   */
  router.post('/', authMiddleware, createApplication);

  /**
   * @swagger
   * /applications:
   *   get:
   *     tags: [Applications]
   *     summary: Get all applications
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of applications
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Application'
   */
  router.get('/', authMiddleware, getAllApplications);

  return router;
};

export { createApplicationRoutes };`
      },
      {
        file: 'application.controller.ts',
        code: 
  `import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import Application from '../../models/application.model';
import { ApplicationStatus } from '../../libs/enum/application-status.enum';
import { createApplicationValidation } from '../../yup/application.scheme';

const createApplication = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { title, description } = await createApplicationValidation.validate(req.body, { abortEarly: false });

  await Application.query().insert({
    user_id: req.user.id,
    title,
    description,
    status: ApplicationStatus.OPEN
  });

  res.sendStatus(201);
});

const getAllApplications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const applications = await Application
    .query()
    .withGraphFetched('user')
    .modifyGraph('user', builder => {
      builder.select('id', 'email', 'role')
    });

  res.json(applications);
});

export { createApplication, getAllApplications };`
      },
      {
        file: 'user.scheme.ts',
        code: 
  `import * as yup from "yup";
import { UserRole } from "../libs/enum/user-role.enum";

const createUserValidation = yup.object().shape({
  email: yup.string().trim().email().required('Email is required'),
  password: yup.string().required('Password is required').min(3, 'Password must be at least 8 characters long'),
});

const loginUserValidation = yup.object().shape({
  email: yup.string().trim().email().required('Email is required'),
  password: yup.string().required('Password is required')
});

const refreshUserTokenValidation = yup.string().required("Enter your refreshToken");

const editProfileValidation = yup.object().shape({
  email: yup.string().trim().email().optional(),
  firstName: yup.string().trim().optional(),
  lastName: yup.string().trim().optional(),
  phoneNumber: yup.string().min(4, 'Phone number can\'t contain less than 4 numbers').optional(),
  password: yup.string().optional().min(8, 'Password must be at least 8 characters long'),
});

const changeUserRoleValidation = yup.object().shape({
  user: yup.number().required('User id must contain a value'),
  role: yup.mixed<UserRole>().oneOf(Object.values(UserRole), \`Role must be one of the values: \${Object.values(UserRole).join(', ')}\`).required('User role must contain a value')
});

const updateUserInfoValidation = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  password: yup.string().optional(),
});

const deleteUserValidation = yup.object().shape({
  user: yup.number().required('User ID must contain value')
});

export { 
  createUserValidation, 
  loginUserValidation, 
  refreshUserTokenValidation, 
  editProfileValidation, 
  changeUserRoleValidation,
  updateUserInfoValidation,
  deleteUserValidation 
};`
      },
      {
        file: 'application.scheme.ts',
        code: 
  `import * as yup from 'yup';

const createApplicationValidation = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Title must contain at least 3 symbols')
    .max(50, 'Title must contain less then 50 symbols')
    .required('Title can\'t be empty'),

  description: yup.string().min(10, 'At least 10 symbols').required('Description must contain value')
});

export { createApplicationValidation };`
      },
    ]
  },
  {
    id: '16',
    title: 'Лабораторна робота 2.6',
    additionalInfo: [`Варіант 10. Використання Docker для запуску локального сервера Redis`],
    results: [{
      title: 'Report',
      path: '/lab2-6'
    }],
    conditionPath: 'https://docs.google.com/document/d/1T1aIeWrZGvJbG2-nM9Ihzua3FruziayNcPJ8a3WrBug/edit?usp=sharing',
    codes: [
      {
        file: 'app.ts',
        code: 
  `import express from 'express';
import bodyParser from 'body-parser';
import { errorHandler } from './middlewares/error-handler';
import cors from "cors";
import { createIndexRoutes } from './routes/index/index.routes';

function createServer() {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:5173'
    ]
  }));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('uploads'));

  // routes
  app.use('/api', createIndexRoutes());

  // error handler
  app.use(errorHandler);

  return app;
}

export { createServer };`
      },
      {
        file: 'entrypoint.ts',
        code: 
  `import "dotenv/config";
import { createServer } from "./app";
import { Application } from "express";

async function boot() {
  let _server: Application | undefined = createServer();
  let serverName: string = "api";

  try {
    const port = parseInt(process.env.PORT || "5000", 10);

    if (_server) {
      _server.listen(port, () => {
        console.log(\`APP (\${serverName}) is running on port \${port}\`);
      });
    }
  } catch (error) {
    console.error('Failed to boot the application', error);
    process.exit(1);
  }
}

boot();`
      },
      {
        file: 'redis.ts',
        code: `import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
});

export default redis;`
      },
      {
        file: 'index.routes.ts',
        code: 
  `import { Router } from "express"
import { createRecord, getAllRecords, getRecord } from "./index.controller";

const createIndexRoutes = () => {
  const router = Router();

  router.get('/', getAllRecords);
  router.get('/:sid', getRecord);
  router.post('/:sid', createRecord);

  return router;
}

export { createIndexRoutes };`
      },
      {
        file: 'index.controller.ts',
        code: 
  `import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import redis from "../../config/redis";
import { CustomError } from "../../libs/classes/custom-error.class";

const getAllRecords = asyncHandler(async (req: Request, res: Response) => {
  const keys = await redis.keys("record:*");
  const records: Record<string, string> = {};

  for (const key of keys) {
    const value = await redis.get(key);
    if (value !== null) {
      records[key] = value;
    }
  }

  res.json(records);
});

const getRecord = asyncHandler(async (req: Request, res: Response) => {
  const { sid } = req.params;

  const value = await redis.get(\`record:\${sid}\`);
  if (value === null) {
    throw new CustomError(404, \`Key \${sid} not found\`);
  } else {
    res.json({ key: sid, value });
  }
});

const createRecord = asyncHandler(async (req: Request, res: Response) => {
  const { sid } = req.params;
  const { value } = req.body;

  if (!value) {
    throw new CustomError(400, "Missing 'value' in request body");
  }

  await redis.set(\`record:\${sid}\`, value);

  res.status(201).json({ message: \`Key \${sid} set\`, value });
});

export { getRecord, getAllRecords, createRecord };`
      },
      {
        file: 'Dockerfile',
        code: 
  `FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN tsc

EXPOSE 8080

CMD ["node", "dist/src/entrypoint.js"]`
      },
      {
        file: 'docker-compose.yaml',
        code: 
  `version: '3.9'

name: lab5

services:

  app:
    build: .
    container_name: node_app
    ports:
      - "8080:8080"
    depends_on:
      - redis
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - .:/app
      - /app/node_modules

  redis:
    image: redis:7
    container_name: redis
    ports:
      - "6379:6379"`
      },
    ]
  },
];

export { labs };