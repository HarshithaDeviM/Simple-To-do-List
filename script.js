
let taskinput = document.querySelector('#taskinput');
let tasklist = document.querySelector('#tasklist');

taskinput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addItem(this.value);
        this.value = "";
    }
});

let addItem = (taskInput) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `${taskInput}<p>X</p>`;
    listItem.addEventListener("click", function () {
        toggleDone(this);
    });
    let crossMark = listItem.querySelector('p');
    crossMark.addEventListener("click", function (event) {
        event.stopPropagation(); 
        removeItem(listItem);
    });

    tasklist.appendChild(listItem);
};

let toggleDone = (item) => {
    item.classList.toggle('done');
    let allDone = checkAllDone();
    if (allDone) {
    tasklist.innerHTML = '';
    const confetti = new JSConfetti();
    confetti.addConfetti({
      emojis: ['🎉','🎊','🎈'],
      confettiRadius: 50,
      confettiNumber: 100,
    });
    setTimeout(() => {
      confetti.clearCanvas();
    }, 3000);
    }
};
let checkAllDone = function () {
    let items = tasklist.querySelectorAll('li');
    let doneItems = 0;

    for (let item of items) {
     if (item.classList.contains('done')) {
      doneItems++;
     }
    }

    return doneItems === items.length;
};

let removeItem = (item) => {
    setTimeout(() => {
        playDeleteSound();
    }, 0); 
    item.style.transform = "translateX(-100%)";
    setTimeout(() => {
        item.remove();
    }, 500); 
};

let playDeleteSound = () => {
    let deleteSound = document.getElementById('deleteSound');
    if (deleteSound && deleteSound.readyState === 4) {
        deleteSound.play();
    }
};
