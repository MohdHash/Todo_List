 var todoApp = (function(){
    let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');

    console.log('Working');

    async function fetchTodos(){
        //GET request
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();

            tasks=data.slice(0,10);
            renderList();
        }catch(error){
            console.log(error);
        }
        
        
    }

    function addTasktoDOM(task){
        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <i class="fa-regular fa-trash delete" data-id="${task.id}" ></i>
        `

        tasksList.append(li);
    }

    function renderList () {
        tasksList.innerHTML ='';

        for(let i = 0 ; i < tasks.length; i++){
            addTasktoDOM(tasks[i]);
        }

        tasksCounter.innerHTML = tasks.length;
    }

    function toggleTask (taskId) {
        //loop over the array and get the task that matches the taskid and mark is as completed
        const task = tasks.filter(function(task){
            return task.id === Number(taskId);
        });

        if(task.length > 0){
            const currentTask = task[0];

            currentTask.completed = !currentTask.completed;
            renderList();
            showNotification('toggled task successfully');
            return;

        }
    }

    function deleteTask (taskId) {
        const newTask  = tasks.filter(function(task){
            return task.id !== taskId;
        });

        tasks=newTask;
        renderList();
        showNotification('Task deleted successfully');
    }

    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList();
            showNotification('task added Successfully');
            console.log('added to tasks',task);
            return;
        }
    }
        

    function showNotification(text) {
        alert(text);
    }

    function handleInputKeyPress(e){
        if(e.key == 'Enter'){
            const text = e.target.value;
            console.log('text',text);
            if(!text){
                showNotification('Task cannot be empty');
                return;
            }

            const task = {
                title : text,
                id: Date.now(),
                completed: false
            }

            e.target.value = '';
            addTask(task);
        }
    }

    function handleClickEvent(e){
        const target = e.target;    
        console.log(target);
        if(target.className == 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }else if(target.className == 'custom-checkbox'){
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
    }

    function inintializeApp(){
        addTaskInput.addEventListener('keyup',handleInputKeyPress);
        document.addEventListener('click' , handleClickEvent);
        fetchTodos();
    }

    inintializeApp();

})();


