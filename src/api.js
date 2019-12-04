import axios from 'axios';
import RNFS from 'react-native-fs';

const _retrievePrediction = picture => {
  console.log('calling retreive pred');
  return new Promise((resolve, reject) => {
    try {
      RNFS.readFile(picture, 'base64').then(base64Pic => {
        let bodyFormData = new FormData();
        bodyFormData.append('img_bytes', base64Pic);
        const api = axios.create({
          baseURL: 'https://hyu-ai-app.herokuapp.com',
        });
        api.post('/predict', bodyFormData).then(res => {
          // LOG  {"prob": [0.9663408994674683, 0.01790168136358261, 0.008948475122451782], "prob_labels": ["kimchi", "bulgogi", "jeyuk_bokkeum"]}
          if (res) {
            let predictions = JSON.parse(res.data);
            // console.log(predictions['prob_labels']);

            if (predictions['prob'][0] - predictions['prob'][1] < 0.1) {
              console.log(
                'close competition in prediction',
                predictions['prob'],
              );
            }

            let bestPrediction = predictions['prob_labels'][0];
            let capitalizedPred =
              bestPrediction.charAt(0).toUpperCase() + bestPrediction.slice(1);
            const prediction = capitalizedPred.split('_').join('');
            console.log('prediction in api.js: ', prediction);
            resolve(prediction);
          }

          // else {
          //   console.log(
          //     'Network error, unable to retreive food label, returning Bibimbap',
          //   );
          //   resolve('Bibimbap');
          // }
        });
      });
    } catch (error) {
      console.log('error in retreivePrediction(), will return Bibimbap');
      // reject(error);
      resolve('Bibimbap');
    }
  });
};

const _retrieveNutrition = food => {
  console.log('calling retreive nutri');

  let translator = {
    Samgyeopsal: 'korean pork belly',
    Ojingeobokkeum: 'spicy stir fried squid',
    Dakbokkeumtang: 'korean spicy chicken',
    Galchijorim: 'korean fish stew',
    Jeyukbokkeum: 'bbq pork',
    Galbijjim: 'beef short ribs',
    Ramyeon: 'ramen',
  };

  var foodTemp = food;

  if (food in translator) {
    console.log('in translator');
    foodTemp = translator[food];
  }

  return new Promise((resolve, reject) => {
    try {
      const params = {
        app_id: '59af4d68',
        app_key: '3e130ae0f401bfbc403f811ee4ff2e84',
        ingr: foodTemp,
      };
      axios
        .get('https://api.edamam.com/api/food-database/parser', { params })
        .then(response => {
          if (response.data.hints[0]) {
            const { hints } = response.data;
            const { nutrients } = hints[0].food;
            console.log(nutrients);

            const {
              ENERC_KCAL: Energy = 0,
              PROCNT: Protein = 0,
              FAT: Fat = 0,
              CHOCDF: Carbs = 0,
              FIBTG: Fiber = 0,
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
            console.log('The input string is not a valid food name');
            return;
          }
        });
    } catch (error) {
      console.log('error in retrieveNutrition()');
      reject(error);
    }
  });
};

const _uploadImageAsync = photo => photo; //make async await

export { _retrieveNutrition, _retrievePrediction, _uploadImageAsync };
