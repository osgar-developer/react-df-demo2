import { useState } from 'react';
import { MagicMotion } from 'react-magic-motion';

const MagicMotionPage = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
    { id: 3, text: 'Third item' },
  ]);

  const [showList, setShowList] = useState(true);

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    setItems([...items, { id: newId, text: `New item ${newId}` }]);
  };

  return (
    <div className="page">
      <h1 className="page-title">🔮 react-magic-motion</h1>
      <p className="page-subtitle">
        Automatic animations for lists with smooth enter/exit transitions.
      </p>

      <MagicMotion>
        <div className="demo-grid">
          {/* Automatic List Animations */}
          <div className="demo-card">
            <h3 className="demo-title">List Animations</h3>
            <p className="demo-description">Add or remove items - magic motion handles it automatically</p>
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={addItem}
                style={{
                  padding: '10px 20px',
                  background: '#22c55e',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  marginBottom: '15px'
                }}
              >
                Add Item
              </button>
              <div className="list-container">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="list-item"
                    onClick={() => removeItem(item.id)}
                    style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle with Presence */}
          <div className="demo-card">
            <h3 className="demo-title">Toggle Animation</h3>
            <p className="demo-description">Smooth show/hide with automatic layout adjustments</p>
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => setShowList(!showList)}
                style={{
                  padding: '10px 20px',
                  background: '#6366f1',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {showList ? 'Hide List' : 'Show List'}
              </button>
              {showList && (
                <div className="list-container" style={{ marginTop: '15px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="list-item">
                      Hidden Item {i}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reorder Animation */}
          <div className="demo-card">
            <h3 className="demo-title">Reorder Animation</h3>
            <p className="demo-description">Items animate to new positions automatically</p>
            <ReorderDemo />
          </div>

          {/* Grid Animation */}
          <div className="demo-card">
            <h3 className="demo-title">Grid Animations</h3>
            <p className="demo-description">Items flow smoothly in grid layout</p>
            <GridDemo />
          </div>

          {/* Multiple Lists */}
          <div className="demo-card">
            <h3 className="demo-title">Move Between Lists</h3>
            <p className="demo-description">Items can animate between different containers</p>
            <TransferDemo />
          </div>

          {/* Complex Layout */}
          <div className="demo-card">
            <h3 className="demo-title">Complex Layout</h3>
            <p className="demo-description">Nested animations with layout changes</p>
            <ComplexLayout />
          </div>
        </div>
      </MagicMotion>
    </div>
  );
};

const ReorderDemo = () => {
  const [items, setItems] = useState(['C', 'A', 'B', 'D']);

  const shuffle = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={shuffle}
        style={{
          padding: '10px 20px',
          background: '#a855f7',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        Shuffle Order
      </button>
      <MagicMotion>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {items.map(item => (
            <div
              key={item}
              style={{
                width: '50px',
                height: '50px',
                background: '#6366f1',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </MagicMotion>
    </div>
  );
};

const GridDemo = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  const toggle = () => {
    if (items.length > 3) {
      setItems([1, 2, 3]);
    } else {
      setItems([1, 2, 3, 4, 5, 6]);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={toggle}
        style={{
          padding: '10px 20px',
          background: '#ec4899',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        {items.length > 3 ? 'Reduce' : 'Expand'}
      </button>
      <MagicMotion>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '10px' 
        }}>
          {items.map(i => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                background: '#14b8a6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {i}
            </div>
          ))}
        </div>
      </MagicMotion>
    </div>
  );
};

const TransferDemo = () => {
  const [left, setLeft] = useState([1, 2]);
  const [right, setRight] = useState([3, 4]);

  const moveToRight = () => {
    if (left.length > 0) {
      const item = left[0];
      setLeft(left.slice(1));
      setRight([...right, item]);
    }
  };

  const moveToLeft = () => {
    if (right.length > 0) {
      const item = right[0];
      setRight(right.slice(1));
      setLeft([...left, item]);
    }
  };

  return (
    <MagicMotion>
      <div style={{ 
        marginTop: '20px',
        display: 'flex', 
        gap: '20px', 
        alignItems: 'flex-start' 
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '10px', color: '#a0a0a0', fontSize: '0.9rem' }}>Left</div>
          {left.map(i => (
            <div
              key={i}
              style={{
                padding: '15px',
                marginBottom: '8px',
                background: '#6366f1',
                borderRadius: '8px',
                color: 'white'
              }}
            >
              Item {i}
            </div>
          ))}
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '10px',
          paddingTop: '30px'
        }}>
          <button
            onClick={moveToRight}
            style={{
              padding: '8px 16px',
              background: '#22c55e',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            →
          </button>
          <button
            onClick={moveToLeft}
            style={{
              padding: '8px 16px',
              background: '#ec4899',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '10px', color: '#a0a0a0', fontSize: '0.9rem' }}>Right</div>
          {right.map(i => (
            <div
              key={i}
              style={{
                padding: '15px',
                marginBottom: '8px',
                background: '#a855f7',
                borderRadius: '8px',
                color: 'white'
              }}
            >
              Item {i}
            </div>
          ))}
        </div>
      </div>
    </MagicMotion>
  );
};

const ComplexLayout = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <MagicMotion>
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: '20px',
          padding: '20px',
          background: '#1a1a1a',
          borderRadius: '12px',
          cursor: 'pointer',
          minHeight: '100px'
        }}
      >
        <div style={{ color: '#a0a0a0', marginBottom: expanded ? '15px' : '0' }}>
          Click to {expanded ? 'collapse' : 'expand'}
        </div>
        {expanded && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  width: '60px',
                  height: '60px',
                  background: '#22c55e',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {i}
              </div>
            ))}
          </div>
        )}
      </div>
    </MagicMotion>
  );
};

export default MagicMotionPage;
