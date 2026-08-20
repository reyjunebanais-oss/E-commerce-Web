function search_function() { 
  const search_bar = document.getElementById("search").value.toUpperCase(); 
  const cards = document.querySelectorAll(".card1"); 
  const noResultsMessage = document.getElementById("no-results");
  
  // Track if we found at least one match
  let matchFound = false; 

  for (let p = 0; p < cards.length; p++) { 
    const get = cards[p].querySelector(".Product-Title"); // Using class name is more precise than tag name
    
    if (get) { 
      const text = get.textContent.toUpperCase(); 
      
      if (text.indexOf(search_bar) > -1) { 
        cards[p].style.display = ""; 
        matchFound = true; // We found a match!
      } else { 
        cards[p].style.display = "none"; 
      } 
    } 
  } 

  // Toggle the message based on whether a match was found
  if (matchFound) {
    noResultsMessage.style.display = "none";
  } else {
    noResultsMessage.style.display = "block";
  }
}
