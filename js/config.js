const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0adeb2f97amshd8f144b29750119p1c7540jsn752e8dc122da",
    "X-RapidAPI-Host": "exerciseapi3.p.rapidapi.com",
  },
};

export function getMuscle(muscle) {
  const API_URL = `https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle=${muscle}`;
  fetch(API_URL, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
