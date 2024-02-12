import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const dataObj = {};
  new FormData(refs.form).forEach((value, key) => {
    dataObj[key] = value;
  });

  let isSuccess;

  if (dataObj.state === 'fulfilled') {
    isSuccess = true;
  } else {
    isSuccess = false;
  }

  const promise = createPromise(dataObj.delay, isSuccess);

  promise
    .then(value => {
      iziToast.success({
        displayMode: 'replace',
        position: 'topRight',
        icon: '',
        message: value,
      });
    })
    .catch(value => {
      iziToast.error({
        position: 'topRight',
        icon: '',
        message: value,
      });
    });

  refs.form.reset();
}

function createPromise(delay, isTrue) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isTrue) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}