import loggerExample from "../../assets/screens/lab4/logger-example.png";
import randomAnimal from "../../assets/screens/lab4/random-animal.png";
import reverseNumberError from "../../assets/screens/lab4/reverse-number-error.png";
import reverseNumber from "../../assets/screens/lab4/reverse-number.png";

const images = [
  loggerExample,
  randomAnimal,
  reverseNumberError,
  reverseNumber,
];

const Lab4 = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-6">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden">
            <img
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full max-h-[500px] object-contain transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lab4;