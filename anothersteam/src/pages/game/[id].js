import { useRouter } from 'next/router';

export default function GameDetail({ game }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>Game: {id}</h1>
      {game && (
        <div>
          <h2>{game.name}</h2>
          <img src={game.image} />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  let game = null;

  try {
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${id}`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch game data');
    }
    const data = await res.json();
    game = data[id].data;
  } catch (err) {
    console.error('Error fetching game data:', err);
  }

  return {
    props: {
      game,
    },
  };
}
