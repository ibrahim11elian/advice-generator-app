// container that contain the advice 
const container = document.querySelector('.container');
// the advice text
const adviceText = document.querySelector('#advice');
// the advice id
const adviceId = document.querySelector('.advice-id span');
// the generate advice button
const generateButtom = document.querySelector('#generate-buttom');
// the loding animation
const loading = document.querySelector('.loading');

// fetching the slip advice api starting the loading animation until the data is fetched
let getAdvice = async () => {
    try {
        loadingStart();
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        loadingEnd();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// updating the UI by getting the output from the get advice function and palce it where it suppose to be
const updateUi = async () => {
    let advice = await getAdvice();
    try {
        adviceText.textContent = `"${advice.slip.advice}"`;
        adviceId.textContent = `#${advice.slip.id}`;
    } catch (error) {
        console.log(error);
    }
};

// start the loading animation
const loadingStart = () => {
    container.style.display = 'none';
    loading.style.display = 'flex';
};

// end the loading animation and the container shows up
const loadingEnd = () => {
    container.style.display = 'block';
    loading.style.display = 'none';
};

// listening for the gnerate advice button
generateButtom.addEventListener('click', () => updateUi());

// calling the update function when window is loaded
updateUi();