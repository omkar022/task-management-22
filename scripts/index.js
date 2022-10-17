const state = {
    taskList: [
    ],
};
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");
const htmlTaskContent = ({
    id,
    title,
    description,
    type,
    url
}) => `<div class='col-md-6 col-lg-4 mt-3 id=${id} key=${id} > 
<div class='card shadow-sm task__card'>
<div class='card-header d-flex gap-2 justify-content-end task__card__header'>
<button type='button' class='btn btn-outline-info mr-2' name=${id}>
<i class='fas fa-pencil-alt' name=${id}> </i>
</button>
<button type='button' class='btn btn-outline-danger mr-2' name=${id}>
<i class='fas fa-trash-alt' name=${id}> </i>
</button>
</div>
<div class='card-body'>
${url && `<img width='100%' src=${url} alt='card image cap' class='card-image-top md-3 rounded=lg'/>`

    }
<h4 class='task__card__title'>${title}</h4>
<p class='description trim-3-lines text-muted' data-gram_editor='false'>
${description}
</p>
<div class='tags text-white d-flex flex-wrap'>
<span class='badge bg-primary m-1'>${type}</span>
</div>
</div>
<div class='card-footer'>
<button type='button' class='btn btn-outline-primary float-right' data-bs-toggle='modal' data-bs-target='#showTask'>
Open Task

</button>
</div>
</div>
 </div>
`;

const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    
    <div id=${id}>
    ${url &&
        `<img width='100%' src=${url} alt='card image cap' class='img-fluid place__holder__image mg-3/>`
        }
        <strong class='text-sm text-muted'>
        Created on ${date.toDateString()}
        </strong>
        <h2 class='my-3' >${title}</h2>
        <p class ='lead'>${description}</p>
    </div>
    
    
    `;
};

const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({ task: state.taskList, })
    );
};

const LoadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
    if (localStorageCopy) state.taskList = localStorageCopy.task;
    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
};

const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById("tags").value,
    };
    if (input.title === '' || input.description === "" || input.type === "") {
        return alert('Plese fill all the fields');
    }
    taskContents.insertAdjacentHTML(
        "beforeend", htmlModalContent({
            ...input, id,
        })
    );
    state.taskList.push({ ...input, id });
    updateLocalStorage();
};