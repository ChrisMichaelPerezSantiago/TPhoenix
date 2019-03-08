<template>
 
<div class="container">
  <div class="col" id="sidebar">
    <nav>
      <div class="header"><a class="brand" href="#"><i class="fab fa-phoenix-framework"></i><i><b>TPhoenix</b></i></a>
        <button id="menu"><i class="fa fa-bars"></i></button>
      </div>
      <ul>

        <li class="search">
          <input type="text" v-model="search" class="form-control" id="search" placeholder="Search..."/>
          <button class="btn-search"><i class="fa fa-lg fa-search"></i></button>
        </li>
        <li class="nav-text">Dashboards</li>
        <li><a class="active" href="#">Overview</a></li>
      </ul>
    </nav>
  </div>
  <div class="col">
    <div class="row fluid header">
      <div class="label"><span><i>Sponsored by</i> The Pirate Bays API </span>
        <h1><b>Download using Magnets </b> <i class="fas fa-magnet"></i></h1>
        <span><b>💖Enjoy downloading movies, series, episodes ...</b></span>
      </div>
      
      <div style="text-align: center">
        <img height="50px" style="vertical-align:middle" src="../assets/utorrent.png" alt="">
        <span style="vertical-align:middle"><a style="text-decoration: none; color:inherit;" href="https://www.utorrent.com/">Download µTorrent</a></span>
      </div>
      
    </div>
    <div class="divider"></div>
    <div class="row fluid">
      <div class="doughnut">
        <div class="chart">
          <canvas id="test1"></canvas>
        </div><strong>💎 Recommendation 💎</strong>
        <h1><b><i>"Ensure that your bittorrent client is associated with magnets"</i></b></h1>
      </div>
      <div class="doughnut">
        <div class="chart">
          <canvas id="test2"></canvas>
        </div><strong>💎 Benefit 💎</strong>
        <h1><b><i>"Alternative in sharing data through P2P networks"</i></b></h1>
      </div>
      <div class="doughnut">
        <div class="chart">
          <canvas id="test3"></canvas>
        </div><strong>💎 Quick access 💎</strong>
        <h1><b><i>"Magnet links is easy and quick, so you spend less time downloading"</i></b></h1>
      </div>
    </div>
    <div class="divider">
      <h3>👑Freedom👑</h3>
    </div>
    
     <!--
    <div class="row sparklines">
      <div class="col sparkline">
        <div class="chart">
          <div class="label"><span>Movies</span>
            <h2>1,293</h2>
          </div>
          <div class="chart-container">
            <canvas id="test4"></canvas>
          </div>
        </div>
      </div>
      <div class="col sparkline">
        <div class="chart">
          <div class="label"><span>Series</span>
            <h2>758</h2>
          </div>
          <div class="chart-container">
            <canvas id="test5"></canvas>
          </div>
        </div>
      </div>
      <div class="col sparkline">
        <div class="chart">
          <div class="label"><span>Episodes</span>
            <h2>1,293</h2>
          </div>
          <div class="chart-container">
            <canvas id="test6"></canvas>
          </div>
        </div>
      </div>
      <div class="col sparkline">
        <div class="chart">
          <div class="label"><span>Downloads</span>
            <h2>758</h2>
          </div>
          <div class="chart-container">
            <canvas id="test7"></canvas>
          </div>
        </div>
      </div>
    </div>
    -->

     <div class="list" v-if="search">
      <h3><center><b>Filtered Content</b></center></h3>
      <a :href="`${item.magnetLink}`" v-for="item in dataFiltered" :key="item.id">
        <span>{{item.name}}</span><span><i class="fas fa-memory"></i> {{item.size}}<br>🔵leechers: {{item.leechers}} <br> 🔴seenders: {{item.seeders}}</span>
      </a>
    </div>

    
    <div v-else class="divider"></div>
    <div class="row top">
      <div class="col">
        <div v-if="loading"> loading...</div>
        <div v-else class="list">
          <h3><center><b>Top Movies</b></center></h3>
          <a :href="`${item.magnetLink}`" v-for="item in topMovies" :key="item.id">
            <span>{{item.name}} <br><br><div> <i class="fas fa-film"></i> {{item.subcategory.name}} <i class="fas fa-memory"></i> {{item.size}}</div> </span><span><br>🔴seenders: {{item.seeders}} <br> 🔵leechers: {{item.leechers}} </span>
          </a>
        </div>
          <paginate
            class="paginator-container"
            v-model="moviePage"
            :page-count="topMovies.length"
            :page-range="3"
            :margin-pages="2"
            :click-handler="getMovies"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
      </div>
    </div>

      <div class="row top">
      <div class="col">
        <!--<div v-if="loading"> loading...</div> -->
        <div class="list">
          <h3><center><b>Top Tv Shows</b></center></h3>
          <a :href="`${item.magnetLink}`" v-for="item in topTvShows" :key="item.id">
            <span>{{item.name}} <br><br><div><i class="fas fa-tv"></i> {{item.subcategory.name}} <i class="fas fa-memory"></i> {{item.size}}</div> </span><span><br>🔴seenders: {{item.seeders}} <br> 🔵leechers: {{item.leechers}} </span>
          </a>
        </div>
          <paginate
            class="paginator-container"
            v-model="tvshowPage"
            :page-count="topTvShows.length"
            :page-range="3"
            :margin-pages="2"
            :click-handler="getTvShows"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
      </div>
    </div>

     <div class="row top">
      <div class="col">
        <!--<div v-if="loading"> loading...</div> -->
        <div class="list">
          <h3><center><b>Top Games</b></center></h3>
          <a :href="`${item.magnetLink}`" v-for="item in topGames" :key="item.id">
            <span>{{item.name}} <br><br><div><i class="fas fa-gamepad"></i> {{item.subcategory.name}} <i class="fas fa-memory"></i> {{item.size}}</div> </span><span><br>🔴seenders: {{item.seeders}} <br> 🔵leechers: {{item.leechers}} </span>
          </a>
        </div>
          <paginate
            class="paginator-container"
            v-model="gamePage"
            :page-count="topGames.length"
            :page-range="3"
            :margin-pages="2"
            :click-handler="getGames"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
      </div>
    </div>

  </div>
