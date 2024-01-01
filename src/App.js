import './App.css';

// Task Create Sablonunu Ekrana Yazdirmak Icin
// TaskCreate.js Dosyasini Import Ediyoruz
import TaskCreate from './components/TaskCreate';

// Task Listesini Yazdirmak Icin
// TaskList.js Dosyasini Import Ediyoruz
import TaskList from './components/TaskList';
import { useState } from 'react';

// HTTP Istemcisini Import Ediyoruz
import Axios from 'axios';

// Form Uzerinden Girilen Data nin
// Sayfa Yenilendigi Anda Kaybolmasini Onlemek Icin
// useEffect Componentini Kullaniyoruz
import { useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  /* TaskCreate.js Dosyasinda 
      handleSubmit Fonksiyonundaki
      title ve taskDecription Degiskenlerindeki Degerleri Aliyoruz */
  const createTask = async (title, taskDescription) => {

    // Database e Baglaniyoruz
    const response = await Axios.post('http://localhost:3004/tasks', {

      // id Data si Otomatik Olarak Verilmesini Istedigimiz Icin
      // id Parametresini Yazmiyoruz
      // Database Hangi Data larin Gonderilecegini Belirtiyoruz
      title,
      taskDescription,
    });
    console.log(response);

    // Olusturulacak Task Icin Gerekli Bilgileri Duzenliyoruz
    // Ayni Zamanda Girilen Her Task Bilgisini Ve 
    // En Son Girilen Task Bilgisini Tutuyoruz
    const createdTasks = [
      
      // Olusturulan Task Icin 
      // Ilk Olarak Array Tipi Oldugunu Belirtiyoruz
      ...tasks, 
      response.data
    ];

    // Girilen Tum Task Bilgilerini Aliyoruz
    // Ve Bu Fonksiyon Icindeki tasks Degiskenine Atama Yapiyoruz
    setTasks(createdTasks);
  };

  // Data nin Alinacagi Database e Baglaniyoruz
  const fetchTasks = async () => {
    const response = await Axios.get('http://localhost:3004/tasks');
    debugger;
    setTasks(response.data);
  };

  // Var Data yi Database den Aliyoruz
  useEffect(() => {

    // Database Icindeki Data yi 
    // fetchTasks Metodu Ile Cagiriyoruz
    fetchTasks();

    // App Componentinin Sadece Baslangicta Gorunmesi Icin
    // Bos Array Olusturuyoruz
  }, []);

  // Eklenen Task lar Icinde id Parametresi Uzerinden
  // Task Bilgisini Aliyoruz
  const deleteTaskById = async (id) => {
    await Axios.delete(`http://localhost:3004/tasks/${id}`);

    // filter Fonksiyonu Ile Silme Isleminden Sonra
    const afterDeletingTasks = tasks.filter((task) => {

      // Silinen Task in id Bilgisi Task Listin Icinde Yoksa
      // Task lari Farkli Bir Array Icine Aliyoruz
      return task.id !== id;
    });

    // filter Fonksiyonu Ile Silme Isleminden Sonra
    // Task larin Bulundugu Array i
    // afterDeletingTasks Degiskenini Parametre Olarak Verip
    // setTasks Uzerinden tasks Degiskenine Atama Yapiyoruz
    setTasks(afterDeletingTasks);
  };

  // id Bilgisi Uzerinden Guncellenen Task Bilgilerini Aliyoruz
  const editTaskById = async (id, updatedTitle, updatedTaskDescription) => {
    await Axios.put(`http://localhost:3004/tasks/${id}`, {
      title: updatedTitle,
      taskDescription: updatedTaskDescription,
    });

    // tasks Degiskeni Uzerinden Gelen 
    // Task in Update Edilmis Halini 
    // map Fonksiyonu Ile Tarama Yapiyoruz
    const updatedTasks = tasks.map((task) => {

      // Update Edilmek Istenilen Task Bilgisi Daha Onceden Var Olan Bilgi Ise
      if (task.id === id) {

        // Update Edilen Task Bilgilerini id Bilgisi Uzerinden
        // Onceki Taks Bilgilerini Update Edilmis Hali Ile Degistiriyoruz
        return { id, title: updatedTitle, taskDescription: updatedTaskDescription };
      }

      // Task in Update Edilmis Halini Donduruyoruz
      return task;
    });

    // Task in Update Edilmis Halini
    // setTasks Degiskenine 
    // updatedTasks Degiskenini Parametre Olarak Veriyoruz
    setTasks(updatedTasks);
  };

  return (
    <div className="App">

      {/* Task Creaate Sablonunu Ekrana Yazdiriyoruz */}
      {/* TaskCreate.js Dosyasinda handleSubmit Fonksiyonundaki
          title ve taskDecription Degiskenlerindeki Degerleri Aliyoruz*/}
      <TaskCreate onCreate={createTask} />
      <h1>Tasks</h1>

      {/* TaskList.js Dosyasinda Yapilan Listeleme Isleminde
          Eklenen Tasklari Listeliyoruz */}
      <TaskList
        tasks={tasks}

        /* Silinmek Istenilen Task a Verilen id Bilgisini 
          TaskList.js Dosyasindaki TaskList Props Icinden Cagiriyoruz
          onDelete Metoduna Veriyoruz */
        onDelete={deleteTaskById}

        /* Update Edilen Task id Bilgisini 
          TaskList.js Dosyasindaki TaskList Props Icindeki
          onDelete Metoduna Veriyoruz */
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;