import chatAndApps from "../../assets/screens/lab5/chat-and-apps.png";
import postmanAuth from "../../assets/screens/lab5/postman-auth.png";
import swaggerDoc from "../../assets/screens/lab5/swagger-docs.png";
import dbSchema from "../../assets/screens/lab5/db-schema.png";

const Lab5 = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center">Лабораторна робота №5</h1>
      <h2 className="text-lg text-center text-gray-600">
        Реалізація вебзастосунку з авторизацією та обробкою заявок
      </h2>

      <section>
        <h2 className="text-xl font-semibold mb-4">Використані технології</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>React — побудова інтерфейсу</li>
          <li>Node.js + Express + TypeScript — серверна логіка</li>
          <li>JWT — автентифікація користувачів</li>
          <li>Socket.IO — чат у реальному часі</li>
          <li>Objection.js — ORM для роботи з БД</li>
          <li>MySQL — база даних</li>
          <li>Swagger — документація API</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Опис реалізації</h2>
        <p className="leading-relaxed">
          У межах лабораторної реалізовано повноцінний вебзастосунок із
          підтримкою автентифікації, створенням і переглядом заявок, а також
          чатом між користувачем та адміністратором. Обмін повідомленнями
          відбувається в режимі реального часу за допомогою Socket.IO.
          Документація API реалізована через Swagger. Робота з базою даних
          здійснюється за допомогою ORM Objection.js.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Скріншоти інтерфейсу</h2>
        <div className="space-y-6">
          <div>
            <img src={chatAndApps} alt="Чат і Заявки" className="rounded-xl shadow" />
            <p className="mt-2 text-center text-sm text-gray-600">Інтерфейс користувача: чат і заявки</p>
          </div>
          <div>
            <img src={postmanAuth} alt="Postman Auth" className="rounded-xl shadow" />
            <p className="mt-2 text-center text-sm text-gray-600">Авторизація через Postman</p>
          </div>
          <div>
            <img src={swaggerDoc} alt="Swagger Docs" className="rounded-xl shadow" />
            <p className="mt-2 text-center text-sm text-gray-600">Swagger-документація API</p>
          </div>
          <div>
            <img src={dbSchema} alt="База Даних" className="rounded-xl shadow" />
            <p className="mt-2 text-center text-sm text-gray-600">Структура бази даних</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lab5;