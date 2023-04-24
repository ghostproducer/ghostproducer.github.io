function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.querySelector(".digital-clock").textContent = timeString;
}

setInterval(updateTime, 1000);
function getList() {
  // Clear the existing list
  var container = document.getElementById("list-container");
  container.innerHTML = "";

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set the URL of the API endpoint to call
  var url = "https://catfact.ninja/facts";

  // Set the HTTP method to GET
  xhr.open("GET", url);

  // Set the callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the response into a JavaScript object
      var response = JSON.parse(xhr.responseText);

      // Get the list of facts from the response object
      var facts = response.data;

      // Loop through the facts and add them to a list
      var list = document.createElement("ul");
      for (var i = 0; i < facts.length; i++) {
        var fact = document.createElement("li");
        fact.innerHTML = facts[i].fact;
        list.appendChild(fact);
      }

      // Add the list to the page
      var container = document.getElementById("list-container");
      container.appendChild(list);
    }
  };

  // Send the request
  xhr.send();
}
function getCoordenates () {
    var indicator = document.getElementById('indicator');

		document.addEventListener('mousemove', function(e) {
			var x = e.clientX;
			var y = e.clientY;

			indicator.innerHTML = 'X: ' + x + ', Y: ' + y;
		});
}

function getCoordenates() {
    let output = document.getElementById("output");
    window.addEventListener("mousemove", (e) => {
      let xPos = e.clientX;
      let yPos = e.clientY;
      output.innerHTML = `<div><span>X: </span>${xPos}px</div><div><span>Y: </span>${yPos}px</div>`;
    });
}

getCoordenates();



// Fetch cat images from API
fetch('https://api.thecatapi.com/v1/images/search?limit=10')
  .then(response => response.json())
  .then(data => {
    const sliderImages = document.getElementById('slider-images');
    data.forEach(cat => {
      const img = document.createElement('img');
      img.src = cat.url;
      sliderImages.appendChild(img);
    });
  })
  .catch(error => console.error(error));

// Slider functionality
const sliderImages = document.getElementById('slider-images');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let position = 0;

function moveSlider(direction) {
  const imageWidth = sliderImages.children[0].clientWidth;
  if (direction === 'prev') {
    position += imageWidth;
    if (position > 0) {
      position = -(sliderImages.clientWidth - imageWidth);
    }
  } else if (direction === 'next') {
    position -= imageWidth;
    if (position < -(sliderImages.clientWidth - imageWidth)) {
      position = 0;
    }
  }
  sliderImages.style.transform = `translateX(${position}px)`;
}

prevButton.addEventListener('click', () => moveSlider('prev'));
nextButton.addEventListener('click', () => moveSlider('next'));

