// Metadata-only catalog (titles/artists/years) used to power the client-side
// recommendation demo. In production this is replaced by a real music API
// (Spotify/YouTube Music) queried by the FastAPI backend.

export const SONG_POOL = [
  // Telugu
  { title: 'Samajavaragamana', artist: 'Sid Sriram', movie: 'Ala Vaikunthapurramuloo', language: 'Telugu', genre: 'Romantic', mood: 'Dreamy', energy: 'Low', tempo: 'Slow', year: 2020 },
  { title: 'Ramuloo Ramulaa', artist: 'Anurag Kulkarni, Mangli', movie: 'Ala Vaikunthapurramuloo', language: 'Telugu', genre: 'Party', mood: 'Joyful', energy: 'High', tempo: 'Fast', year: 2020 },
  { title: 'Buttabomma', artist: 'Armaan Malik', movie: 'Ala Vaikunthapurramuloo', language: 'Telugu', genre: 'Happy', mood: 'Playful', energy: 'High', tempo: 'Fast', year: 2020 },
  { title: 'Inkem Inkem Inkem Kaavaale', artist: 'Sid Sriram', movie: 'Geetha Govindam', language: 'Telugu', genre: 'Romantic', mood: 'Tender', energy: 'Low', tempo: 'Slow', year: 2018 },
  { title: 'Vachinde', artist: 'Madhu Priya, Baba Sehgal', movie: 'Fidaa', language: 'Telugu', genre: 'Travel', mood: 'Uplifting', energy: 'Medium', tempo: 'Medium', year: 2017 },
  { title: 'Anaganaga O Vooru', artist: 'Sid Sriram', movie: 'Ninnu Kori', language: 'Telugu', genre: 'Sad', mood: 'Wistful', energy: 'Low', tempo: 'Slow', year: 2017 },
  { title: 'Ninnu Kori BGM', artist: 'Gopi Sundar', movie: 'Ninnu Kori', language: 'Telugu', genre: 'Movie BGM', mood: 'Reflective', energy: 'Low', tempo: 'Slow', year: 2017 },
  { title: 'Yentha Sepu', artist: 'Sid Sriram', movie: 'Chi La Sow', language: 'Telugu', genre: 'Romantic', mood: 'Warm', energy: 'Medium', tempo: 'Medium', year: 2018 },
  { title: 'Jala Jala Jalapaatham', artist: 'Anurag Kulkarni', movie: 'Ala Vaikunthapurramuloo', language: 'Telugu', genre: 'Devotional', mood: 'Devoted', energy: 'Medium', tempo: 'Medium', year: 2020 },
  { title: 'Seeti Maar', artist: 'Devi Sri Prasad', movie: 'DJ Duvvada Jagannadham', language: 'Telugu', genre: 'Party', mood: 'Energetic', energy: 'High', tempo: 'Fast', year: 2017 },
  { title: 'Butta Bomma Lofi Mix', artist: 'LoFi Telugu', movie: '—', language: 'Telugu', genre: 'Lo-fi', mood: 'Chill', energy: 'Low', tempo: 'Slow', year: 2022 },
  { title: 'Kalaavathi', artist: 'Sid Sriram', movie: 'Bhola Shankar', language: 'Telugu', genre: 'Romantic', mood: 'Serene', energy: 'Low', tempo: 'Slow', year: 2023 },

  // Hindi
  { title: 'Kesariya', artist: 'Arijit Singh', movie: 'Brahmastra', language: 'Hindi', genre: 'Romantic', mood: 'Warm', energy: 'Medium', tempo: 'Medium', year: 2022 },
  { title: 'Tum Hi Ho', artist: 'Arijit Singh', movie: 'Aashiqui 2', language: 'Hindi', genre: 'Sad', mood: 'Longing', energy: 'Low', tempo: 'Slow', year: 2013 },
  { title: 'Ilahi', artist: 'Arijit Singh', movie: 'Yeh Jawaani Hai Deewani', language: 'Hindi', genre: 'Travel', mood: 'Free-spirited', energy: 'Medium', tempo: 'Medium', year: 2013 },
  { title: 'Kar Gayi Chull', artist: 'Badshah, Fazilpuria', movie: 'Kapoor & Sons', language: 'Hindi', genre: 'Party', mood: 'Playful', energy: 'High', tempo: 'Fast', year: 2016 },
  { title: 'Raabta', artist: 'Arijit Singh', movie: 'Raabta', language: 'Hindi', genre: 'Romantic', mood: 'Nostalgic', energy: 'Medium', tempo: 'Medium', year: 2017 },
  { title: 'Namo Namo', artist: 'Amit Trivedi', movie: 'Kedarnath', language: 'Hindi', genre: 'Devotional', mood: 'Devoted', energy: 'Medium', tempo: 'Medium', year: 2018 },
  { title: 'Zinda', artist: 'Siddharth Mahadevan', movie: 'Bhaag Milkha Bhaag', language: 'Hindi', genre: 'Gym', mood: 'Driven', energy: 'High', tempo: 'Fast', year: 2013 },
  { title: 'Kabira', artist: 'Tochi Raina, Rekha Bhardwaj', movie: 'Yeh Jawaani Hai Deewani', language: 'Hindi', genre: 'Night Drive', mood: 'Reflective', energy: 'Low', tempo: 'Slow', year: 2013 },
  { title: 'Barfi Theme', artist: 'Pritam', movie: 'Barfi!', language: 'Hindi', genre: 'Movie BGM', mood: 'Whimsical', energy: 'Medium', tempo: 'Medium', year: 2012 },
  { title: 'Ghoomar', artist: 'Shreya Ghoshal, Swaroop Khan', movie: 'Padmaavat', language: 'Hindi', genre: 'Classical', mood: 'Regal', energy: 'Medium', tempo: 'Medium', year: 2018 },
  { title: 'Rain Drops (Barish)', artist: 'Ash King', movie: 'Half Girlfriend', language: 'Hindi', genre: 'Rain', mood: 'Melancholic', energy: 'Low', tempo: 'Slow', year: 2017 },
  { title: 'Channa Mereya', artist: 'Arijit Singh', movie: 'Ae Dil Hai Mushkil', language: 'Hindi', genre: 'Sad', mood: 'Heartbroken', energy: 'Low', tempo: 'Slow', year: 2016 },

  // English
  { title: 'Sunflower', artist: 'Post Malone, Swae Lee', movie: 'Spider-Man: Into the Spider-Verse', language: 'English', genre: 'Chill', mood: 'Breezy', energy: 'Medium', tempo: 'Medium', year: 2018 },
  { title: 'Blinding Lights', artist: 'The Weeknd', movie: '—', language: 'English', genre: 'Night Drive', mood: 'Electric', energy: 'High', tempo: 'Fast', year: 2020 },
  { title: 'Best Part', artist: 'Daniel Caesar, H.E.R.', movie: '—', language: 'English', genre: 'Romantic', mood: 'Tender', energy: 'Low', tempo: 'Slow', year: 2017 },
  { title: 'Levitating', artist: 'Dua Lipa', movie: '—', language: 'English', genre: 'Party', mood: 'Joyful', energy: 'High', tempo: 'Fast', year: 2020 },
  { title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', movie: '—', language: 'English', genre: 'Sad', mood: 'Yearning', energy: 'Medium', tempo: 'Medium', year: 2021 },
  { title: 'Weightless', artist: 'Marconi Union', movie: '—', language: 'English', genre: 'Meditation', mood: 'Serene', energy: 'Low', tempo: 'Slow', year: 2011 },
  { title: 'Golden Hour', artist: 'JVKE', movie: '—', language: 'English', genre: 'Romantic', mood: 'Warm', energy: 'Medium', tempo: 'Medium', year: 2022 },
  { title: 'Eye of the Tiger', artist: 'Survivor', movie: 'Rocky III', language: 'English', genre: 'Gym', mood: 'Driven', energy: 'High', tempo: 'Fast', year: 1982 },
  { title: 'Clair de Lune', artist: 'Claude Debussy', movie: '—', language: 'English', genre: 'Classical', mood: 'Dreamy', energy: 'Low', tempo: 'Slow', year: 1905 },
  { title: 'Time', artist: 'Hans Zimmer', movie: 'Inception', language: 'English', genre: 'Movie BGM', mood: 'Epic', energy: 'Medium', tempo: 'Slow', year: 2010 },
  { title: 'Rainy Days', artist: 'Fleet Foxes', movie: '—', language: 'English', genre: 'Rain', mood: 'Introspective', energy: 'Low', tempo: 'Slow', year: 2011 },
  { title: 'Lofi Study Beats', artist: 'Chillhop Collective', movie: '—', language: 'English', genre: 'Study', mood: 'Focused', energy: 'Low', tempo: 'Medium', year: 2021 },

  // Instrumentals / BGM / other
  { title: 'Interstellar Main Theme', artist: 'Hans Zimmer', movie: 'Interstellar', language: 'English', genre: 'Epic', mood: 'Awe', energy: 'Medium', tempo: 'Slow', year: 2014 },
  { title: 'Baahubali Theme', artist: 'M. M. Keeravani', movie: 'Baahubali', language: 'Telugu', genre: 'Epic', mood: 'Heroic', energy: 'High', tempo: 'Fast', year: 2015 },
  { title: 'Malargal Kaettaen', artist: 'A.R. Rahman', movie: 'OK Kanmani', language: 'Tamil', genre: 'Romantic', mood: 'Tender', energy: 'Low', tempo: 'Slow', year: 2015 },
  { title: 'Munbe Vaa', artist: 'Shreya Ghoshal', movie: 'Sillunu Oru Kaadhal', language: 'Tamil', genre: 'Romantic', mood: 'Sweet', energy: 'Low', tempo: 'Slow', year: 2006 },
  { title: 'Ee Manase', artist: 'Sonu Nigam', movie: 'Kirik Party', language: 'Kannada', genre: 'Sad', mood: 'Wistful', energy: 'Low', tempo: 'Slow', year: 2016 },
  { title: 'Jeevamshamai', artist: 'Vijay Yesudas', movie: 'Ustad Hotel', language: 'Malayalam', genre: 'Devotional', mood: 'Peaceful', energy: 'Low', tempo: 'Slow', year: 2012 },
  { title: 'Ik Kudi', artist: 'Diljit Dosanjh', movie: 'Udta Punjab', language: 'Punjabi', genre: 'Chill', mood: 'Reflective', energy: 'Medium', tempo: 'Medium', year: 2016 },
  { title: 'Lemon', artist: 'Kenshi Yonezu', movie: '—', language: 'Japanese', genre: 'Sad', mood: 'Melancholic', energy: 'Medium', tempo: 'Medium', year: 2018 },
  { title: 'Spring Day', artist: 'BTS', movie: '—', language: 'Korean', genre: 'Sad', mood: 'Nostalgic', energy: 'Medium', tempo: 'Medium', year: 2017 },
  { title: 'River Flows in You', artist: 'Yiruma', movie: '—', language: 'English', genre: 'Instrumental', mood: 'Tender', energy: 'Low', tempo: 'Slow', year: 2001 },
  { title: 'Samurai Champloo Lo-fi Suite', artist: 'Nujabes', movie: '—', language: 'Japanese', genre: 'Lo-fi', mood: 'Cool', energy: 'Low', tempo: 'Medium', year: 2004 },
  { title: 'Devi Sri Prasad Party Mashup', artist: 'Devi Sri Prasad', movie: '—', language: 'Telugu', genre: 'Party', mood: 'Energetic', energy: 'High', tempo: 'Fast', year: 2021 },
]
