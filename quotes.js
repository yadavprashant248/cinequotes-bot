// quotes.js — Curated movie dialogues mapped to personality types

const quotes = {
  gangster: [
    { movie: "The Godfather", quote: "I'm gonna make him an offer he can't refuse.", year: 1972 },
    { movie: "Scarface", quote: "Say hello to my little friend!", year: 1983 },
    { movie: "Goodfellas", quote: "As far back as I can remember, I always wanted to be a gangster.", year: 1990 },
    { movie: "The Dark Knight", quote: "Why so serious?", year: 2008 },
    { movie: "Pulp Fiction", quote: "English, motherf***er! Do you speak it?", year: 1994 },
    { movie: "The Godfather", quote: "Leave the gun. Take the cannoli.", year: 1972 },
    { movie: "Scarface", quote: "In this country, you gotta make the money first. Then when you get the money, you get the power.", year: 1983 },
    { movie: "Casino", quote: "When you love someone, you've gotta trust them. There's no other way.", year: 1995 },
    { movie: "Goodfellas", quote: "Funny how? I mean, funny like I'm a clown? I amuse you?", year: 1990 },
    { movie: "The Usual Suspects", quote: "The greatest trick the devil ever pulled was convincing the world he didn't exist.", year: 1995 },
    { movie: "Heat", quote: "Don't let yourself get attached to anything you are not willing to walk out on in 30 seconds flat.", year: 1995 },
    { movie: "Training Day", quote: "King Kong ain't got s*** on me!", year: 2001 },
  ],
  pookie: [
    { movie: "Titanic", quote: "I'm the king of the world!", year: 1997 },
    { movie: "Forrest Gump", quote: "Life is like a box of chocolates — you never know what you're gonna get.", year: 1994 },
    { movie: "The Notebook", quote: "If you're a bird, I'm a bird.", year: 2004 },
    { movie: "Good Will Hunting", quote: "It's not your fault.", year: 1997 },
    { movie: "A Walk to Remember", quote: "I might be the one who is supposed to help you.", year: 2002 },
    { movie: "Eternal Sunshine of the Spotless Mind", quote: "Meet me in Montauk.", year: 2004 },
    { movie: "When Harry Met Sally", quote: "When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.", year: 1989 },
    { movie: "Pride & Prejudice", quote: "You have bewitched me, body and soul.", year: 2005 },
    { movie: "The Fault in Our Stars", quote: "Okay. Okay.", year: 2014 },
    { movie: "10 Things I Hate About You", quote: "I burn, I pine, I perish.", year: 1999 },
    { movie: "La La Land", quote: "Here's to the ones who dream, foolish as they may seem.", year: 2016 },
    { movie: "Before Sunrise", quote: "I believe if there's any kind of God it wouldn't be in any of us — it'd be in the space between us.", year: 1995 },
  ],
  playboy: [
    { movie: "James Bond: Casino Royale", quote: "The name's Bond. James Bond.", year: 2006 },
    { movie: "Top Gun", quote: "I feel the need… the need for speed!", year: 1986 },
    { movie: "Wolf of Wall Street", quote: "My name is Jordan Belfort. The year I turned 26, I made 49 million dollars.", year: 2013 },
    { movie: "Grease", quote: "Tell me about it, stud.", year: 1978 },
    { movie: "Anchorman", quote: "I'm kind of a big deal. People know me.", year: 2004 },
    { movie: "Iron Man", quote: "I am Iron Man.", year: 2008 },
    { movie: "American Psycho", quote: "I have to return some videotapes.", year: 2000 },
    { movie: "Fight Club", quote: "I look like you wanna look, I f*** like you wanna f***, I am smart, capable, and most importantly, I am free.", year: 1999 },
    { movie: "Catch Me If You Can", quote: "Dad, I'm the bad guy.", year: 2002 },
    { movie: "The Social Network", quote: "You're going to go through life thinking that girls don't like you because you're a tech geek. I want you to know, from the bottom of my heart, that won't be true.", year: 2010 },
    { movie: "Crazy, Stupid, Love", quote: "Be better than the Gap.", year: 2011 },
    { movie: "Hitch", quote: "Basic principle: no matter what, no matter when, no matter who — any man has a chance to sweep any woman off her feet.", year: 2005 },
  ],
  sigma: [
    { movie: "Fight Club", quote: "You are not your job. You're not how much money you have in the bank.", year: 1999 },
    { movie: "The Dark Knight Rises", quote: "A hero can be anyone, even a man doing something as simple as putting a coat around a young boy's shoulders.", year: 2012 },
    { movie: "Drive", quote: "There's no good side to that road.", year: 2011 },
    { movie: "No Country for Old Men", quote: "What's the most you've ever lost in a coin toss?", year: 2007 },
    { movie: "Whiplash", quote: "There are no two words in the English language more harmful than 'good job'.", year: 2014 },
    { movie: "The Social Network", quote: "If you were the inventors of Facebook, you'd have invented Facebook.", year: 2010 },
    { movie: "Interstellar", quote: "We used to look up at the sky and wonder at our place in the stars. Now we just look down and worry about our place in the dirt.", year: 2014 },
    { movie: "There Will Be Blood", quote: "I'm finished!", year: 2007 },
    { movie: "Inception", quote: "An idea is like a virus, resilient, highly contagious.", year: 2010 },
    { movie: "The Revenant", quote: "I ain't afraid to die anymore. I done it already.", year: 2015 },
    { movie: "John Wick", quote: "People keep asking if I'm back. Yeah, I'm thinking I'm back.", year: 2014 },
    { movie: "Mad Max: Fury Road", quote: "WITNESS ME!", year: 2015 },
  ],
  genz: [
    { movie: "Spider-Man: Into the Spider-Verse", quote: "That's all it is, Miles. A leap of faith.", year: 2018 },
    { movie: "Everything Everywhere All at Once", quote: "Of all the places I could be, I just want to be here with you.", year: 2022 },
    { movie: "The Avengers", quote: "We have a Hulk.", year: 2012 },
    { movie: "Deadpool", quote: "Maximum effort!", year: 2016 },
    { movie: "Shrek", quote: "Ogres are like onions. We both have layers.", year: 2001 },
    { movie: "The Truman Show", quote: "Good morning! And in case I don't see ya — good afternoon, good evening, and good night!", year: 1998 },
    { movie: "Knives Out", quote: "I did it to save my family. Now I want to save myself.", year: 2019 },
    { movie: "Get Out", quote: "Do they know I'm Black?", year: 2017 },
    { movie: "Parasite", quote: "Act your age.", year: 2019 },
    { movie: "Hereditary", quote: "This isn't happening.", year: 2018 },
    { movie: "Midsommar", quote: "I think I'm having a feeling.", year: 2019 },
    { movie: "Barbie", quote: "You're Kenough.", year: 2023 },
    { movie: "Oppenheimer", quote: "Now I am become Death, the destroyer of worlds.", year: 2023 },
    { movie: "Poor Things", quote: "I want to experience everything!", year: 2023 },
  ],
  hustler: [
    { movie: "Rocky", quote: "Yo, Adrian! I did it!", year: 1976 },
    { movie: "The Pursuit of Happyness", quote: "Don't ever let somebody tell you that you can't do something. Not even me.", year: 2006 },
    { movie: "Wolf of Wall Street", quote: "Winners use words like 'would' and 'will'.", year: 2013 },
    { movie: "Whiplash", quote: "Not quite my tempo.", year: 2014 },
    { movie: "Rudy", quote: "You're five feet nothin', a hundred and nothin'... and you have nearly a God-given gift.", year: 1993 },
    { movie: "8 Mile", quote: "If you had one shot, or one opportunity to seize everything you ever wanted in one moment, would you capture it?", year: 2002 },
    { movie: "Moneyball", quote: "It's a process. It's a process. It's a process.", year: 2011 },
    { movie: "The Social Network", quote: "A million dollars isn't cool. You know what's cool? A billion dollars.", year: 2010 },
    { movie: "Scarface", quote: "Every day above ground is a good day.", year: 1983 },
    { movie: "The Shawshank Redemption", quote: "Get busy living or get busy dying.", year: 1994 },
    { movie: "Jerry Maguire", quote: "Show me the money!", year: 1996 },
    { movie: "Wall Street", quote: "Greed, for lack of a better word, is good.", year: 1987 },
  ],
  philosopher: [
    { movie: "The Matrix", quote: "What is real? How do you define real?", year: 1999 },
    { movie: "Interstellar", quote: "Love is the one thing we're capable of perceiving that transcends time and space.", year: 2014 },
    { movie: "Her", quote: "The heart's not like a box that gets filled up. It expands in size the more you love.", year: 2013 },
    { movie: "Cloud Atlas", quote: "Our lives are not our own. From womb to tomb, we are bound to others.", year: 2012 },
    { movie: "Contact", quote: "If it's just us — seems like an awful waste of space.", year: 1997 },
    { movie: "The Tree of Life", quote: "There are two ways through life: the way of nature, and the way of grace.", year: 2011 },
    { movie: "Blade Runner 2049", quote: "Dying for the right cause is the most human thing we can do.", year: 2017 },
    { movie: "Arrival", quote: "Despite knowing the journey and where it leads, I embrace it.", year: 2016 },
    { movie: "2001: A Space Odyssey", quote: "I'm sorry, Dave. I'm afraid I can't do that.", year: 1968 },
    { movie: "Melancholia", quote: "The Earth is evil. We don't need to grieve for it.", year: 2011 },
    { movie: "Eternal Sunshine of the Spotless Mind", quote: "How happy is the blameless vestal's lot? The world forgetting, by the world forgot.", year: 2004 },
    { movie: "Donnie Darko", quote: "Every living creature on this Earth dies alone.", year: 2001 },
  ],
};

const personalityLabels = {
  gangster: "👊 The Gangster",
  pookie: "🥺 The Pookie",
  playboy: "😎 The Playboy",
  sigma: "🐺 The Sigma",
  genz: "✨ The Gen-Z Icon",
  hustler: "💰 The Hustler",
  philosopher: "🧠 The Philosopher",
};

function getRandomQuote(personality) {
  const list = quotes[personality] || quotes.genz;
  return list[Math.floor(Math.random() * list.length)];
}

function formatQuoteMessage(nickname, personality, quoteObj) {
  const label = personalityLabels[personality] || "🎬 Movie Buff";
  return (
    `🎬 *CineQuotes Daily* — just for *${nickname}* (${label})\n\n` +
    `_"${quoteObj.quote}"_\n\n` +
    `— *${quoteObj.movie}* (${quoteObj.year})\n\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `Reply *STOP* to unsubscribe anytime 🙏`
  );
}

module.exports = { quotes, personalityLabels, getRandomQuote, formatQuoteMessage };
