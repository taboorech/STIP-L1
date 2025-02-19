import requestImage from '@/assets/screens/lab3/request.png';
import loadingImage from '@/assets/screens/lab3/loading.png';
import responseImage from '@/assets/screens/lab3/response.png';
import networkResponseImage from '@/assets/screens/lab3/network-response.png';

const Lab3 = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Звіт про отримання замовлень</h1>
      
      <section className="text-center">
        <h2 className="text-xl font-semibold">1. Запит на отримання замовлень</h2>
        <img src={requestImage} alt="Запит на отримання замовлень" className="w-[60%] mx-auto border rounded-lg shadow-md" />
      </section>
      
      <section className="text-center">
        <h2 className="text-xl font-semibold">2. Очікування відповіді</h2>
        <img src={loadingImage} alt="Очікування відповіді" className="w-[60%] mx-auto border rounded-lg shadow-md" />
      </section>
      
      <section className="text-center">
        <h2 className="text-xl font-semibold">3. Отриманий результат</h2>
        <img src={responseImage} alt="Отриманий результат" className="w-[60%] mx-auto border rounded-lg shadow-md" />
      </section>
      
      <section className="text-center">
        <h2 className="text-xl font-semibold">4. Відповідь у вкладці Network</h2>
        <img src={networkResponseImage} alt="Відповідь у вкладці Network" className="w-[60%] mx-auto border rounded-lg shadow-md" />
      </section>
    </div>
  );
};

export default Lab3;
