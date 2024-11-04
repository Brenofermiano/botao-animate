import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CgArrowRight } from "react-icons/cg";

function App() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.mensagem) {
      notify("error", "Por favor, preencha todos os campos.");
    } else {
      notify("success", "Mensagem enviada com sucesso!");
      setFormData({ nome: "", email: "", mensagem: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={toggleForm}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-600 flex items-center gap-2"
      >
        Entre
        <CgArrowRight />
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md mx-auto relative">
            <h4 className="font-semibold text-lg mb-4">Envie-nos uma mensagem</h4>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-md focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                value={formData.email}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-md focus:outline-none"
                required
              />
              <textarea
                name="mensagem"
                placeholder="Sua mensagem"
                value={formData.mensagem}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-md focus:outline-none"
                rows="4"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-600"
              >
                Enviar
              </button>
            </form>
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default App;
