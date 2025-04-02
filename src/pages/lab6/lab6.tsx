import containersImg from "../../assets/screens/lab6/containers.png";
import postmanGetAll from "../../assets/screens/lab6/postman-get-all.png";
import postmanGetOne from "../../assets/screens/lab6/postman-get-one.png";
import postmanPost from "../../assets/screens/lab6/postman-post.png";

const Lab6 = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Звіт: Контейнеризація Node.js з Redis</h1>

      <section>
        <h2 className="text-xl font-semibold">1. Створення Dockerfile</h2>
        <p>
          Створено Dockerfile на базі <code>node:20-slim</code>. У ньому
          встановлюються залежності, виконується компіляція TypeScript коду і
          запускається застосунок з <code>dist/src/entrypoint.js</code>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Docker Compose</h2>
        <p>
          Налаштовано <code>docker-compose.yml</code> з двома сервісами: Node.js
          застосунок (app) та Redis. Сервіси взаємодіють у спільній мережі,
          змінні середовища вказують адресу Redis.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Розгортання у контейнерах</h2>
        <p>
          Проєкт розгорнуто локально командою
          <div>
            <code>docker-compose up</code>.
          </div>
          Контейнери Node.js і Redis
          успішно запущені.
        </p>
        <img src={containersImg} alt="Docker containers screenshot" className="rounded-xl shadow" />
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Перевірка роботи</h2>
        <p>
          Перевірено роботу застосунку за допомогою Postman. Redis доступний з
          Node.js, API коректно обробляє запити:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>GET <code>/api</code> — Отримання всіх записів</li>
          <li>GET <code>/api/:sid</code> — Отримання запису за ключем</li>
          <li>POST <code>/api/:sid</code> — Створення нового запису</li>
        </ul>

        <div className="grid grid-cols-1 gap-4 mt-4">
          <img src={postmanGetAll} alt="GET all from Redis" className="rounded-xl shadow" />
          <img src={postmanGetOne} alt="GET one from Redis" className="rounded-xl shadow" />
          <img src={postmanPost} alt="POST to Redis" className="rounded-xl shadow" />
        </div>
      </section>
    </div>
  );
};

export default Lab6;