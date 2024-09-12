import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import { Lab } from "../../types/lab.type";
import ReportBlock from "../../components/ReportBlock/ReportBlock";
import { labs as savedLabs } from "../../assets/labs";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Home = () => {

  const { lab } = useParams();

  const [labs, setLabs] = useState<Lab[]>([]);
  const [activeLab, setActiveLab] = useState<string | null>(null);
  const [slideBarOpen, setSlideBarOpen] = useState<boolean>(false);

  useEffect(() => {
    setLabs(savedLabs);
  }, []);

  useEffect(() => {
    setActiveLab(lab || null);
    const newTitle = labs.find(({ id }) => id === lab)?.title;
    if(newTitle)
      document.title = newTitle;
  }, [lab]);

  const fillLabs = labs.map(({ id, title }) => 
    <Link key={`lab-${id}`} to={`/${id}`} className={classNames(activeLab === id && 'bg-gray-50 font-semibold')}>
      <li className="hover:bg-gray-100 p-4 cursor-pointer">
        { title }
      </li>
    </Link>
  )

  return (
    <div className="flex flex-row">
      <div className={classNames("md:hidden absolute text-4xl left-0 transition-all duration-300 ease-in-out", slideBarOpen && 'left-1/2')}>
        { !slideBarOpen ?
          <MdMenu className="cursor-pointer" onClick={() => setSlideBarOpen(true)}/>
          :
          <IoMdClose className="cursor-pointer" onClick={() => setSlideBarOpen(false)}/>
        }
      </div>
      <div 
        className={classNames("bg-white absolute md:relative w-1/2 md:w-1/4 transition-all duration-300 ease-in-out h-full", !slideBarOpen && '-translate-x-full md:translate-x-0')}
      >
        <ul className="list-none flex flex-col">
          { fillLabs }
        </ul>
      </div>

      <div className="w-full md:w-3/4 bg-white p-6 rounded-lg mt-5 md:mt-0">
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

export default Home;