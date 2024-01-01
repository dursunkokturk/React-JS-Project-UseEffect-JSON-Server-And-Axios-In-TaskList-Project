import TaskShow from './TaskShow';

// App.js Dosyasindaki tasks Degiskeni Uzerinden
// Girilen Task Bilgilerinin Oldugu Task Bilgilerini 
// tasks Parametresi Uzerinden Aliyoruz
function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <div className="task-list">

      {/* tasks Degiskeni Uzerinden Gelen Array Icindeki Bilgileri
          map Fonksiyonu Ile Geziyoruz */}
      {tasks.map((task, index) => {

        // key Ve value Degerlerine Gore Ekrana Yazdiriyoruz
        // Girilen Task a Verilen id Bilgisini onDelete Metoduna Veriyoruz
        return (

          // TaskShow.js Dosyasinda 
          // TaskShow Props unda Yapilan 
          // Delete Ve Update Islemlerinin Sonucunu
          // indis Numarasi Uzerinden Listeliyoruz
          <TaskShow
            key={index}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
    </div>
  );
}

export default TaskList;