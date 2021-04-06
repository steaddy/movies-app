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

    getGenreMovieList = async () => {
        let res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=19033764dfddc0cc258c48b5d01a5964&language=en-US`);
        if (!res.ok) {
            throw new Error(`Could not get Genre List, received ${res.status}`);
        }
        res = await res.json();
        return res;
    };

    getRequestToken = async () => {
        const url = "https://api.themoviedb.org/3/authentication/token/new?api_key=19033764dfddc0cc258c48b5d01a5964"
        // const url = "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=19033764dfddc0cc258c48b5d01a5964"
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        res = await res.json();
        // console.log(res.guest_session_id);
        // return res.guest_session_id;
        return res.request_token;
    };

    authentication = async (foo) => {
        const url = `https://www.themoviedb.org/authenticate/${foo}`
        // const url = "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=19033764dfddc0cc258c48b5d01a5964"
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        res = await res.json();
        // console.log(res.guest_session_id);
        // return res.guest_session_id;
        return res;
    };

    getGuestSessionId = async (requestToken) => {

        const req = JSON.stringify({
            "request_token": requestToken
        });
        const url = "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=19033764dfddc0cc258c48b5d01a5964"
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: req
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        res = await res.json();
        return res.guest_session_id;
    };

    rateMovie = async (guestSessionId, movieId, rate) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=19033764dfddc0cc258c48b5d01a5964&guest_session_id=${guestSessionId}`;
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "value": rate
            })
        });
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        res = await res.json();
        return res;
    };

    getRatedMovies = async (guestSessionId) => {
        const url = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=19033764dfddc0cc258c48b5d01a5964`
        // const url = "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=19033764dfddc0cc258c48b5d01a5964"
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        res = await res.json();
        // return res.guest_session_id;
        return this.prepareForRender(res);
    };


    descriptionReducer(str) {
        if (str.length < 100) return str;
        let newStr = str.slice(0, 150);
        const lastIndex = newStr.lastIndexOf(' ');
        newStr = newStr.slice(0, lastIndex);
        newStr += ' ...'
        return newStr;
    }

    getMovies = async (searchQuery = 'new', page) => {
        const res = await this.requestMovies(`${this.url + searchQuery}&page=${page}`);
        return this.prepareForRender(res);
    };

    prepareForRender = async (reqPromise) => {
        let movieList = reqPromise.results;
        // movies = movies.slice(0, 6);
        // eslint-disable-next-line camelcase

        // eslint-disable-next-line camelcase
        movieList = movieList.map(({title, id, overview, poster_path, release_date, rating = 0, genre_ids}) => {
            const reducedOverview = this.descriptionReducer(overview);
            let releaseDate = "No Date";
            // eslint-disable-next-line camelcase
            if (release_date) releaseDate = format(new Date(release_date), 'MMMM dd, yyyy');

            return {
                title,
                movieId: id ,
                overview: reducedOverview,
                posterPath: poster_path,
                releaseDate,
                rating,
                genreIds: genre_ids,
            }
        })
        return {
            movieList,
            total: reqPromise.total_results
        };
    };


}



