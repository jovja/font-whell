// do a random between 1 to 100 
// if it is 1 to 64 nothing happens
// if it is 65 to 79 whole page font changes
// if it is 80 to 89 every element of the page font is changed 
// if 90 to 94 every letter or something with various fonts whathef mode
// these modes only goes away if the user refreshes the page
// if 95 to 100 replace with various fonts while scrolling chaos mode reverts when scrolling stops

// this is basically schizophrenia simulator you will probably think you are crazy

// TODO MAKE CHANGES CHANGEABLE WITH A FEW NUMBERS
/*
// mode 1 ("weird font for a website") chances
const mode1_upper = 
const mode1_lower = 

// mode 2 ("is something wrong with google?") chances
const mode2_upper = 
const mode2_lower = 

// mode 3 ("whathef") chances
const mode2_upper = 
const mode2_lower = 

// mode 4 ("it was just there I swear!"/"max schizophrenia"/"coincidence I think NOT! - some teacher") chances
const mode2_upper = 
const mode2_lower = 
*/

// define random (this does not change anything the bounds are the ones that count)
const rnd = 100

// first get the fonts/unicode
async function getFonts() {
    const url = chrome.runtime.getURL("fonts.json"); // or browser.runtime.getURL
    const response = await fetch(url);
    return response.json();
  }

// grab all text elements first
const elements = document.querySelectorAll("title, p")
elements.forEach(el => {
    el.dataset.originalText = el.textContent;
  });

// get a random number
const mode_choice = Math.floor(Math.random() * rnd);

// now execute the whole script after having the fonts data
getFonts().then(fonts => {
    console.log(fonts.fonts);

    // code that needs fonts goes here

    // change whole font
    if (mode_choice >= 65 && mode_choice <= 79) {
        // get random font
        const troll_font = fonts.fonts[Math.floor(Math.random() * 77)]

        elements.forEach(el => {
            const original = el.textContent;
            let result = "";

            for (let char of original) {
                if (!/[a-zA-Z]/.test(char)) {
                    result = result + char
                    continue;
                } else {
                    char = char.toUpperCase();
                    const troll_char = troll_font.data.characters.letters.uppercase[char]
                    result = result + troll_char
                    }
            }
            el.textContent = result
        })
    }

    // change every element font
    if (mode_choice >= 80 && mode_choice <= 89) {
        elements.forEach(el => {
            const original = el.textContent;
            let result = "";

            // get random font
            const troll_font = fonts.fonts[Math.floor(Math.random() * 77)]

            for (let char of original) {
                if (!/[a-zA-Z]/.test(char)) {
                    result = result + char
                    continue;
                } else {
                    char = char.toUpperCase();
                    const troll_char = troll_font.data.characters.letters.uppercase[char]
                    result = result + troll_char
                    }
            }
            el.textContent = result
        })
    }


    // if whathef mode change all mixing unicode
    if (mode_choice >= 90 && mode_choice <= 94) {
        elements.forEach(el => {
            const original = el.textContent;
            let result = "";

            for (let char of original) {
                if (!/[a-zA-Z]/.test(char)) {
                    result = result + char
                    continue;
                } else {
                    // get random font
                    const troll_font = fonts.fonts[Math.floor(Math.random() * 77)]
                    char = char.toUpperCase();
                    const troll_char = troll_font.data.characters.letters.uppercase[char]
                    result = result + troll_char
                    }
            }
            el.textContent = result
        })
    }

    // if chaos mode change unicode as well
    if (mode_choice >= 95 && mode_choice <= 100) {
        let scrollTimeoutId = null;

        // 1. scramble immediately on scroll
        window.addEventListener("scroll", () => {
            // runs on *every* scroll event
            elements.forEach(el => {
                const original = el.dataset.originalText;
                let result = "";
    
                for (let char of original) {
                    if (!/[a-zA-Z]/.test(char)) {
                        result = result + char
                        continue;
                    } else {
                        // get random font
                        const troll_font = fonts.fonts[Math.floor(Math.random() * 77)]
                        char = char.toUpperCase();
                        const troll_char = troll_font.data.characters.letters.uppercase[char]
                        result = result + troll_char
                        }
                }
                el.textContent = result
            });

            // 2. reset "scroll stopped" timer
            if (scrollTimeoutId !== null) {
              clearTimeout(scrollTimeoutId);
            }

            // 3. schedule restore after user stops scrolling
            scrollTimeoutId = setTimeout(() => {
              elements.forEach(el => {
                const original = el.dataset.originalText;
                el.textContent = original;
              });
            }, 50);
          });
        }
});

