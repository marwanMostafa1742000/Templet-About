const recipeModule = ( () => {

    //PUBLIC NAMESPACING 
  
    const mainSelection = document.querySelector('select[id="main"]');
    const dietSelection = document.querySelector('select[id="diet"]');
    const healthSelection = document.querySelector('select[id="health"]');
    const timeSelection = document.querySelector('select[id="time"]');
    const resultContainer = document.querySelector('.result-container');
    const ingredients = document.querySelector('.ingredients'); 
    
    //PRIVATE NAMESPACING

    return  {
        //HANDLE SUBMIT FUNCTION
        handleSubmit: function(e) {
            e.preventDefault();
            //Get values from all selects
            const mainValue = mainSelection.value;
            const dietValue = dietSelection.value;
            const healthValue = healthSelection.value;
            //call 
            this.handleFetch(mainValue, dietValue, healthValue);
        },
  
        //FETCH ASYNC FUNCTION
            // 1. validte the response.
            // - if hits > 0, then process, otherwise, display message no hits
        handleFetch: async function(mainValue, dietValue, healthValue) {
            const dataRequest = await fetch(`https://api.edamam.com/search?q=${mainValue}&app_id=08ab47ee&app_key=fa5814a32eb2669676885dff6d983c44&health=${healthValue}&diet=${dietValue}&to=30`);
            const dataResponse = await dataRequest.json()
            console.log(dataResponse);
            const dataResults =  dataResponse.hits; 
            
            this.render(dataResults);
        },
     
    
        //LOOP THROUGH RESULTS
        render: function(data) {
            const html = data.map((item) => {
                return this.renderResult(item);  
            }).join('');
            //
            resultContainer.innerHTML = html;
        },
    
        // return a <li> item
        renderResult: function(data) {
            //Title 
            const title = data.recipe.label;
            //Labels
            const label = data.recipe.dietLabels.map(tag => {
                return `<span>${tag}</span>`
            }).join('');
            //Image
            const image = data.recipe.image;
            //Tags
            const tags = data.recipe.healthLabels.map(tag => {
            return `<span>${tag}</span>`
            }).join('');

            // Calories 
            const calories = data.recipe.calories;
            //Ingredients

            const ingred = data.recipe.ingredientLines.map(ingredient => {
            return `<li class="ingredient">${ingredient}</li>`;
            }).join('');

            //Link
            const link = data.recipe.url;

            return ` 
                <div class="pill">
                <p class="title">${title}</p>
                <span class="label">${label}</span>
                <img src="${image}" alt="Recipe Image">
                <div class="tags">${tags}</div>
                <ol>
                ${ingred}
                </ol>
                <a href="${link}" target="_blank">Go to recipe</a>
                </div>
                `
            }
        }
  
  })();
  
const submitButton = document.querySelector('input[type="button"]');
submitButton.addEventListener('click',recipeModule.handleSubmit.bind(recipeModule));


const CONFIG = {
    DEFAULT: false,
    VOICE: 'Fred' };
  
  
  const robot = document.querySelector('.robot');
  
  let message = new SpeechSynthesisUtterance();
  
  message.text = `1. Pay attention to the protein package. Fish, poultry, nuts, and beans are the best choices., 2,. Choose foods with healthy fats, limit foods high in saturated fat, and avoid foods with trans fat. Plant oils, nuts, and fish are the healthiest sources., 3,.Choose good carbs, not no carbs. Whole grains are your best bet., 4,.Choose a fiber-filled diet, rich in whole grains, vegetables, and fruits.`;
  
  let voices = [];
  
  
  speechSynthesis.addEventListener('voiceschanged', event => {
    voices = speechSynthesis.getVoices();
    if (!CONFIG.DEFAULT) {
      message.voice = voices.find(voice => voice.name === CONFIG.VOICE);
    }
  });
  
  message.onend = function (event) {
    robot.classList.remove('robot_speaking');
  };
  
  robot.addEventListener('click', event => {
    if (speechSynthesis.speaking) {
      robot.classList.remove('robot_speaking');
      speechSynthesis.cancel();
    } else {
      robot.classList.add('robot_speaking');
      speechSynthesis.speak(message);
    }
  });