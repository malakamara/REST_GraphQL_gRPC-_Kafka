import axios from "axios";

const resolvers = {
  Query: {
    getMovie: async (_, { id }) => {
      const res = await axios.get(`http://localhost:3000/movies/${id}`);
      return res.data;
    },
    searchMovies: async (_, { query }) => {
      const res = await axios.get(`http://localhost:3000/movies?q=${query}`);
      return res.data;
    },
    getTVShow: async (_, { id }) => {
      const res = await axios.get(`http://localhost:3001/shows/${id}`);
      return res.data;
    },
    searchTVShows: async (_, { query }) => {
      const res = await axios.get(`http://localhost:3001/shows?q=${query}`);
      return res.data;
    },
  },
};

export default resolvers;
