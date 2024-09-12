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
  }
];

export { labs };