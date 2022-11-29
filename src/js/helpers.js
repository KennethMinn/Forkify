import { TIMER_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
    try{
        const response = await Promise.race([fetch(url),timeout(TIMER_SEC)]);
        const data = await response.json();
        if(!response.ok) throw new Error(`${data.message} ${response.status}`);
        return data;

    }catch(error){
      throw error;
    }
};

export const sendJSON = async (url,recipe) => {
  try{
    const fetchPro = fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe)
    });

    const response = await Promise.race([fetchPro,timeout(TIMER_SEC)]);

    const data = await response.json();

    if(!response.ok) throw new Error(`${data.message} ${response.status}`);

    return data;

  }catch(error){

  }
}