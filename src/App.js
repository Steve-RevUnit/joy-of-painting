import { useState } from 'react';
import { useQuery } from 'react-query';
import { ColorExtractor } from 'react-color-extractor'
import { getAllArtists, getAllCategories, getAllPaintings, getLeaderboard, getMyStats, submitPixelation } from './utils/apis';
import { getRandomBrushstrokes } from './utils/generateBrushstrokes';
import './App.css';

function App() {
  const [brushstrokes, setBrushstrokes] = useState([]);
  const [selectedPainting, setSelectedPainting] = useState({});
  const [latestResults, setLatestResults] = useState({});
  const [dateHash, setDateHash] = useState(new Date().toTimeString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [colors, setColors] = useState([]);

  const noRefresh = {
    cacheTime: Infinity,
    refetchInterval: Infinity,
  };

  const artists = useQuery('artists', getAllArtists, noRefresh);
  const categories = useQuery('categories', getAllCategories, noRefresh);
  const paintings = useQuery('paintings', getAllPaintings, noRefresh);
  const leaderboard = useQuery('leaderboard', getLeaderboard);
  const me = useQuery('my-stats', getMyStats);

  const handleGenerate = async () => {
    const strokes = getRandomBrushstrokes(selectedPainting, colors);
    setBrushstrokes(strokes);
    setIsSubmitting(true);

    try {
      let res = await submitPixelation(strokes, selectedPainting.id);
      setLatestResults(res);
      setDateHash(new Date().toTimeString());
    } catch (err) {
      console.log({ err });
    }

    setIsSubmitting(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await submitPixelation(brushstrokes, selectedPainting.id);
      setLatestResults(res);
    } catch (err) {
      console.log({ err });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="paintings">
        {paintings.isLoading ? 'Loading...' : (
          paintings.data?.map(painting => (
            <button
              onClick={() => setSelectedPainting(painting)}
              style={{
                marginRight: '10px',
                marginBottom: '10px',
              }}
            >
              <img
                key={painting.id}
                src={painting.url}
                style={{
                  height: '100px',
                  border: painting.id === selectedPainting.id ? '3px solid red' : '3px solid transparent',
                }}
              />
            </button>
          ))
        )}
      </div>
      <div className="bottom" style={{ display: 'flex', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>Current Pixelation:</div>
          {me.isLoading ? 'Loading' : (
            <img src={`${latestResults.url}?x=${dateHash}`} />
          )}
          <button onClick={handleGenerate}>Generate Pixelation</button>
          <button onClick={handleSubmit}>Submit Pixelation</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>Selected Painting:</div>
          {paintings.isLoading ? 'Loading...' : (
            <ColorExtractor getColors={cols => setColors(cols)}>
              <img
                src={paintings.data?.find(painting => painting.id === selectedPainting.id)?.url}
                style={{ width: '100%' }}
              />
            </ColorExtractor>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
          <div>Stats:</div>
          {isSubmitting ? 'Please wait...' : Object.keys(latestResults).map(keyName => (
            <div key={keyName}>
              <span style={{ textTransform: 'capitalize' }}>{keyName}:</span> {latestResults[keyName]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
