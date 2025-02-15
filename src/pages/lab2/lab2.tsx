import GetPostman from "../../assets/screens/GetPostman.png";
import GetPostmanHeader from "../../assets/screens/GetPostmanHeader.png";
import PostPostman from "../../assets/screens/PostPostman.png";
import LocalGet from "../../assets/screens/LocalGet.png";
import ReportContent from "../../components/ReportContent/ReportContent";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { labs } from "../../assets/labs";

const Lab2 = () => {
  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-4">Відповіді на запитання</h2>

        <div className="border p-6 rounded-lg bg-gray-50 shadow-md space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-blue-600">Завдання 1</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-blue-600">Типи HTTP-запитів:</strong> GET.
              </li>
              <li>
                <strong className="text-blue-600">Заголовки запитів:</strong> 
                <ul className="list-disc pl-6 space-y-1">
                  <li>User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36</li>
                  <li>Host: (не вказано – використовується за замовчуванням сервером)</li>
                  <li>Content-Type: (не вказано – сервер обробляє як text/plain або application/octet-stream)</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold text-green-600">Завдання 2</h3>
            <strong className="text-blue-600">Чи змінилася відповідь сервера після додавання заголовка?</strong>
            <p className="mt-1">Відповідь не змінилася після додавання заголовку.</p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-semibold text-red-600">Завдання 3</h3>
            <ul>
              <li>
                <strong className="text-blue-600">Який статусний код відповіді було отримано?</strong>
                <p className="mt-1">Статусний код: <span className="text-green-600">201 Created</span></p>
              </li>
              <li>
                <strong className="text-blue-600">Які заголовки були використані у відповіді сервера?</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Content-Type: application/json; charset=utf-8</li>
                  <li>Date: Sat, 15 Feb 2025 11:13:51 GMT</li>
                  <li>Content-Length: 151</li>
                  <li>Connection: keep-alive</li>
                  <li>X-Powered-By: Express</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="text-lg font-semibold text-yellow-600">Завдання 4</h3>
            <ul>
              <li>
                <strong className="text-blue-600">Який статусний код відповіді повертає сервер?</strong>
                <p className="mt-1">Статусний код: <span className="text-green-600">200 OK</span></p>
              </li>
              <li>
                <strong className="text-blue-600">Який заголовок встановлено у відповіді сервера?</strong>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>X-Powered-By: Express</li>
                  <li>Vary: Origin</li>
                  <li>Content-Type: application/json; charset=utf-8</li>
                  <li>Content-Length: 36</li>
                  <li>ETag: W/"24-F7V4pjNKzzxDkus6p0si1v0BSkI"</li>
                  <li>Date: Sat, 15 Feb 2025 11:46:11 GMT</li>
                  <li>Connection: keep-alive</li>
                  <li>Keep-Alive: timeout=5</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Відповіді на контрольні запитання</h2>
        <div className="border p-6 rounded-lg bg-gray-50 shadow-md">
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong className="text-blue-600">Що таке HTTP і які його основні методи?</strong>
              <p className="mt-1">HTTP (HyperText Transfer Protocol) - це протокол передачі гіпертексту, що використовується для зв'язку між клієнтом і сервером. Основні методи: GET, POST, PUT, DELETE, PATCH.</p>
            </li>
            <li>
              <strong className="text-blue-600">Для чого використовуються заголовки HTTP?</strong>
              <p className="mt-1">Заголовки HTTP використовуються для передачі метаінформації між клієнтом і сервером, наприклад, інформації про тип контенту (Content-Type), кешування (Cache-Control), ідентифікації користувача (User-Agent) тощо.</p>
            </li>
            <li>
              <strong className="text-blue-600">Які групи статусних кодів ви знаєте?</strong>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>1xx - Інформаційні (Informational)</li>
                <li>2xx - Успішні (Success)</li>
                <li>3xx - Перенаправлення (Redirection)</li>
                <li>4xx - Помилки клієнта (Client Errors)</li>
                <li>5xx - Помилки сервера (Server Errors)</li>
              </ul>
            </li>
            <li>
              <strong className="text-blue-600">Що таке REST API та його основні принципи?</strong>
              <p className="mt-1">REST API (Representational State Transfer) - це архітектурний стиль для побудови веб-сервісів, що базується на використанні стандартних HTTP-методів. Основні принципи:</p>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li>Клієнт-серверна архітектура</li>
                <li>Відсутність стану (Stateless)</li>
                <li>Кешування</li>
                <li>Єдиний інтерфейс</li>
                <li>Шарова система (Layered System)</li>
              </ul>
            </li>
            <li>
              <strong className="text-blue-600">Як HTTPS захищає передачу даних у мережі?</strong>
              <p className="mt-1">HTTPS використовує протокол TLS/SSL для шифрування даних, що передаються між клієнтом і сервером. Це запобігає перехопленню, модифікації та підробці даних.</p>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Скриншоти запитів у Postman</h2>
        <div className="grid grid-cols-2 gap-4">
          <img src={GetPostman} alt="Screenshot 1" className="border rounded" />
          <img src={GetPostmanHeader} alt="Screenshot 2" className="border rounded" />
          <img src={PostPostman} alt="Screenshot 3" className="border rounded" />
          <img src={LocalGet} alt="Screenshot 4" className="border rounded" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Код HTTP-сервера</h2>
        <ReportContent>
          { labs[10].codes.map(({ file, code }, index) =>
            <div key={`code-${file}-${index}`}>
              <h3 className="text-center text-xl p-3">{ file }</h3>
              <SyntaxHighlighter 
                language="typescript" 
                style={docco} 
                wrapLongLines={true} 
                codeTagProps={{ className: 'w-full m-0 p-0' }}
                showLineNumbers={true}  
              >
                { code }
              </SyntaxHighlighter>
            </div>
          ) }
        </ReportContent>
      </section>

      <section>
        <h2 className="text-xl font-bold">Висновки</h2>
        <div className="border p-4 rounded bg-gray-100 text-justify">
          У ході лабораторної роботи було досліджено принципи роботи протоколу HTTP, 
          виконано аналіз запитів та відповідей за допомогою браузера та Postman, 
          а також реалізовано простий HTTP-сервер на Node.js. Було розглянуто основні методи HTTP-запитів, 
          їхні заголовки та статусні коди, що дозволило краще зрозуміти взаємодію клієнта і сервера. 
          Отримані результати допомогли закріпити навички роботи з REST API та обробки запитів у веб-додатках.
        </div>
      </section>
    </div>
  );
};

export default Lab2;