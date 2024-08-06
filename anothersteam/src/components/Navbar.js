import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HomeButton, NavButton } from './Button';
import GameSearchBar from './GameSearchBar';
import { Dropdown, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { viewedAtom, recentlyViewedAtom } from '@/state/store';

export default function Navbar() {
  const [allViewedGames, setAllViewedGames] = useAtom(viewedAtom);
  const [recentlyViewed, setRecentlyViewed] = useAtom(recentlyViewedAtom);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const storedGames = localStorage.getItem('viewedGames');
      if (storedGames) {
        const games = JSON.parse(storedGames);
        console.log('Games loaded from local storage:', games);
        setAllViewedGames(games);
      }
    };

    loadData();
  }, [setAllViewedGames]);

  //slice the allViewedGames to become recentlyViewed games only
  useEffect(
    () => setRecentlyViewed(allViewedGames.slice(-6)),
    [allViewedGames, setRecentlyViewed]
  );

  const clearData = () => {
    setAllViewedGames([]);
    localStorage.removeItem('viewedGames');
    // localStorage.clear(allViewedGames);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const deleteGameFromHistory = (gameId) => {
    const updatedGames = allViewedGames.filter((game) => game.id !== gameId);
    setAllViewedGames(updatedGames);
    localStorage.setItem('viewedGames', JSON.stringify(updatedGames));
  };

  return (
    <div className="navbar">
      <div className="button-container">
        <Link href="/" passHref>
          <HomeButton />
        </Link>

        <Link href="/games/mostPlayedGames" passHref>
          <NavButton name="Most Played Games" />
        </Link>

        <Link href="/games/trendingGames" passHref>
          <NavButton name="Trending Games" />
        </Link>
      </div>
      <div>
        <GameSearchBar />
      </div>
      <div>
        <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            History
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {recentlyViewed && recentlyViewed.length > 0 ? (
              recentlyViewed.map((data, index) => (
                <Dropdown.Item
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Link href={`/game/${data.id}`}>{data.name}</Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteGameFromHistory(data.id)}
                  >
                    Delete
                  </Button>
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled>No recently viewed games</Dropdown.Item>
            )}
            <Dropdown.Divider />
            <Dropdown.Item key="clear" onClick={clearData}>
              Clear
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
