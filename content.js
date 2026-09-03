// do a random between 1 to 100 
// if it is 1 to 64 nothing happens
// if it is 65 to 79 whole page font changes
// if it is 80 to 89 every element of the page font is changed 
// if 90 to 94 every letter or something with various fonts whathef mode
// these modes only goes away if the user refreshes the page
// if 95 to 100 replace with various fonts while scrolling chaos mode reverts when scrolling stops

// this is basically schizophrenia simulator you will probably think you are crazy

// nothing chance
const nothing_chance = 65
const wnothing = 65

// mode 1 ("weird font for a website") chances
const mode1_chance = 15
const wmode1 = mode1_chance + wnothing

// mode 2 ("is something wrong with google?") chances
const mode2_chance = 10
const wmode2 = mode2_chance + wmode1

// mode 3 ("whathef") chances
const mode3_chance = 5
const wmode3 = mode3_chance + wmode2

// mode 4 ("it was just there I swear!"/"max schizophrenia"/"coincidence I think NOT! - some teacher") chances
const mode4_chance = 5
const wmode4 = mode4_chance + wmode3

const total = nothing_chance + mode1_chance + mode2_chance + mode3_chance + mode4_chance

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
const mode_choice = Math.floor(Math.random() * total);

// now execute the whole script after having the fonts data
getFonts().then(fonts => {
    console.log(fonts.fonts);

    // code that needs fonts goes here
    if (mode_choice < wnothing) {
        return;
    }
    // change whole font
    else if (mode_choice <= wmode1) {
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
    else if (mode_choice <= wmode2) {
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
    else if (mode_choice <= wmode3) {
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
    else if (mode_choice <= wmode4) {
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

