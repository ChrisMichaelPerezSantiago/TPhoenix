const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PirateBay = require('thepiratebay');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const movies = async() =>{
  const moviesTorrents = await PirateBay.topTorrents(201);
  const promises = [];
  moviesTorrents.forEach((data) =>{
    promises.push(data);
  });
  return await Promise.all(promises);
}


const tvShows = async() =>{
  const tvShowTorrents = await PirateBay.topTorrents(205);
  const promises = [];
  tvShowTorrents.forEach((data) =>{
    promises.push(data);
  });
  return await Promise.all(promises)
};

const topGames = async() =>{
  const gamesTorrents = await PirateBay.topTorrents(400);
  const promises = [];
  gamesTorrents.forEach((data) =>{
    promises.push(data)
  })
  return await Promise.all(promises);
};

const searchContent = async (q) =>{
  const result = await PirateBay.search(q , {
    category: 'video',
    page: 0 ,
  })
  const promises = [];
  result.forEach((data) =>{
    promises.push(data.name)
  });
  return await Promise.all(promises);
}


app.get('/api/v1' , (req , res) =>{
  res.json({
    message: '✨ Welcome To The Main End Point ✨'
  });
});


app.get('/api/v1/TopMovies' , (req , res) =>{
  movies().then((data) =>{
    res.status(200).json(data);
  });
});

app.get('/api/v1/TopTvShows' , (req , res) =>{
  tvShows().then((data) =>{
    res.status(200).json(data)
  });
});

app.get('/api/v1/TopGames' , (req , res) =>{
  topGames().then((data) =>{
    res.status(200).json(data)
  });
});


app.get('/api/v1/search/:query/' , (req , res) =>{
  let q = req.param("query");
  searchContent(q).then((data) =>{
    res.status(200).json(data);
  });
});


const port = process.env.PORT || 8001;
app.listen(port , () =>{
  console.log(`\n🚀 Listening on port ${port}`);
})
