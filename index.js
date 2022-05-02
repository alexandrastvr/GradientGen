// Stretch goals:
// - Add more colors.
// - Add a 'Surprise Me' button which generates random gradients (and updates the inputs).
// - Check for contrast between the gradient and the text.
let pickers = [];
let splits = [];
const gradientBox = document.getElementById("gradient");
const colors = document.getElementById("colors");
const picker1 = document.getElementById("picker-1");
const picker2 = document.getElementById("picker-2");
let n = 2;
pickers.push(picker1);
pickers.push(picker2);

const split1 = document.getElementById("split1");
const split2 = document.getElementById("split2");
splits.push(split1);
splits.push(split2);
const addBtn = document.getElementById("addBtn");
const surpriseBtn = document.getElementById("surpriseBtn");


for (let i = 0; i < 2; i++){
    pickers[i].addEventListener('input', gradientChange);
}
for (let i = 0; i < 2; i++){
    splits[i].addEventListener('input', gradientChange);
}
addBtn.addEventListener('click', addColor);
surpriseBtn.addEventListener('click',surprise);

function gradientChange() {
    let gradColors = '';
    let gradDef = '';
    for(let i = 0; i < n; i++){
        color = pickers[i].value;
        percentage = splits[i].value;
        if(i < (n-1)) {
            gradColors += `, ${color}, ${percentage}%`;
        } else {
            gradColors += `, ${color}`;
        }
    }
    gradDef = `linear-gradient(to bottom right${gradColors})`;
    gradientBox.style.backgroundImage = gradDef;
}

function addColor(){
    n += 1;
    const newDiv = document.createElement('div');
    newDiv.classList.add("box");
    colors.appendChild(newDiv);
    const newInput = document.createElement('INPUT');
    newInput.id = `picker-${n}`;
    newInput.name = `color-${n}`;
    newInput.type = 'color';
    const newLabel = document.createElement("Label");
    newLabel.htmlFor = `picker-${n}`;
    newLabel.textContent = `Color ${n}:`;
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newInput);

    const newSplitInput = document.createElement('INPUT');
    newSplitInput.id = `split${n}`;
    newSplitInput.name = `split`;
    newSplitInput.type = 'range';
    newSplitInput.value = 100/n;
    newDiv.appendChild(newSplitInput);
    splits.push(newSplitInput);

    for (let i = 0; i < n; i++){
        splits[i].value = 100/n;
        if(i < n-1){
            splits[i].style.opacity = 1;
            splits[i].style.cursor = "pointer";
        } else{
            splits[i].style.opacity = 0;
            splits[i].style.cursor = "default";
        }
    }
    pickers.push(newInput);
    gradientChange();
    pickers[n-1].addEventListener('input', gradientChange);
    return n;
}

function surprise() {
    let rndSplit = [];
    let rndColor = [];
    for (let j = 0; j < n; j++){
        rndSplit[j] = 100/n + (Math.random()*(100/(2*n)))*(Math.round((Math.random())) ? 1:-1);
        rndColor[j] = random_hex_color_code();
        pickers[j].value = rndColor[j];
        splits[j].value = rndSplit[j]; 
    }
    gradientChange();
}

const random_hex_color_code = () => {
    let n = (Math.random() * 0xffffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };
  
  
  