import {format} from 'date-fns';

export default class MovieService {
    url = 'https://api.themoviedb.org/3/search/movie?api_key=19033764dfddc0cc258c48b5d01a5964&query=';

    requestMovies = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        res = await res.json();
        return res;
    };

    descriptionReducer(str) {
        if(str.length < 100) return str;
        let newStr = str.slice(0, 200);
        const lastIndex = newStr.lastIndexOf(' ');
        newStr = newStr.slice(0, lastIndex);
        newStr += ' ...'
        return newStr;
    }

    getMovies = async(searchQuery = 'new', page) => {
        const res = await this.requestMovies(`${this.url + searchQuery}&page=${page}`);
        let movieList = res.results;
        // movies = movies.slice(0, 6);
        // eslint-disable-next-line camelcase
        movieList = movieList.map(({ title, id, overview, poster_path, release_date }) => {
            const reducedOverview = this.descriptionReducer(overview);
            let releaseDate = "No Date";
            // eslint-disable-next-line camelcase
            if(release_date) releaseDate = format(new Date(release_date), 'MMMM dd, yyyy');

            return {
                title,
                id,
                overview: reducedOverview,
                posterPath: poster_path,
                releaseDate
            }
        })
        return {
            movieList,
            total: res.total_results
        };
    };


}



