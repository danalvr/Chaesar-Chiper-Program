// Get the element from DOM
const form = document.getElementById("controls");
const hInput = document.querySelector("#heading-input");
const hOutput = document.querySelector("#heading-output");
const selectEncodeOrDecode = document.getElementsByName("code");
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const shiftKey = document.getElementById("shift-input");
const modulo = document.getElementById("mod-input");
const alphabet = document.getElementById("alphabet-input");

// Change the heading title and clear the content depending on whether to encode or decode
selectEncodeOrDecode.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.value === "encode") {
            hInput.textContent = "Plaintext";
            hOutput.textContent = "Ciphertext";
            inputText.value = "";
            outputText.textContent = "";
        } else if (option.value === "decode") {
            hInput.textContent = "Ciphertext";
            hOutput.textContent = "Plaintext";
            inputText.value = "";
            outputText.textContent = "";
        }
    });
});

// When the click submit it will perform caesar cipher
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the value of from the DOM
    let inputTextValue = inputText.value;
    let selectedOption = Array.from(selectEncodeOrDecode).find((option) => option.checked);
    let shiftValue = parseInt(shiftKey.value);
    let moduloValue = parseInt(modulo.value);
    let alphabetValue = alphabet.value;

    /**
     * Applies the caesar cipher to the input text using the specified shift and modulus.
     * @param {boolean} [decode="decode"] - Whether to perform decode instead of encode.
     * @param {string} text - The input text to be encoded or decoded.
     * @param {number} shift - The shift value to apply to each character in the input text.
     * @param {number} mod - The modulus value to use for wrapping around the character set.
     * @param {string} [charset="abcdefghijklmnopqrstuvwxyz0123456789"] - The character set to use for the cipher.
     * @returns {string} The encode or decode text.
     */
    function caesarCipher(decode, text, shift, mod, charset) {
        // If decode is equal to decode then reverse the sign of the shift value.
        if (decode == "decode") {
            shift = -shift;
        }
        // Make the character set a lowercase
        charset = charset.toLowerCase();
        // Remove non-alphabetic characters
        text = text.replace(/[^a-zA-Z]/g, "");
        // Store the results
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            // Find the index of the character in the character set, ignoring case
            const index = charset.indexOf(char.toLowerCase());
            // If the character is in the set, perform the shift operation
            if (index !== -1) {
                let newIndex = (index + shift) % mod;
                // If the new index is negative, add the modulus to wrap around to the correct position
                if (newIndex < 0) {
                    newIndex += mod;
                }
                // Add the character to the result string
                result += charset[newIndex];
            }
        }
        return result;
    }

    // Store the caesarCipher function text output
    let cipherOutput = caesarCipher(selectedOption.value, inputTextValue, shiftValue, moduloValue, alphabetValue);
    // Show the output in the output textarea 
    outputText.textContent = cipherOutput;
});
