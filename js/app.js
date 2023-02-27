const modalContainer = document.getElementById('modalOpen');

const searchWord = () => {
    const wordEl = document.getElementById('input-field');
    const word = wordEl.value;
    console.log(word);
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    console.log(url);
    if (word) {
        fetch(url)
            .then(res => res.json())
            .then(data => {

                if (data.title === 'No Definitions Found') {
                    modalContainer.innerHTML = `
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="dictionaryModalLabel">Word 404</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <p>${data.title}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
          `

                } else {
                    // console.log(data);
                    displayWord(data[0])
                }
            })
    } else {
        modalContainer.innerHTML = `
               <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="dictionaryModalLabel">Error</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <p>Please Searching</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>  
          `
    }
    wordEl.value = '';

}

const displayWord = (data) => {

    // console.log(data);
    const { word, phonetic, phonetics, meanings } = data;
    let define;
    let example;
    const definition = meanings.map(ele => {
        const element = ele.definitions[0].definition;

        const ex = ele.definitions[0].example;


        return element;
    })
    // let definition = definitions.map(ele => {
    //     console.log(ele);

    // })
    console.log(definition);
    console.log(example);
    let audio;
    if (phonetics[0].audio === '' && phonetics[1].audio === '') {
        audio = phonetics[2].audio;

    } else if (phonetics[0].audio === '' && phonetics[2] === '') {
        audio = phonetics[1].audio;
    } else {
        audio = phonetics[0].audio
    }
    console.log(audio);

    modalContainer.innerHTML = `
                                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="dictionaryModalLabel">${word}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                <audio controls>
                    <source src="${audio}">
                    <source src="horse.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                    </audio>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
          `
}

document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchWord();
    }
});