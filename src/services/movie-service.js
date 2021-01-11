export default class MovieService {
    _url = 'https://api.themoviedb.org/3/search/movie?api_key=19033764dfddc0cc258c48b5d01a5964&query=return';

    requestMovies = async (_url) => {
        let res = await fetch(_url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${_url}, received ${res.status}`);
        }
        res = await res.json();
        return res.results;
    };

    descriptionReducer(str) {
        if(str.length < 100) return str;
        str = str.slice(0, 200);
        let lastIndex = str.lastIndexOf(' ');
        str = str.slice(0, lastIndex);
        return str += ' ...';
    }

    getMovies = async() => {
        let movies = await this.requestMovies(this._url);
        movies = movies.slice(0, 6);
        console.log(movies);
        movies = movies.map(({ title, id, overview, poster_path }) => {
            overview = this.descriptionReducer(overview);
            return {
                title,
                id,
                overview,
                poster_path
            }
        })
        return movies;
    };


}



