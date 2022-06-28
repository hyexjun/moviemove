import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  // console.log(id);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetails(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className={styles.wrap}>
      <img className={styles.movie__img} src={details.large_cover_image} alt={details.title} />
      <h1>{details.title_long}</h1>
      <div>
        <div>
          <p>Runtime : {details.runtime}mins</p>
          <p>Rating : {Number(details.rating).toFixed(1)}</p>
        </div>
        <ul className={styles.movie__genres}>
          Genres :
          {details.genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p className={styles.movie__desc}>{details.description_full}</p>
      </div>
    </div>
  );
}

export default Detail;
