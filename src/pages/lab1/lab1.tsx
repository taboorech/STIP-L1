import image1 from '@/assets/screens/lab1/1.png';
import image2 from '@/assets/screens/lab1/2.png';
import image3 from '@/assets/screens/lab1/3.png';
import image4_1 from '@/assets/screens/lab1/4-1.png';
import image4_2 from '@/assets/screens/lab1/4-2.png';
import image5_1 from '@/assets/screens/lab1/5-1.png';
import image5_2 from '@/assets/screens/lab1/5-2.png';
import image6_1 from '@/assets/screens/lab1/6-1.png';
import image6_2 from '@/assets/screens/lab1/6-2.png';
import image7 from '@/assets/screens/lab1/7.png';
import image8_1 from '@/assets/screens/lab1/8-1.png';
import image8_2 from '@/assets/screens/lab1/8-2.png';

const Lab1 = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Звіт з лабораторної роботи</h1>
      
      <section className="border-l-4 border-blue-500 pl-4">
        <h2 className="text-xl font-semibold text-blue-600">1. Отримання головної сторінки</h2>
        <img src={image1} alt="Головна сторінка (GET)" className="border mx-auto w-[50%] rounded-lg shadow-md" />
      </section>

      <section className="border-l-4 border-green-500 pl-4">
        <h2 className="text-xl font-semibold text-green-600">2. Інформація про сервер</h2>
        <img src={image2} alt="Інформація про сервер" className="border mx-auto w-[50%] rounded-lg shadow-md" />
      </section>

      <section className="border-l-4 border-red-500 pl-4">
        <h2 className="text-xl font-semibold text-red-600">3. Запит неіснуючого документа</h2>
        <img src={image3} alt="Помилка 404" className="border mx-auto w-[50%] rounded-lg shadow-md" />
      </section>
      
      <section className="border-l-4 border-yellow-500 pl-4">
        <h2 className="text-xl font-semibold text-yellow-600">4. Отримання документів за посиланнями</h2>
        <div className="grid grid-cols-2 gap-4">
          <img src={image4_1} alt="Документ 1" className="border mx-auto w-[80%] rounded-lg shadow-md" />
          <img src={image4_2} alt="Документ 2" className="border mx-auto w-[80%] rounded-lg shadow-md" />
        </div>
      </section>

      <section className="border-l-4 border-purple-500 pl-4">
        <h2 className="text-xl font-semibold text-purple-600">5. Запит частини документа</h2>
        <div className="grid grid-cols-2 gap-4">
          <img src={image5_1} alt="Перші 15 байт" className="border mx-auto w-[80%] rounded-lg shadow-md" />
          <img src={image5_2} alt="Останні 7 байт" className="border mx-auto w-[80%] rounded-lg shadow-md" />
        </div>
      </section>
      
      <section className="border-l-4 border-indigo-500 pl-4">
        <h2 className="text-xl font-semibold text-indigo-600">6. Запити PUT та DELETE</h2>
        <div className="grid grid-cols-2 gap-4">
          <img src={image6_1} alt="PUT запит" className="border mx-auto w-[80%] rounded-lg shadow-md" />
          <img src={image6_2} alt="DELETE запит" className="border mx-auto w-[80%] rounded-lg shadow-md" />
        </div>
      </section>
      
      <section className="border-l-4 border-teal-500 pl-4">
        <h2 className="text-xl font-semibold text-teal-600">7. Інформація про сервер (OPTIONS)</h2>
        <img src={image7} alt="OPTIONS запит" className="border mx-auto w-[50%] rounded-lg shadow-md" />
      </section>
      
      <section className="border-l-4 border-gray-500 pl-4">
        <h2 className="text-xl font-semibold text-gray-600">8. Використання TRACE</h2>
        <div className="grid grid-cols-2 gap-4">
          <img src={image8_1} alt="TRACE запит 1" className="border mx-auto w-[80%] rounded-lg shadow-md" />
          <img src={image8_2} alt="TRACE запит 2" className="border mx-auto w-[80%] rounded-lg shadow-md" />
        </div>
      </section>
    </div>
  );
};

export default Lab1;