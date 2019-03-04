export const getters = {
  TopMovies: (state) =>{
    return state.topMovies.map(data =>{
      return data
    });
  },
  filterMovies: (state) => (search) =>{
    //let query = new RegExp(search , 'i');
    console.log(search);
    //return state.topMovies.filter(data => data.name === query);    
    return state.topMovies.filter(data =>{      
      return data.name.toLowerCase().includes(search.toLowerCase())
    });
  },
  filterQuery: (state) => (search) =>{
    console.log(search);
    return state.queries.filter(data =>{      
      return data.name.toLowerCase().includes(search.toLowerCase())
    });
  }
};