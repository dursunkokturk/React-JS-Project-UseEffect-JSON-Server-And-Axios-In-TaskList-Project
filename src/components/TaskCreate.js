import { useState } from 'react';

// Task Create Sablonunu Olusturuyoruz
function TaskCreate({ onCreate, task, taskformUpdate, onUpdate }) {

  // Form Uzerindeki Input a Girilen Data yi 
  // useState Ile
  // title Degiskenine Atama Yapiyoruz
  // useState Icinde title Girilmedi Ise Input Bos Geciyoruz
  const [title, setTitle] = useState(task ? task.title : '');

  // useState Icinde description Girilmedi Ise Input Bos Geciyoruz
  const [taskDescription, setTaskDescription] = useState(task ? task.taskDescription : '');

  // setTitle Degiskeni Uzerinden Gelen Data yi 
  // event Parametresi Uzerinden 
  // handleChange Fonksiyonunun Cagirildigi Yerde
  // Kullanilmasini Sagliyoruz
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTaskDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Task Uzerindeki 
    // Update Butonuna Tiklandiginda
    // Update Islemi Icin Gereken Kisim Acilacak
    if (taskformUpdate) {

      // Update Islemi Icin 
      // Task in id Bilgisini Ve 
      // Description Bilgisini Aliyoruz
      onUpdate(task.id, title, taskDescription);

      // Task Uzerindeki
      // Update Butonuna Tiklanmadiginda
      // Task Normal Durumda Gorunecek
    } else {
      onCreate(title, taskDescription);
    }

    // Task Ekleme Isleminden Sonra Input un Icini Siliyoruz
    setTitle('');

    // Task Ekleme Isleminden Sonra Input un Icini Siliyoruz
    setTaskDescription('');
  };

  return (
    <div>
      {' '}
      {taskformUpdate ? (

        // Update Butonuna Tiklandiginda Gorunecek Form Duzeni
        <div className="task-update">
          <h3>Please Taskı Edit!</h3>
          <form className="task-form">
            <label className="task-label">Title Edit</label>
            <input
              value={title}
              onChange={handleTitleChange}
              className="task-input"
            />
            <label className="task-label">Task Edit!</label>
            <textarea
              value={taskDescription}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />
            <button
              className="task-button update-button"
              onClick={handleSubmit}
            >
              Update
            </button>
          </form>
        </div>
      ) : (

        // Update Butonuna Tiklanmadiginda Gorunecek Form Duzeni
        <div className="task-create">
          <h3>Please Task Add!</h3>
          <form className="task-form">
            <label className="task-label">Title</label>

            {/* Input Alanina Girilen Degeri title Degiskeni Uzerinden
                onChange Metodu Icinde 
                handleChange Metodu Ile Aliyoruz*/}
            <input
              value={title}
              onChange={handleTitleChange}
              className="task-input"
            />
            <label className="task-label">Task Enter!</label>
            <textarea
              value={taskDescription}
              onChange={handleTaskChange}
              className="task-input"
              rows={5}
            />

            {/* Butona Tiklandiginda Title Ve Task Add Alanlarina Girilen Bilgileri Aliyoruz */}
            <button className="task-button" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskCreate;