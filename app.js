const twitterButton = document.querySelector('#js-tweet');

const spinner = document.querySelector('#js-spinner');

const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);

const endPoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

async function getQuote() {
    spinner.classList.remove('hidden');
    newQuoteButton.disabled = true;

    // The `try` block executes the statements within it as usual
    // If an exception is thrown, the statements defined in
    // the `catch` block will be executed.
    try {
        const response = await fetch(endPoint);
        // If the response is not 200 OK...
        if (!response.ok) {
            //...throw an error. This causes control flow
            // to skip to the `catch` block below
            throw Error(response.statusText)
        }

        const json = await response.json();
        displayQuote(json.message);
        setTweetButton(json.message);
    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');
    } finally {
        spinner.classList.add('hidden');
        newQuoteButton.disabled = false;
    }
}

function displayQuote(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
}

function setTweetButton(quote) {
    twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote}-Donald Trump`)
}

getQuote();