</div>
</template>

<script>
  import {ACTYPE} from '../store/types/actions_types';
  import {mapState , mapGetters} from 'vuex';

  export default {
    name: 'home',
    data(){
      return{
        search: '',
        moviePage: 0,
        tvshowPage: 0,
        gamePage: 0
      }
    },
    created(){
      this.getMovies();
      this.getTvShows();
      this.getGames();
      //this.$store.dispatch(ACTYPE.GET_MOVIES , this.page);
      //this.$store.dispatch(ACTYPE.GET_TVSHOWS , this.page);
      //this.$store.dispatch('SEARCH_DATA' , this.search);
    },
    computed: {
      ...mapState(['topMovies' , 'topTvShows', 'topGames' , 'loading']),
      ...mapGetters(['filterMovies' , 'filterQuery']),

      dataFiltered(){
        //return this.filterMovies(this.search)
        return this.filterQuery(this.search);
      },
    },
    methods:{
      getMovies(){
        try{
          this.$store.dispatch(ACTYPE.GET_MOVIES , this.moviePage);          
        }catch(err){
          console.log(err)
        }
      },
      getTvShows(){
        try{
          this.$store.dispatch(ACTYPE.GET_TVSHOWS , this.tvshowPage);
        }catch(err){
          console.log(err)
        }
      },
       getGames(){
        try{
          this.$store.dispatch(ACTYPE.GET_GAMES , this.gamePage);
        }catch(err){
          console.log(err)
        }
      }
    }
  }
</script>
