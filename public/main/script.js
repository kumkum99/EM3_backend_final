// Function to create a typing animation effect
function typeWriter(text, i, cb) {
  if (i < text.length) {
    document.querySelector('h1').innerHTML += text.charAt(i);
    i++;
    setTimeout(function() {typeWriter(text, i, cb)}, 200); // Adjust typing speed here (100ms)
  } else {
    cb(); // Execute callback function when typing completes
  }
}

// Call the typing animation function with your text
typeWriter(" to Our Hospital Shanti Clinic!😊" , 0, function() {
  // Optional: Add any code you want to execute after typing animation completes
  
});