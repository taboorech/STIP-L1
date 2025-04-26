import postmanTestImg from "../../assets/screens/lab7/postman-test.png";

const Lab7 = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Лабораторна робота №7 — Реалізація Webhook за допомогою Firebase Functions
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Опис роботи</h2>
        <p>
          У ході виконання лабораторної роботи було реалізовано серверлес-функцію за допомогою
          Firebase Functions. Функція обробляє HTTP-запити (Webhook), отримує дані з запиту та
          повертає у відповідь повідомлення з інформацією про розробника, тему роботи, час запиту
          та випадкову мотиваційну цитату. Було виконано деплой функції на платформі Firebase та
          проведено тестування через Postman.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Скріншоти виконання</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 mt-8">1. Тестування функції через Postman</h3>
            <p className="text-sm mt-2 mb-2 flex gap-3">
              Посилання для тестування:
              <a href="https://helloworld-5dw62me6la-uc.a.run.app" className="text-blue-500 underline">hello-world app</a>
            </p>
            <img src={postmanTestImg} alt="Postman Test Screenshot" className="border-2 border-gray-300 rounded-md shadow-md" />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Висновок</h2>
        <p>
          У результаті лабораторної роботи було успішно створено та задеплоєно функцію, яка
          обробляє Webhook-запити за допомогою Firebase Functions. Отримано практичні навички
          у створенні серверлес-функцій, налаштуванні HTTP-тригерів та роботі з Firebase CLI.
          Функція успішно обробляє запити та повертає необхідні дані у форматі JSON.
        </p>
      </section>
    </div>
  );
}

export default Lab7;