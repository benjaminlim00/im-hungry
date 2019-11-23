import axios from 'axios';
import RNFS from 'react-native-fs';

const _retrievePrediction = picture => {
  const _retrievePrediction = async base64Pic => {
    return new Promise((resolve, reject) => {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('img_bytes', base64Pic);
        const api = axios.create({ baseURL: 'http://192.168.0.27:5000' });
        api.post('/predict', bodyFormData).then(res => {
          // LOG  {"prob": [0.9663408994674683, 0.01790168136358261, 0.008948475122451782], "prob_labels": ["kimchi", "bulgogi", "jeyuk_bokkeum"]}
          let predictions = JSON.parse(res.data);
          // console.log(predictions['prob_labels']);
          let bestPrediction = predictions['prob_labels'][0];
          let capitalizedPred =
            bestPrediction.charAt(0).toUpperCase() + bestPrediction.slice(1);
          const prediction = capitalizedPred.split('_').join(' ');
          console.log('ap', prediction);
          resolve(prediction);
        });
      } finally {
      }
    });
  };

  try {
    RNFS.readFile(picture, 'base64').then(async base64Pic => {
      // console.log('should be first', base64Pic);
      // return await _retrievePrediction(base64Pic);
      await Promise.resolve(_retrievePrediction(base64Pic));
    });
  } catch (error) {
    console.log('error in retrievePrediction');
    // console.log(error);
    // reject(error);
  }

  // const prediction = 'bibimbap';
  // const capitalizedPred =
  //   prediction.charAt(0).toUpperCase() + prediction.slice(1);
  // return capitalizedPred;
};

const _asyncRetrieveNutrition = async food => {
  const _retrieveNutrition = food => {
    return new Promise((resolve, reject) => {
      try {
        const params = {
          app_id: '59af4d68',
          app_key: '3e130ae0f401bfbc403f811ee4ff2e84',
          ingr: food,
        };
        axios
          .get('https://api.edamam.com/api/food-database/parser', { params })
          .then(response => {
            if (response.data.hints[0]) {
              console.log(3);
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
              console.log(4);

              return;
            }
          });
      } finally {
        //initially catch error here, but finally is a more appropriate use
        // resolve(nutritionData); This line gives error because nutritionData
        // does not exist.
      }
    });
  };

  try {
    return await _retrieveNutrition(food);
  } catch (error) {
    console.log('error in retrieveNutrition');
    // console.log(error);
    // reject(error);
  }
};

const _uploadImageAsync = photo => photo; //make async await

export { _asyncRetrieveNutrition, _retrievePrediction, _uploadImageAsync };
