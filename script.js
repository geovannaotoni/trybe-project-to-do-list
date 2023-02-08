const addButton = document.getElementById('criar-tarefa');
const inputTask = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');
const deleteButton = document.getElementById('apaga-tudo');
const finishedDeleteButton = document.getElementById('remover-finalizados');
const saveTasksButton = document.getElementById('salvar-tarefas');
const removeSelectedButton = document.getElementById('remover-selecionado');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');
// const listItens = document.getElementsByClassName('item');

// Criar um elemento da lista ao digitar no input e precisoar o botão
const addTask = () => {
  const listItem = document.createElement('li');
  if (inputTask.value.length === 0) {
    window.alert('Insira um texto');
  } else {
    listItem.classList.add('item');
    listItem.innerText = inputTask.value;
    list.appendChild(listItem);
    inputTask.value = '';
  }
};

addButton.addEventListener('click', addTask);

// Seleciona a tarefa clicada para alterar a cor de fundo
const selectItem = (event) => {
  const selectedItem = document.getElementsByClassName('selected')[0];
  const clickedItem = event.target;
  if (selectedItem) {
    selectedItem.classList.remove('selected');
  }
  clickedItem.classList.add('selected');
  // if (selectedItem !== clickedItem) {
  //   clickedItem.classList.add('selected');
  // }
};
list.addEventListener('click', selectItem);

// Risca o item clicado com double click
const riskItem = (event) => {
  const clickedItem = event.target;
  // toggle alterna entre adicionar e remover a classe. Fonte: https://www.w3schools.com/howto/howto_js_toggle_class.asp
  clickedItem.classList.toggle('completed');
};
list.addEventListener('dblclick', riskItem);

// Apagar lista inteira
const deleteList = () => {
  list.innerHTML = '';
};
deleteButton.addEventListener('click', deleteList);

// Apagar somente os elementos riscados (aqueles com a classe 'completed')
const deleteCompleted = () => {
  const completedItens = document.getElementsByClassName('completed');
  while (completedItens.length > 0) {
    for (let index = 0; index < completedItens.length; index += 1) {
      list.removeChild(completedItens[index]);
    }
  }
};
finishedDeleteButton.addEventListener('click', deleteCompleted);

/*
// Fiz dessa forma mas percebi que tinha um jeito mais simples
// Salvar as tarefas no localStorage
const saveTasks = () => {
  const saveTasksObj = {};
  for (let index = 0; index < listItens.length; index += 1) {
    saveTasksObj[index] = listItens[index].innerHTML;
  }
  console.log(saveTasksObj);
  localStorage.setItem('saveTasks', JSON.stringify(saveTasksObj));
};
saveTasksButton.addEventListener('click', saveTasks);

// Utilizei a propriedade Object.keys para calcular o tamanho do objeto salvo no localStorage (fonte: https://pt.stackoverflow.com/questions/15058/como-saber-o-tamanho-quantidade-de-propriedades-atributos-de-um-objeto-em-ja)
const recoverTasks = () => {
  const saveTasksObj = JSON.parse(localStorage.getItem('saveTasks'));
  if (saveTasksObj) {
    for (let index = 0; index < Object.keys(saveTasksObj).length; index += 1) {
      const listItem = document.createElement('li');
      listItem.classList.add('item');
      listItem.innerText = saveTasksObj[index];
      list.appendChild(listItem);
    }
  }
};
*/

// Salvar as tarefas no localStorage
const saveTasks = () => {
  localStorage.setItem('savedTasks', JSON.stringify(list.innerHTML));
};
saveTasksButton.addEventListener('click', saveTasks);

const recoverTasks = () => {
  const savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
  if (savedTasks) {
    list.innerHTML = savedTasks;
  }
};

// Remover somente o item selecionado
const removeSelected = () => {
  const selectedItem = document.getElementsByClassName('selected')[0];
  list.removeChild(selectedItem);
};
removeSelectedButton.addEventListener('click', removeSelected);

// Função para mover o elemento selecionado para cima ou para baixo
// Fonte: // https://pt.stackoverflow.com/questions/6553/como-inserir-um-elemento-entre-dois-elementos
// https://horadecodar.com.br/2021/07/24/como-inserir-um-elemento-apos-o-outro-elemento-em-javascript/
// Função insertBefore: elementopai.insertBefore(new, existing)
const moveUp = () => {
  const selectedItem = document.getElementsByClassName('selected')[0];
  if (selectedItem) {
    const previous = selectedItem.previousElementSibling;
    if (previous) {
      list.insertBefore(selectedItem, previous);
    }
  }
};
moveUpButton.addEventListener('click', moveUp);

const moveDown = () => {
  const selectedItem = document.getElementsByClassName('selected')[0];
  if (selectedItem) {
    const next = selectedItem.nextElementSibling;
    if (next) {
      list.insertBefore(next, selectedItem);
    }
  }
};
moveDownButton.addEventListener('click', moveDown);

window.onload = () => {
  recoverTasks();
  
  //adicionei depois para remover a seleção ao atualizar a página
  document.getElementsByClassName('selected')[0].classList.remove('selected');
};
