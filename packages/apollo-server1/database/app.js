import { writeFileSync } from "fs";
const deathReasons = ["eaten by a lion", "old age", "sickness", "unknown"];
const Authors = [
  {
    name: "Chinua Achebe",
    books: ["Things Fall Apart"],
    id: "1",
    age: 34,
    alive: false,
  },
  {
    name: "Hans Christian Andersen",
    books: ["Fairy tales"],
    id: "2",
    age: 45,
    alive: false,
  },
  {
    name: "Dante Alighieri",
    books: ["The Divine Comedy"],
    id: "3",
    age: 57,
    alive: true,
  },
  {
    name: "Unknown",
    books: [
      "The Epic Of Gilgamesh",
      "The Book Of Job",
      "One Thousand and One Nights",
      "Njál's Saga",
    ],
    id: "4",
    age: 43,
    alive: true,
  },
  {
    name: "Jane Austen",
    books: ["Pride and Prejudice"],
    id: "8",
    age: 80,
    alive: false,
  },
  {
    name: "Honoré de Balzac",
    books: ["Le Père Goriot"],
    id: "9",
    age: 83,
    alive: false,
  },
  {
    name: "Samuel Beckett",
    books: ["Molloy, Malone Dies, The Unnamable, the trilogy"],
    id: "10",
    age: 63,
    alive: false,
  },
  {
    name: "Giovanni Boccaccio",
    books: ["The Decameron"],
    id: "11",
    age: 30,
    alive: false,
  },
  {
    name: "Jorge Luis Borges",
    books: ["Ficciones"],
    id: "12",
    age: 58,
    alive: false,
  },
  {
    name: "Emily Brontë",
    books: ["Wuthering Heights"],
    id: "13",
    age: 90,
    alive: true,
  },
  {
    name: "Albert Camus",
    books: ["The Stranger"],
    id: "14",
    age: 75,
    alive: false,
  },
  {
    name: "Paul Celan",
    books: ["Poems"],
    id: "15",
    age: 76,
    alive: false,
  },
  {
    name: "Louis-Ferdinand Céline",
    books: ["Journey to the End of the Night"],
    id: "16",
    age: 34,
    alive: false,
  },
  {
    name: "Miguel de Cervantes",
    books: ["Don Quijote De La Mancha"],
    id: "17",
    age: 94,
    alive: false,
  },
  {
    name: "Geoffrey Chaucer",
    books: ["The Canterbury Tales"],
    id: "18",
    age: 54,
    alive: false,
  },
  {
    name: "Anton Chekhov",
    books: ["Stories"],
    id: "19",
    age: 5,
    alive: false,
  },
  {
    name: "Joseph Conrad",
    books: ["Nostromo"],
    id: "20",
    age: 63,
    alive: false,
  },
  {
    name: "Charles Dickens",
    books: ["Great Expectations"],
    id: "21",
    age: 45,
    alive: false,
  },
  {
    name: "Denis Diderot",
    books: ["Jacques the Fatalist"],
    id: "22",
    age: 57,
    alive: true,
  },
  {
    name: "Alfred Döblin",
    books: ["Berlin Alexanderplatz"],
    id: "23",
    age: 30,
    alive: false,
  },
  {
    name: "Fyodor Dostoevsky",
    books: [
      "Crime and Punishment",
      "The Idiot",
      "The Possessed",
      "The Brothers Karamazov",
    ],
    id: "24",
    age: 64,
    alive: false,
  },
  {
    name: "George Eliot",
    books: ["Middlemarch"],
    id: "28",
    age: 52,
    alive: false,
  },
  {
    name: "Ralph Ellison",
    books: ["Invisible Man"],
    id: "29",
    age: 39,
    alive: false,
  },
  {
    name: "Euripides",
    books: ["Medea"],
    id: "30",
    age: 61,
    alive: false,
  },
  {
    name: "William Faulkner",
    books: ["Absalom, Absalom!", "The Sound and the Fury"],
    id: "31",
    age: 36,
    alive: false,
  },
  {
    name: "Gustave Flaubert",
    books: ["Madame Bovary", "Sentimental Education"],
    id: "33",
    age: 20,
    alive: true,
  },
  {
    name: "Federico García Lorca",
    books: ["Gypsy Ballads"],
    id: "35",
    age: 16,
    alive: false,
  },
  {
    name: "Gabriel García Márquez",
    books: ["One Hundred Years of Solitude", "Love in the Time of Cholera"],
    id: "36",
    age: 69,
    alive: false,
  },
  {
    name: "Johann Wolfgang von Goethe",
    books: ["Faust"],
    id: "38",
    age: 62,
    alive: false,
  },
  {
    name: "Nikolai Gogol",
    books: ["Dead Souls"],
    id: "39",
    age: 103,
    alive: false,
  },
  {
    name: "Günter Grass",
    books: ["The Tin Drum"],
    id: "40",
    age: 69,
    alive: false,
  },
  {
    name: "João Guimarães Rosa",
    books: ["The Devil to Pay in the Backlands"],
    id: "41",
    age: 79,
    alive: false,
  },
  {
    name: "Knut Hamsun",
    books: ["Hunger"],
    id: "42",
    age: 78,
    alive: false,
  },
  {
    name: "Ernest Hemingway",
    books: ["The Old Man and the Sea"],
    id: "43",
    age: 71,
    alive: true,
  },
  {
    name: "Homer",
    books: ["Iliad", "Odyssey"],
    id: "44",
    age: 76,
    alive: false,
  },
  {
    name: "Henrik Ibsen",
    books: ["A Doll's House"],
    id: "46",
    age: 95,
    alive: false,
  },
  {
    name: "James Joyce",
    books: ["Ulysses"],
    id: "47",
    age: 57,
    alive: true,
  },
  {
    name: "Franz Kafka",
    books: ["Stories", "The Trial", "The Castle"],
    id: "48",
    age: 47,
    alive: false,
  },
  {
    name: "Kālidāsa",
    books: ["The recognition of Shakuntala"],
    id: "51",
    age: 31,
    alive: false,
  },
  {
    name: "Yasunari Kawabata",
    books: ["The Sound of the Mountain"],
    id: "52",
    age: 53,
    alive: false,
  },
  {
    name: "Nikos Kazantzakis",
    books: ["Zorba the Greek"],
    id: "53",
    age: 56,
    alive: true,
  },
  {
    name: "D. H. Lawrence",
    books: ["Sons and Lovers"],
    id: "54",
    age: 38,
    alive: false,
  },
  {
    name: "Halldór Laxness",
    books: ["Independent People"],
    id: "55",
    age: 50,
    alive: true,
  },
  {
    name: "Giacomo Leopardi",
    books: ["Poems"],
    id: "56",
    age: 52,
    alive: false,
  },
  {
    name: "Doris Lessing",
    books: ["The Golden Notebook"],
    id: "57",
    age: 48,
    alive: false,
  },
  {
    name: "Astrid Lindgren",
    books: ["Pippi Longstocking"],
    id: "58",
    age: 69,
    alive: false,
  },
  {
    name: "Lu Xun",
    books: ["Diary of a Madman"],
    id: "59",
    age: 75,
    alive: false,
  },
  {
    name: "Naguib Mahfouz",
    books: ["Children of Gebelawi"],
    id: "60",
    age: 81,
    alive: false,
  },
  {
    name: "Thomas Mann",
    books: ["Buddenbrooks", "The Magic Mountain"],
    id: "61",
    age: 83,
    alive: false,
  },
  {
    name: "Herman Melville",
    books: ["Moby Dick"],
    id: "63",
    age: 62,
    alive: false,
  },
  {
    name: "Michel de Montaigne",
    books: ["Essays"],
    id: "64",
    age: 76,
    alive: false,
  },
  {
    name: "Elsa Morante",
    books: ["History"],
    id: "65",
    age: 12,
    alive: true,
  },
  {
    name: "Toni Morrison",
    books: ["Beloved"],
    id: "66",
    age: 102,
    alive: true,
  },
  {
    name: "Murasaki Shikibu",
    books: ["The Tale of Genji"],
    id: "67",
    age: 67,
    alive: false,
  },
  {
    name: "Robert Musil",
    books: ["The Man Without Qualities"],
    id: "68",
    age: 45,
    alive: true,
  },
  {
    name: "Vladimir Nabokov",
    books: ["Lolita"],
    id: "69",
    age: 98,
    alive: false,
  },
  {
    name: "George Orwell",
    books: ["Nineteen Eighty-Four"],
    id: "70",
    age: 57,
    alive: true,
  },
  {
    name: "Ovid",
    books: ["Metamorphoses"],
    id: "71",
    age: 79,
    alive: false,
  },
  {
    name: "Fernando Pessoa",
    books: ["The Book of Disquiet"],
    id: "72",
    age: 63,
    alive: false,
  },
  {
    name: "Edgar Allan Poe",
    books: ["Tales"],
    id: "73",
    age: 56,
    alive: false,
  },
  {
    name: "Marcel Proust",
    books: ["In Search of Lost Time"],
    id: "74",
    age: 48,
    alive: false,
  },
  {
    name: "François Rabelais",
    books: ["Gargantua and Pantagruel"],
    id: "75",
    age: 68,
    alive: false,
  },
  {
    name: "Juan Rulfo",
    books: ["Pedro Páramo"],
    id: "76",
    age: 58,
    alive: true,
  },
  {
    name: "Rumi",
    books: ["The Masnavi"],
    id: "77",
    age: 47,
    alive: false,
  },
  {
    name: "Salman Rushdie",
    books: ["Midnight's Children"],
    id: "78",
    age: 97,
    alive: true,
  },
  {
    name: "Saadi",
    books: ["Bostan"],
    id: "79",
    age: 54,
    alive: false,
  },
  {
    name: "Tayeb Salih",
    books: ["Season of Migration to the North"],
    id: "80",
    age: 57,
    alive: false,
  },
  {
    name: "José Saramago",
    books: ["Blindness"],
    id: "81",
    age: 40,
    alive: false,
  },
  {
    name: "William Shakespeare",
    books: ["Hamlet", "King Lear", "Othello"],
    id: "82",
    age: 111,
    alive: false,
  },
  {
    name: "Sophocles",
    books: ["Oedipus the King"],
    id: "85",
    age: 59,
    alive: false,
  },
  {
    name: "Stendhal",
    books: ["The Red and the Black"],
    id: "86",
    age: 14,
    alive: false,
  },
  {
    name: "Laurence Sterne",
    books: ["The Life And Opinions of Tristram Shandy"],
    id: "87",
    age: 65,
    alive: false,
  },
  {
    name: "Italo Svevo",
    books: ["Confessions of Zeno"],
    id: "88",
    age: 91,
    alive: false,
  },
  {
    name: "Jonathan Swift",
    books: ["Gulliver's Travels"],
    id: "89",
    age: 41,
    alive: false,
  },
  {
    name: "Leo Tolstoy",
    books: ["War and Peace", "Anna Karenina", "The Death of Ivan Ilyich"],
    id: "90",
    age: 71,
    alive: false,
  },
  {
    name: "Mark Twain",
    books: ["The Adventures of Huckleberry Finn"],
    id: "93",
    age: 21,
    alive: false,
  },
  {
    name: "Valmiki",
    books: ["Ramayana"],
    id: "94",
    age: 30,
    alive: false,
  },
  {
    name: "Virgil",
    books: ["The Aeneid"],
    id: "95",
    age: 74,
    alive: false,
  },
  {
    name: "Vyasa",
    books: ["Mahabharata"],
    id: "96",
    age: 66,
    alive: false,
  },
  {
    name: "Walt Whitman",
    books: ["Leaves of Grass"],
    id: "97",
    age: 75,
    alive: false,
  },
  {
    name: "Virginia Woolf",
    books: ["Mrs Dalloway", "To the Lighthouse"],
    id: "98",
    age: 77,
    alive: false,
  },
  {
    name: "Marguerite Yourcenar",
    books: ["Memoirs of Hadrian"],
    id: "100",
    age: 59,
    alive: false,
  },
];
Authors.forEach((author) => {
  if (!author.alive) {
    author.alive = {
      isAlive: false,
      reason: deathReasons[Math.floor(Math.random() * deathReasons.length)],
    };
  } else
    author.alive = {
      isAlive: true,
    };
});

writeFileSync("authorsWithReason.json", JSON.stringify(Authors));
