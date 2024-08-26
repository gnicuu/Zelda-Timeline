import { useState, useEffect } from 'react';
import FormModal from './components/FormModal.jsx';

const zeldaLink = 'https://gist.githubusercontent.com/bertez/8e62741154903c35edb3bfb825a7f052/raw/b5cd5137fd168116cc71740f1fbb75819d0fa82e/zelda-timeline.json';

function App() {
  const [zelda, setZelda] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(zeldaLink)
      .then(response => response.json())
      .then(data => setZelda(data.sort((a, b) => b.date - a.date)));
  }, []);

  const handleAddGame = (newgame) => {
    const updatedZelda = [...zelda, newgame].sort((a, b) => b.date - a.date);
    setZelda(updatedZelda);
    setModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedZelda = [...zelda];
    updatedZelda.splice(index, 1);
    setZelda(updatedZelda);
  };

  return (
    <>
      <header className="text-3xl font-bold mb-6 ml-6 mt-10">
        The Legend of Zelda Timeline
      </header>
      <main>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-9 mx-6">
          {zelda.map((item, index) => (
            <li
              key={index}
              className="bg-card rounded-lg shadow-lg max-w-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl bg-slate-50 flex flex-col justify-between h-full"
            >
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <article className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="mb-4">{item.date}</p>
                  <p className="text-sm mb-4 max-h-52 overflow-auto break-words">{item.text}</p>
                </div>
                <div className="flex justify-end mt-auto">
                  <button
                    onClick={() => handleDelete(index)}
                    className="material-symbols-outlined transition duration-300 ease-in-out transform hover:scale-125 hover:bg-red-500"
                  >
                    delete
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-black text-white mt-6 mb-6 px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        >
          Add New Game
        </button>
      </div>
      {modalOpen && (
        <FormModal onSubmit={handleAddGame} onCancel={() => setModalOpen(false)} />
      )}
    </>
  );
}

export default App;
