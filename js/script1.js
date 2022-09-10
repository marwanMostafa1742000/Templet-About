

const CONFIG = {
  DEFAULT: false,
  VOICE: 'Fred' };


const robot = document.querySelector('.robot');

let message = new SpeechSynthesisUtterance();

message.text = `Welcome to Fitness Life, I want to tell you a few things Not drinking too much. Regular exercise at the gym. Three days a week. Getting on better with your associate employee contemporaries. At ease. Eating well. No more microwave dinners and saturated fats. A patient, better driver. A safer car. Baby smiling in back seat. Sleeping well. No bad dreams. No paranoia. Careful to all animals. Never washing spiders down the plughole. Keep in contact with old friends. Enjoy a drink now and then. Will frequently check credit at moral bank. Hole in the wall. Favours for favours. Fond but not in love. Charity standing orders. On Sundays ring road supermarket. No killing moths or putting boiling water on the ants. Car wash. Also on Sundays. No longer afraid of the dark or midday shadows. Nothing so ridiculously teenage and desperate. Nothing so childish, at a better pace. Slower and more calculated. No chance of escape. Now self-employed. Concerned but powerless. An empowered and informed member of society. Pragmatism not idealism. Will not cry in public. Less chance of illness. Tires that grip in the wet. Shot of baby strapped in back seat. A good memory. Still cries at a good film. Still kisses with saliva. No longer empty and frantic like a cat tied to a stick. That's driven into frozen winter shit. The ability to laugh at weakness. Calm. Fitter, healthier and more productive. A pig in a cage on antibiotics`;

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