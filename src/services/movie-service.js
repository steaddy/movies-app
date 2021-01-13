export default class MovieService {
    url = 'https://api.themoviedb.org/3/search/movie?api_key=19033764dfddc0cc258c48b5d01a5964&query=return';

    requestMovies = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        res = await res.json();
        return res.results;
    };

    descriptionReducer(str) {
        if(str.length < 100) return str;
        let newStr = str.slice(0, 200);
        const lastIndex = newStr.lastIndexOf(' ');
        newStr = newStr.slice(0, lastIndex);
        newStr += ' ...'
        return newStr;
    }

    getMovies = async() => {
        let movies = await this.requestMovies(this.url);
        movies = movies.slice(0, 6);
        // eslint-disable-next-line camelcase
        movies = movies.map(({ title, id, overview, poster_path }) => {
            const reducedOverview = this.descriptionReducer(overview);
            return {
                title,
                id,
                overview: reducedOverview,
                posterPath: poster_path
            }
        })
        return movies;
    };


}



