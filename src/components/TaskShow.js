import { useState } from 'react';
import TaskCreate from './TaskCreate';

// Girilen Tum Tasklari Yazdiriyoruz
// onDelete Degiskenine Gonderilen Deger
// TaskList.js Dosyasindan Geliyor
function TaskShow({ task, onDelete, onUpdate }) {
  const [showEdit, setShowEdit] = useState(false);
  const handleDeleteClick = () => {
    onDelete(task.id);
  };

  // Update Butonuna Tiklandiginda
  const handleEditClick = () => {

    // Task Gorunumunu Kapatip
    // Task Gorunumunu Update Durumuna Aliyoruz
    setShowEdit(!showEdit);
  };

  // Update Islemi Yapilan Task Icin id, title ve description Alanlarinin
  // Guncel Halini Aliyoruz
  const handleSubmit = (id, updatedTitle, updatedTaskDescription) => {

    // Formun Update Halini Kapatiyoruz
    setShowEdit(false);

    // TaskCreate.js Dosyasindaki 
    // onUpdate Props una Bilgilerin Guncel Halini Gonderiyoruz
    onUpdate(id, updatedTitle, updatedTaskDescription);
  };

  // console.log(task);
  return (
    <div className="task-show">
      {showEdit ? (

        // Update Butonuna Tiklandiginda 
        // taskformUpdate Degiskenine true Degerini Gonderip
        // Update Kisminin Gorunmesini Sagliyoruz
        // TaskCreate.js Dosyasindaki onUpdate Props u Uzerinden 
        // handleSubmit Fonksiyonuna Gidip Update Isleminin Bitirilmesini Sagliyoruz
        <TaskCreate task={task} taskformUpdate={true} onUpdate={handleSubmit} />
      ) : (

        // Update Butonuna Tiklanmadiginda 
        // Normal Task Gorunumunde Kalacak
        <div>
          <h3 className="task-title">Your Task</h3>
          <p>{task.title}</p>
          <h3 className="task-title">To Do</h3>
          <p>{task.taskDescription}</p>
          <div>
            <button className="task-delete" onClick={handleDeleteClick}>
              Delete
            </button>
            <button className="task-edit" onClick={handleEditClick}>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskShow;