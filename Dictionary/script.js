const form = document.querySelector("form"); 
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", (a)=>{
    a.preventDefault( )
    // form ko 1st childern is input and 2nd is button so
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word)=>{
    try{
        resultDiv.innerHTML = "Aayush aafai gayo meaning khojna"
    // alert("Word:"  + word)
    // word is argument and getWordInfo("Aayush") rakhyo bhane word ko thau ma aaucha 
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data = await response.json();

    let definitions = data[0].meanings[0].definitions[0]; //variable matra banako
    
    
    resultDiv.innerHTML = `
    <h2><strong>Word: </strong>${data[0].word=== undefined ? "Not Found" : data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech === undefined ? "Not Found" : data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning: </strong>${data[0].meanings[0].definitions[0].definition === undefined ? "Not Found" : definitions.definition}</p>
    <p><strong>Example: </strong>${data[0].meanings[0].definitions[0].example === undefined ? "Not Found" : definitions.example}</p>
    `;
    
    // Fetching Antonyms
    if (definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<span>Not Found</span>`;
    }
    else{
        for(let i=0; i<definitions.antonyms.length; i++){
            resultDiv.innerHTML += `<li><strong>Antonyms: </strong>${definitions.antonyms[i]}</li>`
        }
    }

    // Adding Read more button
    resultDiv.innerHTML += `<div><a href= "${data[0].sourceUrls}" target="_blank">Read More </a></div>`; 
    }
    catch(error){
        resultDiv.innerHTML = `<p>Sorry, the word could not be found </>`
    }
    // console.log(data); 
} 
 