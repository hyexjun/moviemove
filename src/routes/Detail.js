import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  // console.log(id);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetails(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <img src={details.large_cover_image} alt={details.title} />
      <h1>{details.title_long}</h1>
      <div>
        <h3>genres</h3>
      </div>
    </div>
  );
}

export default Detail;
