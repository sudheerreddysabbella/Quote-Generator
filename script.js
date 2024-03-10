const btn = document.getElementById("btn");
const btnSph = document.querySelector(".speak"),
  btncopy = document.querySelector(".copy");

async function genQuote() {
  try {
    const data = await fetch("https://api.quotable.io/quotes/random");
    if (!data.ok) {
      throw new Error("Failed to fetch quote");
    }
    const quote = await data.json();
    if (!quote[0].content || !quote[0].author) {
      throw new Error("Quote content or author is undefined");
    }
    const quoteContent = quote[0].content;
    const quoteAuthor = quote[0].author;
    const quoteEle = document.getElementById("quote");
    const authorEle = document.getElementById("author");
    quoteEle.innerHTML = quoteContent;
    authorEle.innerHTML = quoteAuthor;
    btn.innerHTML = "Generated!<br/>Enable after 5sec";
    setInterval(() => {
      btn.innerHTML = "Generate";
      btn.disabled = false;
      btn.classList.remove("disabled");
    }, 5000);
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}

btnSph.addEventListener("click", () => {
  let quoteTxt = new SpeechSynthesisUtterance(
    document.getElementById("quote").innerText +
      " by " +
      document.getElementById("author").innerText
    );
  speechSynthesis.speak(quoteTxt);
});
btncopy.addEventListener("click", () => {
  navigator.clipboard.writeText(
    "'" +
      document.getElementById("quote").innerText +
      "'\n" +
      " by " +
      document.getElementById("author").innerText
  );
});
btn.onclick = () => {
  btn.innerHTML = "Generating...";
  btn.disabled = true;
  btn.classList.add("disabled");
  genQuote();
};
