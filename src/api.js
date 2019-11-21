import axios from 'axios';

const _retrievePrediction = picture => {
  //call keng api here
  const prediction = 'bibimbap';
  const capitalizedPred =
    prediction.charAt(0).toUpperCase() + prediction.slice(1);
  return capitalizedPred;
};

const _asyncRetrieveNutrition = async food => {
  const _retrieveNutrition = food => {
    return new Promise((resolve, reject) => {
      try {
        const params = {
          app_id: '59af4d68',
          app_key: '3e130ae0f401bfbc403f811ee4ff2e84',
          ingr: 'daddwa',
        };
        axios
          .get('https://api.edamam.com/api/food-database/parser', { params })
          .then(response => {
            if (response.data.hints[0]) {
              const { hints } = response.data;
              const { nutrients } = hints[0].food;
              const {
                ENERC_KCAL: Energy,
                PROCNT: Protein,
                FAT: Fat,
                CHOCDF: Carbs,
                FIBTG: Fiber,
              } = nutrients;

              const nutritionData = {
                Energy,
                Protein,
                Fat,
                Carbs,
                Fiber,
              };
              for (let prop in nutritionData) {
                if (Object.prototype.hasOwnProperty.call(nutritionData, prop)) {
                  nutritionData[prop] = nutritionData[prop].toFixed(2);
                }
              }
              resolve(nutritionData);
            } else {
              reject('The input string is not a valid food name');
              return;
            }
          });
      } finally {
        //initially catch error here, but finally is a more appropriate use
        resolve(nutritionData);
      }
    });
  };

  try {
    return await _retrieveNutrition(food);
  } catch (error) {
    console.log('error in api.js');
    reject(error);
  }
};

const _uploadImageAsync = photo => photo; //make async await

export { _asyncRetrieveNutrition, _retrievePrediction, _uploadImageAsync };
