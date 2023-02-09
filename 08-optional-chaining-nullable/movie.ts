type Movie = {
  title: string;
};

type MovieParams = {
  director: Person;
  actors: Person[];
};

type FullMovie = Movie & MovieParams;

type Person = {
  name: string;
};

const moviesSmall: Movie[] = [
  { title: 'Movie 1' },
  { title: 'Movie 2' },
  { title: 'Movie 3' },
  { title: 'Movie 4' },
  { title: 'Movie 5' },
];

const moviesFull: FullMovie[] = [
  {
    title: 'Movie 1',
    director: { name: 'Ridley Scott' },
    actors: [{ name: 'Actor one' }, { name: 'Actor two' }],
  },
  {
    title: 'Movie 2',
    director: { name: 'Ridley Scott' },
    actors: [{ name: 'Actor one' }, { name: 'Actor two' }],
  },
  {
    title: 'Movie 3',
    director: { name: 'Ridley Scott' },
    actors: [{ name: 'Actor one' }, { name: 'Actor two' }],
  },
  {
    title: 'Movie 4',
    director: { name: 'Ridley Scott' },
    actors: [{ name: 'Actor one' }],
  },
  {
    title: 'Movie 5',
    director: { name: 'Ridley Scott' },
    actors: [{ name: 'Actor one' }],
  },
];

// Recomendation use :any as a movie type
function getDirector(movie: any) {
  return movie.director?.name ?? 'Unknown Director';
}

// Recomendation use :any as a movie type
function getActors(movie: any) {
  return movie.actors ?? 'Unknown actors';
}

// Recomendation use :any as a movie type
function getLeadingActor(movie: any) {
  return movie?.actors?.[0]?.name ?? 'Unknown actor';
}

// Recomendation use :any as a movie type
function getSecondaryActor(movie: any) {
  return movie?.actors?.[1]?.name ?? 'Unknown actor';
}

// Recomendation use :any as a movie type
function logMovie(movie: any) {
  console.log('Director:', getDirector(movie));
  console.log('Actors:', getActors(movie));
  console.log('Lead actor', getLeadingActor(movie));
  console.log('Second actor', getSecondaryActor(movie));
}

// Recomendation use :any as a movie type
function logSmallMovies(movie: any) {
  logMovie(movie);
}

// Recomendation use :any as a movie type
function logFullMovies(movie: any) {
  logMovie(movie);
}

moviesSmall.forEach((movie) => {
  console.group('Small movies');
  logSmallMovies(movie);
  console.groupEnd();
});

moviesFull.forEach((movie) => {
  console.group('Full movies');
  logFullMovies(movie);
  console.groupEnd();
});
